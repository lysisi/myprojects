$(document).ready(function() {
    localStorage.removeItem("imd");
    $("button").click(function(e){
        e.preventDefault()
    })

    var base='http://bar.wjrmt.cn';

    var util={
        init:function() {
            this.content='';
            this.type=2;
            this.group_obj();
            this.change_radio();
            this.add_con();
            this.send_wx();
            this.choose_newcard();
            this.his_lists(1);
             
        },
        group_obj:function() {
            $.ajax({
                type:"post",
                url:base+'/admin/massmsg/getTagId',
                async:false,
                success:function(res) {
                    console.log(res);
                    var res=JSON.parse(res)
                    if(res.status==true){
                        var data=res.data;
                        var str='';
                        var intval=3
                        for(var i=0;i<data.length;i++){
                            var obj=data[i];
                            if(i==0){
                                // $(".groupselect .selectpicker .bs-title-option").html(obj.tagname)
                                str+='<option value='+parseInt(i+1)+' data-id='+obj.id+'>'+obj.tagname+'</option>'
                            }else{
                                str+='<option value='+parseInt(i+1)+' data-id='+obj.id+'>'+obj.tagname+'</option>'
                            }


                            
                        };

                        var groupselect='<select class="selectpicker " data-size="" data-style="btn btn-primary btn-round" style="width:200px" tabindex="" title="">'+str+'</select>';

                        $(".groupselect").append(groupselect);
                    }
                }
            });
            $(".allselect .inner li").click(function() {
                // alert(11)
                if($(this).attr("data-original-index")==2){
                    $(".groupselect").css("display","inline-block").addClass("on");
                }else{
                    $(".groupselect").css("display","none").removeClass("on");
                };


            })

        },
        add_con:function(){
            var that=this;

             // 上传图片
             var obj=$("#otherfile")
            $(obj).change(function() {
                
                var formData = new FormData();
                formData.append("pic", this.files[0]);
                var imgUrl=getPhoto(this);
                var filepath = $(this).val();
                var extStart = filepath.lastIndexOf(".");
                //返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
                var ext = filepath.substring(extStart, filepath.length).toUpperCase();
                if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
                    alert("图片限于bmp,png,gif,jpeg,jpg格式")
                    return false;
                };

                $(".addimgbox").html("").append("<img src="+imgUrl+"")

                

                var options = {
                    url: base+'/admin/massmsg/upload_mass',
                    data: formData,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    async:false,
                    success: function(res) {
                        var res=JSON.parse(res)
                        if(res.status==true){
                            var imgData=res.data;

                            var imgUrl=imgData;
                            imgUrl=imgUrl.split(",")[0];
                            $(".addimgbox img").attr("data-src",imgData);
                            // $(".addimgbox").html("").append("<img src="+base+imgUrl+" data-src="+imgData+"/>")

                            that.local_save(curlevel,cur_first_index,cur_sec_index,false);
                            localStorage.removeItem("imgData");

                            

                        }
                    }
                }

                //异步上传
                $.ajax(options);


            });

            function getPhoto(node) {  
                var imgURL = "";  
                try{  
                    
                    var file = null;  
                    if(node.files && node.files[0] ){  
                        
                        file = node.files[0];  
                    }else if(node.files && node.files.item(0)) {  
                        file = node.files.item(0);  
                    }  
                    //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径  
                    try{  
                        
                        imgURL =  file.getAsDataURL(); 
                    }catch(e){  
                        
                        imgURL = window.URL.createObjectURL(file);  
                    }  
                }catch(e){  
                    if (node.files && node.files[0]) {  
                        var reader = new FileReader();  
                        reader.onload = function (e) {  
                            imgURL = e.target.result;  
                        };  
                        reader.readAsDataURL(node.files[0]);  
                    }  
                }  
                return imgURL;  
            }  

        },
        


        change_radio:function(){

            var targets=$(".creat_news").find(".checkbox-radios").find(".radio");
            $(targets).click(function(){
                $(this).addClass("on");
                $(this).siblings().removeClass("on");
                var curindex=$(this).index();
                $(this).parents(".card-content").find(".menu-content ul li").hide().eq(curindex).fadeIn(300);
            });

            $(targets).eq(0).find("input[type=radio]").trigger("click")




            
        },
        //发送微信预览及群发
        send_wx:function() {
            var that=this;
            function check_content() {
               
                var type=parseInt($(".checkbox-radios").find(".on").attr("data-type"));
                    that.type=type;
                       var content='';
                       console.log(type,content)
                       if(type==1){
                           content=$(".txt").val();
                           console.log(content)
                       }else if(type==3){
                           if($(".addimgbox img")){
                               content=$(".addimgbox img").attr("data-src");
                           }
                          
                       }else if(type==2){
                            if(!$(".newsbox .card")){
                                content=''
                                
                            }else{
                                content=$(".newsbox .card").attr("data-imd")
                            }
                        }
               return content
            };

            $(".btn-wx").click(function () {
               
                var content=check_content();
                // alert(content)
                // console.log(content);

                if(content==""||content==null||content==undefined){
                    that.showNotification('top','center','warning','请选择要预览的群发内容');
                    return false;
                }else{
                    that.content=content;
                    $(this).removeClass("btn-default").addClass("btn-rose");
                    $(this).attr("data-target","#send_wx");
                    $(this).attr("data-toggle","modal");
                }

                
            })
           

            

            $(".send-wx").click(function() {
                // var name=$(this).parents("#send_wx").find(".name").val();
                var curbtn=$(this)
                var name='oaL0S0kyjitgKoCcGI8yjh09ncXg';
                $.ajax({
                    type:"post",
                    url:base+'/admin/massmsg/previewMsg',
                    dataType:"json",
                    data:{'openids':name,'type':that.type,'content':that.content},
                    success:function(res) {
                        if(res.status==1){
                            $(curbtn).attr("data-dismiss","modal")
                            that.showNotification('top','center','success','发送预览成功，请留意手机微信');
                   
                        }
                    }
                })
            });

            //群发消息
            $(".btn-send").click(function() {
                
                var content=check_content();
                alert(content)
                if(content==""||content==null||content==undefined){
                    that.showNotification('top','center','warning','请选择要群发的内容');
                    return false;
                }else{
                     that.content=content;
                     var group=0;
                     var target_user='全部活跃用户';

                     if($(".groupselect").hasClass("on")){
                        target_user=$(".groupselect .inner .selected .text").html();
                       group_id(target_user);
                     }

                     function group_id(str) {
                         $(".groupselect .selectpicker option").each(function(index,item){
                            if($(item).html()==str){
                                group=parseInt($(item).attr("data-id"));
                            }


                         })
                     }


                    $.ajax({
                        type:"post",
                        url:base+'/admin/massmsg/massmsg',
                        dataType:"json",
                        async:false,
                        data:{"type":that.type,"content":that.content,"target_user":target_user,"group":group},
                        success:function(res){
                            console.log(9,res)
                        }
                    })
                }

                 

            });





            
        },

        //提示框
        showNotification: function(from, align,type,content){
            
            $.notifyClose('all');
            $("[data-notify='container']").remove();

            $.notify({
                icon: "notifications",
                message:content

            },{
                type:type,
                timer: 1000,
                offset:0,
                placement: {
                    from: from,
                    align: align
                }
            });
            // $.notifyDefaults()
        },

        //消息卡片的选中
        choose_newcard:function () {
            var that=this;
            if($(".list")){
                $(".list").click(function() {
                    // alert(11)
                    var target=$(this).find(".card .cover");
                    if(target.length==0){
                         $(this).find(".card").append("<div class='cover'><img src='img/choose.png' class='right' /></div>")
                    }
                    $(this).addClass("choose");

                    $(this).siblings().removeClass("choose");

                    var imd=$(this).find(".card").attr("data-imd");
                    localStorage.setItem("imd",imd);

                });
            }
           
            $("#newsModal .btn-sure").click(function() {
                var imd=localStorage.getItem("imd");
                if(imd==null||imd==undefined||imd==""){
                    alert("请选择一个消息卡片")
                }else{
                    $(this).attr("data-dismiss","modal")
                    var obj=$(".creat_news");

                    that.newscard(obj,imd);
                }
            });


        },
        //选中消息卡片的渲染
        newscard:function(obj,imd) {
            var that=this;
            $.ajax({
                type:"get",
                url:base+'/admin/card/get_one_cards',
                dataType:"json",
                data:{"mid":imd},
                success:function(res) {
                    // console.log(9,res.data);
                    if(res.status==1){
                        var num=parseInt(res.data.ismul);
                        var items=res.data.items;
                        var time=res.data.update_time;
                        var str='';
                        renden(num,items,time);
                        
                        function renden(num,items,time) {
                            if(num==1){
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
                                str='<div class="card"  data-imd="'+items[0].mid+'">'+
                                '<div class="slide_index">'+
                                '<i class="weui-desktop-appmsg__cover__thumb new_img" style="background-image: url('+base+items[0].cover+');"></i>'+
                                // '<img src="'+base+items[0].cover+'" class="new_img">'+
                                ' <h3 class="slide_title">'+items[0].title+'</h3>'+
                                ' <div class="weui-desktop-mask"><a href="javascript:;">预览文章</a></div>'+
                                ' </div>'+
                                '<div class="card-content">'
                                // console.log(items)
                                for(var i=1;i<items.length;i++){
                                    str+= '<div class="unimportance">'+
                                        '<div class="unimportance_title">'+items[i].title+'</div>'+
                                        '<p class="line_slide"></p>'+
                                        '<img src="'+base+items[i].cover+'" class="unimportance_img">'+
                                        '<div class="weui-desktop-mask"><a href="javascript:;">预览文章</a></div>'+
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
                            };
                            return str;
                        };

                       obj.find(".choose-news").removeClass("btn-rose").addClass("btn-success").html("重新选择");
                       obj.find(".choose-del").css("display","inline-block");

                       obj.find(".newsbox").html("").append("<div class='list choose'>"+str+"</div>");
                       obj.find(".newsbox").find(".weui-desktop-mask").css("visibility",'visible');

                    }
                    

                }
            });

            

            var target=$(obj).find(".choose-del");
            $(target).click(function(){
                // alert(222)
                $(obj).find(".choose-news").removeClass("btn-success").addClass("btn-rose").html("选择消息卡片");
                 $(obj).find(".choose-del").css("display","none");
                $(obj).find(".newsbox").html("");
                localStorage.removeItem("imd")
                
            })

        },

        //群发历史

        his_lists:function(page) {
            var that=this;
            $.ajax({
                type:"post",
                url:base+'/admin/massmsg/sendHistory',
                dataType:"json",
                data:{'page':page},
                success:function(res) {
                    if(res.status==true){
                         $("tbody").html("");
                        var count=res.data.count;
                        var data=res.data.data;
                        var pagesize=res.data.size;
                        for(var i=0;i<data.length;i++){
                            var obj=data[i];
                            var type=obj.wx_type;
                            var constr='';
                            var result=''
                            if(obj.status==1){
                                result='<div>'+
                                '<p>群发对象：<span>'+obj.target_user+'</span></p>'+
                                '<p>发送成功：<span>'+obj.send_success+'</span>人</p>'+
                                '<p>发送失败：<span>'+obj.send_failed+'</span>人</p>'+
                                '</div>'
                                
                            }else if(obj.status==0){
                                result='<p>'+obj.status_name+'</p>'
                            }
                            if(type=='news'){
                                var con=obj.content;
                                for(var j=0;j<con.length;j++){
                                    var cont=con[j];
                                    constr+='<li><a href='+cont.url+'><img src='+cont.picurl+'><p>'+cont.title+'</p><p>'+cont.description+'</p></a></li>'
                                };
                                constr='<ul>'+constr+'</ul>';
                            }else if(type=='text'){
                                constr='<p>'+obj.content+'</p>'
                            }
                            
                            var str=
                                            
                                '<tr>'+
                                    '<td>'+obj.send_time+'</td>'+
                                    '<td>'+result+'</td>'+
                                    '<td>'+
                                        constr
                                    '</td>'+
                                '</tr>'
                           
                             $(".news_history tbody").append(str)
                        };
                       
                        that.page(page,count,pagesize);

                       
                    }else{
                        $("tbody").append("<tr><td colpan='3'><p style='text-align:center'>还没有群发历史记录<p></td></tr>")
                    }
                }

            })
        },
        page:function(page,total,pagesize) {
            var that=this;
                $("#listpage").paging({
                    pageNo:page,
                    totalPage: Math.ceil(total/pagesize),
                    totalSize:total,
                    callback: function(number) {
                        page_num=number;

                        that.his_lists(page_num)
                    }
                });
        }

        


        

    };
    util.init();

    //文本框字数限制；

    $("textarea").bind('input propertychange',function(){
        var curval=$(this).val();

        var str=strlen(curval,240);
        console.log(str);
        $(this).val(str);
        var len=str.length;
        $(this).next("p").html(len+'/120');
        });
    function strlen(str,length){  
    var len=0;
    for (var i=0; i<str.length; i++) {   
     var c = str.charCodeAt(i);   
    //单字节加1   
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){   
       len+=1;   
     }   
     else {   
      len+=2;   
     }  
    
     if(len>length){
        str=str.substr(0,i);
        
     }
    

     
    } ;
    
      return str
   
} 
})

