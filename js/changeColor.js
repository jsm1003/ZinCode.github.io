(function() {
    var inner = document.querySelector('#inner'),
        body = document.querySelector('body'),
        links = document.querySelectorAll('.link'),
        bar = document.querySelectorAll('.bar'),
        begin, end;
    var colors = [
        "#B71C1C", // red
		"7b5d5f",
		"4d4d4d",
        "#004D40", // teal
        "#212121", // gray
        "#1FA67A", // FontAwesome color
        "#058",
        "#976f3c", //yellow
        "#455a64", //gray
        "#db4437", //red
        "#75572e", //dark yellow
        "#d32f2f", //red
        "#1b5e20" //green
    ];
    setTimeout(function() {
        body.style.opacity = 1;
        body.style.filter = 'alpha(opacity=100)';
    }, 500);
    var randFirst = Math.floor(Math.random() * colors.length); //感觉这里还能够在改进一下
    begin = colors[randFirst];
    inner.style['background-color'] = begin;

	setInterval(function(){
		var rand = Math.floor(Math.random() * colors.length);
		inner.style['background-color'] = colors[rand];
	},18000);

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function(e) {
            e.preventDefault();
            var goTo = this.href;
            body.style.opacity = 0;
            setTimeout(function() {
                window.location.href = goTo;
            }, 1000);
        };
    }

}());
