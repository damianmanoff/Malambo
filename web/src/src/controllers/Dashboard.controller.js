app.controller('DashboardController', function($scope, $rootScope, userService, $cookieStore, $location) {

	updateLeftasideBar($rootScope, $location, $cookieStore);
});
