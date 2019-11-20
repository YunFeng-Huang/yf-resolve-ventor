'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var vAvatar = {
  /*
    bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
    el: 作用的 dom 对象
    value: 传给指令的值
  */
  bind: function bind(el, binding) {
    var value = binding.value;

    el.style = 'cursor:pointer';
    el.$value = value;
    if (el.$value) {
      switch (_typeof(el.$value)) {
        case 'string':
          el.onclick = function (e) {
            e.stopPropagation();
            location.href = el.$value;
          };
          break;
        default:
          el.onclick = function (e) {
            e.stopPropagation();
            var query = '';
            Object.entries(el.$value.query).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  val = _ref2[1];

              query += key + '=' + val + '&';
            });
            location.href = el.$value.path + "?" + query.slice(0, -1);
          };
      }
    }
  },

  // 当传进来的值更新的时候触发
  componentUpdated: function componentUpdated(el, _ref3) {
    var value = _ref3.value;

    el.$value = value;
  }
};

exports.default = vAvatar;