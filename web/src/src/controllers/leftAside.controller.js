app.controller('leftAsideController', function($scope, $rootScope, $cookieStore) {
    $scope.aside = { url: "src/views/aside.html" };
    $scope.visible = true;
    $scope.options = {};

	function showAdminOptions() {
		$scope.options = [
			{
				label: "Players",
				icon: "fa fa-map-marker",
				link: "players"
			},
			{
				label: "Content",
				icon: "fa fa-envelope",
				link: "content"
			},
			{
				label: "Playlists",
				icon: "fa fa-user",
				link: "playlist"
			},
			{
				label: "Planning",
				icon: "fa fa-car",
				link: "planning"
			}
		];
	}
	showAdminOptions();

});
