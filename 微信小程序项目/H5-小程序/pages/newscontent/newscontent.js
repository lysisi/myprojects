var WxParse = require("../../wxParse/wxParse.js");
import {fetchContent} from "../common/comway.js";
var baseUrl = "http://dev.micro-news.cn";
Page({
    showNavigationBarLoading: function () {
       wx.showNavigationBarLoading()
     },
    data:{
        adver:"",
    },
    onLoad:function(options){
        var that = this;
        this.setData({
            newsId:parseInt(options.id),
        })

        wx.request({
            url:baseUrl+"/api/list/listcontent",
            method:"POST",
            data:{"lid":this.data.newsId},
            header:{
                "content-type":"application/x-www-form-urlencoded"
            },
            success:function(res){
                var article=res.data.content.body;
                that.setData({
                    title:res.data.content.title,
                    user:res.data.content.user,
                    time: res.data.content.timestamp,
                    
                })
                WxParse.wxParse("article", "html", article, that, 0)
            }
        });
        wx.request({
            url: baseUrl +'/api/list/advertdata',
            method:"post",
            data:{'type':2},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success:function(data){
                if(data.code==1){
                    console.log(data.advert[0]);
                    that.setData({
                        adver: data.advert[0],
                    })
                }
            }
        })

       
           
    }
})
