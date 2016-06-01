app.directive('rating', function($compile) {
    return {
        restrict: 'A',
         scope: {
	      parking: "=" 
	    },
        link: function(scope, element, attr) {
        	// initialize with defaults
			//$("#rating").rating();
			 
			// with plugin options
			scope.$watch('parking', function(parking, oldValue) {
                
                $('#rating').rating('update', parking.rating);
            }, true);

			$("#rating").rating(
				{
					min:1, 
					max:5, 
					step:1, 
					showClear: false,
					displayOnly:true,
					showCaption: true,
					starCaptions : {
					    0: 'Sin calificar',
					    0.5: 'No ir',
					    1: ' Muy Malo',
					    1.5: ' Malo',
					    2: ' Regular',
					    2.5: 'Mitad de tabla',
					    3: ' Bueno',
					    3.5: 'Muy bueno',
					    4: ' Buenisimo',
					    4.5: 'Casi perfecto',
					    5: 'El mejor'
					}, 
					size:'lg'
				}
			);
			$('#rating').rating('update', scope.parking.rating);
			//$('#rating').rating('update', 4.2500415269);
			//console.log(scope.parking);
			//alert(scope.parking.rating);
        }
    };
});

app.controller('ParkingController', function($scope, $rootScope, $cookieStore, parkingService, $location, errorService, $routeParams, priceService, logEntryService, promotionService) {
	updateLeftasideBar($rootScope, $location, $cookieStore);

	$scope.profiles = ["Root", "Usuario", "Dueño de estacionamiento"];
	$scope.parking = {};
	$scope.promotions = {};
	$scope.dayVisit = 0;
	$scope.rating = 5;
	$scope.averagePrice = 30
	$scope.parkingId = $routeParams.parkingId;
	$scope.prices = { car: {}, pickup: {}, moto: {}, "bike" : {}}
	$scope.map = {
		center: {
		    latitude: -34.6180705, 
		    longitude: -58.36873409999998
		},
		zoom: 16,
		markers: [],
		control: {},
		options: {
		    scrollwheel: true
		}
	};

 	$scope.getParking = function(){
 		parkingService.getParking($scope.parkingId).then(
 			function(data){
 				$scope.parking = data;
 				$scope.map.markers.push( {
			            options: {
			                animation: 1,
			                labelAnchor: "28 -5",
			                labelClass: 'markerlabel'    
			            },
			            latitude: $scope.parking.latitude,
			            longitude: $scope.parking.longitude,
			            id: $scope.parking.id          
        		});
        		$scope.map.center = { latitude: $scope.parking.latitude,
			            longitude: $scope.parking.longitude}	
			   	
			   	priceService.translatePrice($scope);
			   	$scope.rating = data.rating;
				promotionService.getParkingPromo($scope.parkingId).then(
			   		function(promo){
			   			$scope.promotions = promo;
			   		},
			   		function(error){
		 				errorService.manageError(error, $scope);
		 			}
			   	);
			   	logEntryService.getVisits({
				    parkingId:  $scope.parkingId,
				    lastDays:   30
				}).then(
				    function(data) {
				       $scope.dayVisit = data;
				    },
				    function(error) {
				        errorService.manageError(error, $scope);
				    }
				);
 			},
 			function(error){
 				errorService.manageError(error, $scope);
 			}
 		);
 		console.log($scope.parking);
 	}
 	$scope.getParking();
 
});
