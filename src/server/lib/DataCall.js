import Request from 'axios';

export default class DataCall{
  //default constructor
  DataCall(){
    this.properties = null;
    this.component = null;
    this.data = null;
  }
  
  getMissingStates(){
    let promiseChain = Promise.resolve(false);
    let url = 'https://jsonplaceholder.typicode.com/posts';
    return Request.get(url, {
        responseType: 'json',
        timeout: 300,
      }).then((result) => {
        console.log('api call......',result.data[0]);
        return true;
      });
    return promiseChain;
  }

  setMissingStates(component,call){
    this.component = component;
    this.properties = ( call() !== undefined && call()!== null ) ? call() : null;
    return this.properties[0];
  }

  //CLIENT ONLY
  preloadJson() {

  }

  ondataCall() {
    this.data = {
      latestnews: [{
          headline: 'i will be looking for the job',
          dates: 2019
      }]
  };
    this.properties = [this.data];
    return this.data;
  }
  onMount(){
    this.component.setState(this.ondataCall());
  }
}