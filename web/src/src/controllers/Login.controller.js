

app.controller('LoginController', function($scope, $rootScope, userService, parkingService, $location, errorService, Facebook, $cookieStore, $http, GooglePlus, Connection) {

    $rootScope.$broadcast('LoginScreenEvent');
    
    $scope.signIn = function() {
        userService.login($scope.userName, $scope.password).then(
            function(data) {
                
                if (data.sessionId == "-1" || data.sessionId == "0"){
                    return errorService.showError({title : "Login Error", msj : "Login data is incorrect"});                        
                }
                $cookieStore.put("navoriUser",data);
                $location.path("players")
            },
            function(error) {
                errorService.manageError(error, $scope);
            }
        )
    }


});
