$(function () {
    var obj=window.location.search;
   
    console.log(9,obj,places_id);
    if(obj==''){
        var type=1 //整体报表
    }else{
         var places_id=obj.split("=")[1]
         if(places_id!==""){
            var type=2 //广告位日报表
            $(".ad_type").html(places_id+':')
         }
    }
    var pagenum=1,
        source='wjrmt',
        count=0,
        starts='',
        ends='',
        Xdata=[],
        Ydataone=[],
        Ydatatwo=[],
        pagesize=0,
        nextnum=1,
        click_num=[],
        show_num=[],
        pointe=[],
        one="点击量",
        onelist="次",
        two="曝光量",
        twolist="次",
        charing=[];

    var prientity_type = "点击量,曝光量,点击率,消耗金额";//后台传过来的
    var prientity_list = ["次","次","%","元"];//后台传过来的
    var prientity_type_value = prientity_type.split(',');
    var prientity_type1_obj = $("#left");
    var prientity_type2_obj = $("#right");
    var allname="";

    function rs_change(val){
        // allname=prientity_type_value[val*1];
        var prientity_type1_key = prientity_type1_obj.val();
        var prientity_type2_key = prientity_type2_obj.val();
        var prientity_type1_html = '';
        var prientity_type2_html = '';
        for(var i=0;i<prientity_type_value.length;i++){
            if(i != prientity_type2_key){
                prientity_type1_html += '<option value="'+i+'">'+prientity_type_value[i]+'</option>';
            }
            if(i != prientity_type1_key){
                prientity_type2_html += '<option value="'+i+'">'+prientity_type_value[i]+'</option>';
            }
        }
        prientity_type1_obj.empty().append(prientity_type1_html).val(prientity_type1_key);
        prientity_type2_obj.empty().append(prientity_type2_html).val(prientity_type2_key);
    }
    prientity_type1_obj.change(function(){
            one=prientity_type_value[$(this).val()],
            onelist=prientity_list[$(this).val()];
            panduanone();
        canvas(Xdata,Ydataone,Ydatatwo,one,two,onelist,twolist);
        rs_change($(this).val());
    });
    prientity_type2_obj.change(function(){
        // $("#right_val").val(prientity_type_value[$(this).val()]);
            two=prientity_type_value[$(this).val()],
            twolist=prientity_list[$(this).val()];
            panduantwo();
        canvas(Xdata,Ydataone,Ydatatwo,one,two,onelist,twolist);
        rs_change($(this).val());
    });
    rs_change(0);

    function canvas(Xdata,Ydataone,Ydatatwo,Ynameone,YnameTwo,Ylistone,Ylisttwo){
        $('#report_container').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [{
                categories: Xdata,
                // visible:false,
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} '+Ylistone,
                    style: {
                        color: "#1abb9c"
                    }
                },
                title: {
                    text: Ynameone,
                    style: {
                        color:"#1abb9c"
                    }
                },
                tickAmount: 5,
            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: YnameTwo,
                    style: {
                        color: "#3498db"
                    }
                },
                labels: {
                    format: '{value} '+Ylisttwo,
                    style: {
                        color: "#3498db"
                    }
                },
                tickAmount: 5,
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x:180,
                y:20,
                verticalAlign: 'top',
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [ {
                name: Ynameone,
                type: 'spline',
                data: Ydataone,
                tooltip: {
                    valueSuffix: ' '+Ylistone
                },
                color:"#1abb9c"
            },{
                name: YnameTwo,
                type: 'spline',
                yAxis: 1,
                data: Ydatatwo,
                tooltip: {
                    valueSuffix: ' '+Ylisttwo
                },
                color:"#3498db"
            }]
        });
    }

   
    //当页数据
    function list(source,starTime,endTime,type){
        if(type==1){
            var listUrl="http://dc.wjrmt.cn/ssp/adsumary";
            var listData={
                source:source,
                start:'2017-12-21',
                end:'2017-12-29',
            }
        }else if(type==2){
            var listUrl="http://dc.wjrmt.cn/ssp/placedetail";
            var listData={
                placeid:places_id,
                start:'2017-12-21',
                end:'2017-12-29',
            }
        }
        $.ajax({
            url:listUrl,
            type:"get",
            async:false,
            dataType:"json",
            data:listData,
            success:function(data){
                // console.log(1,data)
                if(data.status=='success'){
                    var Rdata=data.datas;
                    // console.log(2,Rdata)
                    var html='';
                    for(var i=0;i<Rdata.length;i++){
                        var obj=Rdata[i];
                        html+='<tr>'+
                        '<td>'+obj.datetime+'</td>'+
                        '<td>'+obj.shownum+'</td>'+
                        '<td>'+obj.clicknum+'</td>'+
                        '<td>'+obj.crt+'</td>'+
                        '<td>'+obj.frt+'</td>'+
                        '<td>'+obj.ecpm+'</td>'+
                        '<td>'+obj.cpc+'</td>'+
                        '<td>'+obj.income+'</td>'+
                    '</tr>'
                    };
                    var sumary=data.sumary[0];
                    var htmls='';
                    htmls='<tr>'+
                        '<th>总计</th>'+
                        '<th>'+sumary.shownum+'</th>'+
                        '<th>'+sumary.clicknum+'</th>'+
                        '<th>'+sumary.crt+'</th>'+
                        '<th>'+sumary.frt+'</th>'+
                        '<th>'+sumary.ecpm+'</th>'+
                        '<th>'+sumary.cpc+'</th>'+
                        '<th>'+sumary.income+'</th>'+
                    '</tr>'
                    
                    $("tbody").html(html);
                    $("tfoot").html(htmls);
                    $(".show_num").html(sumary.shownum)
                    $(".click_num").html(sumary.clicknum)
                    $(".pointe").html(sumary.crt)
                    $(".frate").html(sumary.frt)
                    $(".income").html(sumary.income)

                    if(starts!==ends){
                        // count=data.pageinfo.total;
                        // pagesize=data.pageinfo.limit;
                        // pageing();
                        $("#datatable-buttons_paginate").show();
                    }
                    else{
                        // $("#page").hide();
                        // count=data.pageinfo.total;
                        // pagesize=data.pageinfo.limit;
                        // pageing();
                        $("#datatable-buttons_paginate").show();
                    }
                }else{
                    $("tfoot").css("display","none");
                }

                // nextnum=1;
            }
        });
    }
    //全部数据-走势图；
    function alllist(source,starTime,endTime,type) {
        if(type==1){
            var listUrl="http://dc.wjrmt.cn/ssp/adsumary";
            var listData={
                source:source,
                start:'2017-12-21',
                end:'2017-12-29',
            }
        }else if(type==2){
            var listUrl="http://dc.wjrmt.cn/ssp/placedetail";
            var listData={
                placeid:places_id,
                start:'2017-12-21',
                end:'2017-12-29',
            }
        }
        $.ajax({
            url:listUrl,
            type:"get",
            dataType:"json",
            data:listData,
            success:function(data){
                console.log(1,data)
                if(data.status!=='success'){
                    $("#report_container").hide();
                    $(".tip_container").show();
                    $(".select").hide()
                }else{
                    $("#report_container").show();
                    $(".tip_container").hide();
                    $(".select").show();
                    var Rdata=data.datas;
                    Xdata=[];
                    click_num=[];
                    show_num=[];
                    pointe=[];
                    charing=[];
                    for(var i=0;i<Rdata.length;i++) {
                        var obj=Rdata[i];
                        Xdata.push(obj.datetime);
                        click_num.push(Number(obj.clicknum));
                        show_num.push(Number(obj.shownum));
                        pointe.push(Number(obj.crt));
                        charing.push(Number(obj.income));
                         console.log(9,Xdata)
                    }
                }
              
                panduantwo();
                panduanone();
                canvas(Xdata,Ydataone,Ydatatwo,one,two,onelist,twolist);
            }
        });
    };

    list(source,starts,ends,pagenum,type);
    alllist(source,starts,ends,type);


    function pageing() {
        $("#page").paging({
            pageNo:nextnum,
            totalPage: Math.ceil(count/pagesize),
            totalSize:count,
            callback: function(num) {
                nextnum=num;
                list(source,starts,ends,nextnum,type);
            }
        });
    };
    function panduantwo() {

        if(two=="点击量"){
            Ydatatwo=click_num;
        }else if(two=="曝光量"){
            Ydatatwo=show_num;
        }else if(two=="点击率"){
            Ydatatwo=pointe;
        }else if(two=="消耗金额"){
            Ydatatwo=charing;
        }
    }
    function panduanone(){
        if(one=="点击量"){
            Ydataone=click_num;
        }else if(one=="曝光量"){
            Ydataone=show_num;
        }else if(one=="点击率"){
            Ydataone=pointe;
        }else if(one=="消耗金额"){
            Ydataone=charing;
        }
    };

    $(".highcharts-credits").remove();
    // $(".dataTables_empty").html("没有相关数据")；

    //时间段筛选
    $(".range_inputs .applyBtn,.ranges ul li").click(function(){
      starts=$(".calendar input[name='daterangepicker_start']").val();
      
      ends=$(".calendar input[name='daterangepicker_end']").val();
        list(source,starts,ends,pagenum,type);
    });

});
