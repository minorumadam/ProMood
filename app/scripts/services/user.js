'use strict';

angular.module('promoodApp')

.factory('UserService', function() {
  var self = {},
  genders = [
  { name: 'Select', value: 0 },
  { name: 'Male', value: 1 },
  { name: 'Female', value: 2 }
  ];

  self.getGenders = function() {
    return genders;
  };

  self.getPersonal = function() {
    return angular.fromJson(window.localStorage.personal) || {};
  };

  self.savePersonal = function(data) {
    window.localStorage.personal = angular.toJson(data);
  };

/*  self.getFeelingGood = function() {
    return angular.fromJson(window.localStorage.feelingGood) || [];
  };*/

/*  self.saveFeelingGood = function() {
    var feelings = self.getFeelingGood();
    feelings.push(data);
    window.localStorage.feelingGood = angular.toJson(feelings);
  };*/

  self.getAchievements = function(){
    return angular.fromJson(window.localStorage.achievements) || [];
  };

  self.saveAchievements = function(achievements){
    window.localStorage.achievements = angular.toJson(achievements);
  };

  self.calculateNewAchievements = function(){
    var achievements = self.getAchievements();
    var newAchievements = [];

    var newAchievement = self.getNewTrainingAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewHelpHelperAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewDaysAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewGoalsAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }
    var newAchievement = self.getNewShareAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }

    var newAchievement = self.getNewProclivityAchievements(achievements);
    if (newAchievement){
      newAchievements.push(newAchievement);
    }

    return newAchievements;
  };

  self.getNewTrainingAchievements = function(achievements){
    if (getMindfulnessFinished()){
      if (_.where(achievements, {name: 'Completed Training'}).length == 0){
        return {name:"Completed Training", date:moment()};
      }
      return null;
    }
  };

  self.getNewHelpHelperAchievements = function(achievements){
    if (getChatHelpedUser()){
      if (_.where(achievements, {name: 'Helped a user'}).length == 0){
        return {name:"Helped a user", date:moment()};
      }
    }
    if (getChatReceivedHelp()){
      if (_.where(achievements, {name: 'Received help from another user'}).length == 0){
        return {name:"Received help from another user", date:moment()};
      }
    }
    return null;

  };

  self.getNewDaysAchievements = function(achievements){
    /*var history = getHistory();
    if (history){
      
      var amountOfConsecutiveDays = 0;
      var lastDate = null;
    
      for (var i = 0; i < history.length; i++) {
         var historyRecord = history[i];
         
         var dateString = historyRecord.date.substring(0, 10);
          
         var currentDate = new Date(dateString);
        
         if (currentDate != lastDate){
            amountOfDays++;
         }
          
         lastDate = dateText;
      }  
        
      if (amountOfConsecutiveDays == 10){
        if (_.where(achievements, {name: '10 consecutive days using ProMood'}).length == 0){
          return {name:"10 consecutive days using ProMood", date:moment()};
        }
      }
      if (amountOfConsecutiveDays == 30){
        if (_.where(achievements, {name: '30 consecutive days using ProMood'}).length == 0){
          return {name:"30 consecutive days using ProMood", date:moment()};
        }
      }
      if (amountOfConsecutiveDays == 60){
        if (_.where(achievements, {name: '60 consecutive days using ProMood'}).length == 0){
          return {name:"60 consecutive days using ProMood", date:moment()};
        }
      }
    }*/
    return null;
  };

  self.getNewGoalsAchievements = function(achievements){
    var technicsDone = getTechnicsDone();
    if (technicsDone){
      if (technicsDone.length == 10){
        if (_.where(achievements, {name: '10 Goals completed'}).length == 0){
          return {name:"10 Goals completed", date:moment()};
        }
      }
      if (technicsDone.length == 30){
        if (_.where(achievements, {name: '30 Goals completed'}).length == 0){
          return {name:"30 Goals completed", date:moment()};
        }
      }
      if (technicsDone.length == 60){
        if (_.where(achievements, {name: '60 Goals completed'}).length == 0){
          return {name:"60 Goals completed", date:moment()};
        }
      }
    }
    return null;
  };

  self.getNewShareAchievements = function(achievements){
    if (getShareStatus()){
      if (_.where(achievements, {name: 'Shared activity'}).length == 0){
        return {name:"Shared activity", date:moment()};
      }
    }
    return null;
  };

  self.getNewProclivityAchievements = function(achievements){
    if (getStressProclivityResults() != null){
      if (_.where(achievements, {name: 'Stress Proclivity Test completed'}).length == 0){
        return {name:"Stress Proclivity Test completed", date:moment()};
      }
    }
    return null;
  };

  // counters for AVG mood in profile
  //starts

  self.saveFeelingGoodCounter = function(){
    var counter = window.localStorage['feelingGoodCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingGoodCounter = counter;
  }

  self.saveFeelingBadCounter = function(){
    var counter = window.localStorage['feelingBadCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingBadCounter = counter;
  }

  self.saveFeelingSoSoCounter = function(){
    var counter = window.localStorage['feelingSoSoCounter'];
    if (isNaN(counter)){
      counter = 0;
    }
    counter++;
    window.localStorage.feelingSoSoCounter = counter;
  }

  self.getFeelingsCounter = function(){

    var good = window.localStorage['feelingGoodCounter'];
    var bad = window.localStorage['feelingBadCounter'];
    var soso =  window.localStorage['feelingSoSoCounter'];

    good = transformToNumber(good);
    bad = transformToNumber(bad);
    soso = transformToNumber(soso);

    return {
      'good': good,
      'not-so-bad': soso,
      'not-so-good': bad
    };
  }

  self.calculateAverageMood = function(){
    var feelings = self.getFeelingsCounter();
    var total = feelings['good'] + feelings['not-so-bad'] + feelings['not-so-good'];

    var canBeCalculated = total > 0;
    if (!canBeCalculated){
        return {good: 0, notSoBad: 0, notSoGood: 0, averageMood:''};
    }

    var values = {};
    values.good = Math.round(feelings['good'] * 100 / total);
    values.notSoBad = Math.round(feelings['not-so-bad'] * 100 / total);
    values.notSoGood = 100 - values.good - values.notSoBad;
    values.averageMood = getMax(feelings);

    return values;
  }

  var getMax = function(feelings){
    return feelings['good'] > feelings['not-so-bad'] && feelings['good'] > feelings['not-so-good']
    ? "Good" : (feelings['not-so-bad'] > feelings['good'] && feelings['not-so-bad'] > feelings['not-so-good'] ? "So-So" : "Bad");
  }


  var transformToNumber = function(numberAsString){
    if (isNaN(numberAsString)){
      numberAsString = 0;
    } else {
      numberAsString = parseInt(numberAsString);
    }
    return numberAsString;
  }
  // end
  var getMindfulnessFinished = function(){
    var sessions = angular.fromJson(window.localStorage['mindfulnessUserData']);
    if (sessions) {
      var lastSession = sessions[sessions.length - 1];
      return lastSession.day == 56;
    }
    return false;
  }

  var getStressProclivityResults = function(){
    return angular.fromJson(window.localStorage["stress"]) || null;
  };

  var getChatHelpedUser = function(){
    return angular.fromJson(window.localStorage['helped']) || null;
  };

  var getChatReceivedHelp = function(){
    return angular.fromJson(window.localStorage['helper']) || null;
  };

  var getShareStatus = function(){
    return angular.fromJson(window.localStorage['share']) || null;
  };

  var getTechnicsDone = function(){
    return angular.fromJson(window.localStorage['technics']) || null;
  };

  var getHistory = function(){
    return angular.fromJson(window.localStorage['lastMoodOfTheDay']) || null;
  };

  return self;
});
