define(['jquery', 'd3', 'Canvas', 'Farbtastic'],
function ($, d3, Canvas, Farbtastic) {
    //Really a mirror Tool currently
    var tempCanvas = document.createElement('canvas');
    var Context = tempCanvas.getContext('2d');
    var ContourTool = {
        colorHex: '#000',
        colorRGB: { r: 0, g: 0, b: 0 },
        contourSensitivity: 0,
        isUsingContour: null,
        lastPoint: null,
        stack: [],
        imgData: null,
        make: function () {
            Canvas.context.lineJoin = 'round';
            Canvas.context.lineCap = 'round';

            $('#visualcanvas').on('mousedown', ContourTool.mouseDown);
            $('#visualcanvas').on('mousemove', ContourTool.mouseMove);
            $('#visualcanvas').on('mouseup', ContourTool.mouseUp);

            this.imgData = Canvas.context.createImageData( 1, 1 );
            ContourTool.imgData.data[0] = ContourTool.colorRGB.r;
            ContourTool.imgData.data[1] = ContourTool.colorRGB.g;
            ContourTool.imgData.data[2] = ContourTool.colorRGB.b;
            ContourTool.imgData.data[3] = 255;

            this.setupOptions();
        },
        destroy: function () {
            Canvas.image.src = Canvas.canvas.toDataURL();
            $('#visualcanvas').off('mousedown', ContourTool.mouseDown);
            $('#visualcanvas').off('mousemove', ContourTool.mouseMove);
            $('#visualcanvas').off('mouseup', ContourTool.mouseUp);
        },
        setupOptions: function () {
            var options = d3.select('#options');
            options.html('You have selected Contour Tool.\n');

            options.append('text')
              .text('Select Contour Color');

            options.append('div')
              .attr('id', 'ContourToolColorPicker')
              .style('display', 'block')
              .style('width', '80%')
              .style('margin', 'auto');



            $('#ContourToolColorPicker').farbtastic(function () {
                ContourTool.colorHex = this.color;
                ContourTool.colorRGB = hexToRgb(ContourTool.colorHex);

                ContourTool.imgData.data[0] = ContourTool.colorRGB.r;
                ContourTool.imgData.data[1] = ContourTool.colorRGB.g;
                ContourTool.imgData.data[2] = ContourTool.colorRGB.b;
                ContourTool.imgData.data[3] = 255;
            });

            options.append('text')
                .text('Select Color Sensitivity. [0-255]');

            options.append('input')
              .attr('id', 'ContourToolSensitivity')
              .attr('type', 'value')
              .attr('min', '0')
              .attr('max', '255')
              .attr('value', ContourTool.contourSensitivity)
              .attr('step', '1')
              .on('change', function () {
                  ContourTool.contourSensitivity = this.value;
              });

        },
        mouseDown: function (e) {
            ContourTool.isUsingContour = true;

            var currentPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };
            var options = d3.select('#options');
            var data = Canvas.context.getImageData(currentPoint.x, currentPoint.y, currentPoint.x + 1, currentPoint.y + 1);
            options.html('Contour Color' + data.data[0] + ',' + data.data[1] + ',' + data.data[2] + ',' + data.data[3] + '.');

            stack = [[currentPoint.x, currentPoint.y]];
            while (stack.length <= 10 ) { //Why 10, why if it's 1000 its still the same result but 1 is different
                var point, xvalue, yvalue, pointChecker;
                point = stack.pop();
                pointChecker = point;
                xvalue = point[0];
                yvalue = point[1];
                while (yvalue-- >= 0 && equal(pointChecker[0], pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                    pointChecker[1]--;
                }
                pointChecker[1]++;
                yvalue++;
                equalLeft = false;
                equalRight = false;
                while (yvalue++ < Canvas.height - 1 && equal(pointChecker[0], pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                    fill(pointChecker);
                    if (xvalue > 0) {
                        if (equal(pointChecker[0] - 1, pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                            if (!equalLeft) {
                                stack.push([xvalue - 1, yvalue]);
                                equalLeft = true;
                            }
                        } else {
                            if (equalLeft) equalLeft = false;
                        }
                    }
                    if (xvalue < Canvas.width - 1) {
                        if (equal(pointChecker[0] + 1, pointChecker[1], data.data[0], data.data[1], data.data[2])) {
                            if (!equalRight) {
                                stack.push([xvalue + 1, yvalue]);
                                equalRight = true;
                            }
                        } else {
                            if (equalRight) equalRight = false;
                        }
                    }
                    pointChecker[1]++;
                }
                if( stack.length == 0 ) return;
            }
            Canvas.image.src = Canvas.canvas.toDataURL();
        },
        mouseMove: function (e) {
            if (!ContourTool.isUsingContour) return;
        },
        mouseUp: function () {
            ContourTool.isUsingContour = false;
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
        var data = Canvas.context.getImageData(point0, point1, point0 + 1, point1 + 1);
        var r = Math.abs(data0 - data.data[0]);
        var g = Math.abs(data1 - data.data[1]);
        var b = Math.abs(data2 - data.data[2]);
        return (r <= ContourTool.contourSensitivity && g <= ContourTool.contourSensitivity && b <= ContourTool.contourSensitivity);
    }
    function fill(point) {
        Canvas.context.putImageData( ContourTool.imgData, point[0], point[1] ); //This supposedly works faster
        //Context.drawImage(Canvas.image,-point[0],-point[1],1,1, point[0], point[1],Canvas.width,Canvas.height);
    }



    return ContourTool;

});
