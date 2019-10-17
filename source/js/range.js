(function () {
  document.addEventListener('DOMContentLoaded', function() {
    var exampleSection = document.querySelector('.example');
    var images = exampleSection.querySelectorAll('.example__images img');
    var range = exampleSection.querySelector('.example__range');
    var pickBefore = exampleSection.querySelector('.example__images-before picture');
    var pickAfter = exampleSection.querySelector('.example__images-after picture');

    var tagStyle = exampleSection.firstElementChild;
    var defaultValue = range.value;

    var imagesCount = images.length;
    images.forEach(function(img) {
      img.addEventListener('load', function(evt) {
        if (!--imagesCount) {
          handler();
        }
      });
    });

    var handler = function () {
      var pickData = pickBefore.getBoundingClientRect();
      var pickLeft = pickData.x;
      var pickWidth = pickData.width;
      var rangeData = range.getBoundingClientRect();
      var rangeLeft = rangeData.x;
      var rangeWidth = rangeData.width;
      var pickLeftOffset = Math.abs(pickLeft - rangeLeft);

      if (tagStyle.tagName !== 'STYLE') {
        var tag = document.createElement('style');
        exampleSection.prepend(tag);
        tagStyle = tag;
      }

      var setPickPosition = function(rangeValue) {
        var value = rangeValue / 100 * rangeWidth;

        var beforeValue = pickWidth - pickLeftOffset - value;
        var afterValue = pickLeftOffset + value;

        pickBefore.style.clipPath = 'inset(0 ' + beforeValue + 'px 0 0)';
        pickAfter.style.clipPath = 'inset(0 0 0 ' + afterValue + 'px)';
      };

      var setBGPosition = function(rangeValue) {
        var value = rangeValue / 100 * rangeWidth + rangeLeft;
        tagStyle.innerHTML =
        '.example::after{width: ' + value + 'px}' +
        '.example{background-image:linear-gradient(to right,#eaeaea ' + value + 'px,#f2f2f2 ' + value + 'px)}';
      };

      range.addEventListener('input', function (evt) {
        var value = evt.target.value;
        setPickPosition(value);
        setBGPosition(value)
      });

      setPickPosition(defaultValue);
      setBGPosition(defaultValue);
    }
  })
})();
