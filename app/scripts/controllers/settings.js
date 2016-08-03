'use strict';

angular.module('promoodApp')
.controller('SettingsController', function ($scope, $rootScope, $ionicPopup, $state, NotificationsService, UserService, PersonalityService, GoalsService, StateService) {
    $rootScope.showHomeButton = true;
    var initialize = function(){
    if(localStorage.getItem('socialMediaCheckboxValue') == null)
    {
      localStorage.setItem('socialMediaCheckboxValue',true);
    }
        
    if(localStorage.getItem('notificationsCheckboxValue') == null)
    {
      localStorage.setItem('notificationsCheckboxValue',true);
    }
        
    angular.element(document.querySelector("#leftMenutButton")).removeClass("violet");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("blue");
    angular.element(document.querySelector("#leftMenutButton")).removeClass("yellow");
    angular.element(document.querySelector("#leftMenutButton")).addClass("pink");
      
    $scope.passcodeSaved = angular.fromJson(window.localStorage['passcodeSaved']);
    $scope.passwordCheckboxValue = angular.fromJson(window.localStorage['passwordCheckboxValue']);
    $scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
    $scope.animationsCheckboxValue = angular.fromJson(window.localStorage['animationsCheckboxValue']);
    $scope.socialMediaCheckboxValue = angular.fromJson(window.localStorage['socialMediaCheckboxValue']);
    $scope.genders = UserService.getGenders();
    $scope.user = UserService.getPersonal();
    $scope.user.sex = $scope.user.gender == "1" ? "Male" : "Female";
    $scope.state = PersonalityService.getState();
    $scope.canUseInputDate = Modernizr.inputtypes.date;
    $scope.lonelinessTestResult = PersonalityService.getLonelinessTestResults();

    $scope.debug = window.debug;
      
    $scope.lonelinessTestResultToShow = '';
    if ($scope.lonelinessTestResult){
      $scope.lonelinessTestResultToShow = $scope.lonelinessTestResult[0].degree;
    }

    if ($scope.user.date.indexOf("T") > 0) {
      var dateArray = $scope.user.date.split("T")[0].split("-");
      var year = dateArray[0];
      var month = dateArray[1];
      var day = dateArray[2];
    } else {
      var date = new Date($scope.user.date);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
    }
    $scope.bornDate = year + "-"
        + (month.length < 2 && month < 10 ? "0" : "") + month + "-"
        + (day.length < 2 && day < 10 ? "0" : "") + day;
  };

  var isValidGender = function(value) {
    return !!value;
  };

  var isValidName = function(value) {
    return !!value;
  };

  var isValidDate = function(value) {
    var date = toDate(value),
    now = new Date();

    return date && !isNaN(date.getTime()) && date < now;
  };

  var toDate = function(value) {
    if(!value) return null;

    var date,
    monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(angular.isString(value)) {
      date = new Date(value);
    }
    else {
      if(!value.year || !value.month || !value.day) return null;
      if(value.year < 1000 || value.year > 3000 || value.month < 1 || value.month > 12) return null;

      if(value.year % 400 == 0 || (value.year % 100 != 0 && value.year % 4 == 0)) {
        monthLength[1] = 29;
      }

      if(value.day <= 0 || value.day > monthLength[value.month - 1]) return null;

      date = new Date(value.year, value.month, value.day);
    }

    return date;
  };

  $scope.showChangeSex = function(){
    $scope.gender = $scope.genders[0].value;
    $state.go('settings-change-gender');
  };

  $scope.changeGender = function(gender){
    UserService.savePersonal({
      name: $scope.user.name,
      date: $scope.user.date,
      gender: gender
    });
    $state.go('settings');
  };

  $scope.changeNotificationsCheckbox = function (){
    //console.log ("$scope.notificationsCheckboxValue: " + $scope.notificationsCheckboxValue);
    if ($scope.notificationsCheckboxValue){
      $scope.notificationsCheckboxValue = false;
      NotificationsService.setNotificationsEnableValue (false);
      //$scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
     }else{
      $scope.notificationsCheckboxValue = true;
      NotificationsService.setNotificationsEnableValue (true);
      //$scope.notificationsCheckboxValue = NotificationsService.getNotificationsEnableValue();
     }
    /*if ($scope.notificationsCheckboxValue){
      $scope.notificationsCheckboxValue = false;
      window.localStorage['notificationsCheckboxValue'] = angular.toJson($scope.notificationsCheckboxValue);
    }else{
      //window.plugin.notification.local.registerPermission(function (granted) {
        //if (granted){
          $scope.notificationsCheckboxValue = true;
          window.localStorage['notificationsCheckboxValue'] = angular.toJson($scope.notificationsCheckboxValue);
        //}
      //});
    }*/
  };

  $scope.changeAnimationsCheckbox = function(){
    if ($scope.animationsCheckboxValue){
      $scope.animationsCheckboxValue = false;
      window.localStorage['animationsCheckboxValue'] = angular.toJson($scope.animationsCheckboxValue);
    } else {
      $scope.animationsCheckboxValue = true;
      window.localStorage['animationsCheckboxValue'] = angular.toJson($scope.animationsCheckboxValue);
    }
  }
  
  $scope.changeSocialMediaCheckbox = function(){
    if ($scope.socialMediaCheckboxValue){
      $scope.socialMediaCheckboxValue = false;
      window.localStorage['socialMediaCheckboxValue'] = angular.toJson($scope.socialMediaCheckboxValue);
    } else {
      $scope.socialMediaCheckboxValue = true;
      window.localStorage['socialMediaCheckboxValue'] = angular.toJson($scope.socialMediaCheckboxValue);
    }
  }

  $scope.changePasswordCheckbox = function (){
    if ($scope.passwordCheckboxValue){
      $scope.passwordCheckboxValue = false;
      window.localStorage['passwordCheckboxValue'] = angular.toJson($scope.passwordCheckboxValue);
    }else{
      $scope.passwordCheckboxValue = true;
      $rootScope.createPassword = true;
      $state.go('passcode');
    }
  };

  $scope.passcode = {};
  var temporalyPasscode;
  $scope.onChangePasscodeInput = function (value){
    angular.element(document.querySelector("#passField")).focus();
    if (value.length === 4){
      angular.element(document.querySelector("#passField")).blur();
      if ($rootScope.createPassword){
        temporalyPasscode = value;
        $rootScope.createPassword = false;
        $rootScope.confirmPassword = true;
        $scope.passcode = {};
      } else if ($rootScope.confirmPassword){
        if (temporalyPasscode === value){
          $rootScope.confirmPassword = false;
          $rootScope.unlockApp = true;
          window.localStorage['passwordCheckboxValue'] = angular.toJson(true);
          window.localStorage['passcodeSaved'] = angular.toJson(value);
          $state.go('settings');
        } else {
          var popup = $ionicPopup.alert({
            title: 'Promood',
            template: 'Passcode does not match.'
          });
          popup.then(function(res) {
            $rootScope.createPassword = true;
            $rootScope.confirmPassword = false;
            $scope.passcode = {};
            $state.go('passcode');
          });
        }
      }else if($rootScope.askForPassword) {
        if ($scope.passcodeSaved === value){
          $rootScope.askForPassword = false;
          $rootScope.unlockApp = true;
          $scope.passcode = {};
          StateService.returnToPreviousState($rootScope.stateStatus);
          angular.element(document.querySelector("#leftMenutButton")).show();
        } else {
//          cordova.plugins.Keyboard.close();
          var popup = $ionicPopup.alert({
            title: 'Promood',
            template: 'Passcode is incorrect.'
          });
          popup.then(function(res) {
            $rootScope.askForPassword = true;
            $scope.passcode = {};
            $state.go('passcode');
          });
        }
      }
    }
  }

  $scope.showChangeName = function(){
    console.log($scope.user);
    $scope.name = $scope.user.name;
    $state.go('settings-change-name');

  };

  $scope.changeName = function(name){
    if (isValidName(name)){
      UserService.savePersonal({
        name: name,
        date: $scope.user.date,//toDate($scope.bornDate),
        gender: $scope.user.gender
      });
      $state.go('settings');
    };

  };

  $scope.showChangeBirthday = function(){
    $scope.birthday = $scope.user.birthday;
    $state.go('settings-change-birthday');
  };

  $scope.changeBirthday = function(bornDate){
    UserService.savePersonal({
      name: $scope.user.name,
      date: toDate(bornDate),
      gender: $scope.user.gender
    });
  };

  $scope.goToSettings = function(bornDate){
    $scope.changeBirthday(bornDate);
    $state.go('settings');
  };

  $scope.reDoTest = function(testName){
    console.log("red test:" + testName);
    $state.go(testName);
  };

  $scope.technics = function(){
    $rootScope.technicsToDo = null;
    $state.go('technics');
  };

  $scope.mindfulness = function(){
    GoalsService.getTechnics().then(function(result){

      // needs to be saved
      var problemSolving = _.where(result, {title:'Problem Solving'});
      $scope.problemSolving = problemSolving[0];
      $scope.technicNumber = 0;

      $scope.technics = $rootScope.technicsToDo ? $rootScope.technicsToDo : result;
      $scope.technicNumber =  $rootScope.technicsToDo ? 0 : 1;
      // ****
      var oneTechnic = _.where($scope.technics, {title:'Training'});
      $scope.technics = [{}, oneTechnic[0]];
      // *****

      $scope.technic = $scope.technics[$scope.technicNumber];
      $scope.onTechnic = true;
      $scope.step = 0;

      $state.go('technics');

      $scope.showNextButton = true;

    }, function(error){
      console.log(error);
    });
  };

  $scope.contactSupportByEmail = function (){
    window.plugins.socialsharing.canShareViaEmail(
      canShareViaEmailSuccess,
      function(e){
        $ionicPopup.alert({
          title: 'Promood',
          template: 'You don\'t have your email configured in your phone. Send an email to support@promoodapp.com with the subject "support".'
        });
      });
    };
    var canShareViaEmailSuccess = function (e){
      console.log("canShareViaEmailSuccess");
      window.plugins.socialsharing.shareViaEmail(
        '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
        'support',
        ['support@promoodapp.com'], // TO: must be null or an array
        null, // CC: must be null or an array
        null, // BCC: must be null or an array
        null, // FILES: can be null, a string, or an array
        function() {console.log('share ok')},
        function(errormsg){/*alert(errormsg)
          ;*/
          console.log (errormsg);
        } // called when sh*t hits the fan
      );
    };

  initialize();
});
