

# directive

> A Vue.js project

## Build Setup

``` 



const sitemap = require("yf-redis-sitemap");

* @param client  redis
* @param default_list 默认数据
* @param weight 权重分配
* @param save_path 保存路径
* @param day 默认更新时间1天

sitemap.init({
    client:client,
    default_list:newres,
    weight:[
    {
        url:/\.(com|top)(\/)?$/,
        priority:1
    },
    {
        url:/.*relatedGoods.*/,
        priority:0.8
    },
    {
        url:/.*/,
        priority:0.6
    },
    ],
    save_path:'sitemap3.xml'
})

sitemap.deleSitemap(context);
sitemap.addSitemap(context);
sitemap.deleAll()
```