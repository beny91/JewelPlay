/* 클로저를 이용한 모듈 패턴*/
jewel.dom = (function(){
  var $ = sizzle;

  function hasClass(el, clsName){
    var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
    return regex.test(el.className);
  }

  function addClass(el, clsName){
    if (!hasClass(el, clsNAme)){
        el.className +=" " + clsName;
    }
  }

  function removeClass(el, clsName){
    var regex = new RegExp("(^\\s)" + clsName + "(\\s|$)");
    el.className = el.className(regex, " ");
  }

  return {
    $ : $,
    hasClass : hasClass,
    addClass : addClass,
    removeClass : removeClass
  };

})();
