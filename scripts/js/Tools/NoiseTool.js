//Add the path to this file in config.js
  // ex. TemplateTool: 'js/Tools/TemplateTool'
//Add an id to the li element that matches the tools name in index.html
  // ex. <li id='TemplateTool' >
//Add the tool to ToolController.js' define
  // ex. define(  [ ... , 'TemplateTool' ],
  //     function ( ... ,  TemplateTool  ) {
//Add the tool to ToolController.js' tool object
  // ex.{ ... , 'TemplateTool': TemplateTool }

define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,Canvas ,  Caman ) {

  var NoiseTool = {
	  Noise: 0,
    make: function() {
      //Called when the user activates the tool
		this.setupOptions();
    },
    destroy: function() {
      //Called when the user activates another tool
       Caman( Canvas.canvas, function () {
        // manipulate image here
        //this.colorize( ColorizeTool.red, ColorizeTool.green, ColorizeTool.blue, ColorizeTool.strength );
		this.noise(NoiseTool.Noise);
        this.render( function() {
          Canvas.image.src = Canvas.canvas.toDataURL();
        } );
      } );
    },
	addValue: function(value) {
		Caman( Canvas.visual.canvas, function () {
      	// manipulate image here
      	this.noise(value);
        this.render();
        this.revert(false);
	});
	},
	
	setupOptions: function() {
		var options = d3.select( '#options' );
      //Noise Slider
      options.append("p").text("Noise ").append( 'input' )
        .attr( 'id', 'noiseTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '300' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'input', function() {
          var val = +this.value;
          NoiseTool.addValue( val);
        } );
	}	
	
  };
  
  return NoiseTool;

} );
