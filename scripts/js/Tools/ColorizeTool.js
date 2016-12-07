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

  var ColorizeTool = {
	Square: 0,
	colorForSquare: '#000000',
    strength: 0,
    red: 0,
    green: 0,
    blue: 0,
    make: function() {
      //this.myFunction();
	  this.myCircle();
      this.setupOptions();

    },
    destroy: function() {
      //Called when the user activates another tool
      Caman( Canvas.canvas, function () {
        // manipulate image here
        // Arguments: (R, G, B, strength)
        this.colorize( ColorizeTool.red, ColorizeTool.green, ColorizeTool.blue, ColorizeTool.strength );
        this.render( function() {
          Canvas.image.src = Canvas.canvas.toDataURL();
        } );
      } );
      //Canvas.image.src = Canvas.canvas.toDataURL();
    },
    sliderChange: function( val, s ) {

    	if (s == 'strength')
    		ColorizeTool.strength = val;
    	if (s == 'red')
    	{
    		ColorizeTool.red = val;
    	}
    	if (s == 'green')
    	{
    		ColorizeTool.green = val;
    	}
    	if (s == 'blue')
    	{
    		ColorizeTool.blue = val;
    	}

    	redstring = ColorizeTool.from10To16( ColorizeTool.red );
    	greenstring = ColorizeTool.from10To16( ColorizeTool.green );
    	bluestring = ColorizeTool.from10To16( ColorizeTool.blue );

    	//var mys = "#" + redstring + greenstring + bluestring;
		ColorizeTool.colorForSquare = "#" + redstring + greenstring + bluestring;

		ColorizeTool.Square.transition().style('background', ColorizeTool.colorForSquare);

		//d3.select('#options').transition().style('background', ColorizeTool.colorForSquare);
		//ColorizeTool.myCircle();
    	//document.getElementById("myDIV").style.backgroundColor = mys;
    	Caman( Canvas.visual.canvas, function () {
      	// manipulate image here
      	// Arguments: (R, G, B, strength)
      	this.colorize( ColorizeTool.red, ColorizeTool.green, ColorizeTool.blue, ColorizeTool.strength );
        this.render();
        this.revert(false);
      } );
    },
    from10To16: function( value ) {
    	var addZero = false;
    	if (value < 16)
    		addZero = true;

    	var division = value;
    	var divisor = 16;
    	var remainder = 1;

    	var result = "";

    	while (division != 0)
    	{

    		remainder = division % divisor;
    		division = Math.trunc(division / divisor);
    		switch (remainder)
    		{
    		case 0:
    			result = "0" + result;
    			break;
    		case 1:
    			result = "1" + result;
    			break;
    		case 2:
    			result = "2" + result;
    			break;
    		case 3:
    			result = "3" + result;
    			break;
    		case 4:
    			result = "4" + result;
    			break;
    		case 5:
    			result = "5" + result;
    			break;
    		case 6:
    			result = "6" + result;
    			break;
    		case 7:
    			result = "7" + result;
    			break;
    		case 8:
    			result = "8" + result;
    			break;
    		case 9:
    			result = "9" + result;
    			break;
    		case 10:
    			result = "A" + result;
    			break;
    		case 11:
    			result = "B" + result;
    			break;
    		case 12:
    			result = "C" + result;
    			break;
    		case 13:
    			result = "D" + result;
    			break;
    		case 14:
    			result = "E" + result;
    			break;
    		case 15:
    			result = "F" + result;
    			break;
    		}

    	}

    	if (addZero == true)
    	{
    		if (value == 0)
    			result = "00" + result;
    		else
    			result = "0" + result;
    	}

    	return result;
    },
	myCircle: function(){
	//var var1 = d3.select('#options');
	//var1.append("p").text("hello");
	ColorizeTool.Square = d3.select('#options').append('svg')
  .attr('width', 100)
  .attr('height', 100)
  .style('background', ColorizeTool.colorForSquare);
	},
    setupOptions: function() {

      var options = d3.select( '#options' );
      //Red Slider
      options.append("p").text("Red ").append( 'input' )
        .attr( 'id', 'redColorizeTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '255' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'input', function() {
          var val = +this.value;
          ColorizeTool.sliderChange( val, 'red' );
        } );
      //Green Slider
      options.append("p").text(function() { return "Green "; }).append( 'input' )
        .attr( 'id', 'greenColorizeTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '255' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'input', function() {
          var val = +this.value;
          ColorizeTool.sliderChange( val, 'green' );
        } );
      //Blue Slider
      options.append("p").text("Blue ").append( 'input' )
        .attr( 'id', 'blueColorizeTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '255' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'input', function() {
          var val = +this.value;
          ColorizeTool.sliderChange( val, 'blue' );
        } );
      //Strength Slider
      options.append("p").text("Strength ").append( 'input' )
        .attr( 'id', 'strengthColorizeTool' )
        .attr( 'type', 'range' )
        .attr( 'min', '0' )
        .attr( 'max', '100' )
        .attr( 'value', '0' )
        .attr( 'step', '1' )
        .on( 'input', function() {
          var val = +this.value;
          ColorizeTool.sliderChange( val, 'strength' );
        } );

    }

  };

  return ColorizeTool;

} );
