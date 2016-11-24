define(['jquery', 'd3', 'Canvas', 'Farbtastic'],
function ($, d3, Canvas, Farbtastic) {
    //Really a mirror Tool currently
    var BucketTool = {
        colorHex: '#000',
        colorRGB: { r: 0, g: 0, b: 0 },
        bucketWeight: 20,
        bucketSharpness: 1,
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
              .attr('id', 'BucketToolbucketWeight')
              .attr('type', 'range')
              .attr('min', '1')
              .attr('max', '250')
              .attr('value', BucketTool.bucketWeight)
              .attr('step', '1')
              .on('change', function () {
                  BucketTool.bucketWeight = +this.value;
              });

            options.append('input')
              .attr('id', 'BucketToolbucketSharpness')
              .attr('type', 'range')
              .attr('min', '0')
              .attr('max', '1')
              .attr('value', BucketTool.bucketSharpness)
              .attr('step', '0.05')
              .on('change', function () {
                  BucketTool.bucketSharpness = +this.value * 0.99;
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
            options.html('Bucket Color' + data.data[0] + '.');

            pixelCheck(currentPoint.x,currentPoint.y, data.data[0]);

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

    function pixelCheck(pointx, pointy, data) {
        if (pointx >= 0 && pointy >= 0 && pointx < Canvas.width && pointy < Canvas.height) {
            var checkData = Canvas.context.getImageData(pointx, pointy, pointx + 1, pointy + 1);
            if (data === checkData.data[0]) {
                pixelCheck(pointx + 1, pointy, data);
                pixelCheck(pointx - 1, pointy, data);
                pixelCheck(pointx, pointy + 1, data);
                pixelCheck(pointx, pointy - 1, data);
                var radgrad = Canvas.visual.context.createRadialGradient(pointx, pointy, 0, pointx, pointy, 1);
  
                radgrad.addColorStop(0, BucketTool.colorHex);
                radgrad.addColorStop(0, 'rgba(' + BucketTool.colorRGB.r + ',' + BucketTool.colorRGB.g + ',' + BucketTool.colorRGB.b + ',1)');
                radgrad.addColorStop(1, 'rgba(' + BucketTool.colorRGB.r + ',' + BucketTool.colorRGB.g + ',' + BucketTool.colorRGB.b + ',0)');

                Canvas.visual.context.fillStyle = radgrad;
                Canvas.visual.context.fillRect(pointx - (BucketTool.bucketWeight / 2), pointy - (BucketTool.bucketWeight / 2), BucketTool.bucketWeight, BucketTool.bucketWeight);
                Canvas.context.fillStyle = radgrad;
                Canvas.context.fillRect(pointx - (BucketTool.bucketWeight / 2), pointy - (BucketTool.bucketWeight / 2), BucketTool.bucketWeight, BucketTool.bucketWeight);

            }
        }  
    }

    return BucketTool;

});
