var YMPC = YMPC || {};

YMPC.Audio = (function(){
//Setup audio resources  
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var audioBuffers = {};
  var activeBuffers = {};


//Retrieve audio track
  function getAudioSource(url, title){
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/octet-stream");
    request.responseType = 'arraybuffer';
    //Decode audio and push resulting buffer to audioBuffers array 
    request.onload = function(){
      audioContext.decodeAudioData(request.response, function(buffer){
        audioBuffers[title] = buffer;
        console.log(buffer.duration);
      });
    };
    
    request.onerror = function(e){
    };

    request.open('GET', url, true);
    request.send();
  };

  function getBuffer(bufferName){
    return this.audioBuffers[bufferName];
  };

//Play sample from information described in pad object
  function play(buffer, time){
    var buffer = buffer,
        time = time,
        source;

    if(!activeBuffers[buffer]){
      activeBuffers[buffer] = {}; 
    }

    activeBuffers[buffer][time] = audioContext.createBufferSource();
    source = activeBuffers[buffer][time]; 
    source.buffer = audioBuffers[buffer];
    source.connect(audioContext.destination);
    source.start(0, time);
  };
     
//Stop audio clip
  function stop(buffer, time){
    activeBuffers[buffer][time].stop();
    delete activeBuffers[buffer][time];
  };

  return {
//--getAudioSource(url, titleForBuffer)
    getAudioSource: getAudioSource,
//--getBuffer(bufferName)
    getBuffer: getBuffer,
//--play(bufferTitle, startTime)
    play: play,
//--stop(bufferTitle, sampleStartTime)
    stop: stop
  };
})();
