"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var vAvatar = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind: function bind(el, _ref) {
    var value = _ref.value;

    el.src = "https://kouhigh.kouhigh.top/upload/app/2019_09_16/7465c201909161531245369.jpg";
    el.style.width = el.style.height = value.size + "px";
    el.style.borderRadius = '100px';
  },

  update: function update(el, _ref2) {
    var value = _ref2.value;

    if (value && value.src) {
      var img = new Image();
      img.onload = function () {
        el.src = value.src;
      };
      img.src = value.src;
    }
  }
};

exports.default = vAvatar;