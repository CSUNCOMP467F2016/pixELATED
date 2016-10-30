define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,  Canvas ,  Caman  ) {

  var BriAndConTool = {
    brightness: 0,
    contrast: 0,
    make: function() {
      this.setupOptions();
    },
    destroy: function() {
      //Called when the user activates another tool
      Caman( Canvas.canvas, function () {
        // manipulate image here
        // Arguments: (contrast)
        this.contrast( BriAndConTool.contrast );
        this.render( function() {
          Canvas.image.src = Canvas.canvas.toDataURL();
        } );
      } );
    },
    sliderChange: function( val, s ) {

    	if (s == 'brightness') {
    		BriAndConTool.brightness = val;
    	}
    	if (s == 'contrast') {
    		BriAndConTool.contrast = val;
    	}
    	Caman( Canvas.visual.canvas, function () {
      	// manipulate image here
      	// Arguments: (brightness, contrast)
		if (s == 'brightness') {
			this.brightness( BriAndConTool.brightness );
    	}
    	if (s == 'contrast') {
    		this.contrast( BriAndConTool.contrast );
    	}
        this.render();
        this.revert(false);
      } );
    },
    setupOptions: function() {
      var options = d3.select( '#options' );
      
      //brightness Slider
      options.append( 'input' )
        .attr( 'id', 'BriAndConTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '-100' )
        .attr( 'max', '100' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'change', function() {
          var val = +this.value;
          BriAndConTool.sliderChange( val, 'brightness' );
        } );
      // contrast Slider
      options.append( 'input' )
      .attr( 'id', 'BriAndConTool' )
      .attr( 'type', 'range' )
      .attr( 'min', '-100' )
      .attr( 'max', '100' )
      .attr( 'value', '0' )
      .attr( 'step', '1' )
      .on( 'change', function() {
        var val = +this.value;
        BriAndConTool.sliderChange( val, 'contrast' );
      } );
    }
  };

  return BriAndConTool;

} );