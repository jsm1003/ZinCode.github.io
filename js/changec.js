(function() {
    var header = document.querySelector('header'),
        body = document.querySelector('body'),
        links = document.querySelectorAll('.link'),
        bar = document.querySelectorAll('.bar'),
        begin, end;
    var colors = [
        "#B71C1C", // red
        "#1A237E", // indigo blue 以后可能要删除
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
    header.style['background-color'] = begin;
    setInterval(function() {
        end = colors[Math.floor(Math.random() * colors.length)];
        var rb = rgb(begin),
            re = rgb(end);
        changeColor(rb, re);
        begin = end;
    }, 20000);


    function changeColor(begin, end) {
        var speed = 0;
        var timer = setInterval(function() {
            speed += 1;
            header.style['background-color'] = 'rgb(' +
                parseInt(speed * Math.round((end[0] - begin[0]) / 70) + begin[0]) + ',' +
                parseInt(speed * Math.round((end[1] - begin[1]) / 70) + begin[1]) + ',' +
                parseInt(speed * Math.round((end[2] - begin[2]) / 70) + begin[2]) + ')';
            if (speed >= 70) {
                clearInterval(timer);
            }
        }, 30);//选择30ms是为了变化更加平滑
    }
    //颜色转换成需要格式
    function rgb(colorX) {
        if (colorX.charAt(0) != "#") {
            return colorX;
        }
        //console.time('rgb');
        var rgb = [];
        var str = colorX.replace(/#/, "");
        if (str.length === 3) {
            str = str.replace(/(.)/g, '$1$1');
        }
        for (var i = 0; i < 3; i++) {
            rgb.push(parseInt('0x' + str.substr(i * 2, 2))); //将字符串每两个一组放到数组中
        }
        return rgb;
    }

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
