(function(){
	//先把默认的markdown生成的列表隐藏。
var body = document.querySelector('body'),
mdc = document.querySelector('#markdown-toc'),
catalog = document.querySelector('.catalog'),
article = document.querySelector('article'),
h2 = document.querySelector('header h2'),
begin, end, speed;
catalog.style.top = h2.offsetTop + h2.offsetHeight + 10 + 'px';
window.onresize = function(){
	catalog.style.top = h2.offsetTop + h2.offsetHeight + 10 + 'px';
};

mdc.style.display = 'none';

if(mdc === null){
	catalog.style.display = 'none';
} else{
	var aList = mdc.querySelectorAll('a');
	//内容转移
	var mdcContent = mdc.innerHTML;
	catalog.insertAdjacentHTML('afterbegin', mdcContent);
	mdc.parentNode.removeChild(mdc);
	//平滑滚动
	if(body.offsetWidth > 960){
		catalog.onclick = function(e){
			 try{
				 begin = article.scrollTop;
 				e.preventDefault();
 				var catId = e.target.id.substring(13);
 				var realId = article.querySelector('#' + catId);
 				end = realId.offsetTop - 20;
 				if(article.scrollHeight-article.offsetHeight < end){
 					end = article.scrollHeight-article.offsetHeight;
 				}
 				move(article, begin, end);
			} catch(ex){
				//接住点击catalog非链接部分抛出的错误
				return;
			}

		};
	}

}

//运动函数
function move(obj, begin, end){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
	 	speed = (end - article.scrollTop)/6;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		article.scrollTop += speed;
		if(article.scrollTop === end){
			clearInterval(obj.timer);
		}
		//没有考虑最后一个标题距离不够的bug

	},30);
}


}());
