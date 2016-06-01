app.controller('PaymentController', function($scope, $rootScope, $cookieStore, $location, paymentService) {
    updateLeftasideBar($rootScope, $location, $cookieStore);

    $scope.loggedUser = $cookieStore.get('loggedUser');

    paymentService.getUserPayments($scope.loggedUser).then(
        function(data){
            $scope.payments = data;
        },
        function(error){}
    );
});
