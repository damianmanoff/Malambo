app.controller('SendNotificationController', function($scope, $rootScope, $cookieStore, $location, userService, errorService, SweetAlert) {
	updateLeftasideBar($rootScope, $location, $cookieStore);

	$scope.title = "";
	$scope.message = "";
	$scope.parkingId = "";
	$scope.maxDistance = "";

	$scope.send = function() {
		var sendData = {
			title		:	$scope.title,
			message		:	$scope.message,
			parkingId	:	$scope.parkingId,
			maxDistance	:	$scope.maxDistance
		};

		userService.sendNotifications(sendData).then(
			function (data) {
				$scope.title = "";
				$scope.message = "";
				$scope.parkingId = "";
				$scope.maxDistance = "";
				SweetAlert.swal("Notificaciones enviadas." , "Las notificaciones fueron correctamente enviadas a clientes cercanos", "success");
			},
			function (error) {
				errorService.manageError(error, $scope);
			}
		);
	}
});
