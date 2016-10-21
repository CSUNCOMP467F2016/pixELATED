define(  [ 'jquery', 'BrushTool' ],
function (     $   ,  BrushTool  ) {
  var ToolController = {
    tools: { 'BrushTool': BrushTool },
    activeTool: null,
    activeToolName: null,
    init: function() {
        $( '#toolbar li').each( function() {
          $(this).on( 'click', function() {

            //The active class just indicate which button will be highlighted
            $(this).siblings().removeClass( 'active' );
            $(this).addClass( 'active' );

            //Destroy the current tool if possible and clear options div
            if( ToolController.activeTool != null ) {
              ToolController.activeTool.destroy();
              $( '#options' ).empty();

              console.log( 'Destroyed ' + ToolController.activeToolName );
            }
            //Now make the tool if it exists
            var clickedTool = $(this).attr( 'id' );
            if( ToolController.tools.hasOwnProperty( clickedTool ) ) {
              ToolController.activeTool = ToolController.tools[ clickedTool ];
              $( '#options' ).empty();
              ToolController.activeTool.make();
              ToolController.activeToolName = clickedTool;

              console.log( 'Made ' + ToolController.activeToolName );
            }
            else {
              ToolController.activeTool = null;
            }

          } );
        } );
    }
  };

  return ToolController;

} );
