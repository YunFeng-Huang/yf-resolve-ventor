

# directive

> A Vue.js project

## Build Setup

``` 


<<<<<<< HEAD
#webpack.client.config.js


const ventor = require('yf-resolve-ventor');
let List = [
    'element-ui',
    'axios',
    'vue-router',
    'core-js',
    'async-validator',
    'qs',
    'vue-i18n',
    'vue-style-loader',
    'normalize-wheel',
    'html-entities',
    'yf-vue-directive',
    'yfzw-loadingbar',
    'yf-resolve-ventor'
]
plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),
        ...ventor(List),
        // extract vendor chunks for better caching
        // extract webpack runtime & manifest to avoid vendor chunk hash changing
        // on every build.
        new webpack.optimize.CommonsChunkPlugin({
            name: `manifest`        //自动生成在跟output.filename 同一层目录
        }),
        //// 用于控制文件名等等，代码不多         //因为要动态打包多个页面，所以这里都注释掉，在build.js和dev-sever中再动态注入
        //new VueSSRClientPlugin({
        //    filename: `${app}/vue-ssr-client-manifest.json`
        //})11
    ]
=======

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
>>>>>>> f85c04e107f375ada91af5dff3c1f2742b49ee97
```