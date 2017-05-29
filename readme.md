## gulp配置说明
---

#### 1.目录结构
```
└─src    				// 源码目录
    ├─js  				// JS目录
    │  ├─module			// module，路由等
    │  ├─plugin			// 插件目录			
    │  └─entry			// service目录
    ├─image				// 图片目录
    │    ├─dogs
    │    ├─footer 		// footer图片
    │    ├─loading
    │    └─portal		// 门户图片
    │        ├─homepage
    │        │  └─banner
    │        ├─logo
    │        └─news
    ├─style 			// CSS样式
    │      ├─entries	// 样式入口
    │      ├─index		// 首页样式
    │      └─modules	// 样式模块
    └─views				// 页面结构目录
        ├─common		// 公共模块，如header/footer
        ├─pages			// 页面
        │  ├─news		// 新闻页面
        │  └─portal		//首页
        │      └─template
        └─pulgins		// 插件目录
```
**注：** 子文件未列出。

#### 2.启动项目

1.安装依赖：
```bash
	npm install
```

2.项目运行
```bash
	gulp server
```

#### 3.发布项目
```bash
	gulp build
```

```
**注：** 详见具体代码。

---
作者：pp。
修订：2017-05-29。