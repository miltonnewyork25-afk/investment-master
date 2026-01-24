/**
 * 跨市场监控图谱 v1.0
 *
 * 核心理念: 美股公司的业绩信号往往可以从其海外供应链（尤其是中国A股/港股）
 * 的经营数据中提前获取。本配置建立了双向映射关系。
 *
 * 使用场景:
 * 1. 中国供应商月度营收/出货量 → 推测美股客户订单趋势
 * 2. A股原材料价格变化 → 推测美股公司成本/利润率
 * 3. 中国竞争对手动态 → 推测美股公司市场份额变化
 * 4. 港股中间商库存 → 推测终端需求周期位置
 */

// ============ 类型定义 ============

/** 跨市场关系类型 */
export type CrossMarketRelation =
  | 'supplier'           // 供应商（A股公司供货给美股公司）
  | 'customer'           // 客户（A股公司采购美股公司产品）
  | 'competitor'         // 竞争对手（同行业，市场重叠）
  | 'distributor'        // 分销/渠道商
  | 'licensee'           // 被授权方
  | 'joint_venture';     // 合资方

/** 信号类型 - 可以从对方获取什么信息 */
export type SignalType =
  | 'revenue_proxy'      // 营收代理（供应商收入≈客户采购量）
  | 'order_flow'         // 订单流向
  | 'inventory_cycle'    // 库存周期信号
  | 'asp_trend'          // 平均售价趋势
  | 'capex_signal'       // 资本开支信号
  | 'market_share'       // 市场份额变化
  | 'demand_proxy'       // 终端需求代理
  | 'cost_pressure'      // 成本压力信号
  | 'tech_adoption';     // 技术采用/渗透率

/** 信号强度 */
export type SignalStrength = 'strong' | 'moderate' | 'weak';

/** 信号时效性 - 领先/同步/滞后于美股财报 */
export type SignalTiming = 'leading' | 'coincident' | 'lagging';

/** 跨市场公司映射 */
export interface CrossMarketLink {
  /** A股/港股代码 */
  foreignSymbol: string;
  /** 公司中文名 */
  name: string;
  /** 交易所标识 */
  exchange: 'SZ' | 'SH' | 'HK' | 'TW' | 'KS';
  /** 关系类型 */
  relation: CrossMarketRelation;
  /** 可获取的信号类型 */
  signals: SignalType[];
  /** 信号强度 */
  strength: SignalStrength;
  /** 信号时效 */
  timing: SignalTiming;
  /** 营收关联度（该外国公司与美股公司相关业务占比估计 0-1） */
  revenueRelevance: number;
  /** 备注 */
  note?: string;
}

/** 行业级别的跨市场映射 */
export interface IndustryCrossMarketMap {
  /** 行业描述 */
  description: string;
  /** 中国市场对应的关键数据指标 */
  keyMetrics: string[];
  /** 涉及的美股公司 */
  usStocks: string[];
  /** 涉及的A股/港股公司 */
  links: CrossMarketLink[];
}

// ============ 公司级别映射 ============

/**
 * 美股公司 → 跨市场供应链映射
 *
 * Key: 美股代码
 * Value: 关联的A股/港股/台股公司列表
 */
