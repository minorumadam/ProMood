/**
 * Created by jcenturion on 3/3/15.
 */
'use strict';

angular.module('promoodApp').service('NotificationsService',
  ['$http', function ($http) {
    var notificationsCheckboxValue = false, localNotifGoalsCreated = false, localNotifInactiveUserCreated = false;

    this.getLocalNotifInactiveUserCreated = function () {
      return localNotifInactiveUserCreated;
    };
    this.setLocalNotifInactiveUserCreated = function (value ) {
      localNotifInactiveUserCreated = value;
    };

    this.getNotificationsEnableValue = function () {
      //console.log("getNotificationsEnableValue function");
      notificationsCheckboxValue = angular.fromJson(window.localStorage['notificationsCheckboxValue']);
      return notificationsCheckboxValue;
    };

    this.setNotificationsEnableValue = function (value) {
      //console.log("setNotificationsEnableValue function with value=" + value);
      notificationsCheckboxValue = value;
      window.localStorage['notificationsCheckboxValue'] = angular.toJson(notificationsCheckboxValue);
    };

    this.getLocalNotifGoalsCreatedValue = function () {
      return localNotifGoalsCreated;
    };
    this.setLocalNotifGoalsCreatedValue = function (value) {
      localNotifInactiveUserCreated = value;
    };

    this.createLocalNotificationInactiveUser = function () {
      localNotifInactiveUserCreated = true;
      var date = getNowPlusDays(7);
      //var date = $scope.getNowPlusTest();
      var userName = angular.fromJson(window.localStorage.personal).name;
      var message = "Hi "+ userName +"! It's been a long time, how are you feeling today?";
      createLocalNotification(date, message, 0);
    };

    this.createLocalNotificationGoals = function () {
      localNotifInactiveUserCreated = true;
      var date = getNowPlus12Hours();
      //var date = getNowPlus1Min();
      var userName = angular.fromJson(window.localStorage.personal).name;
      var message = "Hi "+ userName +"! Remember that you have pending goals!";
      createLocalNotification(date, message, 1);
    }

    var createLocalNotification = function(date, message, notificationID){
      window.plugin.notification.local.add({
        id:         notificationID,  // A unique id of the notification
        date:       date,    // This expects a date object
        message:    message,
        badge:      0,
        autoCancel: true // Setting this flag and the notification is automatically cancelled when the user clicks it
      });
    }

    var getNowPlus10Sec= function () {
      return new Date(new Date().getTime() + 10 * 1000);
    };

    var getNowPlus1Min= function () {
      return new Date(new Date().getTime() + 60 * 1000);
    };

    var getNowPlus12Hours= function () {
      return new Date(new Date().getTime() +  1000*60*60*12);
    };

    //every 1 hour
    var getNowPlusTest= function () {
      return new Date(new Date().getTime() + 60*1000 * 60 *5);
    };

    var getNowPlusDays= function (days) {
      return new Date(new Date().getTime() + 1000*60*60*24/*this is one day*/ * days);
    };
  }]
);
