'use strict';

var app = angular.module('myApp.manage', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/manage', {
		templateUrl: 'manage/manage.html'
	});
}])

app.controller('manageCtrl', function($scope, $http, myFactory, $timeout) {
	var baseURL = 'http://localhost:4968', timer = false, displayDuration = 2000;

	$scope.alertText1 = "";
	$scope.showAlert1 = false;
	$scope.alertText2 = "";
	$scope.showAlert2 = false;

	$scope.deleteMostRecent = function() {
		$http.delete(baseURL+'/deleteTests?tests=previous&table='+myFactory.get()).success(function(data, status, headers, config) {		

			$scope.alertText1 = "Deleted most recent test.";
			$scope.showAlert1 = true;

			timer = $timeout(function () {
				$scope.showAlert1 = false;
			}, displayDuration);
		}).error(function(data, status, headers, config) {
			alert("Error deleting test");
		});
	};

	$scope.deleteAll = function() {
		$http.delete(baseURL+'/deleteTests?tests=all&table='+myFactory.get()).success(function(data, status, headers, config) {		

			$scope.alertText2 = "Deleted all tests.";
			$scope.showAlert2 = true;

			timer = $timeout(function () {
				$scope.showAlert2 = false;
			}, displayDuration);
		}).error(function(data, status, headers, config) {
			alert("Error deleting tests");
		});
	};

	$scope.deleteHundred = function() {
		$http.delete(baseURL+'/deleteTests?tests=hundred&table='+myFactory.get()).success(function(data, status, headers, config) {		

			$scope.alertText2 = "Deleted 100 old test.";
			$scope.showAlert2 = true;

			timer = $timeout(function () {
				$scope.showAlert2 = false;
			}, displayDuration);
		}).error(function(data, status, headers, config) {
			alert("Error deleting tests");
		});
	};

	$scope.deleteTest = function() {
		var input = document.getElementById("testToDelete");
		var id = input.value;
		input.value = "";
		if (id === (parseInt(id, 10)+"")){
			$http.delete(baseURL+'/deleteTests?tests='+id+'&table='+myFactory.get()).success(function(data, status, headers, config) {		

				$scope.alertText1 = "Deleted test "+id+".";
				$scope.showAlert1 = true;
				timer = $timeout(function () {
					$scope.showAlert1 = false;
				}, displayDuration);
			}).error(function(data, status, headers, config) {
				alert("Error deleting test "+id+".");
			});
		}
		else {
			alert("Error deleting test, please enter a valid integer value");
		}
	}

});
