define(  [ 'jquery', 'd3', 'Canvas' ],
function (     $   ,  d3 ,  Canvas  ) {

  var BrushTool = {
    make: function() {
      d3.select( '#options' ).html( 'This is the brush tool!' );
    },
    destroy: function() {

    }
  };

  return BrushTool;

} );
