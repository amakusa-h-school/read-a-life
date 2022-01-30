const START = "2022-01-21";
const LABEL = [];
const DATA  = {
    labels: {},
    datasets: [],
};

const CONFIG = {
    type: '',
    data: {},
    options: {
        scales: {
            x: {},
            y: {},
        }
    }
};

/**
 * 体温グラフの作成 ==========================================================
 * @param {*} datas 
 */
function chartTemperature(datas) {
    // 初期化
    const dateArray = generateDateArray(START);
    const labels = [];
    const data   = {
        labels: {},
        datasets: [
            {
                label: '体温',
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
            }
        ],
    };
    
    const config = {
        type: 'line',
        data: {},
        options: {
            scales: {
                x: {},
                y: {
                    suggestedMin: 35,
                    suggestedMax: 38,
                    ticks: {
                        stepSize: 0.5,
                        maxTicksLimit: 20,
                        color: function(context) {
                            if (context.tick.value >= 37.5) {
                                return "#f43f5e";
                            } else {
                                return context.tick.color;
                            }
                        }
                    },
                    grid: {
                        color: function(context) {
                            if (context.tick.value >= 37.5) {
                                return "#f43f5e";
                            } else {
                                return context.tick.color;
                            }
                        }
                    }
                }
            }
        }
    };
    
    // データセット
    for (let i = 0; i < dateArray.length; i++) {
        labels.push(moment(dateArray[i]).format("MM-DD (ddd)"));
        var temp = null;
        for (let j = 0; j < datas.length; j++) {
            if (dateArray[i] == datas[j].date) temp = datas[j].temperature;
        }
        data.datasets[0].data.push(temp);
    }

    // configの更新
    data.labels = labels;
    config.data = data;

    // 描画処理
    const myChart = new Chart(
        document.getElementById("temperature-chart"),
        config
    );
    myChart.options.aspectRatio = 1.8;
}

/**
 * 睡眠グラフの作成 ==========================================================
 * @param {*} datas 
 */
function chartSleep(datas) {
    // 初期化
    const dateArray = generateDateArray(START);
    const labels = [];
    const data   = {
        labels: {},
        datasets: [
            {
                label: '睡眠時間',
                backgroundColor: '#bae6fd',
                borderRadius: 10,
                borderSkipped: false,
                data: [],
            },
        ],
    };
    
    const config = {
        type: 'bar',
        data: {},
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                    }
                },
                y: {
                    min: 0,
                    max: 12,
                    grid: {
                        color: "#fff",
                    },
                    ticks: {
                        color: "#fff",
                        callback: function(tick) {
                            switch (tick) {
                                case 0:
                                    return "9:00";
                                case 1:
                                    return "8:00";
                                case 2:
                                    return "7:00";
                                case 3:
                                    return "6:00";
                                case 4:
                                    return "5:00";
                                case 5:
                                    return "4:00";
                                case 6:
                                    return "3:00";
                                case 7:
                                    return "2:00";
                                case 8:
                                    return "1:00";
                                case 9:
                                    return "24:00";
                                case 10:
                                    return "23:00";
                                case 11:
                                    return "22:00";
                                case 12:
                                    return "21:00";
                            }
                        },
                    }
                },
            }
        },
    };
    
    // データセット
    for (let i = 0; i < dateArray.length; i++) {
        labels.push(moment(dateArray[i]).format("MM-DD (ddd)"));
        var bedtime = null;
        var wakeup  = null;
        for (let j = 0; j < datas.length; j++) {
            if (dateArray[i] == datas[j].date) {
                var start = moment(`${ datas[j].date} 09:00`);
                if (datas[j].bedtime == "24:00以降" || datas[j].bedtime == "24:00") {
                    bedtime = start.diff(moment(`${ datas[j].date} 00:00`), "hours");
                } else {
                    bedtime = start.diff(moment(`${ datas[j].date} ${ datas[j].bedtime }`).subtract(1, "days"), "hours");
                }
                
                if (datas[j].wakeuptime == "9:00以降") {
                    wakeup = start.diff(moment(`${ datas[j].date} 9:00`), "hours");
                } else {
                    wakeup = start.diff(moment(`${ datas[j].date} ${ datas[j].wakeuptime }`), "hours");
                }
            }
        }
        data.datasets[0].data.push([bedtime, wakeup]);
    }

    // configの更新
    data.labels = labels;
    config.data = data;

    // 描画処理
    const myChart = new Chart(
        document.getElementById("sleep-chart"),
        config
    );
    myChart.options.aspectRatio = 1.8;
}

