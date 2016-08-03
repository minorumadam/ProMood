'use strict';

angular.module('promoodApp')

.factory('TrainingsService', function ($http, $sce, $location, $rootScope) {
  var self = {};

  self.getMindfulnessData = function() {
    return $http.get('data/mindfulness/mindfulness.json')
      .then(function(response) {
        return response.data.mindfulness;
      });
  };

  self.doneMindfulness = function(scope){
    var mindfulnessUserData = angular.fromJson(window.localStorage['mindfulnessUserData']) || [];

    var lastTimePlayedIsToday = self.lastTimePlayedIsToday(mindfulnessUserData);
    if(!lastTimePlayedIsToday) {

      var played = {day: scope.data.currentDayNumber, date: self.newDate()};

      mindfulnessUserData.push(played);
      window.localStorage['mindfulnessUserData'] = angular.toJson(mindfulnessUserData);
    }
  };

  self.lastTimePlayedIsToday = function(mindfulnessUserData) {
    var lastElement = self.getLastTimePlayedInfo(mindfulnessUserData)
    if(!lastElement) {
      return false;
    }
    var lastTimePlayed = self.newDate(lastElement.date);
    return self.isToday(lastTimePlayed);
  }

  self.getLastTimePlayedInfo = function(mindfulnessUserData) {
    if(mindfulnessUserData.length == 0) {
      return null;
    }
    return mindfulnessUserData[mindfulnessUserData.length-1];
  }

  self.isToday = function(date) {
    var today = self.newDate();
    return self.isSameDay(today, date);
  }

  self.isSameDay = function(date1, date2) {

  return date1.getFullYear() == date2.getFullYear()
      && date1.getMonth() == date2.getMonth()
      && date1.getDate() == date2.getDate();
  }

  self.startMindfulness = function(scope, state, audio, onAudioSuccess, onAudioError, onAudioStatusChange) {
    return self.getMindfulnessUserData(scope, audio, onAudioSuccess, onAudioError, onAudioStatusChange)/*.then(function(results) {
      var userData = results;
    })*/;
  };

  self.getMindfulnessUserData = function(scope, audio, onAudioSuccess, onAudioError, onAudioStatusChange) {
    var mindfulnessUserData = angular.fromJson(window.localStorage['mindfulnessUserData']);
    var userData = {};

    return self.getMindfulnessData().then(function(result) {

      var mindfulnessData = result;
      userData.currentDayNumber = self.calculateCurrentDayNumber(mindfulnessUserData, mindfulnessData.last);

      var templateSelector = self.chooseCurrentTemplateSelector();

      //choose morning or afternoon
//      templateSelector = 'morning';
//    templateSelector = 'afternoon';

      //choose day number from 1 to 56
//      userData.currentDayNumber = 56;

      var songId = null;
      if(mindfulnessData.first === userData.currentDayNumber) {
        songId = "first";
      } else if(mindfulnessData.last === userData.currentDayNumber) {
        songId = "last";
      } else {
        songId = ((userData.currentDayNumber + 1) % 3) + 2; //generates 2, 3, or 4 (looping)
      }

      var song = mindfulnessData.songs[songId];
      var template = null;
      if(templateSelector == 'morning') {
        template = song.morningSong;
      } else {
        template = song.afternoonSong;
      }
      var url = $location.absUrl();
      url = url.substring(0, url.indexOf($location.path()) - 1)
      userData.currentSong = url + template;
      userData.mindfulness = {url: userData.currentSong};
      scope.mindfulness = {url: template};

      //scope.audio = audio.load(template);
      //console.log(scope.audio);
      if (window.plugins && window.plugins.streamingMedia){
        scope.audio = new Media(template, onAudioSuccess, onAudioError, onAudioStatusChange);
      }
      scope.data = userData;
      //scope.data.mindfulnessAudioUrl = template;
    })
  }

  self.chooseCurrentTemplateSelector = function() {

    var time = self.newDate();

    var todayTimeForuteen = self.newDate();
    todayTimeForuteen.setHours(14);
    todayTimeForuteen.setMinutes(0);
    todayTimeForuteen.setSeconds(0);

    var yesterdayTimeTwo = self.newDate();
    yesterdayTimeTwo.setHours(2);
    yesterdayTimeTwo.setMinutes(0);
    yesterdayTimeTwo.setSeconds(0);
    yesterdayTimeTwo.setDate (yesterdayTimeTwo.getDate() -1);

    console.log('todayTimeForuteen: ' + todayTimeForuteen);
    console.log('yesterdayTimeTwo: ' + yesterdayTimeTwo);


    if(time.getTime() >  yesterdayTimeTwo.getTime() && time.getTime() <  todayTimeForuteen.getTime()) {
      return 'morning';
    } else {
      return 'afternoon';
    }
  }

  self.calculateCurrentDayNumber = function(mindfulnessUserData, last) {
    //if there is no data, is first date
    if(!mindfulnessUserData || mindfulnessUserData.length == 0) {
      return 1;
    }

    var lastTimePlayedInfo = self.getLastTimePlayedInfo(mindfulnessUserData)

    var isToday = self.isToday(self.newDate(lastTimePlayedInfo.date));

    if(isToday) {
      return lastTimePlayedInfo.day;
    } else {
      var currentDayNumber = lastTimePlayedInfo.day + 1;
      //if there are no more days to listen, starts over
      if(currentDayNumber > last) {

        //we clean previous data
        window.localStorage['mindfulnessUserData'] = angular.toJson([]);

        //and return to the begining
        currentDayNumber = 1;
      }
      window.localStorage['mindfulnessCurrentDayNumber'] = currentDayNumber;
      return currentDayNumber;
    }
  };

  self.getCurrentDayNumber = function(){
    var currentDayNumber = window.localStorage.mindfulnessCurrentDayNumber;
    if (currentDayNumber){
      return currentDayNumber;
    } else {
      return 1;
    }
  }

  self.newDate = function(param){
    if(!param) {
      return new Date();
    }
    return new Date(param);
  }


  return self;
});
