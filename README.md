目前市面上已经存在众多脚手架，包括：`vue-cli`、`create-react-app`、`angular-cli`等，但大多数脚手架均针对单页应用。面对多页应用，用户仍然需要手动做很多事情。为了提高`angularJS`多页应用的开发速度，基于`commander`和`co-prompt`将[angular-custom-cli](https://github.com/1335382915/angular-m-cli.git)封装成脚手架工具`angular-m-cli`。
#### 使用angular-m-cli，您可以做到
* 快速构建项目原型
* 自动生成新页面并完成相关配置（包括入口文件、css、`index.html`）
* 利用本地服务器完成开发
* 使用`mock`进行接口测试，实现前后端分离
* 一键删除指定页面和相关配置
* 一键打包

#### 核心技术
* `co` 将异步JS同步化
* `co-prompt` co的命令行实现，同步获取用户输入
* `commander` 命令行创建与解析的工具
* `download-git-repo` github源码下载
* `ejs` 模板渲染

### 如何使用
 #### 一、起步
你需要将该项目克隆到本地，安装相关依赖
```
git clone https://github.com/1335382915/angular-m-cli.git
//进入到angular-m-cli目录下
npm i
```

除此之外，你还需要将该工程链接到全局执行环境中，方便全局使用
```
npm link
```

现在，我们随便进入一个文件夹，输入`ng`命令，看看是否可以全局使用了

![](http://upload-images.jianshu.io/upload_images/1495096-6399e6a2495d7741.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* -v | --version：查看angular-m-cli版本
* -h | --help：查看帮助
* init | i  <projectName>：创建一个新的项目
* add | a  <pageName>：添加新的页面
* list | l ：列举出所有页面
* delete | d <pageName>：删除指定页面

#### 二、使用
注：所有的命令均必须在项目的根目录中输入，在本例子中是`NGApp`
##### 1. 创建工程

在命令行中输入`npm init NGApp`，等待片刻

![](http://upload-images.jianshu.io/upload_images/1495096-04c154cffc6bd046.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

进入到`NGApp`文件夹下，安装依赖`cd NGApp && npm i`

完成依赖安装后，我们就可以使用`npm start`启动项目啦

![angular-m-cli](http://ox6gixp8f.bkt.clouddn.com/%E5%86%85%E7%BD%91%E9%80%9A%E6%88%AA%E5%9B%BE20180306110941.png)

访问3005端口即可进入`mock`服务的配置页面

![](http://upload-images.jianshu.io/upload_images/1495096-80206821e105aba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面我们来看一下目录结构

![](http://upload-images.jianshu.io/upload_images/1495096-bba4d3f6a978f495.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


* `common`存放通用的js代码块
* `css`存放每个页面的样式文件，默认只有`home.scss`和全局样式`basic.scss`

* `doc`存放mock文档
* `entry`存放每个页面的入口js文件，例如：home页的入口文件为`entry/home/main.js`
```
import angular from 'angular';
import { instruction } from '../../common/app';
import '../../css/home.scss';

const homeCtrl = $scope => {
    $scope.pageInfo = 'Hello Angular';
}
const helloNG = () => ({
    restrict:'EACM',
    template:`<p class="home-title">{{pageInfo}}</p>`
});

angular.module('home', [])
    .controller('homeCtrl',['$scope', 
        $scope => homeCtrl($scope)
    ])
    .directive('helloNg', helloNG)
    .directive('ngText', instruction);
```
*使用es6去书写ng代码，能够大幅提高代码可读性和组织性
* `image`存放项目图片
* `mock2easy`
*   `node_modules`
* `pages`存放页面html，目录结构与entry一致，例如：home页的html文件为`pages/home/index.html`
```
<!DOCTYPE html>
<html ng-app="home">
<head>
    <title>Home</title>
</head>
<body ng-controller="homeCtrl" ng-cloak>
    <div class="container" >
        <img src="../../image/angular.jpg"/>
    </div>
    <hello-ng></hello-ng>
    <ng-text></ng-text>
    <script type="text/javascript" src="https://cdn.bootcss.com/angular.js/1.6.6/angular.min.js"></script>
    <script type="text/javascript" src="/vendor.__bundle.js"></script>
    <script type="text/javascript" src="/home/main.__bundle.js"></script>
</body>
</html>
```
最下面的两个 `script`标签引入的是虚拟内存中的文件，在生产环境中我们需要将这两个标签去除。
* `package.json`
* `postcss.config.js`配置postcss，实现css前缀自动补齐
* `webpack.config.js`
##### 2. 添加新页面
在命令行中输入`npm add user`，我们再一次启动项目，将url中的`home`改为`user`

![](http://upload-images.jianshu.io/upload_images/1495096-491d9bfd3203d6f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/1495096-ffb8cdc36c6c96ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


看似简单的操作，但实质上user的相关文件和配置已经自动生成
```
├── css
│   ├── basic.scss
│   ├── home.scss
│   └── user.scss
├── entry
│   ├── home
│   │   └── main.js
│   └── user
│       └── main.js
├── pages
│   ├── home
│   │   └── index.html
│   └── user
│       └── index.html
└── common
```

##### 3. 开发环境
目前，我们已经可以创建新的项目，添加新的页面并成功将项目运行在本地，也就是开发环境。你需要知道开发环境下angular-m-cli可以做哪些事情：
* 使用`es6`书写`angularJS`
* 基于`sass`编写样式文件
* css前缀自动补齐
* 模块导入样式文件
* 自动打开首页（home）
* 热更新css文件和js文件
* 错误映射
* 使用mock服务测试接口

##### 4. 生产环境
在命令行中输入`npm run build`，构建成功后我们可以看到目录中新产生了一个`build`文件夹：
```
├── build
│   ├── home
│   │   ├── index.html
│   │   ├── main.bundle.js //打包后的home所需js
│   │   └── main.bundle.css //打包后的home所需css
│   ├── user
│   │   ├── index.html 
│   │   ├── main.bundle.js //打包后的user所需js
│   │   └── main.bundle.css //打包后的user所需css
│   ├── vendor.bundle.css //打包后的通用css
│   └── vendor.bundle.js //打包后的通用js
```

下一步，你并不需要手动将打包后的文件引入到`index.html`中，因为这个工作已经由angular-m-cli自动帮你完成，你只需要将每个页面的
```
<script type="text/javascript" src="/vendor.__bundle.js"></script>
<script type="text/javascript" src="/pageName/main.__bundle.js">
```
删除即可。

`pageName`为你的页面名

现在，你可以将`build`、`image`这两个文件夹存放至服务器了（如果你没有其他外部引入的资源）。

![](http://upload-images.jianshu.io/upload_images/1495096-3d572613e6e6c3b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 5. 其他指令
* 列举页面：`ng list`
* 删除页面及其配置项：`ng delete <pageName>`

##### 6. 自定义配置（webpack.config.js）
1. 指定通用模块

通用模块在开发环境下会生成到虚拟内存中：`/vender.__bundle.js`，在生产环境下会生成到`entry/vender.bundle.js`中。

```
//默认的通用模块
var commonModule1 = path.resolve(__dirname, customConfig.jsCommonDir + '/app');
//添加新的通用模块
var commonModule2 = path.resolve(__dirname, customConfig.jsCommonDir + '/myModule');

var entry = {
    vendor: [commonModule1, commonModule2]
};
```
通过以上配置，`common/app.js`和`common/myModule.js`均会被打包至vender中。

2. 开发环境下修改自动打开的页面
```
var customConfig = {
    htmlDir: 'pages',
    htmlEntry: 'index.html',
    jsDir: 'entry',
    jsCommonDir: 'common',
    jsEntry: 'main.js',
    serverEntryDir: 'home', //将其修改为user即可自动打开user页面
    devServerPort: 3000
};
```

##### 6. 生产环境转换成开发环境
直接运行`npm start`即可。

在生产环境中，你需要访问的是`build`文件夹。而在开发环境中，你需要访问的是`pages`和`entry`文件夹，二者不互相干扰。

##### 7. 单独提取通用css文件
我们可以使用`extract-text-webpack-plugin`将所有模块导入的css单独提取成一个css文件，然而这会导致生成的css文件有可能存在彼此重复的部分：
```
//home/main.js
import '../../css/basic.scss';
import '../../css/home.scss';
//user/main.js
import '../../css/basic.scss';
import '../../css/user.scss';

//打包后
//home/main.bundle.css和home/main.bundle.css均含有basic.scss的内容，重复！
```
如何在这基础上将通用的样式单独提取是一个难题，我目前的解决方案是将`basic.scss`作为公共模块的一部分：
```
//common/app.js
//将basic.scss作为公共模块，
import '../css/basic.scss';
...js逻辑
```
由于`app.js`被配置成了公共模块，`CommonsChunkPlugin`会将其单独打包，引入的css也会被`extract-text-webpack-plugin`抽取成单独的`vendor.bundle.css`。

如果你有更好的解决方案，欢迎提供`issue`。

### 结尾 
访问[github](https://github.com/1335382915/angular-m-cli)查看源码

参考：[vue-cli](https://github.com/vuejs/vue-cli)、[教你从零开始搭建一款前端脚手架工具](https://segmentfault.com/a/1190000006190814)

