
//Add the tool to ToolController.js' define
// ex. define(  [ ... , 'TemplateTool' ],
//     function ( ... ,  TemplateTool  ) {
//Add the tool to ToolController.js' tool object
// ex.{ ... , 'TemplateTool': TemplateTool }

define(  [ 'jquery', 'Canvas' ],
    function (     $   ,  Canvas  ) {

        var CropTool = {
            make: function() {
                //Called when the user activates the tool

            },
            destroy: function() {
                //Called when the user activates another tool

            }
        };

        return CropTool;

    } );
