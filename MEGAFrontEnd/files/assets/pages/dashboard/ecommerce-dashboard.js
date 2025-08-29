'use strict';
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    // sale report start
    var ctx = document.getElementById('sale-report-1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: salereportchart('#448aff', [25, 30, 15, 20, 25, 30, 15, 1], '#448aff'),
        options: salereportbuildoption(),
    });
    var ctx = document.getElementById('sale-report-2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: salereportchart('#11c15b', [15, 20, 25,10, 12, 30, 15, 1], '#11c15b'),
        options: salereportbuildoption(),
    });
    var ctx = document.getElementById('sale-report-3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: salereportchart('#536dfe', [15, 20, 25,10, 30, 15, 25, 1], '#536dfe'),
        options: salereportbuildoption(),
    });
    var ctx = document.getElementById('sale-report-4').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: salereportchart('#ff5252', [30, 15, 25, 35, 30, 20, 15, 1], '#ff5252'),
        options: salereportbuildoption(),
    });
    function salereportchart(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1","2","3","4","5","6","7","8"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 30,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                // pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: a,
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                lineTension: 0,
                backgroundColor: f,
                data: b,
            }]
        };
    }
    function salereportbuildoption() {
        return {
            title: {
                display: !1
            },
            tooltips: {
                position: 'nearest',
                mode: 'index',
                intersect: false,
                yPadding: 10,
                xPadding: 10,
            },
            legend: {
                display: !1,
                labels: {
                    usePointStyle: !1
                }
            },
            responsive: !0,
            maintainAspectRatio: !0,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
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
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            }
        };
    }
    // sale report end

    // pageview and prod sale start
    var chart = AmCharts.makeChart("product-sales-chart", {
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
            "gridAlpha": 0.1,
            "autoGridCount": false
        }],
        "graphs": [{
            "id": "g1",
            "valueAxis": "v2",
            "lineThickness": 0,
            "fillAlphas": 0.9,
            "lineColor": "#448aff",
            "type": "smoothedLine",
            "title": "Laptop",
            "useLineColorForBulletBorder": true,
            "valueField": "market1",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }, {
            "id": "g2",
            "valueAxis": "v2",
            "fillAlphas": 0.9,
            "bulletColor": "#ff5252",
            "lineThickness": 0,
            "lineColor": "#ff5252",
            "type": "smoothedLine",
            "title": "TV",
            "useLineColorForBulletBorder": true,
            "valueField": "market2",
            "balloonText": "[[title]]<br /><b style='font-size: 130%'>[[value]]</b>"
        }, {
            "id": "g3",
            "valueAxis": "v2",
            "fillAlphas": 0.9,
            "bulletColor": "#11c15b",
            "lineThickness": 0,
            "lineColor": "#11c15b",
            "type": "smoothedLine",
            "title": "Mobile",
            "useLineColorForBulletBorder": true,
            "valueField": "sales1",
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
            "gridAlpha" : 0,
            "minorGridEnabled": true
        },
        "legend": {
            "position":"top",
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "export": {
            "enabled": true
        },
        "dataProvider": [{
            "date": "2013-01-01",
            "market1": 0,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-02-01",
            "market1": 0,
            "market2": 0,
            "sales1": 40
        }, {
            "date": "2013-03-01",
            "market1": 0,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-04-01",
            "market1": 30,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-05-01",
            "market1": 0,
            "market2": 20,
            "sales1": 0
        }, {
            "date": "2013-06-01",
            "market1": 25,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-07-01",
            "market1": 0,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-08-01",
            "market1": 0,
            "market2": 0,
            "sales1": 30
        }, {
            "date": "2013-09-01",
            "market1": 0,
            "market2": 0,
            "sales1": 0
        }, {
            "date": "2013-10-01",
            "market1": 0,
            "market2": 50,
            "sales1": 0
        }, {
            "date": "2013-11-01",
            "market1": 0,
            "market2": 0,
            "sales1": 65
        }, {
            "date": "2013-12-01",
            "market1": 0,
            "market2": 0,
            "sales1": 0
        }]
    });
    // pageview and prod sale end
    // sale order start
    var ctx = document.getElementById('sale-chart1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#b71c1c', [25, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: salebuildoption(),
    });
    function salechart(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 30,
                pointRadius: 3,
                pointHoverRadius: 4,
                pointBorderWidth: 5,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                // pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: a,
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                lineTension: 0,
                backgroundColor: f,
                data: b,
            }]
        };
    }
    function salebuildoption() {
        return {
            title: {
                display: !1
            },
            tooltips: {
                position: 'nearest',
                mode: 'index',
                intersect: false,
                yPadding: 10,
                xPadding: 10,
            },
            legend: {
                display: !1,
                labels: {
                    usePointStyle: !1
                }
            },
            responsive: !0,
            maintainAspectRatio: !0,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
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
                    left: 10,
                    right: 10,
                    top: 25,
                    bottom: 25
                }
            }
        };
    }
    // sale order end
});
