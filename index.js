var interact = require('interact-js'),
    EventEmitter = require('events').EventEmitter;

function GestureDetector(target){
    this.target = target || document;

    interact.on('start', this.target, this.__boundStart = this._start.bind(this));

    interact.on('end', this.target, this.__boundEnd = this._end.bind(this));

    this.gestures = [];
}
GestureDetector.prototype = Object.create(EventEmitter.prototype);
GestureDetector.prototype.constructor = GestureDetector;
GestureDetector.prototype._start = function(interaction) {
    interaction.moves = [];
};
GestureDetector.prototype._end = function(interaction) {
    var detector = this;
    this.gestures.forEach(function(gesture){
        var gestureName = gesture.call(this, interaction.moves);
        if(gestureName){
            detector.emit('gesture', {
                name: gestureName,
                moves: interaction.moves
            });
        }
    });
};
GestureDetector.destroy = function(){
    interact.off('start', this.target, this.__boundStart);

    interact.on('end', this.target, this.__boundEnd);
};

module.exports = GestureDetector;