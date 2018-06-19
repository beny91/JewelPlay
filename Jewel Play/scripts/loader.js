var jewel = {
    screens : {},
    settings : {
        row : 8,
        cols : 8,
        baseScore : 100,
        numJewelTypes : 7
    }
};

window.addEventListener("load", function() {

Modernizr.addTest("standalone", function() {
    return (window.navigator.standalone != false);
});
// Yepnope 라이브러리를 사용하여 미리 로드 한다.
yepnope.addPrefix("preload", function(resource){
    resource.noexec = true;
    return resource;
});
// loading stage 1
Modernizr.load([
{
    load : [
        "scripts/sizzle.js",
        "scripts/dom.js",
        "scripts/game.js"
    ]
},{
    test : Modernizr.standalone,
    yep : "scripts/screen.splash.js",
    nope : "scripts/screen.install.js",
    complete : function() {
        jewel.game.setup();
        if (Modernizr.standalone) {
            jewel.game.showScreen("splash-screen");
        } else {
            jewel.game.showScreen("install-screen");
        }
    }
}
]);

// loading stage 2
if (Modernizr.standalone) {
    Modernizr.load([
    {
        load : [
          "scripts/screen.main-menu.js"
      ]
    }, { // 작업자 스레드를 탐지여부에 따른 다른 모듈 호출
      test : Modernizr.webworkers,
      yep  : [// 작업자 스크립트에 importScripts 함수 때문에 미리 로드.
            "scripts/board.worker-interface.js",
            "preload!scripts/board.worker.js"
      ],
      nope : "scripts/board.js"
    }
    ]);
}


}, false);
