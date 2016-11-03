define(['jquery', 'd3', 'Canvas'],
function ($, d3, Canvas) {
    //Really a mirror Tool currently
    var EraseTool = {

        weight: 20,
        sharpness: 1,
        isDrawing: null,
        lastPoint: null,
        make: function () {
            Canvas.context.lineJoin = 'round';
            Canvas.context.lineCap = 'round';

            $('#visualcanvas').on('mousedown', EraseTool.mouseDown);
            $('#visualcanvas').on('mousemove', EraseTool.mouseMove);
            $('#visualcanvas').on('mouseup', EraseTool.mouseUp);

            this.setupOptions();
        },
        destroy: function () {
            Canvas.image.src = Canvas.canvas.toDataURL();
            $('#visualcanvas').off('mousedown', EraseTool.mouseDown);
            $('#visualcanvas').off('mousemove', EraseTool.mouseMove);
            $('#visualcanvas').off('mouseup', EraseTool.mouseUp);
        },
        setupOptions: function () {
            var options = d3.select('#options');


            options.append('input')
              .attr('id', 'EraseToolWeight')
              .attr('type', 'range')
              .attr('min', '1')
              .attr('max', '250')
              .attr('value', EraseTool.weight)
              .attr('step', '1')
              .on('change', function () {
                  EraseTool.weight = +this.value;
              });

            options.append('input')
              .attr('id', 'EraseToolSharpness')
              .attr('type', 'range')
              .attr('min', '0')
              .attr('max', '1')
              .attr('value', EraseTool.sharpness)
              .attr('step', '0.05')
              .on('change', function () {
                  EraseTool.sharpness = +this.value * 0.99;
              });
        },
        mouseDown: function (e) {
            EraseTool.isDrawing = true;
            EraseTool.lastPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };
        },
        mouseMove: function (e) {
            if (!EraseTool.isDrawing) return;
            var currentPoint = {
                x: ((e.clientX - Canvas.visual.offset.left - Canvas.visual.context.getTransform().e) / Canvas.visual.context.getTransform().a),
                y: ((e.clientY - Canvas.visual.offset.top - Canvas.visual.context.getTransform().f) / Canvas.visual.context.getTransform().a)
            };
            var dist = distanceBetween(EraseTool.lastPoint, currentPoint);
            var angle = angleBetween(EraseTool.lastPoint, currentPoint);

            for (var i = 0; i < dist; i += 5) {

                x = EraseTool.lastPoint.x + (Math.sin(angle) * i);
                y = EraseTool.lastPoint.y + (Math.cos(angle) * i);

                Canvas.visual.context.clearRect(x - (EraseTool.weight / 2), y - (EraseTool.weight / 2), EraseTool.weight, EraseTool.weight);
                Canvas.context.clearRect(x - (EraseTool.weight / 2), y - (EraseTool.weight / 2), EraseTool.weight, EraseTool.weight);

            }

            EraseTool.lastPoint = currentPoint;
        },
        mouseUp: function () {
            EraseTool.isDrawing = false;
        }
    };


    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }
    

    return EraseTool;

});
