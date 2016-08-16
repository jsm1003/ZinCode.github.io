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

### 高阶函数map与reduce

map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串：

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
只需要一行代码。
