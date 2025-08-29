'use strict';
$(document).ready(function() {
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
    var chart = AmCharts.makeChart( "sales-analytics", {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [ {
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth": true
        } ],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [ {
            "id": "g1",
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "type": "smoothedLine"
            },
            "fillAlphas": 0.5,
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "lineColor": "#11c15b",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 3,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        } ],
        "chartCursor": {
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": true,
            "valueLineAlpha": 0.5
        },
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "oppositeAxis": true,
            "scrollbarHeight": 90
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        },
        "dataProvider": [ {
            "date": "2012-07-27",
            "value": 13
        }, {
            "date": "2012-07-28",
            "value": 11
        }, {
            "date": "2012-07-29",
            "value": 15
        }, {
            "date": "2012-07-30",
            "value": 16
        }, {
            "date": "2012-07-31",
            "value": 18
        }, {
            "date": "2012-08-01",
            "value": 13
        }, {
            "date": "2012-08-02",
            "value": 22
        }, {
            "date": "2012-08-03",
            "value": 23
        }, {
            "date": "2012-08-04",
            "value": 20
        }, {
            "date": "2012-08-05",
            "value": 17
        }, {
            "date": "2012-08-06",
            "value": 16
        }, {
            "date": "2012-08-07",
            "value": 18
        }, {
            "date": "2012-08-08",
            "value": 21
        }, {
            "date": "2012-08-09",
            "value": 26
        }, {
            "date": "2012-08-10",
            "value": 24
        }, {
            "date": "2012-08-11",
            "value": 29
        }, {
            "date": "2012-08-12",
            "value": 32
        }, {
            "date": "2012-08-13",
            "value": 18
        }, {
            "date": "2012-08-14",
            "value": 24
        }, {
            "date": "2012-08-15",
            "value": 22
        }, {
            "date": "2012-08-16",
            "value": 18
        }, {
            "date": "2012-08-17",
            "value": 19
        }, {
            "date": "2012-08-18",
            "value": 14
        }, {
            "date": "2012-08-19",
            "value": 15
        }, {
            "date": "2012-08-20",
            "value": 12
        }, {
            "date": "2012-08-21",
            "value": 8
        }, {
            "date": "2012-08-22",
            "value": 9
        }, {
            "date": "2012-08-23",
            "value": 8
        }, {
            "date": "2012-08-24",
            "value": 7
        }, {
            "date": "2012-08-25",
            "value": 5
        }, {
            "date": "2012-08-26",
            "value": 11
        }, {
            "date": "2012-08-27",
            "value": 13
        }, {
            "date": "2012-08-28",
            "value": 18
        }, {
            "date": "2012-08-29",
            "value": 20
        }, {
            "date": "2012-08-30",
            "value": 29
        }, {
            "date": "2012-08-31",
            "value": 33
        }, {
            "date": "2012-09-01",
            "value": 42
        }, {
            "date": "2012-09-02",
            "value": 35
        }, {
            "date": "2012-09-03",
            "value": 31
        }, {
            "date": "2012-09-04",
            "value": 47
        }, {
            "date": "2012-09-05",
            "value": 52
        }, {
            "date": "2012-09-06",
            "value": 46
        }, {
            "date": "2012-09-07",
            "value": 41
        }, {
            "date": "2012-09-08",
            "value": 43
        }, {
            "date": "2012-09-09",
            "value": 40
        }, {
            "date": "2012-09-10",
            "value": 39
        }, {
            "date": "2012-09-11",
            "value": 34
        }, {
            "date": "2012-09-12",
            "value": 29
        }, {
            "date": "2012-09-13",
            "value": 34
        }, {
            "date": "2012-09-14",
            "value": 37
        }, {
            "date": "2012-09-15",
            "value": 42
        }, {
            "date": "2012-09-16",
            "value": 49
        }, {
            "date": "2012-09-17",
            "value": 46
        }, {
            "date": "2012-09-18",
            "value": 47
        }, {
            "date": "2012-09-19",
            "value": 55
        }, {
            "date": "2012-09-20",
            "value": 59
        }, {
            "date": "2012-09-21",
            "value": 58
        }, {
            "date": "2012-09-22",
            "value": 57
        }, {
            "date": "2012-09-23",
            "value": 61
        }, {
            "date": "2012-09-24",
            "value": 59
        }, {
            "date": "2012-09-25",
            "value": 67
        }, {
            "date": "2012-09-26",
            "value": 65
        }, {
            "date": "2012-09-27",
            "value": 61
        }, {
            "date": "2012-09-28",
            "value": 66
        }, {
            "date": "2012-09-29",
            "value": 69
        }, {
            "date": "2012-09-30",
            "value": 71
        }, {
            "date": "2012-10-01",
            "value": 67
        }, {
            "date": "2012-10-02",
            "value": 63
        }, {
            "date": "2012-10-03",
            "value": 46
        }, {
            "date": "2012-10-04",
            "value": 32
        }, {
            "date": "2012-10-05",
            "value": 21
        }, {
            "date": "2012-10-06",
            "value": 18
        }, {
            "date": "2012-10-07",
            "value": 21
        }, {
            "date": "2012-10-08",
            "value": 28
        }, {
            "date": "2012-10-09",
            "value": 27
        }, {
            "date": "2012-10-10",
            "value": 36
        }, {
            "date": "2012-10-11",
            "value": 33
        }, {
            "date": "2012-10-12",
            "value": 31
        }, {
            "date": "2012-10-13",
            "value": 30
        }, {
            "date": "2012-10-14",
            "value": 34
        }, {
            "date": "2012-10-15",
            "value": 38
        }, {
            "date": "2012-10-16",
            "value": 37
        }, {
            "date": "2012-10-17",
            "value": 44
        }, {
            "date": "2012-10-18",
            "value": 49
        }, {
            "date": "2012-10-19",
            "value": 53
        }, {
            "date": "2012-10-20",
            "value": 57
        }, {
            "date": "2012-10-21",
            "value": 60
        }, {
            "date": "2012-10-22",
            "value": 61
        }, {
            "date": "2012-10-23",
            "value": 69
        }, {
            "date": "2012-10-24",
            "value": 67
        }, {
            "date": "2012-10-25",
            "value": 72
        }, {
            "date": "2012-10-26",
            "value": 77
        }, {
            "date": "2012-10-27",
            "value": 75
        }, {
            "date": "2012-10-28",
            "value": 70
        }, {
            "date": "2012-10-29",
            "value": 72
        }, {
            "date": "2012-10-30",
            "value": 70
        }, {
            "date": "2012-10-31",
            "value": 72
        }, {
            "date": "2012-11-01",
            "value": 73
        }, {
            "date": "2012-11-02",
            "value": 67
        }, {
            "date": "2012-11-03",
            "value": 68
        }, {
            "date": "2012-11-04",
            "value": 65
        }, {
            "date": "2012-11-05",
            "value": 71
        }, {
            "date": "2012-11-06",
            "value": 75
        }, {
            "date": "2012-11-07",
            "value": 74
        }, {
            "date": "2012-11-08",
            "value": 71
        }, {
            "date": "2012-11-09",
            "value": 76
        }, {
            "date": "2012-11-10",
            "value": 77
        }, {
            "date": "2012-11-11",
            "value": 81
        }, {
            "date": "2012-11-12",
            "value": 83
        }, {
            "date": "2012-11-13",
            "value": 80
        }, {
            "date": "2012-11-14",
            "value": 81
        }, {
            "date": "2012-11-15",
            "value": 87
        }, {
            "date": "2012-11-16",
            "value": 82
        }, {
            "date": "2012-11-17",
            "value": 86
        }, {
            "date": "2012-11-18",
            "value": 80
        }, {
            "date": "2012-11-19",
            "value": 87
        }, {
            "date": "2012-11-20",
            "value": 83
        }, {
            "date": "2012-11-21",
            "value": 85
        }, {
            "date": "2012-11-22",
            "value": 84
        }, {
            "date": "2012-11-23",
            "value": 82
        }, {
            "date": "2012-11-24",
            "value": 73
        }, {
            "date": "2012-11-25",
            "value": 71
        }, {
            "date": "2012-11-26",
            "value": 75
        }, {
            "date": "2012-11-27",
            "value": 79
        }, {
            "date": "2012-11-28",
            "value": 70
        }, {
            "date": "2012-11-29",
            "value": 73
        }, {
            "date": "2012-11-30",
            "value": 61
        }, {
            "date": "2012-12-01",
            "value": 62
        }, {
            "date": "2012-12-02",
            "value": 66
        }, {
            "date": "2012-12-03",
            "value": 65
        }, {
            "date": "2012-12-04",
            "value": 73
        }, {
            "date": "2012-12-05",
            "value": 79
        }, {
            "date": "2012-12-06",
            "value": 78
        }, {
            "date": "2012-12-07",
            "value": 78
        }, {
            "date": "2012-12-08",
            "value": 78
        }, {
            "date": "2012-12-09",
            "value": 74
        }, {
            "date": "2012-12-10",
            "value": 73
        }, {
            "date": "2012-12-11",
            "value": 75
        }, {
            "date": "2012-12-12",
            "value": 70
        }, {
            "date": "2012-12-13",
            "value": 77
        }, {
            "date": "2012-12-14",
            "value": 67
        }, {
            "date": "2012-12-15",
            "value": 62
        }, {
            "date": "2012-12-16",
            "value": 64
        }, {
            "date": "2012-12-17",
            "value": 61
        }, {
            "date": "2012-12-18",
            "value": 59
        }, {
            "date": "2012-12-19",
            "value": 53
        }, {
            "date": "2012-12-20",
            "value": 54
        }, {
            "date": "2012-12-21",
            "value": 56
        }, {
            "date": "2012-12-22",
            "value": 59
        }, {
            "date": "2012-12-23",
            "value": 58
        }, {
            "date": "2012-12-24",
            "value": 55
        }, {
            "date": "2012-12-25",
            "value": 52
        }, {
            "date": "2012-12-26",
            "value": 54
        }, {
            "date": "2012-12-27",
            "value": 50
        }, {
            "date": "2012-12-28",
            "value": 50
        }, {
            "date": "2012-12-29",
            "value": 51
        }, {
            "date": "2012-12-30",
            "value": 52
        }, {
            "date": "2012-12-31",
            "value": 58
        }, {
            "date": "2013-01-01",
            "value": 60
        }, {
            "date": "2013-01-02",
            "value": 67
        }, {
            "date": "2013-01-03",
            "value": 64
        }, {
            "date": "2013-01-04",
            "value": 66
        }, {
            "date": "2013-01-05",
            "value": 60
        }, {
            "date": "2013-01-06",
            "value": 63
        }, {
            "date": "2013-01-07",
            "value": 61
        }, {
            "date": "2013-01-08",
            "value": 60
        }, {
            "date": "2013-01-09",
            "value": 65
        }, {
            "date": "2013-01-10",
            "value": 75
        }, {
            "date": "2013-01-11",
            "value": 77
        }, {
            "date": "2013-01-12",
            "value": 78
        }, {
            "date": "2013-01-13",
            "value": 70
        }, {
            "date": "2013-01-14",
            "value": 70
        }, {
            "date": "2013-01-15",
            "value": 73
        }, {
            "date": "2013-01-16",
            "value": 71
        }, {
            "date": "2013-01-17",
            "value": 74
        }, {
            "date": "2013-01-18",
            "value": 78
        }, {
            "date": "2013-01-19",
            "value": 85
        }, {
            "date": "2013-01-20",
            "value": 82
        }, {
            "date": "2013-01-21",
            "value": 83
        }, {
            "date": "2013-01-22",
            "value": 88
        }, {
            "date": "2013-01-23",
            "value": 85
        }, {
            "date": "2013-01-24",
            "value": 85
        }, {
            "date": "2013-01-25",
            "value": 80
        }, {
            "date": "2013-01-26",
            "value": 87
        }, {
            "date": "2013-01-27",
            "value": 84
        }, {
            "date": "2013-01-28",
            "value": 83
        }, {
            "date": "2013-01-29",
            "value": 84
        }, {
            "date": "2013-01-30",
            "value": 81
        } ]
    } );
    function avgvalchart(a, b, f) {
        if (f == null) {
            f = "rgba(0,0,0,0)";
        }
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
            datasets: [{
                label: "",
                borderColor: a,
                borderWidth: 2,
                hitRadius: 30,
                pointHoverRadius: 4,
                pointBorderWidth: 50,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointHoverBackgroundColor: a,
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                backgroundColor: f,
                data: b,
            }]
        };
    }
    function buildavgchartoption() {
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
                    left: 0,
                    right: 0,
                    top: 120,
                    bottom: 0
                }
            }
        };
    }
    var ctx = document.getElementById('this-month').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: avgvalchart('#11c15b', [30, 15, 25, 35, 30, 20, 25, 30, 15, 1], '#11c15b'),
        options: buildchartoption(),
    });
    function buildchartoption() {
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
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        };
    }
    // sale order start
    var ctx = document.getElementById('sale-chart1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#b71c1c', [25, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: salebuildoption(),
    });
    var ctx = document.getElementById('sale-chart2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#00692c', [30, 15, 25, 35, 30, 20, 25, 30, 15, 20, 25,10, 12, 1], 'transparent'),
        options: salebuildoption(),
    });
    var ctx = document.getElementById('sale-chart3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#0f4aa5', [15, 20, 25,10, 30, 15, 25, 35, 30, 20, 25, 30, 12, 1], 'transparent'),
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

    // monthly expence start
    $(function() {
        var chart = AmCharts.makeChart("monthly-expence", {
            "theme": "light",
            "type": "gauge",
            "axes": [{
                "topTextFontSize": 1,
                "topTextYOffset": 0,
                "topTextColor": "#fff",
                "axisColor": "#31d6ea",
                "axisThickness": 0,
                "endValue": 100,
                "gridInside": false,
                "inside": true,
                "radius": "50%",
                "fontSize": 0,
                "valueInterval": 100,
                "tickAlpha": 0,
                "startAngle": -90,
                "endAngle": 90,
                "unit": "%",
                "bandOutlineAlpha": 0,
                "bands": [{
                    "color": "#d6d6d6",
                    "endValue": 100,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }, {
                    "color": "#11c15b",
                    "endValue": 0,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }]
            }],
            "arrows": [{
                "alpha": 1,
                "innerRadius": "0%",
                "startWidth": 13,
                "nailRadius": 10,
                "nailAlpha": 1,
                "radius": "140%"
            }]
        });

        setInterval(randomValue, 2000);

        // set random value
        function randomValue() {
            var value = Math.round(Math.random() * 100);
            chart.arrows[0].setValue(value);
            chart.axes[0].setTopText(value + " %");
            document.getElementById("exp-val").innerHTML = ("$ " + (value * 10));
            chart.axes[0].bands[1].setEndValue(value);
        }
    });
    // monthly expence end

    // daily visitor start
    var chart = AmCharts.makeChart("daily-visitor", {
        "type": "serial",
        "theme": "light",
        "precision": 2,
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
            "dashLength": 1,
            "axisAlpha":0,
            "lineAlpha":0,
            "gridAlpha":0,
            "minorGridEnabled": true
        },
        "legend": {
            "enabled": false
        },
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "export": {
            "enabled": true
        },
        "dataProvider": [{
            "date": "1",
            "market1": 85
        }, {
            "date": "2",
            "market1": 74
        }, {
            "date": "3",
            "market1": 78
        }, {
            "date": "4",
            "market1": 85
        }, {
            "date": "5",
            "market1": 82
        }, {
            "date": "6",
            "market1": 83
        }, {
            "date": "7",
            "market1": 72
        }, {
            "date": "8",
            "market1": 85
        }]
    });
    // daily visitor end

    // daily sales  start
    var chart = AmCharts.makeChart("daily-sales", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
            "country": "USA",
            "visits": 10,
            "color": "#536dfe"
        }, {
            "country": "Russia",
            "visits": 8,
            "color": "#ff5252"
        }, {
            "country": "South Korea",
            "visits": 5,
            "color": "#11c15b"
        }, {
            "country": "Canada",
            "visits": 7,
            "color": "#448aff"
        }],
        "valueAxes": [{
            "axisAlpha": 0,
            "lineAlpha": 0,
            "gridAlpha": 0,
            "position": "left",
            "fontSize": 0
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 1,
            "lineAlpha": 0,
            "gridAlpha": 0
        },
        "export": {
            "enabled": true
        }
    });
    // daily sales end

    // storage-space start
    var chart = AmCharts.makeChart("storage-space", {
        "type": "pie",
            "startDuration": 0,
            "theme": "light",
            "labelRadius": 0,
            "pullOutRadius": 0,
            "labelText": "",
            "colorField": "color",
            "legend":{
            "enabled":false,
        },
        "innerRadius": "00%",
            "dataProvider": [{
            "country": "Lithuania",
            "litres": 501.9,
            "color": "#448aff"
        }, {
            "country": "Czech Republic",
            "litres": 301.9,
            "color": "#ffe100"
        }, {
            "country": "Ireland",
            "litres": 201.1,
            "color": "#ff5252"
        }, {
            "country": "india",
            "litres": 220.1,
            "color": "#11c15b"
        }],
            "valueField": "litres",
            "export": {
            "enabled": true
        }
    });
    // storage-space end

    // allocation map start
    var map = AmCharts.makeChart( "allocation-map", {
        "type": "map",
        "theme": "light",
        "colorSteps": 10,
        "dataProvider": {
            "map": "usaLow",
            "areas": [ {
                "id": "US-AL",
                "value": 4447100
            }, {
                "id": "US-AK",
                "value": 626932
            }, {
                "id": "US-AZ",
                "value": 5130632
            }, {
                "id": "US-AR",
                "value": 2673400
            }, {
                "id": "US-CA",
                "value": 33871648
            }, {
                "id": "US-CO",
                "value": 4301261
            }, {
                "id": "US-CT",
                "value": 3405565
            }, {
                "id": "US-DE",
                "value": 783600
            }, {
                "id": "US-FL",
                "value": 15982378
            }, {
                "id": "US-GA",
                "value": 8186453
            }, {
                "id": "US-HI",
                "value": 1211537
            }, {
                "id": "US-ID",
                "value": 1293953
            }, {
                "id": "US-IL",
                "value": 12419293
            }, {
                "id": "US-IN",
                "value": 6080485
            }, {
                "id": "US-IA",
                "value": 2926324
            }, {
                "id": "US-KS",
                "value": 2688418
            }, {
                "id": "US-KY",
                "value": 4041769
            }, {
                "id": "US-LA",
                "value": 4468976
            }, {
                "id": "US-ME",
                "value": 1274923
            }, {
                "id": "US-MD",
                "value": 5296486
            }, {
                "id": "US-MA",
                "value": 6349097
            }, {
                "id": "US-MI",
                "value": 9938444
            }, {
                "id": "US-MN",
                "value": 4919479
            }, {
                "id": "US-MS",
                "value": 2844658
            }, {
                "id": "US-MO",
                "value": 5595211
            }, {
                "id": "US-MT",
                "value": 902195
            }, {
                "id": "US-NE",
                "value": 1711263
            }, {
                "id": "US-NV",
                "value": 1998257
            }, {
                "id": "US-NH",
                "value": 1235786
            }, {
                "id": "US-NJ",
                "value": 8414350
            }, {
                "id": "US-NM",
                "value": 1819046
            }, {
                "id": "US-NY",
                "value": 18976457
            }, {
                "id": "US-NC",
                "value": 8049313
            }, {
                "id": "US-ND",
                "value": 642200
            }, {
                "id": "US-OH",
                "value": 11353140
            }, {
                "id": "US-OK",
                "value": 3450654
            }, {
                "id": "US-OR",
                "value": 3421399
            }, {
                "id": "US-PA",
                "value": 12281054
            }, {
                "id": "US-RI",
                "value": 1048319
            }, {
                "id": "US-SC",
                "value": 4012012
            }, {
                "id": "US-SD",
                "value": 754844
            }, {
                "id": "US-TN",
                "value": 5689283
            }, {
                "id": "US-TX",
                "value": 20851820
            }, {
                "id": "US-UT",
                "value": 2233169
            }, {
                "id": "US-VT",
                "value": 608827
            }, {
                "id": "US-VA",
                "value": 7078515
            }, {
                "id": "US-WA",
                "value": 5894121
            }, {
                "id": "US-WV",
                "value": 1808344
            }, {
                "id": "US-WI",
                "value": 5363675
            }, {
                "id": "US-WY",
                "value": 493782
            } ]
        },

        "areasSettings": {
            "autoZoom": true
        },
        "export": {
            "enabled": true
        }

    } );
    var chart = AmCharts.makeChart("allocation-chart", {
        "type": "pie",
        "startDuration": 0,
        "theme": "light",
        "labelRadius": 0,
        "pullOutRadius": 0,
        "labelText": "",
        "colorField": "color",
        "legend":{
            // "enabled":false,
        },
        "innerRadius": "70%",
        "dataProvider": [{
            "country": "Lithuania",
            "litres": 501.9,
            "color": "#85C5E3"
        }, {
            "country": "Czech Republic",
            "litres": 301.9,
            "color": "#6AA3C4"
        }, {
            "country": "Ireland",
            "litres": 201.1,
            "color": "#6097B9"
        }, {
            "country": "india",
            "litres": 220.1,
            "color": "#4E81A4"
        }],
        "valueField": "litres",
    });
    // allocation map end

    // seo start
    var ctx = document.getElementById('seo-chart1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: seochart('#536dfe', [1, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], '#7c90fe'),
        options: seobuildoption(),
    });
    var ctx = document.getElementById('seo-chart2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: seochart('#11c15b', [1, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], '#11c15b'),
        options: seobuildoption(),
    });
    var ctx = document.getElementById('seo-chart3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: seochart('#448aff', [1, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: seobuildoption(),
    });
    function seochart(a, b, f) {
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
                pointRadius: 2,
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
    function seobuildoption() {
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
                    left: 30,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            }
        };
    }
    // seo end

    // seo ecommerce start
    var ctx = document.getElementById('sec-ecommerce-chart-line').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: seochart('#fff', [1, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: seobuildoption(),
    });
    var ctx = document.getElementById('sec-ecommerce-chart-bar').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: seochart('#00692c', [20, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], '#00692c'),
        options: seobuildoption(),
    });
    function seochart(a, b, f) {
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
                pointRadius: 2,
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
    function seobuildoption() {
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
                    left: 30,
                    right: 10,
                    top: 20,
                    bottom: 0
                }
            }
        };
    }
    var chart = AmCharts.makeChart( "seo-ecommerce-barchart", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [ {
            "visits": 10
        }, {
            "visits": 15
        }, {
            "visits": 12
        }, {
            "visits": 16
        }, {
            "visits": 8
        }, {
            "visits": 10
        }, {
            "visits": 9
        }, {
            "visits": 6
        }, {
            "visits": 10
        }, {
            "visits": 12
        }, {
            "visits": 10
        }, {
            "visits": 13
        }, {
            "visits": 11
        }, {
            "visits": 16
        }, {
            "visits": 8
        }, {
            "visits": 10
        }, {
            "visits": 9
        }, {
            "visits": 6
        }, {
            "visits": 10
        }, {
            "visits": 6
        }, {
            "visits": 10
        }, {
            "visits": 12
        }, {
            "visits": 10
        }, {
            "visits": 13
        }, {
            "visits": 11
        }, {
            "visits": 16
        }, {
            "visits": 8
        }, {
            "visits": 10
        }, {
            "visits": 9
        }, {
            "visits": 12
        }, {
            "visits": 10
        }, {
            "visits": 13
        }, {
            "visits": 11
        } ],
        "valueAxes": [ {
            "gridAlpha": 0.1,
            "dashLength": 0
        } ],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
            "balloonText": "Active User: <b>[[value]]</b>",
            "fillAlphas": 1,
            "lineAlpha": 1,
            "lineColor": "#536dfe",
            "type": "column",
            "valueField": "visits",
            "columnWidth": 0.5
        } ],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axesAlpha": 0,
            "lineAlpha": 0,
            "fontSize" : 0,
            "tickLength": 0
        },
        "export": {
            "enabled": true
        }

    } );
    // seo ecommerce end

    // sale order start
    var ctx = document.getElementById('seo-anlytics1').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#448aff', [25, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: salebuildoption(),
    });
    var ctx = document.getElementById('seo-anlytics2').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#11c15b', [15, 20, 25,10, 12, 30, 15, 25, 35, 30, 20, 25, 30, 1], 'transparent'),
        options: salebuildoption(),
    });
    var ctx = document.getElementById('seo-anlytics3').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#536dfe', [15, 20, 25,10, 30, 15, 25, 35, 30, 20, 25, 30, 12, 1], 'transparent'),
        options: salebuildoption(),
    });
    var ctx = document.getElementById('seo-anlytics4').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: salechart('#ff5252', [30, 15, 25, 35, 30, 20, 15, 20, 25,10, 25, 30, 12, 1], 'transparent'),
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

    // realtime start
    $(function() {
        var day = 0;
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 500);
        function generateChartData() {
            var chartData = [];
            for (day = 0; day < 30; day++) {
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + day);

                var visits = Math.round(Math.random() * 40) - 20;

                chartData.push({
                    "date": newDate,
                    "visits": visits
                });
            }

            return chartData;
        }
        var chart = AmCharts.makeChart("realtime-chart", {
            "type": "serial",
            "theme": "light",
            "zoomOutButton": {
                "backgroundColor": '#000000',
                "backgroundAlpha": 0.15
            },
            "dataProvider": generateChartData(),
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "minPeriod": "DD",
                "dashLength": 1,
                "gridAlpha": 0.15,
                "axisColor": "#DADADA"
            },
            "graphs": [{
                "id": "g1",
                "valueField": "visits",
                "bullet": "round",
                "bulletBorderColor": "#FFFFFF",
                "bulletBorderThickness": 2,
                "lineThickness": 2,
                "lineColor": "#448aff",
                "negativeLineColor": "#ff5252",
                "hideBulletsCount": 50
            }],
            "chartCursor": {
                "cursorPosition": "mouse"
            }
        })
        setInterval(function () {
            chart.dataProvider.shift();
            day++;
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + day);
            var visits = Math.round(Math.random() * 40) - 20;
            chart.dataProvider.push({
                date: newDate,
                visits: visits
            });
            chart.validateData();
        }, 1000);
    });
    $(function() {
        var chart = AmCharts.makeChart("sales-prediction-chart", {
            "theme": "light",
            "type": "gauge",
            "axes": [{
                "topTextFontSize": 0,
                "topTextYOffset": 0,
                "topTextColor": "#fff",
                "axisColor": "#31d6ea",
                "axisThickness": 0,
                "endValue": 100,
                "gridInside": false,
                "inside": true,
                "radius": "50%",
                "fontSize": 0.,
                "valueInterval": 100,
                "tickAlpha": 0,
                "startAngle": -140,
                "endAngle": 140,
                "unit": "%",
                "bandOutlineAlpha": 0,
                "bands": [{
                    "color": "#ff9797",
                    "endValue": 100,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }, {
                    "color": "#ff5252",
                    "endValue": 0,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }]
            }],
            "arrows": [{
                "alpha": 1,
                "innerRadius": "0%",
                "startWidth": 10,
                "nailRadius": 8,
                "nailAlpha": 1,
                "radius": "140%"
            }]
        });

        setInterval(randomValue, 2000);

        // set random value
        function randomValue() {
            var value = Math.round(Math.random() * 100);
            chart.arrows[0].setValue(value);
            chart.axes[0].setTopText(value + " %");
            chart.axes[0].bands[1].setEndValue(value);
        }
    });
    $(function() {
        var chart = AmCharts.makeChart("emails-sentsales-chart", {
            "theme": "light",
            "type": "gauge",
            "axes": [{
                "topTextFontSize": 0,
                "topTextYOffset": 0,
                "topTextColor": "#fff",
                "axisColor": "#31d6ea",
                "axisThickness": 0,
                "endValue": 100,
                "gridInside": false,
                "inside": true,
                "radius": "50%",
                "fontSize": 0.,
                "valueInterval": 100,
                "tickAlpha": 0,
                "startAngle": 0,
                "endAngle": 360,
                "unit": "%",
                "bandOutlineAlpha": 0,
                "bands": [{
                    "color": "#448aff",
                    "endValue": 100,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }, {
                    "color": "#ff5252",
                    "endValue": 0,
                    "innerRadius": "105%",
                    "radius": "170%",
                    "gradientRatio": [0],
                    "startValue": 0
                }]
            }],
            "arrows": [{
                "alpha": 0,
                "innerRadius": "100%",
                "borderAlpha": 0,
                "nailAlpha": 0,
            }]
        });

        setInterval(randomValue, 2000);

        // set random value
        function randomValue() {
            var value = Math.round(Math.random() * 100);
            document.getElementById("opened").innerHTML = ((value * 10)+ " opened");
            document.getElementById("unopened").innerHTML = ((1000 - (value * 10)) + " unopened");
            chart.axes[0].bands[1].setEndValue(value);
        }
    });
    // realtime end

    // project and visite start
    var chart = AmCharts.makeChart( "proj-earning", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [ {
            "type":"UI",
            "visits": 10
        }, {
            "type":"UX",
            "visits": 15
        }, {
            "type":"Web",
            "visits": 12
        }, {
            "type":"App",
            "visits": 16
        }, {
            "type":"SEO",
            "visits": 8
        } ],
        "valueAxes": [ {
            "gridAlpha": 0.3,
            "gridColor": "#fff",
            "axisColor": "transparent",
            "color": '#fff',
            "dashLength": 0
        } ],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
            "balloonText": "Active User: <b>[[value]]</b>",
            "fillAlphas": 1,
            "lineAlpha": 1,
            "lineColor": "#fff",
            "type": "column",
            "valueField": "visits",
            "columnWidth": 0.5
        } ],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "type",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "axesAlpha": 0,
            "lineAlpha": 0,
            "fontSize" : 12,
            "color": '#fff',
            "tickLength": 0
        },
        "export": {
            "enabled": false
        }

    } );
    $(function() {
        var day = 0;
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 500);
        function generateChartData() {
            var chartData = [];
            for (day = 0; day < 10; day++) {
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + day);
                var visits1 = Math.round(Math.random() * 10);
                var visits2 = Math.round(Math.random() * 10);
                var visits3 = Math.round(Math.random() * 10);

                chartData.push({
                    "date": newDate,
                    "visits1": visits1,
                    "visits2": visits2,
                    "visits3": visits3
                });
            }

            return chartData;
        }
        var chart = AmCharts.makeChart("realtime-visit-chart", {
            "type": "serial",
            "theme": "light",
            "zoomOutButton": {
                "backgroundColor": '#000000',
                "backgroundAlpha": 0.15
            },
            "dataProvider": generateChartData(),
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "minPeriod": "DD",
                "dashLength": 1,
                "gridAlpha": 0.15,
                "axisColor": "#DADADA"
            },
            "graphs": [{
                "id": "g1",
                "valueField": "visits1",
                "bullet": "round",
                "bulletBorderColor": "#FFFFFF",
                "bulletBorderThickness": 0,
                "lineThickness": 3,
                "bulletAlpha":0,
                "type": "smoothedLine",
                "lineColor": "#448aff",
                "hideBulletsCount": 10
            },{
                "id": "g2",
                "valueField": "visits2",
                "bullet": "round",
                "type": "smoothedLine",
                "bulletBorderColor": "#FFFFFF",
                "bulletBorderThickness": 2,
                "lineThickness": 3,
                "bulletAlpha":0,
                "lineColor": "#ff5252",
                "hideBulletsCount": 50
            },{
                "id": "g3",
                "valueField": "visits3",
                "bullet": "round",
                "type": "smoothedLine",
                "bulletBorderColor": "#FFFFFF",
                "bulletBorderThickness": 0,
                "lineThickness": 3,
                "bulletAlpha":0,
                "lineColor": "#11c15b",
                "hideBulletsCount": 0
            }],
            "chartCursor": {
                "cursorPosition": "mouse"
            }
        })
        setInterval(function () {
            chart.dataProvider.shift();
            day++;
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + day);
            var visits1 = Math.round(Math.random() * 10);
            var visits2 = Math.round(Math.random() * 10);
            var visits3 = Math.round(Math.random() * 10);
            chart.dataProvider.push({
                date: newDate,
                visits1: visits1,
                visits2: visits2,
                visits3: visits3
            });
            chart.validateData();
        }, 1000);
    });
    // project and visite end

    // pageview and prod sale start
    var ctx = document.getElementById('page-view').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: pageviewchart('#ff5252', [1, 30, 15, 20, 25, 30, 15, 25, 35, 30, 20, 10, 12, 1], 'transparent'),
        options: pageviewbuildoption(),
    });
    function pageviewchart(a, b, f) {
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
                pointRadius: 2,
                pointColor: Chart.helpers.color("#ffffff").alpha(1).rgbString(),
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
    function pageviewbuildoption() {
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
                    top: 20,
                    bottom: 20
                }
            }
        };
    }
    var ctx = document.getElementById('bounce-rate').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["1","2","3","4","5","6"],
            datasets: [{
                label: "",
                borderColor: Chart.helpers.color('#448aff').alpha(1).rgbString(),
                borderWidth: 2,
                hitRadius: 30,
                pointRadius: 0,
                pointColor: Chart.helpers.color("#ffffff").alpha(1).rgbString(),
                pointHoverRadius: 4,
                pointBorderWidth: 5,
                pointHoverBorderWidth: 12,
                pointBackgroundColor: Chart.helpers.color("#000000").alpha(0).rgbString(),
                pointBorderColor: '#448aff',
                pointHoverBackgroundColor: '#448aff',
                pointHoverBorderColor: Chart.helpers.color("#000000").alpha(.1).rgbString(),
                fill: true,
                cubicInterpolationMode: 'monotone',
                backgroundColor: Chart.helpers.color('#448aff').alpha(.2).rgbString(),
                data: [1, 30, 10, 25, 5, 30],
            }]
        },
        options: bounceratebuildoption(),
    });
    function bounceratebuildoption() {
        return {
            title: {
                display: !1
            },
            tooltips: {
                intersect: false,
                mode: 'nearest',
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
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
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 0
                }
            }
        };
    }
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

    // full body chart
    $(function() {
        var ctx = document.getElementById('avg-value').getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: valincome('#536dfe', [40, 25, 30, 22, 31,40, 15, 25, 35, 30, 20, 15, 20, 25], '#536dfe'),
            options: valincomebuildoption(),
        });
        var ctx = document.getElementById('avg-income').getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: valincome('#11c15b', [30, 15, 25, 35, 30, 20, 15, 20, 25,40, 25, 30, 22, 31], '#11c15b'),
            options: valincomebuildoption(),
        });
        var ctx = document.getElementById('sal-income').getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: valincome('#448aff', [30, 15, 25, 35, 30, 20, 15, 20, 25,40, 25, 30, 22, 31], '#448aff'),
            options: valincomebuildoption(),
        });
        var ctx = document.getElementById('rent-income').getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: valincome('#11c15b', [40, 25, 30, 22,30, 15, 25, 35, 30, 20, 15, 20, 25, 31], '#11c15b'),
            options: valincomebuildoption(),
        });
        var ctx = document.getElementById('income-analysis').getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: valincome('#ff5252', [25, 30,20, 15, 20, 25, 31, 22,30, 15, 25, 35, 30,40], '#ff5252'),
            options: valincomebuildoption(),
        });
        function valincome(a, b, f) {
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
                    cubicInterpolationMode: 'monotone',
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
    });
    var ctx = document.getElementById("newuserchart").getContext("2d");
    window.myDoughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [10,34,5],
                backgroundColor: ["#11c15b","#448aff","#ff5252"],
                label: 'Dataset 1'
            }],
            labels: ["Satisfied", "Unsatisfied", "NA"]
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: "",
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
});
