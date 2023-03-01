// ==UserScript==
// @name         BlockDisgustVideoOnYoutube
// @namespace    BlockDisgustVideoOnYoutube
// @version      0.1
// @description  Youtubeトップページに表示されるおすすめ動画で、自分の好まないおすすめを非表示にするユーザースクリプト
// @author       maimai@ytpmv.indo
// @match        https://www.youtube.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var patterns = [
        // Javascriptの正規表現を用いてYoutubeのトップページで非表示にする動画を決めます。
        // 以下は例文です。有効にする際は最初の//を消すと有効になります

        // /コメ付き/, // タイトルに「コメ付き」が含まれる動画を非表示にする
        // /切り抜き/, // タイトルに「切り抜き」が含まれる動画を非表示にする
        // /2ch/, // タイトルに「2ch」が含まれる動画を非表示にする
        // /\s\d{1,3}\s回視聴/, // 再生数が3桁以下の動画を非表示にする
        // /\d年前/, // 古い動画を非表示にする
    ];

    function Run(){
        var VideoItems = document.getElementsByClassName("yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media");
        for (var i = 0; i < VideoItems.length; i++) {
            for (var j = 0; j < patterns.length; j++) {
                if (patterns[j].test(VideoItems[i].getAttribute('aria-label'))) {
                    if (VideoItems[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "show"){
                        console.log("A Video has been blocked because it matches the pattern :"+patterns[j]+ "\nInfomation of blockd video is : " +VideoItems[i].getAttribute('aria-label'))
                        console.log("URL of blocked video is "+VideoItems[i].href)
                        VideoItems[i].parentNode.parentNode.parentNode.parentNode.parentNode.remove();
                        break;
                    }
                }
            }
        }
    }

    Run();

    // 監視するDOM要素を取得
    const targetNode = document.getElementById('contents');

    // MutationObserverを作成
    const observer = new MutationObserver((mutationsList, observer) => {
        Run();
    });

    // 監視するオプションを設定
    const config = { attributes: false, childList: true, subtree: false };

    // MutationObserverを開始
    observer.observe(targetNode, config);

})();

