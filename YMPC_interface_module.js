YMPC.App = function(){
  var audio = YMPC.Audio;
  var instrument = YMPC.Instrument;
  var UI = YMPC.UI;
  var DAW = YMPC.DAW;

  return {
    audio: audio,
    instrument: instrument,
    UI: UI,
    DAW: DAW
  };
};
 
var myApp;
var sb1;

window.onload = function(){
  myApp = new YMPC.App();
  myApp.audio.getAudioSource("energy.mp3", 'energy'); 
  
  myApp.instrument.createSoundBoard('sb1', 'energy');
  sb1 = myApp.instrument.getSoundBoard('sb1');
  
  setTimeout(function(){
    sb1.assignSample(1, 10);
    myApp.DAW.buildEngine(); 

   for(i = 0; i < 100; i += 2){
     myApp.DAW.recordSample('sb1', 1, i * 10, i * 10 + 10 ); 
   };
    
    myApp.DAW.startEngine();

  }, 3000);

  
};
