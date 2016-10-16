//http://codepen.io/techslides/pen/zowLd

define(  [ 'jquery', 'd3' ],
function (    $    ,  d3  ) {

  var Canvas = {
    canvas: null,
    d3canvas: null,
    context: null,
    image: null,
    width: 960,
    height: 540,
    scale: null,
    scaleRange: [0.1, 24], //10% to 2400%
    scaleAndCoords: null,
    init: function( id ) {
      this.width = $( '#' + id ).width();
      this.height = $( '#' + id ).height();
      this.scale = 1;
      this.d3canvas = d3.select( '#' + id ).append( 'canvas' )
                                              .attr( 'id', 'canvas' )
                                              .attr( 'width', this.width + 'px' )
                                              .attr( 'height', this.height + 'px' );
      this.canvas = document.getElementById( 'canvas' );
      this.context = this.canvas.getContext( '2d' );

      //Make it pixelated
      this.context.mozImageSmoothingEnabled = false;
      this.context.imageSmoothingEnabled = false;

      //Let's also add a div in the bottom right to show scale and coordinates
      this.scaleAndCoords = d3.select( 'body' ).append( 'div' )
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

      this.trackTransforms();

      this.redraw();

      var lastX = this.width/2, lastY = this.height/2;

      var dragStart, dragged;

      this.canvas.addEventListener( 'mousedown', function( e ) {
          document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
          lastX = e.offsetX || ( e.pageX - this.canvas.offsetLeft );
          lastY = e.offsetY || ( e.pageY - this.canvas.offsetTop );
          dragStart = Canvas.context.transformedPoint( lastX, lastY );
          dragged = false;
      },false);

      this.canvas.addEventListener( 'mousemove', function( e ) {
        if( e.shiftKey ) {
          lastX = e.offsetX || ( e.pageX - this.canvas.offsetLeft );
          lastY = e.offsetY || ( e.pageY - this.canvas.offsetTop );
          dragged = true;
          if( dragStart ) {
            var pt = Canvas.context.transformedPoint( lastX, lastY );
            Canvas.context.translate( pt.x-dragStart.x, pt.y-dragStart.y );
            Canvas.redraw();
          }
        }
      }, false );

      this.canvas.addEventListener( 'mouseup', function( e ) {
          dragStart = null;
      }, false );

      var scaleFactor = 1.1;

      var zoom = function( clicks ) {
          var factor = Math.pow( scaleFactor, clicks );
          if( Canvas.scale * factor > Canvas.scaleRange[0] &&
              Canvas.scale * factor < Canvas.scaleRange[1] ) {
            var pt = Canvas.context.transformedPoint( lastX, lastY );
            Canvas.context.translate( pt.x, pt.y );
            Canvas.context.scale( factor, factor );
            Canvas.scale *= factor;
            Canvas.scaleAndCoords.html( (Canvas.scale * 100).toFixed(0) + '%' )
            Canvas.context.translate( -pt.x, -pt.y );
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

      this.canvas.addEventListener( 'DOMMouseScroll', handleScroll, false );
      this.canvas.addEventListener( 'mousewheel', handleScroll, false );
    },
    setImage: function( src ) {
      this.image.src = src;
      this.image.onload = function() {
        Canvas.redraw();
      }
    },
    redraw: function() {

      // Clear the entire canvas
      var p1 = this.context.transformedPoint(0,0);
      var p2 = this.context.transformedPoint(this.width,this.height);
      this.context.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

      this.context.save();
      this.context.setTransform(1,0,0,1,0,0);
      this.context.clearRect(0,0,this.width,this.height);
      this.context.restore();

      this.context.drawImage(this.image,0,0);
    },
    trackTransforms: function() {
      var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
      var xform = svg.createSVGMatrix();
      this.context.getTransform = function(){ return xform; };

      var savedTransforms = [];
      var save = this.context.save;
      this.context.save = function(){
          savedTransforms.push(xform.translate(0,0));
          return save.call(Canvas.context);
      };

      var restore = this.context.restore;
      this.context.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(Canvas.context);
          };

      var scale = this.context.scale;
      this.context.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(Canvas.context,sx,sy);
          };

      var rotate = this.context.rotate;
      this.context.rotate = function(radians){
          xform = xform.rotate(radians*180/Math.PI);
          return rotate.call(Canvas.context,radians);
      };

      var translate = this.context.translate;
      this.context.translate = function(dx,dy){
          xform = xform.translate(dx,dy);
          return translate.call(Canvas.context,dx,dy);
      };

      var transform = this.context.transform;
      this.context.transform = function(a,b,c,d,e,f){
          var m2 = svg.createSVGMatrix();
          m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
          xform = xform.multiply(m2);
          return transform.call(Canvas.context,a,b,c,d,e,f);
      };

      var setTransform = this.context.setTransform;
      this.context.setTransform = function(a,b,c,d,e,f){
          xform.a = a;
          xform.b = b;
          xform.c = c;
          xform.d = d;
          xform.e = e;
          xform.f = f;
          return setTransform.call(Canvas.context,a,b,c,d,e,f);
      };

      var pt  = svg.createSVGPoint();
      this.context.transformedPoint = function(x,y){
          pt.x=x; pt.y=y;
          return pt.matrixTransform(xform.inverse());
      }
    }
  }

  return Canvas;

} );
