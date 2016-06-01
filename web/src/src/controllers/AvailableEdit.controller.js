app.controller('AvailableEditController', function($scope, $rootScope, $location, $cookieStore, parkingService,errorService, $routeParams) {
 	updateLeftasideBar($rootScope, $location, $cookieStore);
 	$scope.parkingId = $routeParams.parkingId;
 	$scope.getParking = function(){
 		parkingService.getParking($scope.parkingId).then(
 			function(data){
 				$scope.parking = data;
 				
			   	$scope.rating = data.rating;
			
 			},
 			function(error){
 				errorService.manageError(error, $scope);
 			}
 		);
 		console.log($scope.parking);
 	}

 	$scope.saveEdit = function(){
 		parkingService.updateParking($scope.parkingId, $scope.parking).then(
 			function(){
 				//alert("todo ok");
 				$location.path("/parking/"+$scope.parkingId);
 			},
 			function(error){
 				errorService.manageError(error, $scope);
 			}
 		)
 	}
 	$scope.getParking();
});
