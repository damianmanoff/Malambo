app.controller('leftAsideController', function($scope, $rootScope, $cookieStore) {
    $scope.aside = { url: "src/views/aside.html" };
    $scope.visible = true;
    $scope.options = {};

	function showUserOptions() {
		$scope.options = [
			{
				label: "Ver Estacionamientos",
				icon: "fa fa-map-marker",
				link: "map"
			}
		];
	}

	function showParkingOptions() {
		var parkingId = $cookieStore.get("parking").id;

		$scope.options = [
			{
				label: "Ver Estacionamientos",
				icon: "fa fa-map-marker",
				link: "map"
			},
			{
				label: "Ver Estacionamiento",
				icon: "fa fa-map-marker",
				link: "parking/" + parkingId
			},
			{
				label: "Administrar Precios",
				icon: "fa fa-money",
				link: "priceEdit"
			},
			{
				label: "Administrar Promociones",
				icon: "fa fa-gift",
				link: "promotionEdit"
			},
			{
				label: "Reportes",
				icon: "fa fa-file-text-o",
				link: "reports"
			},{
				label: "Editar disponibilidad",
				icon: "fa fa-file-text-o",
				link: "availableEdit/" + parkingId
			},
			{
				label: "Pagos",
				icon: "fa fa-money",
				link: "payments"
			}
		];
	}

	function showAdminOptions() {
		$scope.options = [
			{
				label: "Ver Estacionamientos",
				icon: "fa fa-map-marker",
				link: "map"
			},
			{
				label: "Enviar notificaciones",
				icon: "fa fa-envelope",
				link: "sendNotifications"
			},
			{
				label: "Crear Usuario",
				icon: "fa fa-user",
				link: "createUser"
			},
			{
				label: "Habilitar Est.",
				icon: "fa fa-car",
				link: "enableParking/enable"
			},
			{
				label: "Deshabilitar Est.",
				icon: "fa fa-car",
				link: "enableParking/disable"
			},
			{
				label: "Verificar Est.",
				icon: "fa fa-car",
				link: "enableParking/reenable"
			}
		];
	}

	$scope.$on('userLoginEvent', function() {
		showUserOptions();
	});

	$scope.$on('parkingLoginEvent', function() {
		showParkingOptions();
	});

	$scope.$on('adminLoginEvent', function() {
		showAdminOptions();
	});

});
