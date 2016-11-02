// code obtained from http://stackoverflow.com/questions/25907163/html5-canvas-eraser-tool-without-overdraw-white-color

define(['jquery', 'd3', 'Canvas'],
function (     $   ,  d3 ,  Canvas    ) {
  var lastX;
  var lastY;
  var strokeColor = "red";
  var strokeWidth = 5;
  var mouseX;
  var mouseY;
  var offsetX = Canvas.offsetLeft;
  var offsetY = Canvas.offsetTop;
  var isMouseDown = false;
  var EraseTool = {

    make: function() {
        Canvas.context.lineJoin = 'round';
        Canvas.context.lineCap = 'round';

        $( '#visualcanvas' ).on( 'mousedown', EraseTool.mouseDown );
        $( '#visualcanvas' ).on( 'mousemove', EraseTool.mouseMove );
        $( '#visualcanvas' ).on( 'mouseup', EraseTool.mouseUp );

        this.setupOptions();
    },
    destroy: function() {
        $( '#visualcanvas' ).off( 'mousedown', EraseTool.mouseDown );
        $( '#visualcanvas' ).off( 'mousemove', EraseTool.mouseMove );
        $( '#visualcanvas' ).off( 'mouseup', EraseTool.mouseUp );
    },
    
    setupOptions: function() {
        

    },
    handleMouseDown: function (e){
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY);

      // Put your mousedown stuff here
      lastX=mouseX;
      lastY=mouseY;
      isMouseDown=true;
    },

    handleMouseUp: function (e){
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY);

      // Put your mouseup stuff here
      isMouseDown=false;
    },
    handleMouseOut: function (e){
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY);

      // Put your mouseOut stuff here
      isMouseDown=false;
    },
    handleMouseMove: function (e){
      mouseX=parseInt(e.clientX-offsetX);
      mouseY=parseInt(e.clientY-offsetY);

    // Put your mousemove stuff here
      if(isMouseDown){
          Canvas.context.beginPath();
         
          Canvas.visual.context.globalCompositeOperation="destination-out";
          Canvas.visual.context.arc(lastX,lastY,8,0,Math.PI*2,false);
          Canvas.visual.context.fill();

          lastX=mouseX;
          lastY=mouseY;
      }
    }
  };

  $("#visualcanvas").mousedown(function (e) { handleMouseDown(e); });
  $("#visualcanvas").mousemove(function (e) { handleMouseMove(e); });
  $("#visualcanvas").mouseup(function (e) { handleMouseUp(e); });
  $("#visualcanvas").mouseout(function (e) { handleMouseOut(e); });

  return EraseTool;

} );
