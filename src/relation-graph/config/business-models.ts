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
  | 'premium_service'  // 增值服务
  | 'rental'           // 租赁收入 (REIT、设备租赁)
  | 'consumables';     // 耗材/试剂 (医疗诊断、打印)

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
  'BJ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Retail',
    tags: ['membership', 'warehouse_club', 'grocery', 'bulk'],
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
  'CHWY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty E-commerce',
    tags: ['pet_supplies', 'autoship', 'pharmacy', 'pet_health'],
  },
  'PTON': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Connected Fitness',
    tags: ['fitness_equipment', 'streaming', 'community', 'wellness'],
  },
  'M': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Department Store',
    tags: ['department_store', 'omnichannel', 'private_label', 'loyalty'],
  },
  'KSS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Department Store',
    tags: ['department_store', 'value', 'kohls_cash', 'private_label'],
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
  'LBRDA': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cable & Telecom',
    tags: ['cable', 'broadband', 'charter_stake', 'holding_company'],
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
  'FI': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments',
    tags: ['bank_tech', 'clover', 'merchant', 'core_banking'],
  },
  'WU': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Payments',
    tags: ['remittance', 'cross_border', 'agent_network', 'digital'],
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
  'HPQ': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Computer Hardware',
    tags: ['pc', 'printing', 'peripherals', 'ink_subscription'],
  },
  'SONO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Electronics',
    tags: ['smart_speakers', 'audio', 'streaming_hardware', 'home_audio'],
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
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Game Engine',
    tags: ['game_engine', 'real_time_3d', 'AR_VR', 'monetization', 'create'],
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
  'HIG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diversified Insurance',
    tags: ['commercial', 'personal', 'group_benefits', 'mutual_funds'],
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

  // ========================================================
  // 企业软件 (Enterprise Software - Missing S&P 500)
  // ========================================================
  'SAP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise ERP',
    tags: ['ERP', 'S4HANA', 'cloud', 'business_suite', 'global'],
  },
  'INTU': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SMB Financial Software',
    tags: ['TurboTax', 'QuickBooks', 'Mailchimp', 'Credit_Karma', 'tax'],
  },
  'ADP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HCM / Payroll',
    tags: ['payroll', 'HR_outsourcing', 'benefits', 'workforce_management'],
  },
  'ADSK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Design Software',
    tags: ['AutoCAD', 'Revit', 'Fusion360', 'AEC', 'manufacturing', 'media'],
  },

  // ========================================================
  // 医疗设备 (Healthcare Equipment - Missing S&P 500)
  // ========================================================
  'GEHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Large MedTech',
    tags: ['imaging', 'ultrasound', 'monitoring', 'pharma_diagnostics', 'AI'],
  },
  'HOLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Diagnostics',
    tags: ['womens_health', 'mammography', 'molecular_diagnostics', 'surgical'],
  },

  // ========================================================
  // 工业设备 (Industrials - Missing S&P 500)
  // ========================================================
  'URI': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Equipment Rental',
    tags: ['construction', 'industrial', 'specialty', 'fleet', 'largest_US'],
  },
  'SWK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tools & Industrial',
    tags: ['DeWalt', 'Stanley', 'Craftsman', 'power_tools', 'storage'],
  },
  'IR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial Machinery',
    tags: ['compressors', 'pumps', 'fluid_management', 'precision_tech'],
  },
  'DOV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Industrial',
    tags: ['pumps', 'printing', 'fueling', 'refrigeration', 'polymer'],
  },
  'XYL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Technology',
    tags: ['water_infrastructure', 'analytics', 'treatment', 'smart_meters'],
  },
  'OTIS': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['elevators', 'escalators', 'service', 'modernization', 'IoT'],
  },
  'CARR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HVAC & Refrigeration',
    tags: ['HVAC', 'refrigeration', 'fire_safety', 'building_automation'],
  },

  // ========================================================
  // 消费品 (Consumer - Missing S&P 500)
  // ========================================================
  'DECK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Footwear',
    tags: ['UGG', 'HOKA', 'Teva', 'performance', 'lifestyle'],
  },

  // ========================================================
  // 公用事业 (Utilities - Missing S&P 500)
  // ========================================================
  'AES': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Independent Power Producer',
    tags: ['renewable', 'energy_storage', 'LNG', 'global', 'clean_energy'],
  },
  'WEC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'Wisconsin', 'regulated', 'renewable_transition'],
  },
  'ES': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'New_England', 'transmission', 'offshore_wind'],
  },
  'ED': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'steam', 'New_York_City', 'ConEdison'],
  },
  'D': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'Virginia', 'regulated', 'offshore_wind'],
  },
  'DTE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'Michigan', 'midstream', 'clean_energy'],
  },
  'AEE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'Missouri', 'Illinois', 'Ameren', 'regulated'],
  },
  'CMS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'Michigan', 'Consumers_Energy', 'renewable'],
  },

  // ========================================================
  // 生物科技REIT (Life Science REIT - Missing S&P 500)
  // ========================================================
  'ARE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Science REIT',
    tags: ['lab_space', 'biotech_clusters', 'R&D_campus', 'Alexandria'],
  },

  // ========================================================
  // 工业/建筑补充 (Industrial/Building Additions)
  // ========================================================
  'HRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Equipment Rental',
    tags: ['aerial', 'earthmoving', 'specialty', 'construction'],
  },
  'WTS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Technology',
    tags: ['pumps', 'valves', 'water_quality', 'flow_control'],
  },
  'TT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['HVAC', 'transport_refrigeration', 'Thermo_King', 'Trane'],
  },
  'LII': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['HVAC', 'residential', 'commercial', 'refrigeration'],
  },
  'GGG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['fluid_handling', 'spray_technology', 'contractor', 'process'],
  },
  'ROP': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['niche_software', 'industrial_tech', 'water', 'measurement'],
  },

  // ---------- 补充: 医疗健康 (Healthcare) ----------
  'ALGN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Large MedTech',
    tags: ['dental', 'invisalign', 'clear_aligners', 'orthodontics', 'itero'],
  },
  'PODD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Large MedTech',
    tags: ['insulin_pump', 'diabetes', 'omnipod', 'tubeless', 'wearable'],
  },
  'TECH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['proteins', 'reagents', 'diagnostics', 'bioactive', 'instruments'],
  },

  // ---------- 补充: 金融服务 (Financial Services) ----------
  'MKTX': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['fixed_income', 'electronic_trading', 'bonds', 'credit'],
  },

  // ---------- 补充: 科技 (Technology) ----------
  'PTC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Design Software',
    tags: ['cad', 'plm', 'iot', 'augmented_reality', 'windchill'],
  },
  'MANH': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['supply_chain', 'warehouse', 'omnichannel', 'inventory'],
  },
  'PAYC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['hcm', 'payroll', 'hr', 'talent_management', 'single_database'],
  },

  // ---------- 补充: 消费/零售 (Consumer/Retail) ----------
  'FIVE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['dollar_store', 'value', 'teens', 'trend', 'discretionary'],
  },

  // ---------- 补充: 工业 (Industrials) ----------
  'NDSN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['precision_dispensing', 'adhesives', 'coatings', 'testing'],
  },
  'FTV': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['instrumentation', 'sensing', 'fluke', 'software', 'healthcare'],
  },
  'AME': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['electronic_instruments', 'electromechanical', 'aerospace', 'process'],
  },

  // ---------- 补充: 能源/材料 (Energy/Materials) ----------
  'OVV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'montney', 'uinta', 'multi_basin'],
  },
  'CTRA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['marcellus', 'permian', 'anadarko', 'natural_gas', 'oil'],
  },
  'RPM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Coatings',
    tags: ['sealants', 'waterproofing', 'roofing', 'rust_oleum', 'specialty'],
  },

  // ========================================================
  // 补充: 30 只重要 Russell 1000 成分股
  // ========================================================

  // ---------- 汽车后市场 ----------
  'CPRT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Auto Auction',
    tags: ['salvage', 'insurance', 'online_auction', 'global'],
  },

  // ---------- 医药包装/器械 ----------
  'WST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pharma Packaging',
    tags: ['drug_delivery', 'stoppers', 'seals', 'injectable'],
  },
  'STE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Sterilization',
    tags: ['sterilization', 'infection_prevention', 'surgical'],
  },

  // ---------- 生命科学工具 ----------
  'ILMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['genomics', 'sequencing', 'ngs', 'research'],
  },

  // ---------- 包装 ----------
  'SEE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flexible Packaging',
    tags: ['food_packaging', 'protective', 'cryovac', 'bubble_wrap'],
  },

  // ---------- 电力设备 ----------
  'GNRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Power Equipment',
    tags: ['generators', 'backup_power', 'residential', 'commercial'],
  },

  // ---------- 特种工业 ----------
  'IEX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['pumps', 'flow_control', 'metering', 'diversified'],
  },
  'RBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['motion_control', 'bearings', 'conveyors', 'power_transmission'],
  },
  'LECO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Welding Equipment',
    tags: ['welding', 'cutting', 'brazing', 'industrial'],
  },
  'TTC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Outdoor Equipment',
    tags: ['mowers', 'irrigation', 'landscaping', 'snow_removal'],
  },

  // ---------- 科技仪器/测试 ----------
  'TRMB': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Geospatial Tech',
    tags: ['gps', 'construction_tech', 'agriculture_tech', 'precision'],
  },
  'TDY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Test & Measurement',
    tags: ['imaging', 'instruments', 'sensors', 'defense_electronics'],
  },
  'ZBRA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Mobility',
    tags: ['barcode', 'rfid', 'mobile_computing', 'warehouse'],
  },
  'KEYS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Test & Measurement',
    tags: ['electronic_test', 'rf_test', '5g_test', 'oscilloscope'],
  },
  'GRMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Electronics',
    tags: ['gps', 'wearables', 'fitness', 'aviation', 'marine'],
  },

  // ---------- 半导体设备 ----------
  'BRKS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['automation', 'vacuum', 'cryogenics', 'contamination_control'],
  },
  'ACLS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['ion_implant', 'doping', 'high_energy', 'sic'],
  },

  // ---------- 金融数据/基础设施 ----------
  'FICO': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Data',
    tags: ['credit_scoring', 'analytics', 'decision_management', 'fraud'],
  },
  'BR': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Infrastructure',
    tags: ['proxy', 'investor_communication', 'trade_processing', 'fintech'],
  },
  'RJF': {
    assetModel: 'hybrid',
    revenueModels: ['transaction_fee', 'interest_income', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Brokerage',
    tags: ['wealth_management', 'investment_banking', 'advisory'],
  },
  'VIRT': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Market Making',
    tags: ['hft', 'liquidity', 'electronic_trading', 'etf_market_making'],
  },
  'TW': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Exchange',
    tags: ['fixed_income', 'electronic_trading', 'rates', 'credit'],
  },

  // ---------- 商业信息/SaaS ----------
  'CSGP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Real Estate Data',
    tags: ['costar', 'loopnet', 'apartments_com', 'property_data'],
  },
  'AZPN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Process Industry Software',
    tags: ['process_optimization', 'asset_management', 'chemicals', 'energy'],
  },

  // ---------- IT 服务 ----------
  'GLOB': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Consulting',
    tags: ['digital_transformation', 'ai', 'nearshore', 'latin_america'],
  },

  // ---------- 国防/政府 ----------
  'BAH': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense IT',
    tags: ['consulting', 'analytics', 'cyber', 'intelligence'],
  },
  'LDOS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense IT',
    tags: ['it_services', 'systems_integration', 'cyber', 'health_it'],
  },
  'AXON': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Law Enforcement Tech',
    tags: ['taser', 'body_camera', 'cloud_evidence', 'public_safety'],
  },

  // ---------- 金属/材料 ----------
  'ATI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Metals',
    tags: ['titanium', 'nickel_alloy', 'aerospace_alloy', 'jet_engine'],
  },

  // ---------- 工业分销 ----------
  'WCC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['electrical', 'communications', 'utility', 'data_center'],
  },

  // ========== 新增30只 (2026-01补充) ==========

  // ---------- 生物科技 (Biotech) ----------
  'BNTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Large Biotech',
    tags: ['mRNA', 'vaccine', 'oncology', 'immunology'],
  },
  'RARE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Emerging Biotech',
    tags: ['rare_disease', 'gene_therapy', 'hemophilia'],
  },
  'IONS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Emerging Biotech',
    tags: ['antisense', 'RNA', 'neurology', 'cardiology'],
  },

  // ---------- 诊断/基因组学 (Diagnostics & Genomics) ----------
  'EXAS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diagnostics',
    tags: ['cancer_screening', 'liquid_biopsy', 'cologuard', 'oncotype'],
  },
  'NTRA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diagnostics',
    tags: ['prenatal', 'genetic_testing', 'oncology', 'organ_transplant'],
  },
  'TXG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Science Tools',
    tags: ['single_cell', 'genomics', 'spatial_biology', 'sequencing'],
  },

  // ---------- 消费零售 (Consumer Retail) ----------
  'RVLV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Fashion Retail',
    tags: ['fashion', 'millennial', 'influencer', 'owned_brands'],
  },
  'CAVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['mediterranean', 'fast_casual', 'restaurant', 'growth'],
  },

  // ---------- 食品饮料 (Food & Beverage) ----------
  'BUD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Beer',
    tags: ['global_beer', 'brands', 'emerging_markets', 'distribution'],
  },

  // ---------- 博彩/娱乐 (Gaming & Entertainment) ----------
  'DKNG': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Gaming',
    tags: ['sports_betting', 'iGaming', 'DFS', 'mobile'],
  },
  'CZR': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & Resort',
    tags: ['casino', 'hotel', 'sports_betting', 'loyalty'],
  },
  'MGM': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & Resort',
    tags: ['casino', 'resort', 'convention', 'entertainment'],
  },
  'WYNN': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & Resort',
    tags: ['luxury_casino', 'macau', 'las_vegas', 'resort'],
  },
  'PENN': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & Resort',
    tags: ['regional_casino', 'sports_betting', 'ESPN_Bet'],
  },

  // ---------- 运输物流 (Transportation & Logistics) ----------
  'GXO': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Contract Logistics',
    tags: ['warehouse', 'ecommerce_fulfillment', 'automation', '3PL'],
  },
  'HUBG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Intermodal',
    tags: ['intermodal', 'trucking', 'drayage', 'dedicated'],
  },
  'WERN': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Truckload',
    tags: ['truckload', 'dedicated', 'logistics', 'temperature'],
  },

  // ---------- REITs (Real Estate) ----------
  'HST': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Hotel REIT',
    tags: ['luxury_hotel', 'resort', 'convention', 'urban'],
  },
  'PK': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Hotel REIT',
    tags: ['select_service', 'upscale', 'convention'],
  },
  'SLG': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['nyc', 'manhattan', 'office', 'mixed_use'],
  },
  'KIM': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['open_air', 'grocery_anchored', 'suburban', 'mixed_use'],
  },
  'CUBE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Self-Storage REIT',
    tags: ['self_storage', 'third_party_mgmt', 'suburban'],
  },

  // ---------- 地区银行 (Regional Banks) ----------
  'ZION': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Bank',
    tags: ['intermountain', 'commercial', 'SBA', 'CRE'],
  },
  'NTRS': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Trust Bank',
    tags: ['custody', 'wealth_management', 'institutional', 'asset_servicing'],
  },
  'CMA': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Bank',
    tags: ['commercial', 'texas', 'california', 'energy_lending'],
  },

  // ---------- 太阳能 (Solar) ----------
  'NOVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Solar Installer',
    tags: ['residential_solar', 'storage', 'rooftop', 'financing'],
  },
  'ARRY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Equipment',
    tags: ['solar_tracker', 'utility_scale', 'ground_mount'],
  },
  'SPWR': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Solar Installer',
    tags: ['residential_solar', 'panels', 'storage', 'complete_system'],
  },

  // ---------- 建材 (Building Products) ----------
  'TREX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['composite_decking', 'railing', 'outdoor_living', 'recycled'],
  },
  'MAS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Building Products',
    tags: ['faucets', 'cabinets', 'plumbing', 'renovation'],
  },

  // ========================================================
  // 2026-01 新增30只 (Cybersecurity/Cloud/SaaS)
  // ========================================================

  // ---------- 网络安全 (Cybersecurity) ----------
  'CYBR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['identity', 'privileged_access', 'secrets_management', 'zero_trust'],
  },
  'TENB': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['vulnerability_management', 'exposure', 'cloud_security'],
  },
  'QLYS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['vulnerability', 'compliance', 'cloud_security', 'web_app'],
  },
  'VRNS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['data_security', 'insider_threat', 'data_governance'],
  },
  'RPD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['threat_detection', 'incident_response', 'siem', 'xdr'],
  },

  // ---------- HCM/Payroll SaaS ----------
  'PCTY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HCM SaaS',
    tags: ['payroll', 'hr', 'talent_management', 'mid_market'],
  },

  // ---------- CPaaS/通信 ----------
  'TWLO': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CPaaS',
    tags: ['messaging', 'voice', 'video', 'api', 'customer_engagement'],
  },

  // ---------- 企业SaaS (Enterprise SaaS) ----------
  'IOT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IoT Platform',
    tags: ['fleet', 'telematics', 'sensors', 'operations', 'connected'],
  },
  'CFLT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Infrastructure',
    tags: ['data_streaming', 'kafka', 'real_time', 'event_driven'],
  },
  'DT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Observability',
    tags: ['apm', 'infrastructure_monitoring', 'ai_ops', 'log_analytics'],
  },
  'GTLB': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'DevOps',
    tags: ['devsecops', 'ci_cd', 'source_control', 'security_scanning'],
  },
  'TOST': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Restaurant Tech',
    tags: ['pos', 'payments', 'restaurant', 'ordering', 'fintech'],
  },

  // ========================================================
  // 2026-01 新增 (Healthcare Services)
  // ========================================================

  // ---------- 透析服务 (Dialysis) ----------
  'DVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Dialysis',
    tags: ['kidney', 'dialysis_centers', 'chronic_care', 'renal'],
  },

  // ---------- 护理/康复 (Nursing/Rehab) ----------
  'ENSG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Skilled Nursing',
    tags: ['skilled_nursing', 'rehab', 'senior_care', 'post_acute'],
  },

  // ---------- 行为健康 (Behavioral Health) ----------
  'ACHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Behavioral Health',
    tags: ['psychiatric', 'addiction', 'eating_disorders', 'inpatient'],
  },

  // ---------- 医生网络 (Physician Network) ----------
  'DOCS': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Health Tech',
    tags: ['physician_network', 'pharma_marketing', 'telehealth', 'medical'],
  },

  // ---------- 门诊手术 (Ambulatory Surgery) ----------
  'SGRY': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Ambulatory Surgery',
    tags: ['surgery_centers', 'outpatient', 'orthopedic', 'multi_specialty'],
  },

  // ---------- 居家护理 (Home Health) ----------
  'AMED': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Health',
    tags: ['home_health', 'hospice', 'personal_care', 'aging_in_place'],
  },

  // ========================================================
  // 2026-01 新增 (Materials/Mining)
  // ========================================================

  // ---------- 铀矿 (Uranium) ----------
  'CCJ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium Mining',
    tags: ['uranium', 'nuclear_fuel', 'mining', 'enrichment'],
  },

  // ---------- 稀土 (Rare Earth) ----------
  'MP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rare Earth Mining',
    tags: ['rare_earth', 'magnets', 'ev', 'mining', 'defense'],
  },

  // ========================================================
  // 2026-01 新增 (Aerospace/Defense)
  // ========================================================

  // ---------- 无人机/防务科技 (Defense Tech) ----------
  'KTOS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense Tech',
    tags: ['drones', 'unmanned', 'hypersonic', 'satellite', 'tactical'],
  },

  // ---------- 核技术/国防 (Nuclear Defense) ----------
  'BWXT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Nuclear Defense',
    tags: ['nuclear_propulsion', 'reactors', 'navy', 'medical_isotopes'],
  },

  // ---------- 太空发射 (Space Launch) ----------
  'RKLB': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Space Launch',
    tags: ['rockets', 'small_sat', 'space', 'satellite_bus', 'electron'],
  },

  // ========================================================
  // 2026-01 新增 (Consumer/Retail)
  // ========================================================

  // ---------- 汽车/工业配件分销 (Auto/Industrial Parts) ----------
  'GPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Auto Parts Distribution',
    tags: ['napa', 'aftermarket', 'industrial_parts', 'motion'],
  },

  // ---------- 乡村零售 (Farm/Rural Retail) ----------
  'TSCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Farm & Rural Retail',
    tags: ['farm', 'ranch', 'pet', 'rural', 'outdoor'],
  },

  // ========================================================
  // 2026-01 新增 (Food/Agriculture)
  // ========================================================

  // ---------- 动物副产品/可再生能源 (Rendering) ----------
  'DAR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rendering & Renewable',
    tags: ['rendering', 'renewable_diesel', 'animal_fats', 'circular_economy'],
  },

  // ---------- 鸡蛋生产 (Egg Production) ----------
  'CALM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Egg Production',
    tags: ['eggs', 'shell_eggs', 'specialty_eggs', 'poultry'],
  },

  // ---------- 消费食品品牌 (Consumer Food) ----------
  'POST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Packaged Food',
    tags: ['cereal', 'protein', 'pet_food', 'refrigerated'],
  },

  // ---------- 烘焙 (Bakery) ----------
  'FLO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Bakery',
    tags: ['bread', 'buns', 'snack_cakes', 'dsd'],
  },

  // ---------- 天然有机超市 (Natural Grocery) ----------
  'SFM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Grocery',
    tags: ['organic', 'natural', 'fresh', 'health_conscious'],
  },

  // ========================================================
  // 补充: 30 只重要股票 (2026-01 第四批)
  // ========================================================

  // ---------- 天然气E&P (Natural Gas E&P) ----------
  'EQT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['appalachian', 'marcellus', 'utica', 'largest_us_natgas'],
  },
  'RRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['appalachian', 'marcellus', 'ngl', 'dry_gas'],
  },
  'AR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['appalachian', 'marcellus', 'utica', 'ngl', 'midstream_integration'],
  },
  'SWN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['appalachian', 'haynesville', 'dry_gas'],
  },

  // ---------- Permian E&P ----------
  'MTDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'delaware_basin', 'oil', 'midstream'],
  },
  'PR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'delaware_basin', 'oil', 'growth'],
  },
  'MGY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['giddings', 'eagle_ford', 'austin_chalk', 'low_leverage'],
  },

  // ---------- Specialty Pharma/Biotech ----------
  'JAZZ': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Pharma',
    tags: ['sleep', 'neuroscience', 'oncology', 'narcolepsy', 'xywav'],
  },
  'UTHR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Pharma',
    tags: ['pulmonary_hypertension', 'tyvaso', 'organ_manufacturing', 'rare_disease'],
  },
  'NBIX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Pharma',
    tags: ['movement_disorders', 'neuroscience', 'ingrezza', 'psychiatry'],
  },
  'PCVX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Emerging Biotech',
    tags: ['vaccines', 'pneumococcal', 'pipeline', 'clinical_stage'],
  },

  // ---------- Electrical/Industrial Equipment ----------
  'HUBB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electrical Equipment',
    tags: ['utility_solutions', 'electrical_products', 'grid', 'transmission'],
  },
  'FIX': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&C Contractor',
    tags: ['hvac', 'mechanical', 'electrical', 'building_services'],
  },
  'AIT': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['bearings', 'power_transmission', 'fluid_power', 'automation'],
  },
  'ALLE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['locks', 'security', 'access_control', 'schlage', 'commercial'],
  },
  'WLK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commodity Chemicals',
    tags: ['pvc', 'polyethylene', 'chlor_alkali', 'building_products', 'vinyls'],
  },

  // ---------- Specialty Services ----------
  'SCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Death Care',
    tags: ['funeral', 'cemetery', 'preneed', 'cremation', 'consolidator'],
  },

  // ---------- REITs ----------
  'IRM': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty REIT',
    tags: ['data_center', 'records_management', 'information_destruction', 'digital'],
  },
  'LAMR': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advertising REIT',
    tags: ['outdoor', 'billboard', 'digital_display', 'highway', 'transit'],
  },
  'OUT': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advertising REIT',
    tags: ['outdoor', 'billboard', 'transit', 'digital', 'urban'],
  },
  'CPT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['apartment', 'sunbelt', 'multifamily', 'class_a'],
  },
  'AMH': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Residential REIT',
    tags: ['single_family_rental', 'sunbelt', 'build_to_rent', 'suburban'],
  },
  'REG': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['grocery_anchored', 'neighborhood_center', 'essential_retail'],
  },
  'FR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['logistics', 'warehouse', 'infill', 'last_mile', 'coastal'],
  },
  'PEAK': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['life_science', 'medical_office', 'senior_housing', 'lab_space'],
  },

  // ---------- Fleet Leasing/Logistics ----------
  'R': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Truck Leasing',
    tags: ['fleet_management', 'truck_leasing', 'logistics', 'maintenance', 'used_trucks'],
  },

  // ---------- Specialty Retail ----------
  'JWN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Department Store',
    tags: ['upscale', 'nordstrom_rack', 'fashion', 'off_price', 'ecommerce'],
  },
  'BOOT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['western', 'work_wear', 'boots', 'rural', 'lifestyle'],
  },
  'BURL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Off-Price Retail',
    tags: ['off_price', 'apparel', 'home', 'value', 'treasure_hunt'],
  },

  // ========================================================
  // 新增30只股票 - 消费/医疗/金融科技/工业/材料/媒体
  // ========================================================

  // ---------- Packaged Foods ----------
  'MKC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Packaged Foods',
    tags: ['spices', 'seasonings', 'flavor', 'staples', 'grocery'],
  },

  // ---------- Healthcare ----------
  'MOH': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2G',
    industrySegment: 'Managed Care',
    tags: ['medicaid', 'managed_care', 'government', 'health_insurance', 'low_income'],
  },
  'BAX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['renal', 'IV_therapy', 'surgical', 'hospital_products', 'infusion'],
  },

  // ---------- Specialty Industrial ----------
  'SNA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['professional_tools', 'diagnostics', 'repair', 'mobile_distribution'],
  },

  // ---------- REITs ----------
  'WPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['diversified', 'net_lease', 'triple_net', 'industrial', 'retail'],
  },

  // ---------- Utilities ----------
  'SRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['natural_gas', 'electric', 'infrastructure', 'LNG', 'california'],
  },

  // ---------- Social/Dating Platform ----------
  'MTCH': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Platform',
    tags: ['dating', 'tinder', 'hinge', 'matchmaking', 'subscription'],
  },

  // ---------- Cloud/Internet Infrastructure ----------
  'GDDY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cloud Infrastructure',
    tags: ['domain', 'web_hosting', 'SMB', 'website_builder', 'commerce'],
  },
  'AKAM': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud Infrastructure',
    tags: ['CDN', 'edge_computing', 'security', 'web_performance', 'DDoS'],
  },

  // ---------- Consumer Cybersecurity ----------
  'GEN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Cybersecurity',
    tags: ['norton', 'avast', 'antivirus', 'VPN', 'identity_protection'],
  },

  // ---------- Enterprise SaaS (RPA) ----------
  'PATH': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['RPA', 'automation', 'AI', 'workflow', 'process_mining'],
  },

  // ---------- Building Products ----------
  'AOS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Building Products',
    tags: ['water_heater', 'water_treatment', 'boiler', 'residential', 'commercial'],
  },

  // ---------- Trucking/Logistics ----------
  'LSTR': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Truckload',
    tags: ['asset_light', 'owner_operator', 'brokerage', 'agent_model'],
  },
  'RXO': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: '3PL',
    tags: ['truck_brokerage', 'last_mile', 'managed_transportation', 'logistics'],
  },

  // ---------- Asset Management ----------
  'SEIC': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['investment_management', 'technology_platform', 'wealth', 'outsourcing'],
  },

  // ---------- Packaging ----------
  'SON': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['industrial_packaging', 'consumer_packaging', 'paper', 'plastics', 'metal'],
  },
  'BLL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['aluminum_cans', 'beverage_packaging', 'sustainability', 'recycling'],
  },

  // ---------- Aggregates/Cement ----------
  'EXP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aggregates',
    tags: ['gypsum', 'wallboard', 'cement', 'concrete', 'construction'],
  },

  // ---------- Live Entertainment ----------
  'LYV': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Live Entertainment',
    tags: ['concerts', 'ticketmaster', 'venues', 'festivals', 'events'],
  },

  // ---------- HCM/Payroll SaaS ----------
  'PAYX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HCM SaaS',
    tags: ['payroll', 'HR', 'SMB', 'benefits', 'compliance'],
  },

  // ---------- FinTech SaaS ----------
  'JKHY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'FinTech SaaS',
    tags: ['core_banking', 'community_bank', 'credit_union', 'digital_banking'],
  },

  // ---------- Payment Processing ----------
  'WEX': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['fleet_cards', 'fuel_cards', 'corporate_payments', 'benefits', 'travel'],
  },

  // ---------- Farm Equipment ----------
  'CNH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Farm Equipment',
    tags: ['tractors', 'harvesting', 'construction', 'case_IH', 'new_holland'],
  },

  // ---------- Building Systems (HVAC) ----------
  'JCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['HVAC', 'fire_safety', 'building_automation', 'smart_building', 'controls'],
  },
  'AAON': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['commercial_HVAC', 'rooftop_units', 'custom', 'energy_efficient'],
  },

  // ---------- Semiconductors ----------
  'CRUS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Analog Semis',
    tags: ['audio_IC', 'haptics', 'apple_supplier', 'mixed_signal', 'codec'],
  },
  'MTSI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'RF Semiconductor',
    tags: ['RF', 'microwave', 'photonics', '5G', 'defense_electronics'],
  },

  // ---------- Digital Media ----------
  'NYT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Media',
    tags: ['news', 'journalism', 'digital_subscription', 'podcasts', 'games'],
  },

  // ---------- Fast Casual ----------
  'SHAK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['burgers', 'shakes', 'urban', 'premium_QSR', 'fast_casual'],
  },

  // ---------- P&C Insurance ----------
  'ERIE': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'P&C Insurance',
    tags: ['property', 'casualty', 'auto', 'homeowners', 'independent_agents'],
  },

  // ========================================================
  // 第六批: 餐饮/REIT/SaaS/保险/建材/国防/化工
  // ========================================================

  // ---------- Fast Casual / Casual Dining ----------
  'TXRH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['steakhouse', 'casual_dining', 'family', 'value_steak'],
  },
  'EAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['chilis', 'maggianos', 'casual_dining', 'value'],
  },
  'PLAY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Live Entertainment',
    tags: ['entertainment_dining', 'arcade', 'games', 'events', 'experience'],
  },

  // ---------- Apartment REIT ----------
  'ESS': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Apartment REIT',
    tags: ['west_coast', 'multifamily', 'apartments', 'urban'],
  },
  'UDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Apartment REIT',
    tags: ['multifamily', 'apartments', 'diversified_markets'],
  },

  // ---------- Specialty REIT ----------
  'SUI': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty REIT',
    tags: ['manufactured_housing', 'rv_parks', 'marinas', 'sun_belt'],
  },

  // ---------- Enterprise SaaS ----------
  'APPN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['low_code', 'automation', 'process_mining', 'enterprise_apps'],
  },
  'BRZE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['customer_engagement', 'marketing_automation', 'messaging', 'personalization'],
  },
  'ZI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['b2b_data', 'sales_intelligence', 'lead_generation', 'intent_data'],
  },
  'ESTC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['search', 'observability', 'security', 'elasticsearch', 'open_source'],
  },

  // ---------- Cloud Infrastructure ----------
  'DOCN': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud Infrastructure',
    tags: ['cloud', 'developers', 'smb', 'droplets', 'kubernetes'],
  },

  // ---------- High-Speed Interconnect ----------
  'CRDO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'High-Speed Interconnect',
    tags: ['serdes', 'pcie', 'ethernet', 'data_center', 'optical'],
  },

  // ---------- P&C Insurance / Reinsurance ----------
  'WRB': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['specialty', 'commercial_lines', 'excess_surplus', 'property_casualty'],
  },
  'RNR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Reinsurance',
    tags: ['reinsurance', 'catastrophe', 'property', 'specialty'],
  },
  'ACGL': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Reinsurance',
    tags: ['reinsurance', 'insurance', 'mortgage', 'specialty'],
  },
  'AFG': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['specialty', 'property_casualty', 'annuities', 'niche_markets'],
  },

  // ---------- Building Products Distribution ----------
  'GMS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products Distribution',
    tags: ['wallboard', 'ceilings', 'steel_framing', 'distribution'],
  },
  'BECN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products Distribution',
    tags: ['roofing', 'waterproofing', 'exterior', 'distribution'],
  },

  // ---------- Home Improvement ----------
  'FND': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Improvement',
    tags: ['flooring', 'tile', 'stone', 'warehouse', 'pro_contractor'],
  },

  // ---------- Building Products ----------
  'AWI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['ceilings', 'walls', 'acoustics', 'commercial', 'renovation'],
  },

  // ---------- Diagnostics ----------
  'DGX': {
    assetModel: 'asset_heavy',
    revenueModels: ['consumables', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diagnostics',
    tags: ['lab_testing', 'clinical', 'routine', 'employer_testing'],
  },
  'LH': {
    assetModel: 'asset_heavy',
    revenueModels: ['consumables', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diagnostics',
    tags: ['lab_testing', 'drug_development', 'clinical_trials', 'CRO'],
  },

  // ---------- Defense IT ----------
  'SAIC': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense IT',
    tags: ['govt_IT', 'defense', 'intelligence', 'systems_integration'],
  },
  'CACI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense IT',
    tags: ['defense', 'intelligence', 'cybersecurity', 'signals', 'C4ISR'],
  },

  // ---------- Analog Semis / Electronic Components ----------
  'DIOD': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Analog Semis',
    tags: ['discrete', 'analog', 'connectivity', 'automotive', 'industrial'],
  },
  'VSH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electronic Components',
    tags: ['resistors', 'capacitors', 'inductors', 'discretes', 'mosfets'],
  },

  // ---------- Specialty Chemicals ----------
  'AVNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['polymers', 'colorants', 'additives', 'sustainable_solutions'],
  },
  'OLN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['chlor_alkali', 'epoxy', 'ammunition', 'winchester'],
  },

  // ---------- Food Distribution ----------
  'PFGC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food Distribution',
    tags: ['foodservice', 'restaurants', 'convenience', 'distribution'],
  },

  // ---------- Subprime Auto ----------
  'CACC': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Subprime Auto',
    tags: ['subprime', 'auto_loans', 'dealer_finance', 'credit'],
  },

  // ---------- Convenience Store ----------
  'CASY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Convenience Store',
    tags: ['convenience', 'gas_station', 'pizza', 'prepared_food', 'rural'],
  },

  // ---------- Home Furnishings ----------
  'TPX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Home Furnishings',
    tags: ['mattress', 'bedding', 'sleep', 'premium', 'retail'],
  },

  // ---------- Furniture Components ----------
  'LEG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Furniture Components',
    tags: ['springs', 'foam', 'bedding_components', 'industrial'],
  },

  // ---------- Fast Casual (Donut) ----------
  'DNUT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['donut', 'bakery', 'franchise', 'retail', 'snack'],
  },

  // ---------- Net Lease REIT ----------
  'EPRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['net_lease', 'single_tenant', 'reit', 'essential_properties'],
  },
  'ADC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['net_lease', 'retail_reit', 'investment_grade', 'triple_net'],
  },

  // ---------- Cold Storage REIT ----------
  'COLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cold Storage REIT',
    tags: ['cold_chain', 'warehousing', 'food_storage', 'temperature_controlled'],
  },

  // ---------- Regional Bank (Growth/Specialty) ----------
  'WAL': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['growth_bank', 'technology_banking', 'mortgage_warehouse'],
  },
  'EWBC': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['asian_focus', 'cross_border', 'trade_finance', 'community'],
  },
  'ONB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['midwest', 'community_bank', 'commercial_lending', 'wealth'],
  },
  'PNFP': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['southeast', 'growth_bank', 'commercial_banking', 'advisory'],
  },
  'OZK': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Bank',
    tags: ['construction_lending', 'cre', 'specialty_finance'],
  },
  'FNB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['mid_atlantic', 'community_bank', 'commercial', 'wealth'],
  },

  // ---------- Diagnostics ----------
  'GH': {
    assetModel: 'asset_light',
    revenueModels: ['consumables', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diagnostics',
    tags: ['liquid_biopsy', 'genomics', 'oncology', 'precision_medicine'],
  },

  // ---------- Medical Devices ----------
  'TFX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['specialty_devices', 'vascular', 'urology', 'interventional'],
  },

  // ---------- Dental Equipment ----------
  'XRAY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dental Equipment',
    tags: ['dental', 'imaging', 'cad_cam', 'implants', 'orthodontics'],
  },
  'NVST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dental Equipment',
    tags: ['dental', 'implants', 'orthodontics', 'imaging', 'equipment'],
  },

  // ---------- Nat Gas Midstream ----------
  'DTM': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nat Gas Midstream',
    tags: ['pipeline', 'gathering', 'natural_gas', 'storage', 'transportation'],
  },
  'AM': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nat Gas Midstream',
    tags: ['gathering', 'processing', 'water_handling', 'appalachian'],
  },
  'WES': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nat Gas Midstream',
    tags: ['gas_processing', 'gathering', 'transportation', 'rockies'],
  },

  // ---------- Oil Refinery ----------
  'DINO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Oil Refinery',
    tags: ['refining', 'renewables', 'lubricants', 'fuel', 'biodiesel'],
  },

  // ---------- Payment Processing ----------
  'FOUR': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['integrated_payments', 'pos', 'gateway', 'stadiums', 'hospitality'],
  },
  'RPAY': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['b2b_payments', 'healthcare', 'auto_lending', 'ap_solutions'],
  },

  // ---------- Water Technology ----------
  'FELE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Technology',
    tags: ['pumping_systems', 'water', 'fueling', 'distribution'],
  },

  // ---------- Defense Electronics ----------
  'CW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense Electronics',
    tags: ['defense', 'nuclear', 'naval', 'industrial', 'sensors'],
  },

  // ---------- Building Products ----------
  'HAYW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Building Products',
    tags: ['pool', 'outdoor_living', 'water_treatment', 'automation'],
  },

  // ---------- Satellite Communications ----------
  'IRDM': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Satellite Communications',
    tags: ['satellite', 'iot', 'voice', 'data', 'global_coverage', 'leo'],
  },

  // ---------- Soft Drinks ----------
  'COKE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Soft Drinks',
    tags: ['bottler', 'distribution', 'coca_cola', 'beverages'],
  },

  // ---------- Pet Products ----------
  'FRPT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Pet Products',
    tags: ['fresh_pet_food', 'refrigerated', 'premium', 'natural'],
  },

  // ---------- Industrial REIT ----------
  'EGP': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['sunbelt', 'industrial', 'logistics', 'warehouse', 'development'],
  },

  // ---------- Discount Retail ----------
  'OLLI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Discount Retail',
    tags: ['closeout', 'bargain', 'treasure_hunt', 'off_price', 'value'],
  },

  // ---------- CRO ----------
  'MEDP': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CRO',
    tags: ['mid_size_biotech', 'clinical_trials', 'full_service', 'oncology'],
  },
  'ICLR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CRO',
    tags: ['global', 'clinical_trials', 'pharma', 'biotech', 'regulatory'],
  },

  // ---------- Social Platform ----------
  'BMBL': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Platform',
    tags: ['dating', 'bumble', 'badoo', 'women_first', 'social'],
  },
  'GRND': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Platform',
    tags: ['dating', 'lgbtq', 'social', 'community', 'location_based'],
  },

  // ---------- Specialty Industrial ----------
  'NOVT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['photonics', 'precision_motion', 'medical', 'industrial_automation'],
  },

  // ---------- Semiconductor Equipment ----------
  'COHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Equipment',
    tags: ['optical', 'laser', 'silicon_carbide', 'datacom', 'telecom'],
  },

  // ---------- Real Estate Services ----------
  'CWK': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Real Estate Services',
    tags: ['commercial', 'leasing', 'property_management', 'valuation'],
  },

  // ---------- P&C Insurance ----------
  'KNSL': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['e_and_s', 'specialty', 'excess_surplus', 'underwriting'],
  },

  // ---------- Insurance Broker ----------
  'RYAN': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Broker',
    tags: ['wholesale', 'specialty', 'mgus', 'binding_authority'],
  },

  // ---------- Offshore Driller ----------
  'RIG': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Driller',
    tags: ['deepwater', 'ultra_deepwater', 'drillship', 'semi_submersible'],
  },
  'VAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Driller',
    tags: ['deepwater', 'jackup', 'drillship', 'offshore'],
  },

  // ---------- Oil Services ----------
  'NBR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil Services',
    tags: ['drilling', 'land_rigs', 'international', 'rig_technologies'],
  },

  // ---------- Building Products ----------
  'DOOR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['doors', 'interior', 'exterior', 'residential', 'commercial'],
  },
  'JELD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['windows', 'doors', 'residential', 'commercial', 'global'],
  },

  // ---------- Spirits ----------
  'BF.B': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Spirits',
    tags: ['jack_daniels', 'whiskey', 'bourbon', 'premium', 'aged'],
  },

  // ---------- Cloud Infrastructure ----------
  'NTNX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud Infrastructure',
    tags: ['hybrid_cloud', 'hci', 'multicloud', 'enterprise', 'storage'],
  },

  // ---------- SMB Software ----------
  'WIX': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'SMB Software',
    tags: ['website_builder', 'smb', 'ecommerce', 'drag_drop', 'saas'],
  },
  'SQSP': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'SMB Software',
    tags: ['website_builder', 'commerce', 'design', 'domains', 'saas'],
  },

  // ---------- Toys & Games ----------
  'HAS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Toys & Games',
    tags: ['toys', 'games', 'hasbro', 'wizards', 'transformers', 'entertainment'],
  },
  'MAT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Toys & Games',
    tags: ['barbie', 'hot_wheels', 'fisher_price', 'toys', 'dolls'],
  },

  // ---------- Athletic Footwear ----------
  'CROX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Footwear',
    tags: ['casual', 'clogs', 'crocs', 'heydude', 'comfort', 'foam'],
  },
  'ONON': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Footwear',
    tags: ['running', 'performance', 'swiss', 'cloudtec', 'premium'],
  },

  // ---------- E&P ----------
  'CHRD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&P',
    tags: ['bakken', 'shale', 'oil', 'williston_basin', 'upstream'],
  },

  // ---------- Regional Bank ----------
  'FBP': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['puerto_rico', 'caribbean', 'commercial', 'retail_banking'],
  },

  // ---------- Digital Media ----------
  'IAC': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Media',
    tags: ['dotdash_meredith', 'publishing', 'internet', 'content', 'brands'],
  },

  // ---------- AdTech DSP ----------
  'YELP': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'AdTech DSP',
    tags: ['local', 'reviews', 'smb_advertising', 'restaurants', 'services'],
  },

  // ---------- Online Real Estate ----------
  'OPEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Real Estate',
    tags: ['ibuying', 'instant_offers', 'residential', 'proptech', 'marketplace'],
  },

  // ---------- Space Systems ----------
  'LUNR': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Space Systems',
    tags: ['lunar_lander', 'nasa', 'moon', 'payload', 'space_infrastructure'],
  },

  // ---------- Satellite Communications ----------
  'ASTS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Satellite Communications',
    tags: ['direct_to_cell', 'satellite', 'space', 'mobile', 'broadband'],
  },

  // ========================================================
  // 新增30只: advisory banks, office REITs, E&P, DTC brands, consulting
  // ========================================================

  // ---------- Athletic Footwear ----------
  'SKX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Athletic Footwear',
    tags: ['comfort', 'walking', 'casual', 'lifestyle', 'performance'],
  },

  // ---------- Enterprise SaaS ----------
  'ASAN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['work_management', 'project', 'collaboration', 'workflow', 'productivity'],
  },
  'BOX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['cloud_content', 'collaboration', 'file_sharing', 'security', 'governance'],
  },

  // ---------- Building Products ----------
  'WMS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['stormwater', 'drainage', 'pipe', 'water_management', 'infrastructure'],
  },

  // ---------- Electrical Equipment ----------
  'ATKR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electrical Equipment',
    tags: ['conduit', 'raceway', 'cable_management', 'electrical', 'construction'],
  },
  'WIRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electrical Equipment',
    tags: ['copper_wire', 'cable', 'building_wire', 'residential', 'commercial'],
  },

  // ---------- Building Systems ----------
  'SPXC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Systems',
    tags: ['HVAC', 'detection', 'cooling', 'boilers', 'specialty'],
  },

  // ---------- Health Insurance ----------
  'OSCR': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Health Insurance Tech',
    tags: ['tech_insurance', 'individual', 'marketplace', 'digital', 'telehealth'],
  },

  // ---------- Investment Bank ----------
  'LAZ': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['advisory', 'M&A', 'restructuring', 'asset_management', 'global'],
  },
  'PIPR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['mid_market', 'advisory', 'equity_research', 'healthcare', 'technology'],
  },
  'EVR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['elite_advisory', 'M&A', 'restructuring', 'shareholder_activism', 'independent'],
  },
  'HLI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['restructuring', 'M&A', 'valuation', 'financial_opinions', 'mid_market'],
  },
  'PJT': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Bank',
    tags: ['strategic_advisory', 'restructuring', 'capital_markets', 'independent'],
  },

  // ---------- E&P ----------
  'SM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&P',
    tags: ['permian', 'eagle_ford', 'oil', 'shale', 'midland_basin'],
  },
  'NOG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&P',
    tags: ['non_operated', 'williston', 'permian', 'appalachian', 'diversified'],
  },

  // ---------- Office REIT ----------
  'KRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['west_coast', 'tech_tenants', 'life_science', 'san_francisco', 'seattle'],
  },
  'DEI': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['los_angeles', 'office', 'multifamily', 'westside', 'entertainment'],
  },
  'HIW': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['sunbelt', 'office', 'bbd', 'charlotte', 'raleigh', 'nashville'],
  },

  // ---------- Asset Management ----------
  'VRTS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['multi_boutique', 'mutual_funds', 'alternatives', 'institutional'],
  },

  // ---------- Alternative Asset Management ----------
  'STEP': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'transaction_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Management',
    tags: ['private_markets', 'secondaries', 'co_investment', 'advisory', 'fund_of_funds'],
  },

  // ---------- Airline ----------
  'ALGT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Airline',
    tags: ['ulcc', 'leisure', 'small_city', 'sunbelt', 'ancillary_revenue'],
  },

  // ---------- Medical Devices ----------
  'INMD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['aesthetics', 'minimally_invasive', 'body_contouring', 'RF', 'laser'],
  },

  // ---------- Biotech Platform ----------
  'HALO': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech Platform',
    tags: ['drug_delivery', 'ENHANZE', 'subcutaneous', 'licensing', 'royalties'],
  },

  // ---------- Building Products Distribution ----------
  'SITE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products Distribution',
    tags: ['landscaping', 'nursery', 'hardscapes', 'irrigation', 'outdoor_living'],
  },

  // ---------- Consulting ----------
  'EXPO': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Consulting',
    tags: ['engineering', 'science', 'litigation', 'regulatory', 'failure_analysis'],
  },

  // ---------- Specialty E-commerce ----------
  'WRBY': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty E-commerce',
    tags: ['eyewear', 'DTC', 'optical', 'prescription', 'affordable'],
  },
  'FIGS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty E-commerce',
    tags: ['medical_scrubs', 'DTC', 'healthcare_apparel', 'premium', 'community'],
  },

  // ---------- Fast Casual ----------
  'BROS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual',
    tags: ['coffee', 'drive_thru', 'loyalty', 'west_coast', 'expansion'],
  },

  // ---------- Small Pharma ----------
  'ACAD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Small Pharma',
    tags: ['CNS', 'psychiatry', 'neuroscience', 'pimavanserin', 'specialty'],
  },

  // ---------- Specialty Retail ----------
  'DBI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['footwear', 'DSW', 'shoes', 'accessories', 'value'],
  },

  // ========== 新增50家公司 (达到1000家) ==========

  // ---------- Regional Banks ----------
  'NYCB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['multifamily', 'CRE', 'northeast', 'thrift', 'deposits'],
  },
  'VLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['new_jersey', 'commercial', 'CRE', 'SBA', 'mid_atlantic'],
  },
  'FHN': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['tennessee', 'southeast', 'commercial', 'wealth', 'fixed_income'],
  },
  'SNV': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['georgia', 'southeast', 'commercial', 'community', 'treasury'],
  },
  'HWC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['gulf_south', 'mississippi', 'commercial', 'energy_lending'],
  },
  'WBS': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['connecticut', 'northeast', 'commercial', 'HSA', 'healthcare_finance'],
  },
  'COLB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['pacific_northwest', 'washington', 'community', 'small_business'],
  },

  // ---------- Tech/SaaS ----------
  'SMAR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['work_management', 'collaboration', 'project_planning', 'automation'],
  },
  'MQ': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'FinTech SaaS',
    tags: ['card_issuing', 'modern_payments', 'API', 'fintech_infrastructure'],
  },
  'DSGX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['logistics', 'supply_chain', 'customs', 'compliance', 'routing'],
  },
  'TWKS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['consulting', 'digital_transformation', 'agile', 'software_development'],
  },
  'CERT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CRO',
    tags: ['biosimulation', 'regulatory', 'drug_development', 'modeling', 'pharma_tech'],
  },
  'FLT': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['fleet_cards', 'corporate_payments', 'lodging', 'tolls', 'Corpay'],
  },

  // ---------- Consumer/Retail ----------
  'ELF': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Mass Beauty',
    tags: ['affordable', 'cosmetics', 'skincare', 'gen_z', 'cruelty_free'],
  },
  'BBWI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['personal_care', 'fragrance', 'candles', 'home', 'bath'],
  },
  'DDS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['department_store', 'apparel', 'cosmetics', 'home', 'southeast'],
  },
  'GOOS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Luxury Apparel',
    tags: ['outerwear', 'parka', 'premium', 'canada', 'winter', 'DTC'],
  },
  'SMPL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Packaged Foods',
    tags: ['nutrition', 'protein_bars', 'atkins', 'quest', 'snacking'],
  },
  'NWSA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Media',
    tags: ['news', 'publishing', 'WSJ', 'real_estate_data', 'Dow_Jones'],
  },
  'TRUP': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'P&C Insurance',
    tags: ['pet_insurance', 'veterinary', 'subscription', 'pet_health'],
  },

  // ---------- Entertainment/Sports ----------
  'TKO': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Live Entertainment',
    tags: ['UFC', 'WWE', 'combat_sports', 'media_rights', 'events'],
  },
  'EDR': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Live Entertainment',
    tags: ['talent_agency', 'sports', 'entertainment', 'IMG', 'WME'],
  },
  'SIX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Theme Parks',
    tags: ['amusement_parks', 'roller_coasters', 'seasonal', 'memberships'],
  },
  'SEAS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Theme Parks',
    tags: ['marine_parks', 'animal_encounters', 'rides', 'seasonal', 'memberships'],
  },

  // ---------- REITs ----------
  'FRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['premium_retail', 'mixed_use', 'urban', 'coastal', 'high_income'],
  },
  'BRX': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['open_air', 'grocery_anchored', 'suburban', 'value_add'],
  },
  'NSA': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Self-Storage REIT',
    tags: ['self_storage', 'PRO_program', 'sunbelt', 'acquisitions'],
  },

  // ---------- Insurance/Mortgage ----------
  'ESNT': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['private_MI', 'GSE', 'low_down_payment', 'credit_risk'],
  },
  'NMIH': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['private_MI', 'first_time_buyers', 'GSE', 'underwriting'],
  },
  'RDN': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['private_MI', 'title', 'real_estate_services', 'GSE'],
  },
  'MTG': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['private_MI', 'GSE', 'legacy_book', 'credit_risk'],
  },
  'SLM': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Consumer Finance',
    tags: ['student_loans', 'private_lending', 'education', 'savings'],
  },

  // ---------- Waste/Environment ----------
  'GFL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Waste Management',
    tags: ['collection', 'landfill', 'recycling', 'canada', 'acquisitions'],
  },
  'SRCL': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Services',
    tags: ['medical_waste', 'sharps', 'compliance', 'healthcare', 'regulated'],
  },

  // ---------- Biotech/Pharma ----------
  'LEGN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Large Biotech',
    tags: ['cell_therapy', 'BCMA', 'CAR_T', 'oncology', 'J&J_partner'],
  },
  'BCRX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Small Pharma',
    tags: ['rare_disease', 'HAE', 'orladeyo', 'oral_therapy', 'complement'],
  },
  'BEAM': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech Platform',
    tags: ['base_editing', 'gene_therapy', 'sickle_cell', 'precision_medicine'],
  },
  'FOLD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Small Pharma',
    tags: ['Fabry_disease', 'lysosomal', 'rare_disease', 'enzyme_replacement'],
  },
  'ARVN': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech Platform',
    tags: ['protein_degradation', 'PROTAC', 'oncology', 'targeted_therapy'],
  },
  'KURA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Small Pharma',
    tags: ['oncology', 'menin_inhibitor', 'AML', 'leukemia', 'pipeline'],
  },
  'IMVT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Small Pharma',
    tags: ['FcRn', 'antibody', 'autoimmune', 'immunology', 'Roivant'],
  },

  // ---------- Industrials ----------
  'CSWI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['HVAC', 'plumbing', 'sealants', 'coatings', 'niche_industrial'],
  },
  'RRX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['power_transmission', 'motors', 'bearings', 'automation', 'Rexnord'],
  },
  'ESE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['utility', 'test_measurement', 'RF_shielding', 'filtration'],
  },
  'MWA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Technology',
    tags: ['water_infrastructure', 'valves', 'hydrants', 'pipe_repair', 'municipal'],
  },
  'LNN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Farm Equipment',
    tags: ['irrigation', 'center_pivot', 'infrastructure', 'road_safety', 'Zimmatic'],
  },
  'FSS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['safety', 'street_sweeper', 'sewer_cleaner', 'dump_truck', 'municipal'],
  },

  // ---------- Energy ----------
  'TALO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&P',
    tags: ['gulf_of_mexico', 'deepwater', 'offshore', 'oil', 'carbon_capture'],
  },
  'CRK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['haynesville', 'natural_gas', 'shale', 'LNG_exposure', 'dry_gas'],
  },
  'SD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E&P',
    tags: ['mid_continent', 'oil', 'shallow', 'low_decline', 'royalties'],
  },

  // ---------- 补充6家达到1000家 ----------
  'SFNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['arkansas', 'mid_south', 'community', 'wealth', 'insurance'],
  },
  'SBCF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['florida', 'southeast', 'community', 'commercial', 'wealth'],
  },
  'FFIN': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['texas', 'community', 'conservative', 'organic_growth'],
  },
  'AX': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['digital', 'online_banking', 'commercial', 'securities_lending'],
  },
  'CALX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['broadband', 'fiber', 'access_platforms', 'telecom_equipment'],
  },
  'IESC': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial',
    tags: ['electrical', 'mechanical', 'data_center', 'infrastructure', 'contracting'],
  },

  // ========== 追加企业 (2026-01-24) ==========
  'ADBE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Creative Software',
    tags: ['creative_cloud', 'pdf', 'design', 'video', 'marketing_cloud'],
  },
  'BRK.B': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'product_sales', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diversified Conglomerate',
    tags: ['insurance', 'railroad', 'energy', 'consumer', 'investments'],
  },
  'MARA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin', 'mining', 'blockchain', 'compute'],
  },

  // ========== 追加50只股票 (2026-01-24) ==========
  // --- S&P 500 Remaining ---
  'MTD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Instruments',
    tags: ['lab_instruments', 'precision_balance', 'analytics', 'quality_control'],
  },
  'GL': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance',
    tags: ['life_insurance', 'supplemental', 'annuities', 'direct_to_consumer'],
  },
  'CINF': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'P&C Insurance',
    tags: ['property_casualty', 'commercial_insurance', 'independent_agents'],
  },
  'CNP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'regulated', 'texas', 'distribution'],
  },
  'EVRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'regulated', 'midwest', 'generation'],
  },
  'FE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'regulated', 'transmission', 'distribution'],
  },
  'LNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'regulated', 'iowa', 'wisconsin'],
  },
  'NI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'regulated', 'distribution', 'pipeline'],
  },
  'PNW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'regulated', 'arizona', 'generation'],
  },
  'PPL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'regulated', 'pennsylvania', 'kentucky', 'distribution'],
  },

  // --- Mid-cap Industrials ---
  'LFUS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electronic Components',
    tags: ['fuses', 'sensors', 'protection', 'automotive', 'industrial'],
  },

  // --- Mid-cap Tech ---
  'PCOR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Construction Software',
    tags: ['construction', 'project_management', 'saas', 'field_operations'],
  },
  'MNDY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Work Management SaaS',
    tags: ['work_os', 'project_management', 'collaboration', 'no_code'],
  },
  'GLBE': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Cross-border Commerce',
    tags: ['cross_border', 'ecommerce', 'localization', 'payments'],
  },

  // --- Consumer/Retail ---
  'WOOF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pet Retail',
    tags: ['pet_food', 'pet_supplies', 'grooming', 'veterinary', 'retail'],
  },

  // --- Healthcare ---
  'GDRX': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Pharma Tech',
    tags: ['prescription_savings', 'pharmacy', 'price_comparison', 'telehealth'],
  },
  'RPRX': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pharma Royalties',
    tags: ['royalties', 'pharma', 'biotech', 'drug_development'],
  },

  // ========== S&P 400 Midcap 追加 (30 stocks) ==========

  // ---------- Regional Banks ----------
  'BANR': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['pacific_northwest', 'washington', 'community', 'agricultural'],
  },
  'CUBI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['pennsylvania', 'digital', 'commercial', 'fintech_lending'],
  },
  'NBTB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['new_york', 'northeast', 'community', 'wealth_management'],
  },
  'CBSH': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['missouri', 'midwest', 'commercial', 'trust_services'],
  },

  // ---------- Insurance ----------
  'RLI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Insurance',
    tags: ['property_casualty', 'niche_lines', 'specialty', 'underwriting'],
  },
  'PLMR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Insurance',
    tags: ['earthquake', 'catastrophe', 'specialty', 'technology_driven'],
  },
  'ROOT': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Insurtech',
    tags: ['auto_insurance', 'telematics', 'mobile_first', 'usage_based'],
  },
  'LMND': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Insurtech',
    tags: ['renters', 'homeowners', 'AI_claims', 'digital_first'],
  },
  'KMPR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Insurance',
    tags: ['auto', 'personal_lines', 'preferred', 'specialty_auto'],
  },

  // ---------- Specialty Industrial ----------
  'ROCK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['steel_framing', 'ventilation', 'solar_racking', 'infrastructure'],
  },

  // ---------- Tech/SaaS ----------
  'ALRM': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Smart Home',
    tags: ['smart_home', 'security', 'IoT', 'connected_devices'],
  },
  'ARLO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Smart Home Camera',
    tags: ['security_camera', 'smart_home', 'cloud', 'subscription'],
  },
  'RAMP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Infrastructure',
    tags: ['data_connectivity', 'identity', 'privacy', 'marketing_data'],
  },
  'PYCR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HCM SaaS',
    tags: ['payroll', 'HR', 'workforce_management', 'SMB'],
  },
  'CWAN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Software',
    tags: ['investment_accounting', 'analytics', 'portfolio', 'asset_managers'],
  },
  'NCNO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Banking Software',
    tags: ['bank_operating_system', 'loan_origination', 'cloud', 'digital_banking'],
  },
  'JAMF': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Endpoint Management',
    tags: ['apple', 'device_management', 'MDM', 'enterprise_mobility'],
  },

  // ---------- Consumer/Restaurant ----------
  'JACK': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'rental'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Quick Service Restaurant',
    tags: ['burgers', 'drive_through', 'west_coast', 'late_night'],
  },
  'CAKE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casual Dining',
    tags: ['full_service', 'diverse_menu', 'upscale_casual', 'cheesecake'],
  },
  'DINE': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'rental'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurant Franchisor',
    tags: ['applebees', 'ihop', 'franchise', 'family_dining'],
  },

  // ---------- Healthcare ----------
  'NVAX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vaccine Manufacturer',
    tags: ['protein_subunit', 'COVID', 'influenza', 'adjuvant'],
  },
  'GKOS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmic Devices',
    tags: ['glaucoma', 'MIGS', 'corneal', 'ophthalmic_surgery'],
  },
  'INSP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Sleep Therapy Devices',
    tags: ['sleep_apnea', 'hypoglossal', 'implantable', 'neurostimulation'],
  },

  // ---------- Energy ----------
  'STEM': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Battery Storage',
    tags: ['energy_storage', 'AI_optimization', 'solar_plus_storage', 'grid'],
  },
  'FLNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Battery Storage',
    tags: ['utility_scale', 'BESS', 'grid_storage', 'digital_platform'],
  },
  'ORA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Geothermal Energy',
    tags: ['geothermal', 'baseload', 'renewable', 'recovered_energy'],
  },

  // ---------- Materials ----------
  'CMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel Recycler',
    tags: ['rebar', 'recycled_steel', 'construction', 'EAF'],
  },
  'ASPN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advanced Materials',
    tags: ['aerogel', 'insulation', 'EV_battery', 'thermal_barrier'],
  },

  // ---------- REITs ----------
  'IIPR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty REIT',
    tags: ['cannabis', 'industrial', 'sale_leaseback', 'triple_net'],
  },

  // ---------- Transportation ----------
  'SNDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'TL Trucking',
    tags: ['truckload', 'intermodal', 'logistics', 'dedicated'],
  },

  // ---------- Specialty Metals ----------
  'HAYN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Metals',
    tags: ['nickel_alloy', 'cobalt_alloy', 'high_temperature', 'corrosion_resistant', 'aerospace'],
  },

  // ---------- Gas Utility ----------
  'SW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'distribution', 'regulated', 'utility', 'pipeline'],
  },

  // ========================================================
  // AdTech/Digital
  // ========================================================
  'PUBM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AdTech DSP',
    tags: ['programmatic', 'digital_advertising', 'supply_side', 'platform'],
  },
  'RSI': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Online Gaming',
    tags: ['igaming', 'sports_betting', 'casino', 'mobile'],
  },

  // ========================================================
  // Communications/Software
  // ========================================================
  'BAND': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CPaaS',
    tags: ['voice', 'messaging', 'api', 'communications_platform'],
  },
  'PAR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Restaurant Tech',
    tags: ['pos', 'payments', 'loyalty', 'restaurant_management'],
  },
  'FLYW': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Infrastructure',
    tags: ['payments', 'education', 'healthcare', 'cross_border'],
  },

  // ========================================================
  // Healthcare
  // ========================================================
  'USPH': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Outpatient Rehab',
    tags: ['physical_therapy', 'ambulatory', 'clinic_network', 'rehabilitation'],
  },
  'NEO': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Diagnostics',
    tags: ['genomics', 'oncology', 'testing', 'biomarkers'],
  },
  'AZTA': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Science Tools',
    tags: ['biorepository', 'sample_management', 'genomics_services', 'automation'],
  },
  'BIO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Science Tools',
    tags: ['clinical_diagnostics', 'life_science_research', 'reagents', 'instruments'],
  },

  // ========================================================
  // Materials/Mining
  // ========================================================
  'TROX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commodity Chemicals',
    tags: ['titanium_dioxide', 'pigment', 'mining', 'vertical_integration'],
  },
  'CC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commodity Chemicals',
    tags: ['titanium_dioxide', 'fluoroproducts', 'chemical_solutions', 'specialty'],
  },
  'SMID': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cement/Precast Concrete',
    tags: ['precast', 'concrete', 'infrastructure', 'sound_walls', 'barriers'],
  },
  'UEC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium Mining',
    tags: ['uranium', 'nuclear', 'isr_mining', 'exploration'],
  },
  'DNN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium Mining',
    tags: ['uranium', 'nuclear', 'exploration', 'athabasca_basin'],
  },
  'MAXN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Manufacturing',
    tags: ['solar_panels', 'photovoltaic', 'shingled_cells', 'residential_solar'],
  },

  // ========================================================
  // Energy
  // ========================================================
  'SLDP': {
    assetModel: 'asset_heavy',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'EV Battery',
    tags: ['solid_state', 'battery', 'ev', 'next_gen', 'licensing'],
  },
  'RIOT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin', 'mining', 'data_center', 'blockchain', 'energy_intensive'],
  },
  'CLSK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin', 'mining', 'renewable_energy', 'blockchain', 'sustainable'],
  },

  // ========================================================
  // Consumer/Retail
  // ========================================================
  'COLM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Outdoor Apparel',
    tags: ['outdoor', 'sportswear', 'wholesale', 'dtc', 'columbia', 'sorel', 'prana'],
  },
  'ACI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Grocery',
    tags: ['grocery', 'supermarket', 'pharmacy', 'fresh_food', 'private_label'],
  },
  'GO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Specialty Grocery',
    tags: ['discount', 'grocery', 'opportunistic', 'closeout', 'value'],
  },
  'PLCE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Basics Apparel',
    tags: ['children', 'value', 'basics', 'mall', 'ecommerce'],
  },
  'GIII': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Basics Apparel',
    tags: ['licensed_brands', 'outerwear', 'wholesale', 'dkny', 'karl_lagerfeld'],
  },
  'LOVE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Furnishings',
    tags: ['modular', 'furniture', 'dtc', 'showroom', 'sactional'],
  },
  'ARHS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Furnishings',
    tags: ['premium', 'furniture', 'showroom', 'artisan', 'handcrafted'],
  },
  'MUSA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Convenience Store',
    tags: ['fuel', 'convenience', 'tobacco', 'snacks', 'walmart_adjacent'],
  },
  'PZZA': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Quick Service Restaurant',
    tags: ['pizza', 'delivery', 'franchise', 'digital_ordering'],
  },
  'BLMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casual Dining',
    tags: ['outback', 'steakhouse', 'casual', 'bar_grill', 'carrabba'],
  },
  'JJSF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Bakery/Snacks',
    tags: ['pretzels', 'frozen', 'food_service', 'retail', 'stadium'],
  },
  'SNBR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Furniture/Mattress',
    tags: ['smart_bed', 'sleep_technology', 'dtc', 'adjustable', 'biometric'],
  },
  'FIZZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Soft Drinks',
    tags: ['lacroix', 'sparkling_water', 'flavored', 'health_conscious'],
  },
  'IRBT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Smart Home',
    tags: ['robot_vacuum', 'roomba', 'home_automation', 'iot'],
  },

  // ========================================================
  // Transport/Logistics
  // ========================================================
  'HTLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'TL Trucking',
    tags: ['truckload', 'dry_van', 'dedicated', 'refrigerated'],
  },
  'GATX': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Truck/Railcar Leasing',
    tags: ['railcar', 'leasing', 'fleet_management', 'tank_cars'],
  },
  'CSV': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Death Care',
    tags: ['funeral', 'cemetery', 'cremation', 'preneed', 'memorial'],
  },

  // ========================================================
  // Specialty Vehicles
  // ========================================================
  'REVG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Vehicles',
    tags: ['fire_trucks', 'ambulance', 'bus', 'recreation', 'specialty'],
  },

  // ========================================================
  // Industrials
  // ========================================================
  'THS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food Ingredients/Private Label',
    tags: ['private_label', 'snacks', 'beverages', 'meals', 'co_manufacturing'],
  },
  'BERY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flexible Packaging',
    tags: ['plastic', 'film', 'containers', 'consumer_packaging', 'healthcare_packaging'],
  },
  'HURN': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Professional Services',
    tags: ['consulting', 'healthcare', 'education', 'digital', 'strategy'],
  },
  'ICF': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Professional Services',
    tags: ['government', 'consulting', 'technology', 'environment', 'defense'],
  },

  // ========================================================
  // Semiconductors/Electronics
  // ========================================================
  'LITE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'High-Speed Interconnect',
    tags: ['optical', 'photonics', 'telecom', 'datacom', '3d_sensing'],
  },
  'VIAV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'High-Speed Interconnect',
    tags: ['network_test', 'optical', 'anti_counterfeiting', 'fiber_optics'],
  },

  // ========================================================
  // Outdoor Equipment
  // ========================================================
  'YETI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Outdoor Equipment',
    tags: ['coolers', 'drinkware', 'outdoor', 'premium', 'lifestyle'],
  },
  'CLAR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Outdoor Equipment',
    tags: ['black_diamond', 'sierra', 'rhino_rack', 'climbing', 'adventure'],
  },

  // ========================================================
  // 追加企业 (2026-01-24 batch 2) - 28只新股票
  // ========================================================

  // ---------- Water Utilities ----------
  'WTRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Water Utility',
    tags: ['regulated', 'water', 'wastewater', 'natural_gas', 'essential'],
  },
  'CWT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Water Utility',
    tags: ['regulated', 'water', 'california', 'municipal'],
  },
  'SJW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Water Utility',
    tags: ['regulated', 'water', 'west_coast', 'municipal'],
  },

  // ---------- Consumer/Retail ----------
  'SHOO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Fashion Footwear',
    tags: ['fashion', 'footwear', 'accessories', 'wholesale', 'DTC'],
  },
  'FAT': {
    assetModel: 'hybrid',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurant Franchisor',
    tags: ['multi_brand', 'franchise', 'fatburger', 'johnny_rockets', 'twin_peaks'],
  },
  'DENN': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurant Franchisor',
    tags: ['family_dining', 'breakfast', 'franchise', 'dennys', '24hr'],
  },
  'SKY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Manufactured Housing',
    tags: ['modular', 'manufactured_home', 'affordable', 'champion'],
  },
  'EXPI': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Real Estate Services',
    tags: ['cloud_brokerage', 'agent_platform', 'virtual', 'residential'],
  },
  'PNTG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Skilled Nursing',
    tags: ['senior_living', 'skilled_nursing', 'home_health', 'hospice'],
  },
  // ---------- Homebuilders ----------
  'GRBK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['single_family', 'texas', 'land_development', 'move_up'],
  },
  'CCS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['entry_level', 'single_family', 'affordable', 'century_complete'],
  },
  'MHO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['single_family', 'midwest', 'southeast', 'smart_series'],
  },
  'LGIH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['entry_level', 'affordable', 'bulk_sales', 'move_in_ready'],
  },

  // ---------- Energy/Materials ----------
  'CVI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Refining',
    tags: ['refining', 'nitrogen_fertilizer', 'midcontinent', 'CVR_partners'],
  },
  'ZEUS': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel Distribution',
    tags: ['service_center', 'flat_rolled', 'pipe_tube', 'processing'],
  },
  'RES': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil Services',
    tags: ['pressure_pumping', 'coiled_tubing', 'cementing', 'downhole'],
  },
  'PUMP': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil Services',
    tags: ['frac_services', 'pressure_pumping', 'permian', 'completions'],
  },
  'AMR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Metallurgical Coal',
    tags: ['met_coal', 'steelmaking', 'export', 'appalachia'],
  },

  // ---------- Building Products ----------
  'IBP': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['insulation', 'installation', 'residential', 'commercial', 'gutters'],
  },

  // ---------- Technology/Software ----------
  'ACIW': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Software',
    tags: ['payments', 'real_time', 'banking', 'merchant', 'fraud'],
  },
  'CGNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Machine Vision',
    tags: ['machine_vision', 'barcode', 'inspection', 'automation', 'precision'],
  },
  'PD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'DevOps Software',
    tags: ['incident_management', 'on_call', 'AIOps', 'automation', 'SRE'],
  },
  'PRGS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Software',
    tags: ['application_platform', 'data_connectivity', 'chef', 'devops'],
  },

  // ---------- Other ----------
  'SLGN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Packaging',
    tags: ['food_packaging', 'metal_containers', 'closures', 'pharma_packaging'],
  },
  'TDW': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Marine Services',
    tags: ['OSV', 'offshore', 'deepwater', 'vessel_fleet', 'subsea_support'],
  },
  'CRAI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Management Consulting',
    tags: ['litigation', 'expert_witness', 'strategy', 'forensic', 'regulatory'],
  },
  'LNTH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nuclear Imaging',
    tags: ['radiopharmaceuticals', 'PET_imaging', 'DEFINITY', 'PYLARIFY', 'diagnostics'],
  },

  // ========================================================
  // S&P 600 Small-Cap Additions
  // ========================================================

  // --- Healthcare/MedTech ---
  'OMCL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pharmacy Automation',
    tags: ['pharmacy', 'automation', 'medication_management', 'hospital', 'dispensing'],
  },
  'NVCR': {
    assetModel: 'asset_light',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cancer Treatment Devices',
    tags: ['TTFields', 'oncology', 'glioblastoma', 'tumor_treating', 'electrotherapy'],
  },
  'PRCT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Surgical Robotics',
    tags: ['robotic_surgery', 'urology', 'BPH', 'AQUABEAM', 'minimally_invasive'],
  },
  'IRTC': {
    assetModel: 'asset_light',
    revenueModels: ['consumables', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiac Monitoring',
    tags: ['arrhythmia', 'ECG', 'Zio', 'wearable', 'remote_monitoring'],
  },
  'TNDM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Insulin Pump Devices',
    tags: ['diabetes', 'insulin_pump', 't:slim', 'closed_loop', 'CGM_integration'],
  },

  // --- Semiconductors/Tech ---
  'POWI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Semiconductor',
    tags: ['power_conversion', 'AC-DC', 'energy_efficiency', 'GaN', 'EcoSmart'],
  },
  'AMBA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Video Processing Chip',
    tags: ['video_processing', 'AI_vision', 'SoC', 'security_camera', 'automotive_vision'],
  },
  'CEVA': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chip IP Licensing',
    tags: ['IP_licensing', 'DSP', 'connectivity', 'Bluetooth', 'WiFi', 'sensor_fusion'],
  },
  'RMBS': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Memory Interface IP',
    tags: ['memory_interface', 'DDR', 'security', 'SerDes', 'patent_licensing'],
  },
  'PI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'RFID Solutions',
    tags: ['RFID', 'RAIN', 'IoT', 'inventory', 'item_intelligence', 'retail_tracking'],
  },

  // --- Industrials ---
  'ESAB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Welding & Cutting Equipment',
    tags: ['welding', 'cutting', 'fabrication', 'consumables', 'gas_control'],
  },
  'SPSC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Supply Chain SaaS',
    tags: ['EDI', 'supply_chain', 'retail_network', 'fulfillment', 'analytics'],
  },
  'NVRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Services',
    tags: ['waste_management', 'clean_earth', 'recycling', 'rail_services', 'industrial'],
  },
  'SKYW': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Airline',
    tags: ['regional_airline', 'contract_flying', 'CRJ', 'ERJ', 'code_share'],
  },

  // --- Consumer/Restaurant ---
  'BJRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casual Dining',
    tags: ['casual_dining', 'pizza', 'craft_beer', 'family', 'full_service'],
  },
  'KRUS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual Japanese',
    tags: ['sushi', 'revolving_bar', 'japanese', 'fast_casual', 'tech_dining'],
  },
  'LOCO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Quick Service Restaurant',
    tags: ['chicken', 'QSR', 'Mexican_inspired', 'drive_through', 'value'],
  },
  'PRDO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'For-Profit Education',
    tags: ['online_education', 'career_training', 'degree_programs', 'adult_learners'],
  },

  // --- Regional Banks ---
  'GBCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'Montana', 'mountain_west', 'commercial_lending'],
  },
  'TOWN': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'Virginia', 'insurance', 'wealth_management'],
  },
  'HOPE': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'Korean_American', 'California', 'SBA_lending'],
  },
  'OFG': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'Puerto_Rico', 'Caribbean', 'auto_lending'],
  },
  'UMBF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['commercial_bank', 'fund_services', 'healthcare_banking', 'institutional'],
  },
  'ABCB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'Southeast', 'mortgage', 'commercial_lending'],
  },

  // --- Energy ---
  'REPX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['Permian', 'oil', 'shale', 'exploration', 'production'],
  },
  'CIVI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['DJ_Basin', 'Permian', 'oil', 'natural_gas', 'acquisition'],
  },
  'HLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Subsea Services',
    tags: ['subsea', 'well_intervention', 'robotics', 'decommissioning', 'offshore'],
  },
  'ARCH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Metallurgical Coal',
    tags: ['met_coal', 'coking_coal', 'steelmaking', 'thermal_coal', 'Appalachian'],
  },

  // ========================================================
  // S&P 600 / Russell 2000 Small-Cap Additions
  // ========================================================

  // ---------- Consumer/Retail ----------
  'SCVL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Footwear Retail',
    tags: ['footwear', 'family', 'value', 'back_to_school'],
  },
  'LESL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pool Supplies Retail',
    tags: ['pool', 'maintenance', 'seasonal', 'chemicals'],
  },
  'PLNT': {
    assetModel: 'hybrid',
    revenueModels: ['licensing', 'subscription'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Fitness Franchise',
    tags: ['gym', 'affordable', 'judgement_free', 'franchise'],
  },
  'XPOF': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'subscription'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Boutique Fitness',
    tags: ['boutique', 'pilates', 'cycling', 'yoga', 'franchise'],
  },
  'EYE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Eyewear Retail',
    tags: ['eyewear', 'vision_care', 'optical', 'exam'],
  },

  // ---------- Biotech ----------
  'MDGL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['NASH', 'liver', 'thyroid_receptor', 'resmetirom'],
  },
  'KRYS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy',
    tags: ['gene_therapy', 'dermatology', 'rare_disease', 'topical'],
  },

  // ---------- Industrial Equipment ----------
  'POWL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Distribution Equipment',
    tags: ['switchgear', 'power_distribution', 'industrial', 'utility'],
  },
  'MIDD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Kitchen Equipment',
    tags: ['commercial_kitchen', 'cooking', 'food_processing', 'beverage'],
  },
  'EPAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Hydraulic Tools',
    tags: ['hydraulic', 'tools', 'industrial', 'heavy_lifting'],
  },

  // ---------- Specialty Finance ----------
  'TREE': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Online Lending Marketplace',
    tags: ['lending', 'mortgage', 'insurance', 'comparison'],
  },
  'WRLD': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Finance',
    tags: ['subprime', 'personal_loans', 'installment', 'underserved'],
  },
  'EZPW': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pawn/Consumer Finance',
    tags: ['pawn', 'buy_sell', 'short_term_lending', 'collateral'],
  },

  // ---------- Regional Banks ----------
  'FCNCA': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['southeast', 'commercial', 'SVB_acquisition', 'large_regional'],
  },
  'IBOC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['texas', 'border', 'international', 'trade'],
  },
  'CADE': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['southeast', 'commercial', 'community', 'mississippi'],
  },

  // ---------- Transportation ----------
  'ARCB': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LTL Trucking',
    tags: ['LTL', 'asset_based', 'managed_transportation', 'ABF_Freight'],
  },
  'MRTN': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Temperature-Controlled Trucking',
    tags: ['refrigerated', 'temperature_controlled', 'food', 'perishable'],
  },
  'FWRD': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Expedited Freight',
    tags: ['expedited', 'LTL', 'intermodal', 'final_mile'],
  },

  // ---------- REITs ----------
  'TRNO': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial REIT',
    tags: ['industrial', 'infill', 'coastal', 'logistics'],
  },

  // ---------- Specialty Chemicals ----------
  'HWKN': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemical Distribution',
    tags: ['chemical_distribution', 'water_treatment', 'industrial'],
  },
  'KWR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Fluids',
    tags: ['metalworking', 'lubricants', 'process_fluids', 'steel'],
  },
  'IOSP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['fuel_additives', 'personal_care', 'oilfield', 'specialty'],
  },
  'CBT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Carbon Black',
    tags: ['carbon_black', 'rubber', 'tire', 'specialty_compounds'],
  },
  'BCPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Ingredients',
    tags: ['nutrition', 'minerals', 'flavors', 'animal_health'],
  },

  // ========================================================
  // 保险/博彩 (Insurance/Gaming)
  // ========================================================

  'HCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Homeowners Insurance',
    tags: ['property_insurance', 'florida', 'catastrophe'],
  },
  'GDEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino/Tavern Gaming',
    tags: ['casino', 'tavern', 'gaming', 'food_beverage'],
  },
  'RRR': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino',
    tags: ['casino', 'resort', 'locals_gaming', 'las_vegas'],
  },
  'CHDN': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Horse Racing/Gaming',
    tags: ['horse_racing', 'gaming', 'twinspires', 'historical_racing'],
  },

  // ========================================================
  // 广告科技/营销 (AdTech/Marketing)
  // ========================================================

  'IAS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ad Verification',
    tags: ['ad_verification', 'brand_safety', 'viewability', 'fraud_detection'],
  },
  'ZETA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Marketing Data Platform',
    tags: ['data_platform', 'marketing_automation', 'cdp', 'ai_marketing'],
  },
  'CARG': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Auto Marketplace',
    tags: ['auto_marketplace', 'car_shopping', 'dealer_listings', 'digital_retail'],
  },

  // ========================================================
  // 房车/汽车 (Auto/RV)
  // ========================================================

  'LCII': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'RV Components',
    tags: ['rv_components', 'chassis', 'windows', 'doors'],
  },
  'WGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'RV Manufacturing',
    tags: ['motorhome', 'towable', 'marine', 'rv_manufacturing'],
  },
  'CWH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'RV Retail',
    tags: ['rv_dealer', 'parts', 'service', 'accessories'],
  },
  'FOXF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Performance Suspension',
    tags: ['suspension', 'shocks', 'off_road', 'performance'],
  },
  'MPAA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Parts Remanufacturing',
    tags: ['remanufacturing', 'alternators', 'starters', 'brake_calipers'],
  },

  // ========================================================
  // 汽车配件 (Auto Parts)
  // ========================================================

  'LKQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Auto Parts',
    tags: ['aftermarket', 'recycled', 'salvage', 'collision_repair'],
  },

  // ========================================================
  // 食品/饮料 (Food/Beverage)
  // ========================================================

  'JBSS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Nut Processing',
    tags: ['nuts', 'snacks', 'private_label', 'branded'],
  },
  'BGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Packaged Foods',
    tags: ['shelf_stable', 'frozen', 'spices', 'branded_foods'],
  },
  'UTZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Salty Snacks',
    tags: ['chips', 'pretzels', 'snacks', 'dsd_distribution'],
  },
  'HAIN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Natural Foods',
    tags: ['organic', 'natural', 'health_foods', 'baby_food'],
  },

  // ========================================================
  // 医疗服务 (Healthcare Services)
  // ========================================================

  'CHE': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Hospice Care',
    tags: ['hospice', 'palliative', 'vitas', 'end_of_life'],
  },
  'NHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Long-term Care',
    tags: ['nursing_home', 'assisted_living', 'rehabilitation'],
  },
  'ADUS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Home Health Services',
    tags: ['home_care', 'personal_care', 'hospice', 'medicaid'],
  },

  // ========================================================
  // 房地产 (Real Estate)
  // ========================================================

  'NMRK': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial RE Services',
    tags: ['commercial_brokerage', 'capital_markets', 'leasing', 'valuation'],
  },
  'RMR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'REIT Management',
    tags: ['reit_management', 'property_management', 'advisory'],
  },
  'HHH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Master Planned Communities',
    tags: ['master_planned', 'mixed_use', 'land_development', 'seaport'],
  },

  // ========================================================
  // 教育 (Education)
  // ========================================================

  'LRN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online K-12',
    tags: ['virtual_school', 'k12', 'online_learning', 'curriculum'],
  },
  'ATGE': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Healthcare Education',
    tags: ['medical_school', 'nursing', 'healthcare_training', 'professional'],
  },

  // ========================================================
  // 人力资源 (Staffing)
  // ========================================================

  'KFRC': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Staffing/Workforce',
    tags: ['tech_staffing', 'finance_staffing', 'professional'],
  },
  'KELYA': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Staffing/Workforce',
    tags: ['workforce_solutions', 'outsourcing', 'temp_staffing'],
  },

  // ========================================================
  // 环保 (Environmental)
  // ========================================================

  'MEG': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Consulting',
    tags: ['environmental_testing', 'remediation', 'compliance', 'consulting'],
  },

  // ========================================================
  // SaaS
  // ========================================================

  'FRSH': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Customer Service SaaS',
    tags: ['helpdesk', 'crm', 'itsm', 'customer_engagement'],
  },

  // ========================================================
  // Cross-Market & Consumer Causality Gap-Fill
  // ========================================================

  'ADT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Security',
    tags: ['security', 'monitoring', 'smart_home', 'alarm', 'residential'],
  },
  'BFAM': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Childcare Services',
    tags: ['childcare', 'daycare', 'employer_sponsored', 'education', 'backup_care'],
  },
  'CNK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Movie Theater',
    tags: ['cinema', 'box_office', 'concessions', 'premium_format', 'IMAX'],
  },
  'DAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Container Shipping',
    tags: ['containership', 'charter', 'liner', 'global_trade', 'vessel_leasing'],
  },
  'ETD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Furnishing',
    tags: ['furniture', 'interior_design', 'premium', 'custom', 'showroom'],
  },
  'FBIN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Building Products',
    tags: ['plumbing', 'outdoor_living', 'security', 'Moen', 'Master_Lock'],
  },
  'FUN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Theme Parks',
    tags: ['amusement_park', 'roller_coaster', 'season_pass', 'Six_Flags', 'Cedar_Fair'],
  },
  'GRAB': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Super App',
    tags: ['rideshare', 'delivery', 'fintech', 'southeast_asia', 'GrabPay'],
  },
  'IMAX': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cinema Technology',
    tags: ['large_format', 'projection', 'immersive', 'premium_cinema', 'IMAX_Enhanced'],
  },
  'LOGI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Computer Peripherals',
    tags: ['mouse', 'keyboard', 'webcam', 'headset', 'video_conferencing'],
  },
  'LVMUY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Luxury Conglomerate',
    tags: ['Louis_Vuitton', 'Dior', 'Hennessy', 'Tiffany', 'luxury', 'fashion', 'wines_spirits'],
  },
  'LVS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & Resort',
    tags: ['casino', 'resort', 'Venetian', 'Marina_Bay_Sands', 'Macau', 'Singapore'],
  },
  'OLED': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Display Materials',
    tags: ['OLED', 'organic_materials', 'emitter', 'display', 'phosphorescent'],
  },
  'REZI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Comfort & Security',
    tags: ['HVAC', 'thermostat', 'security', 'air_distribution', 'Honeywell_spinoff'],
  },
  'SKIN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Aesthetics',
    tags: ['HydraFacial', 'skin_treatment', 'aesthetics', 'facial', 'consumable_tips'],
  },
  'TMHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Homebuilders',
    tags: ['homebuilding', 'single_family', 'entry_level', 'move_up', 'luxury_homes'],
  },
  'WHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Appliances',
    tags: ['appliances', 'Whirlpool', 'KitchenAid', 'Maytag', 'laundry', 'kitchen'],
  },
  'USNA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Health Supplements',
    tags: ['nutrition', 'supplements', 'direct_selling', 'vitamins', 'personal_care'],
  },
  'NUS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Health Supplements',
    tags: ['anti_aging', 'nutrition', 'direct_selling', 'ageLOC', 'beauty_devices'],
  },

  // ========================================================
  // 基因编辑/生物技术 (Gene Editing/Biotech)
  // ========================================================

  'TWST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Synthetic Biology Tools',
    tags: ['synthetic_biology', 'DNA_synthesis', 'gene_tools', 'biopharma'],
  },
  'CRSP': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Editing Therapy',
    tags: ['CRISPR', 'gene_editing', 'cell_therapy', 'rare_disease'],
  },
  'NTLA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'In Vivo Gene Editing',
    tags: ['in_vivo', 'gene_editing', 'CRISPR', 'liver_disease'],
  },
  'RXRX': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Drug Discovery',
    tags: ['AI', 'drug_discovery', 'machine_learning', 'biology_platform'],
  },

  // ========================================================
  // 清洁能源 (Clean Energy)
  // ========================================================

  'PLUG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Hydrogen Fuel Cells',
    tags: ['hydrogen', 'fuel_cell', 'electrolyzer', 'green_energy'],
  },

  // ========================================================
  // 金融科技 (FinTech)
  // ========================================================

  'UPST': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'AI Lending Platform',
    tags: ['AI_lending', 'credit_scoring', 'bank_partnership', 'fintech'],
  },
  'RELY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Remittance',
    tags: ['remittance', 'cross_border', 'mobile_money', 'immigrants'],
  },
  'PAYO': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cross-border Payments',
    tags: ['cross_border', 'payments', 'freelancer', 'marketplace_payout'],
  },

  // ========================================================
  // 软件/分析 (Software/Analytics)
  // ========================================================

  'VRNT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CX Analytics',
    tags: ['customer_experience', 'analytics', 'AI', 'workforce_engagement'],
  },
  'TYL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Government Software',
    tags: ['government', 'public_sector', 'ERP', 'courts', 'schools'],
  },
  'APPF': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Property Management SaaS',
    tags: ['property_management', 'real_estate', 'SaaS', 'landlord'],
  },

  // ========================================================
  // 银行/金融SaaS (Banking/Finance SaaS)
  // ========================================================

  'ALKT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Banking SaaS',
    tags: ['digital_banking', 'credit_union', 'community_bank', 'fintech'],
  },
  'HQY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'HSA Platform',
    tags: ['HSA', 'health_savings', 'benefits', 'investment'],
  },

  // ========================================================
  // 基础设施/建筑 (Infrastructure/Construction)
  // ========================================================

  'ASTE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Road Building Equipment',
    tags: ['road_equipment', 'asphalt', 'aggregate', 'paving'],
  },
  'ROAD': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Highway Construction',
    tags: ['road_construction', 'highway', 'asphalt', 'government'],
  },
  'PRIM': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Infrastructure Construction',
    tags: ['infrastructure', 'pipeline', 'utility', 'industrial'],
  },
  'STRL': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E-Infrastructure',
    tags: ['e_infrastructure', 'data_center', 'building', 'transportation'],
  },
  'TTEK': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Environmental Consulting',
    tags: ['environmental', 'water', 'infrastructure', 'consulting'],
  },
  'KNF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Construction Materials/Aggregates',
    tags: ['aggregates', 'ready_mix', 'asphalt', 'construction_materials'],
  },
  'APOG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Architectural Glass',
    tags: ['glass', 'building_envelope', 'curtain_wall', 'framing'],
  },
  'GLDD': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Marine Dredging',
    tags: ['dredging', 'marine_construction', 'coastal', 'government'],
  },

  // ========================================================
  // 材料/木材 (Materials/Wood)
  // ========================================================

  'UFPI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Wood/Composite Products',
    tags: ['wood', 'composite', 'building_products', 'packaging'],
  },

  // ========================================================
  // 生命科学诊断 (Life Science Diagnostics)
  // ========================================================

  'CDNA': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Transplant Diagnostics',
    tags: ['transplant', 'genomics', 'diagnostics', 'rejection_monitoring'],
  },
  'MYGN': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Genetic Testing',
    tags: ['genetic_testing', 'hereditary_cancer', 'prenatal', 'pharmacogenomics'],
  },
  'OLINK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Proteomics Tools',
    tags: ['proteomics', 'biomarker', 'PEA_technology', 'drug_development'],
  },

  // ========================================================
  // 殡葬/工业 (Death Care/Industrial)
  // ========================================================

  'MATW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Memorialization',
    tags: ['memorialization', 'cremation', 'industrial_tech', 'marking'],
  },

  // ========================================================
  // 农业 (Agriculture)
  // ========================================================

  'ANDE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ag Supply Chain',
    tags: ['grain', 'ethanol', 'fertilizer', 'ag_supply_chain'],
  },

  // ========================================================
  // 数字基础设施 (Digital Infrastructure)
  // ========================================================

  'DBRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Digital Infrastructure Investment',
    tags: ['digital_infrastructure', 'data_center', 'tower', 'fiber'],
  },

  // ========================================================
  // 工业拍卖 (Industrial Auctions)
  // ========================================================

  'RBA': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Industrial Equipment Auctions',
    tags: ['auction', 'heavy_equipment', 'remarketing', 'marketplace'],
  },

  // ========================================================
  // 特种化学品/涂料 (Specialty Chemicals/Coatings)
  // ========================================================

  'AXTA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['automotive_coatings', 'industrial_coatings', 'refinish'],
  },
  'FUL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['adhesives', 'sealants', 'industrial'],
  },
  'ESI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['electronics_chemicals', 'specialty', 'surface_treatment'],
  },

  // ========================================================
  // 保险 (Insurance)
  // ========================================================

  'SIGI': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Insurance',
    tags: ['specialty_pc', 'commercial_lines', 'personal_lines'],
  },
  'ORI': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Insurance',
    tags: ['diversified_insurance', 'title_insurance', 'commercial'],
  },
  'THG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Insurance',
    tags: ['pc_insurance', 'personal_lines', 'small_commercial'],
  },

  // ========================================================
  // 医疗IT (Healthcare IT)
  // ========================================================

  'NXGN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare IT',
    tags: ['ehr', 'practice_management', 'ambulatory'],
  },
  'PINC': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Healthcare IT',
    tags: ['gpo', 'analytics', 'supply_chain', 'hospital'],
  },
  'HCAT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare IT',
    tags: ['healthcare_analytics', 'data_platform', 'population_health'],
  },
  'PHR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare IT',
    tags: ['patient_intake', 'digital_health', 'payment_processing'],
  },

  // ========================================================
  // 消费零售 (Consumer Retail)
  // ========================================================

  'SIG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Jewelry Retail',
    tags: ['jewelry', 'bridal', 'fashion_accessories', 'omnichannel'],
  },
  'MNRO': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Service',
    tags: ['auto_repair', 'tire_service', 'maintenance', 'chain'],
  },
  'VSCO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Apparel Retail',
    tags: ['lingerie', 'beauty', 'intimate_apparel', 'brand'],
  },

  // ========================================================
  // 国防/航天 (Defense/Aerospace)
  // ========================================================

  'AVAV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Defense',
    tags: ['tactical_drones', 'uas', 'loitering_munitions', 'b2g'],
  },
  'MRCY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Defense',
    tags: ['defense_electronics', 'computing', 'signal_processing', 'b2g'],
  },

  // ========================================================
  // 半导体 (Semiconductor)
  // ========================================================

  'SYNA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor',
    tags: ['human_interface', 'touch', 'display_driver', 'iot'],
  },
  'SITM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor',
    tags: ['mems_timing', 'oscillator', 'precision_timing'],
  },

  // ========================================================
  // 医疗/生物科技 (Healthcare/Biotech)
  // ========================================================

  'HAE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['blood_management', 'hemostasis', 'cell_processing'],
  },
  'RVMD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['oncology', 'ras_inhibitor', 'targeted_therapy'],
  },
  'PTCT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['rare_disease', 'gene_therapy', 'neurology'],
  },

  // ========================================================
  // 船舶/休闲 (Marine/Recreation)
  // ========================================================

  'BC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Marine Recreation',
    tags: ['boats', 'marine_engines', 'recreation', 'fishing'],
  },
  'HZO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Marine Recreation',
    tags: ['boat_retail', 'marina', 'marine_service', 'dealer'],
  },

  // ========================================================
  // 赌场 (Casino)
  // ========================================================

  'MCRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino',
    tags: ['casino', 'hotel', 'regional_gaming', 'entertainment'],
  },

  // ========================================================
  // 商业服务 (Business Services)
  // ========================================================

  'CNXC': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Process Outsourcing',
    tags: ['cx_services', 'bpo', 'customer_management', 'digital_cx'],
  },

  // ========================================================
  // 多元化工业 (Diversified Industrial)
  // ========================================================

  'SXI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Industrial',
    tags: ['electronics', 'engraving', 'engineering_tech', 'specialty'],
  },

  // ========================================================
  // 芯片架构/IP授权 (Chip Architecture/IP Licensing)
  // ========================================================

  'ARM': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chip Architecture/IP',
    tags: ['ip_licensing', 'arm_architecture', 'mobile_computing', 'iot'],
  },

  // ========================================================
  // 生鲜配送平台 (Grocery Delivery Platform)
  // ========================================================

  'CART': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Grocery Delivery',
    tags: ['grocery', 'on_demand', 'gig_economy', 'advertising'],
  },

  // ========================================================
  // 高端鞋履 (Premium Footwear)
  // ========================================================

  'BIRK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Premium Footwear',
    tags: ['heritage_brand', 'comfort', 'sandals', 'premium'],
  },

  // ========================================================
  // 拉美/东南亚电商平台 (LatAm/SE Asia E-commerce)
  // ========================================================

  'MELI': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'LatAm E-commerce',
    tags: ['latam', 'marketplace', 'fintech', 'logistics'],
  },
  'SE': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'SE Asia Platform',
    tags: ['gaming', 'ecommerce', 'fintech', 'southeast_asia'],
  },

  // ========================================================
  // 中国电商/科技 (Chinese E-commerce/Tech)
  // ========================================================

  'BABA': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising', 'subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Chinese E-commerce',
    tags: ['marketplace', 'cloud', 'global_trade', 'fintech'],
  },
  'PDD': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Chinese E-commerce',
    tags: ['value_ecommerce', 'social_shopping', 'temu', 'gamification'],
  },
  'JD': {
    assetModel: 'platform',
    revenueModels: ['product_sales', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Chinese E-commerce',
    tags: ['self_operated', 'logistics', 'electronics', 'fast_delivery'],
  },
  'BIDU': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Chinese Search/AI',
    tags: ['search_engine', 'ai', 'autonomous_driving', 'cloud'],
  },

  // ========================================================
  // 中国肿瘤生物科技 (Chinese Oncology Biotech)
  // ========================================================

  'BGNE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chinese Oncology',
    tags: ['oncology', 'biotech', 'global_clinical', 'immuno_oncology'],
  },

  // ========================================================
  // eVTOL/电动飞行器 (eVTOL Air Taxi)
  // ========================================================

  'JOBY': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'eVTOL',
    tags: ['evtol', 'air_taxi', 'urban_mobility', 'electric_aviation'],
  },

  // ========================================================
  // 高端电动汽车 (Premium Electric Vehicles)
  // ========================================================

  'PSNY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Premium EV',
    tags: ['ev', 'premium', 'scandinavian_design', 'sustainability'],
  },

  // ========================================================
  // 矿业 (Mining)
  // ========================================================

  'VALE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Iron Ore Mining',
    tags: ['iron_ore', 'nickel', 'brazil', 'bulk_commodities'],
  },
  'RIO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Mining',
    tags: ['iron_ore', 'aluminum', 'copper', 'global_mining'],
  },
  'BHP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Mining',
    tags: ['iron_ore', 'copper', 'coal', 'global_mining'],
  },

  // ========================================================
  // LNG出口 (LNG Export/Liquefaction)
  // ========================================================

  'LNG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Export',
    tags: ['lng', 'liquefaction', 'natural_gas', 'energy_export'],
  },

  // ========================================================
  // 补充: 20 只新股票 (2026-01 第八批)
  // ========================================================

  // ---------- Biotech ----------
  'XENE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Epilepsy Biotech',
    tags: ['epilepsy', 'neuroscience', 'ion_channel', 'CNS'],
  },
  'SWTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rare Tumor Biotech',
    tags: ['rare_tumor', 'oncology', 'desmoid', 'targeted_therapy'],
  },
  'KYMR': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Protein Degradation',
    tags: ['protein_degradation', 'TPD', 'molecular_glue', 'immunology'],
  },
  'RCKT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy',
    tags: ['gene_therapy', 'lentiviral', 'rare_disease', 'pediatric'],
  },

  // ---------- Healthcare REITs ----------
  'GLPI': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Casino REIT',
    tags: ['casino', 'gaming', 'triple_net', 'experiential'],
  },
  'MPW': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Hospital REIT',
    tags: ['hospital', 'acute_care', 'triple_net', 'healthcare'],
  },
  'SBRA': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Senior Housing REIT',
    tags: ['senior_housing', 'skilled_nursing', 'triple_net', 'healthcare'],
  },
  'DOC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['life_science', 'medical_office', 'senior_housing', 'outpatient'],
  },

  // ---------- Consumer ----------
  'PTLO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual Restaurant',
    tags: ['fast_casual', 'hot_dogs', 'italian_beef', 'chicago', 'drive_through'],
  },
  'ARKO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Convenience Store/Fuel',
    tags: ['convenience', 'fuel', 'gas_station', 'value', 'rural'],
  },

  // ---------- Industrial ----------
  'BLBD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'School Bus Manufacturing',
    tags: ['school_bus', 'electric_bus', 'EV', 'government', 'fleet'],
  },

  // ---------- E&P ----------
  'VTLE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Shale E&P',
    tags: ['permian', 'delaware', 'midland', 'shale_oil'],
  },
  'GPOR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['natural_gas', 'utica', 'scoop', 'appalachian'],
  },

  // ---------- Regional Banks ----------
  'TBBK': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Banking-as-a-Service',
    tags: ['BaaS', 'fintech_partner', 'prepaid_cards', 'payments', 'digital_banking'],
  },
  'FFBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'ohio', 'indiana', 'kentucky', 'wealth_management'],
  },
  'WSBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'west_virginia', 'ohio', 'mortgage', 'trust'],
  },

  // ---------- Healthcare Services ----------
  'LFST': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Mental Health Services',
    tags: ['mental_health', 'behavioral', 'therapy', 'psychiatry', 'telehealth'],
  },
  'OPCH': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Home Infusion',
    tags: ['home_infusion', 'specialty_pharmacy', 'IV_therapy', 'chronic_care'],
  },
  'PACS': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Post-Acute Care',
    tags: ['skilled_nursing', 'rehabilitation', 'post_acute', 'senior_care'],
  },

  // ========================================================
  // 牙科/医疗分销
  // ========================================================

  'HSIC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dental/Medical Distribution',
    tags: ['dental', 'medical', 'distribution', 'supplies'],
  },
  'PDCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dental/Veterinary Distribution',
    tags: ['dental', 'veterinary', 'distribution', 'equipment'],
  },

  // ========================================================
  // 游戏/支付技术
  // ========================================================

  'EVERI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gaming Technology',
    tags: ['gaming', 'payments', 'slot_machines', 'casino_tech'],
  },
  'CXT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Technology/Sensors',
    tags: ['payment', 'sensors', 'currency_detection', 'security'],
  },

  // ========================================================
  // 媒体/体育/娱乐
  // ========================================================

  'ATUS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cable/Broadband',
    tags: ['cable', 'broadband', 'internet', 'telecom'],
  },
  'MSGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pro Sports Teams',
    tags: ['sports', 'arena', 'nba', 'nhl', 'live_entertainment'],
  },
  'MSGE': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment Venues',
    tags: ['venues', 'concerts', 'shows', 'live_entertainment', 'msg'],
  },

  // ========================================================
  // 特种制造
  // ========================================================

  'TRS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Containers/Packaging',
    tags: ['containers', 'packaging', 'specialty', 'industrial'],
  },
  'TNET': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HR/PEO Services',
    tags: ['hr', 'peo', 'payroll', 'benefits', 'outsourcing'],
  },
  'NSIT': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Solutions/Distribution',
    tags: ['it_distribution', 'solutions', 'hardware', 'cloud', 'services'],
  },
  'PLAB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Photomasks',
    tags: ['photomasks', 'semiconductor', 'lithography', 'ic_manufacturing'],
  },

  // ========================================================
  // 消费品
  // ========================================================

  'HELE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Products/Housewares',
    tags: ['housewares', 'personal_care', 'home', 'beauty', 'consumer'],
  },
  'IPAR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Prestige Fragrances',
    tags: ['fragrance', 'prestige', 'luxury', 'licensed_brands'],
  },
  'VITL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pasture-Raised Food',
    tags: ['eggs', 'butter', 'pasture_raised', 'ethical', 'organic'],
  },

  // ========================================================
  // 特种食品
  // ========================================================

  'CHEF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Food Distribution',
    tags: ['specialty_food', 'distribution', 'restaurant', 'gourmet'],
  },

  // ========================================================
  // 酒店REITs
  // ========================================================

  'RLJ': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Hotel REIT/Select-Service',
    tags: ['hotel_reit', 'select_service', 'focused_service'],
  },
  'SHO': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Hotel REIT/Upper-Upscale',
    tags: ['hotel_reit', 'upper_upscale', 'resort'],
  },
  'PEB': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Hotel REIT/Lifestyle',
    tags: ['hotel_reit', 'lifestyle', 'urban', 'boutique'],
  },
  'RHP': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Entertainment Venue REIT',
    tags: ['entertainment', 'venue_reit', 'convention', 'hospitality'],
  },
  'APLE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Hotel REIT/Select-Service',
    tags: ['hotel_reit', 'select_service', 'upscale_select', 'diversified'],
  },

  // ========================================================
  // 电力/能源 (Power/Energy)
  // ========================================================

  'GEV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Equipment/Grid',
    tags: ['power_equipment', 'grid_solutions', 'gas_turbines', 'electrification'],
  },
  'TLN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nuclear Power Generation',
    tags: ['nuclear', 'power_generation', 'baseload', 'data_center'],
  },
  'PCG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'gas', 'california', 'regulated', 'wildfire_risk'],
  },

  // ========================================================
  // 公用事业 (Utilities)
  // ========================================================

  'EIX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regulated Utility',
    tags: ['electric', 'california', 'regulated', 'clean_energy', 'transmission'],
  },

  // ========================================================
  // 电信/网络 (Telecom/Networking)
  // ========================================================

  'FYBR': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fiber Broadband',
    tags: ['fiber', 'broadband', 'internet', 'residential', 'ftth'],
  },
  'BDC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Networking Infrastructure',
    tags: ['networking', 'cable', 'connectivity', 'industrial', 'enterprise'],
  },

  // ========================================================
  // 技术 (Technology)
  // ========================================================

  'AI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise AI Platform',
    tags: ['enterprise_ai', 'platform', 'predictive_analytics', 'digital_transformation'],
  },
  'PURE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'All-Flash Storage',
    tags: ['flash_storage', 'data_storage', 'evergreen', 'as_a_service'],
  },

  // ========================================================
  // 医疗 (Healthcare)
  // ========================================================

  'GMED': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Spine Surgery Robotics',
    tags: ['spine', 'surgical_robotics', 'musculoskeletal', 'navigation'],
  },
  'MMSI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Interventional Medical Devices',
    tags: ['interventional', 'cardiology', 'endoscopy', 'consumables'],
  },

  // ========================================================
  // 出行/工业 (Mobility/Industrial)
  // ========================================================

  'VNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mobility Technology',
    tags: ['fuel_dispensing', 'telematics', 'fleet', 'ev_charging'],
  },

  // ========================================================
  // 大麻/饮料 (Cannabis/Beverage)
  // ========================================================

  'TLRY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cannabis/Craft Beer',
    tags: ['cannabis', 'craft_beer', 'beverage', 'wellness', 'international'],
  },

  // ========================================================
  // 商业服务 (Business Services)
  // ========================================================

  'G': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Operations/BPO',
    tags: ['digital_operations', 'bpo', 'analytics', 'process_transformation'],
  },

  // ========================================================
  // 新增15只股票 (2026-01 batch)
  // ========================================================

  // Large-cap gap fills
  'RMD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Devices',
    tags: ['CPAP', 'ventilators', 'sleep_apnea', 'respiratory', 'connected_health'],
  },
  'ARGX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['FcRn_antibodies', 'autoimmune', 'rare_disease', 'immunology'],
  },
  'WCN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Waste Management',
    tags: ['waste_collection', 'landfill', 'recycling', 'environmental_services'],
  },
  'CRH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Materials',
    tags: ['cement', 'aggregates', 'infrastructure', 'construction'],
  },
  'CPNG': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'E-commerce',
    tags: ['korean_ecommerce', 'rocket_delivery', 'grocery', 'fulfillment'],
  },
  'WMG': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Music',
    tags: ['music_labels', 'publishing', 'streaming', 'artist_services'],
  },
  'MOG.A': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Components',
    tags: ['flight_controls', 'actuators', 'defense', 'space'],
  },

  // Russell 2000 small-caps (healthcare)
  'FLGT': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Genetic Testing',
    tags: ['genomics', 'diagnostics', 'oncology', 'pharma_services'],
  },

  // Russell 2000 small-caps (tech/software)
  'ALTR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Simulation Software',
    tags: ['CAE', 'HPC', 'engineering_simulation', 'digital_twin'],
  },
  'QTWO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Banking SaaS',
    tags: ['digital_banking', 'credit_unions', 'fintech_platform', 'community_banks'],
  },

  // Russell 2000 small-caps (industrials/materials)
  'TILE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Flooring',
    tags: ['modular_flooring', 'carpet_tile', 'sustainability', 'commercial'],
  },

  // Russell 2000 small-caps (consumer/financial)
  'DTC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'DTC Brands',
    tags: ['outdoor', 'direct_to_consumer', 'solo_stove', 'lifestyle'],
  },
  'TASK': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Process Outsourcing',
    tags: ['BPO', 'content_moderation', 'AI_services', 'digital_CX'],
  },
  'COOP': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Mortgage Servicing',
    tags: ['mortgage', 'loan_servicing', 'refinancing', 'home_lending'],
  },

  // ========================================================
  // Russell 2000 Small-Caps Batch
  // ========================================================

  // ---------- Biotech/Pharma Small-Caps ----------
  'ARQT': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['immuno_oncology', 'anti_tigit', 'checkpoint', 'bispecific'],
  },
  'FATE': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cell Therapy',
    tags: ['cell_therapy', 'ipsc', 'nk_cell', 'off_the_shelf'],
  },

  // ---------- Semiconductor Small-Caps ----------
  'INDI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Automotive Chips',
    tags: ['automotive', 'adas', 'lidar', 'edge_computing'],
  },
  'SLAB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IoT Chips',
    tags: ['iot', 'wireless', 'zigbee', 'bluetooth', 'matter'],
  },
  'AOSL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Semiconductor',
    tags: ['power_mosfet', 'trench', 'computing', 'consumer'],
  },

  // ---------- Specialty Industrial ----------
  'WAB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rail Equipment',
    tags: ['locomotive', 'freight', 'transit', 'digital_electronics'],
  },
  'SWX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'distribution', 'regulated', 'southwest'],
  },

  // ---------- Specialty Retail/Consumer ----------
  'PLBY': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Lifestyle Brands',
    tags: ['brand_licensing', 'lifestyle', 'apparel', 'digital_media'],
  },
  'RENT': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fashion Rental',
    tags: ['rental', 'fashion', 'subscription', 'circular_economy'],
  },
  'BIRD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sustainable Footwear',
    tags: ['sustainable', 'dtc', 'footwear', 'eco_friendly'],
  },

  // ========================================================
  // Energy/Midstream - Oil Gathering
  // ========================================================

  'HESM': {
    assetModel: 'asset_heavy',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil Gathering',
    tags: ['midstream', 'oil_gathering', 'gas_processing', 'water'],
  },

  // ========================================================
  // Food/Beverage - Specialty Foods
  // ========================================================

  'LANC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Foods',
    tags: ['food', 'specialty', 'dressings', 'frozen', 'foodservice'],
  },

  // ========================================================
  // Russell 2000/3000 Small-Caps 补充 (Cannabis/EV/Space/Specialty)
  // ========================================================

  // Cannabis/Alternative
  'CRON': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cannabis',
    tags: ['cannabis', 'CBD', 'wellness', 'Canada', 'Altria_backed'],
  },
  'GTBIF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Cannabis MSO',
    tags: ['cannabis', 'MSO', 'dispensary', 'multi_state', 'vertical_integration'],
  },

  // EV/Clean Energy Small-Caps
  'FCEL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fuel Cell Platforms',
    tags: ['fuel_cell', 'hydrogen', 'stationary_power', 'clean_energy'],
  },

  // Space/Satellite
  'VSAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Satellite Internet',
    tags: ['satellite', 'broadband', 'in_flight', 'maritime', 'government'],
  },

  // Specialty Retail/Auto
  'XPEL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Auto Paint Protection',
    tags: ['PPF', 'window_tint', 'ceramic_coating', 'aftermarket'],
  },
  'DORM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aftermarket Auto Parts',
    tags: ['aftermarket', 'OE_replacement', 'hardware', 'brake', 'engine'],
  },

  // Data/Analytics Small-Caps
  'EVRI': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gaming FinTech',
    tags: ['gaming', 'fintech', 'cash_access', 'loyalty', 'casino_floor'],
  },
  'VERX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tax Compliance SaaS',
    tags: ['tax', 'compliance', 'SaaS', 'indirect_tax', 'enterprise'],
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
