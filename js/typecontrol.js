(function() {

  /* http://stackoverflow.com/questions/5699127/how-to-find-out-the-position-of-the-first-occurrence-of-the-difference-between-t */
  function findDiff(a, b) {
    a = a.toString();
    b = b.toString();
    for (var i = 0; i <= Math.min(a.length, b.length); i++) {
      if (a.charAt(i) !== b.charAt(i)) { return i; }
//用来比较该元素与上一个元素
    }
    if (a.length !== b.length) { return Math.min(a.length, b.length); }
	//这一行代码的意思是如果上面return的值为undefined，则会执行这句代码，把undefined值替换掉
    //return -1;

  }

  data = [
    "Hello!",
    "I'm Josephine",
    "I'm a #js #coder",
    "I'm a music lover",
    "I'm a coder wrangler",
    //"I'm a data explorer",
    //"I'm a data asdf... :B",
    "I <3 my familiy",
    "I <3 code",
    "I <3 Gothic Metal",
    //"I <3 R",
    "Thanks for your visit （￣︶￣）↗ ",
    ""
    ];
//map方法会给callback函数传递三个参数，正在遍历的元素本身，元素索引，原数组本身，
//所以下面的callback只接受前两个参数，而第三个参数被忽略。
  data_ss = data.map(function(d, i){
    return ((i===0) ? 0 : findDiff(data[i], data[i - 1]));
  });
  data_ss.shift(); // 删除该数组中的第一项。
 //修改了原数组
 var typed = document.querySelector('#typed');
  $('#typed').typed({
      strings: data,
      stringsstops: data_ss,
      startDelay: 3500,
      typeSpeed: 130
  });

})();
