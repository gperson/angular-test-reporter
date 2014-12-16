'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'testsCtrl'
  });
}])

.controller('testsCtrl', function($scope) {
	$scope.tests = [
		{'id' : 1, 'name' : 'One', 'param' : 'X = 1, Y = 2', 'start': new Date(), 'end': new Date(), 'status': 'success','extra' : 'Tests if Y + X = X + Y',
			'notes' : []
		},
		{'id' : 2, 'name' : 'Two', 'param' : 'Who = Jim', 'start': new Date(), 'end': new Date(), 'status': 'success',
			'notes' : []
		},
		{'id' : 3, 'name' : '3', 'param' : 'null', 'start': new Date(), 'end': new Date(), 'status': 'danger','error' : 'Null pointer',
			'notes' : [
				{'note' : 'Failed because ran on old build', 'who' : 'Grant'},
				{'note' : 'Sounds good', 'who' : 'Jake'}
			]
		}
	];
	
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
