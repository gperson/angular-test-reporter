'use strict';

var app = angular.module('myApp.tests', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/tests', {
		templateUrl: 'tests/tests.html'
	});
}]);

app.controller('testsCtrl', function($scope, $http, myFactory) {
	var baseURL = 'http://localhost:4968';
	
	$scope.c1 = {display: ''};
	$scope.bC1 = '';
	$scope.c2 = {display: ''};
	$scope.bC2 = '';
	$scope.c3 = {display: 'none'};
	$scope.bC3 = 'active';
	$scope.c4 = {display: ''};
	$scope.bC4 = '';
	$scope.c5 = {display: ''};
	$scope.bC5 = '';
	$scope.c6 = {display: 'none'};
	$scope.bC6 = 'active';
	$scope.c7 = {display: 'none'};
	$scope.bC7 = 'active';
	$scope.c8 = {display: ''};
	$scope.bC8 = '';
	$scope.c9 = {display: 'none'};
	$scope.bC9 = 'active';
	
	$http.get(baseURL+'/getTestData?table='+myFactory.get()).success(function(data, status, headers, config) {		
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
	
	$scope.toggleIdCol = function(){
		if(!($scope.c1.display === '')){
			$scope.c1 = {display: ''};
			$scope.bC1 = "";
		}
		else{
			$scope.c1 = {display : 'none'};
			$scope.bC1 = "active";
		}
	};

	$scope.toggleNameCol = function(){
		if(!($scope.c2.display === '')){
			$scope.c2 = {display: ''};
			$scope.bC2 = "";
		}
		else{
			$scope.c2 = {display : 'none'};
			$scope.bC2 = "active";
		}
	};
	
	$scope.toggleErrorCol = function(){
		if(!($scope.c3.display === '')){
			$scope.c3 = {display: ''};
			$scope.bC3 = "";
		}
		else{
			$scope.c3 = {display : 'none'};
			$scope.bC3 = "active";
		}
	};
	
	$scope.toggleRICol = function(){
		if(!($scope.c4.display === '')){
			$scope.c4 = {display: ''};
			$scope.bC4 = "";
		}
		else{
			$scope.c4 = {display : 'none'};
			$scope.bC4 = "active";
		}
	};
	
	$scope.toggleParamCol = function(){
		if(!($scope.c5.display === '')){
			$scope.c5 = {display: ''};
			$scope.bC5 = "";
		}
		else{
			$scope.c5 = {display : 'none'};
			$scope.bC5 = "active";
		}
	};
	
	$scope.toggleStartCol = function(){
		if(!($scope.c6.display === '')){
			$scope.c6 = {display: ''};
			$scope.bC6 = "";
		}
		else{
			$scope.c6 = {display : 'none'};
			$scope.bC6 = "active";
		}
	};
	
	$scope.toggleEndCol = function(){
		if(!($scope.c7.display === '')){
			$scope.c7 = {display: ''};
			$scope.bC7 = "";
		}
		else{
			$scope.c7 = {display : 'none'};
			$scope.bC7 = "active";
		}
	};
	
	$scope.toggleElapCol = function(){
		if(!($scope.c8.display === '')){
			$scope.c8 = {display: ''};
			$scope.bC8 = "";
		}
		else{
			$scope.c8 = {display : 'none'};
			$scope.bC8 = "active";
		}
	};
	
	$scope.toggleExtraCol = function(){
		if(!($scope.c9.display === '')){
			$scope.c9 = {display: ''};
			$scope.bC9 = "";
		}
		else{
			$scope.c9 = {display : 'none'};
			$scope.bC9 = "active";
		}
	};
	
});

/**
 * Controller for notes section
 */
app.controller('notesCtrl', function($scope,$http, myFactory) {
	var baseURL = 'http://localhost:4968';
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

		$http.post(baseURL+'/addNote?table='+myFactory.get(), JSON.stringify(note)).success(function(data, status, headers, config) {
			
		}).error(function(data, status, headers, config) {
			alert("Your note wasn't saved, please don't cry.")
		});

	}
});