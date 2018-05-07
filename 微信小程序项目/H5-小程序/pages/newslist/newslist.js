import { fetchBanner, fetchList,fetchAdvert} from "../common/comway.js"

Page({
    showNavigationBarLoading: function () {
       wx.showNavigationBarLoading()
     },
    data: {
        banner: [],
        indicatorDots: true,
        vertical: false,
        loading: true,
        adverlist: "",
        newslist: [],
        otheradverlist:"",
        cgtime: '',
        page:'',
        cid: '',
        flag: true,
        advertisement: false,
        len: 1,
        otherlen:1,
        loading:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // console.log('onLoad');
        // wx.showNavigationBarLoading();
        // let dataArr = [];

        fetchBanner().then(resp => {
          //动态加载banner图

          var dataArr = resp.data.bannerlist;
         
          var banarr=[];
          for(var i=0;i<dataArr.length;i++){
            var obj=dataArr[i];
            console.log(obj);
            var ban={
                'img':obj.imgurl,
                'id':obj.id
            }
            banarr.push(ban);
          }
          this.setData({
            banner: banarr
          })
        })
        this.requestData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setStorage({
            key: 'detail',
            data: 'detail',

        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function (option) {
        this.requestData();

    },


    requestData: function () {
        var that = this;
        var adverdata = [];
        var adverdata_other=[]
        if (that.data.flag == true) {
            fetchList(that.data.cgtime,that.data.cid,that.data.page).then(res=>{
                if (res.data.code == 3) {
                    that.setData({
                        flag: false,
                        loading:false
                    });

                }else if(res.data.code==1){
                    var data = that.data.newslist;
                    data = data.concat(res.data.newslist)
                    fetchAdvert('1',that.data.page).then(res=>{
                        if(res.data.code==1){
                            if(res.data.advert.length==2){
                                adverdata = res.data.advert[0];
                                adverdata_other = res.data.advert[1];
                                that.setData({
                                    adverlist: adverdata,
                                    len: adverdata.img.length,
                                    otheradverlist: adverdata_other,
                                    otherlen: adverdata_other.img.length
                                })
                            } else if (res.data.advert.length == 1){
                                adverdata = res.data.advert[0];
                                that.setData({
                                    adverlist: adverdata,
                                    len: adverdata.img.length,
                                })
                            }else{
                                return false;
                            }
                            
                            
                        }
                    })
                    that.setData({
                        newslist: data,
                        cgtime: res.data.endcgtime,
                        cid: res.data.endid,
                        page: res.data.page,
                    })
                }
                
            })
            
        }

    },
   
    /**
 
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})