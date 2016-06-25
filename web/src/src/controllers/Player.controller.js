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

		return Connection.create("navori/getPlayers", data).then(
			function(data){
				$scope.players = data.listPlayer.View_Player;
				for( var i in $scope.players){
					$scope.players[i]["ParentGroupId"] = $scope.players[i].GroupId;
					$scope.players[i]["Id"] = "Player" + $scope.players[i].Id;
					$scope.players[i]["label"] = $scope.players[i].Name;
				}
				$scope.getGroup();
			},
			function(error){
				errorService.manageError(error, $scope);
			});
	}	

	$scope.getMedia = function(groupId){
		var data = { 
				groupId : groupId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		return Connection.create("navori/getMedia", data).then(
			function(data){
				console.log(data);
			},
			function(error){
				errorService.manageError(error, $scope);
			});
	}

	$scope.getTemplate = function(groupId){
		var data = { 
				groupId : groupId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		return Connection.create("navori/getTemplate", data).then(
			function(data){
				console.log(data);
			},
			function(error){
				errorService.manageError(error, $scope);
			});
	}

	function treeify(list, idAttr, parentAttr, childrenAttr) {
	    if (!idAttr) idAttr = 'id';
	    if (!parentAttr) parentAttr = 'parent';
	    if (!childrenAttr) childrenAttr = 'children';

	    var treeList = [];
	    var lookup = {};
	    list.forEach(function(obj) {
	        lookup[obj[idAttr]] = obj;
	        obj[childrenAttr] = [];
	    });
	    list.forEach(function(obj) {
	        if (obj[parentAttr] != null) {
	            lookup[obj[parentAttr]][childrenAttr].push(obj);
	        } else {
	            treeList.push(obj);
	        }
	    });
	    return treeList;
	};

	$scope.marshallGroups = function(groups){
		if (groups == undefined)
			return;
		console.log("treeify");
		return treeify(groups, "Id", "ParentGroupId", null );
	}

	$scope.getGroup = function(){
		var data = { 
				boxId : $scope.user.manager.BoxId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		return Connection.create("navori/getGroup", data).then(
			function(data){
				$scope.groupArray = data.listGroup.View_Group;
				for( var i in $scope.groupArray){
					$scope.groupArray[i].label = $scope.groupArray[i].Name
				}
				console.log($scope.players);
				console.log($scope.groupArray);
				console.log($scope.groupArray.concat($scope.players));
				var tree = $scope.marshallGroups($scope.groupArray.concat($scope.players));
				$scope.treedata = tree;
				
			},
			function(error){
				errorService.manageError(error, $scope);
			});

		
	}
	
	$scope.getPlayers();
	


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
 	$scope.$watch('PlayersNode.currentNode.Name', function() {
        $scope.getMedia($scope.PlayersNode.currentNode.Id);
    });

    
});
