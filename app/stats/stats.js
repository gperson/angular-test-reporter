'use strict';

var app = angular.module('myApp.stats', ['ngRoute','highcharts-ng'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		templateUrl: 'stats/stats.html'
	});
}])

app.controller('statsCtrl', function($scope, $http, myFactory) {
	var baseURL = 'http://localhost:4968';
	
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

	$scope.chartConfig = {
			loading: true
	}

	$http.get(baseURL+'/getStats?filter=all&table='+myFactory.get()).success(function(data, status, headers, config) {
		$scope.chartConfig = {
				options: {
					chart: {
						type: 'pie'
					}
				},
				series: [{
					name: 'Number of tests',
					data: [{
						name: 'Successes',
						y : data[0].success,
						color : '#dff0d8'
					},
					{
						name: 'Failures',
						y : data[0].failure,
						color : '#f2dede'
					},
					{
						name: 'Other',
						y : data[0].other,
						color : '#fcf8e3'
					}
					] 				
				}],
				title: {
					text: 'Test Statuses'
				},
				loading: false
		}
	}).error(function(data, status, headers, config) {
		
	});

	function fetchStats(value){
		$http.get(baseURL+'/getStats?filter='+value+'&table='+myFactory.get()).success(function(data, status, headers, config) {		
			$scope.stats = data;
		}).error(function(data, status, headers, config) {
			$scope.stats.filter = "Error getting the statistics";
		});
	}

});
