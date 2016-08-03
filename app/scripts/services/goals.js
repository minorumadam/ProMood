'use strict';

angular.module('promoodApp')

.factory('GoalsService', function ($http) {
  var self = {};

  self.getTechnics = function() {
    return $http.get('data/technics.json')
      .then(function(response) {
        return response.data.technics;
      });
  };

  self.doneTechnic = function(technic){
    var doneTechnics = angular.fromJson(window.localStorage['technics']) || [];
    doneTechnics.push(technic);
    window.localStorage['technics'] = angular.toJson(doneTechnics);
  };

  return self;
});
