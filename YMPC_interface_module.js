YMPC.App = function(){
  var audio = YMPC.Audio;
  var instrument = YMPC.Instrument;
  var UI = YMPC.UI;

  return {
    audio: audio,
    instrument: instrument,
    UI: UI
  };
};
 
var myApp;
var sb1;

window.onload = function(){
  myApp = new YMPC.App();
  myApp.audio.getAudioSource("energy.mp3", 'energy'); 
  
  myApp.instrument.createSoundBoard('sb1', 'energy');
  sb1 = myApp.instrument.getSoundBoard('sb1');
  
};
