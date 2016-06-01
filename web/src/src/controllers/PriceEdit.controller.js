app.controller('PriceEditController', function($scope, $rootScope, $location, $cookieStore, priceService, errorService) {
    updateLeftasideBar($rootScope, $location, $cookieStore);

    $scope.vehicleTypes = [-1, 1, 2, 3, 4];
    $scope.timeTypes = [-1, 1, 2, 3, 4, 5];

    $scope.vehicleNames = ['', 'Auto', 'Moto', 'Camioneta', 'Bici'];
    $scope.timeNames = ['', 'Hora', '15\'', '12 Horas', '24 Horas', 'Mensual'];

    $scope.parking = $cookieStore.get('parking');
    $scope.prices = $scope.parking.prices;
    $scope.pricesDict = {};

    $scope.editOn = false;

    for (var i = 1; i < $scope.vehicleTypes.length; i++) {
        for (var j = 1; j < $scope.timeNames.length; j++) {
            var emptyPrice = {
                "id" : null,
                "parkingId" : $cookieStore.get('parking').id,
                "price" : "",
                "newPrice" : ""
            }

            emptyPrice.vehicleType = $scope.vehicleTypes[i];
            emptyPrice.timeId = $scope.timeTypes[j];

            if (!$scope.pricesDict[emptyPrice.timeId]) {
                $scope.pricesDict[emptyPrice.timeId] = {};
            }

            $scope.pricesDict[emptyPrice.timeId][emptyPrice.vehicleType] = emptyPrice;
        }
    }

    for (var i = 0; i < $scope.prices.length; i++) {
        var currentPrice = $scope.prices[i];
        currentPrice.newPrice = currentPrice.price;

        $scope.pricesDict[currentPrice.timeId][currentPrice.vehicleType] = currentPrice;
    }

    $scope.edit = function() {
        $scope.editOn = true;
    }

    $scope.saveEdit = function() {
        $scope.editOn = false;

        var pricesList = [];
        for (var i = 1; i < $scope.vehicleTypes.length; i++) {
            for (var j = 1; j < $scope.timeNames.length; j++) {
                var timeType = $scope.timeTypes[j];
                var vehicleType = $scope.vehicleTypes[i];

                var currentPrice = $scope.pricesDict[timeType][vehicleType];

                if (currentPrice.price != currentPrice.newPrice) {
                    currentPrice.price = currentPrice.newPrice;
                    savePriceValue(currentPrice);

                    if (currentPrice.newPrice == null || currentPrice.newPrice == "0") {
                        currentPrice.price = "";
                    }
                }

                if (currentPrice.price != "") {
                    pricesList.push(currentPrice);
                }
            }
        }

        $scope.parking.prices = pricesList;
        $cookieStore.put('parking', $scope.parking);
    }

    function savePriceValue(price) {
        if (price.id != null) {
            priceService.updatePrice(price).then(
                function (data) {
                    price.id = data.id;
                },
                function (error) {
                    errorService.manageError(error, $scope);
                }
            );
        } else {
            priceService.insertPrice(price).then(
                function (data) {
                    price.id = data.id;
                },
                function (error) {
                    errorService.manageError(error, $scope);
                }
            );
        }
    }
});