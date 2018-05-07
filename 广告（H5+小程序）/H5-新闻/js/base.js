
var design = 750;
var html = document.documentElement;
var deviceWidth = html.offsetWidth;
var ratid= deviceWidth/design;
html.style.fontSize = ratid*100+"px";


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


function bannerSwiper(){
	var swiper= new Swiper('.swiper-container1',{
			pagination:".swiper-pagination",
			paginationClickable:true,
			autoplay:3000,
			observer:true,
			autoplayDisableOnInteraction : false,

		});
	var swiper1= new Swiper('.swiper-container2',{
			paginationClickable:true,
			slidesPerView:3,
			slidesPerGroup:1

		})
};

//上拉加载更多；
function loadmore(fn){
	// fn();
	function scrollFn(){
		//真实内容的高度
		var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
		//视窗的高度
		var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
		//隐藏的高度
		var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if(pageHeight - viewportHeight - scrollHeight < 20){//如果满足触发条件，执行
				
				setTimeout(fn(),2000);
				
			}
	};

	$(window).bind("scroll",scrollFn);//绑定滚动事件

}







				
