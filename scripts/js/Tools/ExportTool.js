//Add the path to this file in config.js
  // ex. TemplateTool: 'js/Tools/TemplateTool'
//Add an id to the li element that matches the tools name in index.html
  // ex. <li id='TemplateTool' >
//Add the tool to ToolController.js' define
  // ex. define(  [ ... , 'TemplateTool' ],
  //     function ( ... ,  TemplateTool  ) {
//Add the tool to ToolController.js' tool object
  // ex.{ ... , 'TemplateTool': TemplateTool }

define(  [ 'jquery', 'd3', 'Canvas' ],
function (     $   ,  d3 ,  Canvas  ) {

  var ExportTool = {
    make: function() {
      this.setupOptions(); console.log('here');
    },
    setupOptions: function() {
      var options = d3.select( '#options' ).style( 'width', '240px' );
      options.append( 'a' )
        .attr( 'id', 'downloadcanvas' )
        .attr( 'target', '_blank' )
        .style( 'cursor', 'pointer' )
        .style( 'background-color', '#050505' )
        .style( 'padding', '4px' )
        .style( 'color', 'white' )
        .style( 'text-decoration', 'none' )
        .html( 'Export' );
      //Called when the user activates the tool
      $( '#downloadcanvas' ).on('click', function (e) {
        var dataURL = Canvas.canvas.toDataURL( 'image/png' );
        $(this).attr( 'href', dataURL );
      } );
    },
    destroy: function() {
      //Called when the user activates another tool

    }
  };

  return ExportTool;

} );
