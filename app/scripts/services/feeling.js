'use strict';

angular.module('promoodApp')

.factory('FeelingService', function ($http, $window, $q, $rootScope, PersonalityService) {
  var self = {};

  self.getPathology = function(pathology) {
    return $http.get('data/en/pathologies/' + pathology + '.json')
    .then(function(response) {
      var biorhythm = PersonalityService.getBiorhythmSign(),
      state = PersonalityService.getState();

      return response.data[state][biorhythm.emotional][biorhythm.intellectual][biorhythm.physical];
    });
  };

  self.getPathologyReplays = function(mood, pathology){
    var deffered = $q.defer();

    var replays = 0;
    var moodHistory = angular.fromJson(window.localStorage['lastMoodOfTheDay']).reverse();
    if (moodHistory == undefined || moodHistory.length == 0){
      defeered.resolve(0)
    } else {

      var moodCounter = 0;
      var lastMood = moodHistory[moodCounter];
      var currentMood = moodHistory[moodCounter];

      var ignore = false;
      for (var i = 1; i < moodHistory.length; i++){
        var currentMood = moodHistory[i];
        if (lastMood.pathology == currentMood.pathology && !ignore){
          replays++;
        } else {
          var ignore = true;
        }
        lastMood = currentMood;
      }
    }
    
    console.log("replay count after: " + replays);

      
    deffered.resolve(replays);
    return deffered.promise;
  };

  self.getFeeling = function(mood) {
    return angular.fromJson(window.localStorage[mood]) || [];
  };

  self.getFeelingHistory = function(){
    return angular.fromJson(window.localStorage['history']) || [];
  };

  // Method has to be rafactored.
  self.saveFeeling = function(mood, data) {

    var demo = true;
    var pathologyToSave = data.pathology || mood;

    // For production:
    //var dateToSave = self.getMoment();
    // For demo:
    var dateToSave = moment();

    var feelings = self.getFeeling('lastMoodOfTheDay');
    if (feelings == undefined){
      feelings = [];
    }
    var dayFeeling = _.where(feelings, {date:dateToSave});
    if (dayFeeling.length > 0){
      dayFeeling[0].pathology = pathologyToSave;
    } else {
      if (feelings.length > 61){
        feelings.shift();
      }
      feelings.push({date: dateToSave, pathology: pathologyToSave});
    }

    // saving last mood of the day for detecting same pathologies
    window.localStorage['lastMoodOfTheDay'] = angular.toJson(feelings);

    // saving good moood for showing as strenght
    if (mood === 'good'){

      var goodCompleteHistory = self.getFeeling('completeGoodHistory');

      if (goodCompleteHistory.length > 9) {
        goodCompleteHistory.shift();
      }
      goodCompleteHistory.push(data);
      window.localStorage['completeGoodHistory'] = angular.toJson(goodCompleteHistory);
    }
  };

  self.getGoals = function(){
    return angular.fromJson(window.localStorage['goals']) || [];
  };

  self.saveGoals = function(technic){
    var goals = self.getGoals();
    goals.push(technic);
    window.localStorage['goals'] = angular.toJson(goals);
  };

  self.removeGoal = function(index){
    var goals = self.getGoals();
    var newGoals = _.without(goals, goals[index]);
    window.localStorage['goals'] = angular.toJson(newGoals);
  };

// PHOTO PROFILE START
  var fileEntryScope = {};
  self.getPhotoProfile = function(){
    //console.log(cordova.file.dataDirectory);
    console.log('getPhotoProfile1');

    var profileUrl = window.localStorage['profile'];
    console.log('getPhotoProfile1.1: profile from localstorage ' + profileUrl);

    if (profileUrl){
      var profile = angular.fromJson(profileUrl);
      console.log('getPhotoProfile2');
      console.log('getPhotoProfile3 accesing photo profile:' + profile);
      return profile;
    } else {
      console.log('profileURL is undifined');
    }

    return null;
  };
  var onMovingFileSuccess = function(data){
    console.log('moving file success: ' + data.toURL());
    $rootScope.photoFinalURL = data.toURL();
    console.log('feelings $rootScope.photoFinalURL: ' + $rootScope.photoFinalURL);

    if ($rootScope.isProfilePhoto) {
      $rootScope.saveProfilePhotoToDataStorageAndShow();
    } else {
      $rootScope.saveGoodPhotoToDataStorageAndShow();
    }
  }
  var onMovingFileError = function(error){
    console.log('moving file error: ' + error);
  }
  var onGettingFinalDirSuccess = function(dirEntry){
    console.log('file entry to move: ' + fileEntryScope.fullPath);
    console.log('success getting final directory: ' + dirEntry.fullPath);
    fileEntryScope.moveTo(dirEntry, $rootScope.photoName, onMovingFileSuccess, onMovingFileError);
  }
  var onGettingFinalDirError = function(error){
    console.log('Error getting final directory: ' + error);
  }
  var onSuccessGettingFile = function(fileEntry){
    console.log('success geting file:' + fileEntry.fullPath);
    fileEntryScope = fileEntry;
    requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs){
      //console.log('got the fs: ' + fs);
      fs.root.getDirectory("ProMoodData", {create: true}, onGettingFinalDirSuccess, onGettingFinalDirError);
    }, function(error){
      //console.log('error getting fs')
    });
  }
  var onErrorGettingFile = function(error){
    console.log('error getting file: ' + error);
  }
  self.savePhotoProfile = function (photo){
    console.log('url received from camera: ' + photo);
    $rootScope.photoName = 'profilePhoto.jpg';
    $rootScope.isProfilePhoto = true;
    if (typeof cordova !== 'undefined'){
      resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
    }
  };
// END PHOTO PROFILE

// SAVE PHOTO GOOD
  self.savePhotoGood = function (photo){
    console.log('url received from camera: ' + photo);
    $rootScope.photoName = ((new Date()).getTime())+'good.jpg';
    $rootScope.isProfilePhoto = false;
    if (typeof cordova !== 'undefined'){
      resolveLocalFileSystemURL(photo, onSuccessGettingFile, onErrorGettingFile);
    }
  };
// END SAVE GOOD


  self.getMoment = function () {
    return moment().format('DD-MM-YYYY');
  }

  self.swipeRightPathology = function(patologyStateName, patologyDescriptionStateName, scope, rootScope, selected) {
    if (rootScope.stateStatus.currentState === patologyStateName) {
      var pathologySelectedName = selected.pop();
      scope.levelCount--;
      if (scope.levelCount >= 0) {
        scope.level = scope.getLevel();
        scope.pathologySelected = scope.level.options
        .indexOf(pathologySelectedName);
      } else {
        rootScope.onSwipeRight();
      }
    } else if (rootScope.stateStatus.currentState === patologyDescriptionStateName) {
      //do nothing
    } else {
      rootScope.onSwipeRight();
    }
  }

  return self;
});
