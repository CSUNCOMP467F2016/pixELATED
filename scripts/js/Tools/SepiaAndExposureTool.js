define(  [ 'jquery', 'd3', 'Canvas', 'Caman' ],
function (     $   ,  d3 ,  Canvas ,  Caman  ) {
  var caman;
  var SepiaAndExposureTool = {
    make: function() {
        var sepia = 0, exp = 0;
        var options, src; 
        var displaySepia, displayExposure, sliderSepia, sliderExposure;
        var makeSlider;
        var clickCommit, clickReset, slideChangeSepia, slideChangeExposure;
        var messageText, sendMessage;
        var updateImage;
        
        initPanel= function() {
            // Sepia label
            options.append('text')
                .text('Sepia')
                .style('position','absolute')
                .style('left', '0px')
                .style('top', '0px');
                        
            // Sepia slider
            sliderSepia = options.append( 'input' )
                .attr( 'type', 'range' )
                .attr( 'min', '0' )
                .attr( 'max', '100' )
                .attr( 'value', sepia )
                .attr( 'step', '1' )
                .style('position','absolute')
                .style('left', '85px')
                .style('top', '0px')
                .on( 'change', slideChangeSepia);
            
            // Sepia value display
            displaySepia = options.append('text')
                .attr('id' ,'sepiaValue')
                .text(sepia)
                .style('position','absolute')
                .style('left', '225px')
                .style('top', '0px');
            
            // Exposure label
            options.append('text')
                .text('Exposure')
                .style('position','absolute')
                .style('left', '0px')
                .style('top', '50px');
            
            // Exposure slider
            sliderExposure = options.append( 'input' )
                .attr( 'id', 'ExposureSlider' )
                .attr( 'type', 'range' )
                .attr( 'min', '-100' )
                .attr( 'max', '100' )
                .attr( 'value', exp )
                .attr( 'step', '1' )
                .style('position','absolute')
                .style('left', '85px')
                .style('top', '50px')
                .on( 'change', slideChangeExposure);
            
            // Exposure value display
            displayExposure = options.append('text')
                .attr('id' ,'ExposureValue')
                .text(exp)
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
            sendMessage('Changes saved to canvas.   ');
        };
        clickReset = function() {
            sepia = 0;
            exp = 0;
            caman.reset();
            sliderSepia.value = sepia; 
            sliderExposure.value = exp;
            
            displaySepia.text(sepia);
            displayExposure.text(exp);
            console.log('Visual canvas reset.');
            sendMessage('Visual canvas reset.');
        };
        slideChangeSepia = function() {
            sepia = this.value;
            updateImage(); 
            caman.render();
            console.log('Sepia changed to ' + sepia + ' .');
            displaySepia.text(sepia);
        };
        slideChangeExposure = function() {
            exp = this.value;
            updateImage(); 
            caman.render();
            console.log('Exposure changed to ' + exp + ' .');
            displayExposure.text(exp);
        };
        updateImage = function() {
            caman.reset();
            caman.sepia(sepia);
            caman.exposure(exp);
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

  return SepiaAndExposureTool;

} );