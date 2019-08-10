// pages/home1/home1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    bnrUrl: [{
      "url": "/images/banner1.jpg"
    }, {
        "url": "/images/banner2.jpg"
    }, {
        "url": "/images/banner3.jpg"
    }, {
        "url": "/images/banner4.jpg"
    }]
  },
  jumpComment: function (e) {
    
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },
  loadMore: function () {
    wx.cloud.callFunction({
      name: "movie4",
      data: {
        start: this.data.list.length,
        count: 10
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      var rows = obj.subjects;
      rows = this.data.list.concat(rows);
      this.setData({
        list: rows
      })
      console.log(obj);
    }).catch(err => {
      console.log(err);
    })
   
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})