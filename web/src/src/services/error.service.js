app.factory("errorService", function ($rootScope, $cookies, Connection, SweetAlert) {
	
		
	var _login = function(data){
		return Connection.create("user/login", 
			{
				userName : data.userName,
				password : data.password
			} );
	}

	var _showError = function(error){
		
		SweetAlert.swal(error.title, error.msj, "error");
		
	}
	var globalError = function(){
		
		SweetAlert.swal("Ups", "Se ha producido un error inesperado", "error");
		
	}
	var invalidParameter = function(error, scope){
		SweetAlert.swal("Parámetro inválido " , error.parameter, "error");
	}

	var errors = {
		invalidParameter : invalidParameter,
		undefined : globalError
	}

	var _manageError = function(error, scope){
		if (error != undefined)
			return errors[error.error](error, scope)
		return errors["undefined"](error, scope)

	}
	var _getLoggedUser = function(){
		if ($cookies.userLogged == undefined)
			return undefined;
	}
	return userService = {
		manageError 	: _manageError,
		showError 	: _showError
	}
});

