---
layout: post
title:  "javascript基础强化"
date:   2016-08-10 22:24:3
categories: javascript
tags: javscript
---

* content
{:toc}
tips:
1.第一种是==比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是===比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。

由于JavaScript这个设计缺陷，不要使用==比较，始终坚持使用===比较。

2.变量在JavaScript中就是用一个变量名表示，变量名是大小写英文、数字、$和_的组合，且不能用数字开头。变量名也不能是JavaScript的关键字，如if、while等。申明一个变量用var语句，比如：





3.在JavaScript中，使用等号=对变量进行赋值。可以把任意数据类型赋值给变量，同一个变量可以反复赋值，而且可以是不同类型的变量，但是要注意只能用var申明一次，

### 严格模式
ES6
由于多行字符串用\n写起来比较费事，所以最新的ES6标准新增了一种多行字符串的表示方法，用` ... `表示：
`这是一个
多行
字符串`

ES6 模板字符串
字符串拼接方式可以这样写，
var name = '小明';
var age = 20;
var message = `你好, ${name}, 你今年${age}岁了!`;
alert(message);

要获取字符串某个指定位置的字符，使用类似Array的下标操作，索引号从0开始：
var str = 'I'm a coder;
str[2]		//m
str[0]		//I
需要特别注意的是，字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：
Array可以通过索引把对应的元素修改为新的值，因此，对Array的索引进行赋值会直接修改这个Array：

substring

substring()返回指定索引区间的子串：

var s = 'hello, world'
s.substring(0, 5); // 从索引0开始到5（不包括5），返回'hello'
s.substring(7); // 从索引7开始到结束，返回'world'


## Array

slice()就是对应String的substring()版本，它截取Array的部分元素，然后返回一个新的Array：
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']

注意到slice()的起止参数包括开始索引，不包括结束索引。
如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array：
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false

## 对象

JavaScript对象的键都是字符串类型，值可以是任意数据类型

JavaScript用一个{...}表示一个对象，键值对以xxx: xxx形式申明，用,隔开。注意，最后一个键值对不需要在末尾加,，如果加了，有的浏览器（如低版本的IE）将报错。

但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用''括起来：

var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School'
};

如果访问一个不存在的属性会返回什么呢？JavaScript规定，访问不存在的属性不报错，而是返回undefined：
xiaohong.age   //undefined

如果我们要检测xiaoming是否拥有某一属性，可以用in操作符：
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
'name' in xiaoming; // true
'grade' in xiaoming; // false

不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的：

'toString' in xiaoming; // true
因为toString定义在object对象中，而所有对象最终都会在原型链上指向object，所以xiaoming也拥有toString属性。

要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：

if...else...语句的执行特点是二选一，在多个if...else...语句中，如果某个条件成立，则后续就不再继续判断了

JavaScript把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true，因此下面代码条件判断的结果是true。
var str = 'hello';
if(str.length){		//true

}

由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引：

var a = ['A', 'B', 'C'];
for (var i in a) {
    alert(i); // '0', '1', '2'
    alert(a[i]); // 'A', 'B', 'C'
}
请注意，for ... in对Array的循环得到的是String而不是Number。

## FUNCTION

如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。
var abx = function(){};
注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束。
function abx(){} 这种方式不用加;

#### arguments
实际上arguments最常用于判断传入参数的个数。你可能会看到这样的写法：

	// foo(a[, b], c)
	// 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
	function foo(a, b, c) {
	    if (arguments.length === 2) {
	        // 实际拿到的参数是a和b，c为undefined
	        c = b; // 把b赋给c
	        b = null; // b变为默认值
	    }
	    // ...
	}
	要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。

#### apply 与call
与apply()类似的方法是call()，唯一区别是：

apply()把参数打包成Array再传入；

call()把参数按顺序传入。

比如调用Math.max(3, 5, 4)，分别用apply()和call()实现如下：

Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
对普通函数调用，我们通常把this绑定为null。

##### 装饰器

利用apply()，我们还可以动态改变函数的行为。

JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。

现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，然后手动加上count += 1，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：

var count = 0;
var oldParseInt = parseInt;
window.parseInt = function(){
	count +=1;
	oldParseInt.apply(null, arguments);
}
parseInt('10');
parseInt('10xs');
parseInt('3das');
console.log(count);

### 高阶函数map与reduce与filter

map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串：

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
只需要一行代码。

#### filter

判断素数
function primes(s){
	return  s < 2 ? false : !/^(11+?)\1+$/.test(Array(s + 1).join('1'));
}
primes(23)  //true
[素数正则表达式](http://coolshell.cn/articles/2704.html)


### 闭包

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];
在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个Array中返回了。

你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果是：

f1(); // 16
f2(); // 16
f3(); // 16
全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。

* 这里不明白为什么到4了 *
返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
* 还有脑洞哪里不能够理解 *

### 箭头函数
x => x*x;
等价于

function(x){
	return x*x;
}

(x, y) => x * x + y * y

// 无参数:
() => 3.14

// 可变参数:
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i=0; i<rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
//返回对象：
x => ({foo: x})

#### 箭头函数中的this

箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。

