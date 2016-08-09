(function(){
	// 当内容过少时，让footer固定到底部
	var article = document.querySelector('article');
	var footer = document.querySelector('footer');
	var fh = footer.offsetTop;
	var oh = document.documentElement.clientHeight || document.body.clientHeight;
	if(fh < oh - 50 ){
		article.style.position = 'relative';
		footer.style.position = 'absolute';
		footer.style.width = '100%';
		footer.style.bottom = 0 + 'px';
	}
}());
