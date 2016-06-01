app.controller('PromotionController', function($scope, $rootScope, $cookieStore, $location, userService, $routeParams, promotionService) {
    updateLeftasideBar($rootScope, $location, $cookieStore);

    var COLS_NUMBER = 2;

    promotionService.getParkingPromo($routeParams.parkingId).then(
        function(data){
            $scope.promotionsCols = [];

            for (var i = 0; i < data.length; i += COLS_NUMBER) {
                $scope.promotionsCols.push(data.slice(i, i + COLS_NUMBER));
            }
        },
        function(error){}
    );
});
