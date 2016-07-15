# kTextFit
automatically resize text to fit width of a block element

Requires jQuery.

Example:
```html
<div id="wrapper">this is some text</div>
<script>$('#wrapper').kTextFit();</script>
```

Other text resizers, such as [FitText](http://fittextjs.com/) and [FlowType](http://simplefocus.com/flowtype/) require you to enter a compression factor by hand. kTextFit figures out the right factor automatically.

The element being resized does not need to be already attached to the DOM. So, you can run kTextFit on an element that you are still working with in memory, then attach it to the DOM. As long as it is attached within 10 seconds, it will still run.

Example:
```javascript
// set up the element. note that it is in-memory, not yet attached to the DOM.
var $el=$('<div style="width:100px;border:1px solid #000"/>').text('example text').kTextFit();
// now attach to the DOM
$el.appendTo('body');
```
