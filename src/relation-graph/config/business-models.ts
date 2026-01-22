/**
 * 商业模式分类配置
 *
 * 解决的问题：
 * 同一行业内，公司可能有不同的商业模式
 * 例如：Marriott (传统酒店) vs Airbnb (短租平台)
 *
 * 关系类型：
 * - BUSINESS_MODEL_PEER: 同行业、同模式 (直接竞争)
 * - BUSINESS_MODEL_VARIANT: 同行业、不同模式 (间接竞争/替代品)
 */

// ============================================================
// 商业模式维度定义
// ============================================================

/** 资产模式 */
export type AssetModel =
  | 'asset_heavy'      // 重资产：自有资产运营 (酒店自有物业、航空公司自有飞机)
  | 'asset_light'      // 轻资产：管理/特许经营 (酒店管理合同、品牌授权)
  | 'platform'         // 平台模式：连接供需 (Airbnb, Uber)
  | 'hybrid';          // 混合模式

/** 收入模式 */
export type RevenueModel =
  | 'product_sales'    // 产品销售 (零售、制造)
  | 'subscription'     // 订阅制 (SaaS, 流媒体)
  | 'transaction_fee'  // 交易抽成 (平台、支付)
  | 'advertising'      // 广告收入 (搜索、社交媒体)
  | 'licensing'        // 授权/版税 (IP、专利)
  | 'interest_income'  // 利息收入 (银行、信用卡)
  | 'premium_service'; // 增值服务

/** 服务交付模式 */
export type DeliveryModel =
  | 'self_operated'    // 自营 (直营店、自有运力)
  | 'franchise'        // 加盟/特许经营
  | 'marketplace'      // 第三方市场
  | 'managed'          // 管理合同
  | 'hybrid';          // 混合

/** 客户类型 */
export type CustomerModel =
  | 'B2C'              // 面向消费者
  | 'B2B'              // 面向企业
  | 'B2B2C'            // 通过企业触达消费者
  | 'C2C'              // 消费者对消费者
  | 'B2G';             // 面向政府

// ============================================================
// 商业模式特征
// ============================================================

export interface BusinessModelProfile {
  assetModel: AssetModel;
  revenueModels: RevenueModel[];      // 可以有多个收入来源
  deliveryModel: DeliveryModel;
  customerModel: CustomerModel;
  industrySegment: string;            // 所属细分行业
  tags?: string[];                    // 额外标签
}

// ============================================================
// 公司商业模式配置
// ============================================================

