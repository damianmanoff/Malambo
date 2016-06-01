

app.controller('LoginController', function($scope, $rootScope, userService, parkingService, $location, errorService, Facebook, $cookieStore, $http, GooglePlus, Connection) {

    $scope.signIn = function() {
        userService.login($scope).then(
            function(data) {
                
                group = {
                    action : "GetMedia",
                    parameters : [
                        4,
                        data.manager.Id,
                        data.sessionId
                        ]
                }
                console.log
                Connection.create("navori", group ).then(function(groupData){console.log(groupData)});

            },
            function(error) {
                errorService.manageError(error, $scope);
            }
        )
    }


});
