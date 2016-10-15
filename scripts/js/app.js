define(  [ 'Canvas', 'ToolController' ],
function (  Canvas ,  ToolController  ) {
  var app = {
    init: function () {
      Canvas.init( 'rightpanel' );
      Canvas.setImage( 'resources/chameleon.jpg' );
      ToolController.init();
    }
  };

  return app;

} );