export const CROSS_MARKET_LINKS: Record<string, CrossMarketLink[]> = {

  // =====================================================
  // 消费电子供应链 (Apple, Qualcomm, etc.)
  // =====================================================

  'AAPL': [
    {
      foreignSymbol: '002475',
      name: '立讯精密',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['revenue_proxy', 'order_flow', 'asp_trend'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.7,
      note: 'AirPods/Apple Watch/iPhone组装',
    },
    {
      foreignSymbol: '002241',
      name: '歌尔股份',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['revenue_proxy', 'order_flow'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.5,
      note: 'AirPods声学组件/VR设备',
    },
    {
      foreignSymbol: '300433',
      name: '蓝思科技',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['revenue_proxy', 'asp_trend'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.5,
      note: 'iPhone/iPad玻璃盖板',
    },
    {
      foreignSymbol: '000725',
      name: '京东方A',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['asp_trend', 'inventory_cycle'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.15,
      note: 'OLED面板供应',
    },
    {
      foreignSymbol: '601138',
      name: '工业富联',
      exchange: 'SH',
      relation: 'supplier',
      signals: ['revenue_proxy', 'order_flow', 'demand_proxy'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.5,
      note: 'iPhone/iPad/Mac代工(鸿海系)',
    },
    {
      foreignSymbol: '2317',
      name: '鸿海精密',
      exchange: 'TW',
      relation: 'supplier',
      signals: ['revenue_proxy', 'order_flow'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.5,
      note: 'iPhone主力代工(Foxconn)',
    },
    {
      foreignSymbol: '002382',
      name: '蓝思科技', // 舜宇光学
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['asp_trend', 'tech_adoption'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.2,
    },
    {
      foreignSymbol: '02382',
      name: '舜宇光学',
      exchange: 'HK',
      relation: 'supplier',
      signals: ['asp_trend', 'tech_adoption'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.15,
      note: '手机摄像头模组',
    },
  ],

  'QCOM': [
    {
      foreignSymbol: '002049',
      name: '紫光国微',
      exchange: 'SZ',
      relation: 'customer',
      signals: ['demand_proxy', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '中国手机芯片市场动态',
    },
    {
      foreignSymbol: '002475',
      name: '立讯精密',
      exchange: 'SZ',
      relation: 'customer',
      signals: ['demand_proxy', 'order_flow'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.1,
      note: '安卓手机供应链出货量',
    },
  ],

  // =====================================================
  // 半导体设备/材料 (LRCX, AMAT, ASML, KLAC)
  // =====================================================

  'LRCX': [
    {
      foreignSymbol: '002371',
      name: '北方华创',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'capex_signal', 'tech_adoption'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '中国刻蚀设备国产替代',
    },
    {
      foreignSymbol: '688012',
      name: '中微公司',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '介质刻蚀国产替代',
    },
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.15,
      note: '最大客户之一，Capex指引→设备订单',
    },
    {
      foreignSymbol: '000049',
      name: '德赛微电子', // 华虹半导体
      exchange: 'SZ',
      relation: 'customer',
      signals: ['capex_signal'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
    },
  ],

  'AMAT': [
    {
      foreignSymbol: '002371',
      name: '北方华创',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: 'PVD/CVD/刻蚀国产替代竞争',
    },
    {
      foreignSymbol: '688981',
      name: '中芯集成',
      exchange: 'SH',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.05,
      note: '中国晶圆厂扩产信号',
    },
    {
      foreignSymbol: '688981',
      name: '中芯国际',
      exchange: 'SH',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.08,
      note: '中国最大逻辑代工厂',
    },
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.12,
    },
    {
      foreignSymbol: '000005',
      name: '三星电子(韩)',
      exchange: 'KS',
      relation: 'customer',
      signals: ['capex_signal', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.1,
      note: 'Memory capex cycle',
    },
  ],

  'ASML': [
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.3,
      note: 'EUV/DUV光刻机最大客户',
    },
    {
      foreignSymbol: '688981',
      name: '中芯国际',
      exchange: 'SH',
      relation: 'customer',
      signals: ['capex_signal', 'tech_adoption'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: 'DUV客户(EUV受限)',
    },
  ],

  'KLAC': [
    {
      foreignSymbol: '688072',
      name: '精测电子',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
      note: '半导体检测设备国产替代',
    },
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'customer',
      signals: ['capex_signal', 'order_flow'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.15,
    },
  ],

  // =====================================================
  // GPU/AI芯片 (NVIDIA, AMD)
  // =====================================================

  'NVDA': [
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'supplier',
      signals: ['order_flow', 'capex_signal', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.3,
      note: '5nm/4nm代工（H100/B100）',
    },
    {
      foreignSymbol: '2454',
      name: '联发科',
      exchange: 'TW',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '边缘AI芯片竞争',
    },
    {
      foreignSymbol: '000063',
      name: '中兴通讯',
      exchange: 'SZ',
      relation: 'customer',
      signals: ['demand_proxy', 'capex_signal'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '中国AI服务器需求',
    },
    {
      foreignSymbol: '00700',
      name: '腾讯控股',
      exchange: 'HK',
      relation: 'customer',
      signals: ['capex_signal', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '中国云/AI训练GPU需求',
    },
    {
      foreignSymbol: '09988',
      name: '阿里巴巴',
      exchange: 'HK',
      relation: 'customer',
      signals: ['capex_signal', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '阿里云AI GPU采购',
    },
  ],

  'AMD': [
    {
      foreignSymbol: '2330',
      name: '台积电',
      exchange: 'TW',
      relation: 'supplier',
      signals: ['order_flow', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.25,
      note: '7nm/5nm代工',
    },
    {
      foreignSymbol: '688041',
      name: '海光信息',
      exchange: 'SH',
      relation: 'licensee',
      signals: ['market_share', 'tech_adoption'],
      strength: 'moderate',
      timing: 'lagging',
      revenueRelevance: 0.03,
      note: 'Zen架构授权（x86服务器CPU）',
    },
  ],

  // =====================================================
  // 电动车供应链 (TSLA, GM, F)
  // =====================================================

  'TSLA': [
    {
      foreignSymbol: '300750',
      name: '宁德时代',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['revenue_proxy', 'order_flow', 'asp_trend', 'inventory_cycle'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.3,
      note: '磷酸铁锂电池主力供应商(上海工厂)',
    },
    {
      foreignSymbol: '002460',
      name: '赣锋锂业',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['cost_pressure', 'asp_trend'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.1,
      note: '锂矿/碳酸锂价格→电池成本',
    },
    {
      foreignSymbol: '002812',
      name: '恩捷股份',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['order_flow', 'asp_trend'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.05,
      note: '锂电隔膜供应商',
    },
    {
      foreignSymbol: '300014',
      name: '亿纬锂能',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['order_flow', 'inventory_cycle'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.1,
      note: '大圆柱电池供应商(4680)',
    },
    {
      foreignSymbol: '01211',
      name: '比亚迪',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share', 'asp_trend', 'demand_proxy'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.15,
      note: '中国+全球EV直接竞争对手',
    },
    {
      foreignSymbol: '300274',
      name: '阳光电源',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '储能逆变器竞争(Megapack)',
    },
    {
      foreignSymbol: '600741',
      name: '华域汽车',
      exchange: 'SH',
      relation: 'supplier',
      signals: ['order_flow'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.05,
      note: '汽车零部件(上海工厂)',
    },
  ],

  'GM': [
    {
      foreignSymbol: '300750',
      name: '宁德时代',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['order_flow', 'asp_trend'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.1,
      note: 'Ultium电池合作',
    },
    {
      foreignSymbol: '01211',
      name: '比亚迪',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
    },
  ],

  'F': [
    {
      foreignSymbol: '300750',
      name: '宁德时代',
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['order_flow', 'asp_trend'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.08,
      note: 'Mustang Mach-E/F-150 Lightning电池',
    },
  ],

  // =====================================================
  // 存储/内存 (MU, WDC)
  // =====================================================

  'MU': [
    {
      foreignSymbol: '000005',
      name: '三星电子',
      exchange: 'KS',
      relation: 'competitor',
      signals: ['asp_trend', 'inventory_cycle', 'market_share', 'capex_signal'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.3,
      note: 'DRAM/NAND直接竞争',
    },
    {
      foreignSymbol: '000660',
      name: 'SK海力士',
      exchange: 'KS',
      relation: 'competitor',
      signals: ['asp_trend', 'inventory_cycle', 'market_share'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.25,
      note: 'DRAM/HBM直接竞争',
    },
    {
      foreignSymbol: '688981',
      name: '长鑫存储(合肥)',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
      note: '中国DRAM国产替代',
    },
  ],

  // =====================================================
  // 新能源/光伏 (ENPH, SEDG, FSLR)
  // =====================================================

  'ENPH': [
    {
      foreignSymbol: '300274',
      name: '阳光电源',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'asp_trend', 'demand_proxy'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.2,
      note: '逆变器全球竞争（美国/欧洲市场）',
    },
    {
      foreignSymbol: '688599',
      name: '天合光能',
      exchange: 'SH',
      relation: 'supplier',
      signals: ['asp_trend', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '光伏组件价格→安装需求',
    },
  ],

  'FSLR': [
    {
      foreignSymbol: '601012',
      name: '隆基绿能',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share', 'cost_pressure'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.2,
      note: '光伏组件/电池片直接竞争',
    },
    {
      foreignSymbol: '002459',
      name: '晶澳科技',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
    },
    {
      foreignSymbol: '688599',
      name: '天合光能',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
    },
  ],

  // =====================================================
  // 工程机械 (CAT, DE)
  // =====================================================

  'CAT': [
    {
      foreignSymbol: '600031',
      name: '三一重工',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy', 'inventory_cycle'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '挖掘机/起重机全球竞争',
    },
    {
      foreignSymbol: '000157',
      name: '中联重科',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '混凝土机械/起重机',
    },
    {
      foreignSymbol: '600150',
      name: '中国船舶',
      exchange: 'SH',
      relation: 'customer',
      signals: ['demand_proxy'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
      note: '船用发动机需求',
    },
  ],

  'DE': [
    {
      foreignSymbol: '000425',
      name: '徐工机械',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '农机/工程机械新兴市场竞争',
    },
  ],

  // =====================================================
  // 化工/材料 (LIN, DOW, DD)
  // =====================================================

  'LIN': [
    {
      foreignSymbol: '600809',
      name: '杭氧股份',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '工业气体中国市场竞争',
    },
  ],

  'DOW': [
    {
      foreignSymbol: '600346',
      name: '恒力石化',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend', 'demand_proxy', 'cost_pressure'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '聚乙烯/乙二醇竞争',
    },
    {
      foreignSymbol: '600028',
      name: '中国石化',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend', 'cost_pressure'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '石化产品亚太竞争',
    },
  ],

  // =====================================================
  // 消费品/零售 (NKE, SBUX, MCD)
  // =====================================================

  'NKE': [
    {
      foreignSymbol: '02020',
      name: '安踏体育',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy', 'asp_trend'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '中国运动品牌市场直接竞争',
    },
    {
      foreignSymbol: '02331',
      name: '李宁',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '国潮品牌竞争',
    },
    {
      foreignSymbol: '002029',
      name: '七匹狼', // 裕元工业
      exchange: 'SZ',
      relation: 'supplier',
      signals: ['order_flow', 'cost_pressure'],
      strength: 'moderate',
      timing: 'leading',
      revenueRelevance: 0.15,
      note: '中国代工厂出货量',
    },
    {
      foreignSymbol: '00551',
      name: '裕元集团',
      exchange: 'HK',
      relation: 'supplier',
      signals: ['order_flow', 'cost_pressure'],
      strength: 'strong',
      timing: 'leading',
      revenueRelevance: 0.2,
      note: '运动鞋最大代工(宝成系)',
    },
  ],

  'SBUX': [
    {
      foreignSymbol: '09987',
      name: '瑞幸咖啡',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy', 'asp_trend'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.15,
      note: '中国咖啡市场最大竞争对手',
    },
  ],

  'EL': [
    {
      foreignSymbol: '600315',
      name: '上海家化',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '中国化妆品市场',
    },
    {
      foreignSymbol: '300957',
      name: '贝泰妮',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '中国护肤品市场（薇诺娜）',
    },
  ],

  // =====================================================
  // 奢侈品 (相关美股如CPRI, TPR)
  // =====================================================

  'CPRI': [
    {
      foreignSymbol: '01913',
      name: 'PRADA',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['demand_proxy', 'asp_trend', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '奢侈品中国需求信号',
    },
  ],

  // =====================================================
  // 医药/生物科技 (PFE, LLY, ABBV)
  // =====================================================

  'PFE': [
    {
      foreignSymbol: '600276',
      name: '恒瑞医药',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'moderate',
      timing: 'lagging',
      revenueRelevance: 0.03,
      note: '中国创新药竞争（PD-1等）',
    },
    {
      foreignSymbol: '01093',
      name: '石药集团',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
    },
  ],

  'LLY': [
    {
      foreignSymbol: '09926',
      name: '信达生物',
      exchange: 'HK',
      relation: 'licensee',
      signals: ['demand_proxy', 'tech_adoption'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: 'GLP-1类药物中国合作',
    },
  ],

  // =====================================================
  // 航运/物流 (UPS, FDX)
  // =====================================================

  'UPS': [
    {
      foreignSymbol: '002352',
      name: '顺丰控股',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '中国快递市场/跨境物流',
    },
    {
      foreignSymbol: '02618',
      name: '京东物流',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['demand_proxy'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
    },
  ],

  // =====================================================
  // 云计算/互联网 (AMZN, GOOGL, MSFT)
  // =====================================================

  'AMZN': [
    {
      foreignSymbol: '09988',
      name: '阿里巴巴',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '电商/云计算中国市场',
    },
    {
      foreignSymbol: '09618',
      name: '京东集团',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['demand_proxy'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '电商中国市场',
    },
  ],

  'MSFT': [
    {
      foreignSymbol: '00700',
      name: '腾讯控股',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['demand_proxy', 'market_share'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '游戏/云/AI竞争',
    },
    {
      foreignSymbol: '688111',
      name: '金山办公',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share', 'tech_adoption'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.01,
      note: 'WPS vs Office中国市场',
    },
  ],

  // =====================================================
  // 电信设备 (CSCO, ERIC)
  // =====================================================

  'CSCO': [
    {
      foreignSymbol: '000063',
      name: '中兴通讯',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.05,
      note: '5G/网络设备全球竞争',
    },
    {
      foreignSymbol: '000977',
      name: '浪潮信息',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['market_share', 'demand_proxy'],
      strength: 'weak',
      timing: 'coincident',
      revenueRelevance: 0.02,
      note: '服务器/交换机中国市场',
    },
  ],

  // =====================================================
  // 面板/显示 (相关美股)
  // =====================================================

  'OLED': [
    {
      foreignSymbol: '000725',
      name: '京东方A',
      exchange: 'SZ',
      relation: 'customer',
      signals: ['revenue_proxy', 'demand_proxy', 'tech_adoption'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.3,
      note: 'OLED材料最大客户之一',
    },
    {
      foreignSymbol: '3529',
      name: '力晶科',
      exchange: 'TW',
      relation: 'customer',
      signals: ['demand_proxy'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
    },
  ],

  // =====================================================
  // 稀土/特种材料 (MP)
  // =====================================================

  'MP': [
    {
      foreignSymbol: '600111',
      name: '北方稀土',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share', 'inventory_cycle'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.3,
      note: '稀土定价权在中国',
    },
    {
      foreignSymbol: '600549',
      name: '厦门钨业',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['asp_trend'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.1,
      note: '稀土/钨制品',
    },
  ],

  // =====================================================
  // 农业/食品 (ADM, BG, CTVA)
  // =====================================================

  'ADM': [
    {
      foreignSymbol: '000876',
      name: '新希望',
      exchange: 'SZ',
      relation: 'customer',
      signals: ['demand_proxy', 'inventory_cycle'],
      strength: 'moderate',
      timing: 'coincident',
      revenueRelevance: 0.03,
      note: '饲料/大豆需求信号',
    },
  ],

  // =====================================================
  // 航空 (BA, RTX)
  // =====================================================

  'BA': [
    {
      foreignSymbol: '600760',
      name: '中航沈飞',
      exchange: 'SH',
      relation: 'competitor',
      signals: ['market_share'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
      note: '军用飞机/C919竞争',
    },
    {
      foreignSymbol: '01316',
      name: '中航科工',
      exchange: 'HK',
      relation: 'competitor',
      signals: ['market_share'],
      strength: 'weak',
      timing: 'lagging',
      revenueRelevance: 0.02,
    },
  ],

  // =====================================================
  // 锂电/新能源材料
  // =====================================================

  'ALB': [
    {
      foreignSymbol: '002460',
      name: '赣锋锂业',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['asp_trend', 'inventory_cycle', 'market_share'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.2,
      note: '全球锂矿/碳酸锂直接竞争',
    },
    {
      foreignSymbol: '002466',
      name: '天齐锂业',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.15,
      note: '锂矿/锂盐竞争',
    },
  ],

  'SQM': [
    {
      foreignSymbol: '002460',
      name: '赣锋锂业',
      exchange: 'SZ',
      relation: 'competitor',
      signals: ['asp_trend', 'market_share'],
      strength: 'strong',
      timing: 'coincident',
      revenueRelevance: 0.15,
    },
  ],
};

// ============ 行业级别映射 ============

/**
 * 行业级别的跨市场监控
 *
 * 当无法精确到单一公司时，通过行业指标监控
 */
export const INDUSTRY_CROSS_MARKET: Record<string, IndustryCrossMarketMap> = {

  'semiconductor_equipment': {
    description: '半导体设备 - 中国国产替代与全球Capex周期',
    keyMetrics: [
      '中国晶圆厂月度Capex披露',
      '北方华创/中微公司订单增速',
      'SEMI中国设备出货额(月度)',
      '大基金投资动态',
    ],
    usStocks: ['LRCX', 'AMAT', 'ASML', 'KLAC', 'TER', 'ENTG', 'UCTT'],
    links: [
      {
        foreignSymbol: '002371', name: '北方华创', exchange: 'SZ',
        relation: 'competitor', signals: ['market_share', 'capex_signal'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.05,
      },
      {
        foreignSymbol: '688012', name: '中微公司', exchange: 'SH',
        relation: 'competitor', signals: ['market_share', 'tech_adoption'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.03,
      },
      {
        foreignSymbol: '688396', name: '华峰测控', exchange: 'SH',
        relation: 'competitor', signals: ['market_share'],
        strength: 'weak', timing: 'lagging', revenueRelevance: 0.01,
        note: '半导体测试设备',
      },
      {
        foreignSymbol: '300236', name: '上海新阳', exchange: 'SZ',
        relation: 'competitor', signals: ['market_share'],
        strength: 'weak', timing: 'lagging', revenueRelevance: 0.01,
        note: '半导体材料(光刻胶等)',
      },
    ],
  },

  'ev_battery_chain': {
    description: '电动车电池链 - 从锂矿到电芯到整车',
    keyMetrics: [
      '碳酸锂/氢氧化锂现货价(上海有色)',
      '宁德时代月度装机量',
      '中国新能源车月销量(乘联会)',
      '正极/负极/电解液价格指数',
    ],
    usStocks: ['TSLA', 'GM', 'F', 'RIVN', 'LCID', 'ALB', 'SQM', 'LAC'],
    links: [
      {
        foreignSymbol: '300750', name: '宁德时代', exchange: 'SZ',
        relation: 'supplier', signals: ['order_flow', 'asp_trend', 'inventory_cycle'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.3,
      },
      {
        foreignSymbol: '002460', name: '赣锋锂业', exchange: 'SZ',
        relation: 'supplier', signals: ['asp_trend', 'cost_pressure'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.15,
      },
      {
        foreignSymbol: '002466', name: '天齐锂业', exchange: 'SZ',
        relation: 'supplier', signals: ['asp_trend'],
        strength: 'moderate', timing: 'leading', revenueRelevance: 0.1,
      },
      {
        foreignSymbol: '002812', name: '恩捷股份', exchange: 'SZ',
        relation: 'supplier', signals: ['order_flow', 'asp_trend'],
        strength: 'moderate', timing: 'leading', revenueRelevance: 0.05,
        note: '隔膜',
      },
      {
        foreignSymbol: '300014', name: '亿纬锂能', exchange: 'SZ',
        relation: 'supplier', signals: ['order_flow'],
        strength: 'moderate', timing: 'leading', revenueRelevance: 0.08,
        note: '4680大圆柱电池',
      },
      {
        foreignSymbol: '01211', name: '比亚迪', exchange: 'HK',
        relation: 'competitor', signals: ['market_share', 'demand_proxy'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.15,
      },
    ],
  },

  'solar_chain': {
    description: '光伏产业链 - 从多晶硅到组件到电站',
    keyMetrics: [
      '多晶硅/硅片/电池片/组件价格(PV InfoLink)',
      '中国光伏装机量(国家能源局)',
      '组件出口数据(海关)',
      '光伏逆变器出货量',
    ],
    usStocks: ['FSLR', 'ENPH', 'SEDG', 'RUN', 'NOVA', 'ARRY', 'SPWR'],
    links: [
      {
        foreignSymbol: '601012', name: '隆基绿能', exchange: 'SH',
        relation: 'competitor', signals: ['asp_trend', 'market_share'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.2,
      },
      {
        foreignSymbol: '002459', name: '晶澳科技', exchange: 'SZ',
        relation: 'competitor', signals: ['asp_trend', 'market_share'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.1,
      },
      {
        foreignSymbol: '688599', name: '天合光能', exchange: 'SH',
        relation: 'competitor', signals: ['asp_trend', 'market_share'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.1,
      },
      {
        foreignSymbol: '300274', name: '阳光电源', exchange: 'SZ',
        relation: 'competitor', signals: ['market_share', 'demand_proxy'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.15,
        note: '逆变器+储能',
      },
      {
        foreignSymbol: '600438', name: '通威股份', exchange: 'SH',
        relation: 'competitor', signals: ['asp_trend', 'cost_pressure'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.15,
        note: '多晶硅/电池片成本标杆',
      },
    ],
  },

  'consumer_electronics': {
    description: '消费电子供应链 - 从芯片到组装到品牌',
    keyMetrics: [
      '中国智能手机月出货量(信通院)',
      'DRAM/NAND现货价格',
      '面板价格(WitsView)',
      '代工厂PMI/营收月报',
    ],
    usStocks: ['AAPL', 'QCOM', 'AVGO', 'TXN', 'SWKS', 'QRVO'],
    links: [
      {
        foreignSymbol: '002475', name: '立讯精密', exchange: 'SZ',
        relation: 'supplier', signals: ['revenue_proxy', 'order_flow'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.4,
      },
      {
        foreignSymbol: '601138', name: '工业富联', exchange: 'SH',
        relation: 'supplier', signals: ['revenue_proxy', 'order_flow'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.4,
      },
      {
        foreignSymbol: '000725', name: '京东方A', exchange: 'SZ',
        relation: 'supplier', signals: ['asp_trend', 'inventory_cycle'],
        strength: 'moderate', timing: 'leading', revenueRelevance: 0.1,
        note: '面板价格→消费电子成本',
      },
      {
        foreignSymbol: '02382', name: '舜宇光学', exchange: 'HK',
        relation: 'supplier', signals: ['asp_trend', 'tech_adoption'],
        strength: 'moderate', timing: 'leading', revenueRelevance: 0.1,
        note: '手机镜头/摄像模组',
      },
    ],
  },

  'sportswear_chain': {
    description: '运动品牌供应链 - 从代工到品牌到零售',
    keyMetrics: [
      '中国运动服饰零售额(月度)',
      '安踏/李宁同店销售增速',
      '代工厂(裕元/申洲)产能利用率',
      '双11/618体育品类GMV',
    ],
    usStocks: ['NKE', 'LULU', 'UAA', 'DECK', 'ONON', 'SKX'],
    links: [
      {
        foreignSymbol: '02020', name: '安踏体育', exchange: 'HK',
        relation: 'competitor', signals: ['demand_proxy', 'market_share'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.1,
      },
      {
        foreignSymbol: '02331', name: '李宁', exchange: 'HK',
        relation: 'competitor', signals: ['demand_proxy', 'market_share'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.05,
      },
      {
        foreignSymbol: '02313', name: '申洲国际', exchange: 'HK',
        relation: 'supplier', signals: ['order_flow', 'cost_pressure'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.25,
        note: '运动服装最大代工(Nike/Adidas/Puma)',
      },
      {
        foreignSymbol: '00551', name: '裕元集团', exchange: 'HK',
        relation: 'supplier', signals: ['order_flow', 'cost_pressure'],
        strength: 'strong', timing: 'leading', revenueRelevance: 0.2,
        note: '运动鞋最大代工(宝成系)',
      },
    ],
  },

  'construction_machinery': {
    description: '工程机械 - 中国基建周期是全球需求风向标',
    keyMetrics: [
      '中国挖掘机月销量(工程机械协会)',
      '三一/徐工/中联月度开工小时数',
      '水泥产量/价格',
      '基建投资增速(统计局)',
    ],
    usStocks: ['CAT', 'DE', 'CNH', 'TEX', 'URI'],
    links: [
      {
        foreignSymbol: '600031', name: '三一重工', exchange: 'SH',
        relation: 'competitor', signals: ['demand_proxy', 'market_share'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.1,
      },
      {
        foreignSymbol: '000157', name: '中联重科', exchange: 'SZ',
        relation: 'competitor', signals: ['demand_proxy'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.05,
      },
      {
        foreignSymbol: '000425', name: '徐工机械', exchange: 'SZ',
        relation: 'competitor', signals: ['demand_proxy', 'market_share'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.05,
      },
    ],
  },

  'shipping_container': {
    description: '集运/航运 - 中国出口量是运价领先指标',
    keyMetrics: [
      'SCFI(上海出口集装箱运价指数)',
      'BDI(波罗的海干散货指数)',
      '中国港口吞吐量(月度)',
      '出口集装箱空箱率',
    ],
    usStocks: ['ZIM', 'MATX', 'DAC', 'GXO', 'XPO'],
    links: [
      {
        foreignSymbol: '601919', name: '中远海控', exchange: 'SH',
        relation: 'competitor', signals: ['asp_trend', 'demand_proxy', 'inventory_cycle'],
        strength: 'strong', timing: 'coincident', revenueRelevance: 0.15,
        note: '全球第四大集运',
      },
      {
        foreignSymbol: '02866', name: '中远海发', exchange: 'HK',
        relation: 'competitor', signals: ['demand_proxy'],
        strength: 'moderate', timing: 'coincident', revenueRelevance: 0.05,
        note: '集装箱租赁/船舶租赁',
      },
    ],
  },
};

// ============ 监控日历 ============

/**
 * 关键数据发布节点
 * 用于提前预判美股公司财报
 */
export const MONITORING_CALENDAR: Record<string, {
  frequency: 'monthly' | 'quarterly' | 'weekly';
  source: string;
  description: string;
  relevantUSStocks: string[];
}> = {
  'china_smartphone_shipments': {
    frequency: 'monthly',
    source: '中国信通院',
    description: '中国智能手机出货量（出货后5-7天发布）',
    relevantUSStocks: ['AAPL', 'QCOM', 'AVGO', 'SWKS', 'QRVO'],
  },
  'catl_monthly_install': {
    frequency: 'monthly',
    source: '中国汽车动力电池产业创新联盟',
    description: '宁德时代月度装车量',
    relevantUSStocks: ['TSLA', 'ALB', 'SQM', 'LAC'],
  },
  'china_pmi': {
    frequency: 'monthly',
    source: '国家统计局',
    description: '中国制造业PMI（每月最后一天）',
    relevantUSStocks: ['CAT', 'DE', 'DOW', 'LIN', 'LRCX', 'AMAT'],
  },
  'china_ev_sales': {
    frequency: 'monthly',
    source: '中汽协/乘联会',
    description: '中国新能源车批发/零售销量',
    relevantUSStocks: ['TSLA', 'GM', 'F', 'ALB', 'ON', 'TXN'],
  },
  'scfi_index': {
    frequency: 'weekly',
    source: '上海航运交易所',
    description: '上海出口集装箱运价指数(每周五)',
    relevantUSStocks: ['ZIM', 'MATX', 'DAC'],
  },
  'polysilicon_price': {
    frequency: 'weekly',
    source: 'PV InfoLink / 硅业分会',
    description: '多晶硅/硅片/电池片价格',
    relevantUSStocks: ['FSLR', 'ENPH', 'SEDG', 'RUN'],
  },
  'lithium_carbonate_price': {
    frequency: 'weekly',
    source: '上海有色金属网/SMM',
    description: '碳酸锂/氢氧化锂现货价',
    relevantUSStocks: ['ALB', 'SQM', 'LAC', 'TSLA'],
  },
  'dram_nand_spot': {
    frequency: 'weekly',
    source: 'DRAMeXchange/TrendForce',
    description: 'DRAM/NAND现货合约价',
    relevantUSStocks: ['MU', 'WDC'],
  },
  'semi_equipment_billings': {
    frequency: 'monthly',
    source: 'SEMI',
    description: '中国区半导体设备出货额',
    relevantUSStocks: ['LRCX', 'AMAT', 'KLAC', 'TER', 'ENTG'],
  },
  'tsmc_monthly_revenue': {
    frequency: 'monthly',
    source: '台积电月度营收公告(每月10日)',
    description: '台积电月度营收（领先半导体需求3-6个月）',
    relevantUSStocks: ['NVDA', 'AMD', 'AAPL', 'QCOM', 'AVGO', 'LRCX', 'AMAT'],
  },
  'china_excavator_sales': {
    frequency: 'monthly',
    source: '中国工程机械工业协会',
    description: '挖掘机月度销量',
    relevantUSStocks: ['CAT', 'DE', 'CNH', 'TEX'],
  },
  'rare_earth_prices': {
    frequency: 'weekly',
    source: '百川盈孚/亚洲金属网',
    description: '稀土氧化物价格(镨钕/镝铽)',
    relevantUSStocks: ['MP'],
  },
};
