
var fs = require("fs");
let xsl = require("./xsl");
function getDate() {
  let date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate().length > 1 ? date.getDate() : "0" + date.getDate();
  return y + "-" + m + "-" + d;
}
function filter(params) {
  let value;
  if(params.includes('&')){
    let index = params.indexOf('&')
    value = params.slice(0,index)
  }else{
    value = params;
  }
  return value;
}

var index = {
  save_path: "sitemap.txt", //文件保存路径
  client:null, //redis
  /**
   *
   * @param client  redis
   * @param default_list 默认数据
   * @param weight 权重分配
   * @param save_path 保存路径
   * @param day 默认更新时间1天
   */
  init:function({ client, default_list, weight, day=60 * 60 * 24 * 1000 , save_path }) {
    this.setSitemapXsl()
    console.log('开始写入 Sitemap');
    this.client = client;
    this.update({ default_list, weight , save_path })
    setInterval(() => {
      this.update({default_list, weight , save_path })
    }, day);
  },
  update: function({ default_list, weight , save_path }) {
    save_path && (this.save_path = save_path)
    let _this = this;
    let fileInfo = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.baidu.com/schemas/sitemap-mobile/1/" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  `;
   this.client.hgetall("YFSitemap", function(err, obj) {
    if (err) {
      console.log(err);
      return false;
    }
      let arr = obj ? Object.keys(obj) : [];
      console.log(arr,'YFSitemap_arr')
      let priority;
      let list = [...default_list, ...arr];
      list.map(item => {
        if(item.includes('undefined')){
          _this.client.hdel("YFSitemap", item);
          return false;
        }
        weight.some(element => {
          if (element.url.test(item)) {
            priority = element.priority;
          }
          return element.url.test(item);
        });
        fileInfo += `
<url>
<loc>${item}</loc>
<priority>${priority}</priority>
<lastmod>${getDate()}</lastmod>
<changefreq>daily</changefreq>
</url>
`;
      });
      fileInfo += `
</urlset>`;
      fs.writeFile(_this.save_path, fileInfo, "utf8", function(error) {
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
  deleAll: function() {
    let _this = this
    this.client.hgetall("YFSitemap", function(err, obj) {
      let arr = obj ? Object.keys(obj) : [];
      arr.map(item => {
        _this.client.hdel("YFSitemap", item);
      });
    });
  },
  deleSitemap:function (context) {
    let _this = this
    let value  = filter(context)
    this.client.hmget("YFSitemap", value, function(err, keys) {
      if (err) throw err;
      console.log(keys[0],'deleSitemap')
      keys[0] && _this.client.hdel("YFSitemap", value);
    });
  },
  addSitemap:function(context) {
    // let _this = this
    let value  = filter(context)
    console.log(value,'addSitemap')
    this.client.hmset("YFSitemap",{
      [value]: value
    })
  },
  setSitemapXsl:function (params) {
    fs.writeFile('sitemap.xsl', xsl, "utf8", function(error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log('生成sitemap.xsl成功')
    });
  }
};

module.exports = index;
