$(document).ready(function(){
	var disX,disY=0;
	var sourceCenterX,sourceCenterY=0;
	var sourceW,sourceH=0
	var num="";
	var photoW=0;
	var left,curtop=0;
	var sourceimg='';
	//判断移动端轻触事件；
	var startTime=0;
	var isMove=false;
	var delayTime=200;
	var weight=0;
	var height=0;
	//三维
	var three_x=0;
	var three_y=0;
	var three_t=0;
			
	var personal={
		init:function() {
			this.uid='15231069699';
			this.sign='jkjkjkj';
			this.order=1;
			this.privatequestions()
			this.photoLists();
			this.inforLists();
			this.initval();
			this.edit_infor();
			this.dragPhoto();
			this.hobbylist();
			
		},
		
		photoLists:function(){
			$.ajax({
				type:"get",
				url:base()+'/api/pics/index',
				dataType:"json",
				async:false,
				data:{"uid":this.uid,"sign":this.sign},
				success:function(res){
					// var data=JSON.parse(res);
					var data=res;
					if(res.status=='success'){
						var photos=data.data.contents;
						$(".photos li img").attr("src","");
						for(var i=0;i<photos.length;i++){
							var obj=photos[i];
							$(".photos li").each(function(index,item){
								if(parseInt(index+1)==parseInt(obj.orders)){
									$(item).find("img").attr("src",obj.path)
								}
							})
						}
					}
				}

			});

		},
		inforLists:function(){
			$.ajax({
				type:"get",
				url:base()+'/api/userinfo/get',
				dataType:"json",
				async:false,
				data:{"uid":this.uid},
				success:function(res){
					// alert(22)
					// var data=JSON.parse(res);
					var data=res;
					console.log(data)
					if(res.status=='success'){
						var infor=data.data;
						$("#avatar .headphoto").attr("src",infor.avatar);
						$(".my_infor .head").attr("src",infor.avatar);
						$("#nicheng .nicheng").html(infor.nickname);
						$(".my_infor .my_name").html(infor.nickname);
                        $(".my_infor .my_heart").html(infor.mood_ext);
                        $(".my_infor .my_label .age").html(infor.age);
                        $(".my_infor .my_label .constellation").html(infor.ext.xz);
                        $(".my_infor .my_label .constellation").css("background",infor.ext.color);
                        $(".my_infor .heart").attr("src",infor.mood);
						if(infor.sex==1){
							$("#sexy .sexy").html("男");
							$("#three").css("display","none")
						}else if(infor.sex==2){
							$("#sexy .sexy").html("女");
							$("#three").css("display","block");
							var threew=infor.three_d;
							console.log(threew)
							$("#three .three").html(threew);
							var threearr=threew.split(",");
							three_x=threearr[0];
							three_y=threearr[1];
							three_t=threearr[2];
						}

						$("#birthday .birthday").html(infor.birthday);
						$("#hometown .hometown").html(infor.position);
						$("#blood .blood").html(infor.blood_type);
						$("#height .height").html(infor.height+'cm');
						height=infor.height;
						$("#weight .weight").html(infor.weight+'kg');
						weight=infor.weight;
						$("#sexway .sexway").html(infor.sex_orientation);
						$("#profession .profession").html(infor.industry);
						$("#job .job").html(infor.position);
						

						
					}
				}

			});

		},
		
		dragPhoto:function(){
			var cur=this;
			var rem=($("body").width()/750)*100;
			var target='';
			

			$(".photos li img").on("touchstart",function(event){
				var src=$(this).attr("src");	
				isMove=false;
				startTime=Date.now();
				event.stopPropagation();
				event.preventDefault();
				cur.initval();
				target=this;
				num=$(target).data("num");
				cur.order=num;
				photoW=$(target).width();
				
				var event=event||window.envent;
				var touch = event.targetTouches[0];
				intX=touch.pageX;
				intY=touch.pageY;

				left=$(target).offset().left;
				curtop=$(target).offset().top;
				
				sourceimg=src;

				

			});

			$(".photos li img").on("touchmove",function(event){
				event.preventDefault();
				var curtime=Date.now();
				var event=event||window.envent;
				var touch = event.targetTouches[0];
				disX=touch.pageX-intX;
				disY=touch.pageY-intY;
				if(parseInt(curtime-startTime)<delayTime){
					isMove=false;
					return false;
				}else{
					isMove=true;
				}
				
				
				if(isMove){
					$(target).css({"position":"absolute","top":intY-curtop-0.8*rem,"left":intX-left-0.8*rem,"width":"1.6rem","z-index":"999"});
				}
				
				
				sourceW=parseInt($(target).width()/2);
				sourceH=parseInt($(target).height()/2);
				$(target).css({"margin-left":disX-sourceW,"margin-top":disY-sourceH});

			})

			$(".photos li img").on("touchend",function(event){
				event.preventDefault();
				var curtime=Date.now();
				if(isMove){
					var event=event||window.envent;
					var touch =event.originalEvent.changedTouches[0];
					
					sourceCenterX=$(target).offset().left+parseInt($(target).width()/2);
					sourceCenterY=$(target).offset().top+parseInt($(target).height()/2);
					
					changePhoto();
					return false
				}else if(isMove==false &&(curtime-startTime)<delayTime){
					cur.photoedit(target);
				}
				
				
				

			});



			function changePhoto(){
				var targetW=0;
				var targetX=targetY=0;
				$(".photos li img").each(function(index,item){
				var src=$(this).attr("src");
				var curimg=this
					if(src!==''){
						targetW=parseInt($(this).parent("li").width());
						var curleftX=$(this).parent("li").offset().left
						var currightX=$(this).parent("li").offset().left+parseInt($(this).parent("li").width());
						var curtopY=$(this).parent("li").offset().top;
						var curbtmY=$(this).parent("li").offset().top+parseInt($(this).parent("li").height());


						targetX=$(this).parent("li").offset().left
						targetY=$(this).parent("li").offset().top;
						


						if(sourceCenterX<currightX&&sourceCenterX>curleftX&&sourceCenterY<curbtmY&&sourceCenterY>curtopY){
							$(this).stop(true,true).animate({"left":left-curleftX,"top":curtop-curtopY,"width":photoW,"position":"relative"});

							$(target).stop(true,true).animate({"position":"relative","left":targetX-left,"top":targetY-curtop,"width":targetW,"margin-left":0,"margin-top":0},function(){
								console.log(src,sourceimg)
								$(curimg).parent("li").find("img").attr("src",sourceimg);
								$(target).removeClass("on")
								$(target).parent("li").find("img").attr("src",src);

								$(".photos li img").each(function(){
									$(this).css({"position":"relative","left":"0","top":"0","width":"100%","z-index":1})
								});
							});
							var orderA=$(this).parent("li").attr("data-num");
							var orderB=$(target).parent("li").attr("data-num")

							$.ajax({
								type:"post",
								url:base()+'/api/pics/change_pic',
								dataType:"json",
								data:{"uid":cur.uid,"sign":cur.sign,"orderA":orderA,"orderB":orderB},
								success:function(res){
									console.log(res);
								}
							})

							

							return false;
						}else{
							$(target).stop(true,true).animate({"position":"relative","left":0,"top":0,"width":"100%","margin-left":0,"margin-top":0,"z-index":1});
						}
					}
				});

				

			}

				

				

			$(".photos").on("click","li",function(event){
				event.preventDefault()
				var src=$(this).find("img").attr("src");
				if(src==''){
					cur.order=$(this).attr("data-num");
					$("#images").trigger("click");
						cur.upimg()
				}
			})
			
			

			


			
		},
		initval:function(){
			disX=disY=0;
			 sourceCenterX=sourceCenterY=0;
			 sourceW=sourceH=0
			 num="";
			 photoW=0;
			 left=top=0;
			 sourceimg=''
		},

		photoedit:function(target){
			var that=this;
			//图片展示
			that.order=$(target).parent("li").attr("data-num");
			
			var src=$(target).attr("src");
			if(src!==""){
				
				var con='<ul class="camera">'+
		                	'<li class="choosepic">替换照片</li>'+
		                	'<li class="delpic">删除照片</li>'+
		                	'<li class="cancel">取消</li>'+
		                '</ul>';
                pickfn("",con);
                $(".picker-choose").hide();

				if($(target).parent("li").hasClass("cover")){
					$(".picker-content .delpic").css("display","none")
				}else{
					$(".picker-content .delpic").css("display","block")
				};

                $(".picker-content .choosepic").click(function(){
                	$("#images").trigger("click");
                    $(".picker").css("display","none")
                });
                $(".picker-content .delpic").click(function(){
                	$.ajax({
                		type:"post",
                		url:base()+'/api/pics/del_pic',
                		dataType:"json",
                		data:{"uid":that.uid,"sign":that.sign,"orders":that.order},
                		success:function(res){
                			console.log(res);
                			if(res.status=='success'){
                				$(".photos li").eq(parseInt(that.order-1)).find("img").attr("src","");
                				$(".picker").css("display","none")
                			}
                		}
                	})
                });
                 $(".picker-content .cancel").click(function(){
                	$(".picker").remove();
                });



			}else{
				$("#images").trigger("click");
				that.upimg()
			}
				
			

			


		},

		upimg:function(){
			var that=this;
			//上传图片
			$("#images").click(function() {
			    var formData = new FormData();
			    formData.append("userfile", this.files[0]);
			   formData.append("uid",that.uid);
			   formData.append("sign",that.sign);
			   formData.append("order",that.order);
			    var imgUrl=getPhoto(this);
			    var filepath = $(this).val();
			    var extStart = filepath.lastIndexOf(".");
			    //返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
			    var ext = filepath.substring(extStart, filepath.length).toUpperCase();
			    if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			        alert("图片限于bmp,png,gif,jpeg,jpg格式")
			        return false;
			    }

			    $.ajax({
			        url: base()+'api/pics/uploads',
			        data:formData,
			        contentType: false,
			        processData: false,
			        type: 'post',
			        async:false,
			        success: function(res){
			        	// console.log(1,res);
			        	alert(11)
			        	var data=JSON.parse(res)
			        	if(data.status=='success'){
			        		var imgUrl=data.data;
			        		$(".photos li").eq(parseInt(that.order-1)).find("img").attr("src",imgUrl);

			        		$(".picker").css("display","none")

			        	}else{
			        		alert(data.data);
			        	}
			        }
			    })



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
			};
		},



		edit_infor:function(){
			var that=this;
			

			//头像
			$(".personal-infor .inforlists #avatar").on("click",function(){
				$("#images").trigger("click");
				//上传图片
				$("#images").change(function() {
				    var formData = new FormData();
				    formData.append("userfile", this.files[0]);
				   formData.append("uid",that.uid);
				   formData.append("sign",that.sign);
				   formData.append("order",that.order);
				    var imgUrl=getPhoto(this);
				    var filepath = $(this).val();
				    var extStart = filepath.lastIndexOf(".");
				    //返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
				    var ext = filepath.substring(extStart, filepath.length).toUpperCase();
				    if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
				        alert("图片限于bmp,png,gif,jpeg,jpg格式")
				        return false;
				    }

				    $.ajax({
				        url: base()+'/api/pics/uploads',
				        data:formData,
				        contentType: false,
				        processData: false,
				        type: 'post',
				        async:false,
				        success: function(res){
				        	// console.log(1,res);
				        	var data=JSON.parse(res)
				        	if(data.status=='success'){
				        		var imgUrl=data.data;
				        		$("#avatar").find("img.headphoto").attr("src",imgUrl);
				        		saveinfor("avatar",imgUrl);


				        	}else{
				        		alert(data.data);
				        	}
				        }
				    })



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
				};

			});

			//昵称
			$(".personal-infor .inforlists #nicheng").on("click",function(event){
				event.preventDefault();
				var str='<p style="position:relative" class="nctxt"><input type="text" placeholder="请输入昵称" /><span><i></i>/20</span></p>'
				pickfn("昵称",str);
				$(".picker-choose .confirm").click(function(){
					var con=$(".picker-content input").val();
					$("#nicheng .nicheng").html(con);
					saveinfor("nickname",con);

				})
			});
			//性别

			$(".personal-infor .inforlists #sexy").on("click",function(event){
				event.preventDefault()
				var str='<p class="tip">性别是重要信息，只能修改一次哦</p><ul class="sexy">'+
                	'<li class="on" data-sex="女" data-flag="2"><a href="javascript:;"><img src="img/women.png" style="width:0.45rem"></a><span>我是女生</span></li>'+
                	'<li data-sex="男" data-flag="1"><a href="javascript:;" style="padding-top:0.25rem"><img src="img/man.png" style="width:0.65rem"></a><span>我是男生</span></li>'+
                '</ul>';
                pickfn("性别",str);

                $(".picker-content .sexy li").click(function(){
                	if($(this).hasClass("on")){
                		return;
                	}else{
                		$(this).addClass("on").siblings("li").removeClass("on")
                	}
                	
                })

                $(".picker-choose .confirm").click(function(){
					var con=$(".picker-content .sexy .on").attr("data-sex");
					var sex=$(".picker-content .sexy .on").attr("data-flag");
					$("#sexy .sexy").html(con);
					
					saveinfor("sex",sex);
				})

			});

			//生日
			$(".personal-infor .inforlists #birthday").on("click",function(event){
				event.preventDefault()
				popupDate();

				$(".picker-choose .confirm").addClass("lcalendar_finish")
				
				$(".picker-choose .confirm").on("touchstart",function(){
					var birthday=finishMobileDate();
					$(".inforlists #birthday .birthday").html(birthday);
					saveinfor("birthday",birthday);
				});

				 
			});

			//家乡
			$(".personal-infor .inforlists #hometown").on("click",function(event){
				event.preventDefault()
				var con=hometown()
				homepicker('地址选择',con)
				 
			});

			

			//血型

			$(".personal-infor .inforlists #blood").on("click",function(event){
				event.preventDefault()
				var data = [
				    {'id': '10001', 'value': 'B'},
				    {'id': '10002', 'value': 'AB'},
				    {'id': '10003', 'value': 'O'},
				    {'id': '10004', 'value': 'A'},
				];
				$(".layercontainer").html("")
				var bankSelect = new IosSelect(1, 
				    [data],
				    {
				        container: '.layercontainer',
				        title: '血型',
				        itemHeight: 50,
				        itemShowCount: 3,
				        oneLevelId: 'blood',
				        callback: function (selectOneObj) {
				            
				        }
				        
				});

				$(".iosselect-header .sure").on("touchstart",function(){
					var con=$(".iosselect-box .at").attr("data-value");
					$("#blood .blood").html(con);
					saveinfor("blood_type",con);
				})



			});



			//性取向

			$(".personal-infor .inforlists #sexway").on("click",function(event){
				event.preventDefault()
				var data = [
				    {'id': '10001', 'value': '同性恋'},
				    {'id': '10002', 'value': '异性恋'},
				    {'id': '10003', 'value': '双性恋'},
				];
				$(".layercontainer").html("")
				var bankSelect = new IosSelect(1, 
				    [data],
				    {
				        container: '.layercontainer',
				        title: '性取向',
				        itemHeight: 50,
				        itemShowCount: 3,
				        oneLevelId: 'sexway',
				        callback: function (selectOneObj) {
				            $(".iosselect-header .sure").on("touchstart",function(event){
				            	event.preventDefault();
				            	var con=$(".iosselect-box .at").attr("data-value");
				            	$("#blood .blood").html(con);
				            	saveinfor("blood_type",con);
				            })
				        }
				        
				});
				$(".iosselect-header .sure").on("touchstart",function(){
					var con=$(".iosselect-box .at").attr("data-value");
					$("#sexway .sexway").html(con);
					saveinfor("sex_orientation",con);
				})



			});

			//三维

			$(".personal-infor .inforlists #three").on("click",function(event){
				event.preventDefault()
				var str='<ul class="threebox">'+
				'<li class="three_x">胸围 <span></span><div class="progressbox" data-min="60" data-max="140" data-cur='+three_x+'><div class="progressbar" ><p class="slider"></p><p class="sliderbtn"></p></div></div></li>'+
				'<li class="three_y">腰围 <span></span><div class="progressbox"  data-min="40" data-max="160" data-cur='+three_y+'><div class="progressbar"><p class="slider"></p><p class="sliderbtn"></p></div></div></li>'+
				'<li class="three_t">臀围 <span></span><div class="progressbox"  data-min="60" data-max="160" data-cur='+three_t+'><div class="progressbar"><p class="slider"></p><p class="sliderbtn"></p></div></div></li>'+
				'</ul>';
				pickfn("三维",str);

				progressbar("cm");

				$(".picker-choose .confirm").click(function(){
					three_x=$(".three_x").find(".progressbox").attr("data-cur");
					three_y=$(".three_y").find(".progressbox").attr("data-cur");
					three_t=$(".three_t").find(".progressbox").attr("data-cur");
					var con=three_x+','+three_y+','+three_t;
					$("#height .height").html(con);
					saveinfor("three_d",con);

				})

			});
			



			//身高

			$(".personal-infor .inforlists #height").on("click",function(event){
				event.preventDefault()
				var str='<div class="progressbox"  data-min="100" data-max="230" data-cur='+height+'><div class="progressbar"><p class="slider"></p><p class="sliderbtn"><span></span></p></div></div>';
				pickfn("身高",str);

				progressbar("cm","single");

				$(".picker-choose .confirm").click(function(){
					var con=$(".picker-content .sliderbtn span").html();
					$("#height .height").html(con);
					saveinfor("height",con);

				})

				
				
			});

			//体重

			$(".personal-infor .inforlists #weight").on("click",function(event){
                event.preventDefault()
				var str='<div class="progressbox"  data-min="30" data-max="90" data-cur='+weight+'><div class="progressbar" ><p class="slider"></p><p class="sliderbtn"><span></span></p></div></div>';
				pickfn("体重",str);

				progressbar("kg","single");


				$(".picker-choose .confirm").click(function(){
					var con=$(".picker-content .sliderbtn span").html();
					$("#weight .weight").html(con);
					saveinfor("weight",con);

				})

				
				
				
			});

			

			//行业
			$(".personal-infor .inforlists #profession").on("click",function(){
				$(".modal-content .modal-header").hide()
				var arr=['学生',"建筑/工程","商业/金融","IT/互联网","工业/制造业","文化/艺术","医疗/健康","教育/培训","科研","行政/司法","媒体/传播","食品/营养","零售","其他"];
				var str=''
				for(var i=0;i<arr.length;i++){
					str+='<li>'+arr[i]+'</li>'
				};
				$(".modal-content .modal-body").html("").append("<ul class='prolists'>"+str+"</ul>");

				$(".prolists li").click(function(){
					var that=this
					$(this).addClass("on").siblings("li").removeClass("on");
					var con=$(this).html();
					$("#profession .profession").html(con);
					saveinfor("industry",con);					
				})

				
			});

			//职业
			$(".personal-infor .inforlists #job").on("click",function(){
				$(".modal-content .modal-header").hide()
				var arr=['学生','高管',"创始人","职业经理人","咨询师","市场","销售","商务","公关","人事","行政","财务","法务","工程师","会计","审计","设计师","产品","运营","策划","客服","编辑","分析师","翻译","科研人员","技术人员","教师","医务工作","律师","作家","艺术家","导演","艺人","摄影师","运动员","其他"];
				var str=''
				for(var i=0;i<arr.length;i++){
					str+='<li>'+arr[i]+'</li>'
				};
				$(".modal-content .modal-body").html("").append("<ul class='joblists'>"+str+"</ul>");

				$(".joblists li").click(function(){
					var that=this
					$(this).addClass("on");
					var con=$(this).html();
					$("#job .job").html(con);
					saveinfor("position",con);	
				})

				
			});


			//picker弹层

			function pickfn(title,con){
				if($(".picker")){
					$(".picker").remove();
				}
				var picker = new Picker({
				    title: title
				});
				picker.show();
				$(".picker-content").html("").append(con);
				$(".picker-mask").on("touchstart",function(event){
					$(".picker-choose .cancel-hook").trigger("click");
				})

				
			};

			function homepicker(title,con){
				if($(".picker")){
					$(".picker").remove();
				}
				var picker = new Picker({
					data:con,
				    title:title
				});
				 picker.show();
				 picker.on('picker.select', function (selectedVal, selectedIndex) {
				   var text1 = first[selectedIndex[0]].text;
				   var text2 = second[selectedIndex[1]].text;
				   var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
				     // console.log(text1,text2,text3)
				     hometownEl.innerHTML = text1 + ' ' + text2 + ' ' + text3;
				     $("#hometown .hometown").html(text1 + ' ' + text2 + ' ' + text3)
				 });

				 picker.on('picker.change', function (index, selectedIndex) {
				   if (index === 0){
				     firstChange();
				   } else if (index === 1) {
				     secondChange();
				   }

				   function firstChange() {
				     second = [];
				     third = [];
				     checked[0] = selectedIndex;
				     var firstCity = city[selectedIndex];
				     if (firstCity.hasOwnProperty('sub')) {
				       creatList(firstCity.sub, second);

				       var secondCity = city[selectedIndex].sub[0]
				       if (secondCity.hasOwnProperty('sub')) {
				         creatList(secondCity.sub, third);
				       } else {
				         third = [{text: '', value: 0}];
				         checked[2] = 0;
				       }
				     } else {
				       second = [{text: '', value: 0}];
				       third = [{text: '', value: 0}];
				       checked[1] = 0;
				       checked[2] = 0;
				     }

				     picker.refillColumn(1, second);
				     picker.refillColumn(2, third);
				     picker.scrollColumn(1, 0)
				     picker.scrollColumn(2, 0)
				   }

				   function secondChange() {
				     third = [];
				     checked[1] = selectedIndex;
				     var first_index = checked[0];
				     if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
				       var secondCity = city[first_index].sub[selectedIndex];
				       creatList(secondCity.sub, third);
				       picker.refillColumn(2, third);
				       picker.scrollColumn(2, 0)
				     } else {
				       third = [{text: '', value: 0}];
				       checked[2] = 0;
				       picker.refillColumn(2, third);
				       picker.scrollColumn(2, 0)
				     }
				   }

				 });

				 picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
				   console.log(selectedVal);
				   console.log(selectedIndex);
				 });
			}

			//基本信息保存

			function saveinfor(key,val){

				var data={
					"uid":that.uid,
					"sign":that.sign,
				};
				data[key]=val;

				$.ajax({
					type:"post",
					url:base()+'/api/userinfo/save',
					dataType:"json",
					data:data,
					success:function(res){
						// console.log(9,res);
					}
				})
			}

			//身高体重值

			function curval(key,em){
				var val=$(".noUi-handle").attr("left");
				$(".noUi-handle").append("<span class='curval'>"+key*val+em+"</span>")
				console.log(val);
				$(".noUi-handle").on("touchend",function(){
					val=$(this).attr("left");
					$(this).find(".curval").html(key*val+em)

				})
			}

			function progressbar(unit,flag){
				$(".progressbar").each(function(){
					var curbar=this;
					var intX=0;
					var disX=0;
					var startX=$(this).offset().left;
					var endX=$(this).offset().left+parseInt($(this).width());
					var rate='50%';
					var curval=parseInt($(this).parents(".progressbox").data("cur"));
					var min=parseInt($(this).parents(".progressbox").data("min"));
					var total=parseInt($(this).parents(".progressbox").data("max"))-min;
					rate=(curval-min)/total;

					if(flag=='single'){
						$(this).find(".sliderbtn span").html(parseInt(rate*parseInt(total)+min)+unit)
					}else{
						$(this).parents("li").find("span").html(parseInt(rate*parseInt(total)+min)+unit);
					}
					

					var rem=($("body").width()/750)*100;
					var clientW='';

					

					console.log(total,min,rate)
					
					var obj=$(this).find(".sliderbtn");
						$(obj).on("touchstart",function(event){
							event.preventDefault();
							var event=event||window.envent;
							var touch = event.targetTouches[0];
							intX=touch.pageX;
							clientW=$(curbar).find(".slider").width();
						});
						$(obj).on("touchmove",function(event){
							event.preventDefault();
							var event=event||window.envent;
							var touch = event.targetTouches[0];
							rate=parseInt($(this).prev(".slider").width())/parseInt($(curbar).width());
							rate=rate.toFixed(2)
								if(touch.pageX>=endX||(touch.pageX+0.15*rem)<=startX){
									return false;
								}
								disX=touch.pageX-intX;
								$(this).css("left",clientW+disX);
								$(this).prev(".slider").css("width",clientW+disX);
								if(flag=='single'){
									$(this).find("span").html(parseInt(rate*parseInt(total)+min)+unit);

								}else{
									$(this).parents("li").find("span").html(parseInt(rate*parseInt(total)+min)+unit);
								}
								curval=rate*parseInt(total)+min;
								$(this).parents(".progressbox").attr("data-cur",curval);

								
						});


				})
				
			}

		


			

		},
		privatequestions:function(){
			var that=this;
			
			$.ajax({
				type:"post",
				url:base()+'api/privatequestions/index',
				async:false,
				dataType:"json",
				success:function(res){
					console.log(res);
					$(".personal-infor .secrets .secbox").html("");
					var str='';
					if(res.status==1){
						var data=res.data;
						for(var i=0;i<data.length;i++){
							var obj=data[i];
								str+='<li data-id='+obj.id+'>'+
								'<a href="javascript:;">'+
									'<p class="question">'+obj.question_name.name+'</p>'+
									'<span class="answer">'+obj.contents+'</span>'+
								'</a>'+
							'</li>'
						};

						$(".personal-infor .secrets .secbox").append(str)
						
					}
				}
			});

			
			
			$(".personal-infor .secrets .add").click(function(event){
				var cur=this;
				$.ajax({
					type:"post",
					url:base()+'api/privatequestions/add_index',			
					success:function(res){
						console.log(1,res)
						if(res.status==1){
							var str='';
							var arr=res.data;
							for(var i=0;i<arr.length;i++){
								str+='<li data-id='+arr[i].questions_id+'>'+arr[i].name+'</li>'
							};
							$(".modal-content .modal-body").html("").append("<ul class='prolists seclists'>"+str+"</ul>");
							$(cur).attr("data-toggle","modal");
							$(cur).attr("data-target","#Modal");

							$(".seclists li").click(function(){
								var that=this;
								$(this).addClass("on").siblings("li").removeClass("on");
								var id=$(this).attr("data-id");
								var title=$(this).html();
								localStorage.setItem("secId",JSON.stringify(id));
								localStorage.setItem("secTitle",JSON.stringify(title));
								localStorage.setItem("flag",false);
								window.location.href='per-secret.html'

								
								
							})
						}
						

						
					}
				});
			});

			$(".personal-infor .secrets .secbox li").click(function(){
				var id=parseInt($(this).attr("data-id"));
				localStorage.setItem("secId",JSON.stringify(id));
				localStorage.setItem("flag",true);
				window.location.href='per-secret.html'

			});

			//查看他人私密问题；
            $.ajax({
                type:"post",
                url:base()+'api/privatequestions/lock_question_index',
                dataType:"json",
                data:{"to_uid":that.uid},
                success:function (res) {
                    console.log(res);
                    $(".detail-infor .secrets .secbox").html("");
                    var str='';
                    if(res.status==1){
                        var data=res.data;
                        for(var i=0;i<data.length;i++){
                            var obj=data[i];
                            if(obj.lock==0){
                                str='<li data-id='+obj.id+' data-status='+obj.lock+'>'+
                                    '<a href="javascript:;">'+
                                    '<p class="question">'+obj.question_name+'</p>'+
                                    '<span class="answer"></span>'+
                                    '</a>'+
                                    '</li>';
                                $(".detail-infor .secrets .secbox").append(str)
							}else if(obj.lock==1){
                                str='<li data-id='+obj.id+' data-status='+obj.lock+'>'+
                                    '<a href="javascript:;">'+
                                    '<p class="question">'+obj.question_name+'</p>'+
                                    '<span class="answer">'+obj.contents+'</span>'+
                                    '</a>'+
                                    '</li>';
                                $(".detail-infor .secrets .secbox").prepend(str)
							}

                        };


                    }
                }
            })
			

			

		},
		hobbylist:function(){
			var that=this
			$.ajax({
				type:"get",
				url:base()+'/api/Userinfo/get_tag',
				dataType:"json",
				data:{"uid":that.uid,"sign":that.sign},
				success:function(res){
					if(res.status=='success'){
						var data=res.data;
						if(data.length>0){
							for(var i=0;i<data.length;i++){
								var obj=data[i];
								$(".hobbys li").each(function(index,item){
									var classes=$(this).attr("data-class");
									if(obj.classes==classes){
										var str='';
										$(this).find("p span").css("display","none");
										var content=obj.contents;
										for(var j=0;j<content.length;j++){
											str+='<li>'+content[j]+'</li>'
										}
										
										$(this).find("a").append("<ul>"+str+"</ul>");
										if($(this).parents(".detail-infor")){
											$(this).css("display","block")
										}
									}
								});

							}
						};
						$(".personal-infor .hobbys .go-hobby").click(function(){
							var classes=$(this).parent("li").attr("data-class");
							localStorage.setItem("classes",classes);
                            var arr=[]
							$(this).find("ul li").each(function (index,item) {
								// console.log($(item).html())
								arr.push($(item).html());
                            });
                            localStorage.setItem("curchoose",JSON.stringify(arr));
							window.location.href='hobbys.html'
						})
						

					}
				}

			})
		}
		


	};
	personal.init()
})