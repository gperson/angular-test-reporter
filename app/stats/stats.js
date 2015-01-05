'use strict';

var app = angular.module('myApp.stats', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		templateUrl: 'stats/stats.html'
	});
}])

app.controller('statsCtrl', function($scope, $http, myFactory) {
	$http.get('http://localhost:4968/getStats?filter=all&table='+myFactory.get()).success(function(data, status, headers, config) {		
		$scope.stats = data[0];
	}).error(function(data, status, headers, config) {
		
	});
});