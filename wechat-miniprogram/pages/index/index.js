const app = getApp();

Page({
  data: {
    phone: app.globalData.phone,
    email: app.globalData.email,
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
    products: [
      {
        icon: "⌁",
        name: "脚手架钢管",
        desc: "48mm 镀锌钢管，1m 至 6m 多规格可配，出库前按长度分类扎捆。",
        price: "按米/按根计租"
      },
      {
        icon: "✣",
        name: "十字扣件",
        desc: "用于立杆与横杆直角连接，数量大、周转快，支持整袋清点。",
        price: "按只计租"
      },
      {
        icon: "⟳",
        name: "旋转扣件",
        desc: "适合斜撑、剪刀撑和非直角连接，螺栓润滑检查后发货。",
        price: "按只计租"
      },
      {
        icon: "▱",
        name: "对接扣件",
        desc: "用于钢管接长，搭配钢管规格发货，减少现场二次调配。",
        price: "按只计租"
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

  copyQuote() {
    const project = this.data.project.trim();
    const area = this.data.area.trim();
    const materials = this.data.materials.trim() || "材料清单待补充";

    if (!project || !area) {
      wx.showToast({
        title: "请填写项目和区域",
        icon: "none"
      });
      return;
    }

    const quote = [
      "钢管脚手架扣件租赁询价",
      `项目名称：${project}`,
      `所在区域：${area}`,
      `预计租期：${this.data.periods[this.data.periodIndex]}`,
      `材料需求：${materials}`,
      `联系邮箱：${this.data.email}`,
      `联系电话：${this.data.phone}`
    ].join("\n");

    wx.setClipboardData({
      data: quote,
      success: () => {
        wx.showModal({
          title: "询价信息已复制",
          content: `请粘贴发送到邮箱：${this.data.email}`,
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