export const BUSINESS_MODEL_PROFILES: Record<string, BusinessModelProfile> = {
  // ========================================================
  // 酒店/住宿行业
  // ========================================================

  // 传统酒店 - 轻资产管理模式
  'MAR': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['loyalty_program', 'global_brand', 'full_service'],
  },
  'HLT': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['loyalty_program', 'global_brand', 'multi_brand'],
  },
  'H': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['luxury_focus', 'full_service'],
  },
  'WH': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['economy_midscale', 'franchise_heavy'],
  },
  'IHG': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['global_brand', 'loyalty_program'],
  },

  // 短租平台
  'ABNB': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'C2C',
    industrySegment: 'Hotels',
    tags: ['sharing_economy', 'unique_stays', 'experiences'],
  },

  // OTA (在线旅游代理)
  'BKNG': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['meta_search', 'global', 'multi_vertical'],
  },
  'EXPE': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Hotels',
    tags: ['bundled_travel', 'loyalty'],
  },

  // ========================================================
  // 零售行业
  // ========================================================

  // 大型综合零售 - 实体店为主
  'WMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['everyday_low_price', 'grocery', 'general_merchandise'],
  },
  'TGT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['curated', 'style', 'urban_suburban'],
  },
  'COST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['membership', 'bulk', 'limited_sku', 'treasure_hunt'],
  },

  // 电商平台
  'AMZN': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'transaction_fee', 'subscription', 'advertising'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['marketplace', 'prime', 'fulfillment', 'aws'],
  },
  'EBAY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'C2C',
    industrySegment: 'Retail',
    tags: ['auction', 'resale', 'collectibles'],
  },
  'ETSY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'C2C',
    industrySegment: 'Retail',
    tags: ['handmade', 'unique', 'small_business'],
  },

  // 折扣零售
  'TJX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['off_price', 'treasure_hunt', 'brand_deals'],
  },
  'ROST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['off_price', 'value'],
  },
  'DG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['dollar_store', 'rural', 'convenience'],
  },
  'DLTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['dollar_store', 'fixed_price'],
  },

  // ========================================================
  // 餐饮行业
  // ========================================================

  // 快餐连锁 - 加盟模式
  'MCD': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'global', 'real_estate'],
  },
  'YUM': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'multi_brand', 'franchise_pure'],
  },
  'QSR': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'burger_king', 'tim_hortons'],
  },
  'WEN': {
    assetModel: 'hybrid',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'fresh_beef'],
  },
  'DPZ': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'delivery_focus', 'tech_driven'],
  },

  // 快休闲 - 自营为主
  'CMG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['fast_casual', 'fresh', 'company_owned'],
  },
  'SBUX': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['coffee', 'third_place', 'loyalty', 'global'],
  },

  // 休闲餐饮
  'DRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['casual_dining', 'multi_brand'],
  },

  // 外卖平台
  'DASH': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Restaurants',
    tags: ['delivery', 'gig_economy', 'logistics'],
  },
  'UBER': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Transportation',
    tags: ['ride_hailing', 'delivery', 'gig_economy'],
  },

  // ========================================================
  // 流媒体/娱乐行业
  // ========================================================

  // 订阅流媒体
  'NFLX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['original_content', 'global', 'binge'],
  },
  'DIS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['ip_library', 'theme_parks', 'bundle'],
  },
  'WBD': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['hbo', 'discovery', 'sports'],
  },
  'PARA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['cbs', 'paramount_plus', 'legacy_media'],
  },

  // 音乐流媒体
  'SPOT': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['music', 'podcast', 'freemium'],
  },

  // 广告支持
  'ROKU': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['connected_tv', 'advertising', 'device'],
  },

  // ========================================================
  // 软件/云服务行业
  // ========================================================

  // 云基础设施 (IaaS/PaaS)
  'MSFT': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud',
    tags: ['azure', 'office365', 'enterprise'],
  },
  'GOOGL': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cloud',
    tags: ['search', 'gcp', 'youtube', 'android'],
  },
  'ORCL': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud',
    tags: ['database', 'erp', 'oci'],
  },

  // 企业SaaS
  'CRM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['crm', 'sales_cloud', 'platform'],
  },
  'NOW': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['itsm', 'workflow', 'platform'],
  },
  'WDAY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['hcm', 'finance', 'enterprise'],
  },
  'SNOW': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['data_cloud', 'consumption_based'],
  },

  // 企业SaaS - 协作/生产力
  'TEAM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['collaboration', 'devops', 'agile'],
  },
  'ZM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['video', 'collaboration', 'hybrid_work'],
  },
  'DOCU': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['e_signature', 'agreements', 'digital_transform'],
  },

  // 企业SaaS - 数据/开发者
  'DDOG': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['observability', 'cloud_monitoring', 'devops'],
  },
  'MDB': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['database', 'developer', 'nosql'],
  },
  'NET': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['cdn', 'security', 'edge', 'zero_trust'],
  },
  'SPLK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SaaS',
    tags: ['observability', 'siem', 'data_platform'],
  },

  // 网络安全
  'CRWD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['endpoint', 'cloud_native', 'ai'],
  },
  'PANW': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['firewall', 'platform', 'sase'],
  },
  'ZS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['zero_trust', 'cloud_security', 'sase'],
  },
  'FTNT': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['firewall', 'hardware', 'smb_enterprise'],
  },
  'S': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['endpoint', 'ai', 'autonomous'],
  },

  // ========================================================
  // 支付/金融科技行业
  // ========================================================

  // 卡组织/支付网络
  'V': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Payments',
    tags: ['network', 'global', 'interchange'],
  },
  'MA': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Payments',
    tags: ['network', 'global', 'interchange'],
  },
  'AXP': {
    assetModel: 'hybrid',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Payments',
    tags: ['closed_loop', 'premium', 'lending'],
  },

  // 数字支付
  'PYPL': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Payments',
    tags: ['digital_wallet', 'venmo', 'checkout'],
  },
  'SQ': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments',
    tags: ['smb', 'cash_app', 'bitcoin'],
  },

  // 支付处理
  'FIS': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments',
    tags: ['bank_tech', 'processing', 'capital_markets'],
  },
  'FISV': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments',
    tags: ['bank_tech', 'clover', 'merchant'],
  },
  'GPN': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments',
    tags: ['merchant_acquiring', 'issuer_solutions'],
  },

  // Buy Now Pay Later
  'AFRM': {
    assetModel: 'platform',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Payments',
    tags: ['bnpl', 'consumer_credit', 'point_of_sale'],
  },

  // 加密货币交易
  'COIN': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fintech',
    tags: ['crypto', 'exchange', 'custody'],
  },

  // 零售券商
  'HOOD': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'interest_income', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fintech',
    tags: ['retail_brokerage', 'commission_free', 'crypto'],
  },
  'IBKR': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fintech',
    tags: ['brokerage', 'active_traders', 'global'],
  },

  // 数字银行 (新兴市场)
  'NU': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Banking',
    tags: ['digital_native', 'latam', 'unbanked'],
  },

  // ========================================================
  // 运动服饰行业
  // ========================================================

  // 品牌商 - 批发为主
  'NKE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['wholesale', 'dtc_growing', 'global_brand', 'endorsements'],
  },
  'ADDYY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['wholesale', 'soccer', 'lifestyle'],
  },
  'UAA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['wholesale', 'performance', 'north_america'],
  },

  // 品牌商 - DTC为主
  'LULU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['dtc', 'premium', 'yoga', 'community'],
  },

  // 运动零售
  'DKS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['retail', 'multi_brand', 'sporting_goods'],
  },
  'FL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Athletic Apparel',
    tags: ['retail', 'sneakers', 'mall_based'],
  },

  // ========================================================
  // 银行/金融服务行业
  // ========================================================

  // 全能银行
  'JPM': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Banking',
    tags: ['universal_bank', 'investment_bank', 'wealth'],
  },
  'BAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Banking',
    tags: ['universal_bank', 'consumer', 'wealth'],
  },
  'WFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Banking',
    tags: ['consumer_bank', 'mortgage', 'retail'],
  },
  'C': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Banking',
    tags: ['global', 'institutional', 'cards'],
  },

  // 纯数字银行/新银行
  'SOFI': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Banking',
    tags: ['digital_native', 'student_loans', 'young_adults'],
  },

  // ========================================================
  // 汽车行业
  // ========================================================

  // 传统OEM - 经销商模式
  'F': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dealer_network', 'trucks', 'legacy'],
  },
  'GM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dealer_network', 'ev_transition', 'legacy'],
  },

  // EV - 直销模式
  'TSLA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dtc', 'ev_pure', 'software', 'fsd'],
  },
  'RIVN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dtc', 'ev_pure', 'trucks', 'adventure'],
  },

  // 汽车经销商
  'AN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dealer', 'multi_brand', 'service'],
  },

  // 线上汽车零售
  'CVNA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['online', 'used_cars', 'vending_machine'],
  },

  // 租车
  'CAR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['rental', 'fleet', 'travel'],
  },

  // ========================================================
  // 出行服务行业
  // ========================================================

  'LYFT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Transportation',
    tags: ['ride_hailing', 'gig_economy', 'us_focused'],
  },

  // ========================================================
  // 航运物流行业
  // ========================================================

  // ---------- 集装箱航运 (Container Shipping) ----------
  // 特点: 重资产、强周期、运价波动大、与全球贸易高度相关
  'ZIM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Container Shipping',
    tags: ['container', 'liner', 'israel', 'asia_focus'],
  },
  'MATX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Container Shipping',
    tags: ['container', 'jones_act', 'pacific', 'logistics'],
  },
  // 全球集装箱巨头 (非美股但重要参考)
  'MAERSK.B': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Container Shipping',
    tags: ['container', 'integrated', 'logistics', 'global_leader'],
  },

  // ---------- 干散货航运 (Dry Bulk Shipping) ----------
  // 特点: 运输铁矿石、煤炭、粮食等大宗商品
  'GOGL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dry Bulk Shipping',
    tags: ['dry_bulk', 'capesize', 'spot_heavy'],
  },
  'SBLK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dry Bulk Shipping',
    tags: ['dry_bulk', 'diversified_fleet', 'dividend'],
  },
  'GNK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dry Bulk Shipping',
    tags: ['dry_bulk', 'mid_size', 'scrubber'],
  },
  'EGLE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dry Bulk Shipping',
    tags: ['dry_bulk', 'supramax', 'ultramax'],
  },

  // ---------- 油轮运输 (Tanker Shipping) ----------
  // 特点: 运输原油、成品油、化学品
  'FRO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tanker Shipping',
    tags: ['crude_tanker', 'vlcc', 'suezmax', 'hemen'],
  },
  'STNG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tanker Shipping',
    tags: ['product_tanker', 'mr', 'lr2', 'chemicals'],
  },
  'TNK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tanker Shipping',
    tags: ['crude_tanker', 'suezmax', 'aframax'],
  },
  'INSW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tanker Shipping',
    tags: ['product_tanker', 'crude', 'jones_act'],
  },
  'DHT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tanker Shipping',
    tags: ['crude_tanker', 'vlcc', 'pure_play'],
  },

  // ---------- LNG/LPG 运输 ----------
  'FLNG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Shipping',
    tags: ['lng', 'long_term_charter', 'contracted'],
  },

  // ---------- 快递物流 (Express & Parcel) ----------
  // 特点: 时效性、网络效应、最后一公里
  'FDX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Express Logistics',
    tags: ['express', 'air_freight', 'ground', 'integrated'],
  },
  'UPS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Express Logistics',
    tags: ['express', 'ground', 'supply_chain', 'union'],
  },

  // ---------- 货运代理 (Freight Forwarding) ----------
  // 特点: 轻资产、整合运力、增值服务
  'EXPD': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Freight Forwarding',
    tags: ['forwarder', 'air_ocean', 'customs'],
  },
  'CHRW': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Freight Forwarding',
    tags: ['broker', 'trucking', 'technology'],
  },

  // ---------- 第三方物流 (3PL) ----------
  'XPO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3PL',
    tags: ['ltl', 'trucking', 'brokerage', 'technology'],
  },
  'JBHT': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3PL',
    tags: ['intermodal', 'trucking', 'dedicated'],
  },

  // ---------- 铁路货运 ----------
  'UNP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rail Freight',
    tags: ['rail', 'western_us', 'intermodal', 'bulk'],
  },
  'CSX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rail Freight',
    tags: ['rail', 'eastern_us', 'intermodal', 'coal'],
  },
  'NSC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rail Freight',
    tags: ['rail', 'eastern_us', 'intermodal', 'automotive'],
  },

  // ========================================================
  // 消费必需品/饮料行业
  // ========================================================

  // 传统饮料巨头
  'KO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2B2C',
    industrySegment: 'Beverages',
    tags: ['sparkling', 'global', 'bottler_system'],
  },
  'PEP': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Beverages',
    tags: ['snacks', 'beverages', 'integrated'],
  },

  // 能量饮料
  'MNST': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2B2C',
    industrySegment: 'Beverages',
    tags: ['energy', 'youth', 'extreme_sports'],
  },
  'CELH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Beverages',
    tags: ['energy', 'fitness', 'health_conscious'],
  },

  // ========================================================
  // 社交媒体/广告行业
  // ========================================================

  'META': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Media',
    tags: ['social', 'advertising', 'metaverse'],
  },
  'SNAP': {
    assetModel: 'asset_light',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Media',
    tags: ['social', 'gen_z', 'ar'],
  },
  'PINS': {
    assetModel: 'asset_light',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Media',
    tags: ['discovery', 'shopping', 'inspiration'],
  },
  'RDDT': {
    assetModel: 'platform',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Media',
    tags: ['community', 'ugc', 'niche'],
  },

  // ========================================================
  // 游戏行业
  // ========================================================

  'EA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gaming',
    tags: ['sports', 'live_services', 'mobile'],
  },
  'TTWO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gaming',
    tags: ['aaa', 'gta', 'nba2k'],
  },
  'RBLX': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Gaming',
    tags: ['ugc', 'kids', 'metaverse', 'robux'],
  },
  'ATVI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gaming',
    tags: ['call_of_duty', 'warcraft', 'mobile'],
  },
  'U': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gaming',
    tags: ['game_engine', 'developer_tools', 'rt3d'],
  },

  // ========================================================
  // 医疗健康行业
  // ========================================================

  // 药店零售
  'CVS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Healthcare Retail',
    tags: ['pharmacy', 'pbm', 'health_hubs'],
  },
  'WBA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Healthcare Retail',
    tags: ['pharmacy', 'retail', 'international'],
  },

  // 远程医疗
  'TDOC': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Digital Health',
    tags: ['telehealth', 'virtual_care', 'chronic'],
  },
  'HIMS': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Health',
    tags: ['dtc', 'telehealth', 'wellness', 'mens_health'],
  },

  // 健康设备
  'DXCM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Health',
    tags: ['cgm', 'diabetes', 'connected'],
  },

  // ========================================================
  // 半导体行业
  // ========================================================

  // 设计/Fabless
  'NVDA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductors',
    tags: ['gpu', 'ai', 'datacenter', 'gaming'],
  },
  'AMD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductors',
    tags: ['cpu', 'gpu', 'datacenter', 'gaming'],
  },
  'QCOM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductors',
    tags: ['mobile', '5g', 'licensing'],
  },
  'AVGO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductors',
    tags: ['networking', 'wireless', 'infrastructure'],
  },

  // 设备商
  'LRCX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['etch', 'deposition', 'services'],
  },
  'AMAT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['deposition', 'etch', 'diversified'],
  },
  'ASML': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['lithography', 'euv', 'monopoly'],
  },
  'KLAC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['inspection', 'metrology'],
  },

  // 代工
  'TSM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Foundry',
    tags: ['foundry', 'leading_edge', 'taiwan'],
  },

  // 存储
  'MU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Memory',
    tags: ['dram', 'nand', 'hbm'],
  },
};

