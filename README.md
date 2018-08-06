目前市面上已经存在众多脚手架，包括：`vue-cli`、`create-react-app`、`angular-cli`等，但大多数脚手架均针对单页应用。面对多页应用，用户仍然需要手动做很多事情。为了提高`angularJS`多页应用的开发速度，基于`commander`和`co-prompt`将[angular-custom-cli](https://github.com/1335382915/angular-custom-cli.git)封装成脚手架工具`angular-m-cli`。
#### 使用angular-m-cli，您可以做到
* 快速构建项目原型
* 自动生成新页面并完成相关配置（包括入口文件、css、`index.html`）
* 利用本地服务器完成开发
* 使用`mock`进行接口测试，实现前后端分离
* 一键删除指定页面和相关配置
* 一键打包

#### 核心技术
* `co` 自动执行`Generator`
* `co-prompt` co的命令行实现，同步获取用户输入
* `commander` 命令行创建与解析的工具
* `download-git-repo` github源码下载
* `ejs` 模板渲染

### 如何使用
 #### 一、起步
*由于工程使用到了`sass`，请确保您的电脑已经安装了`python`

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

完成依赖安装后，我们需要先在命令行输入`npm run dll`生成`dll`文件（每个项目只需运行一次即可）。使用它的目的在于能够加快`webpack`的打包速度。之后，我们就可以使用`npm start`启动项目啦

![angular-m-cli](http://ox6gixp8f.bkt.clouddn.com/%E5%86%85%E7%BD%91%E9%80%9A%E6%88%AA%E5%9B%BE20180315183137.png)

访问3005端口即可进入`mock`服务的配置页面

![](http://upload-images.jianshu.io/upload_images/1495096-80206821e105aba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面我们来看一下目录结构

![](https://upload-images.jianshu.io/upload_images/1495096-c81c0fda847c73eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



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
    <script type="text/javascript" src="/entry/angular.dll.js"></script>
    <script type="text/javascript" src="/vendor.__bundle.js"></script>
    <script type="text/javascript" src="/home/main.__bundle.js"></script>
</body>
</html>
```
`angular.dll.js`就是之前`npm run dll`后生成的文件，`angular`的代码均被打包至此，并且作为静态文件存储。
最下面的两个 `script`标签引入的是虚拟内存中的文件。
以上三个标签均只在开发环境中使用。
* `package.json`
* `postcss.config.js`配置postcss，实现css前缀自动补齐
* `webpack_dll.config.js`配置`dll`，加快打包速度
* `webpack.config.js`
##### 2. 添加新页面
在命令行中输入`ng add user`，我们再一次启动项目，将url中的`home`改为`user`

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

你可能注意到，通过`npm start`运行项目后，项目目录中并没有生成`vendor.__bundle.js`和`pageName/main__bundle.js`文件，然而控制台并没有报404错误并且项目能够成功运行。这是因为在开发环境下这些文件被存储在了内存中，并且内存的根路径为`entry`。

如果你运行`npm run dev`，你将会看到这些打包后的文件，此时你可以双击`index.html`来直接运行本地文件（在这之前，你需要将`index.html`的`script`标签的引入路径修改为正确的路径，因为此时已经没有本地服务器了，也没有内存文件了）。在一般情况下，`npm start`已经足够满足我们在开发环境下的需求，`npm run dev`一般不会用到。

##### 4. 生产环境
在命令行中输入`npm run build`，构建成功后我们可以看到目录中新产生了一个`build`文件夹：
```
├── build
│   ├── home
│   │   ├── index.html
│   │   ├── main_be2d1a1f.bundle.js //打包后的home所需js
│   │   └── main_be2d1a1f.bundle.css //打包后的home所需css
│   ├── user
│   │   ├── index.html 
│   │   ├── main_da36e4e0.bundle.js //打包后的user所需js
│   │   └── main_da36e4e0.bundle.css //打包后的user所需css
│   ├── 0_79ea9f41.bundle.js //按需加载的模块（如果你使用了按需加载的话）
│   ├── vendor_79ea9f41.bundle.css //打包后的通用css
│   └── vendor_79ea9f41.bundle.js //打包后的通用js
```

下一步，你并不需要手动将打包后的文件引入到`index.html`中，因为这个工作已经由angular-m-cli自动帮你完成，~~你只需要将`build`文件夹中的每个页面的
```
<script type="text/javascript" src="/entry/angular.dll.js"></script>
<script type="text/javascript" src="/vendor.__bundle.js"></script>
<script type="text/javascript" src="/pageName/main.__bundle.js">
```
删除即可。~~

~~`pageName`为你的页面名~~

更新说明：针对上述手动删除代码的问题编写了[del-dev-assets](https://github.com/1335382915/del-dev-assets)插件，实现了自动删除功能并集成到了该脚手架中，无需手动操作。

现在，你可以将`build`、`image`这两个文件夹存放至服务器了（如果你没有其他外部引入的资源）。

![](http://upload-images.jianshu.io/upload_images/1495096-3d572613e6e6c3b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 5. 其他指令
* 列举页面：`ng list`
* 删除页面及其配置项：`ng delete <pageName>`

##### 6. 自定义配置（webpack.config.js）
1. 指定通用模块

通用模块在开发环境下会生成到虚拟内存中：`/vendor.__bundle.js`，在生产环境下会生成到`build/vendor_[8位hash].bundle.js`中。

```
//默认的通用模块
var commonModule1 = path.resolve(__dirname, customConfig.jsCommonDir + '/app');
//添加新的通用模块
var commonModule2 = path.resolve(__dirname, customConfig.jsCommonDir + '/myModule');

var entry = {
    vendor: [commonModule1, commonModule2]
};
```
通过以上配置，`common/app.js`和`common/myModule.js`均会被打包至vendor中。

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

##### 8. 按需加载
angular-m-cli为你提供了按需加载功能，你只需要在相应的页面动态引入模块即可。
```
//home.js
//按需加载
$scope.getAsyncModule = function() {
    import('../../common/async.js').then(data => console.log(data))
 }
```
按需加载的模块在开发环境下会打包到`entry\[module_id]_bundle.js`，在生产环境下会打包到`build/[module_id]_[8位hash].js`。

##### 9. 图片
较小的图片会直接转为dataURl嵌入到模块当中以减少网络请求。由于html并不属于模块，因此，较大的图片直接生成到了`image`文件夹下，名字与原来一致（开发环境下会生成到`entry`中）。

##### 10. 单独提取通用css文件
我们可以使用`extract-text-webpack-plugin`将所有模块导入的css单独提取成一个css文件，然而这会导致生成的css文件有可能存在彼此重复的部分：
```
//home/main.js
import '../../css/basic.scss';
import '../../css/home.scss';
//user/main.js
import '../../css/basic.scss';
import '../../css/user.scss';

//打包后
//home/main_[8位hash].bundle.css和home/main_[8位hash].bundle.css均含有basic.scss的内容，重复！
```
如何在这基础上将通用的样式单独提取是一个难题，我目前的解决方案是将`basic.scss`作为公共模块的一部分：
```
//common/app.js
//将basic.scss作为公共模块，
import '../css/basic.scss';
...js逻辑
```
由于`app.js`被配置成了公共模块，`CommonsChunkPlugin`会将其单独打包，引入的css也会被`extract-text-webpack-plugin`抽取成单独的`vendor_[8位hash].bundle.css`。

如果你有更好的解决方案，欢迎提供`issue`。

### 结尾 
访问[github](https://github.com/1335382915/angular-m-cli)查看源码

参考：[vue-cli](https://github.com/vuejs/vue-cli)、[教你从零开始搭建一款前端脚手架工具](https://segmentfault.com/a/1190000006190814)

