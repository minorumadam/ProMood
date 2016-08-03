'use strict';

angular.module('promoodApp')

.controller('AboutController', function ($scope, $rootScope, $ionicPopup) {

  /*var initialize = function() {
    console.log("initialize About Controller");
  };

  initialize();*/
  angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
  angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
  angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
    
  $scope.showAlert = function(title, template) {
    var alertPopup = $ionicPopup.alert({
      title: this.title,
      template: this.template
    });
    alertPopup.then(function(res) {
      console.log('After press ok');
    });
  };

  $scope.OpenUrlInExternalBrowser = function (url){
    console.log("OpenUrlInExternalBrowser: " + url);
    window.open(url, "_system");
  };

  $scope.SuggestFeatureByEmail = function (){
    console.log("SendEmalFromInApp");

    window.plugins.socialsharing.canShareViaEmail(
      canShareViaEmailSuccess,
      function(e){
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You don\'t have your email configured in your phone. Send an email to suggestions@promoodapp.com with the subject "suggestion".'
        });
      });

    /*window.plugins.socialsharing.shareViaEmail(
      '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
      'Suggest a feature',
      ['suggestions@promood.com'], // TO: must be null or an array
      null, // CC: must be null or an array
      null, // BCC: must be null or an array
      null, // FILES: can be null, a string, or an array
      function() {console.log('share ok')},
      function(errormsg){alert(errormsg)
      ;
      console.log (errormsg);
      } // called when sh*t hits the fan
    );*/
  };

  var canShareViaEmailSuccess = function (e){
    console.log("canShareViaEmailSuccess");
    window.plugins.socialsharing.shareViaEmail(
      '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
      'suggestion',
      ['suggestions@promoodapp.com'], // TO: must be null or an array
      null, // CC: must be null or an array
      null, // BCC: must be null or an array
      null, // FILES: can be null, a string, or an array
      function() {console.log('share ok')},
      function(errormsg){/*alert(errormsg)
        ;*/
        console.log (errormsg);
      } // called when sh*t hits the fan
    );
  }
});