// ============================================================
// 辅助函数
// ============================================================

/**
 * 获取公司的商业模式
 */
export function getBusinessModel(symbol: string): BusinessModelProfile | null {
  return BUSINESS_MODEL_PROFILES[symbol] || null;
}

/**
 * 计算两个公司的商业模式相似度
 * 返回 0-1 的分数
 */
export function calculateBusinessModelSimilarity(
  profileA: BusinessModelProfile,
  profileB: BusinessModelProfile
): number {
  let score = 0;
  const weights = {
    industrySegment: 0.35,  // 同行业最重要
    assetModel: 0.25,
    customerModel: 0.20,
    revenueModels: 0.15,
    deliveryModel: 0.05,
  };

  // 行业细分
  if (profileA.industrySegment === profileB.industrySegment) {
    score += weights.industrySegment;
  }

  // 资产模式
  if (profileA.assetModel === profileB.assetModel) {
    score += weights.assetModel;
  }

  // 客户模式
  if (profileA.customerModel === profileB.customerModel) {
    score += weights.customerModel;
  }

  // 收入模式 (Jaccard相似度)
  const revenueA = new Set(profileA.revenueModels);
  const revenueB = new Set(profileB.revenueModels);
  const intersection = [...revenueA].filter(x => revenueB.has(x)).length;
  const union = new Set([...revenueA, ...revenueB]).size;
  if (union > 0) {
    score += (intersection / union) * weights.revenueModels;
  }

  // 交付模式
  if (profileA.deliveryModel === profileB.deliveryModel) {
    score += weights.deliveryModel;
  }

  return score;
}

