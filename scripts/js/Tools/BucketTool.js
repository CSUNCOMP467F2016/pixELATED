define(['jquery', 'd3', 'Canvas', 'Farbtastic'],
function ($, d3, Canvas, Farbtastic) {
    //Really a mirror Tool currently
    var BucketTool = {
        colorHex: '#000',
        colorRGB: { r: 0, g: 0, b: 0 },
        weight: 20,
        sharpness: 1,
        isDrawing: null,
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
            options.append('div')
              .attr('id', 'BucketToolColorPicker')
              .style('display', 'block')
              .style('width', '80%')
              .style('margin', 'auto');

            $('#BucketToolColorPicker').farbtastic(function () {
                BucketTool.colorHex = this.color;
                BucketTool.colorRGB = hexToRgb(BucketTool.colorHex);
            });

            options.append('input')
              .attr('id', 'BucketToolWeight')
              .attr('type', 'range')
              .attr('min', '1')
              .attr('max', '250')
              .attr('value', BucketTool.weight)
              .attr('step', '1')
              .on('change', function () {
                  BucketTool.weight = +this.value;
              });

            options.append('input')
              .attr('id', 'BucketToolSharpness')
              .attr('type', 'range')
              .attr('min', '0')
              .attr('max', '1')
              .attr('value', BucketTool.sharpness)
              .attr('step', '0.05')
              .on('change', function () {
                  BucketTool.sharpness = +this.value * 0.99;
              });
        },
        mouseDown: function (e) {
            BucketTool.isDrawing = true;
        },
        mouseMove: function (e) {
            if (!BucketTool.isDrawing) return;
            var currentPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };

                

                var radgrad = Canvas.visual.context.createRadialGradient(currentPoint.x, currentPoint.y, BucketTool.weight / 4, currentPoint.x, currentPoint.y, BucketTool.weight / 2);

                radgrad.addColorStop(0, BucketTool.colorHex);
                radgrad.addColorStop(BucketTool.sharpness, 'rgba(' + BucketTool.colorRGB.r + ',' + BucketTool.colorRGB.g + ',' + BucketTool.colorRGB.b + ',1)');
                radgrad.addColorStop(1, 'rgba(' + BucketTool.colorRGB.r + ',' + BucketTool.colorRGB.g + ',' + BucketTool.colorRGB.b + ',0)');

                Canvas.visual.context.fillStyle = radgrad;
                Canvas.visual.context.fillRect(currentPoint.x - (BucketTool.weight / 2), currentPoint.y - (BucketTool.weight / 2), BucketTool.weight, BucketTool.weight);
                Canvas.context.fillStyle = radgrad;
                Canvas.context.fillRect(currentPoint.x - (BucketTool.weight / 2), currentPoint.y - (BucketTool.weight / 2), BucketTool.weight, BucketTool.weight);


        },
        mouseUp: function () {
            BucketTool.isDrawing = false;
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

    return BucketTool;

});
