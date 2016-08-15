(function(){
	//先把默认的markdown生成的列表隐藏。
var mdc = document.querySelector('#markdown-toc'),
catalog = document.querySelector('.catalog'),
article = document.querySelector('article'),
begin, end;

mdc.style.display = 'none';

if(mdc === null){
	catalog.style.display = 'none';
} else{
	var aList = mdc.querySelectorAll('a');
	//内容转移
	var mdcContent = mdc.innerHTML;
	catalog.insertAdjacentHTML('afterbegin', mdcContent);
	mdc.parentNode.removeChild(mdc);
	catalog.onclick = function(e){
		begin = article.scrollTop;
		e.preventDefault();
		var catId = e.target.id.substring(13);
		var realId = article.querySelector('#' + catId);
		end = realId.offsetTop - 20;
		move(article, begin, end);
	};

}

//运动函数
function move(obj, begin, end){
	clearInterval(obj.timer);
 obj.timer = setInterval(function(){
		var speed = (end - article.scrollTop)/10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		article.scrollTop += speed;
		if(article.scrollTop === end){
			clearInterval(obj.timer);
		}

	},30);
}


}());
