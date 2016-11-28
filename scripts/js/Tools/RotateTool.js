
define(  [ 'jquery', 'Canvas' , 'd3'],
function (     $   ,  Canvas  , d3 ) {
    var click = 0;
  var RotateTool = {
     make: function () {
         this.setupOptions();
        
    },

    destroy: function () {
        //Make sure our canvas scale is where it began
        Canvas.context.scale(1, 1);
    },
      setupOptions: function () {
          //Called when the user activates the tool
      var options = d3.select('#options');
      var Degree = 0;
        
      options.append('text')
        .text('Select Rotation Angle [0-360].\nCurrently Selected Angle ['+ Degree + ']');

      options.append('input')
      .attr('id', 'Rotate Degrees')
      .attr('type', 'range')
      .attr('min', '0')
      .attr('max', '360')
      .attr('value', Degree)
      .attr('step', '1')
      .on('change', function () {
          Degree = +this.value;
          options.append('text')
            .text('Currently Selected Angle [' + Degree + ']\n');
      });
        
      options.append('button')
      .html('Rotate')
      .on('click', function () {
          if (click == 0) {
              resize();
               
          }
          rotate(Degree);
          options.html('Rotating ' + Degree + ' degrees');
          click++;
      });
  }
  };

  function rotate( degrees ) { 
      var posX = 0;
      var posY = 0;
      Canvas.context.clearRect( 0, 0, Canvas.width, Canvas.height );
      Canvas.context.translate( Canvas.width/2, Canvas.height/2 );
      Canvas.context.rotate( degrees * (Math.PI/180) );
      Canvas.context.drawImage( Canvas.image, -Canvas.width/2, -Canvas.height/2 );
      Canvas.image.src = Canvas.canvas.toDataURL();
  }

  function resize() {
      Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
      var width = Canvas.width;
      var height = Canvas.height;
      var newSize = Math.sqrt((Canvas.width * Canvas.width) + (Canvas.height * Canvas.height))
      Canvas.width = newSize;
      Canvas.height = newSize;
      Canvas.canvas.width = newSize;
      Canvas.canvas.height = newSize;
      Canvas.context.drawImage(Canvas.image, ((newSize - width) / 2), ((newSize - height) / 2));
      Canvas.image.src = Canvas.canvas.toDataURL();

  }

  return RotateTool;

} );
