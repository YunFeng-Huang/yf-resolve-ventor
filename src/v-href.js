
const vAvatar = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind(el,binding) {
    let { value } = binding
    el.style = 'cursor:pointer'
    el.$value = value;
    if (el.$value) {
      switch (typeof el.$value) {
          case 'string':
            el.onclick = (e)=>{
              e.stopPropagation();
              location.href = el.$value
            };
            break;
          default:
            el.onclick = (e) => {
              e.stopPropagation();
              let query = '';
              Object.entries(el.$value.query).map(([key,val])=>{
                query += `${key}=${val}&`;
              })
              location.href = el.$value.path + "?" + query.slice(0, -1);
            };
        }
      }
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value;
  },
};

export default vAvatar;