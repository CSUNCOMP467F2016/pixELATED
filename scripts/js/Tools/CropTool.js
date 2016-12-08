
define(  [ 'jquery', 'Canvas', 'd3' , 'Cropperjs' ],
    function (     $, Canvas, d3, Cropperjs ) {
        var cropper;
        var cropCanvasData;
        var imgURL;
        var CropTool = {
            make: function () {
                this.setupOptions();

                var image = document.getElementById( 'visualcanvas' );

                cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                    movable: false,
                    crop: function ( e ) {
                    },
                    cropend: function ( e ) {
                        cropCanvasData = cropper.getCroppedCanvas();
                        imgURL = cropCanvasData.toDataURL();
                        console.log(cropCanvasData);
                        console.log(imgURL);

                    }
                });

            },
            destroy: function () {
                //Called when the user activates another tool
                cropper.destroy();
            },
            //Crop button added to options div in index
            setupOptions: function () {
                var options = d3.select('#options');

                //cropping button
                options.append( 'button' )
                    .html( 'Crop' )
                    .on( 'click', cropBtn );
            },
    };
    //Replace image with whats inside crop box
    function cropBtn()
    {
        cropper.replace( imgURL );
        console.log("Image replaced");
        };

        return CropTool;

    } );
