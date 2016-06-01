app.controller('MainContentController', function($scope, $rootScope, userService) {
 	var classes = {
 		"default" : "skin-blue sidebar-mini",
 		"login" :  "login-page",
 		"content" : "content-wrapper"
 	}
 	$scope.body = {content : {}};

 	$scope.defaultConfig = function() {
	 	$scope.body.class = classes["default"];
	 	$scope.body.content.class = classes["content"];
	 	$scope.body.header = true;
	 	$scope.body.aside = true;

 	}

 	$scope.loginConfig = function() {
 		$scope.body.class = classes["login"];
 		$scope.body.content.class = "";
 		$scope.body.header = false;
 		$scope.body.aside = false;
	}

	$scope.$on('LeftBarEvent', function() {
		$scope.defaultConfig();
	});

	$scope.$on('LoginScreenEvent', function() {
		$scope.loginConfig();
	});

});
