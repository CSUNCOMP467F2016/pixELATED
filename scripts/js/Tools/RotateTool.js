
define(  [ 'jquery', 'Canvas' , 'd3'],
function (     $   ,  Canvas  , d3 ) {

  var RotateTool = {
    make: function() {
      //Called when the user activates the tool
        var options = d3.select('#options');
        options.html('Rotating 90 degrees');
        Rotate( 90 ); 
    },
    
    destroy: function () {
        //Make sure our canvas scale is where it began
        Canvas.context.scale(1, 1);
    }
  };
  function Rotate(Degree) {
      var posX = 0;
      var posY = 0;
      Canvas.context.drawImage(Canvas.image, Canvas.width/2, Canvas.height/2);
      Canvas.visual.context.rotate(90)
      Canvas.context.drawImage(Canvas.image, 0, 0);
      Canvas.image.src = Canvas.canvas.toDataURL();
  }
  return RotateTool;

} );
