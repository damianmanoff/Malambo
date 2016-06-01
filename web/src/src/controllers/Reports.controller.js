app.controller('ReportsController', function($scope, $rootScope, $location, $cookieStore, logEntryService, errorService ) {
    updateLeftasideBar($rootScope, $location, $cookieStore);

    var date = new Date();

    $scope.dateRange = {
        startDate: moment().subtract(30, "days"),
        endDate: moment()
    };
    $scope.maxDate = getDateStr(date);
    date.setMonth(date.getMonth() - 1);
    $scope.type = "favorite";
    $scope.parking = $cookieStore.get('parking');

    $scope.opts = {format: 'DD/MM/YYYY',
                maxDate: moment(),
                locale: {
                    applyLabel: 'Aplicar',
                    fromLabel: 'Desde',
                    toLabel: 'Hasta',
                    cancelLabel: 'Cancelar',
                    monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
                }};

    var titles = {
        "favorite" : "Agregados a favoritos",
        "parking_view" : "Visitas de la pagina del estacionamiento",
        "comment" : "Nuevos comentarios",
        "reach_parking" : "Usos del estacionamiento"
    }

    function getFormattedDate(dateStr) {
        var date = new Date(dateStr);
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!

        var yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        return mm+'/'+dd+'/'+yyyy;
    }

    function fixDate() {
        var from = new Date($scope.dateRange.startDate)
        var to = new Date($scope.dateRange.endDate)
        from = new Date(from.getYear() + 1900, from.getMonth(), from.getDate());   // 00:00:00
        to = new Date(to.getYear() + 1900, to.getMonth(), to.getDate());   // 00:00:00

        if (from.getTime() == to.getTime()) {
            $scope.dateRange.startDate = $scope.dateRange.startDate.subtract(1, "days");
        }
    }

    $scope.search = function () {
        fixDate();
        var from = $scope.from;
        var to = $scope.to;
        var request = {
            from        :   getFormattedDate($scope.from),
            to          :   getFormattedDate($scope.to),
            parkingId   :   $scope.parking.id,
            action      :   $scope.type
        }

        logEntryService.get(request).then(
            function(data) {
                showlogEntries(data, from, to);
            },
            function(error) {
                errorService.manageError(error, $scope);
            }
        )

    };

    function showlogEntries(logEntries, from, to) {
        var rows = [];
        var currentDate = new Date(from);
        currentDate = new Date(currentDate.getYear() + 1900, currentDate.getMonth(), currentDate.getDate());   // 00:00:00
        var nextDate = addDays(currentDate, 1);
        var toDate = new Date(to);
        toDate = new Date(toDate.getYear() + 1900, toDate.getMonth(), toDate.getDate());   // 00:00:00

        if (logEntries.length == 0 || logEntries[0].date >= nextDate) {
            rows.push({"c": [{"v": currentDate}, {"v": 0} ]});

            currentDate = addDays(currentDate,1);
            nextDate = addDays(nextDate,1);
        }

        var index = 0;
        while (currentDate <= toDate) {
            var logEntry = (index < logEntries.length) ? logEntries[index] : null;

            var quantity = 0;
            while (logEntry != null && logEntry.date >= currentDate && logEntry.date < nextDate) {
                if (logEntry.extra == "-") {
                    quantity--;
                } else {
                    quantity++;
                }
                index++;

                logEntry = (index < logEntries.length) ? logEntries[index] : null;
            }

            rows.push({"c": [{"v": currentDate}, {"v": quantity} ]});
            currentDate = addDays(currentDate,1);
            nextDate = addDays(nextDate,1);
        }

        $scope.showGraph("Fecha", "Usuarios", titles[$scope.type], rows);
    }

    function getDateStr(date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        return dd + '/' + mm + '/' + yyyy;
    }

    function getStrDate(dateStr) {
        return new Date(dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")) / 1000;
    }

    $scope.showGraph = function(XAxis, YAxis, title, rows) {
        $scope.chartObject = {
            "type": "AreaChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "xaxis",
                        "label": XAxis,
                        "type": "date",
                        "p": {}
                    },
                    {
                        "id": "yaxis",
                        "label": YAxis,
                        "type": "number",
                        "p": {}
                    }
                ],
                "rows": rows
            },
            "options": {
                "title": title,
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "gridlines": {
                        "count": 5
                    }
                }
            },
            "formatters": {}
        }
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    //$scope.search();
});