var jewel = {};
//작업자가  사용할 모듈(스크립트)를 가져온다.
importScripts("board.js");

addEventListener("message", function(event){
    var board = jewel.board,
        message = event.data;

    switch (message.command) {
      case "initialize":
          jewel.settings = message.data;
          board.initialize(callback);
          break;
      case "swap":
          board.swap(
            message.data.x1,
            message.data.y1,
            message.data.x2,
            message.data.y2,
            callback
          );
          break;
    }

    function callback(data) {
      postMessage({
        id : message.id,
        data : data,
        jewels : board.getBoard()
      });
    }
}, false);
