YMPC.DAW = (function(){
  var arrayObj,
      arrayIndex,

      instrumentHash = {}, 

      startArray = [],
      startHash = {},
       
      endArray = [],
      endHash = {},

      startHashPos,
      endHashPos,
      motor,
      i, n, inst, startIndex, stopIndex;

  var currentTime = 0;

  function engine(){
    for(i in instrumentHash){
      if( instrumentHash[i][0][instrumentHash[i][2]] === currentTime ){
        if(instrumentHash[i][1].start.hasOwnProperty(currentTime)){
          inst = YMPC.Instrument.getSoundBoard(i);
          for(n in instrumentHash[i][1].start[currentTime]){
            inst.pressPad(instrumentHash[i][1].start[currentTime][n])
          }
        };
        
        if(instrumentHash[i][1].stop.hasOwnProperty(currentTime)){
          inst = YMPC.Instrument.getSoundBoard(i);
          for(n in instrumentHash[i][1].stop[currentTime]){
            inst.releasePad(instrumentHash[i][1].stop[currentTime][n])
          }
        };

        instrumentHash[i][2]++;  
      }  
    };
   
    currentTime += 1;  

    if(currentTime % 100 === 0){
      console.log(currentTime);
    }
  };

  function buildEngine(){
    for(var i in YMPC.Instrument.soundboardDump() ){
      //instrumentHash[i] = [actionArray, actionData, actionArrayIndex]
      instrumentHash[i] = [[], {start: {}, stop: {} }, 0]
    };

    console.log(instrumentHash);

  };

  function recordSample(instrument, pad, start, stop){
    actionArray = instrumentHash[instrument][0];
    startData = instrumentHash[instrument][1].start;
    stopData = instrumentHash[instrument][1].stop;
    
    if(actionArray.indexOf(start) === -1){
      actionArray.push(start);
      startData[start] = [pad];
    }else{
      if(!startData.indexOf(stop)){
        startData[start] = [pad];
      }else{
        startData[start].push(pad);
      };
    };

    if(actionArray.indexOf(stop) === -1){
      actionArray.push(stop);
      stopData[stop] = [pad];
    }else{
      if(!stopData.hasOwnProperty(pad) ){
        stopData[stop] = [pad];
      }else{
        stopData[stop].push(pad);
      };
    };

    actionArray.sort(function(a, b){
      return a - b;
    });

    console.log(instrumentHash);
  };

  function deleteRecording(instrument, pad, start, stop){
    actionArray = instrumentHash[instrument][0];

    startData = instrumentHash[instrument][1].start;
    stopData = instrumentHash[instrument][1].stop;

    startIndex = actionArray.indexOf(start); 
    stopIndex = actionArray.indexOf(stop);
    
    if(actionArray[startIndex].length === 1){
      actionArray.splice(startIndex, 1);
    };

    if(actionArry[stopIndex].length === 1){
      actionArray.splice(stopIndex, 1);
    };
    
    if(Object.keys(startData[start]).length === 1){
      delete startData[start];
    }else{
      delete startData[start][pad];
    };

    if(Object.keys(stopData[stop]).length === 1){
      delete stopData[stop];
    }else{
      delete stopData[stop][pad];
    };

  };

  function startEngine(){
    motor = setInterval(engine, 10);
  };
  
  function stopEngine(){
    window.clearInterval(motor);
    
    for(i in instrumentHash){
    }

    currentTime = 0;
  };

  return {
    buildEngine: buildEngine,
    startEngine: startEngine,
    stopEngine: stopEngine,

//--recordSample(instrument, pad, start, stop)
    recordSample: recordSample
  }
  
})();
