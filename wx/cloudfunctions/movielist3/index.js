//云函数movielist3
//此函数功能：想豆瓣网发送请求
//获取最新热映电影列表

//1：引入第三方的ajax库 request-promise
var rp=require("request-promise");
//2:创建main函数
exports.main=async(event,context)=>{
  //3：创建变量url请求地址
  var url =`http://api.douban.com/v2/movie/in_theaters`;
  url +=`?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  url +=`&start=${event.start}&count=${event.count}`;
  //4：请求 rp函数发送请求并且将豆瓣返回电影列表 返回调用函数
  return rp(url).then(res=>{  //发送请求  请求成功
    return res;              //返回结果
  }).catch(err=>{           //出错
    console.log(err);       //出错原因
  })
}







/*// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/