var jewel = {};

// 현재 문서가 완전히 로드될 때까지 기다린다.
window.addEventListener("load", function(){

  // 동적 로딩을 시작한다.
  odernizr.load([
    {
    // 항상 로드되는 파일들
    load:[
      "scripts/sizzle.js",
      "scripts/dom.js",
      "scripts/game.js"
    ],
    //모든 파일의 로드 및 실행이 완료되면 호출된다.
    complete: function() {
        // console.log("모든 파일이 로드되었습니다.");
        jewel.game.showScreen("splash-screen");
    }
  }
]);
}, false);
