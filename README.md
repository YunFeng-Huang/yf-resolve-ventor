

# directive

> A Vue.js project

## Build Setup

``` 


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
        //})
    ]
```