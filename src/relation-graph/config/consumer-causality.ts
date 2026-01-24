/**
 * 消费者因果链与相关性模型 v1.0
 *
 * 核心理念: 消费者行为存在因果链和相关性聚类。
 * 一个消费领域的变化会传导至相关领域，形成可预测的消费级联效应。
 *
 * 三层模型:
 * 1. 消费因果链 (Causal Chains): A领域变化→B领域变化→C领域变化
 *    例: 房价上涨 → 家具/装修需求增加 → 家电需求增加 → 水电费增加
 *
 * 2. 消费相关聚类 (Correlation Clusters): 同类消费者的消费篮子
 *    例: 健身人群 → athleisure + 健康食品 + 运动补剂 + 可穿戴设备
 *
 * 3. 消费替代/互补 (Substitution/Complement): 钱包份额竞争
 *    例: 外出就餐↑ → 在家烹饪↓ (替代)
 *    例: 旅行↑ → 行李箱/防晒霜↑ (互补)
 */

// ============ 类型定义 ============

/** 消费类目 */
export type ConsumerCategory =
  | 'housing'              // 住房（房贷/租金）
  | 'home_improvement'     // 家装/翻新
  | 'furniture'            // 家具
  | 'home_appliances'      // 家电
  | 'utilities'            // 水电燃气
  | 'automotive'           // 汽车购买
  | 'auto_parts'           // 汽车维修/配件
  | 'fuel'                 // 燃油/充电
  | 'groceries'            // 日常杂货
  | 'dining_out'           // 外出就餐
  | 'quick_service'        // 快餐
  | 'coffee'               // 咖啡/茶饮
  | 'alcohol'              // 酒类
  | 'fitness'              // 健身/运动
  | 'athleisure'           // 运动休闲服饰
  | 'health_supplements'   // 保健品/营养补剂
  | 'healthy_food'         // 健康食品
  | 'luxury_fashion'       // 奢侈品/时尚
  | 'fast_fashion'         // 快时尚
  | 'beauty_skincare'      // 美妆护肤
  | 'travel'               // 旅行
  | 'hotels'               // 酒店住宿
  | 'airlines'             // 航空出行
  | 'cruise'               // 邮轮
  | 'entertainment'        // 娱乐（电影/演出）
  | 'streaming'            // 流媒体
  | 'gaming'               // 游戏
  | 'gambling'             // 博彩
  | 'pets'                 // 宠物
  | 'childcare'            // 育儿/教育
  | 'electronics'          // 消费电子
  | 'smartphones'          // 智能手机
  | 'wearables'            // 可穿戴设备
  | 'insurance'            // 保险
  | 'healthcare'           // 医疗保健
  | 'prescription_drugs'   // 处方药
  | 'financial_services'   // 金融服务
  | 'subscriptions'        // 订阅服务(SaaS等)
  | 'online_shopping'      // 在线购物
  | 'delivery'             // 外卖/配送
  | 'rideshare'            // 网约车
  | 'home_security'        // 家庭安防
  | 'solar_residential'    // 家用光伏
  | 'ev_charging';         // 电动车充电

/** 因果关系方向 */
export type CausalDirection = 'positive' | 'negative';

/** 传导速度 */
export type PropagationSpeed = 'immediate' | 'short_term' | 'medium_term' | 'long_term';
// immediate: <1个月, short_term: 1-3个月, medium_term: 3-6个月, long_term: 6-12个月

/** 因果链节点 */
export interface CausalLink {
  /** 目标消费类目 */
  target: ConsumerCategory;
  /** 因果方向 (正向/反向) */
  direction: CausalDirection;
  /** 传导强度 0-1 */
  strength: number;
  /** 传导速度 */
  speed: PropagationSpeed;
  /** 传导逻辑 */
  mechanism: string;
}

/** 消费聚类 */
export interface ConsumerCluster {
  /** 聚类名称 */
  name: string;
  /** 核心人群画像 */
  demographic: string;
  /** 关联的消费类目 */
  categories: ConsumerCategory[];
  /** 关联的美股 */
  stocks: string[];
  /** 驱动因素 */
  drivers: string[];
}

/** 替代/互补关系 */
export interface SubstitutionPair {
  /** 类目A */
  categoryA: ConsumerCategory;
  /** 类目B */
  categoryB: ConsumerCategory;
  /** 关系类型 */
  type: 'substitute' | 'complement';
  /** 弹性系数估计 (-1 to 1, 负数=替代, 正数=互补) */
  elasticity: number;
  /** 说明 */
  note: string;
}

// ============ 消费因果链 ============

/**
 * 因果链映射: 当某个消费类目发生变化时，其他类目如何传导
 *
 * Key: 触发类目
 * Value: 受影响的类目列表及传导逻辑
 */
