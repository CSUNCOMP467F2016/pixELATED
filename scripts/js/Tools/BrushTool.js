define(  [ 'jquery', 'd3', 'Canvas' ],
function (     $   ,  d3 ,  Canvas  ) {
//Really a mirror Tool currently
  var BrushTool = {
    make: function() {

      var options = d3.select( '#options' );
      options.append( 'button' )
        .html( 'Flip Vertically' )
        .on( 'click', BrushTool.flipVertically );
      options.append( 'button' )
        .html( 'Flip Horizontally' )
        .on( 'click', BrushTool.flipHorizontally );
    },
    flipHorizontally: function() { flip( 'h' ); },
    flipVertically: function() { flip( 'v' ); },
    destroy: function() {
      //Make sure our canvas scale is where it began
      Canvas.context.scale( 1, 1 );
    }
  };

  function flip( HorV ) {
    var scaleX = 1;
    var scaleY = 1;
    var posX = 0;
    var posY = 0;

    if( HorV.toLowerCase() == 'h' ) {
      scaleX = -1;
      posX = -Canvas.width;
    }
    else {
      scaleY = -1;
      posY = -Canvas.height;
    }
    //invert the
    Canvas.context.scale( scaleX, scaleY );
    Canvas.context.drawImage( Canvas.image, posX, posY, Canvas.width, Canvas.height );
    Canvas.image.src = Canvas.canvas.toDataURL();
  }

  return BrushTool;

} );
