define(  [ 'Canvas', 'ToolController', 'Upload' ],
function (  Canvas ,  ToolController ,  Upload  ) {
  var app = {
    init: function () {
      Canvas.init( 'rightpanel' );
      //Canvas.setImage( 'resources/chameleon.jpg' );
      //Canvas.setImage( 'http://i.imgur.com/FiaiRij.jpg' );
      Canvas.setImage( 'http://i.imgur.com/7f3AnsG.png' );

      ToolController.init();

      Upload.init();
    }
  };

  return app;

} );
