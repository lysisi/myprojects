    $("button").click(function(e){
        e.preventDefault();
    })

    var base='http://bar.wjrmt.cn';

    var admin={
        init:function() {
            this.group=0;
            this.allfilter();
            this.lists(1,this.group);
             
        },
       
        //群发消息

    lists:function(page,group) {
            var that=this;
            $.ajax({
                type:"post",
                url:base+'/admin/user/getUserList',
                dataType:"json",
                data:{'page':page,"group":that.group,"sex":0,"ordername":'subscribe_time',"ordertype":1},
                success:function(res) {
                    console.log(res)
                    if(res.status==true){
                         var data=res.data.data;
                         var count=res.data.count;
                         var pagesize=res.data.size;
                         var str='';
                         for(var i=0;i<data.length;i++){
                            var obj=data[i];
                            str+='<tr>'+
                            '<td><img src='+obj.avatar+' class="avatar"></td>'+
                            '<td>'+obj.nickname+'</td>'+
                            '<td>'+obj.sex+'</td>'+
                            '<td>'+obj.province+'</td>'+
                            '<td>'+obj.openid+'</td>'+
                            '<td>'+obj.subscribe_time+'</td>'+
                            '<td>'+obj.recharge+'</td>'+
                            '<td>'+obj.allconsume+'</td>'+
                            '<td>'+obj.balance+'</td>'+                            
                            '</tr>'


                         };
                         $("tbody").html("").append(str);

                         $('#datatables').dataTable( {
                            "language": {
                              "emptyTable": "",
                              "sZeroRecords":""
                            },
                            "orderClasses":true,
                            "columnDefs": [
                                 // { "orderSequence": [ "desc,asc" ], "targets": [ 5 ] },
                                 {"orderable":false,"targets":[0,1,2,3,4]},
                                 {"orderable":true,"targets":[5,6,7,8]}

                               ],
                           "asSorting": [ 'asc', 'desc' ],
                          } );

                        that.page(page,count,pagesize);

                       
                    }else{
                        $("tbody").append("<tr><td colpan='3'><p style='text-align:center'>还没有群发历史记录<p></td></tr>")
                    };


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

                    that.lists(page_num,that.group);
                }
            });
    },
    //全部用户筛选

    allfilter:function(){
        $.ajax({
            type:"post",
            url:base+'/admin/user/getUserTag',
            async:false,
            success:function(res){
                var data=JSON.parse(res)
                if(data.status==true){
                    var users=data.data;
                    var str='';
                    console.log(users)
                    for(var i=0;i<users.length;i++){
                            var obj=users[i];
                            if(i==0){
                               
                                str+='<option value='+parseInt(i+1)+' data-id='+obj.id+'>'+obj.tagname+'<span>'+obj.num+'</span></option>'
                            }else{
                                str+='<option value='+parseInt(i+1)+' data-id='+obj.id+'>'+obj.tagname+'<span>'+obj.num+'</span></option>'
                            }


                            
                    };

                    var allselect='<select class="selectpicker " data-size="" data-style="btn btn-primary btn-round" style="width:200px" tabindex="" title="">'+str+'</select>';
                    $(".allselect").append(allselect);
                }
            }
        })
    },

    filterlist:function(){
        var that=this;
        function group_id(str) {
            var group
             $(".groupselect .selectpicker option").each(function(index,item){
                if($(item).html()==str){
                    group=parseInt($(item).attr("data-id"));
                    return group;
                }


             });

         };

          // target_user=$(".allselect .inner .selected .text").html();
          //  group_id(target_user);

           $(".allselect .inner li").click(function(){
            var target_user=$(this).find(".text").html();
            that.group=group_id(target_user);
            that.list(1,that.group)
           })


    }
        


        

    };
    admin.init();

    

