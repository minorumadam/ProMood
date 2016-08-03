'use strict';

angular.module('promoodApp')

.controller('ChatControllerDisabled', function ($scope, $rootScope, $state, StateService, $ionicPopup) {

  var initialize = function() {
        $ionicPopup.alert({
            title: 'Coming Soon!',
            }).then(function(res) {
            $state.go('welcome');
          });
  };

  initialize();
});