//正常写法
var obj = {
	birth: 1992,
	getAge: function(){
		var birth = this.birth;
		return new Date().getFullYear() - birth;
	}
}
obj.getAge()   		//正常
//闭包写法
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
};
obj.getAge()		//报错
//箭头函数
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25
箭头函数完全修复了this的指向，this总是指向词法作用域，也就是外层调用者obj。

如果使用箭头函数，以前的那种hack写法：
var that = this;

由于this在箭头函数中已经按照词法作用域绑定了，所以，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：

var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({birth:2000}, year);
    }
};
obj.getAge(2015); // 25

### 标准对象

总结一下，有这么几条规则需要遵守：

不要使用new Number()、new Boolean()、new String()创建包装对象；

用parseInt()或parseFloat()来转换任意类型到number；

用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；

通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；

typeof操作符可以判断出number、boolean、string、function和undefined；

判断Array要使用Array.isArray(arr)；

判断null请使用myVar === null；

判断某个全局变量是否存在用typeof window.myVar === 'undefined'；

函数内部判断某个变量是否存在用typeof myVar === 'undefined'。

最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。

更细心的同学指出，number对象调用toString()报SyntaxError：

123.toString(); // SyntaxError
遇到这种情况，要特殊处理一下：

123..toString(); // '123', 注意是两个点！
(123).toString(); // '123'
不要问为什么，这就是JavaScript代码的乐趣！

### Date

获取时间戳
if(Date.now){
	alert(Date.now);		//老板ie没有now方法
} else{
	alert(new Date().getTime());
}

### RegExp

创建正则表达式的两种写法。
var reg = /ABC\-001/;
var reg = new RegExp('ABC\\-001');
第二种写法，由于字符串转义的问题，所以字符串的\\实际是\;

#### 切分字符串

var str = 'a b    c';
str.split('');		['a', 'b', '','', 'c'];
str.split(/\s/);   ['a', 'b', 'c'];
'a, b;, c,d  '.split(/[\s\;\,]+/)

#### 分组
除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用()表示的就是要提取的分组（Group）。比如：

^(\d{3})-(\d{3,8})$分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
如果正则表达式中定义了组，就可以在RegExp对象上用exec()方法提取出子串来。

exec()方法在匹配成功后，会返回一个Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。
exec()方法在匹配失败时返回null。

#### 贪婪匹配

需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的0：

var re = /^(\d+)(0*)$/;
re.exec('102300'); // ['102300', '102300', '']
由于\d+采用贪婪匹配，直接把后面的0全部匹配了，结果0*只能匹配空字符串了。

必须让\d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的0匹配出来，加个?就可以让\d+采用非贪婪匹配：

var re = /^(\d+?)(0*)$/;
re.exec('102300'); // ['102300', '1023', '00']

#### 全局搜索

var re1 = /\d+/g;
var re2 = new RegExp('\d+','g');
### 原型继承

## 浏览器对象

正确的方法是充分利用JavaScript对不存在属性返回undefined的特性，直接用短路运算符||计算：
var width = window.innerWidth || document.body.clientWidth;

#### 获取元素

document.getElementsByclassName();看dom编程艺术发现，getElementsByClassName（class）中的参数class可以设置多个类名，中间用空格分隔，类名传入顺序无所谓。
在js中id名不用选择即可用，还有另一个方法选择id ： window['id'];
#### 设置元素
innerText不返回隐藏元素的文本，而textContent返回所有文本。另外注意IE<9不支持textContent

#### 删除元素
要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉：

// 拿到待删除节点:
var self = document.getElementById('to-be-removed');
// 拿到父节点:
var parent = self.parentElement;
// 删除:
var removed = parent.removeChild(self);
//返回被删除的节点
removed === self; // true
注意到删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

当你遍历一个父节点的子节点并进行删除操作时，要注意，children属性是一个只读属性，并且它在子节点变化时会实时更新。

### 压缩代码
你看到的$函数名可能不是jQuery(selector, context)，因为很多JavaScript压缩工具可以对函数名和参数改名，所以压缩过的jQuery源码$函数可能变成a(b, c)，

我说怎么直接看一些网站的源码，人家的参数变量都是abc，搞得我一头雾水，原来是压缩过的啊

### 短路运算符

逻辑或（||）：

只要第一个值的布尔值为false，那么永远返回第二个值。
逻辑或属于短路操作，第一个值为true时，不再操作第二个值，且返回第一个值。
逻辑与（&&）：

只要第一个值的布尔值为true，那么永远返回第二个值。
逻辑与属于短路操作，第一个值为false时，不再操作第二个值，且返回第一个值。

$.fn.highlight = function(option){
	var op = option && option.color || '#333';
	var bc = option && option.backgroundColor || '#058';
}
$('#test').hightlight({
	backgroundColor: '#666'
	})

#### jquery插件扩展
$.fn.highlight = function(option){
	//合并之后的对象
	var op = $.extend({},$.fn.highlight.default,option);
		this.css('backgroundColor',op.backgroundColor).css('color',op.color);
		//返回这个对象以便后面链式调用
		return this;
}
$.fn.highlight.default = {
	color: '#666',
	backgroundColor: '#1b1b1b'
}

//用户操作
$.fn.highlight.default.color = 'red';
$('#test').highlight();

0. 给$.fn绑定函数，实现插件的代码逻辑；
1. 插件函数最后要return this;以支持链式调用；
2. 插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
3. 用户在调用时可传入设定值以便覆盖默认值。
