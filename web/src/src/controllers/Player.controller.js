var playerController = {
	players : [],
	Connection : null,
	errorService: null,

	getPlayers : function(data, callback, errorCallback){
		return this.Connection.create("navori/getPlayers", data).then(
		function(data){
			playerController.players = data.listPlayer.View_Player;
			if (callback != undefined)
				callback(data);
		},
		function(error){
			if (errorCallback != undefined)
				errorCallback(error);
			//playerController.errorService.manageError(error, $scope);
		});
	}

}

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

		var callbackError = function(error){
			errorService.manageError(error, $scope);
		}
		var callback = function(){
			$scope.players = playerController.players;
			alert("entra");
			console.log($scope.players);
			for( var i in $scope.players){
				$scope.players[i]["ParentGroupId"] = $scope.players[i].GroupId;
				$scope.players[i]["Id"] = "Player" + $scope.players[i].Id;
				$scope.players[i]["label"] = $scope.players[i].Name;
			}
			$scope.getGroup();
		}
		playerController.Connection = Connection;
		return playerController.getPlayers(data, callback, callbackError);
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
				var tree = $scope.marshallGroups($scope.groupArray.concat($scope.players));
				$scope.treedata = tree;
				
			},
			function(error){
				errorService.manageError(error, $scope);
			});

		
	}
	
	$scope.getPlayers();
	


	$scope.treedata = [];

 	$scope.$watch('PlayersNode.currentNode.Name', function() {
        if ($scope.PlayersNode.currentNode != undefined){
        	$rootScope.$broadcast('PlayerChange', $scope.PlayersNode.currentNode.Id);
        }
    });

    
});
