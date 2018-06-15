jewel.board = (function() {
  var settings,
  jewels,
  cols,
  rows,
  baseScore,
  numJewelTypes;

  function initialize(callback) {
    settings = jewel.settings;
    numJewelTypes = settings.numJewelTypes;
    baseScore = settings.baseScore;
    cols = settings.cols;
    rows = settings.rows;
    fillBoard();
    callback();
  }

  function print() {
    var str = "";
    for (var y = 0; y < rows; y++){
      for(var x = 0; x < cols; x++){
        str += getJewel(x,y) + " ";
      }
      str += "\r\n";
    }
    console.log(str);
  }

  function fillBoard() {
    var x, y, type;
    jewels = [];
    for (x = 0; x < cols; x++){
      jewels[x] = [];
      // 보드에 보석을 채울때 세 개의 동일한 보석이 존재하지 않도록 하기 위해서.
      //왼쪽 과 위를 검사한다. 단 jewels의  배열을 직접참조하지 않는다.
      for (y = 0; y < rows; y++){
        type = randomJewel();
        while ((type === getJewel(x -1, y) &&
                type === getJewel(x -2, y)) ||
                (type === getJewel(x, y -1) &&
              type === getJewel(x, y - 2))) {
                type = randomJewel();
              }
              jewels[x][y] = type;
      }
    }
  }

  function getJewel(x,y) {
    // 배열의 범위를 벗어나는 것을 방지.
    if ( x < 0 || x > cols -1 || y < 0 || rows -1){
      return -1;
    }else {
      return jewels[x][y];
    }
  }

  function randomJewel() {
    return Math.floor(Math.random() * numJewelTypes);
  }

  // 블록 연결 검사.
  function checkChain(x, y){
    var type = getJewel(x,y),
    left = 0, right = 0,
    down = 0, up = 0;

    // 오른쪽
    while( type === getJewel(x + right + 1, y)) {
       right++;
    }

    // 왼쪽
    while (type === getJewel(x - left - 1, y)){
      left++;
    }

    // 위쪽
    while (type === getJewel(x, y + up +1)){
      up++;
    }

    // 아래쪽
    while (type === getJewelx, y - down -1)){
      down++;
    }

    return Math.max(left + 1 + right, up + 1 + down);

  }

 // 블록 교환 검사
 function canSwap(x1, y1, x2, y2) {
   var type1 = getJewel(x1, y1),
       type2 = getJewel(x2, y2),
       chain;

   if(!isAdjacent(x1, y1, x2, y2)){
     return false;
   }

   // 블록 임시 교환
   jewels[x1][y1] = type2;
   jewels[x2][y2] = type1;
   chain = (checkCahin(x2, y2) > 2)
            || checkCahin(x1, y1) > 2 );

  // 블록 원위치
  jewels[x1][y1] = type1;
  jewels[x2][y2] = type2;

  return chain;
 }

 //인접한 두 지점인지 확인 검사
 function isAdjacent(x1, y1, x2, y2) {
   var dx = Math.abs(x1 - x2),
       dy  = Math.abs(y1 - y2);
   return (dx + dy === 1);
 }

 // 보드에서 연결된 블록을 탐색
 function getChains() {
   var x, y, chains = [];

   for (x = 0; x < cols; x++){
     chains[x] = [];
     for (y = 0; y < rows; y++){
       chains[x][y] = checkChain(x, y);
     }
   }
   return chains;
 }

 // 연결된 블록의 처리 (삭제, 이동 등을 판단)
 function check(events) {
   var chains = getChains(),
   hasChains = false, score = 0,
   removed = [], moved = [], gaps = [];

   for( var x = 0; x < cols; x++){
     gaps[x] = 0;
     for (var y = rows-1; y >= 0; y--){
       if(chains[x][y] > 2){
         hasChains = true;
         gaps[x]++;
         removed.push({
           x : x, y : y,
           type : getJewel(x,y)
         });
         //점수 계산
         score += baseScore * Math.pow(2, (chains[x][y] -3));
       }else if (gaps[x] > 0) {
         moved.push({
           toX : x, toY y + gaps[x],
           fromX : x, fromY : y,
           type : getJewel(x,y)
         });
         jewels[x][y + gaps[x]] = getJewel(x,y);
       }
     }

     // 보석이 내려가고 빈 칸을 다시 채운다.
     for (y = 0; y < gaps[x]; y++)
     {
        jewels[x][y] = randomJewel();
        moved.push({
          toX : x, toY : y,
          fromX : x, fromY : y - gaps[x],
          type : jewels[x][y];
        });
     }

     events = events || [];

     if(hasChains) {
       events.push({
         type : "remove",
         data : removed
       }, {
         type : "score",
         data : score
       }, {
         type : "move",
         data : moved
       });
       return check(evens);
     }else{
       return events;
     }
   }
 }


  return {
    canSwap : canSwap,
    initialize : initialize,
    print : print;
  }
})();