export const CONSUMER_CAUSAL_CHAINS: Record<ConsumerCategory, CausalLink[]> = {

  'housing': [
    { target: 'home_improvement', direction: 'positive', strength: 0.9, speed: 'short_term',
      mechanism: '购房后装修需求（新房2-6个月内启动装修）' },
    { target: 'furniture', direction: 'positive', strength: 0.85, speed: 'short_term',
      mechanism: '新房需要添置家具' },
    { target: 'home_appliances', direction: 'positive', strength: 0.8, speed: 'medium_term',
      mechanism: '装修完成后购买家电' },
    { target: 'utilities', direction: 'positive', strength: 0.7, speed: 'medium_term',
      mechanism: '新增住房增加水电支出' },
    { target: 'home_security', direction: 'positive', strength: 0.6, speed: 'short_term',
      mechanism: '新房主安装安防系统' },
    { target: 'solar_residential', direction: 'positive', strength: 0.4, speed: 'long_term',
      mechanism: '房主考虑太阳能降低电费' },
    { target: 'insurance', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '房贷要求购买房屋保险' },
    { target: 'dining_out', direction: 'negative', strength: 0.3, speed: 'short_term',
      mechanism: '房贷支出挤压非必要消费' },
  ],

  'home_improvement': [
    { target: 'home_appliances', direction: 'positive', strength: 0.7, speed: 'short_term',
      mechanism: '厨卫翻新→更换家电' },
    { target: 'furniture', direction: 'positive', strength: 0.6, speed: 'short_term',
      mechanism: '装修风格统一→更换家具' },
    { target: 'home_security', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '翻新时升级安防' },
  ],

  'furniture': [
    { target: 'home_appliances', direction: 'positive', strength: 0.3, speed: 'short_term',
      mechanism: '家居升级连带效应' },
  ],

  'home_appliances': [
    { target: 'utilities', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '更多电器→更高电费' },
  ],

  'utilities': [],

  'automotive': [
    { target: 'fuel', direction: 'positive', strength: 0.8, speed: 'immediate',
      mechanism: '买车后燃油/充电需求' },
    { target: 'auto_parts', direction: 'positive', strength: 0.5, speed: 'medium_term',
      mechanism: '保养/维修需求(首保3-6个月后)' },
    { target: 'insurance', direction: 'positive', strength: 0.9, speed: 'immediate',
      mechanism: '购车必须买保险' },
    { target: 'ev_charging', direction: 'positive', strength: 0.6, speed: 'immediate',
      mechanism: '电动车→充电桩需求' },
    { target: 'travel', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '有车后自驾游增加' },
    { target: 'dining_out', direction: 'negative', strength: 0.2, speed: 'short_term',
      mechanism: '车贷挤压消费' },
  ],

  'auto_parts': [],

  'fuel': [],

  'groceries': [
    { target: 'dining_out', direction: 'negative', strength: 0.5, speed: 'immediate',
      mechanism: '在家做饭↑ → 外出就餐↓ (替代)' },
    { target: 'healthy_food', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '健康意识提升同步影响' },
    { target: 'delivery', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '生鲜配送替代超市购物' },
  ],

  'dining_out': [
    { target: 'groceries', direction: 'negative', strength: 0.4, speed: 'immediate',
      mechanism: '外出就餐↑ → 买菜做饭↓' },
    { target: 'quick_service', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '餐饮消费活跃→快餐也受益' },
    { target: 'alcohol', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '聚餐→饮酒' },
    { target: 'rideshare', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '外出就餐→打车需求(饮酒后)' },
    { target: 'delivery', direction: 'negative', strength: 0.3, speed: 'immediate',
      mechanism: '堂食↑ → 外卖↓' },
  ],

  'quick_service': [
    { target: 'delivery', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '快餐高度依赖外卖渠道' },
  ],

  'coffee': [
    { target: 'quick_service', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '咖啡消费场景→顺便购买食品' },
  ],

  'alcohol': [
    { target: 'rideshare', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '饮酒→打车回家' },
    { target: 'entertainment', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '酒吧/夜生活相关' },
    { target: 'gambling', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '赌场饮酒消费' },
  ],

  'fitness': [
    { target: 'athleisure', direction: 'positive', strength: 0.8, speed: 'short_term',
      mechanism: '健身人群购买运动服饰' },
    { target: 'health_supplements', direction: 'positive', strength: 0.7, speed: 'short_term',
      mechanism: '健身→蛋白粉/维生素需求' },
    { target: 'healthy_food', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '健身人群注重饮食' },
    { target: 'wearables', direction: 'positive', strength: 0.6, speed: 'short_term',
      mechanism: '健身追踪需求(Apple Watch/Garmin)' },
    { target: 'streaming', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '居家健身需要流媒体(Peloton等)' },
  ],

  'athleisure': [
    { target: 'fitness', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '穿运动服→更可能去健身(行为暗示)' },
  ],

  'health_supplements': [
    { target: 'healthy_food', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '保健意识→健康食品' },
  ],

  'healthy_food': [
    { target: 'groceries', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '有机/健康食品通常更贵→推高客单价' },
  ],

  'luxury_fashion': [
    { target: 'beauty_skincare', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '奢侈品消费者同时追求高端美妆' },
    { target: 'travel', direction: 'positive', strength: 0.6, speed: 'short_term',
      mechanism: '高端消费者旅行频率高' },
    { target: 'dining_out', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '高端消费→高端餐饮' },
    { target: 'fast_fashion', direction: 'negative', strength: 0.4, speed: 'immediate',
      mechanism: '奢侈品↑ → 快时尚↓ (消费升级)' },
  ],

  'fast_fashion': [
    { target: 'luxury_fashion', direction: 'negative', strength: 0.3, speed: 'medium_term',
      mechanism: '快时尚流行期间奢侈品增速放缓' },
    { target: 'online_shopping', direction: 'positive', strength: 0.6, speed: 'immediate',
      mechanism: '快时尚高度依赖电商渠道' },
  ],

  'beauty_skincare': [
    { target: 'health_supplements', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '护肤→口服美容(胶原蛋白等)' },
  ],

  'travel': [
    { target: 'airlines', direction: 'positive', strength: 0.9, speed: 'immediate',
      mechanism: '旅行→机票' },
    { target: 'hotels', direction: 'positive', strength: 0.9, speed: 'immediate',
      mechanism: '旅行→住宿' },
    { target: 'cruise', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '旅行需求→邮轮选择' },
    { target: 'dining_out', direction: 'positive', strength: 0.6, speed: 'immediate',
      mechanism: '旅行中外出就餐增加' },
    { target: 'entertainment', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '旅行中娱乐消费增加' },
    { target: 'gambling', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '旅游目的地赌场(拉斯维加斯/澳门)' },
    { target: 'rideshare', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '旅行中打车需求' },
    { target: 'luxury_fashion', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '旅行中购物(免税店)' },
  ],

  'hotels': [
    { target: 'dining_out', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '住酒店→外出用餐' },
    { target: 'rideshare', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '酒店出行打车' },
  ],

  'airlines': [
    { target: 'hotels', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '飞到目的地→需要住宿' },
    { target: 'fuel', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '航空燃油需求' },
  ],

  'cruise': [
    { target: 'entertainment', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '邮轮上娱乐消费' },
    { target: 'gambling', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '邮轮赌场' },
    { target: 'alcohol', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '邮轮酒水消费' },
  ],

  'entertainment': [
    { target: 'streaming', direction: 'negative', strength: 0.3, speed: 'immediate',
      mechanism: '线下娱乐↑ → 居家流媒体↓' },
    { target: 'dining_out', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '看完电影/演出→吃饭' },
    { target: 'rideshare', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '娱乐场所出行' },
  ],

  'streaming': [
    { target: 'entertainment', direction: 'negative', strength: 0.2, speed: 'medium_term',
      mechanism: '流媒体内容充足→减少出门看电影' },
    { target: 'gaming', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '居家娱乐偏好相似(同一时间段)' },
    { target: 'delivery', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '看剧→点外卖' },
  ],

  'gaming': [
    { target: 'electronics', direction: 'positive', strength: 0.6, speed: 'short_term',
      mechanism: '游戏→升级PC/主机' },
    { target: 'streaming', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '游戏直播/电竞观看' },
    { target: 'delivery', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '宅家游戏→外卖' },
    { target: 'entertainment', direction: 'negative', strength: 0.2, speed: 'immediate',
      mechanism: '游戏时间挤压线下娱乐' },
  ],

  'gambling': [
    { target: 'travel', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '赌场旅行(拉斯维加斯/大西洋城)' },
    { target: 'alcohol', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '赌场消费→饮酒' },
    { target: 'entertainment', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '赌场演出/餐饮' },
  ],

  'pets': [
    { target: 'healthcare', direction: 'positive', strength: 0.3, speed: 'medium_term',
      mechanism: '宠物主人更关注健康(情感投射)' },
    { target: 'online_shopping', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '宠物用品高度依赖电商(Chewy等)' },
    { target: 'insurance', direction: 'positive', strength: 0.3, speed: 'short_term',
      mechanism: '宠物保险需求增长' },
  ],

  'childcare': [
    { target: 'insurance', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '有孩子→增加保险需求' },
    { target: 'healthcare', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '儿童医疗需求' },
    { target: 'dining_out', direction: 'negative', strength: 0.4, speed: 'immediate',
      mechanism: '育儿开支挤压外出就餐' },
    { target: 'travel', direction: 'negative', strength: 0.3, speed: 'short_term',
      mechanism: '婴幼儿阶段旅行减少' },
    { target: 'entertainment', direction: 'negative', strength: 0.3, speed: 'immediate',
      mechanism: '育儿挤压娱乐时间' },
    { target: 'streaming', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '在家带娃→居家娱乐需求增加' },
    { target: 'online_shopping', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '母婴用品大量网购' },
  ],

  'electronics': [
    { target: 'subscriptions', direction: 'positive', strength: 0.5, speed: 'short_term',
      mechanism: '买新设备→订阅相关服务(云存储/App等)' },
    { target: 'streaming', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '新电视/平板→订阅流媒体' },
  ],

  'smartphones': [
    { target: 'subscriptions', direction: 'positive', strength: 0.6, speed: 'immediate',
      mechanism: '新手机→App订阅' },
    { target: 'wearables', direction: 'positive', strength: 0.5, speed: 'short_term',
      mechanism: '手机生态→配套穿戴设备' },
    { target: 'delivery', direction: 'positive', strength: 0.3, speed: 'immediate',
      mechanism: '手机端点餐/外卖' },
  ],

  'wearables': [
    { target: 'fitness', direction: 'positive', strength: 0.5, speed: 'short_term',
      mechanism: '穿戴设备→增强健身动力(数据追踪)' },
    { target: 'healthcare', direction: 'positive', strength: 0.3, speed: 'medium_term',
      mechanism: '健康监测→就医频率/意识' },
  ],

  'insurance': [],

  'healthcare': [
    { target: 'prescription_drugs', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '就医→开药' },
    { target: 'health_supplements', direction: 'positive', strength: 0.4, speed: 'short_term',
      mechanism: '健康意识→预防性保健品' },
  ],

  'prescription_drugs': [],

  'financial_services': [
    { target: 'insurance', direction: 'positive', strength: 0.5, speed: 'short_term',
      mechanism: '金融意识→保险配置' },
    { target: 'housing', direction: 'positive', strength: 0.4, speed: 'long_term',
      mechanism: '金融服务(房贷)→购房' },
  ],

  'subscriptions': [],

  'online_shopping': [
    { target: 'delivery', direction: 'positive', strength: 0.7, speed: 'immediate',
      mechanism: '电商购物→物流配送' },
    { target: 'fast_fashion', direction: 'positive', strength: 0.4, speed: 'immediate',
      mechanism: '在线购物→快时尚品牌受益' },
  ],

  'delivery': [
    { target: 'quick_service', direction: 'positive', strength: 0.5, speed: 'immediate',
      mechanism: '外卖平台→快餐订单' },
  ],

  'rideshare': [],

  'home_security': [],

  'solar_residential': [
    { target: 'ev_charging', direction: 'positive', strength: 0.5, speed: 'medium_term',
      mechanism: '装光伏的家庭更倾向买电动车(自给自足心理)' },
    { target: 'utilities', direction: 'negative', strength: 0.6, speed: 'immediate',
      mechanism: '光伏发电→电费下降' },
  ],

  'ev_charging': [
    { target: 'fuel', direction: 'negative', strength: 0.8, speed: 'immediate',
      mechanism: '电动车充电替代燃油' },
  ],
};

