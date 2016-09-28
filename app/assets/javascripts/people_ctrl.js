(function() {
  "use strict";

  angular.module("app").controller("peopleCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get("http://localhost:3001/characters.json").then(function(response) {
        $scope.people = response.data;
      })
    },

    $scope.addCharacter = function(firstName, lastName) {
      var newCharacter = {
        first_name: firstName,
        last_name: lastName
      }

      $http.post("http://localhost:3001/characters.json", newCharacter).then(function(response) {
        $scope.people.push(response.data);
        $scope.firstName = null;
        $scope.lastName = null;
      })

    },

    $scope.deletePerson = function(index) {
      var character = $scope.people[index];

      $http.delete("http://localhost:3001/characters/" + character.id + ".json").then(function(response) {
        $scope.people.splice(index, 1);
      })
    },

    $scope.updatePerson = function(firstName, lastName, index) {
      var person = $scope.people[index]
      var characterInformation = {
        first_name: firstName || person.first_name,
        last_name: lastName || person.last_name
      }

      $http.patch("http://localhost:3001/characters/" + person.id + ".json", characterInformation).then(function(response) {
        $scope.people[index] = characterInformation;
      })
    }
  })
}());
