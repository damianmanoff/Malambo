var app = angular.module('estacionando', ['ngRoute', "ngCookies", 'uiGmapgoogle-maps', 'datatables' ,'facebook', 'googlechart', 'daterangepicker', 'googleplus', 'oitozero.ngSweetAlert']);

app.config(['GooglePlusProvider', function(GooglePlusProvider) {
     
}]);

app.config(function($routeProvider, $locationProvider, FacebookProvider, GooglePlusProvider) {
    FacebookProvider.init('219309365116364');     // For Testing
   // FacebookProvider.init('184077838639517');
  //  FacebookProvider.init('206764063043348'); //Damian
    GooglePlusProvider.init({
        //clientId: '469648329984-lue2u2oeak93e575s8t82j8dn42hrk73.apps.googleusercontent.com',
        //apiKey: 'OWNiVy_xx7pisYiRDKKkuW7R'
        clientId: '1067784488109-me2pa1oqecg22uc9suteu72i5eppt8l3.apps.googleusercontent.com',
        apiKey: 'g_nFuv8aAN67poUxiWfG1VE8'
     });

	$routeProvider
        .when('/', {
            templateUrl: "src/views/login.html", 
            controller: 'LoginController',
            reloadOnSearch: false
        })
        .when('/createUser/:parkingId', {
            templateUrl: "src/views/createUser.html", 
            controller: 'CreateUserController',
            reloadOnSearch: false
        })
        .when('/createUser', {
            templateUrl: "src/views/createUser.html", 
            controller: 'CreateUserController',
            reloadOnSearch: false
        })
        .when('/map', {
            templateUrl: "src/views/map.html", 
            controller: 'MapController',
            reloadOnSearch: false
        }) 
        .when('/parking/:parkingId', {
            templateUrl: "src/views/parking.html", 
            controller: 'ParkingController',
            reloadOnSearch: false
        })
        .when('/dashboard', {
            templateUrl: "src/views/dashboard.html",
            controller: 'DashboardController',
            reloadOnSearch: false
        })
        .when('/promotions/:parkingId', {
            templateUrl: "src/views/promotion.html", 
            controller: 'PromotionController',
            reloadOnSearch: false
        })
        .when('/review/:parkingId', {
            templateUrl: "src/views/review.html", 
            controller: 'ReviewController',
            reloadOnSearch: false
        })
        .when('/priceEdit', {
            templateUrl: "src/views/priceEdit.html",
            controller: 'PriceEditController',
            reloadOnSearch: false
        }) 
        .when('/availableEdit/:parkingId', {
            templateUrl: "src/views/availableEdit.html",
            controller: 'AvailableEditController',
            reloadOnSearch: false
        })
        .when('/promotionEdit', {
            templateUrl: "src/views/promotionEdit.html",
            controller: 'PromotionEditController',
            reloadOnSearch: false
        })
        .when('/reports', {
            templateUrl: "src/views/reports.html",
            controller: 'ReportsController',
            reloadOnSearch: false
        })
        .when('/payments', {
            templateUrl: "src/views/payments.html",
            controller: 'PaymentController',
            reloadOnSearch: false
        })
        .when('/sendNotifications', {
            templateUrl: "src/views/sendNotifications.html",
            controller: 'SendNotificationController',
            reloadOnSearch: false
        })
        .when('/enableParking/:action', {
            templateUrl: "src/views/enableParking.html",
            controller: 'EnableParkingController',
            reloadOnSearch: false
        });
});

function updateLeftasideBar($rootScope, $location, $cookieStore) {
    var loggedUser = $cookieStore.get("loggedUser");
    var isParkingUser = $cookieStore.get('isParkingUser');
    var isAdminUser = $cookieStore.get('isAdminUser');

    console.log(loggedUser);
    if (loggedUser == null) {
        $location.path("/");
    }

    $rootScope.$broadcast('LeftBarEvent');
    if (isParkingUser != null && isParkingUser == true) {
        $rootScope.$broadcast('parkingLoginEvent');
    } else if (isAdminUser != null && isAdminUser == true) {
        $rootScope.$broadcast('adminLoginEvent');
    } else {
        $rootScope.$broadcast('userLoginEvent');
    }
}