/**
 * 学習時間グラフの作成 ==========================================================
 * @param {*} datas 
 */
function chartStudyStuck(datas) {
    // 初期化
    const today     = moment();
    const yesterday = moment().subtract(1, "days");
    const dateArray = generateDateArray(START);
    const labels = ["国語", "数学", "英語", "社会", "理科", "その他"];
    const data   = {
        labels: {},
        datasets: [],
    };
    
    const config = {
        type: 'bar',
        data: {},
        options: {
            legend: {
                position: 'bottom',
            },
            scales: {},
            indexAxis: 'y',
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };
    
    // データセット
    for (let i = 0; i < dateArray.length; i++) {
        var r = 255 - (i / dateArray.length * 10);
        var g = 247 - (i / dateArray.length * 50);
        var b = 237 - (i / dateArray.length * 100);
        var dataset = {
            label: dateArray[i],
            backgroundColor: `rgb(${ r }, ${ g }, ${ b })`,
            data: [],
        }
        for (let j = 0; j < datas.length; j++) {
            if (moment(dateArray[i]).add(1, "days").format("YYYY-MM-DD") == datas[j].date) {
                dataset.data.push(datas[j].kokugo);
                dataset.data.push(datas[j].sugaku);
                dataset.data.push(datas[j].eigo);
                dataset.data.push(datas[j].shakai);
                dataset.data.push(datas[j].other);
            }
        }

        if (dateArray[i] == yesterday.format("YYYY-MM-DD")) {
            dataset.label           = "昨日";
            dataset.backgroundColor = "#ea580c";
        }
        if (dateArray[i] != today.format("YYYY-MM-DD")) {
            data.datasets.push(dataset);
        }
    }

    // configの更新
    data.labels = labels;
    config.data = data;

    // 描画処理
    const myChart = new Chart(
        document.getElementById("study-stuck-chart"),
        config
    );
    myChart.options.aspectRatio = 1.8;
}

/**
 * 学習時間(合計)グラフの作成 ==========================================================
 * @param {*} datas 
 */
 function chartStudy(datas) {
    // 初期化
    const dateArray = generateDateArray(START);
    const labels = [];
    const data   = {
        labels: {},
        datasets: [
            {
                label: '学習時間',
                backgroundColor: '#a7f3d0',
                borderColor: '#10b981',
                fill: true,
                data: [],
            }
        ],
    };
    
    const config = {
        type: 'line',
        data: {},
        options: {
            scales: {
                x: {},
                y: {
                    suggestedMin: 0,
                    suggestedMax: 300,
                }
            }
        }
    };
    
    // データセット
    for (let i = 0; i < dateArray.length; i++) {
        labels.push(moment(dateArray[i]).format("MM-DD (ddd)"));
        var temp = null;
        for (let j = 0; j < datas.length; j++) {
            if (moment(dateArray[i]).add(1, "days").format("YYYY-MM-DD") == datas[j].date) {
                temp = datas[j].total;
            }
        }
        data.datasets[0].data.push(temp);
    }

    // configの更新
    data.labels = labels;
    config.data = data;

    // 描画処理
    const myChart = new Chart(
        document.getElementById("study-chart"),
        config
    );
    myChart.options.aspectRatio = 1.8;
}