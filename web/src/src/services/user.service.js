var password = 'password';
var aesPassword = aesEncryptedPassword(password);

console.log(aesPassword);
function encryptData(dataToEncrypt) {
  try {
    var salt = CryptoJS.enc.Utf8.parse("fCycS3qSKsUlNz7wCb39XckN");
    var key = CryptoJS.PBKDF2("6mSPrmyqIxwAGLczbinxMLHlZs/guKIVYBiCPNqq2ko=", salt, { keySize: 128 / 32, iterations: 1000 });
        
    var encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, { mode: CryptoJS.mode.CBC, iv: key, padding: CryptoJS.pad.Pkcs7 });
        
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  } catch (err) {
    console.log(err);
    return "";
  }
}

function aesEncryptedPassword(password) {
  return encryptData(password);
}

app.factory("userService", function ($rootScope, $cookies, Connection, $cookieStore) {
	

	var _login = function(data){
		return Connection.create("navori/login", 
				{
					userName : data.userName,
					password : aesEncryptedPassword(data.password)
				}
			);
	}

	var _loginFB = function(data){
		return Connection.create("user/loginFB",
			{
				facebookID : data.facebookID
			} );
	}

	var _loginGoogle = function(data){
		return Connection.create("user/loginGoogle",
			{
				googleID : data.googleID
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
				ownedParking : data.ownedParking,
				mail : data.mail,
				address : data.address,
				facebookID : data.facebookID
			} );
	}

	var _getLoggedUser = function(){
		$rootScope.user = undefined;
		if ($cookieStore.get("loggedUser") != undefined ){
			$rootScope.user = $cookieStore.get("loggedUser");

		}
	}

	var _sendNotifications = function(data){
		return Connection.create("user/sendNotifications",
			{
				title : data.title,
				message : data.message,
				parkingId : data.parkingId,
				maxDistance : data.maxDistance
			} );
	}

	return userService = {
		getLoggedUser 		: _getLoggedUser,
		createUser 			: _createUser,
		login 				: _login,
		loginFB 			: _loginFB,
		sendNotifications	: _sendNotifications
	}
});

