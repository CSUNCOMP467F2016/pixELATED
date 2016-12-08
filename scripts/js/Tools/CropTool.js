
define(  [ 'jquery', 'Canvas', 'd3' , 'Cropperjs' ],
    function (     $, Canvas, d3, Cropperjs ) {
        var cropper;
        var croppedImg;
        var imgURL;
        var CropTool = {
            make: function () {
                this.setupOptions();
                var image = document.getElementById('visualcanvas');
                cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                    crop: function (e) {
                        // console.log( e.detail.x );
                        // console.log( e.detail.y );
                        // console.log( e.detail.width );
                        // console.log( e.detail.height );
                        // console.log( e.detail.rotate );
                        // console.log( e.detail.scaleX );
                        // console.log( e.detail.scaleY );
                        var cropX = e.detail.x;
                        // console.log(cropX);
                    },
                    cropend: function (e) {
                        croppedImg = cropper.getCroppedCanvas(image);
                        imgURL = croppedImg.toDataURL();
                        console.log(croppedImg);

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
                    .on( 'click', cropBtn);
            },
    };
    //What happens when you click the crop button
    function cropBtn()
    {
        // Canvas.context.drawImage();
        Canvas.redraw();
        Canvas.image.src = imgURL;
        console.log("click");

        };

        return CropTool;

    } );
