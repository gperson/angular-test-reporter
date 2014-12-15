'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'TestsCtrl'
  });
}])

.controller('TestsCtrl', function($scope) {
	$scope.tests = [
		{'title' : 'Title One', 'text' : 'This it the text for the first test'},
		{'title' : 'Title Two', 'text' : 'This it the text for the second test'}
	];
});