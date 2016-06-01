app.factory("Connection", function ($http, $rootScope, $cookies, $q){

    var serverUrl = "http://localhost:8000"
    //var serverUrl = "http://tomcat-mqm.rhcloud.com/estacionando_war"
	/* ----------------- */

    var _get = function(url) {

        var deferred = $q.defer();

        var request = $http({
            method: "GET",
            url: serverUrl + '/' + url,
            async:false,
            crossDomain:true,
            dataType:"json",
        }).success(function(response) {
            deferred.resolve(response); 
            
        }).error(function(response){
            deferred.reject(response);
        });;

        return deferred.promise;

    }
	var _read = function(resourceName, resourceId) {

        var url = serverUrl + '/' + resourceName + '/' + resourceId;
        var deferred = $q.defer();

        var request = $http({
            method: "GET",
            url: url,
            async:false,
            crossDomain:true,
            dataType:"json",
        }).success(function(response) {
            deferred.resolve(response); 
            
        }).error(function(response){
            deferred.reject(response);
        });;

        return deferred.promise;

    }

    var _search = function(resourceName, filters, orderBy, pageSize, pageNumber) {

        filters = filters != undefined ? filters : "";
		var url = serverUrl + '/' + resourceName + "?"+ filters ;
		var deferred = $q.defer();

		var request = $http({
            method: "GET",
            url: url,
            async:false,
            crossDomain:true,
            dataType:"json",
         }).success(function(response) {
            deferred.resolve(response); 
            
        }).error(function(response){
            deferred.reject(response);
        });;

        return deferred.promise;

	}

    /* ----------------- */

    var _delete = function(resourceName, resourceId, parameters) {

        var url = serverUrl + '/' + resourceName + '/' + resourceId;
        var deferred = $q.defer();

        var request = $http({
            method: "DELETE",
            contentType: 'application/json',
            url: url,
            data: parameters,
            async:false,
            crossDomain:true,
            //dataType:"json",
         }).success(function(response) {
            deferred.resolve(response); 
            
        }).error(function(response){
            deferred.reject(response);
        });;

        return deferred.promise;

    }

	/* ----------------- */

    var _update = function(resourceName, resourceId, parameters) {

        var url = serverUrl + '/' + resourceName + '/' + resourceId;
        var deferred = $q.defer();

        var request = $http({
            method: "PUT",
            contentType: 'application/json',
            url: url,
            data: parameters,
            async:false,
            crossDomain:true
        }).success(function(response) {
            deferred.resolve(response);

        }).error(function(response){
            deferred.reject(response);
        });;

        return deferred.promise;
    }

	/* ----------------- */

	var _create = function(resourceName, p) {

		var url = serverUrl + '/' + resourceName + "/";
        var deferred = $q.defer();
		var request = $http({
            method: "POST",
            contentType: 'application/json',
            url: url,
            data: p,
            async:false,
            crossDomain:true,
        }).success(function(response) {
            deferred.resolve(response); 
            
        }).error(function(response){
        	deferred.reject(response);
        });;

        return deferred.promise;
	}

    /* ----------------- */

    return api_service = {
        read : _read,
        search : _search,
        delete : _delete,
        update : _update,
        get : _get,
        create : _create
    }

});
