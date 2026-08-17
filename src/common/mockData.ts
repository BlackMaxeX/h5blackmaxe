// 以访问接口地址为key
const successCode = "0000000000000000";
export const mockData = {
  "/api/region/v1/qryTree": {
    //获取热门省份的接口
    data: [
      {
        name: "上海市",
        value: "110000",
      },
      {
        name: "北京市",
        value: "110000",
      },
    ],
  },
  // 机构列表
  "/api/sysOrg/elder/homePage": {
    code: "000000",
    data: [
      {
        deptNo: "xxx",
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptNo: "xxx",
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
      {
        deptName: "长寿养老院",
        commAddr: "长寿大街1-1",
        instContTel: "1909090-111221",
        instCategCode: "02",
        areaName: "普陀区",
        filePath: "xxxxxx",
      },
    ],
  },
  "/api/region/v1/qrySelective": {
    data: [
      {
        areaNo: "xxx",
        areaName: "xxx",
      },
    ],
  },
  "/api/region/v1/qry/area": {
    data: [
      {
        areaNo: "xxx",
        areaName: "xxx",
      },
    ],
  },
  // 机构详情
  "/api/sysOrg/elder/instDetail": {
    data: {
      deptNo: "xxx",
      deptName: "长寿养老院",
      commAddr: "长寿大街1-1",
      instContTel: "1909090-111221",
      instCategCode: "02",
      areaName: "普陀区",
      filePath: "xxxxxx",
      remark: "机构简介信息详细信息哈哈哈",
      bedTypeVOList: [
        {
          dataTypeName: "单人间",
          id: "xxx",
          pledgeAmt: "123",
        },
        {
          dataTypeName: "单人间",
          id: "xxx",
          pledgeAmt: "123",
        },
        {
          dataTypeName: "单人间",
          id: "xxx",
          pledgeAmt: "123",
        },
      ],
    },
  },
  "/api/elderInfo/actions/add": {
    //添加老人
    data: {},
  },
  "/api/elderInfo/list": {
    // 老人列表
    data: [
      {
        userName: "张三",
        idNo: "131126197107010931",
        rltvRelCd: "3",
        id: "xxx",
      },
      {
        userName: "许仙",
        idNo: "131126196107010931",
        rltvRelCd: "5",
        id: "xxx",
      },
    ],
  },
  "/api/elderInfo/detail?id=xxx": {
    // 老人详情
    data: {
      userName: "张三丰", // 姓名
      sexCode: "1", // 性别
      idNo: "131126188007018989", //身份证号
      birthDate: "1988-03", //出生年月
      cardNo: "xxxxxx", //银行卡号
      oacBankName: "北京银行", // 开户行
      hsAddrTpNo: "1", //户籍地
      custDtlAddr: "北京海淀", // 户籍地址
      emergConterName: "张无忌", // 紧急联系人
      contTel: "13123454545", // 联系方式
      rltvRelCd: "7", // 亲属关系
    },
  },
  "/api/orderPay/list": {
    // 订单列表
    data: [
      {
        caseNumber: "xxxxabccddaaeee",
        orderNo: "sddd--234422--22-订单编号",
        instName: "x-ss-机构名称",
        feProjCd: "xxx", // 费用项目 0-押金
        userName: "张三丰",
        idNo: "131126177109010909",
        paymentAmt: "130",
      },
    ],
  },
  "/api/sysUser/detail": {
    data: {
      certStacd: "0",
    },
  },
};
