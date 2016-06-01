app.factory("parkingService", function ($rootScope, $cookies, Connection) {
	

	var _login = function(data){
		return Connection.create("user/login", 
			{
				userName : data.userName,
				password : data.password
			} );
	}

	var _createUser = function(data){
		return Connection.create("user", 
			{
				name : data.name,
				userName : data.userName,
				lastName : data.lastName,
				password : data.password,
				profileId : data.profileId,
				address : data.address
			} );
	}
	var _getParkingImage = function(parking){
		if (parking.image != null && parking.image != "")
			return parking.image;+ "&key=AIzaSyCLKn7gCMLXs6pnTrOZVUSjW-pIjqa0q58";
		var url = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location="+ parking.latitude + "," + parking.longitude + "&key=AIzaSyCLKn7gCMLXs6pnTrOZVUSjW-pIjqa0q58"
		return url;
	}

	var _getParking = function(parkingId){
		return Connection.read("parking", parkingId);
	}

	var _getReviews = function(parkingId){
		return Connection.read("review/parking", parkingId);
	}

	var _getParkings = function(parameters){
		return Connection.search("parking/lightQuery", parameters);
	}
	var _updateParking = function(parkingId, parking){
		return Connection.update("parking/update", parkingId, parking);
	}

	return userService = {
		getParkings 	: _getParkings,
		getParking 		: _getParking,
		getParkingImage : _getParkingImage,
		getReviews 		: _getReviews,
		updateParking 	: _updateParking,
		login 			: _login
	}
});

