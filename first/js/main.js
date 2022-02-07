let studentData = {};
/**
 * DOMが読み込まれた後に実行します。
 */
window.addEventListener("DOMContentLoaded", function() {

});

/**
 * ページ、スタイルシート、javascript、画像などの全てのリソースが読み込まれた後に実行します。
 */
window.addEventListener("load", async function() {
    // cookieから色情報を取得・cookieが設定されていなければ、設定 ========================
    if (Cookies.get("bg_color")) {
        let bgColor = Cookies.get("bg_color");
        changeColor(bgColor);
    } else {
        saveColor("bg-stone-400");
    }

    // Google SpreadSheetから該当生徒のデータを取得 ===================================
    // クエリパラメータの取得
    const url = this.location.search;
    const uid = url.split("=")[1];

    // Google SpreadSheetからデータの取得
    studentData = await fetchData(uid);

    // 取得したデータをソート ========================================================
    studentData.datas = sortDatas(studentData.datas);

    // 取得したデータを描画 ==========================================================
    // personalの更新
    var doc = this.document.getElementById("personal");
    const grade = String(studentData.number).substring(0, 1);
    const classroom = String(studentData.number).substring(1, 2);
    const number = String(studentData.number).substring(2, 4);
    const name = studentData.name;
    doc.innerHTML = `${ grade }年${ classroom }組${  number }番号　氏名:${ name }`;

    // 体温グラフの生成
    addClass("hidden", this.document.getElementById("temperature-load"));
    removeClass("hidden", this.document.getElementById("temperature-chart"));
    chartTemperature(studentData.datas);

    // 睡眠グラフの生成
    addClass("hidden", this.document.getElementById("sleep-load"));
    removeClass("hidden", this.document.getElementById("sleep-chart"));
    chartSleep(studentData.datas);

    // 学習時間(教科別)グラフの生成
    addClass("hidden", this.document.getElementById("study-stuck-load"));
    removeClass("hidden", this.document.getElementById("study-stuck-chart"));
    chartStudyStuck(studentData.datas);

    // 学習時間(合計)グラフの生成
    addClass("hidden", this.document.getElementById("study-load"));
    removeClass("hidden", this.document.getElementById("study-chart"));
    chartStudy(studentData.datas);

    // 合計の計算
    var doc   = this.document.getElementById("total");
    var total = 0;
    for (let i = 0; i<studentData.datas.length; i++) {
        total = total + studentData.datas[i].total;
    }
    doc.innerHTML = "これまでの勉強時間: " + total + "分";
});


function weeklyChart() {
    // 初期化
    const weekdays = [];
    let start = null;
    let end   = null;

    // studentDaraの取得
    const temp = studentData.datas;

    // 今週１週間の日付配列を作成
    const today = moment();
    let today_week = today.day();

    today_week = (today_week + 6) % 7; // 0:sun, 1:mon, ..., 6:sat
                                       // -> 0:mon, 1:tue, ...,6:sun
    
    var d = today.subtract(today_week, "days");
    weekdays.push(d.format("YYYY-MM-DD"));
    start = d.format("YYYY-MM-DD");

    for (let i=0; i<6; i++) {
        var d = today.add(1, "days");
        weekdays.push(d.format("YYYY-MM-DD"));
        end = d.format("YYYY-MM-DD")
    }
    // studentDataから１週間分を取り出す
    const datas = [null, null, null, null, null, null, null];
    for (let i=0; i<weekdays.length; i++) {
        for (let j=0; j< temp.length; j++) {
            if (weekdays[i] == temp[j].date) {
                datas[i] = temp[j].date;
            }
        }
    }

    // 前のグラフを削除
    window.temperatureChart.destroy();
    window.sleepChart.destroy();
    window.stadyStuckChart.destroy();
    window.studyChart.destroy();

    // グラフを描画
    chartTemperature(datas, start, end);
    chartSleep(datas, start, end);
    chartStudyStuck(datas, start, end);
    chartStudy(datas, start, end);

    // 合計の計算
    var doc   = this.document.getElementById("total");
    var total = 0;
    for (let i = 0; i<datas.length; i++) {
        total = total + datas[i].total;
    }
    doc.innerHTML = "今週の勉強時間: " + total + "分";
}

function allChart() {
    // studentDaraの取得
    const datas = studentData.datas;

    // 前のグラフを削除
    window.temperatureChart.destroy();
    window.sleepChart.destroy();
    window.stadyStuckChart.destroy();
    window.studyChart.destroy();

    // グラフを描画
    chartTemperature(datas);
    chartSleep(datas);
    chartStudyStuck(datas);
    chartStudy(datas);

    // 合計の計算
    var doc   = this.document.getElementById("total");
    var total = 0;
    for (let i = 0; i<datas.length; i++) {
        total = total + datas[i].total;
    }
    doc.innerHTML = "これまでの勉強時間: " + total + "分";
}