'use strict';

var app = angular.module('myApp.tests', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/tests', {
		templateUrl: 'tests/tests.html'
	});
}]);

app.controller('testsCtrl', function($scope, $http, myFactory) {
	$http.get('http://localhost:4968/getTestData?table='+myFactory.get()).success(function(data, status, headers, config) {		
		var objs = [];
		for(var i = 0; i < data.length; i++){
			var test = data[i];
			test.start = new Date(Date.parse(test.start));
			test.end = new Date(Date.parse(test.end));
			objs[i] = test;
		}
		$scope.tests = objs;  
	}).error(function(data, status, headers, config) {
		var objs = [];
		objs[0] = {name : "Uh-oh error, reparo server.", error : "Couldn't connect to local server on port 4968."};
		$scope.tests = objs;
	});

	$scope.toggleNotes = function(id){
		var $notes = $("#"+id).next();
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
app.controller('notesCtrl', function($scope,$http, myFactory) {
	$scope.init = function(notes) {
		$scope.notesForm = notes;
	}

	$scope.addNote = function($event){
		//TODO has to be better way to get id
		var note = { 
				testId : $($event.target).parent().parent().parent().prev().attr('id'),
				note : $scope.noteInput,
				who : $scope.whoInput	
		};
		$scope.notesForm.push({'note' : $scope.noteInput, 'who' : $scope.whoInput});
		$scope.noteInput = '';
		$scope.whoInput = '';

		$http.post('http://localhost:4968/addNote?table='+myFactory.get(), JSON.stringify(note)).success(function(data, status, headers, config) {
			console.log("SUCCESS - Adding Note");
		}).error(function(data, status, headers, config) {
			alert("Your note wasn't saved, please don't cry.")
		});

	}
});