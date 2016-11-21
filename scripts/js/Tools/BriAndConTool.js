define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,  Canvas ,  Caman  ) {
  var caman;
  var BriAndConTool = {
	make: function() {
    	var con = 0, bri = 0;
    	var options, src; 
    	var displayCon, displayBri, sliderCon, sliderBri;
    	var makeSlider;
        var clickCommit, clickReset, slideChangeCon, slideChangeBri;
        var messageText, sendMessage;
        var updateImage;
        
        initPanel= function() {
        	// Contrast label
            options.append('text')
            	.text('Contrast')
            	.style('position','absolute')
            	.style('left', '0px')
            	.style('top', '0px');
            			
            // Contrast slider
            sliderCon = options.append( 'input' )
    		    .attr( 'type', 'range' )
    		    .attr( 'min', '-100' )
    		    .attr( 'max', '100' )
    		    .attr( 'value', con )
    		    .attr( 'step', '1' )
    		    .style('position','absolute')
    		    .style('left', '85px')
    	  	    .style('top', '0px')
    		    .on( 'change', slideChangeCon);
            
            // Contrast value display
            displayCon = options.append('text')
            	.attr('id' ,'conValue')
            	.text(con)
    	        .style('position','absolute')
    	    	.style('left', '225px')
    	    	.style('top', '0px');
            
            // Brightness label
            options.append('text')
    	      	.text('Brightness')
    	        .style('position','absolute')
    	    	.style('left', '0px')
    	    	.style('top', '50px');
            
            // Brightness slider
            sliderBri = options.append( 'input' )
    	        .attr( 'id', 'brightnessSlider' )
    	        .attr( 'type', 'range' )
    	        .attr( 'min', '-100' )
    	        .attr( 'max', '100' )
    	        .attr( 'value', con )
    	        .attr( 'step', '1' )
    	        .style('position','absolute')
    	        .style('left', '85px')
    	        .style('top', '50px')
    	        .on( 'change', slideChangeBri);
            
            // Brightness value display
            displayBri = options.append('text')
    	      	.attr('id' ,'briValue')
    	      	.text(bri)
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
        	sendMessage('Changes saved to canvas.');
        };
        clickReset = function() {
        	con = 0;
        	bri = 0;
        	caman.reset();
        	sliderCon.value = con; 
        	sliderCon.value = bri;
        	
        	displayBri.text(bri);
        	displayCon.text(con);
        	console.log('Visual canvas reset.');
        	sendMessage('Visual canvas reset.');
        };
        slideChangeCon = function() {
        	con = this.value;
        	updateImage(); 
        	caman.render();
        	console.log('Contrast changed to ' + con + ' .');
            displayCon.text(con);
        };
        slideChangeBri = function() {
        	bri = this.value;
            updateImage(); 
            caman.render();
            console.log('Brightness changed to ' + bri + ' .');
            displayBri.text(bri);
        };
        updateImage = function() {
        	caman.reset();
        	// Faman's contrast won't work if argument isn't parsed as int
    		caman.contrast(parseInt(con));
    		console.log(con);
    		caman.brightness(bri);
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

  return BriAndConTool;

} );