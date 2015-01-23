'use strict';

var app = angular.module('myApp.manage', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/manage', {
		templateUrl: 'manage/manage.html'
	});
}])

app.controller('manageCtrl', function($scope, $http, myFactory) {
	$scope.deleteMostRecent = function() {
		$http.delete('http://localhost:4968/deleteTests?tests=previous&table='+myFactory.get()).success(function(data, status, headers, config) {		
		
		}).error(function(data, status, headers, config) {
			alert("Error deleting test");
		});
    };
});
