//Add the path to this file in config.js
  // ex. TemplateTool: 'js/Tools/TemplateTool'
//Add an id to the li element that matches the tools name in index.html
  // ex. <li id='TemplateTool' >
//Add the tool to ToolController.js' define
  // ex. define(  [ ... , 'TemplateTool' ],
  //     function ( ... ,  TemplateTool  ) {
//Add the tool to ToolController.js' tool object
  // ex.{ ... , 'TemplateTool': TemplateTool }

define(  [ 'jquery', 'Canvas' ],
function (     $   ,  Canvas  ) {

  var TemplateTool = {
    make: function() {
      //Called when the user activates the tool

    },
    destroy: function() {
      //Called when the user activates another tool
      
    }
  };

  return TemplateTool;

} );
