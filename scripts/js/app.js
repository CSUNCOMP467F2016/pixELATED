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
        'http://i.imgur.com/hBrzS9O.png', //[x] Gears PLTE
        //'http://i.imgur.com/4BTadWF.png', //[x] Dinosaurs F01
        //'http://i.imgur.com/6MCIS.png', //[] Snowy Mountain F
        //'https://i.imgur.com/MJma1zV.png', //[] Autumn RGBA
        //'http://i.imgur.com/7f3AnsG.png', //[x] Pixel Warrior PLTE
        //'http://i.imgur.com/EPBbVXu.jpg', //[] cavern Road RGBA Alpha
        //'http://i.imgur.com/BtqUiXp.jpg', //[] Hashbrown RGAB Alpha
        //'http://i.imgur.com/Ttwkeg7.jpg', //[] Skeleton Bird iCCP?
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
