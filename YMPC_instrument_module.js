YMPC.Instrument = (function(){
  
   var soundBoardHash = {};  

//Soundboard class
  var soundBoard = function(name, buffer){ 
    var that = this;
    this.name = name;
    this.buffer = buffer;
//store soundboard samples in this array
    this.padHash = {}; 
//method for assigning to samples to particular pad 
    this.assignSample = function(pad, time){
      that.padHash[pad] = time;     
    };

    this.pressPad = function(pad){
      YMPC.Audio.play(that.buffer, that.padHash[pad]);
    };

    this.releasePad = function(pad){
      YMPC.Audio.stop(that.buffer, that.padHash[pad]);
    };

    this.playSample = function(pad){
      YMPC.Audio.play(that.buffer, that.padHash[pad]) 
    };
  };

//Method for instantiating new buffers
  var createSoundBoard = function(name, buffer){
    if(!soundBoardHash[name]){
      soundBoardHash[name] = new soundBoard(name, buffer);
    }
  };
 
  var getSoundBoard = function(name){
    if(soundBoardHash[name]){
      return soundBoardHash[name];
    }else{
      return 'No existing soundboard!';
    }
  };

  var soundboardDump = function(){
    return soundBoardHash;
  };

  return {
//--createSoundBoard(name[string], buffer[from audio_module])
    createSoundBoard: createSoundBoard,
//--getSoundBoard(name[string])      
    getSoundBoard: getSoundBoard,

    soundboardDump: soundboardDump
  }



})();
