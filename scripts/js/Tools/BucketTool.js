define(['jquery', 'd3', 'Canvas', 'Farbtastic'],
function ($, d3, Canvas, Farbtastic) {
    //Really a mirror Tool currently
    var BucketTool = {
        colorHex: '#000',
        colorRGB: { r: 0, g: 0, b: 0 },
        bucketSensitivity: 0,
        isUsingBucket: null,
        lastPoint: null,
        make: function () {
            Canvas.context.lineJoin = 'round';
            Canvas.context.lineCap = 'round';

            $('#visualcanvas').on('mousedown', BucketTool.mouseDown);
            $('#visualcanvas').on('mousemove', BucketTool.mouseMove);
            $('#visualcanvas').on('mouseup', BucketTool.mouseUp);

            this.setupOptions();
        },
        destroy: function () {
            Canvas.image.src = Canvas.canvas.toDataURL();
            $('#visualcanvas').off('mousedown', BucketTool.mouseDown);
            $('#visualcanvas').off('mousemove', BucketTool.mouseMove);
            $('#visualcanvas').off('mouseup', BucketTool.mouseUp);
        },
        setupOptions: function () {
            var options = d3.select('#options');
            options.html('You have selected Bucket Tool.\n');

            options.append('text')
              .text('Select Bucket Color');

            options.append('div')
              .attr('id', 'BucketToolColorPicker')
              .style('display', 'block')
              .style('width', '80%')
              .style('margin', 'auto');

          

            $('#BucketToolColorPicker').farbtastic(function () {
                BucketTool.colorHex = this.color;
                BucketTool.colorRGB = hexToRgb(BucketTool.colorHex);
            });

            options.append('text')
                .text('Select Color Sensitivity.');

            options.append('input')
              .attr('id', 'BucketToolSensitivity')
              .attr('type', 'range')
              .attr('min', '0')
              .attr('max', '255')
              .attr('value', BucketTool.bucketSensitivity)
              .attr('step', '1')
              .on('change', function () {
                  BucketTool.bucketSensitivity = +this.value;
              });

        },
        mouseDown: function (e) {
            BucketTool.isUsingBucket = true;


            var currentPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };
            var options = d3.select('#options');
            var data = Canvas.context.getImageData(currentPoint.x,currentPoint.y, currentPoint.x+1,currentPoint.y+1);
            options.html('Bucket Color' + data.data[0] + ',' + data.data[1] + ',' + data.data[2] + ',' + data.data[3] + '.');

            pixelCheck(currentPoint.x,currentPoint.y, data.data[0],data.data[1],data.data[2]);
            Canvas.image.src = Canvas.canvas.toDataURL();
        },
        mouseMove: function (e) {
            if (!BucketTool.isUsingBucket) return;
            
        },
        mouseUp: function () {
            BucketTool.isUsingBucket = false;
        }
    };


    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function pixelCheck(pointx, pointy, data0, data1, data2) {
        if (pointx >= 0 && pointy >= 0 && pointx < Canvas.width && pointy < Canvas.height) {
            var data = Canvas.context.getImageData(pointx, pointy, pointx + 1, pointy + 1);
            if ((data0 === data.data[0]) && (data1 === data.data[1]) && (data2 === data.data[2])) {
                
                Canvas.context.fillStyle = BucketTool.colorHex;
                Canvas.context.fillRect(pointx , pointy , 1, 1);

                pixelCheck(pointx + 1, pointy, data0, data1, data2);
                pixelCheck(pointx - 1, pointy, data0, data1, data2);
                pixelCheck(pointx, pointy + 1, data0, data1, data2);
                pixelCheck(pointx, pointy - 1, data0, data1, data2);
                
            }
        }  
    }

    return BucketTool;

});
