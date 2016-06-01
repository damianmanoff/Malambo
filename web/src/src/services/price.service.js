app.factory("priceService", function ($rootScope, $cookies, Connection) {

    var _updatePrice = function(data){
        return Connection.update("price", data.id,
            {
                id : data.id,
                parkingId : data.parkingId,
                timeId : data.timeId,
                vehicleType : data.vehicleType,
                price : data.price
            });
    }


    function isCar(price){
        return price.vehicleType == 1;
    }

    function isVan(price){
        return price.vehicleType == 2;
    }

    function isMoto(price){
        return price.vehicleType == 3;
    }

    function isBike(price){
        return price.vehicleType == 4;
    }



    var _translatePrice = function($scope){
        $scope.prices["car"]["hour"]   = $scope.parking.prices.filter(isCar).filter(function(data){return data.timeId == 1})[0];
        $scope.prices["car"]["part"]    = $scope.parking.prices.filter(isCar).filter(function(data){return data.timeId == 2})[0];
        $scope.prices["car"]["midday"]  = $scope.parking.prices.filter(isCar).filter(function(data){return data.timeId == 3})[0];
        $scope.prices["car"]["day"]     = $scope.parking.prices.filter(isCar).filter(function(data){return data.timeId == 4})[0];
        $scope.prices["car"]["month"]   = $scope.parking.prices.filter(isCar).filter(function(data){return data.timeId == 5})[0];
        
        $scope.prices["pickup"]["hour"]     = $scope.parking.prices.filter(isVan).filter(function(data){return data.timeId == 1})[0];
        $scope.prices["pickup"]["part"]     = $scope.parking.prices.filter(isVan).filter(function(data){return data.timeId == 2})[0];
        $scope.prices["pickup"]["midday"]   = $scope.parking.prices.filter(isVan).filter(function(data){return data.timeId == 3})[0];
        $scope.prices["pickup"]["day"]  = $scope.parking.prices.filter(isVan).filter(function(data){return data.timeId == 4})[0];
        $scope.prices["pickup"]["month"]    = $scope.parking.prices.filter(isVan).filter(function(data){return data.timeId == 5})[0];
        

        $scope.prices["moto"]["hour"]   = $scope.parking.prices.filter(isMoto).filter(function(data){return data.timeId == 1})[0];
        $scope.prices["moto"]["part"]   = $scope.parking.prices.filter(isMoto).filter(function(data){return data.timeId == 2})[0];
        $scope.prices["moto"]["midday"]     = $scope.parking.prices.filter(isMoto).filter(function(data){return data.timeId == 3})[0];
        $scope.prices["moto"]["day"]    = $scope.parking.prices.filter(isMoto).filter(function(data){return data.timeId == 4})[0];
        $scope.prices["moto"]["month"]  = $scope.parking.prices.filter(isMoto).filter(function(data){return data.timeId == 5})[0];
        
        $scope.prices["bike"]["hour"]   = $scope.parking.prices.filter(isBike).filter(function(data){return data.timeId == 1})[0];
        $scope.prices["bike"]["part"]   = $scope.parking.prices.filter(isBike).filter(function(data){return data.timeId == 2})[0];
        $scope.prices["bike"]["midday"]     = $scope.parking.prices.filter(isBike).filter(function(data){return data.timeId == 3})[0];
        $scope.prices["bike"]["day"]    = $scope.parking.prices.filter(isBike).filter(function(data){return data.timeId == 4})[0];
        $scope.prices["bike"]["month"]  = $scope.parking.prices.filter(isBike).filter(function(data){return data.timeId == 5})[0];

        $scope.averagePrice =  ($scope.prices["car"]["hour"] != undefined) ? $scope.prices["car"]["hour"].price : "30.00";  
    }

    var _insertPrice = function(data){
        return Connection.create("price",
            {
                parkingId : data.parkingId,
                timeId : data.timeId,
                vehicleType : data.vehicleType,
                price : data.price
            } );
    }

    return priceService = {
        translatePrice     : _translatePrice,
        updatePrice 	: _updatePrice,
        insertPrice 		: _insertPrice
    }
});

