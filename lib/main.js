"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require("fs");
var xsl = require("./xsl");
function getDate() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  return y + "-" + m + "-" + d;
}
function filter(params) {
  var value = void 0;
  if (params.includes('&')) {
    var _index = params.indexOf('&');
    value = params.slice(0, _index);
  } else {
    value = params;
  }
  return value;
}

var index = {
  save_path: "sitemap.txt", //文件保存路径
  client: null, //redis
  /**
   *
   * @param client  redis
   * @param default_list 默认数据
   * @param weight 权重分配
   * @param save_path 保存路径
   * @param day 默认更新时间1天
   */
  init: function init(_ref) {
    var _this2 = this;

    var client = _ref.client,
        default_list = _ref.default_list,
        weight = _ref.weight,
        _ref$day = _ref.day,
        day = _ref$day === undefined ? 60 * 60 * 24 * 1000 : _ref$day,
        save_path = _ref.save_path;

    this.setSitemapXsl();
    console.log('开始写入 Sitemap');
    this.client = client;
    this.update({ default_list: default_list, weight: weight, save_path: save_path });
    setInterval(function () {
      _this2.update({ default_list: default_list, weight: weight, save_path: save_path });
    }, day);
  },
  update: function update(_ref2) {
    var default_list = _ref2.default_list,
        weight = _ref2.weight,
        save_path = _ref2.save_path;

    save_path && (this.save_path = save_path);
    var _this = this;
    var fileInfo = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<?xml-stylesheet type=\"text/xsl\" href=\"/sitemap.xsl\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:mobile=\"http://www.baidu.com/schemas/sitemap-mobile/1/\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n  ";
    this.client.hgetall("YFSitemap", function (err, obj) {
      if (err) {
        console.log(err);
        return false;
      }
      var arr = obj ? Object.keys(obj) : [];
      console.log(arr, 'YFSitemap_arr');
      var priority = void 0;
      var list = [].concat(_toConsumableArray(default_list), _toConsumableArray(arr));
      list.map(function (item) {
        if (item.includes('undefined')) {
          _this.client.hdel("YFSitemap", item);
          return false;
        }
        weight.some(function (element) {
          if (element.url.test(item)) {
            priority = element.priority;
          }
          return element.url.test(item);
        });
        fileInfo += "\n<url>\n<loc>" + item + "</loc>\n<priority>" + priority + "</priority>\n<lastmod>" + getDate() + "</lastmod>\n<changefreq>daily</changefreq>\n</url>\n";
      });
      fileInfo += "\n</urlset>";
      fs.writeFile(_this.save_path, fileInfo, "utf8", function (error) {
        if (error) {
          console.log(error);
          return false;
        }
        console.log("写入成功 Sitemap");
      });
    });
  },
  /**
   */
  deleAll: function deleAll() {
    var _this = this;
    this.client.hgetall("YFSitemap", function (err, obj) {
      var arr = obj ? Object.keys(obj) : [];
      arr.map(function (item) {
        _this.client.hdel("YFSitemap", item);
      });
    });
  },
  deleSitemap: function deleSitemap(context) {
    var _this = this;
    var value = filter(context);
    this.client.hmget("YFSitemap", value, function (err, keys) {
      if (err) throw err;
      console.log(keys[0], 'deleSitemap');
      keys[0] && _this.client.hdel("YFSitemap", value);
    });
  },
  addSitemap: function addSitemap(context) {
    // let _this = this
    var value = filter(context);
    console.log(value, 'addSitemap');
    this.client.hmset("YFSitemap", _defineProperty({}, value, value));
  },
  setSitemapXsl: function setSitemapXsl(params) {
    fs.writeFile('sitemap.xsl', xsl, "utf8", function (error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('生成sitemap.xsl成功');
    });
  }
};

module.exports = index;