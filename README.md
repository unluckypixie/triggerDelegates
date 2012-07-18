triggerDelegates
================

jQuery plugin which adds a function to trigger all delegated listeners for an event.

# Overview

triggerDelegates is a jQuery plugin which solves a particular architectural problem with events in jQuery (which hopefully ultimately will be fixed in jQuery), namely that there is no convenient way to trigger all listeners for a events that have been delegated.

# Examples

Assume you have the following code:

    $("#container").on("click", "a", function(){
      alert("woot you clicked a link");
    });

On the #container element you have now created a delegate event listener which will match any events which bubble up to it which actually were triggered by an "a" tag inside the container.

This is all good.  Click a link and the event triggers.

One purpose of using a delegate though is that we can update the dom inside the container and without any further changes it will still work, i.e. if we replaced the entire content of the #container node when we click an "a" tag in the new content it will still bubble the event up to the container and it will trigger our event correctly.

Now lets say instead of a "click" event you want to use a custom event, lets call it "init".  

    $("#container").on("init", "div.blue", function(){
      $(this).css("color", "blue");
    });

So we change the content and we now want to trigger the event on all matching elements.  How do we do it? Well personally I would have thought this would do it:

    $("#container").trigger("init");

But it doesn't, which kinda makes sense because the event was raised on the container so doesn't match the select criteria.

What you need to do is something like this:

    $("#container").find("div.blue", function(){
      $(this).trigger("init");
    });

i.e. find all the a tags and trigger the event on them, but what if we had another listener:

    $("#container").on("init", "div.red", function(){
      $(this).css("color", "red");
    });

Now we have to update our trigger to also trigger this listener:

    $("#container").find("div.blue, div.red", function(){
      $(this).trigger("init");
    });

This gets messy.

The answer is to use triggerDelegates like this:

    $("#container").triggerDelegates("init");

It will find all the nodes within the container node that are being listened for the "init" event and will fire the "init" event on them.

# License

The Live Query plugin is dual licensed *(just like jQuery)* under the MIT (MIT\_LICENSE.txt) and GPL Version 2 (GPL\_LICENSE.txt) licenses.

Copyright (c) 2012 [Dave Fennell](http://www.microtux.co.uk)