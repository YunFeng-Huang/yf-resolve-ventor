
const vAvatar = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind(el, { value }) {
    el.src = "https://kouhigh.kouhigh.top/upload/app/2019_09_16/7465c201909161531245369.jpg";
    if(value){
      let img = new Image();
      img.onload = function () {
        el.src = value;
      };
      img.src = value;
    }
  },
  update: function (el, { value }) {
    if(value){
      let img = new Image();
      img.onload = function () {
        el.src = value;
      };
      img.src = value;
    }
  },
  
};

export default vAvatar;