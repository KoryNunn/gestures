var GestureDetector = require('./'),
    radiansToDegrees = require('math-js/angles/radiansToDegrees'),
    linearRegresion = require('./linearRegresion');

function getGestureVector(moves){
    var line = linearRegresion(moves),
        direction = 0,
        magitude = 0;

    if(line.length>2){
        var startPoint = line[0],
            endPoint = line[line.length - 1];

        direction = radiansToDegrees(Math.atan2(-(startPoint.x - endPoint.x), startPoint.y - endPoint.y));
        magitude = Math.sqrt(Math.pow(Math.abs(startPoint.x - endPoint.x), 2) + Math.pow(Math.abs(startPoint.y - endPoint.y), 2));
    }

    return {
        direction: direction,
        magitude: magitude
    };
}

window.onload = function(){

    var detector = new GestureDetector();

    detector.gestures.push(function(moves){
        var vector = getGestureVector(moves);

        if(vector.magitude < 5){
            return 'tap';
        }
        if(vector.magitude > 5 && vector.magitude < 20){
            return;
        }

        if(vector.direction > -45 && vector.direction < 45){
            return 'up';
        }
        if(vector.direction < -135 || vector.direction > 135){
            return 'down';
        }
        if(vector.direction < -45 && vector.direction > -135){
            return 'left';
        }
        if(vector.direction > 45 && vector.direction < 135){
            return 'right';
        }
    });

    detector.on('gesture', function(event){
        console.log(event.name);
    });
};