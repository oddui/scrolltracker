scrolltracker
===============

It's a small standalone scrolling tracking library based on the idea of [this blog post](http://cutroni.com/blog/2014/02/12/advanced-content-tracking-with-universal-analytics/).


HOW TO USE
------------

```js
scrolltracker()
.watch({
  element: document.querySelector('div#div1'),
  onseen: function (el, timeSpent) {
    ga('send', 'event', 'Reading', el.id, document.title, timeSpent);
  }
})
.watch({
  element: document.querySelector('div#div2'),
  onseen: function (el, timeSpent) {
    ga('send', 'event', 'Reading', el.id, document.title, timeSpent);
  }
})
.start();
```

### Example

[See this](https://github.com/oddui/scrolltracker/blob/master/examples/index.html)


BROWSER SUPPORT
-----------------

TODO


LICENSE
---------

Copyright 2014-2014 Ziyu

Released under MIT and GPL Licenses.


