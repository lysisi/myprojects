$(document).ready(function(argument) {
var localData=JSON.parse(localStorage.getItem("localData"));


if(localData==null||localData==undefined||localData==''||localData=='无数据'){
	
	var flag=false;
	var localData=[];

}else{
	var flag=false;
}

$("button").click(function(e){
	e.preventDefault()
})

var base='http://bar.wjrmt.cn';
var first_num=0;
var num=3;
var fmidnum=parseInt(num)-parseInt(first_num);
var cur_first_index=0;//当前编辑一级菜单
var cur_sec_index=0;//当前编辑二级菜单
var curlevel=1;
var iniflag=true;
var eflag=true;//遍历查询标识；
var radioflag=true;
var leaveflag=false;//页面中途


var util={
	init:function() {
		this.menuList();
		this.add_menu();
		this.del_menu();
		this.change_radio();
		this.edit_menu();
		this.web_save();
		this.menu_drag();
		this.choose_newcard();

		
	},
	menuList:function(){
		var that=this;
		if(flag==true){
			$.ajax({
				type:"post",
				url:base+'/admin/diymenu/getMenuData',
				data:"",
				async:false,
				success:function(data){
					var listData=JSON.parse(data).data;
					if(listData==[]||listData=='无数据'){
						localData=[]
					}else{
						localData=listData;
					}
					
					localStorage.setItem("localData",JSON.stringify(localData))
				}
			});
		}
		if(localData.length==0){
			return false
		}else{

			$(".save").css("display","block")
			$(".phone .on").trigger("click");
			$(".start").hide()
			$(".phone").removeClass("init_mphone").addClass("move");
			$(".creat_first_menu").fadeIn(300);
			var str='';
			var flen;
			for(var i=0;i<localData.length;i++){
				var slen=0
				flen=localData.length;
				first_num=flen;
				var obj=localData[i];
				var secstr=''
				if(obj.secondarr){
					var secobj=obj.secondarr;
					for(var j=0;j<secobj.length;j++){
						slen=secobj.length
						var sec=secobj[j];
						secstr+='<li data-id='+j+'><button class="btn btn-rose  sec-edit new_btn">'+sec.title+'</button></li>'
					};
					if(slen<5){
						secstr+='<li data-id=""><button class="btn btn-rose btn-fill sub_btn new_btn">+</button></li>'
					}
				}else{
					secstr+='<li data-id=""><button class="btn btn-rose btn-fill sub_btn new_btn">+</button></li>'
				}
				
				
				str+="<li class='fli' data-index="+i+" data-sub-index="+slen+">"+
                                       "<button class='btn btn-rose  btn-edit new_btn'>"+obj.title+"</button>"+
                                       "<ul class='subbox'>"+secstr+"</ul>"+
                                    "</li>";




			}
			if(flen<3){
				str+="<li class='fli'  data-id='' data-index='' data-sub-index=''>"+
                                       "<button class='btn btn-rose btn-fill first_btn new_btn'>+</button>"+
                                       "<ul class='subbox'></ul>"+
                                    "</li>";
			}
			
			$(".btnbox .first_menu").html("").append(str);
			if(flen<3){
				$(".phone .first_menu .fli").css({"width":100/parseInt(flen+1)+'%'})
			}else{
				$(".phone .first_menu .fli").css({"width":100/parseInt(flen)+'%'})
			}
			
			$(".phone .first_menu .fli").eq(0).children(".btn").addClass("on");

			
			
			



			

		}
		
		
	},
	add_menu:function(){
		var that=this;
		$(document).on("click",".btnbox .btn-fill",function(e){
			e.stopPropagation();
			
			
			if(parseInt(localData.length)!==0){
				console.log(curlevel,cur_first_index,cur_sec_index)
				that.local_save(curlevel,cur_first_index,cur_sec_index,false);
				localData=JSON.parse(localStorage.getItem("localData"));
				console.log(localData)
			}
			
			var obj=$(this);
			var fmidnum=parseInt(num)-parseInt(first_num);
			var sec_num=$(this).parents(".fli").attr("data-sub-index")
			var smidnum=parseInt(5-sec_num)
			if($(this).hasClass('first_btn')){
				$(".creat_first_menu").find(".content-type,.menu-content").show();
				btnswal(obj,'input-field','first_menu','添加一级菜单',fmidnum,[],0)
			}else if($(this).hasClass('sub_btn')){

				btnswal(obj,'input-field','sec_menu','添加二级菜单',smidnum,[],4)
			}

		});
		$(document).on("click",".menu-content .sub_btn",function(e){
			var obj=$(this);
			var dex=$(".btnbox .on").parent(".fli").attr("data-index");

			$(".btnbox .fli").eq(dex).find(".sub_btn").trigger("click");
		})
	
		function btnswal(target,inputclass,type,title,num,secarr,eventstype){
					if(inputclass == 'input-field'){
				        swal({
				                title: title,
				                html: '<div class="form-group">' +
				                		'<p>还能添加'+num+'个'+title.substr(2)+'</p>'+
				                          '<input id="input-field" type="text" class="form-control" placeholder="字数不能超过5个汉字或10个字母" />' +
				                      '</div>',
				                showCancelButton: true,
				                confirmButtonClass: 'btn btn-success',
				                cancelButtonClass: 'btn btn-danger',
				                buttonsStyling: false,
				                confirmButtonText: '确定',
				                cancelButtonText: '取消',

				            }).then(function(result){
				            	
				            	if(result){
				            		leaveflag=true;

				            		that.init_menu();

				            		var txt=$("#input-field").val();
				            		var level=1
				            		
				            		$(".btnbox .btn-fill").removeClass("on").css({"background":"#f5f5f5","color":"#666"});
				            		
				            		if(type=='first_menu'){
				            			if($(".phone").hasClass("init_mphone")){
				            				$(".start").hide()
				            				$(".phone").removeClass("init_mphone").addClass("move");
				            			}
				            			$(".creat_first_menu .form-control").val(txt)
				            			$(".creat_first_menu").fadeIn(300);
				            			$(".creat_sec_menu").fadeOut(300);
				            			$(".btn").removeClass("on")
				            			$(target).removeClass("first_btn btn-fill").html(txt).addClass("on btn-edit");
				            			$(".creat_first_menu").find(".radio").eq(0).find("input[type=radio]").trigger("click");
				            			// that.change_radio('.creat_first_menu',true);
				            			$(".save").css("display","block")
				            			creat_first_menu(target);


				            			$(target).parent(".fli").attr("data-index",parseInt(first_num-1));
				            			$(target).parent(".fli").attr("data-sub-index","0")

				            			var menuData={
				            				'title':txt,
				            				"secondarr":secarr,
				            				"content":"",
				            				"eventstype":eventstype,
				            			};
				            			localData.push(menuData);

				            			cur_first_index=parseInt($(target).parent(".fli").attr("data-index"))
				            			curlevel=1
				            		}else{
				            			$(".creat_sec_menu .form-control").val(txt)
				            			$(".creat_sec_menu").fadeIn(300);
				            			$(".creat_first_menu").fadeOut(300);
				            			$(".btn").removeClass("on");
				            			// $(target).parent("li").attr("data-id",seclen)
				            			$(target).removeClass("sub_btn btn-fill").html(txt).addClass("on sec-edit");
				            			$(".creat_sec_menu").find(".radio").eq(0).find("input[type=radio]").trigger("click");
				            			// that.change_radio('.creat_sec_menu',true);
				            			$(".save").css("display","block")
				            			creat_sec_menu(target);

				            			

				            			var dex=parseInt($(target).parents(".fli").attr("data-index"));

				            			var menuData={
				            				'title':txt,
				            				'content':'',
				            				"eventstype":eventstype
				            			}
				            			localData[dex].secondarr.push(menuData);


				            			cur_first_index=dex;
				            			cur_sec_index=parseInt($(target).parent("li").index());
				            			curlevel=2

				            		}
				            		localStorage.setItem("localData",JSON.stringify(localData))
				            		
				            		
				            		
				            		
				            	}
				                
				            }).catch(swal.noop)
			        }
				};

		//生成一级菜单
		function creat_first_menu(target){
			first_num=parseInt(first_num+1);
			fmidnum=parseInt(num)-parseInt(first_num);
			if(first_num<3){
				var html='<li class="fli" data-index='+first_num+' data-sub-index="0" data-id=""><button class="btn btn-rose btn-fill first_btn new_btn">+</button><ul class="subbox"></ul></li>'
				$(".phone .first_menu").append(html);
				$(target).parent("li.fli").find("ul.subbox").append('<li data-id=""><button class="btn btn-rose btn-fill sub_btn new_btn" data-id="">+</button></li>')
					$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num+1)+'%'})
				
			}else if(first_num==3){

				$(target).parent("li.fli").find("ul.subbox").append('<li><button class="btn btn-rose btn-fill sub_btn new_btn" data-id="">+</button></li>')
				$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num)+'%'})
			}

		}

		//生成二级菜单
		function creat_sec_menu(target){
			var sublen= parseInt($(target).parents(".fli").attr("data-sub-index"));
			sublen=parseInt(sublen+1);
			$(target).parent("li").attr("data-id",parseInt(sublen-1))
			if(sublen<5){
				var html='<li data-id=""><button class="btn btn-rose btn-fill sub_btn new_btn" >+</button></li>'
				$(target).parents(".subbox").append(html);
				$(target).parents(".fli").attr("data-sub-index",parseInt(sublen))
				
			}
		}


				 // 上传图片
				 var obj=$("#inputfile,#otherfile")
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
		            }

		            

		            var options = {
		                url: base+'/admin/diymenu/upload_diymenu',
		                data: formData,
		                contentType: false,
		                processData: false,
		                type: 'POST',
		                async:false,
		                success: function(res) {
		                	var res=JSON.parse(res)
		                	if(res.status==true){
		                		var imgData=res.data;
		                		console.log(11,imgData)

		                		var imgUrl=imgData;
		                		imgUrl=imgUrl.split(",")[0];
		                		$(".addimgbox").html("").append("<img src="+base+imgUrl+" data-src="+imgData+">")

		                		that.local_save(curlevel,cur_first_index,cur_sec_index,false);
		                		// localStorage.removeItem("imgData");

		                		

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
	del_menu:function(){
		var that=this;
		//删除菜单
		$(document).on("click",".card .del",function(){
			var curli=$(".phone .on").parent("li");
				swal({
			        title: '确定删除此菜单吗？',
			        text: "",
			        type: 'warning',
			        showCancelButton: true,
			        confirmButtonClass: 'btn btn-success',
			        cancelButtonClass: 'btn btn-danger',
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        buttonsStyling: false,
				    }).then(function(result) {
					     if(result==true){
					     	if(curli.hasClass("fli")){
					     		var dex=parseInt(curli.attr("data-index"));
					     		localData=localData.filter(function(item,index){
					     			return index!==dex;
					     		});
					     		if(localData==[]){

					     		}
					     	}else{
					     		var secdex=curli.index();
					     		var dex=parseInt(curli.parents(".fli").attr("data-index"));
					     		var secData=localData[dex].secondarr;
					     		localData[dex].secondarr=secData.filter(function(item,index){
					     			return index!==secdex;
					     		});
					     		if(localData[dex].secondarr.length==0){
					     			$(".creat_first_menu").find(".content-type,.menu-content").show();
					     		}
					     		
					     	}
					     }
					     localStorage.setItem("localData",JSON.stringify(localData));
					     window.location.reload()

				    	});
			
			
		})
		
	},


	edit_menu:function(){
		var that=this;

		$('.btnbox').on("click",".btn-edit",function(e){
			radioflag=false;
			$(".errortip").hide();
				var obj=$(this).parent("li");
			var curradio=0;
			$(".btn-edit").removeClass("on")
			$(".sec-edit").removeClass("on")
			$(this).addClass("on")
			var level=1;
			var type=0
			var editData='';
			var len;
			var content='';
				
			var dex=parseInt(obj.attr("data-index"));

			editData=localData[dex];

			len=parseInt($(obj).find(".subbox").find(".sec-edit").length);
			if(len==0){
				$(".creat_first_menu").find(".content-type,.menu-content").show();
				type=editData.eventstype;
				content=editData.content;
			}else{
				$(".creat_first_menu").find(".content-type,.menu-content").hide();
			}


			$(".creat_first_menu").attr("data-index",dex);
			$(".creat_first_menu").show();
			$(".creat_sec_menu").hide();
			var title=editData.title;
			// that.change_radio('.creat_first_menu');
			if(iniflag!==true){
				that.local_save(curlevel,cur_first_index,cur_sec_index,false);
			}
			
			init_edit('.creat_first_menu',type,title,content,len);
			curlevel=1;
			cur_first_index=dex;
			

	

		});
		$('.btnbox').on("click",".sec-edit",function(e){
			radioflag=false;
			$(".errortip").hide();
				var obj=$(this).parent("li");
			var curradio=0;
			$(".btn-edit").removeClass("on")
			$(".sec-edit").removeClass("on")
			$(this).addClass("on")
			var level=2;
			var type=4;
			var editData='';
			var len;
			
				
			level=2;
			
			var dex=parseInt(obj.parents(".fli").attr("data-index"));
			var secdex=obj.index();

			editData=localData[dex].secondarr[secdex];
			$(".creat_sec_menu").show();
			$(".creat_first_menu").hide();

			var title=editData.title;
			var content=editData.content;
			type=editData.eventstype;

			that.local_save(curlevel,cur_first_index,cur_sec_index,false);
			init_edit('.creat_sec_menu',type,title,content);
			curlevel=2
						
			cur_first_index=dex;
			cur_sec_index=secdex;
			
			
			

		



		});
		

		//编辑初始渲染；
		function init_edit(obj,type,title,content,seclen){
			var radiotype=type;
			// alert(radiotype)
			iniflag=false;
			// 判断一级菜单下时候有子菜单
			if(seclen==0||seclen==undefined||seclen==''||seclen==null){
				$(obj).find(".menu_title").val(title);
				var targets=$(obj).find(".checkbox-radios .radio");
				
				for(var i=0;i<targets.length;i++){
					
					var tar=$(targets).eq(i).attr("data-type");
					if(radiotype==tar){

						$(targets).eq(i).find("input[type=radio]").trigger("click")
						$(obj).find(".menu-content ul li").eq(i).fadeIn(300).siblings("li").fadeOut(300);
						var curcon=$(obj).find(".menu-content ul li").eq(i);
						if(radiotype==4){
							curcon.find(".netlink").val(content)
						}else if(radiotype==1){
							if(content==''){
								$(obj).find(".choose-news").removeClass("btn-success").addClass("btn-rose").html("选择消息卡片");
		         				$(obj).find(".choose-del").css("display","none");
								$(".newsbox").html("");
							}else{
								
		         				that.newscard(obj,content);

							}
						}else if(radiotype==2){
							curcon.find("textarea").val(content);
						}else if(radiotype==3){
							if(content!==null||content!==""||content!==undefined){
								var imgUrl=content.split(',')[0];
								$(".addimgbox").html("").append("<img src="+base+imgUrl+" data-src="+content+">")
							}else if(content==""){
								$(".addimgbox").html("+")
							}
							

							
						}


						break;
					}

				}
					
			}else{
				$(obj).find(".menu_title").val(title);
			}

			


			
		};

		$(".phone .first_menu .on").trigger("click");

		
	},

	change_radio:function(){
		var obj=$(".creat_first_menu,.creat_sec_menu")
		var targets=$(obj).find(".checkbox-radios").find(".radio");
		$(targets).click(function(){
			leaveflag=true
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			var curindex=$(this).index();
			$(this).parents(".card-content").find(".menu-content ul li").hide().eq(curindex).fadeIn(300);
		});

		if(radioflag){
			$(obj).find(".addimgbox").html("+");
		}




		
	},


	local_save:function(level,first_index,sec_index,flag){
		var that=this;
		
		eflag=true;
		if(level==1){
			var obj=$(".creat_first_menu");
			var type=0;
			var title='';
			var content='';
			if(parseInt($('.fli').eq(first_index).attr("data-sub-index"))!==0){
				title=$(obj).find(".menu_title").val();
				type=0;
				content='';
				if(flag==true){

					if(title==''){
						$(".errortip span").html("菜单名称");
						$(".errortip").css("display","block");
						eflag=false;
						return false;
					}
				}
			}else{
				title=$(obj).find(".menu_title").val();
				type=parseInt($(obj).find(".on").attr("data-type"));
				if(type==null||type==undefined||type==NaN){
					type=4;
				}
				content='';
				if(type==4){
					content=$(obj).find(".netlink").val();
				}else if(type==1){
					if($(obj).find(".newsbox").html()!==''){
						content=$(obj).find(".newsbox .card").attr("data-imd");
						
					}else{
						content='';
					}
					
				}else if(type==2){
					content=$(obj).find("textarea").val();
					// console.log(9,content)
				}else if(type==3){
						if($(obj).find(".addimgbox img")){
						content=$(obj).find(".addimgbox img").attr("data-src");
					}else{
						content=""
					}


				}else if(type==0){
					content=''
				}

				if(flag==true){
					if(title==''){
						$(".errortip span").html("菜单名称");
						$(".errortip").css("display","block");
						eflag=false;
						return false;
					}else if(content==''){
						$(".errortip span").html("菜单内容");
						$(".errortip").css("display","block");
						eflag=false;
						return false;
					}
				}
			}

			console.log(12,type);
			console.log(13,localData,first_index);

			localData[first_index].eventstype=type;
			localData[first_index].title=title;
			localData[first_index].content=content;
			localStorage.setItem("localData",JSON.stringify(localData));
			console.log(first_index,localData[first_index].content);

		}else if(level==2){
			var obj=$(".creat_sec_menu");
			var title=$(obj).find(".menu_title").val();
			var type=parseInt($(obj).find(".on").data("type"));
			
			var content='';
			if(type==4){
				content=$(obj).find(".netlink").val();
				alert(content)
			}else if(type==1){
				if($(obj).find(".newsbox").html()!==''){
						content=$(obj).find(".newsbox .card").attr("data-imd");
						
					}else{
						content='';
					}
			}else if(type==2){
				content=$(obj).find("textarea").val();
			}else if(type==3){
				if($(obj).find(".addimgbox img")){
					content=$(obj).find(".addimgbox img").attr("data-src");
				}else{
					content=""
				}
				


				
			}

			if(flag==true){
				if(title==''){
					$(".errortip span").html("菜单名称");
					$(".errortip").css("display","block");
					eflag=false;
					return false;
				}else if(content==''){
					$(".errortip span").html("菜单内容");
					$(".errortip").css("display","block");
					eflag=false;
					return false;
				}
			}

			localData[first_index].secondarr[sec_index].title=title;
			localData[first_index].secondarr[sec_index].content=content;
			localData[first_index].secondarr[sec_index].eventstype=type;
			localData[first_index].eventstype=0;
			localData[first_index].content='';

			
		}
		localStorage.setItem("localData",JSON.stringify(localData));



	},

	web_save:function(){
		var that=this;
		var saveFlag=true;
		$('.savebtns ').on("click",".btn-save,.btn-wx",function(){
			eflag=true;
			var curbtn=this;
			that.local_save(curlevel,cur_first_index,cur_sec_index,true);
			localData=JSON.parse(localStorage.getItem("localData"));
			console.log(localData);
			if(eflag==true){
				//提交信息提示；
				for(var i=0 ;i<localData.length;i++){
					var obj=localData[i];
					
					if(parseInt(obj.secondarr.length)!==0){

						if(obj.title==''){
							$(".fli").eq(i).find(".btn-edit").trigger("click");
							$(".errortip span").html("菜单名称");
							$(".errortip").css("display","block");
							 saveFlag=false;
							return false;
						}
						for(var j=0;j<obj.secondarr.length;j++){
							var secobj=obj.secondarr[j]
							if(secobj.title==''||secobj.content==''){
								$(".fli").eq(i).find(".subbox .sec-edit").eq(j).trigger("click");
								if(secobj.title==''){
									$(".errortip span").html("菜单名称");
								}else if(secobj.content==''){
									$(".errortip span").html("菜单内容");
								}
								
								$(".errortip").css("display","block");
								saveFlag=false;
								return false;
							}
						}

					}else{
						console.log(localData)
						if(obj.title==''||obj.content==''){
							$(".fli").eq(i).find(".btn-edit").trigger("click");
							if(obj.title==''){
								$(".errortip span").html("菜单名称");
							}else if(obj.content==''){
								$(".errortip span").html("菜单内容");
							}
							
							$(".errortip").css("display","block");
							saveFlag=false;
							return false;
						}

					}

					// if(i==parseInt(localData.length-1)){
						
					// }


					

				};
				console.log(2,saveFlag)

				if(saveFlag==true){
					var cachaData=localStorage.getItem("localData");
					console.log(9,cachaData)

					$.ajax({
						type:"post",
						url:base+'/admin/diymenu/addMenu',
						data:cachaData,
						async:false,
						success:function(data){
							if(JSON.parse(data).status==true){
								$(".errortip").hide()
								leaveflag=false;
								if($(curbtn).hasClass("btn-wx")){
									$.ajax({
										type:"post",
										url:base+'/admin/diymenu/pubMenuToWx',
										success:function(res) {
											// alert(res)
										}

									})
								}
							}
						}
					})
				}

			}
			




			
			
		});


	},

	//菜单拖拽事件

	menu_drag:function(){
		var that=this;

		$(".btn-sort").click(function(argument) {
			$(".btn-edit,.sec-edit").removeClass("on");
			if(!$(".first_btn")){
				$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num)+'%'})
			}else{
				$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num)+'%'})
				$(".first_btn").parent("li").css("display","none")
			}
			if($(".sub_btn")){
				$(".sub_btn").parent("li").hide();
			}


			
			$(this).css("display","none");
			$(".btn-finish").css("display","inline-block");
			$(".creat_menu").hide()
			$(".savebtns").hide()
			$(".sort-tip").css("display","block");

			$(".btnbox .first_menu .fli").arrangeable();
			$(".fli .subbox li").arrangeable();



		});

		$(".btn-finish").click(function(argument) {
			$(".phone .first_menu .fli").eq(0).find(".btn-edit").addClass("on");
			if($(".fli .btn").hasClass("first_btn")){
				$(".first_btn").parent("li").css("display","block");
				$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num+1)+'%'})
				
			}else{
				$(".phone .first_menu .fli").stop(true,true).animate({"width":100/parseInt(first_num)+'%'})
			}
			if($(".sub_btn")){
				$(".sub_btn").parent("li").show();
			}
			
			$(this).css("display","none");
			$(".btn-sort").css("display","inline-block");
			$(".creat_first_menu").show();
			// that.edit_menu();
			$(".phone .first_menu .on").trigger("click");
			$(".savebtns").show();
			$(".sort-tip").css("display","none");


			$(".btnbox .first_menu .fli").each(function (argument) {
				$(this).arrangeable('destroy')
			});
			$(".fli .subbox li").each(function (argument) {
				$(this).arrangeable('destroy')
			});


			// 排序结果本地保存
			var localData=JSON.parse(localStorage.getItem("localData"));

			var firstTar=$(".first_menu").find(".fli");
			var changeLD=[];
			
			$(firstTar).each(function(index,item) {
				var firstIndex=parseInt($(this).attr("data-index"));
				
				var secLen=parseInt($(this).attr("data-sub-index"));
				if(firstIndex!==''||firstIndex!==null||firstIndex!==undefined){
					//js数组的深度复制
					var midData=$.extend(true,[],localData);
					var data=midData[firstIndex];
					changeLD[index]=data;
				}
				
				
				if(secLen!==0){
					var secTar=$(this).find(".subbox li");
					changeLD[index].secondarr=[];
					secTar.each(function(secindex,item) {
						if($(item).attr("data-id")==''){
							return;
						}
						var secIndex=parseInt($(item).attr("data-id"));
						if(secIndex!==NaN){
							var secData=localData[firstIndex].secondarr[secIndex]
							changeLD[index].secondarr.push(secData);
						}
						

					})
				};

				if(index==parseInt($(firstTar).length-1)){
					localStorage.setItem("localData",JSON.stringify(changeLD))
				}
				

			});


			


		});



	},

	//消息卡片的选中
	choose_newcard:function () {
		var that=this;
		$(document).on("click",".list .card",function() {
		    var target=$(this).find(".cover");
		    if(target.length==0){
		         $(this).append("<div class='cover'><img src='img/choose.png' class='right' /></div>")
		    };
		    $(".card").removeClass("choose");
		    $(this).addClass("choose");

		    // $(this).siblings().removeClass("choose");

		    var imd=$(this).attr("data-imd");
		    localStorage.setItem("imd",imd);

		});
		$("#newsModal .btn-sure").click(function() {
		    var imd=localStorage.getItem("imd");
		    if(imd==null||imd==undefined||imd==""){
		        alert("请选择一个消息卡片")
		    }else{
		        if(curlevel==1){
		        	var obj=$(".creat_first_menu");
		        }else if(curlevel==2){
		        	var obj=$(".creat_sec_menu");
		        };

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
				console.log(9,res.data);
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

					$(obj).find(".choose-news").removeClass("btn-rose").addClass("btn-success").html("重新选择");
 					$(obj).find(".choose-del").css("display","inline-block");

					$(obj).find(".newsbox").html("").append("<div class='list choose'>"+str+"</div>");
					$(obj).find(".newsbox").find(".weui-desktop-mask").css("visibility",'visible');

				}
				

			}
		});

		

		// var target=$(obj).find(".choose-del");

		$(".choose-del").click(function(){
			// alert(222);
			var obj=$(this).parents(".creat_menu");
			$(obj).find(".choose-news").removeClass("btn-success").addClass("btn-rose").html("选择消息卡片");
			 $(obj).find(".choose-del").css("display","none");
			$(obj).find(".newsbox").html("");
			 that.local_save(curlevel,cur_first_index,cur_sec_index,false);
		})

	},

	//初始化编辑框

	init_menu:function() {
		$(".netlink").val("");
		$("textarea").val("");
		$(".errortip").css("display","none");
		$(".newsbox").html("");
		$(".choose-news").removeClass("btn-success").addClass("btn-rose").html("选择消息卡片");
		$(".choose-del").css("display","none");
		$(".addimgbox").html("+");

	}





};


// if(localData!==null&&localData!==''&&localData!==undefined){
// 	util.init();

// };

util.init();

window.onbeforeunload=function(){
    return "你确定要离开吗?";
};

var allen=0;
$(".menu_title").bind('input propertychange',function(){
    var curval=$(this).val();
    // var obj=$(this);
   	var str=strlen(curval,10);
   	console.log(str);
   	$(this).val(str);

   
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

//网址正则判断；

$(".netlink").blur(function(){
    var curval=$(this).val();
    var obj=$(this);
    CheckUrl(obj,curval);   	
});

function CheckUrl(obj,val){
 var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
 if(!reg.test(val)){
 alert("请输入正确的网址！");
 $(obj).val("")

 }
 
};



//文本框字数限制；

$("textarea").bind('input propertychange',function(){
	var curval=$(this).val();

	var str=strlen(curval,240);
   	console.log(str);
   	$(this).val(str);
   	var len=str.length;
   	$(this).next("p").html(len+'/120');

})




})
