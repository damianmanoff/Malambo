app.controller('ContentController', function($scope, $rootScope, $cookieStore,  $location, errorService, $routeParams,  Connection) {
	$scope.user = $cookieStore.get("navoriUser");
	if ($scope.user == undefined)
		$location.path("/");

	$scope.getMediaImages = function(){
		return $scope.media.filter(function (el) {
			return el.FolderName.indexOf("Imagenes") > -1;
		});
	}
	$scope.getMediaTemplate = function(){
		return $scope.media.filter(function (el) {
			return el.FolderName.indexOf("Media & Template") > -1;
		});
	}
	$scope.getMediaVideos = function(){
		return $scope.media.filter(function (el) {
			return el.FolderName.indexOf("Videos") > -1;
		});
	}

	$scope.getPath = function(name){
		return "src/views/content/" + name + ".html"
	}
	$scope.getFolder = function(groupId){
		var data = { 
				groupId : groupId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		return Connection.create("navori/getFolder", data).then(
			function(data){
				$scope.folders = data.listFolder != "" ? data.listFolder.View_Folder : [];
				console.log(data);
			},
			function(error){
				errorService.manageError(error, $scope);
			});
	}

	$scope.select = function(folder){
		$scope.selected = folder;
	}

	$scope.getMedia = function(groupId){
		var data = { 
				groupId : groupId ,
				managerId: $scope.user.manager.Id,
				sessionId: $scope.user.sessionId
		}

		return Connection.create("navori/getMedia", data).then(
			function(data){
				$scope.media = data.listMedia != "" ? data.listMedia.View_Media : [];
				$scope.mediaTemplate = $scope.getMediaTemplate();
				$scope.imagenes = $scope.getMediaImages();
				$scope.videos = $scope.getMediaVideos();
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

	$scope.$on('PlayerChange', function(event, id) {
		$scope.getFolder(id);
		$scope.getMedia(id);
	});
});