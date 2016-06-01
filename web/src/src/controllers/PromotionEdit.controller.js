app.controller('PromotionEditController', function($scope, $rootScope, $location, $cookieStore, promotionService) {
    updateLeftasideBar($rootScope, $location, $cookieStore);

    var COLS_NUMBER = 2;

    $scope.parking = $cookieStore.get('parking');
    $scope.editOn = [];
    $scope.showCreateButton = true;

    promotionService.getParkingPromo($scope.parking.id).then(
        function(data){
            promotionsToCols(data)
            addEmptyPromo();
        },
        function(error){}
    );

    $scope.edit = function(index) {
        $scope.editOn[index] = true;
        updateVisibilityCreateButton();
    }

    $scope.saveEdit = function(index) {
        $scope.editOn[index] = false;

        var promotion = getPromotionByIndex(index);
        if (promotion.id != null) {
            promotionService.update(promotion).then(
                function (data) {
                    updateVisibilityCreateButton();
                },
                function (error) {
                }
            );
        } else {
            promotionService.insert(promotion).then(
                function (data) {
                    promotion.id = data.id;

                    updateVisibilityCreateButton();
                },
                function (error) {
                }
            );
        }
    }

    $scope.delete = function(index) {
        var promotion = getPromotionByIndex(index);

        if (promotion.id != null) {
            promotionService.delete(promotion).then(
                function (data) {
                    deletePromotionFromList(promotion);
                },
                function (error) {
                }
            );
        } else {
            deletePromotionFromList(promotion);
        }
    }

    function deletePromotionFromList(promotion) {
        var promotions = colsToPromotions();
        var index = promotions.indexOf(promotion);
        promotions.splice(index, 1);
        promotions.splice(promotions.length - 1, 1);

        promotionsToCols(promotions);
        addEmptyPromo();

        updateVisibilityCreateButton();
    }

    $scope.addNewPromotion = function() {
        var lastCol = $scope.promotionsCols[$scope.promotionsCols.length -1];
        var index = $scope.promotionsCols.length*COLS_NUMBER + lastCol.length;
        lastCol[lastCol.length - 1] = {
            parkingId:  $scope.parking.id,
            description : "",
            title : "",
            address : "",
            link : "",
            active : 1,
            emptyPromo : false,
            index :index
        }

        $scope.editOn[index] = true;

        addEmptyPromo();

        updateVisibilityCreateButton();
    }

    function getPromotionByIndex(index) {
        for (var i = 0; i < $scope.promotionsCols.length; i++) {
            for (var j = 0; j < $scope.promotionsCols[i].length; j++) {
                var promotion =  $scope.promotionsCols[i][j];

                if (promotion.index == index) {
                    return promotion
                }
            }
        }
    }

    function addEmptyPromo() {
        var emptyPromo = {emptyPromo : true};
        if ($scope.promotionsCols.length - 1 >= 0) {
            var lastCol = $scope.promotionsCols[$scope.promotionsCols.length - 1];
            if (lastCol.length == 2) {
                var index = $scope.promotionsCols.length;
                $scope.promotionsCols[index] = [];
                $scope.promotionsCols[index].push(emptyPromo);
            } else {
                lastCol.push(emptyPromo);
            }
        } else {
            $scope.promotionsCols[0] = [];
            $scope.promotionsCols[0].push(emptyPromo);
        }
    }

    function colsToPromotions() {
        var promotions = [];

        for (var i = 0; i < $scope.promotionsCols.length; i++) {
            for (var j = 0; j < $scope.promotionsCols[i].length; j++) {
                promotions.push($scope.promotionsCols[i][j]);
            }
        }

        return promotions;
    }

    function promotionsToCols(promotions) {
        $scope.promotionsCols = [];
        for (var i = 0; i < promotions.length; i++) {
            promotions[i].index = i;
            promotions[i].emptyPromo = false;
            $scope.editOn[i] = false;
        }

        for (var i = 0; i < promotions.length; i += COLS_NUMBER) {
            $scope.promotionsCols.push(promotions.slice(i, i + COLS_NUMBER));
        }
    }

    function updateVisibilityCreateButton() {
        for (var i = 0; i < $scope.editOn.length; i++) {
            if ($scope.editOn[i] == true) {
                $scope.showCreateButton = false;
                return;
            }
        }

        $scope.showCreateButton = true;
    }
});