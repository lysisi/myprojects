
var design = 750;
var html = document.documentElement;
var deviceWidth = html.offsetWidth;
var ratid= deviceWidth/design;
html.style.fontSize = ratid*100+"px";
function base(){
	return 'http://qayanyu.wjrmt.cn/'
	// return 'http://www.yanyu.com/'
}

//图片懒加载
function lazyload(obj){
	//图片懒加载
	var $winH = $(window).height();//获取窗口高度
	var $img = $(obj);//img选取
	var h=$(obj).height();
	var $imgH = parseInt($img.height());//图片到一半的时候显示
	runing();
	$(window).scroll(function(){
	runing();//滚动刷新
	})
	function runing(){
		
		$img.each(function(i){//遍历img
			var $src = $img.eq(i).attr("data-src");//获取当前img URL地址
			var $scroTop = $img.eq(i).offset();//获取图片位置
			if($scroTop.top + $imgH >= $(window).scrollTop() && $(window).scrollTop() + $winH >= $scroTop.top + $imgH){
				$img.eq(i).attr("src",function(){return $src}).fadeIn(300);//元素属性交换
			}
		})
	};
};
function getUrl(){
	return "https://wx.wjrmt.cn"
	// return "http://dev.micro-news.cn"
};



var elementStyle = document.createElement('div').style
var vendor = (() => {
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}










				
