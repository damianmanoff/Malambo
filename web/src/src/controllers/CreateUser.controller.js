app.controller('CreateUserController', function($scope, $rootScope, userService, parkingService, $location, errorService, Facebook, $cookieStore, $http, SweetAlert, $routeParams) {
    updateLeftasideBar($rootScope, $location, $cookieStore);
    
    $scope.profiles = [ { name: "Root", value: "2"}, {name : "Usuario", value: "0"}, { name : "Dueño de estacionamiento", value : "1"}];
    $scope.parkingId = parseInt($routeParams.parkingId) != NaN ? parseInt($routeParams.parkingId) : undefined;
    if ($scope.parkingId != undefined)
        $scope.profileId = 1;
    
    $scope.createNewUser = function() {

        userService.createUser($scope).then(
            function(data) {
                $location.path("/dashboard");
            },
            function(error) {
                errorService.manageError(error, $scope);
            }
        );
    }
    $scope.createUser = function() {
        if ($scope.parkingId != undefined){

            parkingService.getParking($scope.parkingId).then(
                function (data){
                    $scope.ownedParking = data;
                    $scope.createNewUser();
                },
                function (){
                    
                    SweetAlert.swal("Error en Estacionamiento" , "No existe el id de estacionamiento ingresado ", "error");
                }
            )
        }else{
            $scope.createNewUser();
        }
    }

   
});
