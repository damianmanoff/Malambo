
app.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude, image) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        if (image != undefined)
        	marker.options.icon = image;
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback, image) {
        var marker = create(latitude, longitude, image);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                SweetAlert.swal("Dirección desconocida" , "No fue posible localizar "+ address, "error");
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
             SweetAlert.swal("Dirección desconocida" , "No fue posible encontrar su locación", "error");
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});

app.controller('MapController', function($scope, $rootScope, $location, $cookieStore, MarkerCreatorService, parkingService, errorService) {
        updateLeftasideBar($rootScope, $location, $cookieStore);

 		MarkerCreatorService.createByCoords(-34.6180705, -58.36873409999998, function (marker) {
            marker.options.labelContent = 'Usted';
            $scope.autentiaMarker = marker;
        });
        
        $scope.address = '';
        $scope.parkDesc = true;
        $scope.park = {
            id : -1,
        	name : "Ningún estacionamiento seleccionado",
        	address : "Seleccione un estacionamiento del mapa",
        	image : "src/css/img/estacionamiento.png"
        }
        $scope.map = {
            center: {
                latitude: $scope.autentiaMarker.latitude,
                longitude: $scope.autentiaMarker.longitude
            },
            zoom: 16,
            markers: [],
            control: {},
            options: {
                scrollwheel: true
            }
        };

        $scope.map.markers.push($scope.autentiaMarker);

        $scope.searchAddress = function () {
            $scope.address += ($scope.city != undefined) ?  ("," + $scope.city ): "";
            MarkerCreatorService.createByAddress($scope.address, function (marker) {
                
                //console.log(marker);
                var position = {coords : {}}
                position.coords = marker;
                $scope.updateUserPosition(position);
            });
        }

        $scope.fullDescription = function (parkingId) {
        	$location.path("parking/" + parkingId);
        }

        $scope.foundMyLocation = function () {
            navigator.geolocation.getCurrentPosition($scope.updateUserPosition);
        }

        $scope.showDescription = function (parkingId) {
        	parkingService.getParking(parkingId).then(
        		function(parking){
        			$scope.park = parking;
                    $rootScope.parkingId = parking.parkingId;
        			$scope.park.image = parkingService.getParkingImage(parking);
        				
        		},
        		function(error){
	 				errorService.manageError(error, $scope);
	 			}
        	)
        }

        $scope.showParkings = function(parkings){
            angular.forEach(parkings,function(parking){
                MarkerCreatorService.createByCoords(parking.latitude, parking.longitude, function (marker) {
                    marker.options.animation = 0;
                    marker.id = (parking.id + 1);
                    console.log(marker.id);
                    marker.onClick = function(){
                      $scope.showDescription((marker.id - 1));
                      //onMarkerClicked(marker.id);
                    };
                    $scope.map.markers.push(marker);
                },"src/css/img/estacionamiento.png");
            });
        }

        $scope.getParkings = function () {
        /*    if ($rootScope.allParkings != undefined){
                return $scope.showParkings($rootScope.allParkings);
                 
            }*/
            $rootScope.$broadcast("requesting");
            parkingService.getParkings("status=1").then(
                function(parkings){
                    //$location.path("/login");
                    $rootScope.allParkings = parkings;
                    $rootScope.$broadcast("answer");
                    $scope.showParkings($rootScope.allParkings);
	 			},
	 			function(error){
	 				errorService.manageError(error, $scope);
	 			})
        }

        $scope.addCurrentLocation = function () {
            MarkerCreatorService.createByCurrentLocation(function (marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };
        
        $scope.updateUserPosition = function(position){
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
            $scope.autentiaMarker.latitude  = position.coords.latitude;
            $scope.autentiaMarker.longitude = position.coords.longitude;
            refresh({latitude : position.coords.latitude, longitude: position.coords.longitude});
        }

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }
        $scope.getParkings();
       

});
