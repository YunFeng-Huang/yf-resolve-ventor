'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTop(obj) {
  var h = 0;
  while (obj) {
    h += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return h;
}
function addListener(el, _ref) {
  var value = _ref.value;

  function lazyload() {
    var seeHeight = document.documentElement.clientHeight; //可见区域高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度

    if (getTop(el) < seeHeight + scrollTop) {
      //   console.log(getTop(el),el)
      // console.log(getTop(el) , seeHeight , scrollTop)
      value != undefined && (el.src = value);
    }
  }
  lazyload();
  function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function () {
      var context = this,
          args = arguments,
          curTime = new Date();
      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= time) {
        fun.apply(context, args);
        startTime = curTime;
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(function () {
          fun.apply(context, args);
        }, delay);
      }
    };
  };
  // 采用了节流函数
  window.removeEventListener('scroll', throttle(lazyload, 500, 1000));
  window.addEventListener('scroll', throttle(lazyload, 500, 1000));
}
var vlazyload = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind: function bind(el) {
    el.src = "https://kouhigh.kouhigh.top/upload/app/2019_11_29/ab353201911291219348282.gif";
  },
  inserted: function inserted(el, binding) {
    addListener(el, binding);
  },

  update: function update(el, binding) {
    addListener(el, binding);
  }
};

exports.default = vlazyload;