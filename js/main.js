
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
    const datas = await fetchData(uid);

    // 取得したデータをソート ========================================================
    const sortedData = sortDatas(datas.datas);

    // 取得したデータを描画 ==========================================================
    // personalの更新
    var doc = this.document.getElementById("personal");
    const grade = String(datas.number).substring(0, 1);
    const classroom = String(datas.number).substring(1, 2);
    const number = String(datas.number).substring(2, 4);
    const name = datas.name;
    doc.innerHTML = `${ grade }年${ classroom }組${  number }番号　氏名:${ name }`;

    // 体温グラフの生成
    addClass("hidden", this.document.getElementById("temperature-load"));
    removeClass("hidden", this.document.getElementById("temperature-chart"));
    chartTemperature(sortedData);

    // 睡眠グラフの生成
    addClass("hidden", this.document.getElementById("sleep-load"));
    removeClass("hidden", this.document.getElementById("sleep-chart"));
    chartSleep(sortedData);

    // 学習時間(教科別)グラフの生成
    addClass("hidden", this.document.getElementById("study-stuck-load"));
    removeClass("hidden", this.document.getElementById("study-stuck-chart"));
    chartStudyStuck(sortedData);

    // 学習時間(合計)グラフの生成
    addClass("hidden", this.document.getElementById("study-load"));
    removeClass("hidden", this.document.getElementById("study-chart"));
    chartStudy(sortedData);
});
