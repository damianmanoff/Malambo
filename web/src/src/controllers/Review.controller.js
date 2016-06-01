app.directive('review', function($compile) {
    return {
        restrict: 'A',
        scope: {
	      rev: "=" 
	    },
        link: function(scope, element, attr) {
        	// initialize with defaults
			//$("#rating").rating();
			 
			// with plugin options
			scope.$watch('rev', function(review, oldValue) {
                console.log("entra");
				$('#review' + review.id).rating(
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
                $('#review' + review.id).rating('update', review.userScore);
            }, true);

			//$('#rating').rating('update', scope.parking.rating);
			//$('#rating').rating('update', 4.2500415269);
			//console.log(scope.parking);
			//alert(scope.parking.rating);
        }
    };
});

app.controller('ReviewController', function($scope, $rootScope, $location, $cookieStore, userService, parkingService, $routeParams) {
	updateLeftasideBar($rootScope, $location, $cookieStore);

 	$scope.parkingId = $routeParams.parkingId;

 	$scope.score_cluster = ["No recomendable", "Muy poco recomendable", "Poco Recomendable", "Recomendable", "Muy Recomendable", "Ni lo dude"] 

 	$scope.getReviewImg = function(review){
 		if (review.user.photoUrl != undefined)  
 			return review.user.photoUrl  
 		return "src/css/img/user-icon.jpg";
 	}
  	
  	$scope.fullDescription = function (parkingId) {
        	$location.path("parking/" + parkingId);
        }
 	parkingService.getReviews($scope.parkingId).then(
 		function(data){
 			$scope.reviews = data.reviews;
 			angular.forEach($scope.reviews, function(value, key) {
			 	$scope.reviews[key].date = $scope.reviews[key].date != null ? new Date($scope.reviews[key].date) : "hace mucho" ;
			});
 			//$scope.park.reviews = data.reviews;
 		}, 
 		function(error){
 			errorService.manageError(error, $scope);
 		}
 	);

 	parkingService.getParking($scope.parkingId).then(
		function(parking){
			$scope.park = parking;
			$scope.park.image = parkingService.getParkingImage(parking);
			
		},
		function(error){
				errorService.manageError(error, $scope);
			}
	);
});
