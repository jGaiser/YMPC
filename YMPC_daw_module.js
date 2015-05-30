YMPC.DAW = (function(){
  var arrayObj,
      arrayIndex,

      bufferHash = {},

      startArray = [],
      startHash = {},
       
      endArray = [],
      endHash = {},

      startHashPos,
      endHashPos,
      motor;

  function trackEngine(){
    this.currentTime = 0;

    function step(){
      this.currentTime += 1;
    }

    if(startArray[startInc] === this 
  };

  function loadBuffers(){
  
  };

  function recordSample(buffer, time, start, stop){
    bufferHash[buffer][time] = {start: start, stop: stop};
    
    arrayIndex = startArray.indexOf(start);
    
    if( arrayIndex === -1 ){
      startArray.push(start);
    }

  };

  function startEngine(){
    motor = setInterval(trackEngine, 10);
  };
  
  function stopEngine(){
    window.clearInterval(motor);
  };
  
})();
