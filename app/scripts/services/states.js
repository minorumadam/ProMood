'use strict';

angular.module('promoodApp')

.factory('StateService', function($state, $ionicNavBarDelegate) {
  var self = {};

  self.recordStateChange = function(stateStatus, from, to) {
    var previousAlreadyRecorded = false;
    if (stateStatus.previousState.length > 0) {
      var stateIndex = stateStatus.previousState.indexOf(to.name)
      if (stateIndex >= 0) {
        //if the new state is already recorded, the following states are removed to avoid loops 
        stateStatus.previousState = stateStatus.previousState.slice(0,
            stateIndex);
        previousAlreadyRecorded = true;
      }
    }

    if (!previousAlreadyRecorded) {
      stateStatus.previousState.push(from.name);
    }
    stateStatus.currentState = to.name;

    if (stateStatus.returningToPreviousState) {
      stateStatus.previousState.pop();
      stateStatus.returningToPreviousState = false;
    }
    console.log('Previous state:' + stateStatus.previousState);
    console.log('Current state:' + stateStatus.currentState);
  };
  
  self.returnToPreviousState = function(stateStatus) {
    var previousState=stateStatus.previousState.pop();
    if (previousState) {
      $state.go(previousState);
      stateStatus.returningToPreviousState = true;
    } else {
      $ionicNavBarDelegate.back();
    }
  };

  return self;
});
