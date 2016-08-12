---
layout: post
title:  "搭建jekyll博客总结"
date:   2016-08-10 22:24:3
categories: jekyll
tags: blog jekyll
---

* content
{:toc}

最近在网上看到好多前端程序猿都有自己的技术博客，在网上找了一些教程后，想自己着手搭建一个，终于经过了一个多星期的时间，终于也写成了你现在所看到的这个博客，期间遇到了很多技术点，摘出一些有用的在这里总结一下。




## 博客搭建基本流程

这里只说技术关键点不会长篇大论，
1 首先我的博客是基于jekyll搭建，代码托管在github上，地址请[戳这里](https://github.com/ZinCode/ZinCode.github.io)。
2 搭建好jekyll运行所需基本环境，安装git命令行客户端，完成和github仓库同步。
3 了解git和jekyll基本命令（这一过程我分别参考了[廖雪峰的git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001373962845513aefd77a99f4145f0a2c7a7ca057e7570000),[jekyll语法文档](http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/),我认为这两篇介绍的都比较详尽完善，甚至比官方文档要好）。
4 选择两篇我认为比较好的博客分别clone下来[HyG](https://gaohaoyang.github.io/)，[jkunst](http://jkunst.com/).把需要的功能通读一遍，在运用到自己的博客中。

## 遇到的技术关键点

### 对不定宽元素中的内容进行水平居中

我在写导航条时遇到这个问题，首先，由三层嵌套，`div`>'ul'>'li'。我采用的方式是这样：
```css
div{
	overflow:hidden;
}
ul{
	position: relative;
	float: left;
	left: 50%;
	text-align: center;
}
li{
	float: left;
	position: relative;
	right: 50%;
}
```
实现原理:让`ul`在`div`中向右浮动50%，然后再让`li`在`ul`中向左浮动50%,其他办法请参考[六种实现水平居中的办法](http://www.w3cplus.com/css/elements-horizontally-center-with-css.html)。
### 不依靠jQuery等插件对颜色随机渐变动画

   在[jkunst](http://jkunst.com/)中，他使用了[d3.js](https://d3js.org/)库，这是一个数据驱动的插件，很有意思，以后有机会研究一下这方面知识，
简单说一下，d3和jQuery一样有自己的一套方式去操作DOM元素。在使用上略有差异，侧重点不一样。
然而我在想，为什么不直接用jQuery来改变颜色动画呢？查了资料才发现。jquery的animation方法几乎和以实现任何样式改变的动画，但是color与backgroundcolor是两个例外，如果想操纵颜色的话还必须引入，[jquery color](https://github.com/jquery/jquery-color)这个插件。
我本着尽量不适用第三方库的原则，对这些插件我内心是拒绝的。于是我决定自己写一个，最终实现了效果。代码我就不贴出来了，写的太丑，如果想看请点这里[js实现颜色渐变](https://github.com/ZinCode/ZinCode.github.io/blob/master/js/changec.js);你认为到此就结束了吗？

我们知道：“css的transition允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。”`transition`属性的讲解请参考[CSS3 Transition](http://www.w3cplus.com/content/css3-transition)于是我想，只要通过js每个一段时间给相应`div`设置一个随机颜色，并添加`transition`这条属性不就可以了吗？，试验之后发现的确可以，但是当这个`div`的其他样式（例如宽、高等）改变时，也会进行平滑过渡，但是我只是想要颜色进行过渡动画。这不是我想要的效果。

*并不是什么属性改变都为触发transition动作效果，比如页面的自适应宽度，当浏览器改变宽度时，并不会触发transition的效果。*
解决办法是在这个div元素上在套一层div，将子div样式设置为颜色以及transition属性，在父div设置其他不需要过渡效果的样式。*这里子div的宽高属性要设置为`100%`，如果设置为`inherit`任然会出先上面问题*,至此，问题完美解决。当然要实现更复杂的效果还是要借助第三方插件。

### JavaScript实现数组去重

这里先贴一个ES6的办法：
```js
var arr = [3,4,4,2,'',66,6,6,6,[22],[22],'22','22'];
function unique(array){
	return Array.from(new Set(array));
}
console.log(unique(arr)); //[3,4,2,'',66,6]
```
ES6部分的内容我还没有学习，这里不做讲解

ES5的办法：
*方案一*
利用对象方法去重

```js
Array.prototype.unique1 = function(){
	var arr = [];
	var json = [];
	for(var i = 0;i< this.length;i++){
		if(!json[this[i]]){
			arr.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return arr;
}
var arr = [22,2,'22',2,'22',1,[2],[2]];
console.log(arr.unique1())
```
可以看到，这种办法不能去除数组重复项。不能区分数字与字符串，
