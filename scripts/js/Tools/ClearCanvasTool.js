
define(  [ 'jquery', 'Canvas' , 'd3'],
function (     $   ,  Canvas  , d3 ) {

    var ClearCanvasTool = {
    make: function() {
      //Called when the user activates the tool
        var options = d3.select('#options');
        var Degree = 0;
  
        options.append('button')
        .html('Clearing Canvas \n are you sure?')
        .on('click', function () {
            rotate(Degree);
            options.html('Clearing Canvas');
        });
        
    },

    destroy: function () {
        //Make sure our canvas scale is where it began
        Canvas.context.scale(1, 1);
    }
  };

  function rotate( degrees ) { 

      Canvas.context.clearRect( 0, 0, Canvas.width, Canvas.height );
      Canvas.image.src = Canvas.canvas.toDataURL();
  }

  return ClearCanvasTool;

} );
