YMPC.UI = (function(){
  var i;
  var canvasWidth;
  var canvasHeight;
  var canvas = document.getElementById('testCanvas');
  var ctx = canvas.getContext('2d');

  var canvasState = {
    mouseX: 0,
    mouseY: 0,
    objectPool: [],
    hoveredPool: [],
    mouseDown: false
  }; 

  function drawRect(x, y, w, h, method, color){
    var style = color || 'rgb(230, 230, 230)';
    ctx.save();
    ctx.translate(x, y);
   
    switch(method){
      case 'fill':
        ctx.fillStyle = style;
        ctx.fillRect(0, 0, w, h);
        break;
      case 'stroke':
        ctx.strokeStyle = style;
        ctx.strokeRect(0, 0, w, h);
        break;
      default:
        ctx.strokeStyle = style;
        ctx.strokeRect(0, 0, w, h);
        break;
    }

    ctx.restore();
  };
  
  var setCanvasDimensions = function(){
    canvas.width = window.innerWidth;
    canvas.height = 400;
  }; 

  var isMouseOver = function(object){
    if(canvasState.mouseX >= object.xPos &&
       canvasState.mouseX <= (object.xPos + object.width)){
        
      if(canvasState.mouseY >= object.yPos &&
         canvasState.mouseY <= (object.yPos + object.height)){
         object.hover = true;
         canvasState.hoveredPool.push(object);
      } 
    }
  };

  var setMousePosition = function(e){
    var bound = canvas.getBoundingClientRect();
    canvasState.mouseX = e.pageX - bound.left;
    canvasState.mouseY = e.pageY - bound.top;  
  };

  var detectHoveredObjects = function(e){
    canvasState.hoveredPool = [];

    for( i in canvasState.objectPool ){
      canvasState.objectPool[i].hover = false;
    };

    for( i in canvasState.objectPool ){
      isMouseOver(canvasState.objectPool[i]);
    };
  };

  var visualObject = function(xPos, yPos, width, height, shape){  
    var that = this;
    this.shape = shape;
    this.width = width;
    this.height = height;
    this.xPos = xPos;
    this.yPos = yPos;
    this.hover = false;

    this.render = function(){
      drawRect(this.xPos, this.yPos, this.width, this.height, 'stroke')
    };
  };
  
  var MPC = function(xPos, yPos, width){
    var that = this;
    this.shape = 'rec';
    this.width = width;
    this.height = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.padWidth = this.width * 0.25;

    function writePadData(){
      var currentPad;
      var rowHelper;
      var currentRow = 1;
      var padWidth = that.padWidth; 
      var margin = (that.width - padWidth * 4) / 5; 
     
      for(var key in that.padArray){
        currentPad = that.padArray[key];
        canvasState.objectPool.push(currentPad);
        rowHelper = key % 4; 

        currentPad.xPos = that.xPos + (margin + rowHelper * margin) + (padWidth * rowHelper);
        currentPad.yPos = that.yPos + (currentRow * margin) + ((currentRow - 1) * padWidth);
        currentPad.width = that.padWidth;
        currentPad.height = that.padWidth;
          
        if(rowHelper === 3){
        currentRow += 1;
        }
      }
    }

    function init(){
      writePadData();
      canvasState.objectPool.push(that);    
    };

    init();
  }; 

  MPC.prototype = new visualObject();
  MPC.prototype.constructor = MPC;
  MPC.prototype.padArray = [];
  MPC.prototype.hoverHandler = function(){
    for(i in this.padArray){
      this.isMouseOver(this.padArray[i]); 
    };
  };

  var Pad = function(id){
    this.id = id;
    this.xPos = 0;
    this.yPos = 0;
    this.width;
    this.height;
  };

  Pad.prototype = new visualObject();
  Pad.prototype.constructor = Pad;
  Pad.prototype.render = function(){
    var hover;

    if(this.hover){
      method = 'fill';
    }else{
      method = 'stroke';
    }


    drawRect(this.xPos, this.yPos, this.width, this.height, method)
  };


  var row = 0;
  
  for(i = 1; i <= 16; i++){
    if(i % 4 === 1){
      row += 1;
    } 
    MPC.prototype.padArray.push(new Pad(i));
  };

  var renderUI = function(){
    ctx.save();
    ctx.fillStyle = 'rgb(40,40,40)';
    ctx.fillRect(0,0,9999,9999);
    ctx.restore();

    var item;
    for(i = 0; i < canvasState.objectPool.length; i++){
      item = canvasState.objectPool[i];
      item.render();
    };
  };

  var init = function(){
    setCanvasDimensions();    
    var grid = new MPC(10, 10, 300);
    renderUI();
    bindEventListeners();
  };

  var bindEventListeners = function(){
    var that = this;
    window.addEventListener('mousemove', function(e){
      setMousePosition(e);
      detectHoveredObjects(e);
      renderUI();
    });

    window.addEventListener('mousedown', function(e){
      canvasState.mouseDown = true;
      renderUI();
    });

    window.addEventListener('mouseup', function(e){
      canvasState.mouseDown = false;
      renderUI();
    });
  };

  init();

  return {

  };
})();
