// ==============================================================
// 色々な処理で使えそうな機能を関数・変数をまとめたファイル
// ==============================================================

/**
 * 指定されたクラスを要素に追加する
 * @param {*} cls 追加するクラス
 * @param {*} doc 要素
 */
function addClass(cls, doc) {
    if (!doc.classList.contains(cls)) {
        doc.classList.add(cls);
    }
}

/**
 * 指定されたクラスを要素から削除する
 * @param {*} cls 削除するクラス
 * @param {*} doc 要素
 */
function removeClass(cls, doc) {
    if (doc.classList.contains(cls)) {
        doc.classList.remove(cls);
    }
}

/**
 * Dateオブジェクトを"yyyy-MM-dd"で返す。
 * @param {*} dt 
 * @returns 
 */
function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}

/**
 * 始まりの日付から今日までの日付を以下のフォーマットで配列として返す。
 * @param {*} from 始まりの日付(format: "yyyy-MM-dd")
 * @retruns {*} dateArray 日付の配列
 */
function generateDateArray(from) {
    const start = new Date(from);
    const end   = new Date();

    const dateArray = [];

    let activeDate = start;

    while (activeDate <= end) {
        dateArray.push(formatDate(activeDate));
        activeDate.setDate(activeDate.getDate() + 1);
    }

    return dateArray;
}

function sortDatas(datas) {
    const sortedData = datas.sort(function(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });

    return sortedData;
}