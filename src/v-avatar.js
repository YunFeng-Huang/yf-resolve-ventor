
const vAvatar = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind(el, { value }) {
    el.$value = value;
    el.src = "https://kouhigh.kouhigh.top/upload/app/2019_09_16/7465c201909161531245369.jpg";
    if(el.$value){
      let img = new Image();
      img.onload = function () {
        el.src = el.$value;
      };
      img.src = el.$value;
    }
  },
  update: function (el, { value }) {
    el.$value = value;
  }
};

export default vAvatar;