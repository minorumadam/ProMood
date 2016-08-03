angular.module('promoodApp')
.directive('onLastRepeat', function($parse) {
  return function(scope, element, attrs) {
    if (parseInt(attrs.onLastRepeat) && parseInt(attrs.onLastRepeat) > 0) {
      return;
    }
    if (scope.$last) setTimeout(function(){
      scope.$emit('onRepeatLast', element, attrs);
    }, 1);
  };
})
