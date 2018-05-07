/**
 * Created by Hepenghua on 2018/2/7.
 */
var base='http://bar.wjrmt.cn';
var body_width=document.body.clientWidth;
var page_num=1,total,pagesize,title_input='',str,now_number,old_number,json_data;
function size_chance() {
     if( body_width>=1212){
        var html='<div class="row col-md-4 col-sm-4 list">'+
            '</div>'+
            '<div class="row col-md-4 col-sm-4 list">'+
            '</div>'+
            '<div class="row col-md-4 col-sm-4 list">'+
            '</div>';
        $(".col").append(html);
        // old_number=3;
        renders(title_input,page_num,3);
        now_number=3;
    }else if(body_width<1212 && body_width>=680){
        var html='<div class="row col-sm-6 col-xs-6 list">'+
            '</div>'+
            '<div class="row col-sm-6 col-xs-6 list">'+
            '</div>';
            $(".col").append(html);
        // old_number=2;
        renders(title_input,page_num,2);
        now_number=2;
    }else if(body_width<680){
        var html='<div class="row list">'+
            '</div>';
            $(".col").append(html);
        // old_number=1;
        renders(title_input,page_num,1);
        now_number=1;
    }
}
size_chance();
function size_chance_number() {
    if(body_width>=1212){
        var html='<div class="row col-md-4 col-sm-4 list">'+
            '</div>'+
            '<div class="row col-md-4 col-sm-4 list">'+
            '</div>'+
            '<div class="row col-md-4 col-sm-4 list">'+
            '</div>';
        $(".col").append(html);
        // old_number=3;
        chance_document(3);
        now_number=3;
    }else if(body_width<1212 && body_width>=680){
        var html='<div class="row col-sm-6 col-xs-6 list">'+
            '</div>'+
            '<div class="row col-sm-6 col-xs-6 list">'+
            '</div>';
        $(".col").append(html);
        // old_number=2;
        chance_document(2);
        now_number=2;
    }else if(body_width<680){
        var html='<div class="row list">'+
            '</div>';
        $(".col").append(html);
        // old_number=1;
        chance_document(1);
        now_number=1;
    }
}
window.onresize=function () {
    body_width=document.body.clientWidth;
    // console.log(body_width);
    $(".col").html("");
    size_chance_number();
};
$(".new_message").on("click",function () {
    window.location.href="./add.html"
});
$(".ps-active-y ul.nav li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active")
});
$(".ps-active-y ul.nav li ul.nav li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active")
});
$(".search_button").on("click",function () {
    var value=$(this).parents(".search").find(".title_input").val();
    title_input=value;
    renders(title_input,page_num,now_number)
});
function pading(page,total,pagesize) {
    $("#page").paging({
        pageNo:page,
        totalPage: Math.ceil(total/pagesize),
        totalSize:total,
        callback: function(number) {
            page_num=number;
            renders(title_input,number,now_number)
        }
    });
}
function chance_document(number) {
    for(var i=0;i<json_data.data.length;i++){
        // console.log(i)
        // console.log(number)
        if(number==3){
            // console.log(number)
            if(i%3==0){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(0).append(str)
            }else if(i%3==1){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(1).append(str);
                // console.log(2)
            }else if(i%3==2){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(2).append(str);
                // console.log(3)
            }
        }else if(number==4){
            // console.log(number)
            if(i%4==0){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(0).append(str)
            }else if(i%4==1){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(1).append(str);
                // console.log(2)
            }else if(i%4==2){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(2).append(str);
                // console.log(3)
            }else if(i%4==3){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str)
                $(".col .list").eq(3).append(str);
                // console.log(3);
            }
        }else if(number==2){
            // console.log(i%2)
            if(i%2==0){
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str);
                $(".col .list").eq(0).append(str);
            }else if(i%2==1){
                // console.log(2)
                renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
                // console.log(str);
                $(".col .list").eq(1).append(str);
            }
        }else if(number==1){
            // console.log(number)
            renden(json_data.data[i].ismul,json_data.data[i].items,json_data.data[i].update_time);
            // console.log(str)
            $(".col .list").eq(0).append(str)
        }
    }
}
function renders(title,page,number){
    for(var i=0;i<$(".list").length;i++){
        $(".list").eq(i).html("");
    }
    $.ajax({
        url:base+'/admin/card/get_list',
        dataType:"json",
        async:false,
        data:{
            title:title,
            page:page
        },
        success:function(data){
            if(data.total==0){
                $(".col").html("<p style='text-align: center;color: #000;'>没有搜索结果，请重新输入关键字或者查看 <a href='"+base+"/admin/card/get_list' style='color: #576B95'>全部图文消息</a></p>")
            }else{
                console.log(data);
                json_data=data;
                total=data.total;
                pagesize=data.pagesize;
                pading(page,total,pagesize);
                var size=data.pagesize;
                for(var i=0;i<data.data.length;i++){
                    // console.log(i)
                    if(number==3){
                        // console.log(number)
                        if(i%3==0){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(0).append(str)
                        }else if(i%3==1){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(1).append(str);
                            // console.log(2)
                        }else if(i%3==2){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(2).append(str);
                            // console.log(3)
                        }
                    }else if(number==4){
                        // console.log(number)
                        if(i%4==0){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(0).append(str)
                        }else if(i%4==1){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(1).append(str);
                            // console.log(2)
                        }else if(i%4==2){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(2).append(str);
                            // console.log(3)
                        }else if(i%4==3){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str)
                            $(".col .list").eq(3).append(str);
                            // console.log(3);
                        }
                    }else if(number==2){
                        // console.log(i%2)
                        if(i%2==0){
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str);
                            $(".col .list").eq(0).append(str);
                        }else if(i%2==1){
                            // console.log(2)
                            renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                            // console.log(str);
                            $(".col .list").eq(1).append(str);
                        }
                    }else if(number==1){
                        // console.log(number)
                        renden(data.data[i].ismul,data.data[i].items,data.data[i].update_time);
                        // console.log(str)
                        $(".col .list").eq(0).append(str)
                    }
                }
            }

        }
    });
}
function renden(num,items,time) {
    if(num==1){
        // console.log(111111111)
        str='<div class="card" data-imd="'+items[0].mid+'">'+
   '<div class="index_content">'+
            '<i class="weui-desktop-appmsg__cover__thumb new_img" style="background-image: url('+base+items[0].cover+');"></i>'+
            // '<img src="'+base+items[0].cover+'" class="new_img">'+
            '<h3 class="index_title">'+items[0].title+'</h3>'+
            '<p class="dec">'+items[0].sumary+'</p>'+
            '<div class="weui-desktop-mask"><a href="javascript:;">预览文章</a></div>'+
            '</div>'+
            '<div class="card-content">'+
            '<p class="in_or_si_time">更新于 <time>'+time+'</time></p>'+
        '<span class="icons">'+
            '<i class="material-icons edit">&#xE150;</i>'+
       ' <i class="material-icons delete">&#xE872;</i>'+
        '</span>'+
        '</div>'+
       '</div>'
    }else{
        // console.log(2222222)
        str='<div class="card"  data-imd="'+items[0].mid+'">'+
        '<div class="slide_index">'+
        '<i class="weui-desktop-appmsg__cover__thumb new_img" style="background-image: url('+base+items[0].cover+');"></i>'+
        // '<img src="'+base+items[0].cover+'" class="new_img">'+
        ' <h3 class="slide_title">'+items[0].title+'</h3>'+
        ' <div class="weui-desktop-mask" style="visibility:hidden"><a href="javascript:;">预览文章</a></div>'+
        ' </div>'+
        '<div class="card-content">'
        // console.log(items)
        for(var i=1;i<items.length;i++){
            str+= '<div class="unimportance">'+
                '<div class="unimportance_title">'+items[i].title+'</div>'+
                '<p class="line_slide"></p>'+
                '<img src="'+base+items[i].cover+'" class="unimportance_img">'+
                '<div class="weui-desktop-mask" style="visibility:hidden"><a href="javascript:;">预览文章</a></div>'+
                ' </div>';
        }
        str+='<p class="in_or_si_time">更新于 <time>'+time+'</time>'+
            '<span class="icons">'+
            '<i class="material-icons edit">&#xE150;</i>'+
            ' <i class="material-icons delete">&#xE872;</i>'+
            '</span>'+
            '</p>'+
            '</div>'+
            '</div>';
    }
}


$(".delete").on("click",function () {
   var mid= $(this).parents(".card").attr("data-imd");
    if(window.confirm('你确定要删除吗？')){
        $.ajax({
            url:base+"/admin/card/del_cards",
            data:{
                mid:mid
            },
            success:function (data) {
                if(data.status==1){
                 location.reload()
                }else{

                }
            }
        });
    }else{

    }
});