/**
 * 判断两个公司是否是商业模式变体
 * (同行业但模式不同)
 */
export function areBusinessModelVariants(
  profileA: BusinessModelProfile,
  profileB: BusinessModelProfile
): { isVariant: boolean; reason: string } {
  // 必须在同一细分行业
  if (profileA.industrySegment !== profileB.industrySegment) {
    return { isVariant: false, reason: '不同行业' };
  }

  // 检查模式差异
  const differences: string[] = [];

  if (profileA.assetModel !== profileB.assetModel) {
    differences.push(`资产模式: ${profileA.assetModel} vs ${profileB.assetModel}`);
  }

  if (profileA.deliveryModel !== profileB.deliveryModel) {
    differences.push(`交付模式: ${profileA.deliveryModel} vs ${profileB.deliveryModel}`);
  }

  if (profileA.customerModel !== profileB.customerModel) {
    differences.push(`客户模式: ${profileA.customerModel} vs ${profileB.customerModel}`);
  }

  // 如果有显著差异，则是模式变体
  if (differences.length >= 1) {
    return {
      isVariant: true,
      reason: differences.join('; '),
    };
  }

  return { isVariant: false, reason: '模式相同' };
}

/**
 * 获取同行业的所有公司
 */
export function getCompaniesBySegment(segment: string): string[] {
  return Object.entries(BUSINESS_MODEL_PROFILES)
    .filter(([_, profile]) => profile.industrySegment === segment)
    .map(([symbol]) => symbol);
}

/**
 * 获取所有行业细分
 */
export function getAllSegments(): string[] {
  const segments = new Set<string>();
  for (const profile of Object.values(BUSINESS_MODEL_PROFILES)) {
    segments.add(profile.industrySegment);
  }
  return Array.from(segments).sort();
}

/**
 * 获取配置统计
 */
export function getBusinessModelStats(): {
  totalCompanies: number;
  segments: number;
  bySegment: Record<string, number>;
} {
  const bySegment: Record<string, number> = {};

  for (const profile of Object.values(BUSINESS_MODEL_PROFILES)) {
    bySegment[profile.industrySegment] = (bySegment[profile.industrySegment] || 0) + 1;
  }

  return {
    totalCompanies: Object.keys(BUSINESS_MODEL_PROFILES).length,
    segments: Object.keys(bySegment).length,
    bySegment,
  };
}

export default {
  BUSINESS_MODEL_PROFILES,
  getBusinessModel,
  calculateBusinessModelSimilarity,
  areBusinessModelVariants,
  getCompaniesBySegment,
  getAllSegments,
  getBusinessModelStats,
};
