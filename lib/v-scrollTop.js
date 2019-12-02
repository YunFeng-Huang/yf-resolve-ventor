'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var scrollTop = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind: function bind(el) {
    el.style.transition = 'all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)';
    el.style.cursor = 'pointer';
    el.style.opacity = 0;
    function addEvent() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        el.style.opacity = 1;
      } else {
        el.style.opacity = 0;
      }
    }
    window.addEventListener('scroll', addEvent);
    el.onclick = function (params) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
  },
  unbind: function unbind(el) {
    function addEvent() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        el.style.opacity = 1;
      } else {
        el.style.opacity = 0;
      }
    }
    window.removeEventListener('scroll', addEvent(el));
  }
};

exports.default = scrollTop;