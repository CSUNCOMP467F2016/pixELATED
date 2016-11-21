define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,  Canvas ,  Caman  ) {
  var caman;
  var SatAndHueTool = {
	make: function() {
    	var hue = 0, sat = 0;
    	var options, src; 
    	var displayHue, displaySat, sliderHue, sliderSat;
    	var makeSlider;
        var clickCommit, clickReset, slideChangeHue, slideChangeSat;
        var messageText, sendMessage;
        var updateImage;
        
        initPanel= function() {
        	// Hue label
            options.append('text')
            	.text('Hue')
            	.style('position','absolute')
            	.style('left', '0px')
            	.style('top', '0px');
            			
            // Hue slider
            sliderHue = options.append( 'input' )
    		    .attr( 'type', 'range' )
    		    .attr( 'min', '0' )
    		    .attr( 'max', '100' )
    		    .attr( 'value', hue )
    		    .attr( 'step', '1' )
    		    .style('position','absolute')
    		    .style('left', '85px')
    	  	    .style('top', '0px')
    		    .on( 'change', slideChangeHue);
            
            // Hue value display
            displayHue = options.append('text')
            	.attr('id' ,'hueValue')
            	.text(hue)
    	        .style('position','absolute')
    	    	.style('left', '225px')
    	    	.style('top', '0px');
            
            // Saturation label
            options.append('text')
    	      	.text('Saturation')
    	        .style('position','absolute')
    	    	.style('left', '0px')
    	    	.style('top', '50px');
            
            // Saturation slider
            sliderSat = options.append( 'input' )
    	        .attr( 'id', 'saturationSlider' )
    	        .attr( 'type', 'range' )
    	        .attr( 'min', '-100' )
    	        .attr( 'max', '100' )
    	        .attr( 'value', hue )
    	        .attr( 'step', '1' )
    	        .style('position','absolute')
    	        .style('left', '85px')
    	        .style('top', '50px')
    	        .on( 'change', slideChangeSat);
            
            // Saturation value display
            displaySat = options.append('text')
    	      	.attr('id' ,'satValue')
    	      	.text(sat)
    	        .style('position','absolute')
    	    	.style('left', '225px')
    	    	.style('top', '50px');
          		
            // Commit button
            options.append('button')
            	.text('Commit')
            	.attr('type', 'button')
            	.style('width', '75px')
            	.style('height', '25px')
    	        .style('position','absolute')
    	    	.style('left', '50px')
    	    	.style('top', '100px')
            	.on('click', clickCommit);
            
            // Reset button
            options.append('button')
    	    	.text('Reset')
    	    	.attr('type', 'button')
    	    	.style('width', '75px')
    	    	.style('height', '25px')
    	        .style('position','absolute')
    	    	.style('left', '125px')
    	    	.style('top', '100px')
    	    	.on('click', clickReset);
            
            //add update message textbox
            messageText = options.append('text')
            	.style('position','absolute')
		    	.style('left', '0px')
		    	.style('top', '150px')
		    	.style('width', '200px');
        };
        
        sendMessage = function(message) { 
        	messageText.text(message);
        	// message will fade away after 5 seconds
        	setTimeout(function() {
        		messageText.text('');
        	}, 5000);
        }
        clickCommit = function() {
        	src = caman.toBase64();
        	Canvas.setImage(src);
        	console.log('Inputted color parameters committed to canvas.');
        	sendMessage('Changes saved to canvas.	');
        };
        clickReset = function() {
        	hue = 0;
        	sat = 0;
        	caman.reset();
        	sliderHue.value = hue; 
        	sliderHue.value = sat;
        	
        	displaySat.text(sat);
        	displayHue.text(hue);
        	console.log('Visual canvas reset.');
        	sendMessage('Visual canvas reset.');
        };
        slideChangeHue = function() {
        	hue = this.value;
        	updateImage(); 
        	caman.render();
        	console.log('Hue changed to ' + hue + ' .');
            displayHue.text(hue);
        };
        slideChangeSat = function() {
        	sat = this.value;
            updateImage(); 
            caman.render();
            console.log('Saturation changed to ' + sat + ' .');
            displaySat.text(sat);
        };
        updateImage = function() {
        	caman.reset();
    		caman.hue(hue);
    		caman.saturation(sat);
        };
        
        caman = Caman(Canvas.visual.canvas, Canvas.canvas.toDataURL());
        options = d3.select( '#options' );
        initPanel();
    },
    
    destroy: function() {
    	caman.replaceCanvas(Canvas.visual.canvas);
    	Canvas.refresh();
    }
  };

  return SatAndHueTool;

} );