// ============ 消费聚类 ============

/**
 * 消费者行为聚类
 * 识别具有相似消费模式的人群及其关联消费类目
 */
export const CONSUMER_CLUSTERS: ConsumerCluster[] = [

  {
    name: '健康生活方式族',
    demographic: 'Millennial/Gen-Z, 中高收入, 城市白领',
    categories: ['fitness', 'athleisure', 'healthy_food', 'health_supplements', 'wearables'],
    stocks: ['LULU', 'NKE', 'ONON', 'CELH', 'SFM', 'HIMS', 'AAPL', 'GRMN', 'DECK'],
    drivers: ['健康意识提升', '社交媒体健身文化', '远程办公→关注自我'],
  },

  {
    name: '数字原住民族',
    demographic: 'Gen-Z, 全收入段, 学生/年轻职场人',
    categories: ['gaming', 'streaming', 'delivery', 'smartphones', 'subscriptions', 'online_shopping'],
    stocks: ['NFLX', 'DIS', 'RBLX', 'TTWO', 'EA', 'DASH', 'UBER', 'AMZN', 'AAPL'],
    drivers: ['数字化生活方式', '即时满足偏好', '社交互动虚拟化'],
  },

  {
    name: '高净值消费族',
    demographic: 'Gen-X/Boomer, 高净值, 企业主/高管',
    categories: ['luxury_fashion', 'travel', 'cruise', 'hotels', 'beauty_skincare', 'dining_out', 'gambling'],
    stocks: ['CPRI', 'TPR', 'EL', 'ABNB', 'MAR', 'HLT', 'RCL', 'CCL', 'LVS', 'WYNN', 'MGM'],
    drivers: ['财富效应(股市/房产)', '体验经济', '身份认同消费'],
  },

  {
    name: '新房主族',
    demographic: 'Millennial, 中等收入, 首次购房者',
    categories: ['housing', 'home_improvement', 'furniture', 'home_appliances', 'home_security', 'insurance'],
    stocks: ['HD', 'LOW', 'WSM', 'RH', 'WHR', 'SHW', 'TREX', 'MAS', 'ADT'],
    drivers: ['生命阶段转换', '利率周期', '远程办公→郊区化'],
  },

  {
    name: '年轻家庭族',
    demographic: 'Millennial, 中等收入, 有0-12岁孩子',
    categories: ['childcare', 'groceries', 'online_shopping', 'streaming', 'pets', 'insurance', 'healthcare'],
    stocks: ['COST', 'WMT', 'TGT', 'AMZN', 'DIS', 'CHWY', 'TRUP', 'UNH'],
    drivers: ['育儿需求', '时间稀缺→便利性', '安全/健康优先'],
  },

  {
    name: '通勤消费族',
    demographic: '全年龄, 中等收入, 上班族',
    categories: ['automotive', 'fuel', 'coffee', 'quick_service', 'rideshare'],
    stocks: ['SBUX', 'MCD', 'CMG', 'UBER', 'LYFT', 'XOM', 'CVX', 'TSLA'],
    drivers: ['通勤习惯', '时间紧迫', '惯性消费'],
  },

  {
    name: '银发族',
    demographic: 'Boomer, 中高收入, 退休/半退休',
    categories: ['healthcare', 'prescription_drugs', 'travel', 'cruise', 'financial_services', 'utilities'],
    stocks: ['UNH', 'JNJ', 'PFE', 'ABT', 'RCL', 'CCL', 'JPM', 'V', 'MA'],
    drivers: ['健康需求增长', '时间充裕→旅行', '资产配置需求'],
  },

  {
    name: '绿色消费族',
    demographic: 'Millennial/Gen-Z, 中高收入, 环保意识强',
    categories: ['ev_charging', 'solar_residential', 'healthy_food', 'athleisure'],
    stocks: ['TSLA', 'ENPH', 'SEDG', 'RUN', 'RIVN', 'SFM', 'LULU', 'ONON'],
    drivers: ['环保价值观', '政策激励(IRA法案)', '技术成熟→经济性'],
  },

  {
    name: '夜生活/社交族',
    demographic: 'Gen-Z/Millennial, 全收入段, 单身/无孩',
    categories: ['dining_out', 'alcohol', 'entertainment', 'gambling', 'rideshare', 'fast_fashion'],
    stocks: ['CMG', 'DINE', 'WYNN', 'CZR', 'DKNG', 'UBER', 'LYFT', 'LVS'],
    drivers: ['社交需求', '可支配收入高(无家庭负担)', 'FOMO心理'],
  },

  {
    name: '宠物家长族',
    demographic: 'Millennial, 全收入段, 无孩/少孩',
    categories: ['pets', 'online_shopping', 'insurance', 'healthcare'],
    stocks: ['CHWY', 'TRUP', 'IDXX', 'ZTS', 'WOOF'],
    drivers: ['情感陪伴替代', '人性化养宠趋势', '宠物保健支出增长'],
  },

  {
    name: '远程办公族',
    demographic: 'Millennial/Gen-X, 中高收入, 科技/知识工作者',
    categories: ['electronics', 'subscriptions', 'streaming', 'delivery', 'coffee', 'home_improvement', 'fitness'],
    stocks: ['ZM', 'LOGI', 'AAPL', 'MSFT', 'AMZN', 'SBUX', 'HD', 'PTON', 'DASH'],
    drivers: ['混合办公常态化', '居家办公设备需求', '在家时间增加→居家消费升级'],
  },

  {
    name: '投资者/交易族',
    demographic: 'Gen-Z/Millennial, 中高收入, 对金融感兴趣',
    categories: ['financial_services', 'subscriptions', 'electronics', 'coffee'],
    stocks: ['HOOD', 'COIN', 'SCHW', 'IBKR', 'MKTX', 'CME', 'ICE', 'NDAQ'],
    drivers: ['零佣金交易普及', '加密货币热潮', '金融信息民主化'],
  },

  {
    name: '新能源车主族',
    demographic: 'Millennial/Gen-X, 中高收入, 科技爱好者',
    categories: ['ev_charging', 'solar_residential', 'electronics', 'subscriptions', 'wearables'],
    stocks: ['TSLA', 'RIVN', 'CHPT', 'ENPH', 'AAPL', 'GRMN'],
    drivers: ['环保+科技双重价值观', '政策补贴驱动', '自动驾驶技术好奇心'],
  },
];

