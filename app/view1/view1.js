'use strict';

var app = angular.module('myApp.view1', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {
		templateUrl: 'view1/view1.html',
		controller: 'testsCtrl'
	});
}]);

app.controller('testsCtrl', function($scope, $http) {
	$http.get('http://localhost:4968/getTestData').then(function(res){
		var objs = [];
		for(var i = 0; i < res.data.length; i++){
			var test = res.data[i];
			test.start = new Date(Date.parse(test.start));
			test.end = new Date(Date.parse(test.end));
			objs[i] = test;
		}
		$scope.tests = objs;                
	});

	$scope.toggleNotes = function(id){
		console.log($("#"+id).html());
		var $notes = $("#"+id).next();
		console.log($notes.html());
		if($notes.css("display") === "none"){
			$notes.css("display", "");
		}
		else{
			$notes.css("display", "none");
		}
	};

});

/**
 * Controller for notes section
 */
app.controller('notesCtrl', function($scope) {
	$scope.init = function(notes) {
		$scope.notesForm = notes;
	}

	$scope.addNote = function(){
		$scope.notesForm.push({'note' : $scope.noteInput, 'who' : $scope.whoInput});
		$scope.noteInput = '';
		$scope.whoInput = '';
	}
});