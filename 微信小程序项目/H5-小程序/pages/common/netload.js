import Promise from "../../bluebird/js/browser/bluebird.min.js"
module.exports = {
  fetchApi(url, params, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${url}`,
        data: params,
        method: method,
        header: {"content-type":"application/x-www-form-urlencoded"},
        success: resolve,
        fail: reject
      })
    })
  }
}
