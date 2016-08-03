'use strict';

angular.module('promoodApp')
.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    if (isNaN(millseconds)){
      return '';
    }
    var milli = parseFloat(Math.round(millseconds * 100) / 100).toFixed(0);
    if (milli == 'NaN'){
      return '';
    }
    var seconds = (milli % 60).toFixed(0);
    var minutes = Math.floor(milli / 60);
    var timeString = '';
    timeString = minutes + ':' + (seconds <= 9 ? ('0' + seconds) : seconds);
    return timeString;
  }
});