// ============ 替代/互补关系 ============

/**
 * 消费类目间的替代和互补关系
 * 用于判断：当一个类目消费增加时，另一个类目如何变化
 */
export const SUBSTITUTION_PAIRS: SubstitutionPair[] = [

  // === 替代关系 ===
  { categoryA: 'dining_out', categoryB: 'groceries',
    type: 'substitute', elasticity: -0.6,
    note: '外出就餐和在家做饭是经典替代品' },

  { categoryA: 'streaming', categoryB: 'entertainment',
    type: 'substitute', elasticity: -0.3,
    note: '流媒体部分替代电影院/现场演出' },

  { categoryA: 'luxury_fashion', categoryB: 'fast_fashion',
    type: 'substitute', elasticity: -0.4,
    note: '消费升级时奢侈品替代快时尚' },

  { categoryA: 'ev_charging', categoryB: 'fuel',
    type: 'substitute', elasticity: -0.8,
    note: '电动车充电直接替代加油' },

  { categoryA: 'solar_residential', categoryB: 'utilities',
    type: 'substitute', elasticity: -0.5,
    note: '家用光伏减少电费支出' },

  { categoryA: 'delivery', categoryB: 'dining_out',
    type: 'substitute', elasticity: -0.3,
    note: '外卖部分替代堂食' },

  { categoryA: 'online_shopping', categoryB: 'fast_fashion',
    type: 'substitute', elasticity: -0.2,
    note: '线上购物替代线下逛店(渠道替代)' },

  { categoryA: 'gaming', categoryB: 'entertainment',
    type: 'substitute', elasticity: -0.2,
    note: '游戏时间挤压线下娱乐时间' },

  // === 互补关系 ===
  { categoryA: 'travel', categoryB: 'airlines',
    type: 'complement', elasticity: 0.9,
    note: '旅行和机票强互补' },

  { categoryA: 'travel', categoryB: 'hotels',
    type: 'complement', elasticity: 0.85,
    note: '旅行和住宿强互补' },

  { categoryA: 'fitness', categoryB: 'athleisure',
    type: 'complement', elasticity: 0.7,
    note: '健身和运动服饰互补' },

  { categoryA: 'fitness', categoryB: 'health_supplements',
    type: 'complement', elasticity: 0.6,
    note: '健身和营养补剂互补' },

  { categoryA: 'housing', categoryB: 'home_improvement',
    type: 'complement', elasticity: 0.85,
    note: '购房和装修强互补' },

  { categoryA: 'housing', categoryB: 'furniture',
    type: 'complement', elasticity: 0.8,
    note: '购房和家具强互补' },

  { categoryA: 'automotive', categoryB: 'insurance',
    type: 'complement', elasticity: 0.9,
    note: '买车必须买保险' },

  { categoryA: 'smartphones', categoryB: 'subscriptions',
    type: 'complement', elasticity: 0.6,
    note: '新手机→App订阅' },

  { categoryA: 'dining_out', categoryB: 'alcohol',
    type: 'complement', elasticity: 0.5,
    note: '聚餐和饮酒互补' },

  { categoryA: 'alcohol', categoryB: 'rideshare',
    type: 'complement', elasticity: 0.5,
    note: '饮酒后打车互补' },

  { categoryA: 'gaming', categoryB: 'electronics',
    type: 'complement', elasticity: 0.5,
    note: '游戏和电脑/主机互补' },

  { categoryA: 'pets', categoryB: 'online_shopping',
    type: 'complement', elasticity: 0.4,
    note: '宠物用品依赖电商' },

  { categoryA: 'luxury_fashion', categoryB: 'beauty_skincare',
    type: 'complement', elasticity: 0.6,
    note: '奢侈品和高端美妆互补(同一消费心理)' },

  { categoryA: 'wearables', categoryB: 'fitness',
    type: 'complement', elasticity: 0.5,
    note: '穿戴设备和健身互补' },
];

