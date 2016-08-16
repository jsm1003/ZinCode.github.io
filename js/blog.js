(function(){
	//先把默认的markdown生成的列表隐藏。
var md = document.querySelector('#markdown-toc-section'),
nav = document.querySelector('header .nav'),
catalog = document.querySelector('.catalog');
md.style.display = 'none';
catalog.style.top = nav.offsetTop + nav.offsetHeight + 10 + 'px';
window.onresize = function(){
	catalog.style.top = nav.offsetTop + nav.offsetHeight + 10 + 'px';
};

 }());
