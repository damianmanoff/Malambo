app.controller('navbarController', function($scope, $rootScope, Facebook, $cookieStore, $location, userService, GooglePlus) {
    $scope.navbar = { url: "src/views/navbar.html" };
    
    $scope.init = function() {
        userService.getLoggedUser();
    }

    $scope.$on('userLoginEvent', function() {
        userService.getLoggedUser();
    });

    $scope.signOut = function() {
        $cookieStore.remove("loggedUser");

        if ($cookieStore.get('fbId') != null) {
            Facebook.logout(function (response) {
                $cookieStore.remove('fbId');
                $cookieStore.remove('fbAccessToken');

                $location.path("/");
            });
        } else if ($cookieStore.get('googleID') != null) {

            GooglePlus.logout()
            $cookieStore.remove('googleID');
            $cookieStore.remove('googleName');
            $cookieStore.remove('googleImage');
            $location.path("/");
        } else {
            $location.path("/");
        }
    }
});
