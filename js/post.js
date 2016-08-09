(function(){
	//先把默认的markdown生成的列表隐藏。
var mdc = document.querySelector('#markdown-toc');
mdc.style.display = 'none';
var catalog = document.querySelector('.catalog');
if(mdc === null){
	catalog.style.display = 'none';
} else{
	//用到插件scroll.js，所以要添加class属性为scroll
	var aList = mdc.querySelectorAll('a');
	for(var i = 0;i<aList.length;i++){
		aList[i].setAttribute('class', 'scroll');
	}
	//内容转移
	var mdcContent = mdc.innerHTML;
	catalog.insertAdjacentHTML('afterbegin', mdcContent);

}
}());
