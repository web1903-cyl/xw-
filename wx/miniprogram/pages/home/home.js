// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  jumpComment:function(e){
    //功能：用户点击详情按钮后跳转详情组件
    var id=e.target.dataset.id;
    //关闭并跳转
    /*wx.redirectTo({
      url: '/pages/comment/comment',
    })*/
    //保留并且跳转  //获取自定义属性
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })
    //将电影id获取并且跳转组件是
    //传递comment组件
    //在comment获取id

  },
  loadMore:function(){
    //1:调用云函数movielist3
    wx.cloud.callFunction({//调用云函数
      name:"movielist3",//函数名
      data:{
        start:this.data.list.length,
        count:10
        }//参数
    }).then(res=>{
      //console.log(res);
      //将字符串转js对象
      var obj=JSON.parse(res.result);
      //保存电影列表 subject 电影列表
      //保存上一页电影列表
      //1.10:保存电影列表数据
      var rows=obj.subjects;
      //1.11:将电影列表数组拼接操作
      rows=this.data.list.concat(rows);
      //1.12:将拼接后结果保存起来
      this.setData({
        list:rows
      })
      console.log(obj);
      //1:接收返回数据 list
      //2:在home.wxml创建循环
      //3:遍历电影信息
      //4: 电影图片  small
      //5:电影标题
      //6:电影评分
      //7:电影导演
      //8:电影年份
      //9:电影主演
    }).catch(err=>{
      console.log(err);  
    })
    //2：将返回结果保存
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
    console.log(123);
    //发送请求下载下一页的数据
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})