'use strict';

angular.module('promoodApp').service('CalendarService', function ($http) {

  var eventsToAdd = [];
  var calendarName = "ProMood";

  var getDateFromStringPlus = function (dateAsString, plus) {

    if (dateAsString instanceof Date) {
      return dateAsString;
    }
    var parsedDate = null;
    if (dateAsString.search("-") > -1) {
      parsedDate = dateAsString.split("-");
    }
    if (dateAsString.search("/") > -1) {
      parsedDate = dateAsString.split("/");
    }
    if (parsedDate && parsedDate.length >= 3) {
      //console.log(parsedDate[1].valueOf());
      //console.log(parseInt(parsedDate[2].valueOf()));
      var dateAsDate = getDateFromString(dateAsString);
      var day = dateAsDate.getDate();
      day = day + plus;
      dateAsDate.setDate(day);
      return new Date(dateAsDate.getFullYear(), dateAsDate.getMonth(), dateAsDate.getDate(), 0, 0, 0, 0, 0);
      //return dateAsDate.setDate(day);
    }
    return parsedDate;
  };

  var getDateFromString = function (dateAsString) {
    if (dateAsString instanceof Date) {
      return dateAsString;
    }
    if (dateAsString.search("-") > -1) {
      var parsedDate = dateAsString.split("-");
      if (parsedDate.length >= 3) {
        return new Date(parsedDate[0], parsedDate[1].valueOf() - 1, parsedDate[2], 0, 0, 0, 0, 0);
      }
    }
    return null;
  };

  var createEventInCalendar = function (dataRecived) {
    //console.log("Success: " + JSON.stringify(message));
    //console.log("createEventInCalendar eventTitle: " + dataRecived.eventTitle);
    window.plugins.calendar.createEventInNamedCalendar(dataRecived.eventTitle, dataRecived.location, dataRecived.notes, dataRecived.realStartDate, dataRecived.realEndDate, calendarName, dataRecived.callOptions, success, error);
  };

  var success = function (message) {
    //console.log("Success: " + JSON.stringify(message));
  };

  var error = function (message) {
    //console.log("Error: " + JSON.stringify(message));
  };

  var index;
  var successCreateCalendar = function (message) {
    console.log("Success creating calendar: " + JSON.stringify(message));
    for	(index = 0; index < eventsToAdd.length; index++) {
      createEventInCalendar(eventsToAdd[index]);// fruits[index];
    }
  };

  var errorCreateCalendar = function (message) {
    //console.log("Error: " + JSON.stringify(message));
  };

  /*var listCalendarsSuccess = function (dataRecived) {
    //console.log("listCalendarsSuccess eventTitle: " + dataRecived.eventTitle);
    //console.log("listCalendarsSuccess: " + JSON.stringify(message));
    //console.log (JSON.parse(message));
    //currentCalendars = window.plugins.calendar.listCalendars(success, error);
    //var proMoodCalendarAlreadyExists = _.where(currentCalendars, calendarName) > 0;
    //if (!proMoodCalendarAlreadyExists) {
    window.plugins.calendar.createCalendar(calendarName, createEventInCalendar(dataRecived), error);

    //} else {
      //createEventInCalendar(dataRecived);
   // }
  };*/

  this.clearEventsArray = function () {
    eventsToAdd = [];
  };

  this.pushEventToBeAdded = function (startDate, endDate, eventTitle, location, notes, callOptions) {
    var dataRecived = {};
    dataRecived.realStartDate = getDateFromString(startDate);

    dataRecived.eventTitle = eventTitle;
    dataRecived.location = location;
    dataRecived.notes = notes;
    dataRecived.callOptions = callOptions;

    if (endDate === '') {
      // all day event
      dataRecived.realEndDate = getDateFromStringPlus(startDate, 1);
    } else {
      dataRecived.realEndDate = getDateFromString(endDate);
    }
    eventsToAdd.push(dataRecived);
  };

  this.addEventsToCalendar = function ()
  {
    if (window.plugins && window.plugins.calendar) {
      window.plugins.calendar.createCalendar(calendarName, successCreateCalendar, errorCreateCalendar);
    }
  };

  /*this.addEventToCalendar = function (startDate, endDate, eventTitle, location, notes, callOptions) {

    var dataRecived = {};
    dataRecived.realStartDate = getDateFromString(startDate);

    dataRecived.eventTitle = eventTitle;
    dataRecived.location = location;
    dataRecived.notes = notes;
    dataRecived.callOptions = callOptions;

    if (endDate === '') {
      // all day event
      dataRecived.realEndDate = getDateFromStringPlus(startDate, 1);
    } else {
      dataRecived.realEndDate = getDateFromString(endDate);
    }

    //console.log("startDate: " + dataRecived.realStartDate);
    //console.log("realEndDate: " + dataRecived.realEndDate);

    if (window.plugins && window.plugins.calendar) {
      //currentCalendars = window.plugins.calendar.listCalendars();
      window.plugins.calendar.createCalendar(calendarName, createEventInCalendar(dataRecived), error);
      //createEventInCalendar(dataRecived);
    }
  };*/
});