// ============ 消费类目 → 美股映射 ============

/**
 * 每个消费类目对应的核心美股
 * 用于：当因果链触发某类目变化时，快速定位受影响的股票
 */
export const CATEGORY_TO_STOCKS: Record<ConsumerCategory, string[]> = {
  'housing': ['TOL', 'LEN', 'DHI', 'NVR', 'PHM', 'KBH', 'TMHC'],
  'home_improvement': ['HD', 'LOW', 'SHW', 'TREX', 'MAS', 'FBIN'],
  'furniture': ['WSM', 'RH', 'LOVE', 'ETD', 'TPX'],
  'home_appliances': ['WHR', 'SWK', 'SNA', 'AAON'],
  'utilities': ['NEE', 'DUK', 'SO', 'D', 'AEP', 'WEC', 'ES', 'ED'],
  'automotive': ['TSLA', 'GM', 'F', 'RIVN', 'TM', 'HMC'],
  'auto_parts': ['AAP', 'AZO', 'ORLY', 'GPC', 'LKQ'],
  'fuel': ['XOM', 'CVX', 'VLO', 'MPC', 'PSX'],
  'groceries': ['WMT', 'COST', 'KR', 'ACI', 'SFM', 'GO'],
  'dining_out': ['MCD', 'SBUX', 'CMG', 'DRI', 'YUM', 'QSR'],
  'quick_service': ['MCD', 'QSR', 'WEN', 'JACK', 'SHAK'],
  'coffee': ['SBUX', 'BROS', 'KDP'],
  'alcohol': ['BUD', 'STZ', 'DEO', 'SAM', 'TAP'],
  'fitness': ['PLNT', 'XPOF', 'PTON'],
  'athleisure': ['LULU', 'NKE', 'ONON', 'DECK', 'UAA', 'SKX'],
  'health_supplements': ['HIMS', 'USNA', 'NUS'],
  'healthy_food': ['SFM', 'CELH', 'MNST', 'KDP'],
  'luxury_fashion': ['CPRI', 'TPR', 'RL', 'PVH', 'LVMUY'],
  'fast_fashion': ['GPS', 'ANF', 'AEO', 'URBN', 'BURL'],
  'beauty_skincare': ['EL', 'ULTA', 'COTY', 'SKIN'],
  'travel': ['BKNG', 'ABNB', 'EXPE', 'TRIP'],
  'hotels': ['MAR', 'HLT', 'H', 'WH', 'HST'],
  'airlines': ['DAL', 'UAL', 'LUV', 'AAL', 'ALK', 'JBLU'],
  'cruise': ['RCL', 'CCL', 'NCLH'],
  'entertainment': ['LYV', 'DIS', 'IMAX', 'CNK', 'FUN'],
  'streaming': ['NFLX', 'DIS', 'WBD', 'PARA', 'ROKU'],
  'gaming': ['RBLX', 'EA', 'TTWO', 'ATVI', 'U'],
  'gambling': ['DKNG', 'CZR', 'MGM', 'WYNN', 'LVS', 'PENN'],
  'pets': ['CHWY', 'TRUP', 'IDXX', 'ZTS', 'WOOF'],
  'childcare': ['BFAM', 'LRN', 'STRA', 'LOPE', 'TWOU'],
  'electronics': ['AAPL', 'DELL', 'HPQ', 'LOGI', 'SONO'],
  'smartphones': ['AAPL', 'GOOGL', 'MSFT'],
  'wearables': ['AAPL', 'GRMN', 'OLED'],
  'insurance': ['PGR', 'ALL', 'TRV', 'MET', 'AIG'],
  'healthcare': ['UNH', 'HCA', 'THC', 'CNC', 'HUM'],
  'prescription_drugs': ['CVS', 'WBA', 'CI', 'MCK', 'ABC'],
  'financial_services': ['JPM', 'GS', 'MS', 'SCHW', 'HOOD'],
  'subscriptions': ['AAPL', 'MSFT', 'AMZN', 'CRM', 'ADBE'],
  'online_shopping': ['AMZN', 'SHOP', 'ETSY', 'W', 'EBAY'],
  'delivery': ['DASH', 'UBER', 'GRAB'],
  'rideshare': ['UBER', 'LYFT'],
  'home_security': ['ADT', 'REZI', 'ARLO', 'VRNT'],
  'solar_residential': ['ENPH', 'SEDG', 'RUN', 'NOVA'],
  'ev_charging': ['CHPT', 'EVGO', 'BLNK', 'TSLA'],
};

