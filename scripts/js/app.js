define(  [ 'Canvas', 'ToolController' ],
function (  Canvas ,  ToolController  ) {
  var app = {
    init: function () {
      Canvas.init( 'rightpanel' );
      //Canvas.setImage( 'resources/chameleon.jpg' );
      Canvas.setImage( 'http://i.imgur.com/FiaiRij.jpg' );
      //Canvas.setImage( 'http://i.imgur.com/7f3AnsG.png' );

      ToolController.init();
    }
  };

  return app;

} );
