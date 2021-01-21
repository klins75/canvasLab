# Canvas Lab II
 
 [Page Preview](https://klins75.github.io/canvasLab/). 
Removed the robots, just a drawing lab. I'm working on using the script to create the interface, including forms for creating new controls and programming them to track particular variables in the code.

## Removing Stuff
---
I have been stripping away as much html as I can, and now build the elements in javascript. There is a lot of mess in the `ids.js` (so named because I keep the globals there - the id's). I'm not sure how to deal with the fact that you can't have references to things that aren't made until later (like html elements that you will build later in the program), so until I learn more, I keep those vars as the return lines of functions. It's a cheesy workaround, but it's what I can do now. Meanwhile, I've replaced all the 'monitor' divs and the canvas divs (the slider controls).

## Independent Functions
---
The sliders so far only control the grid line intensity and the grid highlight lines (the blue lines). Formerly, there were separate event listeners for each slider, and the event listener did some of the work of handling the event. Now, the listener only routes the e.deltaY info to the control panel. Also, the handler in the control panel function (it's now a class) controlled both the intensity of the lines and the color of the slider control (it changes to a higher tone as it slides up) and drawing the level of the control. Now, the display is kept separate from the function it controls, like a real board would do.

## Monitors
---
The monitors are now built with a for loop and template literals. Not only does it make the code a lot easier to read, but if I want to change the look or interactions of the monitors, I only have to change the prototype. They are filled with dummy text for now, also. I added a highlighting function for the numbered buttons on the mon's so you can more easily keep track of a variable you are watching.

## Drawing
---
I have also taken the canvas elements out of the animation loop. The elements are only refreshed if changes are made to them. That will change for the main canvas when it is being used, but that can be toggled internally when someone is using the system. For now, the refresh occurs on the slider canvases when they are moved up and down.

## Customization
As I am able to produce the components used in the 'lab' on demand (the main problem now is being able to grab references when I need them on things that don't exist yet. I know this would probably be easier in nodejs but I'm trying to keep it vanilla browser-js for as long as I can), I will introduce a form that appears to be a screen menu on the control panel where you can program which monitors will keep track of which variables. This way you can see your functions happening in real time without having to go into the code to program the monitors. 