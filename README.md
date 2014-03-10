# Gestures

## What

Gestures provides a way to capture a gesture (touchmove/mousemove) and detect if that matches a number of user-defined patterns.

## What to use this for

Detecting gesture based commands, like the konami code.

## What not to use this for

Gestures are terrible for user interaction, like swiping left to open a menu, because they arn't triggered until touchend/mouseup.

## Example

Say you wanted to detect a down swipe:

create a detector:

  var detector = new GestureDetector();
  
Add a gesture to detect:
  
    detector.gestures.push(function(moves){
    
        // Get the net vector of the moves somehow
        // This is up to the developer to do, not part of gestures
        var vector = getGestureVector(moves);

        // Skip gestures that are less than 20px in lenght
        if(vector.magitude < 20){
            return;
        }
        
        // Check if the direction is down
        if(vector.direction < -135 || vector.direction > 135){
            return 'down';
        }
    });

    // On a gesture, log it out!
    detector.on('gesture', function(event){
        console.log(event.name);
    });
