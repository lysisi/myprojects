
// var BASE_URL ="https://wx.wjrmt.cn";
var BASE_URL = "http://dev.micro-news.cn"
var net = require("./netload.js");
function fetchBanner() {
    let url = BASE_URL + "/api/list/bannerlist"
  let params = {}
  return net.fetchApi(url, {params}, "GET").then(data => data)
}

function fetchList(time,id){
    let url = BASE_URL + "/api/list/index";
    let params = {'cgtime': time, 'cid': id}
    return net.fetchApi(url, params, "post").then(data => data)
}

function fetchContent(id){
    let url = BASE_URL + "/api/list/listcontent";
    let params = {'lid': id}
    return net.fetchApi(url, params, "post").then(data => data)
}
function fetchAdvert(classtype,page){
    let url = BASE_URL +'/api/list/advertdata';
    let params ={"type":classtype,"page":page};
    return net.fetchApi(url,params,"post").then(data=>data)
}
export {
  fetchBanner,fetchList,fetchContent,fetchAdvert
} 
