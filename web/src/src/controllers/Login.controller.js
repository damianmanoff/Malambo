

app.controller('LoginController', function($scope, $rootScope, userService, parkingService, $location, errorService, Facebook, $cookieStore, $http, GooglePlus, Connection) {

    $rootScope.$broadcast('LoginScreenEvent');
    
    $scope.signIn = function() {
        userService.login($scope).then(
            function(data) {
                
                if (data.sessionId == "-1"){
                    return errorService.showError({title : "Login Error", msj : "Login data is incorrect"});                        
                }
                $location.path("dashboard")

                /*group = {
                    action : "GetMedia",
                    parameters : [
                        4,
                        data.manager.Id,
                        data.sessionId
                        ]
                }
                console.log
                Connection.create("navori", group ).then(function(groupData){console.log(groupData)});
*/
            },
            function(error) {
                errorService.manageError(error, $scope);
            }
        )
    }


});
