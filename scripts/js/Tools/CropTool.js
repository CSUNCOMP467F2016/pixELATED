
define(  [ 'jquery', 'Canvas', 'd3' , 'Cropperjs' ],
    function (     $, Canvas, d3, Cropperjs ) {
        var cropper;
        var CropTool = {
            make: function() {

                var image = document.getElementById( 'visualcanvas' );
                cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                    crop: function (e) {
                        console.log( e.detail.x );
                        console.log( e.detail.y );
                        console.log( e.detail.width );
                        console.log( e.detail.height );
                        console.log( e.detail.rotate );
                        console.log( e.detail.scaleX );
                        console.log( e.detail.scaleY );
                        var cropX = e.detail.x;
                        console.log(cropX);
                    },
                    cropend: function (e) {
                        var croppedImg = cropper.getCropBoxData();
                        console.log( croppedImg );

                    }
                });

            },
            destroy: function() {
                //Called when the user activates another tool
                cropper.destroy();
            }

        };
        return CropTool;

    } );
