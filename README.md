# InfectStatisticWeb

为自己的仓库编写README.md，内容包括，作业链接、结对学号、项目介绍、以及详细的介绍项目如何构建和运行。
## 1.结对学号

221701227,221701211

## 2. 仓库连接
**GITHUB的仓库** :[https://github.com/takeyouhomeaa/InfectStatisticWeb](https://github.com/takeyouhomeaa/InfectStatisticWeb)

## 3.项目介绍
本次项目是针对上一次的原型设计后的后续.实现以下功能
1. 功能1：实现通过地图的形式来直观显示疫情的大致分布情况，还可以查看具体省份的疫情统计情况。
* 在全国地图上使用不同的颜色代表大概确诊人数区间
* 颜色的深浅表示疫情的严重程度，可以直观了解高危区域；
* 鼠标移到每个省份会高亮显示；
* 点击鼠标会显示该省具体疫情情况；

2.功能2：点击某个省份显示该省疫情的具体情况
* 显示该省份对应的感染患者人数、疑似患者人数、治愈人数、死亡人数；
* 该省份到目前为止的新增确诊趋势、新增疑似趋势、治愈趋势和死亡趋势；
* 该省份所有城市的疫情的具体情况

本次项目采用JavaScript,CSS,HTML已经python 来实现.
通过python编写爬虫,通过[丁香园_疫情实时动态](https://ncov.dxy.cn/ncovh5/view/pneumonia)来获疫情数据.
采用echart 来构建本项目中的图表.
地图素材来源:[DATAV.GeoAtlas](http://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)
页面的组件采用[bootstrap](https://www.bootcss.com/)来开发
本项目通过js来读取爬取到的json数据.通过json 数据,来初始化echart图表的

## 4.注意事项
本项目访问需要css,js,front,json文件夹以及index.html,details.html和data.json文件.
通过index.html 开始访问项目.
本项目在一些浏览器上无法兼容,比如:ie,请使用Chrome,新版Egde或者firefox进行浏览
python 文件需要requests 和 beautifulsoup 库,生产的json文件在D:盘下的data.json
## 5.demo
[demo](http://49.234.86.39/InfectStatisticWeb/)