// ============ 宏观触发器 ============

/**
 * 宏观经济变化 → 消费类目影响
 * 当宏观指标变化时，哪些消费类目首先受影响
 */
export const MACRO_TO_CONSUMER: Record<string, {
  affectedCategories: Array<{
    category: ConsumerCategory;
    direction: CausalDirection;
    sensitivity: number;  // 0-1
  }>;
  description: string;
}> = {
  'interest_rate_up': {
    description: '利率上升 → 房贷成本增加、消费贷成本增加',
    affectedCategories: [
      { category: 'housing', direction: 'negative', sensitivity: 0.9 },
      { category: 'automotive', direction: 'negative', sensitivity: 0.6 },
      { category: 'home_improvement', direction: 'negative', sensitivity: 0.5 },
      { category: 'luxury_fashion', direction: 'negative', sensitivity: 0.4 },
      { category: 'financial_services', direction: 'positive', sensitivity: 0.5 },
      { category: 'groceries', direction: 'positive', sensitivity: 0.1 },
    ],
  },

  'unemployment_up': {
    description: '失业率上升 → 非必要消费全面收缩',
    affectedCategories: [
      { category: 'dining_out', direction: 'negative', sensitivity: 0.7 },
      { category: 'travel', direction: 'negative', sensitivity: 0.8 },
      { category: 'luxury_fashion', direction: 'negative', sensitivity: 0.8 },
      { category: 'entertainment', direction: 'negative', sensitivity: 0.6 },
      { category: 'automotive', direction: 'negative', sensitivity: 0.7 },
      { category: 'groceries', direction: 'positive', sensitivity: 0.3 },
      { category: 'streaming', direction: 'positive', sensitivity: 0.3 },
      { category: 'gaming', direction: 'positive', sensitivity: 0.2 },
    ],
  },

  'consumer_confidence_up': {
    description: '消费者信心上升 → 大额消费和可选消费增加',
    affectedCategories: [
      { category: 'automotive', direction: 'positive', sensitivity: 0.7 },
      { category: 'housing', direction: 'positive', sensitivity: 0.6 },
      { category: 'luxury_fashion', direction: 'positive', sensitivity: 0.8 },
      { category: 'travel', direction: 'positive', sensitivity: 0.7 },
      { category: 'dining_out', direction: 'positive', sensitivity: 0.6 },
      { category: 'electronics', direction: 'positive', sensitivity: 0.5 },
    ],
  },

  'oil_price_up': {
    description: '油价上涨 → 燃油成本增加、通胀传导',
    affectedCategories: [
      { category: 'fuel', direction: 'positive', sensitivity: 0.95 },
      { category: 'airlines', direction: 'negative', sensitivity: 0.7 },
      { category: 'automotive', direction: 'negative', sensitivity: 0.3 },
      { category: 'ev_charging', direction: 'positive', sensitivity: 0.4 },
      { category: 'delivery', direction: 'negative', sensitivity: 0.3 },
      { category: 'rideshare', direction: 'negative', sensitivity: 0.2 },
      { category: 'cruise', direction: 'negative', sensitivity: 0.5 },
    ],
  },

  'housing_boom': {
    description: '房地产繁荣 → 财富效应+装修链',
    affectedCategories: [
      { category: 'home_improvement', direction: 'positive', sensitivity: 0.9 },
      { category: 'furniture', direction: 'positive', sensitivity: 0.8 },
      { category: 'home_appliances', direction: 'positive', sensitivity: 0.7 },
      { category: 'luxury_fashion', direction: 'positive', sensitivity: 0.4 },
      { category: 'automotive', direction: 'positive', sensitivity: 0.3 },
      { category: 'solar_residential', direction: 'positive', sensitivity: 0.4 },
    ],
  },

  'wage_growth': {
    description: '工资增长 → 消费升级',
    affectedCategories: [
      { category: 'dining_out', direction: 'positive', sensitivity: 0.6 },
      { category: 'travel', direction: 'positive', sensitivity: 0.5 },
      { category: 'luxury_fashion', direction: 'positive', sensitivity: 0.5 },
      { category: 'fitness', direction: 'positive', sensitivity: 0.4 },
      { category: 'beauty_skincare', direction: 'positive', sensitivity: 0.4 },
      { category: 'subscriptions', direction: 'positive', sensitivity: 0.3 },
      { category: 'fast_fashion', direction: 'negative', sensitivity: 0.2 },
    ],
  },

  'inflation_up': {
    description: '通胀上升 → 消费降级、必需品涨价',
    affectedCategories: [
      { category: 'groceries', direction: 'positive', sensitivity: 0.8 },
      { category: 'dining_out', direction: 'negative', sensitivity: 0.5 },
      { category: 'luxury_fashion', direction: 'negative', sensitivity: 0.6 },
      { category: 'fast_fashion', direction: 'positive', sensitivity: 0.3 },
      { category: 'entertainment', direction: 'negative', sensitivity: 0.3 },
      { category: 'subscriptions', direction: 'negative', sensitivity: 0.4 },
      { category: 'quick_service', direction: 'positive', sensitivity: 0.2 },
    ],
  },

  'stock_market_crash': {
    description: '股市暴跌 → 负财富效应、高端消费收缩',
    affectedCategories: [
      { category: 'luxury_fashion', direction: 'negative', sensitivity: 0.9 },
      { category: 'travel', direction: 'negative', sensitivity: 0.6 },
      { category: 'automotive', direction: 'negative', sensitivity: 0.5 },
      { category: 'dining_out', direction: 'negative', sensitivity: 0.4 },
      { category: 'gambling', direction: 'negative', sensitivity: 0.5 },
      { category: 'financial_services', direction: 'negative', sensitivity: 0.7 },
      { category: 'groceries', direction: 'positive', sensitivity: 0.2 },
    ],
  },
};
