define(['jquery', 'd3', 'Canvas', 'Farbtastic'],
function ($, d3, Canvas, Farbtastic) {
    //Really a mirror Tool currently
    var BucketTool = {
        colorHex: '#000',
        colorRGB: { r: 0, g: 0, b: 0 },
        bucketSensitivity: 0,
        isUsingBucket: null,
        lastPoint: null,
        stack: [],
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
                .text('Select Color Sensitivity. [0-255]');

            options.append('input')
              .attr('id', 'BucketToolSensitivity')
              .attr('type', 'value')
              .attr('min', '0')
              .attr('max', '255')
              .attr('value', BucketTool.bucketSensitivity)
              .attr('step', '1')
              .on('change', function () {
                  BucketTool.bucketSensitivity = this.value;
              });

        },
        mouseDown: function (e) {
            BucketTool.isUsingBucket = true;


            var currentPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };
            var options = d3.select('#options');
            var data = Canvas.context.getImageData(currentPoint.x, currentPoint.y, 1, 1);
            options.html('Bucket Color' + data.data[0] + ',' + data.data[1] + ',' + data.data[2] + ',' + data.data[3] + '.');

            stack = [[currentPoint.x, currentPoint.y]];
            while (stack.length) {
                var point, xvalue, yvalue, pointChecker;
                point = stack.pop();
                pointChecker = point;
                xvalue = point[0];
                yvalue = point[1];
                while (yvalue-- >= 0 && equal(pointChecker[0],pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                    pointChecker[1]--;
                }
                pointChecker[1]++;
                yvalue++;
                equalLeft = false;
                equalRight = false;
                while (yvalue++ < Canvas.height - 1 && equal(pointChecker[0],pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                    fill(pointChecker);
                    if (xvalue > 0) {
                        if (equal(pointChecker[0]-1,pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                            if(!equalLeft) {
                                stack.push([xvalue-1,yvalue]);
                                equalLeft = true;
                            }
                        } else {
                            if (equalLeft) equalLeft = false;
                        }
                    }
                    if (xvalue < Canvas.width-1) {
                        if (equal(pointChecker[0]+1,pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                            if(!equalRight) {
                                stack.push([xvalue+1,yvalue]);
                                equalRight = true;
                            }
                        } else {
                            if (equalRight) equalRight = false;
                        }
                    }
                    pointChecker[1]++;
                }
            }
            Canvas.image.src = Canvas.canvas.toDataURL();
        },
        mouseMove: function (e) {
            if (!BucketTool.isUsingBucket) return;

        },
        mouseUp: function () {
            BucketTool.isUsingBucket = false;
        }
    };


    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    function equal(point0, point1, data0, data1, data2) {
        var data = Canvas.context.getImageData(point0, point1, 1, 1);
        var r = Math.abs(data0 - data.data[0]);
        var g = Math.abs(data1 - data.data[1]);
        var b = Math.abs(data2 - data.data[2]);
        return (r <= BucketTool.bucketSensitivity && g <= BucketTool.bucketSensitivity && b <= BucketTool.bucketSensitivity);
    }
    function fill(point) {
        Canvas.context.fillStyle = BucketTool.colorHex;
        Canvas.context.fillRect(point[0], point[1], 1, 1);
    }

    return BucketTool;

});
