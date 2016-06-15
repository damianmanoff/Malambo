app.controller('PlayerController', function($scope, $rootScope, $cookieStore, parkingService, $location, errorService, $routeParams, priceService, logEntryService, promotionService,logEntryService, Connection) {
	updateLeftasideBar($rootScope, $location, $cookieStore);
	$scope.user = $cookieStore.get("navoriUser");
	if ($scope.user == undefined)
		$location.path("/");
	
	$scope.getPlayers = function(){
		var data = { 
				boxId : $scope.user.manager.BoxId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		Connection.create("navori/getPlayers", data).then(
			function(data){
				console.log(data);
			},
			function(error){
				errorService.manageError(error, $scope);
			});

		
	}

	$scope.marshallGroups = function(groups){
		for (var i in groups){
					
		}
	}

	$scope.getGroup = function(){
		var data = { 
				boxId : $scope.user.manager.BoxId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		Connection.create("navori/getGroup", data).then(
			function(data){
				$scope.groupArray = data.listGroup.View_Group;

			},
			function(error){
				errorService.manageError(error, $scope);
			});

		
	}
	
	$scope.getPlayers();
	$scope.getGroup();
	


	$scope.treedata = 
[
	{ "label" : "User", "id" : "role1", "children" : [
		{ "label" : "subUser1", "id" : "role11", "children" : [] },
		{ "label" : "subUser2", "id" : "role12", "children" : [
			{ "label" : "subUser2-1", "id" : "role121", "children" : [
				{ "label" : "subUser2-1-1", "id" : "role1211", "children" : [] },
				{ "label" : "subUser2-1-2", "id" : "role1212", "children" : [] }
			]}
		]}
	]},
	{ "label" : "Admin", "id" : "role2", "children" : [] },
	{ "label" : "Guest", "id" : "role3", "children" : [] }
];
 	console.log($scope.treedata);
});
