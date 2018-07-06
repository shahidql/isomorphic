import crypto from 'crypto';
import Memcached from 'memcached';

export default class Cache {
  // Constructs a new storage object
  constructor(options = {}) {
    // Connect to Memcached if the options are available
    if (options.memcached) {
      this.cache = new Memcached(options.memcached, {
        // if true, authorizes the automatic removal of dead servers from the pool
        remove: true,
        // the time for Memcached timeout (in milliseconds)
        timeout: 500,
        // Connection pool retry min delay before retrying
        minTimeout: 100,
        // Connection pool retry max delay before retrying
        maxTimeout: 500
      });

      this.cache.on('failure', (details) => {
        // Disable cache and enter fail mode
        this.cache = false;

        console.error('Server ' + details.server + ' is down for the count (' +
              details.messages.join(', ') + ') - entered fail mode ' +
              '(no memcache). Fix it and restart node.');
      });
    }

    // 6 hours
    this.defaultLifetime = 60 * 60 * 6;

    // Fetch functions
    this.fetch = options.fetch || {};

    // Default expiry for a key before background fetch (default to 30 seconds)
    this.defaultExpires = options.defaultExpires || 1000 * 30;

    // Reset
    this.resetStats();

    // Version number (change this on schema change to invalidate the old)
    this.version = 1;
  }

  // Zero out tracking stats
  resetStats() {
    this.stats = {
      reads: {
        cold: 0,
        warm: 0,
        hot: 0,
      },
      writes: 0,
      removes: 0
    };
  }

  // Returns stats
  getStats() {
    return this.stats;
  }

  // Returns memcache stats
  getCacheStats() {
    if (!this.cache) {
      return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {
      this.cache.stats((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Returns true iff there's a fetch function for the given key
  hasFetch(type) {
    return type in this.fetch;
  }

  // Configures a fetch function for a given key
  setFetch(type, func) {
    if (type === undefined || func === undefined) {
      throw Error('setFetch() needs type, func');
    }

    this.fetch[type] = func;
  }

  // Removes a fetch function
  unsetFetch(type) {
    if (this.hasFetch(type)) {
      this.fetch[type] = undefined;
    }
  }

  // Returns the size of the entire cache in bytes (including all elements)
  getSize() {
    if (!this.cache) {
      return Promise.resolve(0);
    }

    return new Promise((resolve, reject) => {
      this.cache.stats((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result[0].bytes);
        }
      });
    });
  }

  // Removes everything from the cache
  clear() {
    if (!this.cache) {
      return Promise.resolve(true);
    }

    return new Promise((resolve, reject) => {
      this.cache.flush((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Calculates a key for the LRU cache based on type and id
  computeKey(type, id) {
    if (type === undefined || id === undefined) {
      throw Error('computeKey() needs type, id');
    }

    let sha1sum = crypto.createHash('sha1');
    id = id || '';
    return type + ':' + sha1sum.update(id).digest('hex') + '-' + this.version;
  }

  // Retrieves a value from the cache
  get(type, id) {
    if (type === undefined || id === undefined) {
      throw Error('get() needs type, id');
    }

    let key = this.computeKey(type, id);

    return new Promise((resolve, reject) => {
      if (!this.cache) {
        this.stats.reads.cold += 1;

        if (this.fetch[type]) {
          // Attempt to fetch
          this.fetch[type](id, resolve, reject);
        } else {
          // There's no way to get a result
          throw Error('No fetch function defined for type: ' + type);
        }

        return;
      }

      this.cache.get(key, (error, result) => {
        if (result) {
          // There is a result, check if it's expired
          let now = new Date().getTime();
          if (result.expires < now) {
            // Yes, it's expired, try to fetch
            if (this.fetch[type]) {
              this.fetch[type](id);
            }

            this.stats.reads.warm += 1;
          } else {
            this.stats.reads.hot += 1;
          }

          resolve(result.data);
        } else {
          this.stats.reads.cold += 1;

          // There is no result
          if (this.fetch[type]) {
            // Attempt to fetch
            this.fetch[type](id, resolve, reject);
          } else {
            // There's no way to get a result
            reject(error);
          }
        }
      });
    });
  }

  // Saves a value to the cache
  set(type, id, data, ttl) {
    if (type === undefined || id === undefined || data === undefined) {
      throw Error('set() needs type, id, data');
    }

    if (!this.cache) {
      return Promise.resolve(true);
    }

    let key = this.computeKey(type, id);

    let expires = new Date().getTime() + (ttl || this.defaultExpires);

    let value = {
      type: type,
      id: id,
      data: data,
      expires: expires,
      size: JSON.stringify(data).length
    };

    this.stats.writes += 1;

    return new Promise((resolve, reject) => {
      this.cache.set(key, value, this.defaultLifetime, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Removes a value from the cache
  remove(type, id) {
    if (type === undefined || id === undefined) {
      throw Error('remove() needs type, id');
    }

    if (!this.cache) {
      return Promise.resolve(true);
    }

    let key = this.computeKey(type, id);

    this.stats.removes += 1;

    return new Promise((resolve, reject) => {
      this.cache.del(key, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}
