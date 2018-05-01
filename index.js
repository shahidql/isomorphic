if(process.env.NODE_ENV=='Developement')
throw new Error('You have enabled process.evn.NODE._ENV variable!');

require('babel-register');
require('./main');