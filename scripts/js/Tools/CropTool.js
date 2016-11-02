
//Add the tool to ToolController.js' define
// ex. define(  [ ... , 'TemplateTool' ],
//     function ( ... ,  TemplateTool  ) {
//Add the tool to ToolController.js' tool object
// ex.{ ... , 'TemplateTool': TemplateTool }

define(  [ 'jquery', 'Canvas', 'd3' , 'Cropperjs' ],
    function (     $, Canvas, d3, Cropperjs ) {
        //croppie implementation var
        // var $element = $('.my-croppie-element');
        var cropper;
        var CropTool = {
            make: function() {
                //Called when the user activates the tool
                // Crop with croppie
                // $element.croppie({
                //     viewport: {
                //         width: 100,
                //         height: 100,
                //         type: 'square'
                //     },
                //     boundary: {
                //         width: Canvas.context.width,
                //         height: Canvas.context.height
                //     }
                //
                // });
                // $element.croppie('bind', Canvas.image.src);
                // $element.croppie('result', 'canvas').then(function (result) {
                //     $('#result-image').attr('src',result);
                // });

                 var image = document.getElementById('visualcanvas');
                 cropper = new Cropper(image, {
                    aspectRatio: 16 / 9,
                    viewMode: 1,
                    crop: function (e) {
                        console.log(e.detail.x);
                        console.log(e.detail.y);
                        console.log(e.detail.width);
                        console.log(e.detail.height);
                        console.log(e.detail.rotate);
                        console.log(e.detail.scaleX);
                        console.log(e.detail.scaleY);
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
