var location = require('../../utils/location.js')
Page({
  onLoad: function() {
    // 定位
    // location.getCityNameOFLocation()
    this.queryGoodsList(this.data.queryType);
  },
  data: {
    sort_button_back_color: ["#fc4768", "#fff", "#fff"],
    pages: [],
    queryType:1,
    hasMore: true,
    start: 0,
    limit: 24,
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.queryGoodsList(this.data.queryType);
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 600);
  },

  searchClick: function(event) {
    this.setData({
      text_msg:"搜索结果"
    })
  },
  lastedGoodsClick: function(event) {
    this.setData({
      queryType: 1,
      sort_button_back_color: ["#fc4768", "#fff", "#fff"],
      text_msg: "最新商品"
    })
    this.queryGoodsList(this.data.queryType);
  },
  hotGoodsClick: function(event) {
    this.setData({
      queryType: 2,
      sort_button_back_color: ["#fff", "#fc4768", "#fff"],
      text_msg: "热卖商品"
    })
    this.queryGoodsList(this.data.queryType);
  },
  recommendGoodsClick: function(event) {
    this.setData({
      queryType: 3,
      sort_button_back_color: ["#fff", "#fff", "#fc4768"],
      text_msg: "推荐商品"
    })
    this.queryGoodsList(this.data.queryType);
  },
  queryGoodsList: function(type) {
    var app = getApp();
    var _that = this
    wx.request({
      url: app.globalData.domain.dev + 'goods/query/',
      method: 'GET',
      data:{
        'type': _that.data.queryType,
        'start': _that.data.start,
        'limit': _that.data.limit,
      },
      success:function(res) {
        console.log(JSON.stringify(res));
        var _page = new Array();
        var _data = res.data.data.object_list
        for (var i=0; i< _data.length; i++) {
          _page.push({
            goods_id: _data[i].id,
            lookcount: _data[i].look_count,
            address: _data[i].publish_address,
            price: _data[i].price,
            title: _data[i].title,
            desc: _data[i].descible,
            cover: _data[i].cover.path,
            publis_date: _data[i].publish_date,
            tags: _data[i].tags,
            is_donation: _data[i].is_donation
          })
          console.log(JSON.stringify(res));
        }
        _that.setData({
          pages: _page
        })
      }
    })
  }
})