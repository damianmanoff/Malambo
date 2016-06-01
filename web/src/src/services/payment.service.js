app.factory("paymentService", function ($rootScope, $cookies, Connection) {

    var _getUserPayments = function(data){
        return Connection.get("payment/getUserPayments/" + data.id + "/");
    }

    return paymentService = {
        getUserPayments     : _getUserPayments
    }
});

