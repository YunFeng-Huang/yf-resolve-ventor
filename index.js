import Vue from 'vue';
import copy from './src/v-copy';
import avatar from "./src/v-avatar";
import href from "./src/v-href";
import lazyload from "./src/v-lazyload";
// 自定义指令
const directives = {
  copy,
  avatar,
  href,
  lazyload
};
// Object.keys(directives).forEach((key) => {
//   Vue.directive(key, directives[key]);
// });
// 这种写法可以批量注册指令
export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};