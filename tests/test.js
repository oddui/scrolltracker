var fs = require('fs'),
    page = require('webpage').create(),
    address = 'file://' + fs.workingDirectory + '/index.html',
    count = 0;

page.open(address, function (status) {
  if (status !== 'success') {
    console.log('Failed to load page');
    phantom.exit();
  }

  page.onCallback = function(data) {
    if (data.seen) {
      count += 1;
      console.log('.');
    }
    if (data.exit) {
      if (count) {
        console.log('passed');
      } else {
        console.log('failed');
      }
      phantom.exit();
    }
  };

  if (page.injectJs('../scrolltracker.js')) {

    page.evaluate(function() {
      scrolltracker()
      .watch({
        element: document.querySelector('div#div1'),
        onseen: function (el) { window.callPhantom({ seen: el.id }); }
      })
      .watch({
        element: document.querySelector('div#div2'),
        onseen: function (el) { window.callPhantom({ seen: el.id }); }
      })
      .start();

      scrolldelay = setInterval(function () {
        window.scrollBy(0,200);
      },251);

      setTimeout(function () {
        clearTimeout(scrolldelay);
        window.callPhantom({ exit: true });
      }, 1200);
    });
  }
});
