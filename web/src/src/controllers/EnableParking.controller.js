app.controller('EnableParkingController', function($scope, $rootScope, $location, $cookieStore, parkingService,errorService, $routeParams, DTOptionsBuilder, DTColumnDefBuilder) {
 	updateLeftasideBar($rootScope, $location, $cookieStore);
 	$scope.action = $routeParams.action;
 	$scope.translateStatus = { "0" : "Desactivado", "1" : "Habilitado", "2" : "Deshabilitado"}
 	$scope.filter = { "enable" : "status=0", "disable" : "status=1", "reenable" : "status=2"}
	$scope.marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: -34.6180705,
            longitude: -58.36873409999998,
            id: 1          
       };
	$scope.map = {
		center: {
		    latitude: -34.6180705, 
		    longitude: -58.36873409999998
		},
		zoom: 16,
		markers: [$scope.marker],
		control: {},
		options: {
		    scrollwheel: true
		}
	};
	$scope.dtOptions = DTOptionsBuilder.newOptions().withLanguage({
       sUrl:'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/xxxx.json'
      }).withPaginationType('full_numbers').withDisplayLength(6);
    
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5)
    ];

	$scope.viewInMap = function (latitude, longitude) {
		$scope.map.center = { latitude: latitude,
			            longitude: longitude};
		$scope.marker.latitude = latitude;
		$scope.marker.longitude = longitude;
	}


	 $scope.getParkings = function () {
           
            $rootScope.$broadcast("requesting", "Buscando Estacionam");
            parkingService.getParkings($scope.filter[$scope.action]).then(
                function(parkings){
                    //$location.path("/login");
                    $rootScope.allParkings = parkings;
                    $scope.parkings = parkings;
                    $rootScope.$broadcast("answer");
                  //  $scope.showParkings($rootScope.allParkings);
	 			},
	 			function(error){
	 				errorService.manageError(error, $scope);
	 			})
        }

	
	$scope.createOwner = function(id){
		$location.path("/createUser/"+id);
	}

	$scope.enable = function(id, index){
		var data = {status : 1};
		parkingService.updateParking(id, data).then(
 			function(){
 				$scope.parkings[index].status = 1;
 				//$location.path("/parking/"+$scope.parkingId);
 			},
 			function(error){
 				errorService.manageError(error, $scope);
 			}
 		)
	}
	$scope.disable = function(id, index){
		var data = {status : 2};
		parkingService.updateParking(id, data).then(
 			function(){
 				$scope.parkings[index].status = 2;
 				//$location.path("/parking/"+$scope.parkingId);
 			},
 			function(error){
 				errorService.manageError(error, $scope);
 			}
 		)
	}
	$scope.getParkings();
});
