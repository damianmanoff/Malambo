var playlistController = {
	playlists : [],
	playlistContent : [],
	Connection : null,
	errorService: null,

	getPlaylist : function(data, callback, errorCallback){
		return this.Connection.create("navori/getPlaylist", data).then(
		function(data){
			console.log(data);
			playlistController.playlists = data.listPlaylist.View_Playlist;
			if (callback != undefined)
				callback(data);
		},
		function(error){
			if (errorCallback != undefined)
				errorCallback(error);
			//playlistController.errorService.manageError(error, $scope);
		});
	},

	getPlaylistContent : function(data, callback, errorCallback){
		return this.Connection.create("navori/getPlaylistComponent", data).then(
		function(data){
			console.log(data);
			playlistController.playlistContent = data.listPlaylistComponent.View_PlaylistComponent;
			if (callback != undefined)
				callback(data);
		},
		function(error){
			if (errorCallback != undefined)
				errorCallback(error);
			//playlistController.errorService.manageError(error, $scope);
		});
	}

}

app.controller('PlaylistController', function($scope, $rootScope, $cookieStore, parkingService, $location, errorService, $routeParams, priceService, logEntryService, promotionService,logEntryService, Connection) {
	$scope.user = $cookieStore.get("navoriUser");
	if ($scope.user == undefined)
		$location.path("/");
	playlistController.Connection = Connection;
	var callbackError = function(error){
		errorService.manageError(error, $scope);
	}
	
	$scope.getPlaylist = function(groupId){
		var data = { 
				groupId : [groupId],
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		var callback = function(){
			$scope.playlists = playlistController.playlists;
			console.log($scope.playlists);
		}
		return playlistController.getPlaylist(data, callback, callbackError);
	}
	
	$scope.chargeContent = function(playlistId, groupId){
		var data = { 
				playlistId : playlistId,
				groupId : groupId,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}
		
		var callback = function(){
			$scope.content = playlistController.playlistContent;
			console.log($scope.content);
		}
		return playlistController.getPlaylistContent(data, callback, callbackError);
	}

	$scope.$on('PlayerChange', function(event, id) {
		$scope.getPlaylist(id);
		
	});	



    
});
