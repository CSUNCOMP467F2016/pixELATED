//http://codepen.io/techslides/pen/zowLd

define(  [ 'jquery', 'd3' ],
function (    $    ,  d3  ) {

  var Canvas = {
    //The true canvas
    canvas: null,
    context: null,
    image: null,
    width: null,
    height: null,
    //The canvas we see on the screen
    visual: {
      canvas: null,
      context: null,
      image: null,
      width: null,
      height: null,
      scale: null,
      scaleRange: [0.1, 24], //10% to 2400%
      scaleAndCoords: null,
    },
    init: function( id ) {
      this.visual.width = $( '#' + id ).width();
      this.visual.height = $( '#' + id ).height();
      this.visual.scale = 1;
      d3.select( '#' + id ).append( 'canvas' )
        .attr( 'id', 'visualcanvas' )
        .attr( 'width', this.visual.width + 'px' )
        .attr( 'height', this.visual.height + 'px' );
      this.visual.canvas = document.getElementById( 'visualcanvas' );
      this.visual.context = this.visual.canvas.getContext( '2d' );

      //Make it pixelated
      this.visual.context.mozImageSmoothingEnabled = false;
      this.visual.context.imageSmoothingEnabled = false;

      //Let's also add a div in the bottom right to show scale and coordinates
      this.visual.scaleAndCoords = d3.select( 'body' ).append( 'div' )
        .attr( 'id', 'scaleAndCoords' )
        .style( 'position', 'absolute' )
        .style( 'right', '19px' )
        .style( 'bottom', '4px' )
        .style( 'padding', '4px' )
        .style( 'background-color', '#222' )
        .style( 'box-shadow', 'inset 0 0 10px black' )
        .style( 'font-family', 'Tahoma' )
        .style( 'font-size', '12px' )
        .style( 'line-height', '12px' )
        .html( '100%' );

      this.image = new Image();
      this.image.setAttribute( 'crossOrigin', 'anonymous' );
      this.visual.image = new Image();
      this.visual.image.setAttribute( 'crossOrigin', 'anonymous' );

      this.canvas = document.createElement( 'canvas' );

      this.trackTransforms();

      this.redraw();

      var lastX = this.visual.width/2, lastY = this.visual.height/2;

      var dragStart, dragged;

      this.visual.canvas.addEventListener( 'mousedown', function( e ) {
          document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
          lastX = e.offsetX || ( e.pageX - this.visual.canvas.offsetLeft );
          lastY = e.offsetY || ( e.pageY - this.visual.canvas.offsetTop );
          dragStart = Canvas.visual.context.transformedPoint( lastX, lastY );
          dragged = false;
      },false);

      this.visual.canvas.addEventListener( 'mousemove', function( e ) {
        if( e.shiftKey ) {
          lastX = e.offsetX || ( e.pageX - this.visual.canvas.offsetLeft );
          lastY = e.offsetY || ( e.pageY - this.visual.canvas.offsetTop );
          dragged = true;
          if( dragStart ) {
            var pt = Canvas.visual.context.transformedPoint( lastX, lastY );
            Canvas.visual.context.translate( pt.x-dragStart.x, pt.y-dragStart.y );
            Canvas.redraw();
          }
        }
      }, false );

      this.visual.canvas.addEventListener( 'mouseup', function( e ) {
          dragStart = null;
      }, false );

      var scaleFactor = 1.1;

      var zoom = function( clicks ) {
          var factor = Math.pow( scaleFactor, clicks );
          if( Canvas.visual.scale * factor > Canvas.visual.scaleRange[0] &&
              Canvas.visual.scale * factor < Canvas.visual.scaleRange[1] ) {
            var pt = Canvas.visual.context.transformedPoint( lastX, lastY );
            Canvas.visual.context.translate( pt.x, pt.y );
            Canvas.visual.context.scale( factor, factor );
            Canvas.visual.scale *= factor;
            Canvas.visual.scaleAndCoords.html( (Canvas.visual.scale * 100).toFixed(0) + '%' )
            Canvas.visual.context.translate( -pt.x, -pt.y );
            Canvas.redraw();
          }
      }

      var handleScroll = function( e ){
        if( e.shiftKey ) {
          var delta = e.wheelDelta ? e.wheelDelta/40 : e.detail ? -e.detail : 0;
          if ( delta ) zoom( delta );
        }
        return e.preventDefault() && false;
      };

      this.visual.canvas.addEventListener( 'DOMMouseScroll', handleScroll, false );
      this.visual.canvas.addEventListener( 'mousewheel', handleScroll, false );
    },
    setImage: function( src ) {
      if( typeof src === 'string' || src instanceof String ) {
        this.image.src = src;
      }
      else {
        this.image = src;
      }
      this.image.onload = function() {
        Canvas.width = this.width;
        Canvas.height = this.height;
        Canvas.canvas.width = Canvas.width;
        Canvas.canvas.height = Canvas.height;
        Canvas.context = Canvas.canvas.getContext( '2d' );
        Canvas.context.drawImage( Canvas.image, 0, 0 );
        Canvas.refresh();
      }
    },
    refresh: function() {
      Canvas.visual.image.src = Canvas.canvas.toDataURL();
      Canvas.visual.image.onload = function() {
        Canvas.redraw();
      }
    },
    redraw: function() {
      // Clear the entire canvas
      var p1 = this.visual.context.transformedPoint(0,0);
      var p2 = this.visual.context.transformedPoint(this.visual.width,this.visual.height);
      this.visual.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

      this.visual.context.save();
      this.visual.context.setTransform(1,0,0,1,0,0);
      this.visual.context.clearRect(0,0,this.visual.width,this.visual.height);
      this.visual.context.restore();

      this.visual.context.drawImage(this.image,0,0);
    },
    trackTransforms: function() {
      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
      var xform = svg.createSVGMatrix();
      this.visual.context.getTransform = function(){ return xform; };

      var savedTransforms = [];
      var save = this.visual.context.save;
      this.visual.context.save = function(){
          savedTransforms.push(xform.translate(0,0));
          return save.call(Canvas.visual.context);
      };

      var restore = this.visual.context.restore;
      this.visual.context.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(Canvas.visual.context);
          };

      var scale = this.visual.context.scale;
      this.visual.context.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(Canvas.visual.context,sx,sy);
          };

      var rotate = this.visual.context.rotate;
      this.visual.context.rotate = function(radians){
          xform = xform.rotate(radians* (Math.PI/180));
          return rotate.call(Canvas.visual.context,radians);
      };

      var translate = this.visual.context.translate;
      this.visual.context.translate = function(dx,dy){
          xform = xform.translate(dx,dy);
          return translate.call(Canvas.visual.context,dx,dy);
      };

      var transform = this.visual.context.transform;
      this.visual.context.transform = function(a,b,c,d,e,f){
          var m2 = svg.createSVGMatrix();
          m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
          xform = xform.multiply(m2);
          return transform.call(Canvas.visual.context,a,b,c,d,e,f);
      };

      var setTransform = this.visual.context.setTransform;
      this.visual.context.setTransform = function(a,b,c,d,e,f){
          xform.a = a;
          xform.b = b;
          xform.c = c;
          xform.d = d;
          xform.e = e;
          xform.f = f;
          return setTransform.call(Canvas.visual.context,a,b,c,d,e,f);
      };

      var pt  = svg.createSVGPoint();
      this.visual.context.transformedPoint = function(x,y){
          pt.x=x; pt.y=y;
          return pt.matrixTransform(xform.inverse());
      }
    }
  }

  return Canvas;

} );
