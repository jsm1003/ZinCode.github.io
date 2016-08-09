(function() {
	var wrap = document.querySelector('#wrap');
	var iso = new Isotope(wrap, {
		itemSelector: ".item",
		masonry: {
			columnWidth: ".item",
		},
		filter: "*"
	});

	var select = document.querySelector('#select');
	select.addEventListener('change', fn1);

	var input = document.querySelector('#input');
	input.addEventListener('keyup', fn2);

	function fn1() {
		var value = this.value == "*" ? this.value : "." + this.value;
		iso.arrange({
			filter: value,
		});
	}

	function fn2() {
		//console.time("label");
		//测试一小段程序的执行时间
		var qs = new RegExp(input.value, 'ig');
		iso.arrange({
			filter: function(item) {
				//这个函数本身会对所有item进行遍历，这里传递的参数就是item本身，如果当前item返回true则显示，
				//否则，隐藏
				return item.querySelector("p").innerText.match(qs) ? true : false
			}
		});
		//console.timeEnd("label");
		//不服跑个分
	}

	//先定义颜色
	//16进制转rgb颜色函数
	function rgbcolor(colorX) {
		if (colorX.charAt(0) != "#") {
			return colorX;
		}
		//console.time('rgb');
		var rgb = [];
		var str = colorX.replace(/#/, "");
		if (str.length === 3) {
			str = str.replace(/(.)/g, '$1$1');
		}
		str.replace(/../g, function(color) {
			rgb.push(parseInt(color, 16)); //把color看作16进制的数，解析成10进制数
			//这里写成16或者0x10都可以，不知道为什么
			//push()方法返回被修改的数组长度
			//这段代码仍然不能够完全理解

		})
		return "rgb(" + rgb.join(",") + ")";
		//console.timeEnd('rgb');     		//跑个分
	}

	var items = document.querySelectorAll(".item");
	var to, curColor;
	var fro = [241, 241, 241];
	var header = document.querySelector('header');

	for (var i = 0; i < items.length; i++) {
		items[i].timer = null;
		items[i].addEventListener('mouseover', function() {

			curColor = getStyle(header, "backgroundColor");
			to = rgbcolor(curColor).slice(4, -1).split(',');
				//这里的to数组得出的每一项都有是字符串，下面会有转换
			changeBgc(this, fro, to, 10);
			//return curColor;这里不用return就能够将变量传递到外层，因为变量实在外层声明的。
		});
		items[i].addEventListener('mouseout', function() {
			//这里不用重新在给to什么的赋值了，原因和上面一样
			changeBgc(this, to, fro, 10);
		});
	}
	//获取样式函数
	function getStyle(obj, name) {　　　　　　　　　　 //获取样式的函数
		if (obj.currentStyle) {
			return obj.currentStyle[name]; //这里用这种形式的原因是name是以字符串的形式传递过来的
		} else {
			return getComputedStyle(obj, false)[name]; //得到加上边框的总宽
		}
	}

	function changeBgc(obj, begin, end, spe) {
		var speed = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			speed += spe;
			obj.style.backgroundColor = 'rgb(' +
				parseInt((speed / 100 * (+end[0] - +begin[0]) + +begin[0])) + ',' +
				parseInt((speed / 100 * (+end[1] - +begin[1]) + +begin[1])) + ',' +
				parseInt((speed / 100 * (+end[2] - +begin[2]) + +begin[2])) + ')';
			//这里写加号是为了把变量to中的每一项由字符串变为数字
			if (speed >= 100) {
				clearInterval(obj.timer);
					//像这么写的话绝对是同时运动，同时到达终点，所以没必要判断是否同时到达终点
			}
		}, 30);
	}

}());
