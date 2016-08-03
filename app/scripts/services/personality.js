'use strict';

angular.module('promoodApp')

.factory('PersonalityService', function ($http, UserService) {
  var self = {};

  var getBirthDate = function() {
    var birthDate = new Date(UserService.getPersonal().date);

    return new Date(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate());
  };

  var getBirthDays = function() {
    return (new Date() - getBirthDate()) / (1000 * 60 * 60 * 24);
  };

  self.getQuestions = function() {
    return $http.get('data/en/personality-test.json')
      .then(function(response) {
        return response.data.questions;
      });
  };

  self.getPersonalityDescription = function(personality){
    return $http.get('data/en/personality-test.json')
    .then(function(response) {
      return response.data[personality];
    });
  }

  self.getAnswers = function(answers) {
    return angular.fromJson(window.localStorage.answers) || [];
  };

  self.saveAnswers = function(answers) {
    window.localStorage.answers = angular.toJson(answers);
  };

  self.resolveTest = function() {
    var answers = self.getAnswers();
    console.log(answers);

    $http.get('data/en/personality-test.json')
      .then(function(response) {
        console.log(response.data);
        var data = response.data,
            state = "",
            states,
            statesCounter,
            questions,
            max,
            maxIndex;

        for(var i = 0; i < data.state.length; i++) {
          states = data.state[i];
          statesCounter = [];

          for(var j = 0; j < states.length; j++) {
            questions = data[states[j]];
            statesCounter[j] = 0;

            for(var k = 0; k < questions.length; k++) {
              statesCounter[j] += answers[questions[k] - 1] ? 1 : 0;
            }
          }
          console.log(statesCounter);
          max = Math.max.apply(null, statesCounter);
          maxIndex = statesCounter.indexOf(max);
          state += states[maxIndex];
        }

        self.getPersonalityDescription(state)
          .then(function(result){
            self.savePersonalityInfo(result);
          });

        self.saveState(state);
      });
  };

  self.getState = function() {
    return window.localStorage.state;
  };

  self.savePersonalityInfo = function(info){
    var personalTestInfoAsJson = angular.toJson(info);
    window.localStorage.personalityInfo = personalTestInfoAsJson;
  }

  self.saveState = function(state) {
    window.localStorage.state = state;
  };

  self.getPersonalInfo = function(){
    return angular.fromJson(window.localStorage["personalityInfo"]) || null;
  }

  self.getBiorhythm = function() {
    var days = getBirthDays(),
        k = 2 * Math.PI * days;

    return {
      physical: Math.sin( k / 23 ),
      emotional: Math.sin( k / 28 ),
      intellectual: Math.sin( k / 33 )
    };
  };

  self.getBiorhythmSign = function() {
    var biorhythm = self.getBiorhythm();

    return {
      physical: biorhythm.physical >= 0 ? 'P' : 'N',
      emotional: biorhythm.emotional >= 0 ? 'P' : 'N',
      intellectual: biorhythm.intellectual >= 0 ? 'P' : 'N'
    };
  };

  self.getStressProclivityTest = function(){
    return $http.get('data/en/stress-test.json')
    .then(function(response) {
      return response.data.questions;
    });
  };

  self.saveStressProclivityResults = function(result){
    window.localStorage["stress"] = angular.toJson(result);
  };

  self.saveLonelinessTestResults = function(result){
    window.localStorage["loneliness"] = angular.toJson(result);
  };

  self.getStressProclivityResults = function(){
    return angular.fromJson(window.localStorage["stress"]) || null;
  }

  self.getLonelinessTestResults = function(){
    return angular.fromJson(window.localStorage["loneliness"]) || null;
  }

  self.getLonelinessTest = function(){
    return $http.get('data/en/loneliness-test.json')
    .then(function(response) {
      return response.data;
    });
  };

  return self;
});
