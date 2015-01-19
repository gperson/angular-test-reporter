'use strict';

var app = angular.module('myApp.stats', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		templateUrl: 'stats/stats.html'
	});
}])

app.controller('statsCtrl', function($scope, $http, myFactory) {

	$scope.stats = {};

	$scope.options = [
	                  { label: 'All', value: 'all' },
	                  { label: 'Run Info', value: 'runInfo' }
	                  ];

	$scope.filteredStats = $scope.options[0];
	
	$scope.initStats = fetchStats('all');
	
	$scope.getStats = function(option){
		fetchStats(option.value);
	}

	function fetchStats(value){
		$http.get('http://localhost:4968/getStats?filter='+value+'&table='+myFactory.get()).success(function(data, status, headers, config) {		
			$scope.stats = data;
		}).error(function(data, status, headers, config) {
			$scope.stats.filter = "Error getting the statistics";
		});
	}

});
