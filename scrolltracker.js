/**
 * scrolltracker.js
 *
 * Copyright 2014-2014 Ziyu (@oddui)
 *
 * Released under MIT and GPL Licenses.
 */

(function (window, document) {
  'use strict';

  // HELPER FUNCTIONS
  //
  var debounce = function(fn, delay, context){
    var timeoutId;

    return function debounced () {
      var args = arguments;
      context = context ? context : this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };

  var now = Date.now || function() {
    return new Date().getTime();
  };

  var spentTime = (function () {
    var beginning = now();

    return function () {
      return Math.round((now() - beginning) / 1000);
    };
  })();

  // SCROLLTRACKER
  //
  var scrolltracker = function (options) {
    // options
    //
    // offsetTop: Where the top of the view is from the top of the viewport
    // offsetBottom: Where the bottom of the view is from the bottom of the viewport
    options = options || {};

    var view, targets = [], offset = {
      t: parseInt(options.offsetTop || 0, 10),
      b: parseInt(options.offsetBottom || 50, 10),
    };

    // Tests whether element is in view
    var inView = function (element) {
      var box = element.getBoundingClientRect(), view = {
        t: 0 + offset.t,
        b: (window.innerHeight || document.documentElement.clientHeight) - offset.b,
      };
      return (box.bottom >= view.t && box.top <= view.b);
    };

    // Registers an element to track. Pass an object with a dom element and optional
    // onseen function. The onseen function will be invoked when the element is in view.
    //
    // onseen(element, timeSpent)
    var watch = function (target) {
      if (target.element instanceof Element) {
        targets.push(target);
      }
      return this;
    };

    var track = debounce(function () {

      for (var i = targets.length; i--;) {
        var target = targets[i];

        if (inView(target.element, view)) {
          (target.onseen || window.alert).call(undefined, target.element, spentTime());

          // remove from targets
          targets.splice(i, 1);
        }
      }

      if (!targets.length) {
        detach();
      }
    }, 250);

    var attach = function () {
      if (document.addEventListener) {
        window.addEventListener('scroll', track, false);
        window.addEventListener('load', track, false);
      } else {
        window.attachEvent('onscroll', track);
        window.attachEvent('onload', track);
      }
    };

    var detach = function () {
      if (document.removeEventListener) {
        window.removeEventListener('scroll', track);
      } else {
        window.detachEvent('onscroll', track);
      }
    };

    var start = function () {
      attach();
    };

    return {
      watch: watch,
      start: start,
    };
  };

  window.scrolltracker = scrolltracker;

})(window, document);
