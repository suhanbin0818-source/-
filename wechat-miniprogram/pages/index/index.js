const app = getApp();

Page({
  data: {
    phone: app.globalData.phone,
    wechatId: app.globalData.wechatId,
    placeName: app.globalData.placeName,
    address: app.globalData.address,
    couplers: 5000,
    pipes: 12000,
    days: 30,
    estimate: "7,830",
    project: "",
    area: "",
    materials: "",
    periods: ["15天以内", "15-45天", "45-90天", "90天以上"],
    periodIndex: 1,
    scaffoldKit: [
      {
        count: "2",
        unit: "个",
        name: "门架"
      },
      {
        count: "2",
        unit: "根",
        name: "拉杆"
      },
      {
        count: "1",
        unit: "块",
        name: "跳板"
      }
    ],
    scaffoldTypes: [
      {
        name: "大架",
        desc: "常用高度 1.7 米，适合外墙、店面、厂房等作业面。"
      },
      {
        name: "小架",
        desc: "常用高度 1 米，适合室内装修、低位施工和移动作业。"
      }
    ],
    thicknesses: ["1.0mm", "1.2mm", "1.5mm", "2.0mm"],
    accessories: ["拉杆", "跳板", "护栏", "三脚架", "轮子", "顶托"],
    rentalPrices: [
      {
        name: "小架租赁",
        price: "¥1.5/套/天",
        note: "按实际使用天数核算"
      },
      {
        name: "大架租赁",
        price: "¥2/套/天",
        note: "20 天起租"
      },
      {
        name: "3-5 套短租",
        price: "¥260",
        note: "含来回运费，具体按距离确认"
      }
    ],
    salePrices: [
      {
        name: "大架基础套",
        price: "¥145/套",
        note: "含 1 张踏板，基础价不含运费"
      },
      {
        name: "1.5mm 整套",
        price: "¥179/套",
        note: "约 70 斤，含 1 张踏板"
      },
      {
        name: "2.0mm 整套",
        price: "¥185/套",
        note: "约 72 斤，含 1 张踏板"
      }
    ],
    accessoryPrices: [
      {
        name: "轮子",
        price: "¥28/个",
        note: "新轮子"
      },
      {
        name: "三脚架",
        price: "¥36/套",
        note: "按套销售"
      },
      {
        name: "护栏",
        price: "¥36/套",
        note: "按套销售"
      },
      {
        name: "1.5mm 踏板",
        price: "¥58/张",
        note: "约 18 斤"
      },
      {
        name: "2.0mm 踏板",
        price: "¥65/张",
        note: "约 22 斤"
      }
    ],
    products: [
      {
        icon: "架",
        name: "脚手架",
        desc: "大架、小架可选，按常用整套方案配齐门架、拉杆和跳板。",
        price: "租赁 / 销售"
      },
      {
        icon: "管",
        name: "钢管",
        desc: "多长度钢管可配，适合脚手架搭设、支撑、防护和临时围挡。",
        price: "租赁 / 销售"
      },
      {
        icon: "扣",
        name: "扣件",
        desc: "十字、旋转、对接等扣件可按项目用量配发。",
        price: "租赁 / 销售"
      },
      {
        icon: "牛",
        name: "地牛",
        desc: "适合仓库、材料场和工地短距离搬运，提高装卸效率。",
        price: "租赁 / 销售"
      },
      {
        icon: "车",
        name: "小推车",
        desc: "适合材料转运、装修搬运和工地日常周转。",
        price: "租赁 / 销售"
      }
    ],
    steps: [
      {
        no: "01",
        title: "提交用量",
        desc: "提供项目位置、预计租期和材料清单，我们快速核库存与车辆。"
      },
      {
        no: "02",
        title: "报价锁单",
        desc: "确认日租单价、押金、运输费和损耗规则，生成租赁明细。"
      },
      {
        no: "03",
        title: "配送签收",
        desc: "按规格装车，到场共同清点，签收单留底，后续可补货。"
      },
      {
        no: "04",
        title: "退场结算",
        desc: "回收复点，按实际租期和损耗明细结算，账目透明。"
      }
    ]
  },

  onCouplersInput(event) {
    this.setData({ couplers: Number(event.detail.value) || 0 }, this.updateEstimate);
  },

  onPipesInput(event) {
    this.setData({ pipes: Number(event.detail.value) || 0 }, this.updateEstimate);
  },

  onDaysInput(event) {
    this.setData({ days: Math.max(Number(event.detail.value) || 1, 1) }, this.updateEstimate);
  },

  onProjectInput(event) {
    this.setData({ project: event.detail.value });
  },

  onAreaInput(event) {
    this.setData({ area: event.detail.value });
  },

  onMaterialsInput(event) {
    this.setData({ materials: event.detail.value });
  },

  onPeriodChange(event) {
    this.setData({ periodIndex: Number(event.detail.value) });
  },

  updateEstimate() {
    const couplerDaily = 0.006;
    const pipeDaily = 0.018;
    const subtotal = (this.data.couplers * couplerDaily + this.data.pipes * pipeDaily) * this.data.days;
    const transport = subtotal > 0 ? 900 : 0;
    const estimate = Math.round(subtotal + transport).toLocaleString("zh-CN");

    this.setData({ estimate });
  },

  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    });
  },

  openMap() {
    wx.openLocation({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      name: app.globalData.placeName,
      address: app.globalData.address,
      scale: 16
    });
  },

  addWechat() {
    const project = this.data.project.trim();
    const area = this.data.area.trim();
    const materials = this.data.materials.trim() || "需要脚手架整套方案";

    const quote = [
      `微信号：${this.data.wechatId}`,
      "",
      "钢管脚手架扣件租赁咨询",
      `项目名称：${project || "未填写"}`,
      `所在区域：${area || "未填写"}`,
      `预计租期：${this.data.periods[this.data.periodIndex]}`,
      `材料需求：${materials}`,
      "推荐方案：2个门架 + 2根拉杆 + 1块跳板",
      "价格参考：小架¥1.5/套/天，大架¥2/套/天，3-5套短租¥260含来回运费",
      `联系电话：${this.data.phone}`
    ].join("\n");

    wx.setClipboardData({
      data: quote,
      success: () => {
        wx.showModal({
          title: "微信号已复制",
          content: `已复制微信号和咨询信息。请打开微信，搜索 ${this.data.wechatId} 添加好友。`,
          showCancel: false
        });
      }
    });
  },

  scrollToQuote() {
    wx.pageScrollTo({
      selector: "#quote",
      duration: 260
    });
  },

  scrollToProducts() {
    wx.pageScrollTo({
      selector: "#products",
      duration: 260
    });
  }
});
