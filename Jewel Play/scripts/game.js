jewel.game = (function(){
  var dom = jewel.dom,
    $ = dom.$;

  // 현재 활성화된 스크린을 보이지 앟게 하고 지정된 ID를 가진 스크린을 표시한다.
  function showScreen(screenId){
    // sizzle
    var activeScreen = $("#game.screen.active")[0],
        screen = $("#" + screenId)[0];
    if(activeScreen){
      dom.removeClass(activeScreen,"active");
    }
    dom.addClass(screen, "active");
  }

  //공용 메서드를 정의한다.
  return {
    showScreen : showScreen
  };
})();
