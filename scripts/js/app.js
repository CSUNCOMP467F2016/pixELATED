define(  [ 'Canvas', 'ToolController', 'Upload', 'PNGDecoder' ],
function (  Canvas ,  ToolController ,  Upload ,  PNGDecoder  ) {
  var app = {
    init: function () {
      Canvas.init( 'rightpanel' );
      //Canvas.setImage( 'resources/chameleon.jpg' );
      //Canvas.setImage( 'http://i.imgur.com/FiaiRij.jpg' );
      //Canvas.setImage( 'http://i.imgur.com/7f3AnsG.png' );

      PNGDecoder(
        //'resources/PNGTest.png',
        //'http://i.imgur.com/hBrzS9O.png',
        //'http://i.imgur.com/4BTadWF.png', //Dinosaurs
        'http://i.imgur.com/6MCIS.png', //Snowy Mountain
        //'https://i.imgur.com/MJma1zV.png',
        //'http://i.imgur.com/7f3AnsG.png',
        function( PNGcanvas ) {
          Canvas.setImage( PNGcanvas );
        }
      );

      ToolController.init();

      Upload.init();
    }
  };

  return app;

} );
