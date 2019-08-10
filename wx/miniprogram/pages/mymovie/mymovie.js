// pages/mymovie/mymovie.js
const db = wx.cloud.database({ env:"web1903-test1-0bxei"})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',//用户输入的文字
    file:{}    //选中图片
  },
  myupload:function(){
    //功能1：选择一张图片
    //console.log(123);
    wx.chooseImage({//选中图片
      count:1,      //选中一张图片
      sizeType:["original","compressed"],//图片类型 原图压缩图
      sourceType:["album","camera"],//图片来源相册 相机
      success: (res)=> {
        //获取选中图片
        var file=res.tempFilePaths[0];
        //将选中图片保存data
        //1：在data添加属性file表示选中文件
        //2：将选中图片保存
        this.setData({
          file:file
        })
      },
    })
  },
  mysubmit:function(){
    //功能2：上传图片并将图片保存云函数
    //console.log(0);
    //1:获取上传图片
    var f=this.data.file;
    //2：截取文件后缀名称
    var suffix=/\.\w+$/.exec(f)[0];
    //3：创建新文件名称
    var newFile=new Date().getTime()+suffix;
    //4：获取用户评论内容
    var c=this.data.content;
    console.log(newFile);
    console.log(c);
    //5:上传文件操作
      //5.1:如果上传文件成功
      wx.cloud.uploadFile({  //上传
        cloudPath:newFile,   //新文件名
        filePath:f,          //选中文件
        success:res=>{       //上传成功
          console.log(res.fileID);
          //5.2:获取fileID
          var fId=res.fileID;
          //5.3：将fileID评论内容添加去数据库中
          //5.4：提示发表成功提示框  mymovie
          db.collection("mymovie")
          .add({                           
            data:{fileID:fId,content:c}//文件id  评论内容
          }).then(res=>{
            console.log(res);
            wx.showToast({tittle:"发表成功"})
          }).catch(err=>{
            console.log(err);
          })
        },
        fail:err=>{          //上传失败
          console.logh(err);
        }
      })
      
  },
  onContentChange:function(e){
     //功能：获取用户输入的留言内容
    this.setData({
      content:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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