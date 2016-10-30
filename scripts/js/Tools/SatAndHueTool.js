define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,  Canvas ,  Caman  ) {

  var SatAndHueTool = {
    hue: 0,
    saturation: 0,
    make: function() {
      this.setupOptions();
    },
    destroy: function() {
      //Called when the user activates another tool
      Caman( Canvas.canvas, function () {
        // manipulate image here
        // Arguments: (saturation)
        this.saturation( SatAndHueTool.saturation );
        this.render( function() {
          Canvas.image.src = Canvas.canvas.toDataURL();
        } );
      } );
    },
    sliderChange: function( val, s ) {

    	if (s == 'hue') {
    		SatAndHueTool.hue = val;
    	}
    	if (s == 'saturation') {
    		SatAndHueTool.saturation = val;
    	}
    	Caman( Canvas.visual.canvas, function () {
      	// manipulate image here
      	// Arguments: (hue, saturation)
		if (s == 'hue') {
			this.hue( SatAndHueTool.hue );
    	}
    	if (s == 'saturation') {
    		this.saturation( SatAndHueTool.saturation );
    	}
        this.render();
        this.revert(false);
      } );
    },
    setupOptions: function() {
      var options = d3.select( '#options' );
      
      //Hue Slider
      options.append( 'input' )
        .attr( 'id', 'SatAndHueTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '100' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'change', function() {
          var val = +this.value;
          SatAndHueTool.sliderChange( val, 'hue' );
        } );
      // Saturation Slider
      options.append( 'input' )
      .attr( 'id', 'SatAndHueTool' )
      .attr( 'type', 'range' )
      .attr( 'min', '-100' )
      .attr( 'max', '100' )
      .attr( 'value', '0' )
      .attr( 'step', '1' )
      .on( 'change', function() {
        var val = +this.value;
        SatAndHueTool.sliderChange( val, 'saturation' );
      } );
    }
  };

  return SatAndHueTool;

} );