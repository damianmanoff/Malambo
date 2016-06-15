

app.controller('LoginController', function($scope, $rootScope, userService, parkingService, $location, errorService, Facebook, $cookieStore, $http, GooglePlus, Connection) {

    $rootScope.$broadcast('LoginScreenEvent');
    
    $scope.signIn = function() {
        userService.login($scope.userName, $scope.password).then(
            function(data) {
                
                if (data.sessionId == "-1" || data.sessionId == "0"){
                    return errorService.showError({title : "Login Error", msj : "Login data is incorrect"});                        
                }
                $cookieStore.put("navoriUser",data);
                console.log($cookieStore);
                $location.path("players")

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
