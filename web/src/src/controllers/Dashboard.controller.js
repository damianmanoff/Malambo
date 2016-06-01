app.controller('DashboardController', function($scope, $rootScope, userService, $cookieStore, $location) {

//	$scope.$on('$viewContentLoaded', function(){
		updateLeftasideBar($rootScope, $location, $cookieStore);

		var isParkingUser = $cookieStore.get('isParkingUser');
		var isAdminUser = $cookieStore.get('isAdminUser');
		if (isParkingUser != null && isParkingUser == true) {
			$location.path("/parking/" + $cookieStore.get("parking").id);
		} else if (isAdminUser != null && isAdminUser == true) {
			$location.path("/sendNotifications");
		} else {
			$location.path("/map");
		}
	//});
});
