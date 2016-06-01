app.factory("promotionService", function ($rootScope, $cookies, Connection) {
    var _getParkingPromo = function(parkingId){
        return Connection.read("promotion/getParkingPromo", parkingId);
    }

    var _update = function(data){
        return Connection.update("promotion/update", data.id,
            {
                id : data.id,
                parkingId: data.parkingId,
                description : data.description,
                title : data.title,
                address : data.address,
                link : data.link,
                active : data.active
            });
    }

    var _insert = function(data){
        return Connection.create("promotion",
            {
                parkingId: data.parkingId,
                description : data.description,
                title : data.title,
                address : data.address,
                link : data.link,
                active : data.active
            });
    }

    var _delete = function(data){
        return Connection.delete("promotion/delete", data.id, {});
    }

    return promotionService = {
        getParkingPromo : _getParkingPromo,
        update          : _update,
        insert          : _insert,
        delete          : _delete
    }
});