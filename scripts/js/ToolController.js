define(  [ 'jquery' ],
function (     $    ) {
  var ToolController = {
    init: function() {
        $( '#toolbar li').each( function() {
          $(this).on( 'click', function() {
            $(this).siblings().removeClass( 'active' );
            $(this).addClass( 'active' );
          } );
        } );
    }
  };

  return ToolController;

} );
