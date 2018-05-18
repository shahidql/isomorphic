window.addEventListener('load', (e)=> {
    document.querySelector('div').innerHTML='reload: '+new Date().getMilliseconds()
  }, true);