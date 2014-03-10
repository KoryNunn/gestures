var interact = require('interact-js'),
    fromComponents = require('math-js/vectors/fromComponents'),
    linearRegresion = require('./linearRegresion');

window.onload = function(){

    interact.on('start', document, function(interaction) {
        interaction.moves = [];
    });

    interact.on('end', document, function(interaction) {
        var line = linearRegresion(interaction.moves);

        if(line.length<2){
            // tap
            return;
        }

        var startPoint = line[0],
            endPoint = line[line.length - 1],
            distance = Math.sqrt(Math.pow(Math.abs(startPoint.x - endPoint.x), 2) + Math.pow(Math.abs(startPoint.y - endPoint.y), 2));

        if(distance > 40){
            var vector = fromComponents(startPoint, endPoint);

            console.log(vector);
        }
    });

};