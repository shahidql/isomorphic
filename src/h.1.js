
import modx from './module1'; 
//import './views/h.scss';
window.addEventListener('load', (e)=> {
    document.querySelector('div').innerHTML='=========reload: '+new Date().getMilliseconds()+' mode:'+modx.mode;
  }, true);