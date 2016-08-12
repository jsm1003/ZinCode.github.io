---
layout: post
title:  "毛玻璃与透明效果的实现"
date:   2016-07-28 22:14:54
categories: javascript css html5
tags: 毛玻璃
---

* content
{:toc}
> 之前在一些网站上看到有毛玻璃与透明效果，[bilibili](http://www.bilibili.com/) 的head栏,[icloud官网]( https://www.icloud.com/),[苹果音乐官网](http://www.apple.com/cn/music/) 以及苹果ios系统的实时毛玻璃效果，感觉不错，在这里研究一下效果如何实现。这里只说技术关键点与遇到的坑。




## 主要实现原理依靠半透明和模糊

### 半透明度
***
半透明度的实现在css中有两个属性与之相关，一个是`opacity: 0.5`（ie下位filter:alpha(opacity=0.5)）,另一个是带有透明度的颜色模式：如`rgba(255, 0, 0, 0.5)`,`hsla(0, 0%, 100%, 0.3)`。
在设置opacity这个属性的时候，发现如果直接把元素上设置，会发现连带内容也一并给透明了。下图为对比

图1
并且这个属性不像其他属性像`font`、`color`等属性可以在子元素上重新设置样式来覆盖掉默认继承于父元素上的样式。在子元素上修改这个属性并不可行。具有类似特性的属性我目前发现的还有一个是模糊效果`blur()`;

**解决办法**

通过设置该元素的背景`background-color: rgba(213, 175, 23, 0.2)`;来使他的背景半透明，这样就不会影响到元素内容本身了。

### 模糊效果

模糊效果的实现主要有三种：1.css中相关标签、2、svg相关标签、3、canvas中相关接口

首先css方法
添加filter属性，代码如下：

```css
-webkit-filter: blur(5px);
-moz-filter: blur(5px);
-ms-filter: blur(5px);
filter: blur(5px);
```
结果如图

图2
可恶的是这个属性到现在连最新的ie11都不能够支持。我真是曰了狗。

svg方法
具体参考这篇文章，我不太了解，[使用CSS将图片转换成模糊(毛玻璃)效果]( http://www.zhangxinxu.com/wordpress/2013/11/css-svg-image-blur/)

canvas方法

这里先贴出一个[DEMO](此处应该有链接)
原理就是利用了一位前辈写的[StackBlur.js]( http://www.quasimondo.com/StackBlurForCanvas/StackBlur.js)
可以实现高斯模糊的效果。
具体使用方法及效果请看这个[demo](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html)，但是实际使用的时候要考虑图片安全性问题。

## 静态呈现

blibili的首页是两个div叠加在一起呈现，先让一个div使用模糊加透明度处理，在另一个div上只填写文字，这样做的好处是兼容性比较好，如果浏览器不支持模糊属性，那么会显示半透明效果，不好的地方就是添加了无用的div，不够简洁，还有一种方法就是添加伪元素使伪元素的背景与整体的背景相同。具体实现看下面代码。

```html
<div class="wrap">
	<div class="content">我想知道。支持CSS3的IE11 IE10反而不支持这种特效了。ie7-9还能支持。我已测试了很久。谷歌，火狐，ie7-9都能实现。实现的效果好坏， 先不谈。至少IMG肯定都能搞定。只有IE10-11就是两个奇葩。filter:blur，svg引用，
	</div>
```

```css
.wrap {
	background: url('3.jpg') no-repeat -100px -300px;
	width: 500px;
	height: 300px;
	position: relative;
	z-index:1;
}

.content {
	width: 300px;
	height: 200px;
	position: absolute;
	left: 100px;
	top: 50px;
	overflow: hidden;
	/*background: inherit;*/
	background: hsla(0, 0%, 100%, 0.3);
	/*z-index: 10;*/
}

.content:before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	-webkit-filter: blur(20px);
	background: url('3.jpg') no-repeat -100px -300px;
	<!-- 这里不能用inherit来设置 -->
	/*background: inherit;*/
	z-index:-1;
}
```

最终效果如下：
图片[此处应该有图片](此处应该有链接)

## 实时模糊

apple Music官网的效果分析一下，就是给视频元素监听鼠标滚轮事件，通过滚轮来控制模糊程度。
下面献上自己写的小demo
不过看到人家动画使用的three.js插件写的，自己还没有用过这个牛X的插件，以后工作中用到了再详细了解。

未完待续
