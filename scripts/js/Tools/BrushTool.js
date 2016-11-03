define(  [ 'jquery', 'd3', 'Canvas', 'Farbtastic' ],
function (     $   ,  d3 ,  Canvas ,  Farbtastic  ) {
//Really a mirror Tool currently
  var BrushTool = {
    colorHex: '#000',
    colorRGB: { r: 0, g: 0, b: 0},
    weight: 20,
    sharpness: 1,
    isDrawing: null,
    lastPoint: null,
    make: function() {
      Canvas.context.lineJoin = 'round';
      Canvas.context.lineCap = 'round';

      $( '#visualcanvas' ).on( 'mousedown', BrushTool.mouseDown );
      $( '#visualcanvas' ).on( 'mousemove', BrushTool.mouseMove );
      $( '#visualcanvas' ).on( 'mouseup', BrushTool.mouseUp );

      this.setupOptions();
    },
    destroy: function () {
        Canvas.image.src = Canvas.canvas.toDataURL();
      $( '#visualcanvas' ).off( 'mousedown', BrushTool.mouseDown );
      $( '#visualcanvas' ).off( 'mousemove', BrushTool.mouseMove );
      $( '#visualcanvas' ).off( 'mouseup', BrushTool.mouseUp );
    },
    setupOptions: function() {
      var options = d3.select( '#options' );
      options.append( 'div' )
        .attr( 'id', 'BrushToolColorPicker' )
        .style( 'display', 'block' )
        .style( 'width', '80%' )
        .style( 'margin', 'auto' );

      $( '#BrushToolColorPicker' ).farbtastic( function() {
        BrushTool.colorHex = this.color;
        BrushTool.colorRGB = hexToRgb( BrushTool.colorHex );
      } );

      options.append( 'input' )
        .attr( 'id', 'BrushToolWeight' )
        .attr( 'type', 'range' )
        .attr( 'min', '1' )
        .attr( 'max', '250' )
        .attr( 'value', BrushTool.weight )
        .attr( 'step', '1' )
        .on( 'change', function() {
          BrushTool.weight = +this.value;
        } );

      options.append( 'input' )
        .attr( 'id', 'BrushToolSharpness' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '1' )
        .attr( 'value', BrushTool.sharpness )
        .attr( 'step', '0.05' )
        .on( 'change', function() {
          BrushTool.sharpness = +this.value * 0.99;
        } );
    },
    mouseDown: function( e ) {
      BrushTool.isDrawing = true;
      BrushTool.lastPoint = { x: ( ( e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e ) / Canvas.visual.context.getTransform().a ),
                           y: ( ( e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f ) / Canvas.visual.context.getTransform().a ) };
    },
    mouseMove: function( e ) {
      if (!BrushTool.isDrawing) return;
      var currentPoint = { x: ( ( e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e ) / Canvas.visual.context.getTransform().a ),
                           y: ( ( e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f ) / Canvas.visual.context.getTransform().a ) };
      var dist = distanceBetween(BrushTool.lastPoint, currentPoint);
      var angle = angleBetween(BrushTool.lastPoint, currentPoint);

      for (var i = 0; i < dist; i+=5) {

        x = BrushTool.lastPoint.x + (Math.sin(angle) * i);
        y = BrushTool.lastPoint.y + (Math.cos(angle) * i);

        var radgrad = Canvas.visual.context.createRadialGradient(x,y,BrushTool.weight/4,x,y,BrushTool.weight/2);

        radgrad.addColorStop(0, BrushTool.colorHex );
        radgrad.addColorStop(BrushTool.sharpness, 'rgba(' + BrushTool.colorRGB.r + ',' + BrushTool.colorRGB.g + ',' + BrushTool.colorRGB.b + ',1)' );
        radgrad.addColorStop(1, 'rgba(' + BrushTool.colorRGB.r + ',' + BrushTool.colorRGB.g + ',' + BrushTool.colorRGB.b + ',0)' );

        Canvas.visual.context.fillStyle = radgrad;
        Canvas.visual.context.fillRect(x - (BrushTool.weight / 2), y - (BrushTool.weight / 2), BrushTool.weight, BrushTool.weight);
        Canvas.context.fillStyle = radgrad;
        Canvas.context.fillRect(x - (BrushTool.weight / 2), y - (BrushTool.weight / 2), BrushTool.weight, BrushTool.weight);

      }

      BrushTool.lastPoint = currentPoint;
    },
    mouseUp: function() {
      BrushTool.isDrawing = false;
    }
  };


  function distanceBetween( point1, point2 ) {
    return Math.sqrt( Math.pow( point2.x - point1.x, 2 ) + Math.pow( point2.y - point1.y, 2 ) );
  }
  function angleBetween( point1, point2 ) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  return BrushTool;

} );
