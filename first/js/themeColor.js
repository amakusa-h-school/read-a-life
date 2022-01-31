// ==============================================================
// cookieを使用してテーマカラーの設定を行う
// 
// js-cookie.jsの読み込みが必要
// 
// 1. cookieをロード
//    あればcookieから色情報を取り出しスタイルに反映
//    なければcookieを生成
// 2. 変更された色の反映
//    ユーザーによって選択された色をスタイルに反映
//    cookieに選択された色情報を保存
// ==============================================================

// tailwind css のバックグラウンドカラークラスの正規表現
const BG_PATTERN = /bg-[a-z]{1,}-[0-9]{2,3}$/g;

/**
 * cookieから色情報をロードし。返す
 */
function loadColor() {

}

/**
 * cookieに色情報をセーブする。
 */
function saveColor(color) {
    Cookies.set('bg_color', color, { expires: 31 });
}

/** 
 * 該当のボタンが押下された時に実行。
 * 色をスタイルに反映
 * cookieに色情報を保存
*/
function changeColor(color) {
    // 背景DOMの読み込み
    const bg = document.getElementById("back-ground-color");

    // 適用されているバックグラウンドカラークラスの削除
    const clsList = bg.classList;
    for (let i=0; i < clsList.length; i++) {
        if (clsList[i].match(BG_PATTERN)) {
            var activeClass = clsList[i];
            removeClass(clsList[i], bg);
            console.log("remove class: ", activeClass);
        }
    }

    // 選択されたバックグラウンドカラークラスの追加
    addClass(color, bg);
    console.log("add class: ", color);

    // cookieに追加
    saveColor(color);
}

