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
  // ========================================================
  // 餐饮行业
  // ========================================================

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

  // ---------- SaaS/Cloud补充 ----------
  'OKTA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['identity', 'iam', 'zero_trust', 'workforce_identity'],
  },
  'VEEV': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vertical SaaS',
    tags: ['life_sciences', 'pharma_crm', 'clinical', 'regulatory'],
  },
  'HUBS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['crm', 'marketing', 'sales', 'smb', 'inbound'],
  },
  'BILL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'FinTech SaaS',
    tags: ['ap_ar', 'payments', 'smb', 'accounting_integration'],
  },
  'SHOP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'E-commerce Platform',
    tags: ['merchants', 'shopify_payments', 'fulfillment', 'smb'],
  },
  'PLTR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['data_analytics', 'government', 'defense', 'ai_platform'],
  },

  // ========================================================
  // 科技硬件/基础设施
  // ========================================================

  // ---------- 消费电子 (Consumer Electronics) ----------
  'AAPL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Consumer Electronics',
    tags: ['iphone', 'mac', 'services', 'ecosystem'],
  },

  // ---------- 服务器/存储 (Server Hardware) ----------
  'DELL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Server Hardware',
    tags: ['server', 'storage', 'pc', 'enterprise'],
  },
  'HPE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Server Hardware',
    tags: ['server', 'storage', 'networking', 'edge'],
  },
  'NTAP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Server Hardware',
    tags: ['storage', 'data_management', 'cloud'],
  },
  'PSTG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Server Hardware',
    tags: ['flash_storage', 'data', 'as_a_service'],
  },
  'SMCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Server Hardware',
    tags: ['gpu_server', 'ai_infrastructure', 'rack_scale'],
  },
  'IBM': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'premium_service', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['hybrid_cloud', 'ai', 'consulting', 'mainframe'],
  },

  // ---------- 网络设备 (Network Equipment) ----------
  'CSCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Equipment',
    tags: ['switching', 'routing', 'security', 'collaboration'],
  },
  'ANET': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Equipment',
    tags: ['cloud_networking', 'data_center', 'high_speed'],
  },
  'JNPR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Equipment',
    tags: ['routing', 'switching', 'ai_networking'],
  },
  'FFIV': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Equipment',
    tags: ['application_delivery', 'load_balancing', 'security'],
  },
  'CIEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Equipment',
    tags: ['optical_networking', 'coherent_optics', 'telecom'],
  },

  // ---------- 数据中心REIT (Data Center REIT) ----------
  'EQIX': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Center REIT',
    tags: ['colocation', 'interconnection', 'global'],
  },
  'DLR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Center REIT',
    tags: ['colocation', 'hyperscale', 'wholesale'],
  },

  // ========================================================
  // 电信/媒体/娱乐行业
  // ========================================================

  // ---------- 电信运营商 (Telecom) ----------
  'T': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Telecom',
    tags: ['wireless', 'fiber', '5g', 'broadband'],
  },
  'VZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Telecom',
    tags: ['wireless', 'fios', '5g', 'enterprise'],
  },
  'TMUS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Telecom',
    tags: ['wireless', '5g', 'un_carrier', 'growth'],
  },
  'CMCSA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cable & Telecom',
    tags: ['cable', 'broadband', 'nbc', 'peacock', 'theme_parks'],
  },
  'CHTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cable & Telecom',
    tags: ['cable', 'broadband', 'spectrum', 'mobile'],
  },

  // ---------- 流媒体/娱乐 (Streaming & Entertainment) ----------
  'DIS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'product_sales', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment',
    tags: ['disney_plus', 'parks', 'marvel', 'pixar', 'espn'],
  },
  'NFLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['original_content', 'global', 'ad_tier'],
  },
  'WBD': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment',
    tags: ['hbo', 'warner', 'discovery', 'dc'],
  },
  'PARA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment',
    tags: ['paramount_plus', 'cbs', 'nickelodeon', 'showtime'],
  },
  'FOX': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment',
    tags: ['news', 'sports', 'tubi', 'broadcast'],
  },
  'SPOT': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Streaming',
    tags: ['music', 'podcast', 'audio', 'freemium'],
  },

  // ---------- 数字广告 (Digital Advertising) ----------
  'TTD': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising',
    tags: ['dsp', 'programmatic', 'connected_tv', 'open_internet'],
  },
  'DV': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising',
    tags: ['verification', 'brand_safety', 'measurement'],
  },
  'MGNI': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising',
    tags: ['ssp', 'programmatic', 'connected_tv'],
  },
  'APP': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising',
    tags: ['mobile', 'app_monetization', 'ai', 'gaming'],
  },

  // ========================================================
  // 银行/信贷行业
  // ========================================================

  // ---------- 区域银行 (Regional Banks) ----------
  'MTB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['commercial', 'retail', 'northeast', 'conservative'],
  },

  // ---------- 消费金融 (Consumer Finance) ----------
  'ALLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Finance',
    tags: ['auto_finance', 'digital_banking', 'dealer'],
  },

  // ========================================================
  // 保险行业
  // 产业链: 保费收入 → 投资 → 赔付
  // 特点: 利率受益、承保周期、资本密集
  // ========================================================


  // ---------- 保险经纪 (Insurance Brokers) ----------
  'AON': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['risk', 'reinsurance', 'consulting', 'global'],
  },
  'MMC': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['marsh', 'mercer', 'consulting', 'global'],
  },
  'WTW': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['risk', 'human_capital', 'consulting'],
  },
  'AJG': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['mid_market', 'acquisitions', 'specialty'],
  },
  'BRO': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['mid_market', 'specialty', 'wholesale'],
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

  'LCID': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto',
    tags: ['dtc', 'ev_pure', 'luxury', 'saudi'],
  },

  // 汽车零部件 (Auto Parts OEM)
  'APTV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['electronics', 'connectivity', 'adas', 'ev'],
  },
  'BWA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['powertrain', 'drivetrain', 'ev_transition'],
  },
  'LEA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['seating', 'electrical', 'interior'],
  },
  'MGA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['contract_mfg', 'body', 'powertrain', 'mirrors'],
  },
  'ALV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['safety', 'airbags', 'seatbelts', 'adas'],
  },
  'GNTX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts OEM',
    tags: ['mirrors', 'dimming', 'electronics', 'cameras'],
  },

  // 汽车经销商 (More Dealers)
  'PAG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealer',
    tags: ['premium', 'multi_brand', 'service', 'uk'],
  },
  'LAD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealer',
    tags: ['growth', 'acquisitions', 'multi_brand'],
  },
  'KMX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealer',
    tags: ['used_cars', 'no_haggle', 'national'],
  },

  // 租车
  'CAR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Car Rental',
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

  // ========================================================
  // 能源行业 (Oil & Gas)
  // 产业链: 油服设备 → E&P → 中游管道 → 炼化 → 化工
  // ========================================================

  // ---------- 油服设备 (Oilfield Services) ----------
  // 特点: 轻/重资产混合、服务+设备收入、与油价/钻井活动高度相关
  'SLB': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['integrated', 'digital', 'international', 'offshore'],
  },
  'HAL': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['completion', 'drilling', 'north_america'],
  },
  'BKR': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['equipment', 'lng', 'industrial'],
  },
  'NOV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Equipment',
    tags: ['rig_equipment', 'completion', 'manufacturing'],
  },
  'LBRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['frac', 'pressure_pumping', 'permian'],
  },
  'HP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['drilling_contractor', 'rigs', 'us_land'],
  },

  // ---------- 上游E&P - 页岩油 (Shale E&P) ----------
  // 特点: 资产密集、现金流波动大、与油价高度相关
  'EOG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'eagle_ford', 'premium_drilling'],
  },
  'PXD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'pure_play', 'low_cost'],
  },
  'FANG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'midland', 'delaware'],
  },
  'DVN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['multi_basin', 'delaware', 'williston'],
  },
  'COP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['diversified', 'global', 'lng'],
  },
  'OXY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'chemicals', 'carbon_capture'],
  },

  // ---------- 上游E&P - 海上/国际 (International E&P) ----------
  'HES': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'International E&P',
    tags: ['guyana', 'bakken', 'high_growth'],
  },
  'MRO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'International E&P',
    tags: ['eagle_ford', 'bakken', 'oklahoma'],
  },
  'APA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'International E&P',
    tags: ['permian', 'suriname', 'egypt'],
  },

  // ---------- 综合油气 (Integrated Oil) ----------
  // 特点: 全产业链、规模效应、分红稳定
  'XOM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil',
    tags: ['supermajor', 'upstream', 'downstream', 'chemicals'],
  },
  'CVX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil',
    tags: ['supermajor', 'permian', 'lng', 'dividend'],
  },
  'SHEL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil',
    tags: ['supermajor', 'lng_leader', 'energy_transition'],
  },
  'BP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil',
    tags: ['supermajor', 'renewables', 'trading'],
  },
  'TTE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil',
    tags: ['supermajor', 'lng', 'renewables', 'european'],
  },

  // ---------- 中游管道 (Midstream Pipeline) ----------
  // 特点: MLP结构、稳定现金流、费率制收入
  'WMB': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['natural_gas', 'transco', 'gathering'],
  },
  'KMI': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['diversified', 'natural_gas', 'co2'],
  },
  'ET': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['diversified', 'ngl', 'crude', 'gas'],
  },
  'EPD': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['ngl', 'petrochemical', 'export'],
  },
  'MPLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['crude', 'gas', 'mpc_affiliated'],
  },
  'OKE': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['ngl', 'natural_gas', 'midcontinent'],
  },
  'TRGP': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['permian', 'gathering', 'processing'],
  },

  // ---------- 下游炼化 (Refining) ----------
  // 特点: 利润取决于裂解价差、资产密集、周期性
  'VLO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['largest_refiner', 'renewable_diesel', 'gulf_coast'],
  },
  'MPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['refining', 'midstream', 'retail'],
  },
  'PSX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['refining', 'midstream', 'chemicals', 'jv'],
  },
  'DK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['regional', 'midcontinent', 'retail'],
  },
  'PBF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['east_coast', 'west_coast', 'mid_con'],
  },

  // ---------- 石化/化工 (Chemicals) ----------
  // 特点: 上游整合、周期性、乙烯链
  'DOW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chemicals',
    tags: ['commodity_chemicals', 'plastics', 'ethylene'],
  },
  'LYB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chemicals',
    tags: ['polyethylene', 'polypropylene', 'refining'],
  },
  'CE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chemicals',
    tags: ['acetyl', 'engineered_materials', 'specialty'],
  },
  'EMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chemicals',
    tags: ['specialty', 'additives', 'fibers'],
  },
  'DD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['electronics', 'water', 'protection', 'industrial'],
  },

  // ========================================================
  // 消费必需品行业 (Consumer Staples)
  // 产业链: 原材料 → 包装食品/家居用品 → 零售/分销
  // 特点: 防御型、需求稳定、品牌护城河
  // ========================================================

  // ---------- 家居用品 (Household Products) ----------
  // 特点: 品牌溢价、日常必需、渠道能力
  'PG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Household Products',
    tags: ['diversified', 'premium', 'global', 'beauty', 'grooming'],
  },
  'CL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Household Products',
    tags: ['oral_care', 'personal_care', 'pet_nutrition', 'global'],
  },
  'KMB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Household Products',
    tags: ['tissue', 'diapers', 'personal_care'],
  },
  'CHD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Household Products',
    tags: ['baking_soda', 'laundry', 'personal_care', 'vitamins'],
  },
  'CLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Household Products',
    tags: ['cleaning', 'disinfecting', 'charcoal', 'bags'],
  },

  // ---------- 包装食品 (Packaged Food) ----------
  // 特点: 品牌组合、渠道渗透、成本管理
  'GIS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['cereal', 'snacks', 'pet', 'convenience'],
  },
  'K': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['cereal', 'snacks', 'frozen', 'plant_based'],
  },
  'KHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['condiments', 'cheese', 'meat', 'legacy_brands'],
  },
  'HSY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['chocolate', 'confectionery', 'snacks', 'seasonal'],
  },
  'CAG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['frozen', 'snacks', 'grocery', 'foodservice'],
  },
  'CPB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['soup', 'snacks', 'meals', 'sauces'],
  },
  'SJM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['coffee', 'peanut_butter', 'jelly', 'pet'],
  },
  'MDLZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['snacks', 'biscuits', 'chocolate', 'global'],
  },
  'HRL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['meat', 'protein', 'deli', 'international'],
  },
  'TSN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['chicken', 'beef', 'pork', 'prepared_foods'],
  },

  // ---------- 饮料 (Beverages) ----------
  // 特点: 品牌溢价、分销网络、全球化
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
  'KDP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Beverages',
    tags: ['coffee', 'soft_drinks', 'single_serve', 'dsd'],
  },

  // ---------- 烟草 (Tobacco) ----------
  // 特点: 高现金流、下降趋势、转型中
  'PM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Tobacco',
    tags: ['international', 'iqos', 'reduced_risk', 'marlboro'],
  },
  'MO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Tobacco',
    tags: ['us_domestic', 'marlboro', 'smokeless', 'oral'],
  },
  'BTI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Tobacco',
    tags: ['global', 'new_categories', 'vaping', 'heated'],
  },

  // ---------- 食品零售/分销 (Food Retail) ----------
  // 特点: 低毛利、高周转、规模效应
  'KR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Food Retail',
    tags: ['grocery', 'supermarket', 'private_label', 'fuel'],
  },
  'SYY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food Distribution',
    tags: ['foodservice', 'distribution', 'restaurants', 'healthcare'],
  },
  'USFD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food Distribution',
    tags: ['foodservice', 'distribution', 'independent'],
  },

  // ---------- 折扣零售 (Discount Retail) ----------
  // 特点: 价值导向、低价策略
  'DG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Discount Retail',
    tags: ['dollar', 'rural', 'convenience', 'value'],
  },
  'DLTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Discount Retail',
    tags: ['dollar', 'family_dollar', 'value', 'suburban'],
  },

  // ========================================================
  // 消费可选行业 (Consumer Discretionary)
  // 特点: 周期性、消费者信心敏感、可支配收入驱动
  // ========================================================

  // ---------- 家居建材 (Home Improvement) ----------
  // 特点: 房地产周期、DIY vs Pro
  'HD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Improvement',
    tags: ['diy', 'pro', 'omnichannel', 'big_box'],
  },
  'LOW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Improvement',
    tags: ['diy', 'pro', 'omnichannel', 'suburban'],
  },

  // ---------- 餐饮 (Restaurants) ----------
  // 特点: 加盟模式、品牌价值、便利性
  'MCD': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'global', 'real_estate', 'value'],
  },
  'SBUX': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['coffee', 'premium', 'loyalty', 'third_place'],
  },
  'CMG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['fast_casual', 'mexican', 'fresh', 'digital'],
  },
  'YUM': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'global', 'kfc', 'taco_bell', 'pizza_hut'],
  },
  'DRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['casual_dining', 'olive_garden', 'longhorn'],
  },
  'QSR': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'burger_king', 'tim_hortons', 'popeyes'],
  },
  'WING': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'wings', 'sports', 'delivery'],
  },

  // ---------- 服装零售 (Apparel Retail) ----------
  // 特点: 时尚周期、库存风险、品牌定位
  'GPS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Apparel Retail',
    tags: ['gap', 'old_navy', 'banana_republic', 'athleisure'],
  },
  'ANF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Apparel Retail',
    tags: ['abercrombie', 'hollister', 'young_adult', 'turnaround'],
  },
  'AEO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Apparel Retail',
    tags: ['american_eagle', 'aerie', 'teen', 'intimates'],
  },
  'URBN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Apparel Retail',
    tags: ['urban_outfitters', 'anthropologie', 'free_people', 'lifestyle'],
  },

  // ---------- 专业零售 (Specialty Retail) ----------
  // 特点: 品类专注、专业知识、服务附加值
  'BBY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['electronics', 'appliances', 'geek_squad', 'omnichannel'],
  },
  'ULTA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['beauty', 'salon', 'prestige', 'mass'],
  },
  'ORLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Parts Retail',
    tags: ['auto_parts', 'diy', 'difm', 'professional'],
  },
  'AZO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Parts Retail',
    tags: ['auto_parts', 'diy', 'commercial', 'hub_model'],
  },
  'AAP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Parts Retail',
    tags: ['auto_parts', 'diy', 'professional', 'carquest'],
  },
  'W': {
    assetModel: 'platform',
    revenueModels: ['product_sales', 'advertising'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['home', 'furniture', 'e_commerce', 'dropship'],
  },
  'RH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['luxury', 'home', 'galleries', 'membership'],
  },
  'WSM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['home', 'pottery_barn', 'williams_sonoma', 'west_elm'],
  },

  // ---------- 邮轮/休闲 (Cruise & Leisure) ----------
  // 特点: 重资产、高杠杆、强周期
  'RCL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cruise Lines',
    tags: ['royal_caribbean', 'celebrity', 'premium', 'mega_ships'],
  },
  'CCL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cruise Lines',
    tags: ['carnival', 'princess', 'mass_market', 'global'],
  },
  'NCLH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cruise Lines',
    tags: ['norwegian', 'freestyle', 'regent', 'oceania'],
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

  // ========================================================
  // 金融行业 (Financial Services)
  // 产业链: 银行 → 资管 → 保险 | 支付网络
  // ========================================================

  // ---------- 大型银行 (Money Center Banks) ----------
  // 特点: 全能银行、规模效应、利率敏感、系统重要性
  'JPM': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Money Center Bank',
    tags: ['universal', 'investment_bank', 'wealth', 'trading', 'cards'],
  },
  'BAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Money Center Bank',
    tags: ['universal', 'consumer', 'wealth', 'merrill'],
  },
  'WFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Money Center Bank',
    tags: ['consumer', 'mortgage', 'retail', 'commercial'],
  },
  'C': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Money Center Bank',
    tags: ['global', 'institutional', 'treasury', 'cards'],
  },

  // ---------- 区域银行 (Regional Banks) ----------
  // 特点: 区域聚焦、商业贷款、利率敏感度高
  'PNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['mid_atlantic', 'commercial', 'wealth'],
  },
  'USB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['midwest', 'payments', 'trust'],
  },
  'TFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['southeast', 'insurance', 'commercial'],
  },
  'FITB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['midwest', 'commercial', 'consumer'],
  },
  'RF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['southeast', 'commercial', 'consumer'],
  },
  'KEY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['midwest', 'commercial', 'investment_bank'],
  },
  'CFG': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['northeast', 'commercial', 'consumer'],
  },
  'HBAN': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Bank',
    tags: ['midwest', 'commercial', 'auto_lending'],
  },

  // ---------- 投资银行 (Investment Banks) ----------
  // 特点: 轻资产、交易收入、周期性强、高杠杆
  'GS': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['trading', 'm&a', 'asset_management', 'marcus'],
  },
  'MS': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['wealth', 'trading', 'm&a', 'e_trade'],
  },
  // ---------- 托管银行 (Custody Banks) ----------
  'BK': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Custody Bank',
    tags: ['custody', 'asset_servicing', 'clearing', 'treasury_services'],
  },
  'STT': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Custody Bank',
    tags: ['custody', 'etf', 'spdr', 'asset_servicing'],
  },

  // ---------- 资产管理 (Asset Management) ----------
  // 特点: 轻资产、AUM驱动、管理费+业绩费
  'BLK': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['passive', 'etf', 'ishares', 'aladdin'],
  },
  'BX': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Manager',
    tags: ['private_equity', 'real_estate', 'credit', 'infrastructure'],
  },
  'KKR': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Manager',
    tags: ['private_equity', 'credit', 'infrastructure', 'real_estate'],
  },
  'APO': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Manager',
    tags: ['credit', 'private_equity', 'insurance', 'athene'],
  },
  'ARES': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Manager',
    tags: ['credit', 'private_equity', 'real_estate', 'secondary'],
  },
  'CG': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Manager',
    tags: ['private_equity', 'credit', 'real_estate', 'global'],
  },
  'TROW': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['active', 'mutual_funds', 'retirement'],
  },

  // ---------- 保险 - 财产险 (P&C Insurance) ----------
  // 特点: 浮存金投资、承保周期、利率敏感
  'TRV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['commercial', 'personal', 'specialty'],
  },
  'ALL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'P&C Insurance',
    tags: ['auto', 'home', 'agent_network'],
  },
  'PGR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'P&C Insurance',
    tags: ['auto', 'direct', 'usage_based', 'telematics'],
  },
  'CB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['commercial', 'specialty', 'global', 'high_net_worth'],
  },
  'AIG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['commercial', 'specialty', 'global'],
  },

  // ---------- 保险 - 寿险 (Life Insurance) ----------
  // 特点: 长期负债、利差收入、利率敏感
  'MET': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance',
    tags: ['group', 'retirement', 'annuities', 'global'],
  },
  'PRU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance',
    tags: ['annuities', 'retirement', 'asset_management', 'international'],
  },
  'AFL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance',
    tags: ['supplemental', 'cancer', 'japan', 'worksite'],
  },
  'LNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance',
    tags: ['annuities', 'life', 'retirement', 'group'],
  },
  'PFG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Insurance',
    tags: ['retirement', 'asset_management', 'group'],
  },

  // ---------- 消费金融 (Consumer Finance) ----------
  // 特点: 信用卡、汽车贷款、高收益高风险
  'COF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Finance',
    tags: ['cards', 'auto', 'digital', 'rewards'],
  },
  'DFS': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Finance',
    tags: ['cards', 'personal_loans', 'student_loans', 'cashback'],
  },
  'SYF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Consumer Finance',
    tags: ['private_label', 'retail_cards', 'healthcare', 'home'],
  },

  // ---------- 券商/经纪 (Brokerage) ----------
  // 特点: 交易收入、NIM、资产收集
  'SCHW': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Brokerage',
    tags: ['retail', 'ria', 'banking', 'etf'],
  },
  'LPLA': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Brokerage',
    tags: ['ria', 'independent', 'advisor_platform'],
  },

  // ---------- 交易所/市场基础设施 ----------
  // 特点: 网络效应、双边市场、稳定现金流
  'CME': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['derivatives', 'futures', 'options', 'clearing'],
  },
  'ICE': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['commodities', 'fixed_income', 'mortgage', 'nyse'],
  },
  'NDAQ': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['equities', 'technology', 'market_tech', 'listing'],
  },
  'CBOE': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['options', 'vix', 'etf', 'fx'],
  },

  // ---------- 金融数据/信息服务 ----------
  // 特点: 订阅收入、高粘性、轻资产
  'SPGI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['ratings', 'index', 'analytics', 'commodities'],
  },
  'MCO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['ratings', 'analytics', 'kyc', 'research'],
  },
  'MSCI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['index', 'esg', 'analytics', 'benchmark'],
  },

  // ========================================================
  // 医疗健康行业 (Healthcare)
  // 产业链: 制药 → 生物科技 → 医疗器械 → 医疗服务 → 药品分销
  // ========================================================

  // ---------- 大型制药 (Big Pharma) ----------
  // 特点: 多元化产品线、稳定现金流、专利悬崖风险
  'JNJ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['diversified', 'consumer', 'medtech', 'oncology'],
  },
  'PFE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['vaccines', 'oncology', 'immunology', 'rare_disease'],
  },
  'MRK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['oncology', 'keytruda', 'vaccines', 'animal_health'],
  },
  'ABBV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['immunology', 'humira', 'oncology', 'aesthetics'],
  },
  'LLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['diabetes', 'glp1', 'obesity', 'alzheimers', 'oncology'],
  },
  'BMY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['oncology', 'immunology', 'cardiovascular', 'cell_therapy'],
  },
  'AZN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['oncology', 'respiratory', 'cardiovascular', 'rare_disease'],
  },
  'NVS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['oncology', 'immunology', 'cardiovascular', 'ophthalmology'],
  },
  'GSK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['vaccines', 'respiratory', 'hiv', 'oncology'],
  },
  'NVO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Big Pharma',
    tags: ['diabetes', 'glp1', 'obesity', 'insulin', 'hemophilia'],
  },

  // ---------- 生物科技 (Biotech) ----------
  // 特点: 高研发投入、二元结果、专利驱动
  'AMGN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['biosimilars', 'oncology', 'inflammation', 'bone'],
  },
  'GILD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['hiv', 'hepatitis', 'oncology', 'cell_therapy'],
  },
  'BIIB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['neurology', 'alzheimers', 'ms', 'biosimilars'],
  },
  'VRTX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['cystic_fibrosis', 'gene_editing', 'rare_disease', 'pain'],
  },
  'REGN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['ophthalmology', 'oncology', 'immunology', 'genetics'],
  },
  'MRNA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['mrna', 'vaccines', 'oncology', 'rare_disease'],
  },
  'ALNY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['rnai', 'rare_disease', 'cardiovascular', 'genetic'],
  },

  // ---------- 医疗器械 (Medical Devices) ----------
  // 特点: 高毛利、粘性客户、技术迭代
  'MDT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['diversified', 'cardiac', 'spine', 'diabetes', 'surgical'],
  },
  'ABT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['diagnostics', 'nutrition', 'cardiac', 'diabetes', 'cgm'],
  },
  'SYK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['orthopedics', 'surgical', 'neurotechnology', 'robotics'],
  },
  'BSX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['cardiac', 'endoscopy', 'urology', 'neuromodulation'],
  },
  'ISRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['robotic_surgery', 'da_vinci', 'instruments', 'training'],
  },
  'EW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['structural_heart', 'tavr', 'critical_care'],
  },
  'ZBH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['orthopedics', 'knee', 'hip', 'spine', 'dental'],
  },
  'BDX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['medical_supplies', 'diagnostics', 'diabetes', 'interventional'],
  },

  // ---------- 医疗保险/管理式医疗 (Managed Care) ----------
  // 特点: 规模效应、会员基础、政策敏感
  'UNH': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Managed Care',
    tags: ['insurance', 'optum', 'pbm', 'analytics', 'medicare'],
  },
  'ELV': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Managed Care',
    tags: ['insurance', 'medicaid', 'medicare', 'commercial'],
  },
  'HUM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Managed Care',
    tags: ['medicare_advantage', 'seniors', 'centerwell'],
  },
  'CI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Managed Care',
    tags: ['insurance', 'evernorth', 'pbm', 'specialty'],
  },
  'CNC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Managed Care',
    tags: ['medicaid', 'medicare', 'marketplace', 'government'],
  },

  // ---------- 药品分销/PBM (Drug Distribution) ----------
  // 特点: 低毛利高周转、规模经济、合同定价
  'MCK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Drug Distribution',
    tags: ['distribution', 'specialty', 'oncology', 'analytics'],
  },
  'ABC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Drug Distribution',
    tags: ['distribution', 'specialty', 'animal_health', 'alliance'],
  },
  'CAH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Drug Distribution',
    tags: ['distribution', 'nuclear', 'medical_products', 'at_home'],
  },

  // ---------- 药房零售 (Pharmacy Retail) ----------
  // 特点: 零售+医疗服务融合、PBM整合
  'CVS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pharmacy Retail',
    tags: ['pharmacy', 'pbm', 'health_hubs', 'aetna', 'insurance'],
  },
  'WBA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pharmacy Retail',
    tags: ['pharmacy', 'retail', 'international', 'boots'],
  },

  // ---------- 医疗服务 (Healthcare Services) ----------
  // 特点: 劳动密集、区域性、支付方多元
  'HCA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hospital Systems',
    tags: ['hospitals', 'surgery_centers', 'emergency', 'urban'],
  },
  'THC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hospital Systems',
    tags: ['hospitals', 'ambulatory', 'uspi', 'behavioral'],
  },
  'UHS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hospital Systems',
    tags: ['hospitals', 'behavioral', 'acute', 'psychiatric'],
  },

  // ---------- 生命科学工具 (Life Sciences Tools) ----------
  // 特点: 高毛利、研发支出驱动、耗材模式
  'TMO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['instruments', 'consumables', 'pharma_services', 'diagnostics'],
  },
  'DHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['diagnostics', 'bioprocessing', 'environmental', 'dbs'],
  },
  'A': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['instruments', 'consumables', 'genomics', 'diagnostics'],
  },
  'IQV': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['cro', 'clinical_trials', 'analytics', 'real_world_data'],
  },
  'CRL': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['preclinical', 'safety_assessment', 'discovery', 'lab_animal'],
  },
  'WAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['chromatography', 'mass_spec', 'ta_instruments'],
  },

  // ---------- 动物健康 (Animal Health) ----------
  // 特点: 宠物+畜牧、防御性需求
  'ZTS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Animal Health',
    tags: ['companion', 'livestock', 'vaccines', 'parasiticides'],
  },
  'IDXX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Animal Health',
    tags: ['diagnostics', 'companion', 'reference_labs', 'software'],
  },

  // ========================================================
  // 工业/材料行业 (Industrials & Materials)
  // 产业链: 原材料 → 加工制造 → 机械设备 → 终端应用
  // 特点: 资本开支周期、GDP敏感、B2B为主
  // ========================================================

  // ---------- 工业综合 (Industrial Conglomerates) ----------
  // 特点: 多元化、跨多个终端市场
  'HON': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['aerospace', 'building_tech', 'safety', 'automation'],
  },
  'MMM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['safety', 'industrial', 'consumer', 'healthcare'],
  },
  'GE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['aerospace', 'power', 'renewable', 'services'],
  },
  'ITW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['auto', 'food_equipment', 'welding', 'test'],
  },
  'EMR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['automation', 'climate', 'tools', 'software'],
  },
  'ETN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['electrical', 'aerospace', 'vehicle', 'emobility'],
  },
  'PH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['motion', 'aerospace', 'filtration', 'hydraulics'],
  },
  'ROK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Automation',
    tags: ['plc', 'motion', 'software', 'services'],
  },

  // ---------- 航空航天与国防 (Aerospace & Defense) ----------
  // 特点: 长周期合同、政府客户、高壁垒
  'BA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace',
    tags: ['commercial', 'defense', 'services', 'oem'],
  },
  'RTX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace & Defense',
    tags: ['engines', 'missiles', 'avionics', 'defense'],
  },
  'LMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense',
    tags: ['f35', 'missiles', 'space', 'rotary'],
  },
  'GD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense',
    tags: ['submarines', 'tanks', 'gulfstream', 'it_services'],
  },
  'NOC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense',
    tags: ['stealth', 'space', 'autonomous', 'cyber'],
  },
  'HII': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense',
    tags: ['shipbuilding', 'carriers', 'submarines', 'navy'],
  },
  'TXT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace',
    tags: ['business_jets', 'bell', 'defense', 'industrial'],
  },
  'HWM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Components',
    tags: ['fasteners', 'structures', 'engine_parts', 'forging'],
  },
  'TDG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Components',
    tags: ['proprietary_parts', 'aftermarket', 'oem'],
  },
  'HEI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Components',
    tags: ['pma_parts', 'repair', 'electronic_tech'],
  },
  'LHX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense',
    tags: ['comms', 'ew', 'isr', 'space', 'sensors'],
  },

  // ---------- 航空公司 (Airlines) ----------
  // 特点: 重资产、油价敏感、高运营杠杆
  'DAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Airlines',
    tags: ['full_service', 'hub', 'loyalty', 'premium'],
  },
  'UAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Airlines',
    tags: ['full_service', 'international', 'hub', 'premium'],
  },
  'AAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Airlines',
    tags: ['full_service', 'hub', 'largest_fleet', 'high_leverage'],
  },
  'LUV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Airlines',
    tags: ['low_cost', 'point_to_point', 'domestic', 'no_frills'],
  },

  // ---------- 建筑机械/农业机械 (Construction & Ag Equipment) ----------
  // 特点: 资本开支周期、经销商网络
  'CAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Construction Equipment',
    tags: ['mining', 'construction', 'dealer_network', 'rental'],
  },
  'DE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service', 'subscription'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Agricultural Equipment',
    tags: ['ag', 'construction', 'precision_tech', 'financing'],
  },
  'AGCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Agricultural Equipment',
    tags: ['tractors', 'combines', 'global', 'precision'],
  },
  'CNHI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Agricultural Equipment',
    tags: ['case', 'new_holland', 'ag', 'construction'],
  },
  'PCAR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Trucks',
    tags: ['peterbilt', 'kenworth', 'daf', 'parts'],
  },
  'CMI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Engine & Power',
    tags: ['engines', 'power_gen', 'emissions', 'components'],
  },
  'TEX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Construction Equipment',
    tags: ['aerial', 'materials', 'cranes', 'utilities'],
  },
  'OSK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Vehicles',
    tags: ['defense', 'fire_rescue', 'refuse', 'concrete'],
  },

  // ---------- 铁路 (Railroads) ----------
  // 特点: 重资产、寡头垄断、长期合同
  'UNP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Railroads',
    tags: ['class_i', 'western', 'intermodal', 'bulk'],
  },
  'CSX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Railroads',
    tags: ['class_i', 'eastern', 'intermodal', 'coal'],
  },
  'NSC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Railroads',
    tags: ['class_i', 'eastern', 'auto', 'metals'],
  },

  // ---------- 工业分销 (Industrial Distribution) ----------
  // 特点: 高周转、增值服务、长尾客户
  'FAST': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['fasteners', 'vending', 'onsite', 'mro'],
  },
  'GWW': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['mro', 'digital', 'branches', 'endless_assortment'],
  },
  'MSM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['metalworking', 'mro', 'catalog', 'ecommerce'],
  },
  'WSO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['hvac', 'refrigeration', 'plumbing', 'contractor'],
  },
  'POOL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['pool', 'irrigation', 'outdoor', 'seasonal'],
  },

  // ---------- 钢铁 (Steel) ----------
  // 特点: 商品周期、资本密集、能源成本
  'NUE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel',
    tags: ['eaf', 'sheet', 'bar', 'structural', 'scrap'],
  },
  'STLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel',
    tags: ['eaf', 'flat_rolled', 'fabrication', 'aluminum'],
  },
  'CLF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel',
    tags: ['integrated', 'auto', 'iron_ore', 'hbi'],
  },
  'X': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel',
    tags: ['integrated', 'flat_rolled', 'tubular', 'legacy'],
  },
  'RS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel Distribution',
    tags: ['service_center', 'processing', 'diversified'],
  },

  // ---------- 铜/有色金属 (Copper & Non-Ferrous) ----------
  // 特点: 商品周期、电气化需求
  'FCX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Copper Mining',
    tags: ['copper', 'gold', 'molybdenum', 'indonesia'],
  },
  'SCCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Copper Mining',
    tags: ['copper', 'peru', 'mexico', 'low_cost'],
  },
  'AA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aluminum',
    tags: ['bauxite', 'alumina', 'aluminum', 'recycling'],
  },

  // ---------- 骨料/水泥 (Aggregates & Cement) ----------
  // 特点: 本地市场、运输半径、基建周期
  'VMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aggregates',
    tags: ['aggregates', 'asphalt', 'concrete', 'southeast'],
  },
  'MLM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aggregates',
    tags: ['aggregates', 'cement', 'asphalt', 'texas'],
  },
  'CX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cement',
    tags: ['cement', 'concrete', 'aggregates', 'global'],
  },

  // ---------- 工程承包 (Engineering & Construction) ----------
  // 特点: 项目制、资本开支周期、政府合同
  'PWR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C',
    tags: ['electric_utility', 'pipeline', 'telecom', 'renewable'],
  },
  'ACM': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C',
    tags: ['infrastructure', 'government', 'consulting', 'design'],
  },
  'J': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C',
    tags: ['critical_infrastructure', 'government', 'consulting'],
  },
  'MTZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C',
    tags: ['energy', 'telecom', 'utility', 'infrastructure'],
  },
  'EME': {  // EMCOR Group - 电气/机械承包
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C',
    tags: ['electrical', 'mechanical', 'building_services'],
  },

  // ---------- 包装 (Packaging) ----------
  // 特点: 消费需求驱动、原材料成本
  'BALL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['aluminum_cans', 'beverage', 'aerospace'],
  },
  'CCK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['steel_cans', 'aluminum', 'beverage', 'food'],
  },
  'PKG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['corrugated', 'containerboard', 'integrated'],
  },
  'IP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['corrugated', 'pulp', 'cellulose_fibers'],
  },
  'WRK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['corrugated', 'consumer', 'display', 'machinery'],
  },
  'AMCR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['flexible', 'rigid', 'healthcare', 'food'],
  },

  // ---------- 特种化工 (Specialty Chemicals) ----------
  // 特点: 配方/应用驱动、客户粘性
  'APD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Gases',
    tags: ['oxygen', 'nitrogen', 'hydrogen', 'lng'],
  },
  'LIN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Gases',
    tags: ['oxygen', 'nitrogen', 'electronics', 'healthcare'],
  },
  'SHW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Coatings',
    tags: ['paint', 'coatings', 'pro_contractor', 'retail'],
  },
  'PPG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Coatings',
    tags: ['paints', 'coatings', 'specialty', 'global'],
  },
  'ECL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['water', 'hygiene', 'energy', 'pest'],
  },
  'IFF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['flavors', 'fragrances', 'nutrition', 'ingredients'],
  },
  'ALB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['lithium', 'bromine', 'catalysts', 'ev_battery'],
  },

  // ========================================================
  // 房地产/REITs行业
  // 产业链: 建筑 → 物业运营 → 租户/消费者
  // 特点: 高利率敏感、稳定收益、区域性
  // ========================================================

  // ---------- 工业REITs (Industrial/Logistics) ----------
  'PLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['logistics', 'warehouse', 'ecommerce', 'global'],
  },
  'REXR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['industrial', 'socal', 'infill', 'last_mile'],
  },
  'STAG': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['single_tenant', 'industrial', 'net_lease'],
  },

  // ---------- 零售REITs (Retail) ----------
  'SPG': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['malls', 'premium_outlets', 'mixed_use'],
  },
  'O': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['triple_net', 'retail', 'monthly_dividend'],
  },
  'NNN': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['triple_net', 'retail', 'single_tenant'],
  },
  'VICI': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['gaming', 'experiential', 'triple_net'],
  },

  // ---------- 住宅REITs (Residential) ----------
  'EQR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['apartments', 'coastal', 'urban', 'luxury'],
  },
  'AVB': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['apartments', 'coastal', 'suburban', 'development'],
  },
  'MAA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['apartments', 'sunbelt', 'garden_style'],
  },
  'INVH': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['single_family', 'rental', 'sunbelt'],
  },

  // ---------- 办公REITs (Office) ----------
  'BXP': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['class_a', 'urban', 'life_science', 'coastal'],
  },
  'VNO': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['nyc', 'office', 'mixed_use'],
  },

  // ---------- 医疗REITs (Healthcare) ----------
  'WELL': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['senior_housing', 'medical_office', 'wellness'],
  },
  'VTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['senior_housing', 'life_science', 'medical_office'],
  },
  'OHI': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['skilled_nursing', 'triple_net', 'operators'],
  },

  // ---------- 自存储REITs (Self-Storage) ----------
  'PSA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Self-Storage REIT',
    tags: ['self_storage', 'brand', 'scale'],
  },
  'EXR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Self-Storage REIT',
    tags: ['self_storage', 'management', 'technology'],
  },

  // ========================================================
  // 公用事业行业 (Utilities)
  // 产业链: 发电 → 输配电 → 终端用户
  // 特点: 高分红、利率敏感、监管环境
  // ========================================================

  // ---------- 受管制电力 (Regulated Electric) ----------
  'NEE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['renewable', 'fpl', 'wind', 'solar', 'nuclear'],
  },
  'DUK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['regulated', 'southeast', 'nuclear', 'gas'],
  },
  'SO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['regulated', 'southeast', 'nuclear', 'gas'],
  },
  'AEP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['regulated', 'transmission', 'midwest'],
  },
  'EXC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['regulated', 'nuclear', 'northeast', 'midwest'],
  },
  'XEL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['regulated', 'wind', 'clean_energy', 'midwest'],
  },

  // ---------- 独立发电商 (IPP) ----------
  'VST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Independent Power',
    tags: ['merchant', 'nuclear', 'gas', 'texas'],
  },
  'NRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Independent Power',
    tags: ['merchant', 'retail', 'gas', 'solar'],
  },
  'CEG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Independent Power',
    tags: ['nuclear', 'clean_energy', 'ppa', 'data_center'],
  },

  // ---------- 可再生能源 (Solar/Renewable) ----------
  'ENPH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Solar Equipment',
    tags: ['microinverter', 'residential', 'battery', 'software'],
  },
  'SEDG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Solar Equipment',
    tags: ['inverter', 'optimizer', 'commercial', 'battery'],
  },
  'FSLR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Manufacturing',
    tags: ['thin_film', 'utility_scale', 'us_manufacturing'],
  },
  'RUN': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Solar Installer',
    tags: ['residential', 'lease', 'ppa', 'battery'],
  },

  // ---------- 水务 (Water) ----------
  'AWK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Water Utility',
    tags: ['regulated', 'water', 'wastewater', 'acquisitions'],
  },

  // ---------- 废弃物处理 (Waste Management) ----------
  // 特点: 区域垄断、定价权、防御性
  'WM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Waste Management',
    tags: ['collection', 'landfill', 'recycling', 'renewable_energy'],
  },
  'RSG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Waste Management',
    tags: ['collection', 'landfill', 'recycling', 'transfer'],
  },
  'CLH': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Services',
    tags: ['hazardous_waste', 'industrial', 'oil_re_refining', 'field_services'],
  },

  // ========== 酒精饮料 (Alcoholic Beverages) ==========
  'STZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Beer & Spirits',
    tags: ['beer', 'wine', 'spirits', 'premium', 'modelo', 'corona'],
  },
  'TAP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Beer',
    tags: ['beer', 'mass-market', 'coors', 'miller'],
  },
  'DEO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Spirits',
    tags: ['spirits', 'premium', 'scotch', 'vodka', 'tequila', 'global'],
  },
  'SAM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Craft Beer',
    tags: ['craft-beer', 'hard-seltzer', 'innovation'],
  },

  // ========== 美妆/个护 (Beauty & Personal Care) ==========
  'EL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Prestige Beauty',
    tags: ['skincare', 'makeup', 'fragrance', 'premium', 'travel-retail'],
  },
  'COTY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Mass Beauty',
    tags: ['fragrance', 'cosmetics', 'mass-market', 'prestige'],
  },

  // ========== 时尚/奢侈品牌 (Fashion & Luxury Brands) ==========
  'TPR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Accessible Luxury',
    tags: ['coach', 'kate-spade', 'leather-goods', 'premium'],
  },
  'CPRI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Accessible Luxury',
    tags: ['michael-kors', 'versace', 'jimmy-choo', 'premium'],
  },
  'PVH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Fashion Brand',
    tags: ['calvin-klein', 'tommy-hilfiger', 'wholesale', 'global'],
  },
  'RL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Luxury Apparel',
    tags: ['luxury', 'lifestyle', 'heritage', 'premium'],
  },
  'VFC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Outdoor Apparel',
    tags: ['north-face', 'vans', 'outdoor', 'streetwear', 'timberland'],
  },
  'HBI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Basics Apparel',
    tags: ['basics', 'underwear', 'activewear', 'value', 'wholesale'],
  },
  'LEVI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Denim Brand',
    tags: ['denim', 'casual', 'heritage', 'wholesale', 'direct'],
  },

  // ========== IT服务/咨询 (IT Services & Consulting) ==========
  'ACN': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Consulting',
    tags: ['consulting', 'outsourcing', 'digital', 'cloud', 'enterprise'],
  },
  'INFY': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Outsourcing',
    tags: ['outsourcing', 'offshore', 'digital', 'enterprise'],
  },
  'WIT': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Outsourcing',
    tags: ['outsourcing', 'offshore', 'cloud', 'enterprise'],
  },
  'CTSH': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Outsourcing',
    tags: ['outsourcing', 'healthcare-it', 'digital', 'enterprise'],
  },
  'EPAM': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Consulting',
    tags: ['engineering', 'platform', 'digital', 'product-development'],
  },

  // ========== EDA/设计软件 (Electronic Design Automation) ==========
  'CDNS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EDA Software',
    tags: ['eda', 'chip-design', 'simulation', 'verification', 'ip'],
  },
  'SNPS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EDA Software',
    tags: ['eda', 'chip-design', 'verification', 'security', 'ip'],
  },
  'ANSS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Simulation Software',
    tags: ['simulation', 'cae', 'engineering', 'digital-twin', 'multiphysics'],
  },

  // ---------- 房屋建筑商 (Homebuilders) ----------
  // 特点: 重资产(土地储备)、利率高敏感、区域性
  'LEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['single_family', 'multifamily', 'sunbelt', 'first_time_buyer'],
  },
  'DHI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['entry_level', 'single_family', 'volume', 'affordable'],
  },
  'PHM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['move_up', 'active_adult', '55_plus', 'del_webb'],
  },
  'NVR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['lot_option', 'asset_light_model', 'mid_atlantic', 'ryan_homes'],
  },
  'TOL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['luxury', 'move_up', 'urban', 'high_asp'],
  },
  'KBH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['entry_level', 'west_coast', 'built_to_order', 'energy_star'],
  },

  // ---------- 建筑材料 (Building Products) ----------
  // 特点: 制造业、新建+翻新双驱动
  'JHX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['fiber_cement', 'siding', 'exterior', 'weather_resistant'],
  },
  'AZEK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['composite_decking', 'trim', 'recycled', 'outdoor_living'],
  },
  'OC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['insulation', 'roofing', 'composites', 'fiberglass'],
  },
  'BLDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products Distribution',
    tags: ['lumber', 'windows', 'distribution', 'pro_builder'],
  },

  // ---------- 房地产服务 (Real Estate Services) ----------
  // 特点: 交易量驱动、利率敏感
  'RKT': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Mortgage',
    tags: ['mortgage_origination', 'refinance', 'fintech', 'online'],
  },
  'FAF': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Title Insurance',
    tags: ['title_insurance', 'escrow', 'settlement', 'data'],
  },
  'FNF': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Title Insurance',
    tags: ['title_insurance', 'escrow', 'annuities', 'f&g'],
  },

  // ========================================================
  // 半导体设备 (Semiconductor Equipment) - 补充
  // ========================================================
  'TER': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['test_equipment', 'ATE', 'industrial_automation'],
  },
  'ENTG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['materials', 'filtration', 'fluid_handling', 'specialty_chemicals'],
  },
  'ONTO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['process_control', 'inspection', 'metrology'],
  },
  'ACMR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['cleaning', 'wet_processing', 'ECP', 'furnace'],
  },
  'MKSI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['instruments', 'lasers', 'vacuum', 'photonics'],
  },
  'CAMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['CMP', 'polishing', 'planarization'],
  },
  'COHU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['test_handlers', 'contactors', 'back_end'],
  },
  'ICHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['gas_delivery', 'weldments', 'fluid_delivery'],
  },
  'UCTT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['gas_delivery', 'weldments', 'precision_machining'],
  },
  'FORM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['probe_cards', 'test_sockets', 'wafer_probing'],
  },
  'KLIC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['wire_bonding', 'die_attach', 'packaging'],
  },
  'TOELY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['electron_beam', 'mask_writing', 'lithography'],
  },
  'AEHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['burn_in', 'test', 'SiC', 'wafer_level'],
  },

  // ========================================================
  // 半导体 Fabless / IDM / Foundry - 补充
  // ========================================================
  'MRVL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['data_infrastructure', 'cloud', 'networking', '5G', 'storage'],
  },
  'NXPI': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['automotive', 'NFC', 'security', 'IoT', 'mixed_signal'],
  },
  'SWKS': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['RF', 'analog', '5G', 'mobile', 'connectivity'],
  },
  'QRVO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['RF', 'GaN', 'BAW', 'mobile', 'defense'],
  },
  'MPWR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['power_management', 'DC_DC', 'analog', 'automotive'],
  },
  'ON': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['power', 'SiC', 'automotive', 'image_sensors', 'industrial'],
  },
  'MCHP': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['MCU', 'analog', 'FPGA', 'embedded', 'industrial'],
  },
  'LSCC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['FPGA', 'low_power', 'edge_AI', 'industrial', 'automotive'],
  },
  'SMTC': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['analog', 'mixed_signal', 'protection', 'IoT'],
  },
  'ALGM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fabless Semiconductors',
    tags: ['magnetic_sensors', 'power', 'automotive', 'industrial'],
  },
  'INTC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['CPU', 'x86', 'data_center', 'PC', 'foundry_services'],
  },
  'TXN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['analog', 'embedded', 'industrial', 'automotive'],
  },
  'ADI': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['analog', 'mixed_signal', 'data_conversion', 'industrial'],
  },
  'MXIM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['analog', 'mixed_signal', 'power', 'automotive'],
  },
  'WOLF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IDM Semiconductors',
    tags: ['SiC', 'wide_bandgap', 'power', 'EV', 'substrates'],
  },
  'UMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Foundry',
    tags: ['foundry', 'mature_nodes', 'specialty', '28nm'],
  },
  'GFS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Foundry',
    tags: ['foundry', 'specialty', 'RF', 'embedded', 'automotive'],
  },
  'WDC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Memory Semiconductors',
    tags: ['NAND', 'HDD', 'flash', 'storage', 'data_center'],
  },
  'STX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Memory Semiconductors',
    tags: ['HDD', 'mass_storage', 'data_center', 'nearline'],
  },

  // ========================================================
  // 航空工业 (Aerospace) - 补充
  // ========================================================
  'EADSY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft OEM',
    tags: ['commercial_aircraft', 'defense', 'helicopters', 'space'],
  },
  'ERJ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft OEM',
    tags: ['regional_jets', 'business_jets', 'defense', 'eVTOL'],
  },
  'SAFRY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Engines',
    tags: ['engines', 'defense', 'helicopters', 'propulsion'],
  },
  'RR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Engines',
    tags: ['wide_body_engines', 'defense', 'power_systems', 'aftermarket'],
  },
  'SPR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerostructures',
    tags: ['fuselage', 'nacelles', 'wing_structures', 'composites'],
  },
  'HXL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerostructures',
    tags: ['carbon_fiber', 'composites', 'advanced_materials', 'lightweight'],
  },
  'WWD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerostructures',
    tags: ['flow_control', 'motion_systems', 'fluid_power', 'industrial'],
  },
  'AAR': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aviation MRO',
    tags: ['MRO', 'parts_distribution', 'component_repair', 'government'],
  },
  'AIR': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aviation MRO',
    tags: ['MRO', 'airframe', 'component_repair', 'expeditionary'],
  },
  'VSEC': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Aviation MRO',
    tags: ['military_MRO', 'sustainment', 'government_services'],
  },
  'AER': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Leasing',
    tags: ['aircraft_leasing', 'fleet_management', 'operating_lease'],
  },
  'AL': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Leasing',
    tags: ['aircraft_leasing', 'narrowbody', 'operating_lease'],
  },
  'FLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Leasing',
    tags: ['aircraft_leasing', 'young_fleet', 'operating_lease'],
  },

  // ========================================================
  // 低成本航空 (Low-Cost Airlines) - 补充
  // ========================================================
  'JBLU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Low-Cost Airlines',
    tags: ['hybrid_carrier', 'leisure', 'east_coast', 'transatlantic'],
  },
  'ALK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Low-Cost Airlines',
    tags: ['west_coast', 'premium_economy', 'loyalty', 'regional'],
  },
  'SAVE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Low-Cost Airlines',
    tags: ['ULCC', 'unbundled', 'ancillary_heavy', 'leisure'],
  },
  'ULCC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Low-Cost Airlines',
    tags: ['ULCC', 'unbundled', 'small_airports', 'leisure'],
  },

  // ========================================================
  // 汽车 (Automotive) - 补充
  // ========================================================
  'STLA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Traditional Auto OEM',
    tags: ['multi_brand', 'global', 'Jeep', 'Ram', 'EV_transition'],
  },
  'TM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Traditional Auto OEM',
    tags: ['hybrid', 'reliability', 'global', 'lean_manufacturing'],
  },
  'HMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Traditional Auto OEM',
    tags: ['motorcycles', 'power_equipment', 'reliability', 'global'],
  },
  'FSR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EV OEM',
    tags: ['EV', 'luxury', 'contract_manufacturing', 'startup'],
  },
  'NIO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EV OEM',
    tags: ['EV', 'battery_swap', 'premium', 'China', 'BaaS'],
  },
  'XPEV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EV OEM',
    tags: ['EV', 'autonomous', 'smart_cockpit', 'China', 'tech_focused'],
  },
  'LI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EV OEM',
    tags: ['EV', 'range_extender', 'family', 'China', 'SUV'],
  },
  'VC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['thermal', 'fluid', 'HVAC', 'powertrain_cooling'],
  },
  'ADNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['seating', 'interiors', 'foam', 'trim'],
  },
  'DAN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['driveline', 'sealing', 'thermal', 'electrification'],
  },
  'MOD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['powertrain', 'drivetrain', 'forging', 'machining'],
  },
  'AXL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['axles', 'driveline', 'metal_forming', 'EV_drive_units'],
  },
  'THRM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Tier1',
    tags: ['HVAC', 'thermal', 'battery_thermal', 'climate_control'],
  },
  'GPI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealers',
    tags: ['luxury', 'import', 'collision', 'service'],
  },
  'SAH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealers',
    tags: ['luxury', 'premium', 'collision', 'service'],
  },
  'ABG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Dealers',
    tags: ['diversified', 'domestic', 'import', 'service'],
  },
  'HTZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Car Rental',
    tags: ['fleet', 'airport', 'leisure', 'corporate'],
  },

  // ========================================================
  // EV电池 (EV Battery) - 补充
  // ========================================================
  'SQM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery Materials',
    tags: ['lithium', 'SPN', 'potassium', 'Chile', 'brine'],
  },
  'LTHM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery Materials',
    tags: ['lithium', 'butyllithium', 'specialty', 'Argentina'],
  },
  'LAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery Materials',
    tags: ['lithium', 'development_stage', 'Thacker_Pass', 'Nevada'],
  },
  'PLL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery Materials',
    tags: ['lithium', 'DLE', 'Carolina', 'development_stage'],
  },
  'QS': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery',
    tags: ['solid_state', 'next_gen', 'pre_revenue', 'VW_partner'],
  },

  // ========================================================
  // 运输/物流 (Transportation) - 补充
  // ========================================================
  'CP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Class I Railroad',
    tags: ['transcontinental', 'intermodal', 'bulk', 'CPKC'],
  },
  'CNI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Class I Railroad',
    tags: ['transcontinental', 'grain', 'intermodal', 'Canada'],
  },
  'ODFL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LTL Trucking',
    tags: ['LTL', 'premium_service', 'low_claims', 'union_free'],
  },
  'SAIA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LTL Trucking',
    tags: ['LTL', 'regional_expansion', 'service_quality'],
  },
  'KNX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Truckload',
    tags: ['TL', 'intermodal', 'brokerage', 'dedicated'],
  },
  'KEX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Inland Marine',
    tags: ['barge', 'inland_waterways', 'tank_barges', 'petrochemical'],
  },
  'GLNG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Shipping',
    tags: ['LNG_carriers', 'time_charter', 'long_term_contracts'],
  },

  // ========================================================
  // 农业 (Agriculture) - 补充
  // ========================================================
  'ADM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ag Commodities',
    tags: ['grain_trading', 'oilseeds', 'processing', 'nutrition'],
  },
  'BG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ag Commodities',
    tags: ['grain_trading', 'oilseeds', 'milling', 'sugar'],
  },
  'CTVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ag Inputs',
    tags: ['crop_protection', 'seeds', 'biologicals', 'digital_ag'],
  },
  'FMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ag Inputs',
    tags: ['crop_protection', 'insecticides', 'herbicides', 'plant_health'],
  },
  'MOS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fertilizer',
    tags: ['phosphate', 'potash', 'crop_nutrients'],
  },
  'NTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fertilizer',
    tags: ['potash', 'nitrogen', 'retail', 'digital_ag'],
  },
  'CF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fertilizer',
    tags: ['nitrogen', 'urea', 'ammonia', 'nat_gas_feedstock'],
  },
  'INGR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food Ingredients',
    tags: ['starches', 'sweeteners', 'texturants', 'plant_based'],
  },

  // ========================================================
  // 资源/矿业 (Mining & Resources) - 补充
  // ========================================================
  'CENX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aluminum',
    tags: ['primary_aluminum', 'smelting', 'US_producer'],
  },
  'TECK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Copper Mining',
    tags: ['copper', 'zinc', 'steelmaking_coal', 'diversified'],
  },
  'SUM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aggregates',
    tags: ['aggregates', 'cement', 'ready_mix', 'construction'],
  },

  // ========================================================
  // 油气服务 (Oilfield) - 补充
  // ========================================================
  'FTI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Equipment',
    tags: ['subsea', 'surface', 'measurement', 'deepwater'],
  },
  'CHX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Equipment',
    tags: ['artificial_lift', 'drilling', 'production', 'digital'],
  },
  'PTEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Equipment',
    tags: ['drilling_rigs', 'pressure_pumping', 'directional_drilling'],
  },
  'WFRD': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['completions', 'production', 'drilling', 'international'],
  },
  'HFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['refining', 'midcontinent', 'lubricants', 'specialty'],
  },

  // ========================================================
  // 医药/生物 (Pharma & Biotech) - 补充
  // ========================================================
  'SNY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Big Pharma',
    tags: ['immunology', 'rare_disease', 'vaccines', 'consumer_health'],
  },
  'SGEN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['ADC', 'oncology', 'antibody_drug_conjugate', 'hematology'],
  },
  'INCY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['JAK_inhibitor', 'oncology', 'dermatology', 'inflammation'],
  },
  'BMRN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['rare_disease', 'enzyme_replacement', 'gene_therapy', 'bone'],
  },
  'EXEL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['oncology', 'kinase_inhibitor', 'cabozantinib', 'RCC'],
  },
  'SRPT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['gene_therapy', 'RNA', 'rare_disease', 'DMD'],
  },
  'TEVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Generic Pharma',
    tags: ['generics', 'biosimilars', 'specialty', 'global'],
  },
  'VTRS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Generic Pharma',
    tags: ['generics', 'biosimilars', 'complex_generics', 'dermatology'],
  },
  'PRGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Generic Pharma',
    tags: ['OTC', 'store_brand', 'consumer_health', 'private_label'],
  },
  'CYH': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hospitals',
    tags: ['rural', 'community', 'acute_care', 'surgical'],
  },
  'RAD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pharmacy Retail',
    tags: ['pharmacy', 'drugstore', 'PBM', 'convenience'],
  },

  // ========================================================
  // 金融 (Financial Services) - 补充
  // ========================================================
  'BEN': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Asset Management',
    tags: ['mutual_funds', 'fixed_income', 'alternatives', 'Franklin_Templeton'],
  },
  'IVZ': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Asset Management',
    tags: ['ETFs', 'QQQ', 'active_management', 'alternatives'],
  },
  'OWL': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Management',
    tags: ['GP_stakes', 'credit', 'real_estate', 'permanent_capital'],
  },
  'FDS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['analytics', 'portfolio', 'research', 'buy_side'],
  },
  'MORN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Financial Data',
    tags: ['ratings', 'research', 'investment_management', 'retirement'],
  },
  'TRI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['legal', 'tax', 'news', 'data_analytics', 'Westlaw'],
  },
  'ADYEY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['acquiring', 'issuing', 'platform', 'enterprise', 'global'],
  },

  // ========================================================
  // 基础设施 REIT (Infrastructure) - 补充
  // ========================================================
  'AMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tower REIT',
    tags: ['cell_towers', 'data_centers', 'fiber', 'global'],
  },
  'CCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tower REIT',
    tags: ['cell_towers', 'small_cells', 'fiber', 'US_focused'],
  },
  'SBAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tower REIT',
    tags: ['cell_towers', 'international', 'leasing'],
  },

  // ========================================================
  // E&C工程 (Engineering & Construction) - 补充
  // ========================================================
  'FLR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'E&C Contractor',
    tags: ['EPC', 'energy', 'mining', 'infrastructure', 'government'],
  },
  'KBR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2G',
    industrySegment: 'E&C Contractor',
    tags: ['government_services', 'technology', 'defense', 'space'],
  },

  // ========================================================
  // 旅游 (Travel) - 补充
  // ========================================================
  'TRIP': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Travel Meta',
    tags: ['reviews', 'metasearch', 'experiences', 'restaurants'],
  },

  // ========================================================
  // 住宅建筑 (Homebuilders) - 补充
  // ========================================================
  'MTH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['entry_level', 'move_up', 'active_adult', 'western_US'],
  },

  // ========================================================
  // 环保/废物管理 - 补充 (Environmental Services)
  // ========================================================
  'CWST': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Waste Processing',
    tags: ['resource_recovery', 'organics', 'recycling', 'northeast'],
  },
  'ECOL': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Remediation',
    tags: ['remediation', 'treatment', 'disposal', 'radioactive'],
  },

  // ========================================================
  // 人力资源 (Staffing & Professional Services)
  // ========================================================
  'RHI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Staffing',
    tags: ['finance_staffing', 'professional', 'temporary', 'Protiviti'],
  },
  'MAN': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Staffing',
    tags: ['temporary', 'permanent', 'workforce_solutions', 'global'],
  },
  'ASGN': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Staffing',
    tags: ['IT_staffing', 'professional', 'consulting', 'government'],
  },
  'NSP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Professional Services',
    tags: ['PEO', 'HR_outsourcing', 'benefits', 'payroll'],
  },
  'CTAS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uniform & Workplace',
    tags: ['uniforms', 'facility_services', 'first_aid', 'fire_protection'],
  },

  // ========================================================
  // 教育 (Education)
  // ========================================================
  'LOPE': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Education Services',
    tags: ['university_services', 'online_education', 'GCU', 'non_profit_support'],
  },
  'STRA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Education Services',
    tags: ['online_university', 'Strayer', 'Capella', 'working_adults'],
  },
  'DUOL': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EdTech',
    tags: ['language_learning', 'gamification', 'freemium', 'mobile'],
  },
  'CHGG': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EdTech',
    tags: ['textbook_solutions', 'tutoring', 'homework_help', 'AI_tutor'],
  },

  // ========================================================
  // 房地产服务 (Real Estate Services)
  // ========================================================
  'CBRE': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Real Estate Services',
    tags: ['brokerage', 'property_management', 'investment_management', 'global'],
  },
  'JLL': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Real Estate Services',
    tags: ['brokerage', 'property_management', 'capital_markets', 'advisory'],
  },
  'ZG': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'premium_service'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Residential Real Estate Tech',
    tags: ['listings', 'Zestimate', 'mortgage', 'rentals'],
  },
  'RDFN': {
    assetModel: 'hybrid',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential Real Estate Tech',
    tags: ['discount_brokerage', 'tech_enabled', 'title', 'mortgage'],
  },

  // ========================================================
  // 贵金属 (Precious Metals)
  // ========================================================
  'NEM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'copper', 'silver', 'global_operations'],
  },
  'GOLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'copper', 'Tier1_assets', 'global'],
  },
  'AEM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'Canada', 'Australia', 'exploration'],
  },
  'WPM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precious Metals Streaming',
    tags: ['streaming', 'royalties', 'gold', 'silver', 'palladium'],
  },
  'FNV': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precious Metals Streaming',
    tags: ['royalties', 'streaming', 'gold', 'diversified_commodities'],
  },

  // ========================================================
  // EV充电 (EV Infrastructure)
  // ========================================================
  'CHPT': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Charging',
    tags: ['L2_charging', 'DC_fast', 'network', 'fleet'],
  },
  'EVGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'EV Charging',
    tags: ['DC_fast', 'public_charging', 'renewable', 'network'],
  },
  'BLNK': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Charging',
    tags: ['L2_charging', 'DC_fast', 'residential', 'commercial'],
  },

  // ========================================================
  // 数据中心基础设施 (Data Center Infrastructure)
  // ========================================================
  'VRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Center Infrastructure',
    tags: ['power', 'cooling', 'IT_infrastructure', 'edge'],
  },
  'PWSC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Center Infrastructure',
    tags: ['power_monitoring', 'DCIM', 'efficiency', 'software'],
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
