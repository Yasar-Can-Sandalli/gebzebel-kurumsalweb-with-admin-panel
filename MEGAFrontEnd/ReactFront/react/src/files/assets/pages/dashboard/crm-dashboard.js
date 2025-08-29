'use strict';

$(document).ready(function() {
    // task and revenue start
    var chart = AmCharts.makeChart("revenue-map", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat": "YYYY-MM-DD",
        "precision": 2,
        "valueAxes": [{
            "id": "v1",
            "title": "Sales",
            "position": "left",
            "autoGridCount": false,
            "labelFunction": function(value) {
                return "$" + Math.round(value) + "M";
            }
        }, {
            "id": "v2",
            "title": "Revenue Market",
            "gridAlpha": 0,
            "autoGridCount": false
        }],
        "graphs": [{
            "id": "g1",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#448aff",
            "type": "smoothedLine",
            "title": "Market Days",
            "useLineColorForBulletBorder": true,
            "valueField": "market1",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }, {
            "id": "g2",
            "valueAxis": "v2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#536dfe",
            "type": "smoothedLine",
            "title": "Market Days ALL",
            "useLineColorForBulletBorder": true,
            "valueField": "market2",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }],
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "valueLineAlpha": 0.2
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "legend": {
            "useGraphSettings": true,
            "position": "top"
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "export": {
            "enabled": true
        },
        "dataProvider": [{
            "date": "2013-01-16",
            "market1": 85,
            "market2": 75
        }, {
            "date": "2013-01-17",
            "market1": 74,
            "market2": 80
        }, {
            "date": "2013-01-18",
            "market1": 78,
            "market2": 88
        }, {
            "date": "2013-01-19",
            "market1": 85,
            "market2": 75
        }, {
            "date": "2013-01-20",
            "market1": 82,
            "market2": 89
        }, {
            "date": "2013-01-21",
            "market1": 83,
            "market2": 78
        }, {
            "date": "2013-01-22",
            "market1": 72,
            "market2": 92
        }, {
            "date": "2013-01-23",
            "market1": 85,
            "market2": 76
        }]
    });
    // task and revenue end

    /*markers map*/
    var map;
    map = new GMaps({
        el: '#markers-map',
        lat: 21.2334329,
        lng: 72.866472,
        scrollwheel: false
    });

    map.addMarker({
        lat: 21.2334329,
        lng: 72.866472,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content: '<p><Phoenicoded></Phoenicoded> <br/> Buy Now at <a href="">Themeforest</a></p>'
        }
    });
    // income start
    var ctx = document.getElementById('tot-lead').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: valincomearrow('#536dfe', [30, 15, 25, 35, 30, 20, 15, 20, 25,40, 25, 30, 22, 31], '#536dfe'),
        options: valincomebuildoption(),
    });
    var ctx = document.getElementById('tot-vendor').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: valincomearrow('#11c15b', [40, 25, 30, 22,30, 15, 25, 35, 30, 20, 15, 20, 25, 31], '#11c15b'),
        options: valincomebuildoption(),
    });
    var ctx = document.getElementById('invoice-gen').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: valincomearrow('#448aff', [25, 30,20, 15, 20, 25, 31, 22,30, 15, 25, 35, 30,40], '#448aff'),
        options: valincomebuildoption(),
    });
    function valincomearrow(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 3,
                hitRadius: 30,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: a,
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                lineTension:0,
                backgroundColor: Chart.helpers.color(f).alpha(.7).rgbString(),
                data: b,
            }]
        };
    }
    function valincomebuildoption() {
        return {
            title: {
                display: false,
            },
            tooltips: {
                intersect: false,
                mode: 'nearest',
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            legend: {
                display: false
            },
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: false,
                    gridLines: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        min: 1,
                        max: 50
                    }
                }]
            },
            elements: {
                point: {
                    radius: 4,
                    borderWidth: 12
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
    }
    // income end
});
