# HTML5CanvasDrag

I needed to figure out how to click and drag sprites in my HTML5 Canvas games. There are mouse drag events already built in, but I found they didn't fit well with game logic. This is what I ended up with. I track mousedown, mouseup, mousemove and then have a state machine that sorts out clicks from drags.

I also needed to record the offset of the mouse within the object I'm dragging, otherwise the object snaps to the mouse when you start dragging.

Just clone this repo and drag the index.html onto a browser to try it out.
