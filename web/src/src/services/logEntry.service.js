app.factory("logEntryService", function ($rootScope, $cookies, Connection) {

    var _send = function(data){
        return Connection.create("logEntry",
            {
                id: data.id,
                action: data.action,
                parkingId: data.parkingId,
                extra: data.extra,
                user: data.user,
                date: data.date
            } );
    }

    var _get = function(data){
        return Connection.get("logEntry/query" +
            "?from=" + data.from +
            "&to=" + data.to +
            "&action=" + data.action +
            "&parkingId=" + data.parkingId);
    }

    var _getVisits = function(data){
        return Connection.get("logEntry/getVisits" +
            "?parkingId=" + data.parkingId +
            "&lastDays=" + data.lastDays );
    }

    return logEntryService = {
        send    : _send,
        get 	: _get,
        getVisits 	: _getVisits
    }

});
