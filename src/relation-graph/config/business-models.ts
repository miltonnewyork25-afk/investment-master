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
  | 'consumables'      // 耗材/试剂 (医疗诊断、打印)
  | 'aftermarket'      // 售后零部件/服务 (工业维护)
  | 'service_fee'      // 服务费 (咨询、运维)
  | 'project_based'    // 项目制 (工程、建设)
  | 'distribution'     // 分销差价 (批发、经销)
  | 'leasing'          // 设备租赁 (工业设备、车辆)
  | 'throughput_fee'   // 管输/过境费 (管道、物流)
  | 'gathering'        // 采集费 (油气采集)
  | 'usage_based'      // 按量计费 (云服务、API)
  | 'commodity_sales'  // 大宗商品销售 (矿产、农产品)
  | 'regulated_utility'; // 受管制公用事业费率

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
    tags: ['apartments', 'coastal', 'suburban', 'project_based'],
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
    tags: ['advisory', 'investment_banking', 'advisory'],
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
    tags: ['data_center', 'records_management', 'information_destruction', 'self_operated'],
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
    tags: ['outdoor', 'billboard', 'transit', 'self_operated', 'urban'],
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
    tags: ['sunbelt', 'industrial', 'logistics', 'warehouse', 'project_based'],
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
    tags: ['work_management', 'project', 'service_fee', 'workflow', 'productivity'],
  },
  'BOX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise SaaS',
    tags: ['cloud_content', 'service_fee', 'file_sharing', 'security', 'governance'],
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
    tags: ['tech_insurance', 'individual', 'marketplace', 'self_operated', 'telehealth'],
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
    tags: ['work_management', 'service_fee', 'project_planning', 'automation'],
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
    tags: ['self_operated', 'online_banking', 'commercial', 'securities_lending'],
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
    tags: ['work_os', 'project_management', 'service_fee', 'no_code'],
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
    tags: ['pennsylvania', 'self_operated', 'commercial', 'fintech_lending'],
  },
  'NBTB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Bank',
    tags: ['new_york', 'northeast', 'community', 'service_fee'],
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
    tags: ['consulting', 'healthcare', 'education', 'self_operated', 'strategy'],
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
    tags: ['community_bank', 'Virginia', 'insurance', 'service_fee'],
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
  'BE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fuel Cell Power',
    tags: ['solid_oxide', 'fuel_cell', 'hydrogen', 'microgrid', 'distributed_power'],
  },
  'CLNE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'RNG/CNG Fueling',
    tags: ['renewable_natural_gas', 'CNG', 'fleet_fueling', 'trucking', 'landfill_gas'],
  },

  // ========================================================
  // LNG出口 (LNG Export)
  // ========================================================

  'NEXT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Export',
    tags: ['lng', 'liquefaction', 'export', 'gulf_coast', 'carbon_capture'],
  },

  // ========================================================
  // 核能 (Nuclear Energy)
  // ========================================================

  'NNE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advanced Nuclear',
    tags: ['micro_reactor', 'portable_nuclear', 'modular', 'clean_energy'],
  },
  'OKLO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advanced Nuclear',
    tags: ['fast_reactor', 'nuclear_recycling', 'advanced_fission', 'clean_energy'],
  },
  'SMR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advanced Nuclear',
    tags: ['small_modular_reactor', 'nuclear_design', 'scalable', 'clean_energy'],
  },
  'LEU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium Enrichment',
    tags: ['uranium_enrichment', 'HALEU', 'centrifuge', 'nuclear_fuel'],
  },
  'UUUU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium/Rare Earth Mining',
    tags: ['uranium_mining', 'rare_earth', 'vanadium', 'dual_commodity'],
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
    tags: ['community_bank', 'ohio', 'indiana', 'kentucky', 'service_fee'],
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

  // ========================================================
  // 债务购买/消费金融
  // ========================================================

  'ECPG': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Debt Purchasing',
    tags: ['debt_buying', 'collections', 'consumer_debt', 'portfolio_recovery'],
  },
  'PRAA': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Debt Purchasing',
    tags: ['debt_buying', 'collections', 'consumer_debt', 'international'],
  },
  'NAVI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Student Loan Servicing',
    tags: ['student_loans', 'loan_servicing', 'refinancing', 'education_finance'],
  },

  // ========================================================
  // 数据/分析
  // ========================================================

  'VRSK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Analytics',
    tags: ['insurance_data', 'risk_analytics', 'actuarial', 'claims_analytics'],
  },
  'DNB': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Data',
    tags: ['business_data', 'credit_risk', 'B2B_analytics', 'commercial_data'],
  },

  // ========================================================
  // 设施/食品服务
  // ========================================================

  'ABM': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Facility Services',
    tags: ['janitorial', 'facility_management', 'building_services', 'commercial'],
  },
  'ARMK': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Food/Facilities Services',
    tags: ['food_service', 'facilities', 'uniforms', 'events_catering'],
  },

  // ========================================================
  // 清洁能源
  // ========================================================

  'CWEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Renewable Wind/Solar',
    tags: ['wind', 'solar', 'renewable_energy', 'power_purchase_agreements'],
  },

  // ========================================================
  // 网络设备
  // ========================================================

  'UI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Networking Equipment',
    tags: ['wifi', 'networking', 'enterprise_wireless', 'prosumer'],
  },

  // ========================================================
  // 媒体/广播
  // ========================================================

  'SIRI': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Satellite Radio',
    tags: ['satellite_radio', 'streaming', 'exclusive_content', 'auto_OEM'],
  },
  'IHRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Radio/Podcasts',
    tags: ['radio', 'podcasts', 'local_media', 'advertising'],
  },

  // ========================================================
  // 消费品牌
  // ========================================================

  'OLPX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Premium Hair Care',
    tags: ['hair_care', 'beauty', 'salon_professional', 'DTC'],
  },
  'SG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual Salad',
    tags: ['fast_casual', 'healthy_food', 'salads', 'sustainability'],
  },

  // ========================================================
  // 保险/再保险
  // ========================================================

  'EG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Reinsurance',
    tags: ['reinsurance', 'property_casualty', 'specialty_lines', 'global'],
  },
  'AXS': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Reinsurance',
    tags: ['specialty_insurance', 'reinsurance', 'E&S', 'professional_lines'],
  },

  // ========================================================
  // 多元化工业
  // ========================================================

  'CR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Process Industrial',
    tags: ['aerospace', 'process_flow', 'engineered_materials', 'sensing'],
  },
  'ITT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Motion/Flow Components',
    tags: ['motion_technologies', 'flow_control', 'connectors', 'industrial'],
  },

  // ========================================================
  // 草坪/园艺
  // ========================================================

  'SMG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Lawn/Garden',
    tags: ['lawn_care', 'garden', 'fertilizer', 'hydroponics'],
  },

  // ========================================================
  // 医疗器械/MedTech
  // ========================================================

  'TMDX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Organ Transport',
    tags: ['organ_care', 'transplant', 'preservation', 'logistics'],
  },
  'IART': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neurosurgery Devices',
    tags: ['neurosurgery', 'wound_care', 'regenerative_medicine', 'implants'],
  },
  'ATEC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Spine Devices',
    tags: ['spine_surgery', 'surgical_systems', 'biologics', 'informatics'],
  },

  // Payments/Fintech - International
  'PSFE': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Digital Payments',
    tags: ['payments', 'digital_wallet', 'iGaming', 'e-commerce', 'fintech'],
  },
  'PAGS': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Brazil Payments',
    tags: ['payments', 'POS', 'SMB', 'Brazil', 'fintech'],
  },
  'STNE': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Brazil Fintech',
    tags: ['payments', 'banking', 'SMB', 'Brazil', 'software'],
  },

  // Digital Fitness - Consumer
  'BODY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Fitness',
    tags: ['fitness', 'streaming', 'supplements', 'DTC', 'wellness'],
  },

  // ========================================================
  // Diversified Industrial/Infrastructure
  // ========================================================

  'ROPER': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Industrial Software',
    tags: ['industrial_software', 'niche_markets', 'vertical_SaaS', 'M&A', 'cash_compounder'],
  },
  'ZWS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Management',
    tags: ['water', 'plumbing', 'infrastructure', 'commercial_building', 'sustainability'],
  },

  // ========================================================
  // Healthcare/Biotech (Cell/Gene/Specialty)
  // ========================================================

  'IOVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cell Therapy',
    tags: ['TIL_therapy', 'oncology', 'immunotherapy', 'melanoma', 'biologics'],
  },
  'CYTK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiac Therapeutics',
    tags: ['cardiac_myosin', 'heart_failure', 'HCM', 'small_molecule', 'cardiology'],
  },
  'IRON': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Hematology Therapeutics',
    tags: ['hematology', 'iron_metabolism', 'rare_disease', 'hepcidin', 'anemia'],
  },
  'VRNA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Respiratory Therapeutics',
    tags: ['respiratory', 'COPD', 'inflammation', 'inhaled_therapy', 'pulmonology'],
  },

  // ========================================================
  // AI/Voice Technology
  // ========================================================

  'SOUN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Voice AI Platform',
    tags: ['voice_AI', 'NLP', 'conversational_AI', 'restaurant_tech', 'automotive_AI'],
  },
  'BBAI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'AI Decision Analytics',
    tags: ['AI_analytics', 'defense', 'intelligence', 'decision_support', 'government'],
  },

  // ========================================================
  // Energy Services (Compression/Reservoir)
  // ========================================================

  'CLB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Reservoir Description',
    tags: ['reservoir', 'core_analysis', 'production_enhancement', 'oilfield_services', 'diagnostics'],
  },
  'AROC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gas Compression Services',
    tags: ['natural_gas', 'compression', 'midstream', 'contract_services', 'infrastructure'],
  },
  'USAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gas Gathering Compression',
    tags: ['natural_gas', 'gathering', 'compression', 'MLP', 'midstream'],
  },

  // --- Orphan references fix (referenced in cross-market/consumer-causality) ---
  'CTB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tire Manufacturing',
    tags: ['tires', 'automotive', 'replacement', 'OEM', 'rubber'],
  },
  'ERIC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Telecom Equipment',
    tags: ['5G', 'telecom_infrastructure', 'network', 'RAN', 'patents'],
  },
  'GT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Tire Manufacturing',
    tags: ['tires', 'automotive', 'replacement', 'OEM', 'rubber', 'retail'],
  },
  'HBM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Copper Mining',
    tags: ['copper', 'gold', 'zinc', 'mining', 'base_metals', 'exploration'],
  },
  'TWOU': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'EdTech Platform',
    tags: ['online_education', 'university_partnerships', 'OPM', 'bootcamps', 'digital_learning'],
  },

  // ========================================================
  // Real Estate Tech / PropTech
  // ========================================================

  'Z': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Real Estate Tech Platform',
    tags: ['real_estate', 'home_search', 'Zestimate', 'rentals', 'proptech'],
  },
  'COMP': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Real Estate Brokerage Tech',
    tags: ['real_estate', 'brokerage', 'agents', 'proptech', 'AI_matching'],
  },

  // ========================================================
  // Space Infrastructure
  // ========================================================

  'RDW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Space Infrastructure',
    tags: ['space', 'satellites', '3D_printing', 'solar_arrays', 'on_orbit_servicing'],
  },

  // ========================================================
  // IT Infrastructure Services
  // ========================================================

  'KD': {
    assetModel: 'hybrid',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'IT Infrastructure Services',
    tags: ['managed_services', 'mainframe', 'cloud_migration', 'hybrid_IT', 'enterprise_infra'],
  },

  // ========================================================
  // Identity / Security Tech
  // ========================================================

  'YOU': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Identity Verification Tech',
    tags: ['biometrics', 'identity', 'TSA', 'airport_security', 'clear_lanes'],
  },

  // ========================================================
  // Biotech Platform / Cell Therapy / Gene Editing
  // ========================================================

  'ROIV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech Platform',
    tags: ['biotech_incubator', 'drug_development', 'vants', 'dermatology', 'immunology'],
  },
  'VCEL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regenerative Medicine',
    tags: ['cell_therapy', 'cartilage_repair', 'burn_treatment', 'MACI', 'autologous_cells'],
  },
  'VERV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Editing',
    tags: ['gene_editing', 'base_editing', 'cardiovascular', 'PCSK9', 'ANGPTL3'],
  },

  // ========================================================
  // Financial Services / Commodities
  // ========================================================

  'SNEX': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commodities Brokerage',
    tags: ['commodities', 'futures', 'forex', 'clearing', 'OTC_markets'],
  },
  'BSIG': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['multi_boutique', 'institutional', 'quant', 'active_management', 'affiliates'],
  },

  // ========================================================
  // eVTOL / Urban Air Mobility
  // ========================================================

  'ACHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'eVTOL',
    tags: ['eVTOL', 'urban_air_mobility', 'electric_aircraft', 'UAM', 'air_taxi'],
  },

  // ========================================================
  // 3D Spatial Data
  // ========================================================

  'MTTR': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Spatial Data',
    tags: ['3D_capture', 'digital_twins', 'virtual_tours', 'spatial_data', 'real_estate_tech'],
  },

  // ========================================================
  // Medical Devices / Orthopedics
  // ========================================================

  'ENVX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Orthopedic Devices',
    tags: ['orthopedics', 'reconstruction', 'prevention', 'recovery', 'surgical_devices'],
  },

  // ========================================================
  // Digital Analytics / Marketing SaaS
  // ========================================================

  'AMPL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Analytics Platform',
    tags: ['product_analytics', 'user_behavior', 'engagement', 'A_B_testing', 'cohort_analysis'],
  },
  'SEMR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Marketing SaaS',
    tags: ['SEO', 'SEM', 'content_marketing', 'competitive_intelligence', 'PPC'],
  },

  // ========================================================
  // Sports Data / Analytics
  // ========================================================

  'SRAD': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'licensing', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Sports Data Analytics',
    tags: ['sports_data', 'betting', 'live_odds', 'streaming_rights', 'AI_analytics'],
  },

  // ========================================================
  // Financial/REIT/Energy Batch
  // ========================================================

  // ---------- Financials ----------
  'BHF': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Life Insurance & Annuities',
    tags: ['annuities', 'life_insurance', 'retirement', 'variable_annuities'],
  },
  'BHLB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Community Banking',
    tags: ['community_bank', 'commercial_lending', 'retail_banking', 'service_fee'],
  },
  'BOH': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['hawaii', 'regional_bank', 'commercial_lending', 'service_fee'],
  },
  'CASH': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'BaaS Banking',
    tags: ['baas', 'fintech', 'prepaid_cards', 'tax_services', 'payments'],
  },
  'CNO': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Life & Health Insurance',
    tags: ['life_insurance', 'health_insurance', 'annuities', 'middle_market'],
  },
  'CRD.A': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Claims Management',
    tags: ['claims', 'TPA', 'insurance_services', 'loss_adjusting'],
  },
  'EVER': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Insurance Marketplace',
    tags: ['insurance_marketplace', 'lead_generation', 'auto_insurance', 'home_insurance'],
  },
  'FBRT': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['commercial_mortgage', 'CRE_lending', 'floating_rate', 'bridge_loans'],
  },
  'FG': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Fixed Annuities',
    tags: ['fixed_annuities', 'MYGA', 'retirement', 'life_insurance', 'pension_risk_transfer'],
  },
  'HOMB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['regional_bank', 'commercial_lending', 'retail_banking', 'arkansas'],
  },
  'HTLF': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Community Banking',
    tags: ['community_bank', 'commercial_lending', 'agribusiness', 'midwest'],
  },
  'SFBS': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Commercial Banking',
    tags: ['commercial_banking', 'relationship_banking', 'southeast', 'high_growth'],
  },
  'UCB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Community Banking',
    tags: ['community_bank', 'commercial_lending', 'southeast', 'SBA_lending'],
  },
  'WAFD': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['regional_bank', 'commercial_lending', 'multifamily', 'pacific_northwest'],
  },

  // ---------- REITs ----------
  'AIV': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Multifamily REIT',
    tags: ['multifamily', 'apartments', 'value_add', 'project_based'],
  },
  'BNL': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['net_lease', 'diversified', 'industrial', 'healthcare', 'triple_net'],
  },
  'CUZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['office', 'sunbelt', 'trophy_assets', 'CBD', 'life_science'],
  },
  'ELME': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Multifamily REIT',
    tags: ['multifamily', 'apartments', 'washington_dc', 'mid_atlantic'],
  },
  'GTY': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['convenience', 'gas_station', 'net_lease', 'auto_services'],
  },
  'IRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Multifamily REIT',
    tags: ['multifamily', 'apartments', 'sunbelt', 'secondary_markets'],
  },
  'KRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['open_air', 'grocery_anchored', 'shopping_centers', 'retail'],
  },
  'LTC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['senior_housing', 'skilled_nursing', 'assisted_living', 'triple_net'],
  },
  'PECO': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['grocery_anchored', 'neighborhood_centers', 'essential_retail', 'necessity'],
  },
  'PINE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['net_lease', 'single_tenant', 'retail', 'diversified'],
  },
  'ROIC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['grocery_anchored', 'necessity', 'west_coast', 'shopping_centers'],
  },
  'SKT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['outlet', 'open_air', 'premium_brands', 'tourism'],
  },
  'STOR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['net_lease', 'single_tenant', 'middle_market', 'profit_center'],
  },
  'UNIT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fiber REIT',
    tags: ['fiber', 'telecom_infrastructure', 'dark_fiber', 'leased_fiber'],
  },
  'UE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail REIT',
    tags: ['urban', 'grocery_anchored', 'redevelopment', 'northeast'],
  },

  // ---------- Energy ----------
  'ARIS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Solutions',
    tags: ['produced_water', 'water_recycling', 'permian', 'oilfield_services'],
  },
  'BORR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Drilling',
    tags: ['jack_up', 'offshore', 'shallow_water', 'contract_drilling'],
  },
  'CRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['california', 'oil_production', 'carbon_management', 'CCS'],
  },
  'DRQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Subsea Equipment',
    tags: ['subsea', 'wellhead', 'drilling_equipment', 'offshore'],
  },
  'GRNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['commercial_mortgage', 'CRE_lending', 'senior_loans', 'transitional'],
  },
  'MUR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['E&P', 'gulf_of_mexico', 'eagle_ford', 'international', 'offshore'],
  },
  'PARR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil Refining',
    tags: ['refining', 'hawaii', 'pacific_northwest', 'retail', 'logistics'],
  },
  'VNOM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mineral Rights',
    tags: ['mineral_rights', 'royalties', 'permian', 'midland_basin', 'oil_gas'],
  },
  'WTTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Solutions',
    tags: ['water_services', 'flowback', 'completions', 'produced_water', 'oilfield'],
  },

  // ========================================================
  // Industrials / Materials / Transport Batch
  // ========================================================

  'AIMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Motion Control',
    tags: ['motion_control', 'power_transmission', 'clutches', 'brakes', 'gearing'],
  },
  'ATLKY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Compressors & Vacuum',
    tags: ['compressors', 'vacuum', 'industrial_tools', 'power_technique', 'assembly'],
  },
  'BGSF': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Workforce Solutions',
    tags: ['staffing', 'workforce', 'temporary_labor', 'professional_services'],
  },
  'BWMN': {
    assetModel: 'asset_light',
    revenueModels: ['project_based', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Engineering Consulting',
    tags: ['engineering', 'surveying', 'infrastructure', 'environmental', 'planning'],
  },
  'CENTA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Garden & Pet Products',
    tags: ['garden', 'pet', 'lawn_care', 'pest_control', 'consumer_products'],
  },
  'CMCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Motion Control',
    tags: ['hoists', 'rigging', 'conveying', 'motion_control', 'material_handling'],
  },
  'CNDT': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Process Services',
    tags: ['BPO', 'document_management', 'HR_services', 'transaction_processing'],
  },
  'CPAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cement & Building Materials',
    tags: ['cement', 'concrete', 'construction_materials', 'Peru', 'infrastructure'],
  },
  'DCI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Filtration Systems',
    tags: ['filtration', 'air_filters', 'liquid_filters', 'exhaust', 'dust_collection'],
  },
  'DNOW': {
    assetModel: 'asset_light',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Energy Distribution',
    tags: ['pipes', 'valves', 'fittings', 'energy_distribution', 'MRO'],
  },
  'DY': {
    assetModel: 'asset_heavy',
    revenueModels: ['project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Utility & Telecom Contracting',
    tags: ['utility_construction', 'telecom_infrastructure', 'fiber', 'underground'],
  },
  'EAF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Graphite Electrodes',
    tags: ['graphite', 'electrodes', 'EAF_steelmaking', 'carbon', 'petroleum_needle_coke'],
  },
  'ERII': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pressure Exchangers',
    tags: ['pressure_exchangers', 'desalination', 'energy_recovery', 'wastewater'],
  },
  'FLOW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Process Technology',
    tags: ['mixing', 'heat_transfer', 'food_processing', 'flow_control', 'separation'],
  },
  'GBX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'leasing', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Railcar Manufacturing',
    tags: ['railcars', 'freight', 'leasing', 'marine', 'intermodal'],
  },
  'GEF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Packaging',
    tags: ['drums', 'IBCs', 'fiber_containers', 'packaging', 'reconditioning'],
  },
  'GTES': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Transmission',
    tags: ['belts', 'hoses', 'hydraulics', 'power_transmission', 'fluid_power'],
  },
  'GVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Heavy Construction',
    tags: ['highways', 'bridges', 'tunnels', 'infrastructure', 'aggregates'],
  },
  'HI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Equipment',
    tags: ['molding', 'size_reduction', 'screening', 'separating', 'process_equipment'],
  },
  'JBT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food & Aerospace Technology',
    tags: ['food_processing', 'freezing', 'coating', 'ground_support', 'aerotech'],
  },
  'KAI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Process Equipment',
    tags: ['doctoring', 'cleaning', 'filtration', 'fiber_processing', 'fluid_handling'],
  },
  'KMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cutting Tools & Tooling',
    tags: ['cutting_tools', 'carbide', 'metalworking', 'tooling', 'wear_solutions'],
  },
  'KNTK': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'gathering'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Gas',
    tags: ['midstream', 'natural_gas', 'NGL', 'gathering', 'processing', 'pipelines'],
  },
  'LXFR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gas Cylinders & Specialty Materials',
    tags: ['gas_cylinders', 'composite_cylinders', 'magnesium', 'alternative_fuel'],
  },
  'MBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cabinetry',
    tags: ['cabinets', 'vanities', 'residential', 'remodeling', 'new_construction'],
  },
  'MHK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Flooring',
    tags: ['carpet', 'tile', 'laminate', 'hardwood', 'vinyl', 'flooring'],
  },
  'MMS': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Government Services',
    tags: ['government_IT', 'health_services', 'benefits_administration', 'BPO'],
  },
  'MSA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Safety Equipment',
    tags: ['safety', 'gas_detection', 'SCBA', 'fall_protection', 'head_protection'],
  },
  'MTW': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cranes & Lifting',
    tags: ['cranes', 'crawler', 'tower_cranes', 'boom_trucks', 'lifting'],
  },
  'NPO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Engineered Seals & Components',
    tags: ['seals', 'gaskets', 'polymer', 'semiconductor_components', 'fluid_handling'],
  },
  'NX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['windows', 'screens', 'vinyl_profiles', 'insulating_glass', 'fenestration'],
  },
  'SEB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agribusiness & Transport',
    tags: ['pork', 'grain', 'sugar', 'shipping', 'power_generation', 'diversified'],
  },
  'SSD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Structural Connectors',
    tags: ['connectors', 'anchors', 'fasteners', 'wood_construction', 'lateral_systems'],
  },
  'TKR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bearings & Power Transmission',
    tags: ['bearings', 'power_transmission', 'gears', 'chain', 'lubrication_systems'],
  },
  'TRNS': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Calibration & Testing',
    tags: ['calibration', 'testing', 'metrology', 'instruments', 'lab_services'],
  },
  'UTL': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'distribution', 'regulated', 'New_England'],
  },
  'WDFC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Maintenance Products',
    tags: ['lubricants', 'maintenance', 'multi_use', 'cleaning', 'specialist_products'],
  },
  'WOR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel Processing',
    tags: ['steel_processing', 'pressure_cylinders', 'metal_framing', 'laser_welding'],
  },

  // ========================================================
  // Consumer / Retail / Services (New Batch)
  // ========================================================

  'BGFV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sporting Goods Retail',
    tags: ['sporting_goods', 'outdoor', 'footwear', 'apparel', 'value'],
  },
  'BNED': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Educational Retail',
    tags: ['textbooks', 'college', 'education', 'campus_stores', 'courseware'],
  },
  'BOWL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Entertainment Venues',
    tags: ['bowling', 'entertainment', 'leisure', 'events', 'food_beverage'],
  },
  'BWMX': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Products Direct Sales',
    tags: ['home_products', 'direct_sales', 'Mexico', 'household', 'kitchenware'],
  },
  'COCO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Natural Beverages',
    tags: ['coconut_water', 'natural', 'beverages', 'health', 'hydration'],
  },
  'COOK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Outdoor Cooking',
    tags: ['grills', 'pellets', 'outdoor_cooking', 'BBQ', 'connected_home'],
  },
  'CURV': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Plus-Size Fashion Retail',
    tags: ['plus_size', 'fashion', 'inclusive', 'apparel', 'e_commerce'],
  },
  'DIN': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Casual Dining Franchise',
    tags: ['IHOP', 'Applebees', 'franchise', 'casual_dining', 'breakfast'],
  },
  'DLTH': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Workwear Retail',
    tags: ['workwear', 'outdoor', 'durable', 'direct_to_consumer', 'casual'],
  },
  'DSGR': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Distribution',
    tags: ['distribution', 'industrial', 'MRO', 'specialty', 'value_add'],
  },
  'EXPR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fashion Retail',
    tags: ['fashion', 'apparel', 'young_adult', 'mall', 'casual'],
  },
  'FTDR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Warranty Services',
    tags: ['home_warranty', 'home_services', 'repair', 'maintenance', 'subscription'],
  },
  'GRWG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hydroponics Retail',
    tags: ['hydroponics', 'indoor_growing', 'gardening', 'cannabis', 'supplies'],
  },
  'HRMY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['narcolepsy', 'sleep_disorders', 'rare_disease', 'CNS', 'orphan_drug'],
  },
  'IBTA': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Rewards Platform',
    tags: ['cashback', 'loyalty', 'rewards', 'mobile_app', 'performance_marketing'],
  },
  'LMNR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Citrus Agriculture',
    tags: ['lemons', 'avocados', 'citrus', 'agriculture', 'real_estate'],
  },
  'LQDT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Surplus Asset Marketplace',
    tags: ['auction', 'surplus', 'liquidation', 'government', 'reverse_logistics'],
  },
  'LVLU': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fashion E-commerce',
    tags: ['fashion', 'e_commerce', 'young_women', 'affordable', 'occasion_wear'],
  },
  'MGPI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Distilled Spirits',
    tags: ['whiskey', 'bourbon', 'distillery', 'spirits', 'premium_brands'],
  },
  'NAPA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Premium Wine',
    tags: ['wine', 'premium', 'Napa_Valley', 'vineyard', 'luxury_beverage'],
  },
  'NGVT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['activated_carbon', 'pavement', 'oilfield', 'specialty_chemicals', 'pine_based'],
  },
  'ODP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Office Products Retail',
    tags: ['office_supplies', 'technology', 'business_services', 'printing', 'furniture'],
  },
  'SGH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Computing Solutions',
    tags: ['memory', 'LED', 'computing', 'enterprise', 'specialty_solutions'],
  },
  'TACO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Quick Service Restaurant',
    tags: ['Mexican_food', 'fast_food', 'drive_thru', 'franchise', 'value_menu'],
  },
  'THO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Recreational Vehicles',
    tags: ['RV', 'motorhome', 'travel_trailer', 'outdoor', 'camping'],
  },
  'TUP': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Storage Products',
    tags: ['storage', 'kitchen', 'direct_sales', 'plastic', 'household'],
  },
  'TVTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rare Disease Therapeutics',
    tags: ['kidney', 'rare_disease', 'nephrology', 'orphan_drug', 'IgA_nephropathy'],
  },
  'VLTO': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Quality & Product ID',
    tags: ['water_treatment', 'product_quality', 'analytics', 'testing', 'environmental'],
  },
  'WINA': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Resale Franchise',
    tags: ['resale', 'franchise', 'thrift', 'consignment', 'sustainable'],
  },

  // ========================================================
  // 补充: Healthcare Biotech (2026-01 batch)
  // ========================================================

  // Neurodegeneration Biotech
  'DNLI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['neurodegeneration', 'blood_brain_barrier', 'lysosomal', 'neuroscience'],
  },
  // Neuropsychiatry Biotech
  'PRAX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['neuropsychiatry', 'ion_channel', 'epilepsy', 'mood_disorders'],
  },
  // Pediatric Oncology
  'DAWN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['pediatric_oncology', 'brain_tumor', 'raf_inhibitor', 'rare_cancer'],
  },
  // Nephrology Biotech
  'VERA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['nephrology', 'iga_nephropathy', 'kidney_disease', 'autoimmune'],
  },
  // Immuno-Oncology (T-cell engager)
  'JANX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['immuno_oncology', 'tce', 'bispecific', 'tumor_activated'],
  },
  // Hematology/Oncology (anti-CD20)
  'TGTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['hematology', 'ms', 'lymphoma', 'anti_cd20'],
  },
  // Adjuvant/Vaccines
  'DNAB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['adjuvant', 'vaccines', 'cpg_1018', 'hepatitis_b'],
  },
  // Gene Editing (Prime Editing)
  'PRME': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['gene_editing', 'prime_editing', 'genetic_medicine', 'precision'],
  },
  // Hematology/Bone
  'KROS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['hematology', 'bone_disorders', 'tgf_beta', 'myelofibrosis'],
  },

  // ========== Russell 2000 / S&P 600 Diversification Batch ==========

  // HR/Benefits SaaS
  'ALIT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HR Tech',
    tags: ['benefits_administration', 'payroll', 'cloud_HR', 'employee_engagement'],
  },

  // Digital Consulting/IT Services
  'PRFT': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Consulting',
    tags: ['digital_transformation', 'cloud_migration', 'data_analytics', 'custom_development'],
  },

  // Freelance Marketplace
  'UPWK': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Freelance Marketplace',
    tags: ['gig_economy', 'remote_work', 'talent_marketplace', 'freelance_platform'],
  },

  // Online Education Platform
  'COUR': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Online Education',
    tags: ['e_learning', 'university_partnerships', 'professional_certificates', 'enterprise_training'],
  },

  // Sports Data/Betting Tech
  'GENI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Sports Data',
    tags: ['sports_data', 'betting_technology', 'live_streaming', 'integrity_services'],
  },

  // Quantum Computing
  'IONQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Quantum Computing',
    tags: ['trapped_ion', 'quantum_cloud', 'quantum_hardware', 'enterprise_quantum'],
  },
  'RGTI': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Quantum Computing',
    tags: ['superconducting_qubits', 'quantum_cloud', 'hybrid_quantum', 'quantum_processors'],
  },
  'QBTS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Quantum Computing',
    tags: ['quantum_annealing', 'optimization', 'quantum_cloud', 'enterprise_solutions'],
  },

  // Semiconductor/Connectivity
  'ALAB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor',
    tags: ['connectivity_ICs', 'data_center', 'PCIe_retimers', 'AI_infrastructure'],
  },

  // Bitcoin Mining
  'WULF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin_mining', 'renewable_energy', 'data_center', 'nuclear_power'],
  },
  'CIFR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin_mining', 'data_center', 'power_infrastructure', 'zero_carbon'],
  },
  'HUT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin_mining', 'data_center', 'HPC', 'AI_infrastructure', 'colocation'],
  },
  'BTDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crypto Mining',
    tags: ['bitcoin_mining', 'ASIC_design', 'data_center', 'chip_manufacturing', 'usage_based'],
  },

  // ========================================================
  // Biotech / Pharma - Emerging & Specialty (Batch 2)
  // ========================================================

  'ALKS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['cns', 'addiction', 'schizophrenia', 'long_acting_injectable'],
  },
  'APLS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['complement', 'ophthalmology', 'rare_disease', 'pnh'],
  },
  'AGIO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['rare_disease', 'oncology', 'cell_metabolism', 'genetic'],
  },
  'AKRO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['nash', 'metabolic', 'liver', 'fgf21'],
  },
  'ARWR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['rnai', 'sirna', 'liver', 'cardiovascular', 'genetic'],
  },
  'AXSM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['cns', 'depression', 'migraine', 'alzheimers'],
  },
  'BHVN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['neuroscience', 'pain', 'migraine', 'cgrp'],
  },
  'CORT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['endocrinology', 'cushings', 'cortisol', 'rare_disease'],
  },
  'ENTA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['antiviral', 'hepatitis', 'rsv', 'protease_inhibitor'],
  },
  'FGEN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['anemia', 'fibrosis', 'hif_inhibitor', 'oncology'],
  },
  'GERN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['hematology', 'telomerase', 'mds', 'myelofibrosis'],
  },
  'GLPG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['inflammation', 'fibrosis', 'autoimmune', 'cell_therapy'],
  },
  'GOSS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['immunology', 'oncology', 'inflammation', 'pah'],
  },
  'HZNP': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['rare_disease', 'inflammation', 'thyroid_eye', 'gout'],
  },
  'IDYA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['precision_oncology', 'synthetic_lethality', 'biomarker', 'targeted'],
  },
  'IMGO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['hematology', 'myeloproliferative', 'lsd1_inhibitor'],
  },
  'ITCI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['cns', 'schizophrenia', 'bipolar', 'pimavanserin'],
  },
  'KALA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['ophthalmology', 'gene_therapy', 'retinal', 'rare_disease'],
  },
  'LQDA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['pulmonary', 'pah', 'inhaled', 'drug_delivery'],
  },
  'MGNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['oncology', 'antibody', 'bispecific', 'immuno_oncology'],
  },
  'MIRM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['liver_disease', 'cholestatic', 'pediatric', 'rare_disease'],
  },
  'MRVI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Tools',
    tags: ['nucleic_acid', 'mrna', 'oligonucleotide', 'cdmo'],
  },
  'NKTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['cell_therapy', 'nk_cell', 'car_nk', 'oncology'],
  },
  'OLMA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['oncology', 'breast_cancer', 'estrogen_receptor', 'endocrine'],
  },
  'PTGX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['peptide', 'gi_disease', 'hematology', 'injectable'],
  },
  'RCUS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['immuno_oncology', 'checkpoint', 'anti_tigit', 'combination'],
  },
  'RETA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['rare_disease', 'nrf2', 'friedreichs_ataxia', 'neurology'],
  },
  'RLAY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['precision_medicine', 'computational', 'oncology', 'genetic'],
  },
  'RXDX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['gi_autoimmune', 'ibd', 'ulcerative_colitis', 'precision'],
  },
  'SAVA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['alzheimers', 'neurodegenerative', 'simufilam', 'cns'],
  },
  'SLNO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['prader_willi', 'rare_disease', 'hyperphagia', 'pediatric'],
  },
  'SMMT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['oncology', 'anti_pd1', 'lung_cancer', 'ivonescimab'],
  },
  'VCNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['neuroscience', 'semaphorin', 'huntingtons', 'anti_inflammatory'],
  },
  'VKTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['metabolic', 'nash', 'obesity', 'glp1'],
  },
  'VRDN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['thyroid_eye', 'endocrinology', 'antibody', 'igf1r'],
  },
  'XERS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['endocrinology', 'glucagon', 'diabetes', 'drug_delivery'],
  },
  'YMAB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['pediatric_cancer', 'neuroblastoma', 'antibody', 'orphan'],
  },
  'ZNTL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biotech',
    tags: ['oncology', 'targeted', 'cdk', 'bcl2'],
  },

  // ========================================================
  // Tech/Software/Internet Batch
  // ========================================================

  'AGYS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Hospitality Technology',
    tags: ['hospitality', 'PMS', 'POS', 'hotel_tech', 'SaaS'],
  },
  'AVLR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Tax Compliance SaaS',
    tags: ['tax_automation', 'compliance', 'e_commerce', 'ERP_integration', 'SaaS'],
  },
  'AYX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Analytics Platform',
    tags: ['data_analytics', 'self_service', 'ETL', 'data_science', 'automation'],
  },
  'BASE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Database Software',
    tags: ['NoSQL', 'database', 'cloud_native', 'distributed', 'JSON'],
  },
  'BLZE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cloud Storage',
    tags: ['cloud_storage', 'backup', 'B2_cloud', 'object_storage', 'SMB'],
  },
  'BSY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Infrastructure Engineering Software',
    tags: ['infrastructure', 'digital_twins', 'BIM', 'CAD', 'AEC'],
  },
  'CDAY': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'HCM/Payroll SaaS',
    tags: ['HCM', 'payroll', 'workforce_management', 'Dayforce', 'HR_tech'],
  },
  'CLBT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Digital Intelligence',
    tags: ['digital_forensics', 'law_enforcement', 'intelligence', 'mobile_data', 'security'],
  },
  'DLO': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cross-Border Payments',
    tags: ['payments', 'emerging_markets', 'cross_border', 'fintech', 'merchants'],
  },
  'DOMO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Intelligence SaaS',
    tags: ['BI', 'analytics', 'data_visualization', 'dashboards', 'cloud_BI'],
  },
  'EVCM': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'SMB Vertical SaaS',
    tags: ['SMB', 'vertical_SaaS', 'home_services', 'health_services', 'fitness'],
  },
  'EVBG': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mass Notification SaaS',
    tags: ['mass_notification', 'critical_events', 'emergency', 'public_safety', 'enterprise'],
  },
  'FIVN': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Contact Center as a Service',
    tags: ['CCaaS', 'contact_center', 'cloud_communications', 'AI_agent', 'CX'],
  },
  'FSLY': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Edge Computing/CDN',
    tags: ['CDN', 'edge_computing', 'security', 'serverless', 'streaming'],
  },
  'GETY': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Visual Content Platform',
    tags: ['stock_photos', 'visual_media', 'creative', 'licensing', 'AI_generated'],
  },
  'HLIT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Video Infrastructure',
    tags: ['video_streaming', 'broadcast', 'cable', 'SaaS', 'encoding'],
  },
  'INTA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Professional Services Tech',
    tags: ['legal_tech', 'accounting', 'consulting', 'deal_management', 'CRM'],
  },
  'KNBE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Security Awareness Training',
    tags: ['cybersecurity', 'phishing', 'training', 'compliance', 'human_risk'],
  },
  'KORE': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IoT Connectivity',
    tags: ['IoT', 'connectivity', 'eSIM', 'fleet_management', 'M2M'],
  },
  'LIDR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LiDAR Sensors',
    tags: ['lidar', 'ADAS', 'autonomous', 'perception', 'sensors'],
  },
  'MDAI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Medical Diagnostics',
    tags: ['AI_diagnostics', 'wound_care', 'burn_assessment', 'imaging', 'clinical'],
  },
  'NATI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Test & Measurement',
    tags: ['test_measurement', 'automated_test', 'instrumentation', 'LabVIEW', 'industrial'],
  },
  'OOMA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cloud Communications',
    tags: ['VoIP', 'UCaaS', 'SMB', 'residential', 'cloud_phone'],
  },
  'OS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Corporate Performance Management',
    tags: ['CPM', 'financial_planning', 'consolidation', 'reporting', 'enterprise'],
  },
  'PAX': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Management',
    tags: ['private_equity', 'infrastructure', 'real_estate', 'LatAm', 'alternatives'],
  },
  'PERI': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising Tech',
    tags: ['ad_tech', 'CTV', 'programmatic', 'search', 'display'],
  },
  'QUBT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Quantum Computing Software',
    tags: ['quantum', 'optimization', 'machine_learning', 'photonic', 'enterprise'],
  },
  'RCAT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Drone Technology',
    tags: ['drones', 'UAV', 'defense', 'FPV', 'autonomous'],
  },
  'RDVT': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Analytics Platform',
    tags: ['identity', 'fraud_detection', 'risk_analytics', 'public_records', 'investigations'],
  },
  'SCWX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Managed Security Services',
    tags: ['MSSP', 'MDR', 'threat_detection', 'SOC', 'cybersecurity'],
  },
  'SMWB': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Intelligence Platform',
    tags: ['web_analytics', 'competitive_intelligence', 'market_research', 'digital_marketing', 'benchmarking'],
  },
  'SPNS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Technology',
    tags: ['insurtech', 'core_systems', 'policy_admin', 'claims', 'digital_insurance'],
  },
  'VMEO': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Video Platform SaaS',
    tags: ['video', 'streaming', 'enterprise_video', 'OTT', 'creator_tools'],
  },
  'VYX': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Retail/Restaurant POS',
    tags: ['POS', 'retail_tech', 'restaurant_tech', 'payments', 'commerce_platform'],
  },
  'WEAV': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Communications',
    tags: ['healthcare', 'patient_engagement', 'VoIP', 'text', 'SMB_health'],
  },
  'WKME': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Adoption Platform',
    tags: ['DAP', 'user_onboarding', 'workflow_automation', 'analytics', 'enterprise'],
  },
  'ZUO': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Subscription Management',
    tags: ['subscription_billing', 'revenue_recognition', 'monetization', 'SaaS', 'recurring_revenue'],
  },

  // ========================================================
  // Consumer/Retail/Food 补充 (2026-01 batch)
  // ========================================================

  // --- Breakfast/Brunch Restaurant ---
  'FWRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fast Casual Restaurant',
    tags: ['breakfast', 'brunch', 'daytime_dining', 'fresh_ingredients', 'fast_casual'],
  },

  // --- Oncology Biotech ---
  'NUVB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oncology Biotech',
    tags: ['oncology', 'clinical_stage', 'small_molecule', 'cancer', 'drug_development'],
  },

  // ========== 新增46只: Industrial/Defense/Aerospace/Transport (2026-01-24) ==========

  // --- Patent Licensing ---
  'ACTG': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Patent Licensing',
    tags: ['patents', 'IP_monetization', 'licensing', 'technology_rights'],
  },
  // --- Marketing Services ---
  'ADS': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Marketing & Loyalty Services',
    tags: ['loyalty', 'data_analytics', 'card_services', 'marketing'],
  },
  // --- Accessibility Tech ---
  'AEYE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Accessibility',
    tags: ['accessibility', 'SaaS', 'compliance', 'web_technology'],
  },
  // --- Renewable Utility ---
  'AGR': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Renewable Utility',
    tags: ['wind_energy', 'electric_utility', 'regulated', 'renewable'],
  },
  // --- Diversified REIT ---
  'AHH': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified REIT',
    tags: ['office', 'retail', 'multifamily', 'mixed_use', 'project_based'],
  },
  // --- Aerospace Composites ---
  'AIN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Composites',
    tags: ['composites', 'paper_machine_clothing', 'aerospace', 'engineered_materials'],
  },
  // --- Rocket Propulsion ---
  'AJRD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Rocket Propulsion',
    tags: ['propulsion', 'defense', 'space', 'missiles', 'hypersonics'],
  },
  // --- Transmission Systems ---
  'ALSN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Transmission Systems',
    tags: ['transmissions', 'commercial_vehicles', 'defense', 'hybrid_propulsion'],
  },
  // --- Semiconductor Packaging ---
  'AMKR': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Semiconductor Packaging & Test',
    tags: ['OSAT', 'packaging', 'advanced_packaging', 'semiconductor_test'],
  },
  // --- Power Electronics ---
  'AMSC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Electronics & Superconductors',
    tags: ['superconductor', 'grid', 'wind', 'power_electronics', 'navy'],
  },
  // --- Air Cargo Transport ---
  'ATSG': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Air Cargo Transport',
    tags: ['air_freight', 'cargo_aircraft', 'leasing', 'ACMI', 'logistics'],
  },
  // --- Aerospace Electronics ---
  'ATRO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Electronics',
    tags: ['aircraft_lighting', 'power_systems', 'avionics', 'connectivity'],
  },
  // --- Aerospace/Industrial Components ---
  'B': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace & Industrial Components',
    tags: ['springs', 'aerospace_OEM', 'molding', 'precision_components'],
  },
  // --- Industrial Conglomerate ---
  'BBU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Industrial Conglomerate',
    tags: ['infrastructure', 'industrials', 'private_equity', 'operations'],
  },
  // --- Satellite Imagery ---
  'BKSY': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Geospatial Intelligence',
    tags: ['satellites', 'earth_observation', 'geospatial', 'defense_intel'],
  },
  // --- Fuel Cells ---
  'BLDP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fuel Cell Systems',
    tags: ['hydrogen', 'fuel_cells', 'PEM', 'clean_energy', 'heavy_duty'],
  },
  // --- Trade Finance ---
  'BLX': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Trade Finance',
    tags: ['latin_america', 'trade_finance', 'foreign_trade', 'banking'],
  },
  // --- Wind Energy Components ---
  'BWEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Wind Energy Components',
    tags: ['wind_towers', 'gearing', 'heavy_fabrication', 'renewable'],
  },
  // --- Biologics CDMO ---
  'CDMO': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biologics CDMO',
    tags: ['CDMO', 'biologics', 'cell_culture', 'drug_manufacturing'],
  },
  // --- Flow Control ---
  'CIR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flow Control Equipment',
    tags: ['valves', 'pumps', 'flow_control', 'aerospace', 'industrial'],
  },
  // --- Specialty Alloys ---
  'CRS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Alloys',
    tags: ['specialty_steel', 'titanium', 'superalloys', 'aerospace', 'defense'],
  },
  // --- Defense Electronics ---
  'DRS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Defense Electronics',
    tags: ['sensors', 'electronic_warfare', 'C4ISR', 'naval_systems'],
  },
  // --- Acoustic/Mass Notification ---
  'GNSS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Mass Notification Systems',
    tags: ['LRAD', 'acoustic', 'mass_notification', 'public_safety'],
  },
  // --- Gas Processing Equipment ---
  'GTLS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gas Processing Equipment',
    tags: ['cryogenics', 'LNG', 'heat_exchangers', 'hydrogen', 'gas_processing'],
  },
  // --- MRO Distribution ---
  'HDS': {
    assetModel: 'asset_heavy',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'MRO Distribution',
    tags: ['facilities_maintenance', 'MRO', 'distribution', 'waterworks'],
  },
  // --- Aerospace Replacement Parts ---
  'HEICO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aerospace Replacement Parts',
    tags: ['PMA_parts', 'aerospace_aftermarket', 'electronic_components', 'defense'],
  },
  // --- Motorcycles ---
  'HOG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Motorcycles',
    tags: ['motorcycles', 'powersports', 'lifestyle', 'brand', 'dealer_network'],
  },
  // --- Digital Textile Printing ---
  'KRNT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Textile Printing',
    tags: ['digital_printing', 'textile', 'ink', 'industrial_printing'],
  },
  // --- Building Products/OSB ---
  'LPX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Engineered Wood Products',
    tags: ['OSB', 'siding', 'structural_panels', 'housing', 'building_products'],
  },
  // --- Enterprise Software Legacy ---
  'MFGP': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Software',
    tags: ['legacy_software', 'mainframe', 'COBOL', 'IT_operations'],
  },
  // --- Equipment Rental ---
  'MGRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Modular Equipment Rental',
    tags: ['modular_buildings', 'electronic_test', 'rental', 'portable_storage'],
  },
  // --- Copper Products ---
  'MLI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Copper & Brass Products',
    tags: ['copper_tube', 'fittings', 'HVAC', 'plumbing', 'refrigeration'],
  },
  // --- Advanced Materials ---
  'MTRN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Advanced Materials',
    tags: ['beryllium', 'precision_alloys', 'thin_film', 'semiconductor', 'defense'],
  },
  // --- Flexible Piping ---
  'OFLX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flexible Piping Systems',
    tags: ['CSST', 'gas_piping', 'flexible_pipe', 'residential', 'commercial'],
  },
  // --- Premium Apparel ---
  'OXM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Premium Apparel',
    tags: ['Tommy_Bahama', 'Lilly_Pulitzer', 'lifestyle', 'resort_wear'],
  },
  // --- Utility Hardware ---
  'PLPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Utility Hardware',
    tags: ['power_line', 'telecom_hardware', 'cable_anchors', 'fiber_optic'],
  },
  // --- Water Treatment ---
  'PNR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water Treatment & Flow Control',
    tags: ['water_treatment', 'filtration', 'pumps', 'pool_equipment', 'sustainable_water'],
  },
  // --- Precision Ag/Defense ---
  'RAVN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Agriculture & Defense',
    tags: ['precision_ag', 'aerostar', 'defense_drones', 'composites'],
  },
  // --- Truck Dealerships ---
  'RUSHA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Truck Dealerships',
    tags: ['truck_sales', 'Peterbilt', 'aftermarket_parts', 'leasing', 'service'],
  },
  // --- Deep-Sea Mining ---
  'TMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Deep-Sea Mining',
    tags: ['polymetallic_nodules', 'nickel', 'cobalt', 'manganese', 'ocean_mining'],
  },
  // --- Completion Fluids ---
  'TTI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Completion Fluids & Water Management',
    tags: ['completion_fluids', 'water_management', 'calcium_chloride', 'oilfield'],
  },
  // --- Moving & Storage ---
  'UHAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Moving & Storage',
    tags: ['truck_rental', 'self_storage', 'moving', 'trailers', 'consumer'],
  },
  // --- Automotive Services ---
  'VVV': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Automotive Preventive Maintenance',
    tags: ['oil_change', 'quick_lube', 'automotive_services', 'franchise'],
  },
  // --- Traffic Solutions ---
  'VRRM': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2G',
    industrySegment: 'Traffic Management Solutions',
    tags: ['tolling', 'photo_enforcement', 'violations', 'smart_mobility'],
  },
  // --- Trailer Manufacturing ---
  'WNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Trailer Manufacturing',
    tags: ['dry_van', 'refrigerated', 'platform', 'tank_trailers'],
  },
  // --- Modular Space Solutions ---
  'WSC': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Modular Space & Storage',
    tags: ['modular_buildings', 'portable_storage', 'construction', 'temporary_space'],
  },

  // ========== 新增50只: Energy, Utilities, Mining, Materials (2026-01-24) ==========

  // --- Oil & Gas E&P ---
  'AMPY': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'onshore', 'rockies', 'uinta_basin', 'mature_assets'],
  },
  'BRY': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'california', 'thermal_EOR', 'low_decline', 'conventional'],
  },
  'CPE': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'permian', 'delaware_basin', 'shale', 'horizontal'],
  },
  'CNX': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['upstream', 'appalachian', 'marcellus', 'natural_gas', 'shale'],
  },
  'DEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'permian', 'midland_basin', 'horizontal', 'unconventional'],
  },
  'ERF': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'canada', 'waterfloods', 'conventional', 'heavy_oil'],
  },
  'KOS': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'offshore', 'ghana', 'west_africa', 'deepwater'],
  },
  'NFG': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'throughput_fee', 'regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Gas',
    tags: ['upstream', 'midstream', 'utility', 'seneca', 'appalachian'],
  },
  'OAS': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['upstream', 'bakken', 'williston', 'shale', 'horizontal'],
  },
  'EQNR': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil & Gas',
    tags: ['upstream', 'offshore', 'norway', 'north_sea', 'renewables'],
  },
  'YPF': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil & Gas',
    tags: ['upstream', 'downstream', 'argentina', 'vaca_muerta', 'shale'],
  },
  'BKV': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas E&P',
    tags: ['upstream', 'natural_gas', 'barnett', 'marcellus', 'carbon_capture'],
  },
  'TPL': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Royalties',
    tags: ['royalties', 'permian', 'land_trust', 'water_sales', 'mineral_rights'],
  },
  'PBT': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Royalties',
    tags: ['royalties', 'permian', 'trust', 'net_profits_interest', 'waddell_ranch'],
  },
  'BSM': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Minerals',
    tags: ['minerals', 'royalties', 'diversified_basins', 'non_operated', 'MLP'],
  },

  // --- Midstream / Pipeline / Gathering ---
  'ENB': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['pipeline', 'oil_sands', 'natural_gas', 'canada', 'liquids'],
  },
  'TRP': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['pipeline', 'natural_gas', 'canada', 'regulated', 'power_generation'],
  },
  'PAA': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'gathering'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Pipeline',
    tags: ['pipeline', 'crude_oil', 'NGL', 'gathering', 'MLP'],
  },
  'GEL': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Services',
    tags: ['pipeline', 'sulfur', 'NaOH', 'marine_transport', 'industrial_gases'],
  },
  'GPP': {
    assetModel: 'asset_heavy',
    revenueModels: ['gathering', 'throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Gathering',
    tags: ['gathering', 'processing', 'natural_gas', 'NGL', 'MLP'],
  },
  'MMLP': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Terminals',
    tags: ['terminals', 'storage', 'marine', 'specialty_products', 'MLP'],
  },
  'NRP': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Resource Royalties',
    tags: ['coal_royalties', 'mineral_rights', 'aggregates', 'oil_gas', 'MLP'],
  },
  'SUN': {
    assetModel: 'asset_heavy',
    revenueModels: ['distribution', 'throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fuel Distribution',
    tags: ['fuel_distribution', 'convenience_stores', 'pipeline', 'MLP', 'refined_products'],
  },
  'TEP': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'gathering'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Gathering',
    tags: ['gathering', 'processing', 'natural_gas', 'rockies', 'piceance'],
  },

  // --- LNG / Gas Shipping ---
  'LPG': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LPG Shipping',
    tags: ['shipping', 'LPG', 'ammonia', 'VLGC', 'seaborne_trade'],
  },
  'TGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas Transport',
    tags: ['pipeline', 'argentina', 'natural_gas', 'midstream', 'regulated'],
  },

  // --- Offshore Drilling & Services ---
  'SDRL': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Drilling',
    tags: ['drilling', 'deepwater', 'harsh_environment', 'drillships', 'semi_submersible'],
  },
  'OIS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['tubular', 'downhole', 'offshore', 'completion', 'well_equipment'],
  },
  'PDS': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['drilling', 'completion', 'canada', 'onshore', 'contract_drilling'],
  },
  'VTOL': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'leasing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Aviation',
    tags: ['helicopter', 'offshore', 'oil_gas', 'SAR', 'air_medical'],
  },
  'SBR': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oilfield Services',
    tags: ['workover', 'well_servicing', 'completion', 'onshore', 'permian'],
  },
  'MRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'PVF Distribution',
    tags: ['pipes_valves_fittings', 'distribution', 'oil_gas', 'industrial', 'utilities'],
  },
  'CVEO': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Workforce Solutions',
    tags: ['remote_camps', 'workforce_housing', 'catering', 'oil_sands', 'mining'],
  },

  // --- Shipping ---
  'NMM': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dry Bulk Shipping',
    tags: ['dry_bulk', 'containership', 'tanker', 'diversified_fleet', 'navios'],
  },
  'ATCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Container Leasing',
    tags: ['container_leasing', 'logistics', 'intermodal', 'fleet_management'],
  },

  // --- Utilities ---
  'AQN': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Diversified Utilities',
    tags: ['electric', 'gas', 'water', 'renewable', 'regulated'],
  },
  'PNM': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utility',
    tags: ['electric', 'new_mexico', 'texas', 'regulated', 'generation'],
  },
  'EE': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utility',
    tags: ['electric', 'brazil', 'distribution', 'regulated', 'latin_america'],
  },
  'CIG': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utility',
    tags: ['electric', 'brazil', 'generation', 'transmission', 'regulated'],
  },
  'TU': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Telecom Utility',
    tags: ['telecom', 'broadband', 'wireless', 'canada', 'fiber'],
  },
  'UGI': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility', 'distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'propane', 'distribution', 'regulated', 'midstream'],
  },

  // --- Coal ---
  'BTU': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Coal Mining',
    tags: ['thermal_coal', 'met_coal', 'seaborne', 'PRB', 'australia'],
  },
  'CEIX': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Coal Mining',
    tags: ['met_coal', 'thermal_coal', 'appalachian', 'export', 'high_BTU'],
  },

  // --- Mining & Metals ---
  'KGC': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'silver', 'americas', 'west_africa', 'senior_producer'],
  },
  'MGX': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Iron Ore Mining',
    tags: ['iron_ore', 'mining', 'brazil', 'pellets', 'steel_feedstock'],
  },
  'GLNCY': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Mining & Trading',
    tags: ['copper', 'zinc', 'coal', 'commodity_trading', 'cobalt'],
  },

  // --- Refining & Downstream ---
  'CLMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Refining',
    tags: ['re_refining', 'used_oil', 'base_oil', 'circular_economy', 'specialty_chemicals'],
  },
  'LXU': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Chemicals & Fertilizers',
    tags: ['nitrogen', 'ammonia', 'UAN', 'fertilizer', 'industrial_chemicals'],
  },

  // --- Clean Energy / Renewables ---
  'AMRC': {
    assetModel: 'asset_light',
    revenueModels: ['project_based', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Energy Efficiency',
    tags: ['energy_efficiency', 'renewable_infrastructure', 'federal', 'ESG', 'carbon_reduction'],
  },
  'IREN': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bitcoin Mining / Data Center',
    tags: ['bitcoin_mining', 'data_center', 'renewable_energy', 'HPC', 'AI_cloud'],
  },
  'CLW': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biomass & Specialty Products',
    tags: ['paperboard', 'biomass', 'tissue', 'pulp', 'renewable_fiber'],
  },
  'OPAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Carbon Black & Specialty Chemicals',
    tags: ['carbon_black', 'specialty_chemicals', 'rubber', 'tire', 'industrial'],
  },
  'ENIC': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utility',
    tags: ['electric', 'chile', 'renewable', 'hydro', 'latin_america'],
  },

  // --- Oilfield Support / Energy Services ---
  'MPLN': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Midstream Services',
    tags: ['water_management', 'produced_water', 'recycling', 'permian', 'disposal'],
  },
  'TAC': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Construction & Industrial Services',
    tags: ['turnaround', 'maintenance', 'industrial_construction', 'refinery', 'petrochemical'],
  },
  'GTN': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Natural Gas Pipeline',
    tags: ['pipeline', 'natural_gas', 'pacific_northwest', 'regulated', 'interstate'],
  },

  // ========== 新增50只: Healthcare / Biotech / MedTech (2026-01-24) ==========

  // --- Plasma-Derived Biologics ---
  'ADMA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Plasma-Derived Therapeutics',
    tags: ['plasma', 'immunoglobulin', 'biologics', 'specialty_pharma', 'rare_disease'],
  },
  // --- Immuno-Oncology ---
  'AGEN': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['checkpoint_inhibitor', 'antibody', 'oncology', 'clinical_stage', 'immunotherapy'],
  },
  // --- Anti-Inflammatory Biotech ---
  'ALLK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Allergy/Immunology Biotech',
    tags: ['allergy', 'eosinophil', 'inflammation', 'biologic', 'clinical_stage'],
  },
  // --- Specialty Generics ---
  'AMPH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['generic', 'complex_injectable', 'hospital', 'specialty_generic', 'ANDA'],
  },
  // --- Antibody Biotech ---
  'ANAB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Autoimmune Biotech',
    tags: ['antibody', 'autoimmune', 'dermatology', 'inflammation', 'biologic'],
  },
  // --- Gene Therapy ---
  'APGE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Editing Biotech',
    tags: ['gene_editing', 'epigenetics', 'liver', 'cardiovascular', 'clinical_stage'],
  },
  // --- Radiation Therapy ---
  'ARAY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Radiation Oncology Equipment',
    tags: ['radiation_therapy', 'oncology', 'medical_device', 'treatment_planning', 'linac'],
  },
  // --- Neuroscience Biotech ---
  'ATHA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['alzheimer', 'neurodegenerative', 'clinical_stage', 'CNS', 'precision_medicine'],
  },
  // --- Nephrology Biotech ---
  'AUPH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nephrology Biotech',
    tags: ['lupus_nephritis', 'kidney', 'autoimmune', 'voclosporin', 'specialty_pharma'],
  },
  // --- Oncology Biotech ---
  'AVEO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oncology Biotech',
    tags: ['renal_cell_carcinoma', 'VEGF', 'oncology', 'tivozanib', 'targeted_therapy'],
  },
  // --- Biopharma Discovery ---
  'BBI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Clinical-Stage Biotech',
    tags: ['oncology', 'clinical_stage', 'small_molecule', 'targeted_therapy', 'pipeline'],
  },
  // --- Antibody Drug Conjugate ---
  'BCAB': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'ADC Biotech',
    tags: ['antibody_drug_conjugate', 'oncology', 'clinical_stage', 'ADC', 'bispecific'],
  },
  // --- Precision Oncology ---
  'BDTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Oncology Biotech',
    tags: ['mutation_selective', 'oncology', 'small_molecule', 'precision_medicine', 'allosteric'],
  },
  // --- Genomic Imaging ---
  'BNGO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Genomic Analysis Tools',
    tags: ['optical_genome_mapping', 'cytogenetics', 'diagnostics', 'structural_variant', 'research_tools'],
  },
  // --- Pain/Pruritus Biotech ---
  'CARA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pain/Pruritus Biotech',
    tags: ['pruritus', 'pain', 'kappa_opioid', 'nephrology', 'dermatology'],
  },
  // --- Biosimilars ---
  'CHRS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Biosimilars',
    tags: ['biosimilar', 'oncology', 'immunology', 'ophthalmology', 'affordable_biologics'],
  },
  // --- Digital Therapeutics ---
  'CLPT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Digital Therapeutics',
    tags: ['digital_health', 'prescription_digital', 'insomnia', 'behavioral_health', 'SaMD'],
  },
  // --- Ophthalmology Biotech ---
  'DCPH': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmology Biotech',
    tags: ['ophthalmology', 'retinal', 'gene_therapy', 'rare_disease', 'clinical_stage'],
  },
  // --- Vaccine Biotech ---
  'DVAX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vaccine Biotech',
    tags: ['vaccine', 'adjuvant', 'hepatitis_B', 'immunology', 'commercial_stage'],
  },
  // --- Gene Therapy ---
  'DYN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy Biotech',
    tags: ['AAV', 'gene_therapy', 'muscle_disease', 'rare_disease', 'clinical_stage'],
  },
  // --- Gene Editing ---
  'EDIT': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Editing Biotech',
    tags: ['CRISPR', 'gene_editing', 'sickle_cell', 'oncology', 'clinical_stage'],
  },
  // --- AI Drug Discovery ---
  'EXAI': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Drug Discovery',
    tags: ['AI', 'drug_discovery', 'precision_medicine', 'clinical_stage', 'machine_learning'],
  },
  // --- Epigenetics Biotech ---
  'FULC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Epigenetics Biotech',
    tags: ['epigenetics', 'sickle_cell', 'hematology', 'clinical_stage', 'gene_regulation'],
  },
  // --- Antibody Therapeutics ---
  'GMAB': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Platform Biotech',
    tags: ['bispecific_antibody', 'T_cell_engager', 'oncology', 'autoimmune', 'platform'],
  },
  // --- mRNA Therapeutics ---
  'GRTS': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'mRNA Biotech',
    tags: ['mRNA', 'self_amplifying', 'oncology', 'infectious_disease', 'clinical_stage'],
  },
  // --- Pain Management ---
  'HRTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pain Management Biotech',
    tags: ['non_opioid', 'pain', 'post_surgical', 'hospital', 'specialty_pharma'],
  },
  // --- AI Radiology ---
  'ICAD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Medical Imaging',
    tags: ['AI', 'mammography', 'cancer_detection', 'radiology', 'SaaS_medtech'],
  },
  // --- Bispecific Antibody ---
  'IMNM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immunology Biotech',
    tags: ['bispecific', 'autoimmune', 'IgG4', 'inflammation', 'clinical_stage'],
  },
  // --- Respiratory Pharma ---
  'INVA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Respiratory Pharma',
    tags: ['COPD', 'respiratory', 'inhaler', 'pulmonology', 'commercial_stage'],
  },
  // --- Retinal Biotech ---
  'ISEE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmology Biotech',
    tags: ['complement', 'geographic_atrophy', 'retinal', 'ophthalmology', 'clinical_stage'],
  },
  // --- Nuclear Export Inhibitor ---
  'KPTI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oncology Biotech',
    tags: ['nuclear_export', 'myeloma', 'oncology', 'commercial_stage', 'small_molecule'],
  },
  // --- Drug Royalties ---
  'LGND': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Drug Royalties',
    tags: ['royalty', 'licensing', 'diversified_pharma', 'portfolio', 'asset_light'],
  },
  // --- Inhaled Therapeutics ---
  'MNKD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Inhaled Therapeutics',
    tags: ['inhaled_insulin', 'diabetes', 'pulmonary', 'drug_delivery', 'commercial_stage'],
  },
  // --- Protein Degradation ---
  'MORF': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Protein Degradation Biotech',
    tags: ['molecular_glue', 'protein_degradation', 'oncology', 'clinical_stage', 'novel_mechanism'],
  },
  // --- KRAS Oncology ---
  'MRTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Oncology Biotech',
    tags: ['KRAS', 'lung_cancer', 'precision_oncology', 'small_molecule', 'commercial_stage'],
  },
  // --- Bispecific Antibody Platform ---
  'MRUS': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bispecific Antibody Biotech',
    tags: ['bispecific', 'T_cell_engager', 'oncology', 'clinical_stage', 'platform'],
  },
  // --- Neuroscience Biotech ---
  'NRIX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['kinase_inhibitor', 'pain', 'neuroscience', 'clinical_stage', 'precision_medicine'],
  },
  // --- Vaccine Development ---
  'OCGN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vaccine/Gene Therapy Biotech',
    tags: ['vaccine', 'gene_therapy', 'ophthalmology', 'clinical_stage', 'global_health'],
  },
  // --- Established Pharma ---
  'OGN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Womens Health Pharma',
    tags: ['womens_health', 'biosimilar', 'fertility', 'established_brands', 'global_pharma'],
  },
  // --- Radiology Services ---
  'RDNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Radiology Services',
    tags: ['radiology', 'imaging_center', 'teleradiology', 'healthcare_services', 'JV_model'],
  },
  // --- AAV Gene Therapy ---
  'RGNX': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy Platform',
    tags: ['AAV', 'gene_therapy', 'rare_disease', 'platform', 'licensing'],
  },
  // --- Neuroscience Pharma ---
  'SAGE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Pharma',
    tags: ['depression', 'GABA', 'neuroscience', 'CNS', 'commercial_stage'],
  },
  // --- Gene Medicine ---
  'SGMO': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Medicine Biotech',
    tags: ['zinc_finger', 'gene_regulation', 'hemophilia', 'rare_disease', 'clinical_stage'],
  },
  // --- Genomic Medicine ---
  'SNDX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Genomic Medicine Biotech',
    tags: ['menin_inhibitor', 'leukemia', 'oncology', 'clinical_stage', 'epigenetics'],
  },
  // --- Endocrine Pharma ---
  'TARS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Endocrine Biotech',
    tags: ['thyroid', 'endocrine', 'rare_disease', 'clinical_stage', 'precision_medicine'],
  },
  // --- Molecular Diagnostics ---
  'VCYT': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Molecular Diagnostics',
    tags: ['thyroid_diagnostics', 'genomic_testing', 'cancer_diagnostics', 'CLIA_lab', 'precision_medicine'],
  },
  // --- CNS Pharma ---
  'VNDA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CNS Specialty Pharma',
    tags: ['sleep_disorder', 'schizophrenia', 'CNS', 'commercial_stage', 'specialty_pharma'],
  },
  // --- Antibody Engineering ---
  'XNCR': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Engineering Biotech',
    tags: ['Fc_engineering', 'bispecific', 'oncology', 'autoimmune', 'platform'],
  },
  // --- Antibody-Drug Conjugate ---
  'ZYME': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'ADC Biotech',
    tags: ['ADC', 'site_specific', 'oncology', 'platform', 'clinical_stage'],
  },
  // === GAP FILL: 156 Missing Entries ===
  'ABR': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'multifamily', 'bridge_loans', 'agency'],
  },
  'ACRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Mortgage REIT',
    tags: ['mREIT', 'commercial', 'senior_loans', 'transitional'],
  },
  'AGNC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agency Mortgage REIT',
    tags: ['mREIT', 'agency_MBS', 'leveraged', 'interest_rate_sensitive'],
  },
  'ARI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Mortgage REIT',
    tags: ['mREIT', 'commercial', 'first_mortgage', 'transitional'],
  },
  'EFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'non_agency', 'CLO', 'reverse_mortgage'],
  },
  'IVR': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agency Mortgage REIT',
    tags: ['mREIT', 'agency_MBS', 'RMBS', 'CMBS'],
  },
  'LADR': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Mortgage REIT',
    tags: ['mREIT', 'commercial', 'balance_sheet', 'conduit'],
  },
  'MFA': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'residential', 'non_agency', 'credit_sensitive'],
  },
  'MITT': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'residential', 'non_agency', 'securitization'],
  },
  'NLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agency Mortgage REIT',
    tags: ['mREIT', 'agency_MBS', 'largest_mREIT', 'leveraged'],
  },
  'NYMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'credit_sensitive', 'multi_strategy', 'residential'],
  },
  'PMT': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'correspondent', 'MSR', 'credit_risk_transfer'],
  },
  'RWT': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage REIT',
    tags: ['mREIT', 'jumbo', 'residential', 'securitization'],
  },
  'STWD': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Mortgage REIT',
    tags: ['mREIT', 'commercial', 'infrastructure', 'diversified'],
  },
  'TWO': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agency Mortgage REIT',
    tags: ['mREIT', 'agency_MBS', 'MSR', 'interest_rate'],
  },
  'AUB': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['community_bank', 'Virginia', 'commercial_lending'],
  },
  'BANF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['community_bank', 'Oklahoma', 'commercial_lending'],
  },
  'BPOP': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Puerto_Rico', 'Caribbean', 'commercial_lending'],
  },
  'CATY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Asian_American', 'California', 'CRE_lending'],
  },
  'CFR': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Texas', 'service_fee', 'commercial_lending'],
  },
  'CPF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Hawaii', 'community_bank', 'island_economy'],
  },
  'CVBF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Banking',
    tags: ['California', 'business_banking', 'SBA_lending'],
  },
  'FIBK': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Pacific_Northwest', 'Montana', 'commercial_lending'],
  },
  'HMST': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Pacific_Northwest', 'multifamily', 'commercial_lending'],
  },
  'ISBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['New_Jersey', 'community_bank', 'commercial_lending'],
  },
  'KRNY': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['New_Jersey', 'thrift', 'multifamily'],
  },
  'PPBI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Banking',
    tags: ['California', 'business_banking', 'SBA'],
  },
  'QCRH': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Midwest', 'Iowa', 'trust_services'],
  },
  'RNST': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Southeast', 'Mississippi', 'community_bank'],
  },
  'TCBI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Banking',
    tags: ['Texas', 'commercial', 'treasury_solutions'],
  },
  'UBSI': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['West_Virginia', 'community_bank', 'multi_state'],
  },
  'WSFS': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Delaware', 'service_fee', 'commercial'],
  },
  'WTFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['Chicago', 'commercial', 'service_fee'],
  },
  'AEL': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Life Insurance & Annuities',
    tags: ['fixed_annuities', 'indexed', 'retirement'],
  },
  'AGM': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agricultural Finance',
    tags: ['Farmer_Mac', 'agricultural', 'rural_lending', 'GSE'],
  },
  'AIZ': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'service_fee'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Insurance',
    tags: ['renters', 'mobile', 'specialty', 'connected_living'],
  },
  'AMG': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'premium_service'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['multi_affiliate', 'alternatives', 'institutional'],
  },
  'AMP': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'service_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Wealth Management',
    tags: ['financial_planning', 'asset_management', 'insurance'],
  },
  'BN': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Management',
    tags: ['infrastructure', 'real_estate', 'renewable', 'private_equity'],
  },
  'CNA': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B',
    industrySegment: 'Commercial Insurance',
    tags: ['P&C', 'specialty', 'commercial_lines', 'surety'],
  },
  'FHI': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['ESG', 'stewardship', 'fixed_income', 'equity'],
  },
  'HMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Insurance',
    tags: ['educators', 'niche', 'retirement', 'auto'],
  },
  'MCY': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Auto Insurance',
    tags: ['personal_auto', 'homeowners', 'California'],
  },
  'RGA': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Reinsurance',
    tags: ['life_reinsurance', 'mortality', 'longevity', 'global'],
  },
  'SPNT': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Reinsurance',
    tags: ['insurtech', 'specialty', 'reinsurance', 'MGA'],
  },
  'MAIN': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Development Company',
    tags: ['BDC', 'lower_middle_market', 'internal_management'],
  },
  'PSEC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Development Company',
    tags: ['BDC', 'middle_market', 'diversified_lending'],
  },
  'SLRC': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Development Company',
    tags: ['BDC', 'specialty_lending', 'cash_flow', 'asset_based'],
  },
  'PFSI': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Mortgage Origination',
    tags: ['correspondent', 'servicing', 'technology', 'production'],
  },
  'UWMC': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'interest_income'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Mortgage Origination',
    tags: ['wholesale', 'broker_channel', 'largest_wholesale'],
  },
  'LC': {
    assetModel: 'platform',
    revenueModels: ['service_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Digital Banking',
    tags: ['marketplace_lending', 'personal_loans', 'fintech', 'digital_bank'],
  },
  'BLND': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Technology',
    tags: ['digital_lending', 'mortgage_automation', 'cloud'],
  },
  'CTO': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified REIT',
    tags: ['retail', 'mixed_use', 'net_lease'],
  },
  'DEA': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Government REIT',
    tags: ['federal_government', 'GSA', 'mission_critical'],
  },
  'ESRT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Office REIT',
    tags: ['NYC', 'Empire_State_Building', 'office', 'retail'],
  },
  'GMRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare REIT',
    tags: ['medical_office', 'net_lease', 'outpatient'],
  },
  'GOOD': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Net Lease REIT',
    tags: ['industrial', 'office', 'net_lease', 'diversified'],
  },
  'HPP': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office & Studio REIT',
    tags: ['West_Coast', 'tech_tenants', 'studio', 'office'],
  },
  'INN': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hotel REIT',
    tags: ['premium_branded', 'select_service', 'upscale'],
  },
  'JBGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mixed-Use REIT',
    tags: ['DC_metro', 'mixed_use', 'placemaking', 'project_based'],
  },
  'PDM': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office REIT',
    tags: ['Sunbelt', 'Class_A', 'office'],
  },
  'SAFE': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ground Lease REIT',
    tags: ['ground_lease', 'long_duration', 'inflation_linked'],
  },
  'XHR': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Hotel REIT',
    tags: ['luxury', 'upper_upscale', 'group', 'urban'],
  },
  'ACCD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Healthcare Navigation',
    tags: ['health_navigation', 'benefits', 'advocacy', 'virtual_care'],
  },
  'AVPT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud Management Software',
    tags: ['Microsoft_365', 'data_management', 'governance', 'SaaS'],
  },
  'BCOV': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Video Platform',
    tags: ['OTT', 'video_hosting', 'streaming', 'enterprise'],
  },
  'BIGC': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E-commerce Platform',
    tags: ['headless', 'open_SaaS', 'B2B_commerce', 'enterprise'],
  },
  'BLKB': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Nonprofit Technology',
    tags: ['fundraising', 'nonprofit', 'education', 'CRM'],
  },
  'CCCS': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Technology',
    tags: ['claims', 'AI', 'auto_insurance', 'network'],
  },
  'CGNT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Security Analytics',
    tags: ['SIGINT', 'analytics', 'intelligence', 'government'],
  },
  'CXM': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Customer Experience Management',
    tags: ['social', 'CX', 'unified', 'AI', 'enterprise'],
  },
  'EBIX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Insurance Technology',
    tags: ['insurance_exchange', 'SaaS', 'fintech', 'India'],
  },
  'ENFN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Management Software',
    tags: ['portfolio_management', 'OEMS', 'cloud_native', 'hedge_fund'],
  },
  'EXLS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Analytics & BPO',
    tags: ['data_analytics', 'AI', 'operations', 'insurance'],
  },
  'INOD': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Data Services',
    tags: ['data_annotation', 'AI_training', 'NLP', 'self_operated'],
  },
  'LPSN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Conversational AI',
    tags: ['chatbot', 'messaging', 'AI', 'customer_engagement'],
  },
  'LVOX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Contact Center Software',
    tags: ['CCaaS', 'cloud', 'AI', 'workforce_optimization'],
  },
  'MCHX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Analytics',
    tags: ['call_analytics', 'conversational', 'attribution', 'AI'],
  },
  'MIND': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Telecom BSS',
    tags: ['billing', 'telecom', 'VoIP', 'mediation'],
  },
  'MODN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Revenue Management Software',
    tags: ['pharma', 'medtech', 'pricing', 'compliance'],
  },
  'MSTR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Business Intelligence & Bitcoin',
    tags: ['BI', 'analytics', 'bitcoin_treasury', 'cloud'],
  },
  'NEWR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Observability Platform',
    tags: ['APM', 'monitoring', 'cloud', 'full_stack'],
  },
  'NICE': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CX & Compliance Software',
    tags: ['CCaaS', 'workforce', 'compliance', 'AI', 'cloud'],
  },
  'OLO': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Restaurant Technology',
    tags: ['digital_ordering', 'delivery', 'payments', 'restaurants'],
  },
  'OSPN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Identity Security',
    tags: ['e_signature', 'identity', 'authentication', 'banking'],
  },
  'QADA': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Manufacturing ERP',
    tags: ['ERP', 'supply_chain', 'manufacturing', 'cloud'],
  },
  'RNG': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Unified Communications',
    tags: ['UCaaS', 'CCaaS', 'video', 'cloud', 'messaging'],
  },
  'SUMO': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cloud SIEM',
    tags: ['log_analytics', 'security', 'observability', 'cloud_native'],
  },
  'TTGT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'B2B Intent Data',
    tags: ['purchase_intent', 'content_marketing', 'demand_gen', 'tech_media'],
  },
  'UPLD': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Work Management Software',
    tags: ['cloud', 'digital_media', 'knowledge_management', 'roll_up'],
  },
  'VTEX': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'E-commerce Platform',
    tags: ['marketplace', 'composable', 'Latin_America', 'enterprise'],
  },
  'WK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regulatory Reporting Software',
    tags: ['SEC_filing', 'ESG', 'compliance', 'XBRL', 'cloud'],
  },
  'EGHT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Unified Communications',
    tags: ['UCaaS', 'CPaaS', 'contact_center', 'cloud'],
  },
  'PLTK': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Mobile Gaming',
    tags: ['casual', 'social_casino', 'mobile', 'live_ops'],
  },
  'SABR': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Travel Technology',
    tags: ['GDS', 'airline', 'hotel', 'booking'],
  },
  'ADTN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Networking Equipment',
    tags: ['fiber', 'broadband', 'access', 'telecom'],
  },
  'AEIS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Electronics',
    tags: ['power_supply', 'semiconductor_process', 'industrial', 'precision'],
  },
  'ATEN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Network Security Appliances',
    tags: ['cybersecurity', 'DDoS', 'load_balancer', 'ADC'],
  },
  'CMTL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Defense Communications',
    tags: ['satellite', 'tactical', 'next_gen_911', 'troposcatter'],
  },
  'DUOT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'AI Vision Technology',
    tags: ['rail_inspection', 'AI', 'machine_vision', 'security'],
  },
  'FARO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Measurement',
    tags: ['metrology', 'laser_scanning', 'quality', 'digital_twin'],
  },
  'LEDS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LED Manufacturing',
    tags: ['LED_chips', 'epitaxial', 'lighting', 'UV'],
  },
  'ESMT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payments & Engagement Software',
    tags: ['billing', 'payments', 'government', 'healthcare'],
  },
  'BTBT': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bitcoin Mining',
    tags: ['bitcoin', 'mining', 'HPC', 'staking'],
  },
  'CORZ': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bitcoin Mining & HPC',
    tags: ['bitcoin', 'mining', 'data_center', 'HPC', 'AI'],
  },
  'ACLX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cell Therapy Biotech',
    tags: ['CAR-T', 'oncology', 'next_gen', 'clinical_stage'],
  },
  'AVXL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['sigma_receptor', 'Alzheimers', 'Parkinsons', 'clinical_stage'],
  },
  'BCYC': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Peptide Therapeutics Biotech',
    tags: ['bicycle_peptides', 'immuno_oncology', 'targeted', 'platform'],
  },
  'BTAI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['AI_drug_discovery', 'agitation', 'sedation', 'sublingual'],
  },
  'CLDX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Biotech',
    tags: ['monoclonal_antibodies', 'oncology', 'autoimmune', 'clinical'],
  },
  'CMPS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Psychedelic Medicine',
    tags: ['psilocybin', 'mental_health', 'depression', 'novel_mechanism'],
  },
  'CPRX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['rare_disease', 'neuromuscular', 'LEMS', 'orphan_drug'],
  },
  'CRNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Endocrine Biotech',
    tags: ['somatostatin', 'acromegaly', 'neuroendocrine', 'oral'],
  },
  'CRVS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology Biotech',
    tags: ['checkpoint', 'adenosine', 'oncology', 'clinical_stage'],
  },
  'CYRX': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cold Chain Logistics',
    tags: ['cryogenic', 'cell_therapy', 'biopharma', 'temperature'],
  },
  'ELAN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Animal Health',
    tags: ['pet', 'livestock', 'parasiticides', 'vaccines'],
  },
  'ERAS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oncology Biotech',
    tags: ['RAS', 'MAPK', 'precision_oncology', 'clinical_stage'],
  },
  'ETNB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Metabolic Disease Biotech',
    tags: ['NASH', 'liver', 'FGF21', 'clinical_stage'],
  },
  'FUSN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Radiopharmaceutical Biotech',
    tags: ['targeted_alpha', 'oncology', 'radiotherapy', 'clinical'],
  },
  'GPCR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'GPCR-Targeted Biotech',
    tags: ['GPCR', 'small_molecule', 'obesity', 'metabolic', 'structure_based'],
  },
  'KVUE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Health',
    tags: ['OTC', 'skincare', 'self_care', 'Tylenol', 'Neutrogena'],
  },
  'OPRX': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pharma Marketing Technology',
    tags: ['HCP_engagement', 'pharma', 'digital_health', 'messaging'],
  },
  'SGHT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmic Devices',
    tags: ['glaucoma', 'MIGS', 'dry_eye', 'minimally_invasive'],
  },
  'SDGR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Computational Drug Discovery',
    tags: ['physics_based', 'molecular_simulation', 'AI', 'platform'],
  },
  'NABL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Management Software',
    tags: ['MSP', 'RMM', 'backup', 'security', 'SMB'],
  },
  'FTAI': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aviation Leasing & MRO',
    tags: ['jet_engines', 'CFM56', 'leasing', 'aftermarket'],
  },
  'GFF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Building & Home Products',
    tags: ['doors', 'defense', 'home_improvement', 'diversified'],
  },
  'HCC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Metallurgical Coal Mining',
    tags: ['met_coal', 'steelmaking', 'mining', 'premium'],
  },
  'TRN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'leasing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Railcar Manufacturing',
    tags: ['railcar', 'leasing', 'infrastructure', 'maintenance'],
  },
  'MMI': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Commercial Real Estate Brokerage',
    tags: ['investment_sales', 'CRE', 'brokerage', 'capital_markets'],
  },
  'NKLA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electric & Hydrogen Trucks',
    tags: ['BEV', 'FCEV', 'hydrogen', 'Class_8', 'truck'],
  },
  'ASH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['additives', 'pharma_excipients', 'coatings', 'personal_care'],
  },
  'MOG-A': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Motion Control',
    tags: ['aerospace', 'defense', 'actuators', 'flight_controls'],
  },
  'LLAP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Small Satellite Manufacturing',
    tags: ['smallsat', 'LEO', 'earth_observation', 'defense'],
  },
  'NVEE': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Infrastructure Consulting',
    tags: ['engineering', 'environmental', 'geotechnical', 'technology'],
  },
  'FOXA': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Media & Broadcasting',
    tags: ['news', 'sports', 'cable', 'broadcast', 'Fox'],
  },
  'VZIO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Electronics & AdTech',
    tags: ['smart_TV', 'advertising', 'platform', 'SmartCast'],
  },
  'CATO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Value Apparel Retail',
    tags: ['value', 'women', 'plus_size', 'rural'],
  },
  'PRPL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sleep Products',
    tags: ['mattress', 'DTC', 'hyper_elastic', 'comfort_tech'],
  },
  'SEAT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Event Ticketing',
    tags: ['secondary_tickets', 'live_events', 'marketplace', 'loyalty'],
  },
  'HRB': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Tax Preparation Services',
    tags: ['tax', 'DIY', 'assisted', 'financial_products'],
  },
  'TIGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Emerging Market Telecom',
    tags: ['Latin_America', 'Africa', 'mobile', 'cable', 'fintech'],
  },
  'BOTZ': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Thematic ETF',
    tags: ['robotics', 'AI', 'automation', 'ETF'],
  },
  'MICT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fintech Platform',
    tags: ['insurance', 'trading', 'emerging_markets'],
  },
  'FORR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Technology Research',
    tags: ['research', 'advisory', 'consulting', 'tech_strategy'],
  },
  'CLPS': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['fintech_services', 'banking_IT', 'China', 'outsourcing'],
  },
  'APTI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Advertising',
    tags: ['programmatic', 'DSP', 'data_management', 'identity'],
  },
  'EPIQ': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Legal Services Technology',
    tags: ['legal', 'e_discovery', 'bankruptcy', 'restructuring'],
  },
  'EVTC': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Processing',
    tags: ['Latin_America', 'merchant_acquiring', 'ATM', 'processing'],
  },
  'PRCH': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Services Platform',
    tags: ['insurance', 'moving', 'home_warranty', 'marketplace'],
  },
  'GSKY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Improvement Fintech',
    tags: ['POS_lending', 'home_improvement', 'BNPL'],
  },
  'IRNT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cybersecurity',
    tags: ['network_detection', 'behavioral_analytics', 'government'],
  },
  'EIGI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Endpoint Management',
    tags: ['web_hosting', 'email', 'SMB', 'cloud'],
  },
  'ALEC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['neurodegeneration', 'immuno_neurology', 'progranulin', 'clinical'],
  },
  'SSTI': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Public Safety Technology',
    tags: ['gunshot_detection', 'acoustic', 'law_enforcement', 'smart_city'],
  },
  'DICE': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oral Immunology Biotech',
    tags: ['oral_biologics', 'immunology', 'inflammation', 'clinical'],
  },

  // ========== 52 NEW STOCKS: Healthcare / Tech / Consumer / Industrial / Utilities / China ADR ==========

  // --- Healthcare: Life Sciences Tools & Services ---
  'AVTR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Life Sciences Distribution',
    tags: ['lab_supplies', 'biopharma', 'distribution', 'consumables'],
  },
  'BRKR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Scientific Instruments',
    tags: ['mass_spec', 'NMR', 'proteomics', 'analytical_instruments'],
  },
  'RGEN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Bioprocess Equipment',
    tags: ['chromatography', 'filtration', 'bioprocessing', 'single_use'],
  },
  'PACB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Genomic Sequencing',
    tags: ['long_read', 'HiFi', 'sequencing', 'genomics'],
  },
  'TWIST': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Synthetic Biology',
    tags: ['synthetic_DNA', 'oligos', 'antibody_discovery', 'NGS'],
  },

  // --- Healthcare: Health Services & Tech ---
  'EVH': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'subscription'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Healthcare IT Services',
    tags: ['claims_processing', 'payment_integrity', 'health_plans', 'analytics'],
  },
  'SGFY': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Home Health Services',
    tags: ['home_health', 'episodes_of_care', 'value_based', 'post_acute'],
  },
  'ALHC': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Health & Hospice',
    tags: ['home_health', 'hospice', 'personal_care', 'aging_population'],
  },
  'PCRX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Pharma',
    tags: ['non_opioid', 'pain_management', 'hospital', 'acute_care'],
  },
  'AMRX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Generic Pharma',
    tags: ['generics', 'specialty_pharma', 'biosimilars', 'complex_generics'],
  },

  // --- Healthcare: Medical Devices ---
  'AXNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuromodulation Devices',
    tags: ['sacral_neuromodulation', 'urinary', 'implantable', 'overactive_bladder'],
  },
  'NVRO': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuromodulation Devices',
    tags: ['spinal_cord_stimulation', 'chronic_pain', 'HFX', 'neuromodulation'],
  },
  'LIVN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiac & Neuro Devices',
    tags: ['cardiac_rhythm', 'neuromodulation', 'heart_failure', 'implantable'],
  },

  // --- Tech/Comm: Cloud & SaaS ---
  'DBX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Cloud Storage',
    tags: ['file_sync', 'service_fee', 'cloud_storage', 'productivity'],
  },
  'APPS': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mobile AdTech',
    tags: ['mobile_advertising', 'app_monetization', 'programmatic', 'DSP'],
  },
  'SSYS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Printing',
    tags: ['additive_manufacturing', 'FDM', 'PolyJet', '3D_printing'],
  },
  'DM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Printing',
    tags: ['binder_jetting', 'metal_3D_printing', 'additive_manufacturing', 'mass_production'],
  },

  // --- Tech/Comm: China ADR & International ---
  'BILI': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Video & Gaming Platform',
    tags: ['video_streaming', 'gaming', 'anime', 'UGC', 'China'],
  },
  'HTHT': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'licensing'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Hospitality',
    tags: ['hotels', 'China', 'economy_hotel', 'franchise', 'Huazhu'],
  },
  'TCOM': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'advertising'],
    deliveryModel: 'marketplace',
    customerModel: 'B2C',
    industrySegment: 'Online Travel Agency',
    tags: ['OTA', 'travel', 'China', 'hotel_booking', 'Trip.com'],
  },
  'IQ': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Video Streaming',
    tags: ['streaming', 'original_content', 'China', 'iQIYI', 'entertainment'],
  },
  'TAL': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Education Technology',
    tags: ['K12', 'tutoring', 'China', 'online_education', 'learning_devices'],
  },
  'EDU': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Education Technology',
    tags: ['test_prep', 'overseas_study', 'China', 'New_Oriental', 'e_commerce'],
  },
  'WB': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Social Media',
    tags: ['microblog', 'social', 'China', 'Weibo', 'KOL'],
  },
  'YMM': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B',
    industrySegment: 'Freight Marketplace',
    tags: ['trucking', 'freight_matching', 'China', 'logistics', 'Full_Truck_Alliance'],
  },

  // --- Tech/Comm: Space & Satellite ---
  'GSAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Satellite Communications',
    tags: ['LEO', 'satellite', 'spectrum', 'IoT', 'Globalstar'],
  },
  'PL': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Earth Observation',
    tags: ['satellite_imagery', 'remote_sensing', 'geospatial', 'Planet_Labs'],
  },

  // --- Consumer: E-commerce & Retail ---
  'POSH': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'marketplace',
    customerModel: 'C2C',
    industrySegment: 'Resale Marketplace',
    tags: ['secondhand', 'fashion', 'marketplace', 'circular_economy', 'Poshmark'],
  },
  'BARK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pet Products',
    tags: ['pet', 'subscription_box', 'dog_toys', 'treats', 'DTC'],
  },
  'PETS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Pet Pharmacy',
    tags: ['pet_pharmacy', 'veterinary', 'prescriptions', 'supplements', 'PetMed'],
  },
  'FLWS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gifts & Floral',
    tags: ['flowers', 'gifts', 'e_commerce', 'seasonal', '1-800-Flowers'],
  },
  'DOLE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fresh Produce',
    tags: ['fruit', 'vegetables', 'fresh_produce', 'supply_chain', 'farming'],
  },
  'FDP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Fresh Produce',
    tags: ['fruit', 'banana', 'fresh_produce', 'farming', 'Fresh_Del_Monte'],
  },
  'OTLY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Plant-Based Foods',
    tags: ['oat_milk', 'plant_based', 'dairy_alternative', 'sustainability'],
  },
  'CBRL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casual Dining',
    tags: ['restaurant', 'retail', 'southern', 'highway', 'Cracker_Barrel'],
  },

  // --- Industrials ---
  'TITN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Agricultural Equipment Dealer',
    tags: ['CNH_dealer', 'farm_equipment', 'construction', 'parts_service'],
  },
  'ALG': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrial Equipment',
    tags: ['mowing', 'vegetation_management', 'vacuum_trucks', 'municipal'],
  },
  'GEVO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Renewable Fuels',
    tags: ['SAF', 'sustainable_aviation_fuel', 'biofuels', 'net_zero'],
  },
  'MDU': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Diversified Utility & Construction',
    tags: ['electric', 'natural_gas', 'construction', 'materials', 'utility'],
  },

  // --- Utilities ---
  'NWE': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'Montana', 'South_Dakota', 'NorthWestern'],
  },
  'AVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'Pacific_Northwest', 'Avista', 'hydro'],
  },
  'OGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'distribution', 'Oklahoma', 'Kansas', 'ONE_Gas'],
  },
  'OTTR': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'Minnesota', 'Dakotas', 'Otter_Tail'],
  },
  'BKH': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'South_Dakota', 'Black_Hills', 'regulated'],
  },
  'MGEE': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric & Gas Utility',
    tags: ['electric', 'natural_gas', 'Wisconsin', 'MGE_Energy', 'regulated'],
  },
  'SR': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gas Utility',
    tags: ['natural_gas', 'distribution', 'Southeast', 'Spire', 'regulated'],
  },
  'OGE': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utility',
    tags: ['electric', 'Oklahoma', 'Arkansas', 'OGE_Energy', 'regulated'],
  },

  // --- Additional 5 stocks to reach 52 ---
  'BRFS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Protein & Poultry',
    tags: ['chicken', 'pork', 'processed_foods', 'Brazil', 'BRF'],
  },
  'AMWL': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Telehealth',
    tags: ['virtual_care', 'telehealth', 'remote_monitoring', 'Amwell'],
  },
  'RUTH': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Fine Dining',
    tags: ['steakhouse', 'upscale_dining', 'hospitality', 'Ruths_Chris'],
  },
  'DAVE': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Neobank',
    tags: ['neobank', 'overdraft', 'fintech', 'banking', 'ExtraCash'],
  },
  'NNDM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Printed Electronics',
    tags: ['PCB_printing', 'additive_electronics', '3D_printing', 'inkjet'],
  },
// ========== 70 NEW STOCKS: Chinese ADR / Airlines / SaaS / BDC / Mining / Lidar / EV ==========
  'NTES': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Online Gaming', tags: ['gaming', 'China', 'music', 'education', 'cloud'] },
  'TME': { assetModel: 'platform', revenueModels: ['subscription', 'advertising'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Music Streaming', tags: ['music', 'streaming', 'China', 'social', 'karaoke'] },
  'VIPS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Discount E-Commerce', tags: ['flash_sales', 'China', 'fashion', 'discount', 'branded'] },
  'ZTO': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'hybrid', customerModel: 'B2B2C', industrySegment: 'Express Delivery', tags: ['logistics', 'China', 'express', 'parcel', 'e_commerce'] },
  'BEKE': { assetModel: 'platform', revenueModels: ['transaction_fee', 'service_fee'], deliveryModel: 'hybrid', customerModel: 'B2C', industrySegment: 'Real Estate Platform', tags: ['real_estate', 'China', 'brokerage', 'new_home', 'renovation'] },
  'FUTU': { assetModel: 'platform', revenueModels: ['transaction_fee', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Digital Brokerage', tags: ['brokerage', 'HK', 'US_stocks', 'wealth_management', 'fintech'] },
  'DIDI': { assetModel: 'platform', revenueModels: ['transaction_fee'], deliveryModel: 'marketplace', customerModel: 'B2C', industrySegment: 'Ride-Hailing', tags: ['ride_hailing', 'China', 'mobility', 'freight', 'autonomous'] },
  'LKNCY': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Coffee Chain', tags: ['coffee', 'China', 'fast_pickup', 'digital_native', 'expansion'] },
  'TIGR': { assetModel: 'platform', revenueModels: ['transaction_fee', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Digital Brokerage', tags: ['brokerage', 'China', 'global_stocks', 'options', 'IPO'] },
  'GAP': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Apparel Retail', tags: ['casual', 'Old_Navy', 'Banana_Republic', 'Athleta', 'family'] },
  'PKI': { assetModel: 'hybrid', revenueModels: ['product_sales', 'service_fee', 'consumables'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Life Science Instruments', tags: ['diagnostics', 'analytical', 'genomics', 'food_safety'] },
  'MACOM': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'RF Semiconductors', tags: ['RF', 'microwave', 'photonics', 'telecom', 'defense'] },
  'CHH': { assetModel: 'asset_light', revenueModels: ['licensing', 'service_fee'], deliveryModel: 'franchise', customerModel: 'B2C', industrySegment: 'Hotel Franchise', tags: ['hotel', 'franchise', 'Comfort', 'Quality', 'Radisson'] },
  'RYAAY': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'aftermarket'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Low-Cost Airline', tags: ['airline', 'Europe', 'ultra_low_cost', 'ancillary'] },
  'CPA': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Airline', tags: ['airline', 'Latin_America', 'Panama', 'hub_carrier'] },
  'AZUL': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Airline', tags: ['airline', 'Brazil', 'domestic', 'regional', 'Embraer'] },
  'AC': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Full-Service Airline', tags: ['airline', 'Canada', 'international', 'Star_Alliance'] },
  'BLDE': { assetModel: 'platform', revenueModels: ['service_fee'], deliveryModel: 'marketplace', customerModel: 'B2C', industrySegment: 'Air Mobility', tags: ['helicopter', 'air_taxi', 'urban', 'organ_transport', 'eVTOL'] },
  'SPCE': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Space Tourism', tags: ['space', 'suborbital', 'tourism', 'research', 'Virgin'] },
  'MMYT': { assetModel: 'platform', revenueModels: ['transaction_fee', 'advertising'], deliveryModel: 'marketplace', customerModel: 'B2C', industrySegment: 'Online Travel Agency', tags: ['India', 'travel', 'flights', 'hotels', 'OTA'] },
  'PEG': { assetModel: 'asset_heavy', revenueModels: ['regulated_utility'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Electric Utility', tags: ['electric', 'gas', 'New_Jersey', 'nuclear', 'PSEG'] },
  'XP': { assetModel: 'platform', revenueModels: ['transaction_fee', 'interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Digital Brokerage', tags: ['Brazil', 'brokerage', 'wealth_management', 'fintech'] },
  'BAM': { assetModel: 'asset_light', revenueModels: ['service_fee', 'transaction_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Alternative Asset Management', tags: ['infrastructure', 'real_estate', 'renewables', 'PE'] },
  'RE': { assetModel: 'asset_light', revenueModels: ['premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Reinsurance', tags: ['reinsurance', 'property', 'casualty', 'specialty', 'global'] },
  'LPRO': { assetModel: 'platform', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Auto Lending Technology', tags: ['auto_lending', 'analytics', 'insurance', 'risk_modeling'] },
  'ARCC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'middle_market', 'direct_lending', 'Ares'] },
  'HTGC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'venture_lending', 'tech', 'life_science'] },
  'ORCC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'direct_lending', 'Blue_Owl', 'senior_secured'] },
  'BXSL': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'senior_secured', 'Blackstone', 'first_lien'] },
  'IEP': { assetModel: 'hybrid', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Diversified Conglomerate', tags: ['activist', 'energy', 'automotive', 'food', 'Icahn'] },
  'FROG': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'DevOps Platform', tags: ['DevOps', 'artifact_management', 'CI_CD', 'security'] },
  'PEGA': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'BPM Software', tags: ['BPM', 'CRM', 'low_code', 'automation'] },
  'GWRE': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Insurance Technology', tags: ['insurance', 'P_and_C', 'core_systems', 'cloud'] },
  'SSNC': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Financial Software', tags: ['fund_admin', 'portfolio_management', 'fintech'] },
  'FVRR': { assetModel: 'platform', revenueModels: ['transaction_fee'], deliveryModel: 'marketplace', customerModel: 'B2B2C', industrySegment: 'Freelance Marketplace', tags: ['gig_economy', 'freelance', 'creative', 'digital_services'] },
  'DAVA': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'IT Services', tags: ['nearshore', 'digital_transformation', 'agile', 'payments'] },
  'VMW': { assetModel: 'asset_light', revenueModels: ['subscription', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Virtualization Software', tags: ['virtualization', 'cloud', 'multi_cloud', 'vSphere'] },
  'YEXT': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Digital Presence Platform', tags: ['search', 'listings', 'reviews', 'AI_search'] },
  'GRPN': { assetModel: 'platform', revenueModels: ['transaction_fee'], deliveryModel: 'marketplace', customerModel: 'B2C', industrySegment: 'Local Commerce', tags: ['deals', 'local', 'experiences', 'coupons'] },
  'ANGI': { assetModel: 'platform', revenueModels: ['advertising', 'transaction_fee'], deliveryModel: 'marketplace', customerModel: 'B2C', industrySegment: 'Home Services Marketplace', tags: ['home_services', 'contractors', 'leads', 'HomeAdvisor'] },
  'DOXI': { assetModel: 'platform', revenueModels: ['subscription', 'advertising'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Physician Network', tags: ['doctors', 'telehealth', 'pharma_marketing', 'HCP'] },
  'PLAN': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Enterprise Planning Software', tags: ['planning', 'budgeting', 'forecasting', 'FP_and_A'] },
  'UDMY': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fee'], deliveryModel: 'marketplace', customerModel: 'B2B2C', industrySegment: 'Online Education', tags: ['courses', 'upskilling', 'enterprise_learning'] },
  'BYND': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Plant-Based Meat', tags: ['plant_based', 'meat_alternative', 'pea_protein', 'vegan'] },
  'LW': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Frozen Potato Products', tags: ['frozen', 'french_fries', 'potato', 'foodservice'] },
  'HYLN': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'EV Powertrain', tags: ['electric', 'hybrid', 'truck', 'CNG', 'fleet'] },
  'GOEV': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Electric Vehicle', tags: ['EV', 'skateboard', 'platform', 'commercial'] },
  'PTRA': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'aftermarket'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electric Bus', tags: ['electric_bus', 'transit', 'zero_emission', 'battery'] },
  'TELL': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'LNG Development', tags: ['LNG', 'natural_gas', 'export', 'Driftwood'] },
  'CHK': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Natural Gas E&P', tags: ['natural_gas', 'shale', 'Marcellus', 'Haynesville'] },
  'VRM': { assetModel: 'platform', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Online Auto Retail', tags: ['used_cars', 'e_commerce', 'delivery', 'financing'] },
  'WESCO': { assetModel: 'asset_heavy', revenueModels: ['distribution'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electrical Distribution', tags: ['electrical', 'industrial', 'communications', 'utility'] },
  'MDC': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Homebuilding', tags: ['single_family', 'entry_level', 'Richmond_American'] },
  'DFH': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Homebuilding', tags: ['asset_light', 'lot_option', 'single_family', 'Southeast'] },
  'CVCO': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Manufactured Housing', tags: ['manufactured', 'modular', 'affordable', 'park_model'] },
  'LEGH': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Manufactured Housing', tags: ['manufactured', 'Texas', 'affordable', 'financing'] },
  'RMAX': { assetModel: 'asset_light', revenueModels: ['licensing', 'service_fee'], deliveryModel: 'franchise', customerModel: 'B2C', industrySegment: 'Real Estate Franchise', tags: ['real_estate', 'franchise', 'brokerage', 'agents'] },
  'RGLD': { assetModel: 'asset_light', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Precious Metals Royalty', tags: ['gold', 'royalty', 'streaming', 'silver'] },
  'IAG': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gold Mining', tags: ['gold', 'mining', 'Canada', 'West_Africa'] },
  'AGI': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gold Mining', tags: ['gold', 'mining', 'Canada', 'Mexico', 'mid_tier'] },
  'INFN': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Optical Networking', tags: ['optical', 'coherent', 'DWDM', 'telecom'] },
  'COMM': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Network Infrastructure', tags: ['fiber', 'cable', 'connectivity', 'wireless'] },
  'AAOI': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Optical Components', tags: ['transceivers', 'optical', 'data_center', 'laser'] },
  'GILT': { assetModel: 'asset_light', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Satellite Networking', tags: ['satellite', 'VSAT', 'broadband', 'defense'] },
  'BITF': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Bitcoin Mining', tags: ['bitcoin', 'mining', 'Canada', 'hydro', 'hashrate'] },
  'BYD': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Casino & Gaming', tags: ['casino', 'regional', 'online', 'sports_betting'] },
  'LAZR': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Lidar Sensors', tags: ['lidar', 'autonomous', 'ADAS', 'automotive'] },
  'OUST': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Lidar Sensors', tags: ['lidar', 'digital', 'industrial', 'robotics'] },
  'LILM': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'eVTOL Aircraft', tags: ['eVTOL', 'electric', 'jet', 'urban_air_mobility'] },
  'SWI': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'IT Management Software', tags: ['network', 'monitoring', 'observability', 'MSP'] },
  'CRTO': { assetModel: 'platform', revenueModels: ['advertising'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Performance Advertising', tags: ['retargeting', 'programmatic', 'commerce_media'] },

  // ========== 补充61只: Multi-Sector US Stocks (Batch 3) ==========

  // --- Medical Devices ---
  'MASI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Patient Monitoring',
    tags: ['pulse_oximetry', 'noninvasive_monitoring', 'sensors', 'hospital'],
  },

  // --- Entertainment / Media ---
  'AMC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Movie Theaters',
    tags: ['cinema', 'exhibition', 'concessions', 'IMAX', 'premium_format'],
  },
  'NXST': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'TV Broadcasting',
    tags: ['local_TV', 'news', 'CW_network', 'retransmission', 'digital_media'],
  },
  'FWONK': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Motorsports Media',
    tags: ['Formula_1', 'motorsport', 'media_rights', 'sponsorship', 'events'],
  },
  'ZD': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Digital Media & Internet',
    tags: ['tech_media', 'gaming_media', 'health_media', 'Mashable', 'IGN'],
  },
  'ELS': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Manufactured Housing REIT',
    tags: ['manufactured_homes', 'RV_resorts', 'marinas', 'lifestyle'],
  },
  'TPG': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Alternative Asset Management',
    tags: ['private_equity', 'growth_equity', 'real_estate', 'impact_investing'],
  },
  'MBLY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'ADAS & Autonomous Driving',
    tags: ['ADAS', 'computer_vision', 'EyeQ', 'autonomous', 'automotive_chips'],
  },
  'HIPPO': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Insurance Technology',
    tags: ['home_insurance', 'insurtech', 'smart_home', 'proactive_protection'],
  },
  'KINS': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Home Insurance Technology',
    tags: ['homeowners_insurance', 'AI_pricing', 'catastrophe', 'DTC_insurance'],
  },
  'GDYN': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Transformation Services',
    tags: ['cloud_engineering', 'digital_commerce', 'analytics', 'consulting'],
  },
  'NUVEI': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Payment Technology',
    tags: ['payment_processing', 'ecommerce', 'crypto_payments', 'global_acquiring'],
  },
  'RACE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Luxury Sports Cars',
    tags: ['supercar', 'Formula_1', 'luxury', 'exclusivity', 'Italian'],
  },
  'PII': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Powersports Vehicles',
    tags: ['ATV', 'snowmobile', 'motorcycle', 'side_by_side', 'marine'],
  },
  'AHCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['rental', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Home Medical Equipment',
    tags: ['HME', 'respiratory', 'CPAP', 'diabetes', 'home_health'],
  },
  'RBRK': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Data Security & Management',
    tags: ['data_protection', 'backup', 'ransomware', 'zero_trust', 'cloud_security'],
  },
  'MCFT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Performance Boats',
    tags: ['ski_boats', 'wakeboard', 'luxury_boats', 'marine'],
  },
  'MBUU': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sport Boats',
    tags: ['wakeboard_boats', 'fishing_boats', 'pontoons', 'marine'],
  },
  'SHLS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Electrical BOS',
    tags: ['solar_connectors', 'wire_harness', 'BOS', 'utility_scale'],
  },
  'GPRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ethanol & Renewable Fuels',
    tags: ['ethanol', 'corn_oil', 'protein', 'renewable_fuel', 'biofuel'],
  },
  'CCRN': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Staffing',
    tags: ['travel_nursing', 'allied_health', 'staffing', 'healthcare_workforce'],
  },
  'AMN': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Workforce Solutions',
    tags: ['nurse_staffing', 'physician_placement', 'allied_health', 'workforce_solutions'],
  },
  'UNM': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Employee Benefits Insurance',
    tags: ['disability', 'life_insurance', 'voluntary_benefits', 'group_insurance'],
  },
  'GNW': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Long-Term Care Insurance',
    tags: ['long_term_care', 'life_insurance', 'annuities', 'legacy'],
  },
  'FLUT': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Sports Betting & Gaming',
    tags: ['FanDuel', 'sports_betting', 'iGaming', 'Paddy_Power', 'Betfair'],
  },
  'PGNY': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B2C',
    industrySegment: 'Fertility Benefits Management',
    tags: ['fertility', 'IVF', 'benefits', 'family_building', 'womens_health'],
  },
  'SEM': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Specialty Rehabilitation',
    tags: ['LTACH', 'inpatient_rehab', 'outpatient_rehab', 'occupational_health'],
  },
  'PATK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products & Materials',
    tags: ['countertops', 'insulation', 'RV_components', 'manufactured_housing'],
  },
  'LL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Flooring Retail',
    tags: ['hardwood', 'laminate', 'vinyl', 'flooring', 'home_improvement'],
  },
  'EURN': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Crude Oil Tankers',
    tags: ['VLCC', 'Suezmax', 'crude_tanker', 'spot_market', 'shipping'],
  },
  'NAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Suezmax Tankers',
    tags: ['Suezmax', 'crude_oil', 'tanker', 'spot_charter', 'shipping'],
  },
  'TRMD': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Product Tankers',
    tags: ['product_tanker', 'MR', 'handysize', 'refined_products', 'shipping'],
  },
  'HAFN': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Product & Chemical Tankers',
    tags: ['product_tanker', 'chemical_tanker', 'LR2', 'MR', 'shipping'],
  },
  'CMRE': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Containership Leasing',
    tags: ['containership', 'charter', 'long_term_lease', 'liner_shipping'],
  },
  'GSL': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Containership Leasing',
    tags: ['containership', 'mid_size', 'charter', 'time_charter', 'fleet'],
  },
  'ASC': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LPG Shipping',
    tags: ['LPG', 'VLGC', 'gas_carrier', 'propane', 'butane'],
  },
  'TDC': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Data Analytics',
    tags: ['data_warehouse', 'analytics', 'Vantage', 'cloud_data', 'Teradata'],
  },
  'SDC': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Clear Aligner DTC',
    tags: ['clear_aligners', 'teledentistry', 'DTC', 'orthodontics', 'SmileShop'],
  },
  'HCP': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Communications',
    tags: ['HIPAA_compliant', 'messaging', 'clinical_communications', 'EHR_integration'],
  },
  'SN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Metals Distribution',
    tags: ['tin', 'specialty_metals', 'steel', 'aluminum', 'service_center'],
  },
  'SMP': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Automotive Aftermarket Parts',
    tags: ['engine_management', 'temperature_control', 'aftermarket', 'auto_parts'],
  },
  'SCHL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Childrens Publishing',
    tags: ['childrens_books', 'book_fairs', 'education', 'publishing', 'literacy'],
  },
  'HMH': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'K-12 Educational Content',
    tags: ['K12', 'curriculum', 'textbooks', 'digital_learning', 'assessment'],
  },
  'BKD': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'rental'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Senior Living',
    tags: ['assisted_living', 'memory_care', 'independent_living', 'senior_housing'],
  },

  // ========== 补充16只: Additional Stocks (Batch 3b) ==========
  'NXE': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Uranium Mining',
    tags: ['uranium', 'nuclear_fuel', 'in_situ_recovery', 'Rook_I'],
  },
  'JKS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Module Manufacturing',
    tags: ['solar_panels', 'monocrystalline', 'TOPCon', 'utility_scale'],
  },
  'DQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Polysilicon Manufacturing',
    tags: ['polysilicon', 'solar_grade', 'semiconductor_grade', 'Xinjiang'],
  },
  'CSIQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Solar Module Manufacturing',
    tags: ['solar_modules', 'solar_projects', 'energy_storage', 'Canadian_Solar'],
  },
  'BEPC': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Renewable Power',
    tags: ['hydro', 'wind', 'solar', 'Brookfield', 'clean_energy'],
  },
  'CPLP': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Carrier Leasing',
    tags: ['LNG_carrier', 'tanker', 'charter', 'Capital_Product'],
  },
  'CLDR': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Data Cloud',
    tags: ['hadoop', 'data_lake', 'machine_learning', 'hybrid_cloud', 'Cloudera'],
  },
  'KRTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['neuropsychiatry', 'schizophrenia', 'dementia', 'KarXT'],
  },
  'PACW': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regional Bank',
    tags: ['community_bank', 'technology_banking', 'venture', 'California'],
  },
  'BFLY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Point-of-Care Ultrasound',
    tags: ['portable_ultrasound', 'AI_imaging', 'semiconductor_chip', 'handheld'],
  },
  'PRTS': {
    assetModel: 'platform',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Auto Parts',
    tags: ['auto_parts', 'ecommerce', 'CarParts', 'aftermarket', 'DTC'],
  },
  'KGS': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Natural Gas Utility',
    tags: ['natural_gas', 'distribution', 'Kansas', 'regulated'],
  },
  'SAIL': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Identity Security',
    tags: ['identity_governance', 'access_management', 'SaaS', 'AI_security'],
  },
  'RLGY': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'service_fee'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Real Estate Brokerage',
    tags: ['Century_21', 'Coldwell_Banker', 'Sothebys', 'franchise_brokerage'],
  },
  'MIME': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Email Security',
    tags: ['email_security', 'archiving', 'cyber_resilience', 'cloud_security'],
  },

  // ========== 90 NEW Healthcare/Biotech/MedTech Stocks ==========
  // --- Large-cap / Specialty Pharma ---
  'INSM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rare Disease Pharma',
    tags: ['rare_disease', 'pulmonology', 'ARIKAYCE', 'inhaled_therapy'],
  },
  'SUPN': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'CNS Pharma',
    tags: ['CNS', 'neurology', 'psychiatry', 'extended_release'],
  },
  'ANIP': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Generics',
    tags: ['generics', 'specialty_pharma', 'CDMO', 'controlled_substances'],
  },
  'IRWD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'GI Pharma',
    tags: ['gastrointestinal', 'LINZESS', 'IBS', 'constipation'],
  },
  'CTLT': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pharma CDMO',
    tags: ['CDMO', 'drug_delivery', 'biologics', 'cell_gene_therapy'],
  },
  'PPD': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Clinical Research CRO',
    tags: ['CRO', 'clinical_trials', 'drug_development', 'biostatistics'],
  },
  // --- Biotech: Gene/Cell Therapy & Platforms ---
  'SANA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cell Therapy',
    tags: ['cell_therapy', 'iPSC', 'gene_delivery', 'autoimmune'],
  },
  'CRIS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Oncology',
    tags: ['precision_medicine', 'kinase_inhibitor', 'gastrointestinal', 'GIST'],
  },
  'ADPT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immune Diagnostics',
    tags: ['TCR', 'immune_sequencing', 'MRD', 'clonoSEQ', 'diagnostics'],
  },
  'LYEL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cell Therapy',
    tags: ['T_cell', 'solid_tumor', 'cell_reprogramming', 'oncology'],
  },
  'TCRT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'TCR Therapy',
    tags: ['TCR', 'cell_therapy', 'solid_tumor', 'neoantigen'],
  },
  'VINC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy',
    tags: ['AAV', 'gene_therapy', 'retinal', 'ophthalmology'],
  },
  'RPTX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Oncology',
    tags: ['RAS', 'oncology', 'targeted_therapy', 'KRAS'],
  },
  'ORIC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oncology Biotech',
    tags: ['drug_resistance', 'oncology', 'glucocorticoid', 'CD73'],
  },
  // --- Biotech: Antibody & Immuno-Oncology ---
  'IGMS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Engineering',
    tags: ['IgM', 'antibody', 'immuno_oncology', 'autoimmune'],
  },
  'AFMD': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['bispecific', 'NK_cell', 'innate_immunity', 'lymphoma'],
  },
  'IMCR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['bispecific', 'T_cell', 'hematology', 'solid_tumor'],
  },
  'TRIL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['checkpoint', 'TIGIT', 'PVR', 'immuno_oncology'],
  },
  'CKPT': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['checkpoint', 'anti_PD_L1', 'anti_CTLA4', 'solid_tumor'],
  },
  'ITOS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Immuno-Oncology',
    tags: ['cytokine', 'IL2', 'tumor_microenvironment', 'oncology'],
  },
  // --- Biotech: Rare Disease & Specialty ---
  'PLRX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'ADC Biotech',
    tags: ['ADC', 'antibody_drug_conjugate', 'oncology', 'linker_technology'],
  },
  'PRTA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neurodegeneration Biotech',
    tags: ['tau', 'Alzheimers', 'neurodegeneration', 'antibody'],
  },
  'ACRS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Dermatology Biotech',
    tags: ['dermatology', 'eczema', 'skin', 'cream'],
  },
  'ALDX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmology Biotech',
    tags: ['eye_disease', 'DED', 'reproxalap', 'RASP_inhibitor'],
  },
  'OCUL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmology Biotech',
    tags: ['ophthalmology', 'eye', 'retina', 'wet_AMD'],
  },
  'ANNX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Rare Disease Biotech',
    tags: ['annexin', 'antiphospholipid', 'rare_disease', 'vascular'],
  },
  'VTYX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Autoimmune Biotech',
    tags: ['autoimmune', 'inflammation', 'STING', 'small_molecule'],
  },
  'TYRA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Precision Oncology',
    tags: ['kinase_inhibitor', 'oncology', 'allosteric', 'precision_medicine'],
  },
  'CTMX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Biotech',
    tags: ['probody', 'masked_antibody', 'oncology', 'conditional_activation'],
  },
  'ABCL': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Antibody Discovery',
    tags: ['antibody', 'AI_drug_discovery', 'neutralizing', 'pandemic'],
  },
  'ADVM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gene Therapy',
    tags: ['AAV', 'gene_therapy', 'ophthalmology', 'wet_AMD'],
  },
  'MDXG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Regenerative Medicine',
    tags: ['wound_care', 'amniotic', 'tissue_engineering', 'surgical'],
  },
  'RVNC': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Aesthetics',
    tags: ['neuromodulator', 'aesthetics', 'DaxibotulinumtoxinA', 'wrinkles'],
  },
  'SRRK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neuroscience Biotech',
    tags: ['neurology', 'migraine', 'epilepsy', 'anti_CGRP'],
  },
  'TCRR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'TCR Therapy',
    tags: ['TCR', 'cell_therapy', 'HLA', 'solid_tumor'],
  },
  'ELEV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Obesity Biotech',
    tags: ['obesity', 'metabolic', 'GLP1', 'weight_loss'],
  },
  'CABA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'ADC Biotech',
    tags: ['ADC', 'FRa', 'ovarian_cancer', 'antibody_drug_conjugate'],
  },
  // --- Med Devices: Orthopedics & Spine ---
  'NUVA': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Spine Surgery Devices',
    tags: ['spine', 'orthopedic', 'minimally_invasive', 'XLIF'],
  },
  'OFIX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Orthopedic Devices',
    tags: ['spine', 'orthopedic', 'bone_growth', 'fixation'],
  },
  'SIBN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Spine Surgery Devices',
    tags: ['spine', 'implant', 'minimally_invasive', 'fusion'],
  },
  'SPNE': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Spine Surgery Devices',
    tags: ['spine', 'motion_preservation', '7D_surgical', 'navigation'],
  },
  // --- Med Devices: Surgical & Specialty ---
  'CNMD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Surgical Devices',
    tags: ['electrosurgery', 'endoscopy', 'argon_plasma', 'GI'],
  },
  'LMAT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiovascular Devices',
    tags: ['cardiac_surgery', 'valvulotome', 'bioprosthetic', 'vascular'],
  },
  'ANGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vascular Access Devices',
    tags: ['vascular_access', 'interventional', 'thrombectomy', 'angiodynamics'],
  },
  'SILK': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Robotic Surgery',
    tags: ['robotic', 'endovascular', 'stent', 'aneurysm'],
  },
  'SWAV': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiovascular Devices',
    tags: ['lithotripsy', 'IVL', 'calcified_lesion', 'cardiovascular'],
  },
  'AORT': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Cardiovascular Devices',
    tags: ['aortic', 'stent_graft', 'endovascular', 'vascular_surgery'],
  },
  'LUNG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Pulmonary Devices',
    tags: ['pulmonary', 'bronchoscopy', 'lung_biopsy', 'navigation'],
  },
  'NARI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Neurovascular Devices',
    tags: ['neurovascular', 'stroke', 'thrombectomy', 'flow_diverter'],
  },
  'EMBC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Vascular Devices',
    tags: ['embolic', 'interventional', 'peripheral_vascular', 'microspheres'],
  },
  'APYX': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Energy-Based Surgical Devices',
    tags: ['helium_plasma', 'J_Plasma', 'surgical', 'cosmetic'],
  },
  'CERS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Surgical Sensing',
    tags: ['SpO2', 'cerebral_oximetry', 'noninvasive', 'sensors'],
  },
  // --- Med Devices: Vision & Dental ---
  'COO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Contact Lens & Women Health',
    tags: ['contact_lens', 'myopia', 'fertility', 'CooperVision'],
  },
  'STAA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Ophthalmic Devices',
    tags: ['ICL', 'implantable_lens', 'refractive', 'myopia'],
  },
  'ESTA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aesthetic Devices',
    tags: ['aesthetics', 'skin_rejuvenation', 'hair_removal', 'energy_device'],
  },
  // --- Med Devices: Monitoring & Diabetes ---
  'SENS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'CGM Devices',
    tags: ['CGM', 'glucose_monitoring', 'implantable', 'diabetes'],
  },
  'ICUI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Infusion Therapy',
    tags: ['infusion', 'IV_therapy', 'pharmacy', 'compounding'],
  },
  'PEN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'GI Devices',
    tags: ['endoscopy', 'pathology', 'GI', 'tissue_sampling'],
  },
  'ITGR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Surgical Instruments',
    tags: ['surgical_instruments', 'sterilization', 'infection_prevention', 'single_use'],
  },
  // --- Med Devices: Imaging & Robotics ---
  'STVN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Radiotherapy Devices',
    tags: ['radiation_therapy', 'stereotactic', 'oncology', 'linac'],
  },
  'TMCI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Robotic Surgery',
    tags: ['robotic', 'laparoscopic', 'single_port', 'surgical_robot'],
  },
  // --- Healthcare Services ---
  'CLOV': {
    assetModel: 'platform',
    revenueModels: ['premium_service'],
    deliveryModel: 'managed',
    customerModel: 'B2C',
    industrySegment: 'Medicare Advantage',
    tags: ['medicare', 'managed_care', 'AI_health', 'Clover_Assistant'],
  },
  'CANO': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Primary Care',
    tags: ['primary_care', 'value_based', 'Medicare', 'capitated'],
  },
  'CLVR': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Health Data Analytics',
    tags: ['health_data', 'analytics', 'AI', 'population_health'],
  },
  'TALK': {
    assetModel: 'platform',
    revenueModels: ['subscription'],
    deliveryModel: 'marketplace',
    customerModel: 'B2B2C',
    industrySegment: 'Digital Mental Health',
    tags: ['teletherapy', 'mental_health', 'behavioral', 'BetterHelp_competitor'],
  },
  // --- Health IT & Genomics ---
  'BNR': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Health IT',
    tags: ['health_records', 'interoperability', 'data_management', 'clinical'],
  },
  'NEOG': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Food & Animal Safety',
    tags: ['food_safety', 'animal_safety', 'diagnostics', 'genomics'],
  },
  // --- Veterinary ---
  'PETQ': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Veterinary Pharma',
    tags: ['pet_health', 'veterinary', 'parasiticides', 'OTC_pet'],
  },
  // --- Med Device: Other Specialty ---
  'NBWR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Wound Care Devices',
    tags: ['wound_care', 'regenerative', 'skin_substitute', 'burns'],
  },
  // --- Additional Biotech: Small/Mid-cap ---
  'EPZM': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Epigenetics Biotech',
    tags: ['epigenetics', 'EZH2', 'histone', 'oncology'],
  },

  // ========== 80 NEW S&P 500 / Russell 1000 Stocks (2026-01-24) ==========

  // --- IT Services / Data Analytics ---
  'CDW': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Distribution',
    tags: ['it_solutions', 'var', 'cloud', 'enterprise'],
  },
  'IT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Research & Advisory',
    tags: ['research', 'advisory', 'conferences', 'analytics'],
  },
  'VRSN': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Internet Infrastructure',
    tags: ['domain_registry', 'dns', 'internet_infrastructure'],
  },
  'EFX': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Credit & Data Analytics',
    tags: ['credit_bureau', 'analytics', 'verification', 'fraud'],
  },
  'TRU': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'usage_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Credit & Data Analytics',
    tags: ['credit_bureau', 'identity', 'analytics'],
  },
  'DXC': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['outsourcing', 'consulting', 'legacy_modernization'],
  },
  'DOX': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['outsourcing', 'digital_transformation', 'consulting'],
  },
  'GIB': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Services',
    tags: ['consulting', 'systems_integration', 'managed_services'],
  },
  'BL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Software',
    tags: ['accounting_automation', 'close_management', 'saas'],
  },
  'VERINT': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Software',
    tags: ['customer_engagement', 'workforce_optimization', 'ai'],
  },

  // --- Industrials / Building Products ---
  'IDEX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Industrials',
    tags: ['pumps', 'flow_control', 'diversified_industrial'],
  },
  'FBHS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['cabinets', 'plumbing', 'doors', 'security'],
  },
  'BLD': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['insulation', 'installation', 'building_envelope'],
  },
  'PGTI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['impact_windows', 'doors', 'hurricane_resistant'],
  },
  'AYI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['lighting', 'led', 'intelligent_spaces', 'controls'],
  },
  'CSL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Building Products',
    tags: ['roofing', 'waterproofing', 'construction_materials'],
  },
  'MODG': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sports & Recreation',
    tags: ['golf_equipment', 'topgolf', 'entertainment_venues'],
  },

  // --- Asset Management ---
  'VCTR': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['multi_boutique', 'active_management', 'institutional'],
  },
  'APAM': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['value_investing', 'high_value_equity', 'institutional'],
  },
  'HLNE': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Asset Management',
    tags: ['alternatives', 'private_markets', 'advisory'],
  },
  'EQH': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Insurance & Asset Management',
    tags: ['life_insurance', 'retirement', 'asset_management'],
  },
  'FGL': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Insurance & Asset Management',
    tags: ['annuities', 'life_insurance', 'retirement'],
  },

  // --- Restaurants ---
  'ARCO': {
    assetModel: 'asset_light',
    revenueModels: ['licensing', 'product_sales'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['qsr', 'latin_america', 'burger'],
  },
  'NDLS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['fast_casual', 'noodles', 'pasta'],
  },
  'CHUY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Restaurants',
    tags: ['casual_dining', 'tex_mex', 'fresh_ingredients'],
  },

  // --- Retail / Apparel ---
  'UA': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Apparel & Footwear',
    tags: ['athletic_apparel', 'performance', 'sports'],
  },
  'CRI': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Apparel & Footwear',
    tags: ['childrens_apparel', 'baby', 'oshkosh'],
  },
  'ASO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['sporting_goods', 'outdoor', 'hunting_fishing'],
  },
  'CAL': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['footwear', 'caleres', 'famous_footwear'],
  },
  'HIBB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Specialty Retail',
    tags: ['athletic_footwear', 'team_sports', 'sneakers'],
  },
  'KTB': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Apparel & Footwear',
    tags: ['innerwear', 'activewear', 'kontoor_brands', 'wrangler'],
  },

  // --- Healthcare Distribution ---
  'OMI': {
    assetModel: 'asset_light',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Distribution',
    tags: ['medical_supplies', 'hospital', 'ppe'],
  },

  // --- Media / Entertainment ---
  'FWONA': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'licensing', 'premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sports Media',
    tags: ['formula_one', 'motorsports', 'broadcasting', 'events'],
  },
  'SONY': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Electronics & Entertainment',
    tags: ['gaming', 'music', 'movies', 'sensors', 'playstation'],
  },
  'NTDOY': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gaming',
    tags: ['console', 'first_party_games', 'ip', 'nintendo'],
  },
  'MSG': {
    assetModel: 'asset_heavy',
    revenueModels: ['premium_service', 'advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sports & Entertainment Venues',
    tags: ['venues', 'arena', 'live_events', 'knicks', 'rangers'],
  },
  'CCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Outdoor Advertising',
    tags: ['billboards', 'digital_ooh', 'transit_ads'],
  },
  'WDDD': {
    assetModel: 'asset_light',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Digital Media',
    tags: ['digital_media', 'content', 'advertising_tech'],
  },
  'TDS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Telecom',
    tags: ['wireless', 'wireline', 'rural_telecom', 'us_cellular'],
  },

  // --- Financials ---
  'BOKF': {
    assetModel: 'asset_heavy',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Regional Banking',
    tags: ['regional_bank', 'oklahoma', 'energy_lending'],
  },
  'JEF': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Banking',
    tags: ['investment_banking', 'trading', 'capital_markets'],
  },
  'VIRTU': {
    assetModel: 'asset_light',
    revenueModels: ['transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Market Making',
    tags: ['market_making', 'hft', 'electronic_trading', 'liquidity'],
  },
  'MKL': {
    assetModel: 'hybrid',
    revenueModels: ['premium_service', 'interest_income'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Insurance',
    tags: ['specialty_insurance', 'reinsurance', 'ventures', 'berkshire_like'],
  },
  'UNUM': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Employee Benefits Insurance',
    tags: ['disability', 'life_insurance', 'employee_benefits'],
  },

  // --- Energy (Canadian Oil & Gas) ---
  'SU': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Integrated',
    tags: ['oil_sands', 'integrated', 'refining', 'canada'],
  },
  'CNQ': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas E&P',
    tags: ['oil_sands', 'heavy_oil', 'natural_gas', 'canada'],
  },
  'CVE': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Integrated',
    tags: ['oil_sands', 'refining', 'upgrading', 'canada'],
  },
  'IMO': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Oil & Gas Integrated',
    tags: ['oil_sands', 'refining', 'chemicals', 'exxon_subsidiary'],
  },

  // --- Chemicals ---
  'MEOH': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['methanol', 'chemical_feedstock', 'clean_fuel'],
  },
  'HUN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Chemicals',
    tags: ['polyurethanes', 'performance_products', 'textile_effects'],
  },
  'BRBR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2C',
    industrySegment: 'Health & Nutrition',
    tags: ['protein', 'nutrition', 'snacks', 'bellring'],
  },

  // --- Utilities ---
  'ATO': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Gas Utilities',
    tags: ['natural_gas_distribution', 'pipeline', 'regulated'],
  },
  'ALE': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utilities',
    tags: ['electric_utility', 'renewable', 'minnesota'],
  },
  'POR': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utilities',
    tags: ['electric_utility', 'renewable', 'oregon'],
  },
  'LUMN': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Telecom Infrastructure',
    tags: ['fiber', 'enterprise_networking', 'edge_computing'],
  },
  'TXNM': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Electric Utilities',
    tags: ['electric_utility', 'new_mexico', 'texas', 'regulated'],
  },

  // --- Packaging ---
  'ATR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Packaging',
    tags: ['dispensing', 'closures', 'pharma_packaging', 'beauty'],
  },
  'GPK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['paperboard', 'cartons', 'food_packaging', 'sustainable'],
  },
  'REYN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Packaging',
    tags: ['aluminum_foil', 'food_storage', 'trash_bags', 'household'],
  },

  // --- Consumer Staples ---
  'BF': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Spirits & Wine',
    tags: ['whiskey', 'jack_daniels', 'premium_spirits', 'bourbon'],
  },
  'SAFM': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Poultry & Meat Processing',
    tags: ['poultry', 'chicken', 'food_processing'],
  },

  // --- Tech Distribution ---
  'AVT': {
    assetModel: 'asset_light',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electronics Distribution',
    tags: ['electronic_components', 'embedded_solutions', 'supply_chain'],
  },
  'ARW': {
    assetModel: 'asset_light',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electronics Distribution',
    tags: ['electronic_components', 'enterprise_computing', 'supply_chain'],
  },
  'SNX': {
    assetModel: 'asset_light',
    revenueModels: ['distribution', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Distribution',
    tags: ['it_distribution', 'cloud', 'endpoint', 'hyve'],
  },

  // --- Mining / Precious Metals ---
  'PKX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel',
    tags: ['steel_integrated', 'korea', 'auto_steel', 'construction'],
  },
  'EGO': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'silver', 'mining', 'eldorado'],
  },
  'BTG': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'mining', 'brazil', 'b2gold'],
  },
  'AG': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Silver Mining',
    tags: ['silver', 'gold', 'mexico', 'first_majestic'],
  },
  'HL': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Silver Mining',
    tags: ['silver', 'gold', 'lead', 'zinc', 'hecla'],
  },
  'PAAS': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Silver Mining',
    tags: ['silver', 'gold', 'pan_american', 'latin_america'],
  },
  'CDE': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Silver Mining',
    tags: ['silver', 'gold', 'zinc', 'coeur_mining'],
  },
  'SSRM': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'silver', 'ssr_mining', 'turkey'],
  },
  'SBSW': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'PGM Mining',
    tags: ['platinum', 'palladium', 'gold', 'south_africa'],
  },

  // --- Sports / Recreation ---
  'ELY': {
    assetModel: 'hybrid',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Sports & Recreation',
    tags: ['golf_equipment', 'topgolf', 'entertainment_venues'],
  },

  // --- Additional 7: Packaging / Labels / Equipment / Exchange ---
  'OI': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Packaging',
    tags: ['glass_containers', 'bottles', 'food_beverage_packaging'],
  },
  'AVY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Labels & Materials',
    tags: ['pressure_sensitive_labels', 'rfid', 'packaging_materials'],
  },
  'TORO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Outdoor Equipment',
    tags: ['lawn_mowers', 'snow_equipment', 'irrigation', 'landscaping'],
  },
  'LSEG': {
    assetModel: 'platform',
    revenueModels: ['subscription', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Financial Market Infrastructure',
    tags: ['stock_exchange', 'data_analytics', 'refinitiv', 'clearing'],
  },
  'TGNA': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'TV Broadcasting',
    tags: ['local_tv', 'news', 'political_advertising'],
  },
  'SSP': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'TV Broadcasting',
    tags: ['local_tv', 'news_stations', 'digital_media'],
  },
  'CUTR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Medical Aesthetics',
    tags: ['body_contouring', 'aesthetics', 'energy_devices', 'truSculpt'],
  },

  // ========== Batch 6: 80 NEW mid/large-cap stocks (diverse sectors) ==========
  // --- Building Materials / Construction ---
  'CNM': {
    assetModel: 'asset_heavy',
    revenueModels: ['distribution'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Water & Fire Protection Distribution',
    tags: ['waterworks', 'pipe', 'municipal', 'fire_protection'],
  },
  'USLM': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Lime & Limestone',
    tags: ['lime', 'limestone', 'construction_materials', 'environmental'],
  },
  'BCC': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Engineered Wood Products',
    tags: ['plywood', 'lumber', 'engineered_wood', 'building'],
  },
  'AGX': {
    assetModel: 'asset_light',
    revenueModels: ['project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Power Plant EPC',
    tags: ['power_plant', 'EPC', 'construction', 'natural_gas'],
  },
  'MYRG': {
    assetModel: 'asset_heavy',
    revenueModels: ['project_based'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Electrical Construction',
    tags: ['electrical', 'transmission', 'substation', 'construction'],
  },
  // --- Specialty Insurance / Title / Mortgage Insurance ---
  'JRVR': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Insurance',
    tags: ['specialty_insurance', 'E&S', 'casualty', 'workers_comp'],
  },
  'STC': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Title Insurance',
    tags: ['title_insurance', 'real_estate', 'closing', 'escrow'],
  },
  'NMI': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['mortgage_insurance', 'PMI', 'housing', 'credit_risk'],
  },
  'MGIC': {
    assetModel: 'asset_light',
    revenueModels: ['premium_service'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Mortgage Insurance',
    tags: ['mortgage_insurance', 'PMI', 'housing', 'credit_risk'],
  },
  // --- Telecom / Internet ---
  'GOOG': {
    assetModel: 'platform',
    revenueModels: ['advertising', 'subscription', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Internet & Cloud',
    tags: ['search', 'cloud', 'advertising', 'android', 'AI'],
  },
  'SATS': {
    assetModel: 'asset_heavy',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Satellite Communications',
    tags: ['satellite', 'broadband', 'connectivity', 'hughes'],
  },
  'EXTR': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Enterprise Networking',
    tags: ['networking', 'wifi', 'switches', 'cloud_managed'],
  },
  'IDCC': {
    assetModel: 'asset_light',
    revenueModels: ['licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Wireless Technology Licensing',
    tags: ['patents', 'wireless', '5G', 'licensing', 'IoT'],
  },
  // --- Chemicals / Specialty Materials / Steel ---
  'MATV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Materials',
    tags: ['films', 'filtration', 'specialty_papers', 'nonwovens'],
  },
  'SCHN': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Steel Recycling',
    tags: ['scrap_metal', 'recycling', 'ferrous', 'nonferrous'],
  },
  'TMST': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Specialty Steel',
    tags: ['alloy_steel', 'SBQ', 'industrial_steel', 'aerospace_steel'],
  },
  'TX': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flat Steel Products',
    tags: ['steel', 'flat_steel', 'Latin_America', 'mining'],
  },
  'SID': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Steel',
    tags: ['steel', 'iron_ore', 'Brazil', 'flat_steel'],
  },
  // --- Pharma / Healthcare ---
  'NOVO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'GLP-1 / Diabetes & Obesity Pharma',
    tags: ['GLP-1', 'diabetes', 'obesity', 'insulin', 'Ozempic'],
  },
  'TAK': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diversified Pharma',
    tags: ['GI', 'rare_disease', 'oncology', 'plasma', 'Japan'],
  },
  'RHHBY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diversified Pharma & Diagnostics',
    tags: ['oncology', 'diagnostics', 'immunology', 'neuroscience'],
  },
  'SOLV': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Products & Solutions',
    tags: ['wound_care', 'purification', 'dental', 'medical_surgical'],
  },
  'SHC': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Sterilization & Lab Services',
    tags: ['sterilization', 'gamma', 'ethylene_oxide', 'lab_testing'],
  },
  'AMEH': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Physician Practice Management',
    tags: ['physician_mgmt', 'value_based_care', 'ACO', 'managed_care'],
  },
  'RCM': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Healthcare Revenue Cycle Management',
    tags: ['RCM', 'medical_billing', 'coding', 'hospital_outsourcing'],
  },
  'DNA': {
    assetModel: 'platform',
    revenueModels: ['service_fee', 'licensing'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Synthetic Biology Platform',
    tags: ['synthetic_biology', 'cell_programming', 'biosecurity', 'biotech_platform'],
  },
  // --- Payments / Fintech / Finance ---
  'CPAY': {
    assetModel: 'platform',
    revenueModels: ['transaction_fee', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Corporate Payments',
    tags: ['fleet_payments', 'corporate_payments', 'tolls', 'lodging'],
  },
  'OMF': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Consumer Lending',
    tags: ['personal_loans', 'subprime', 'consumer_finance', 'branches'],
  },
  'OPFI': {
    assetModel: 'platform',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Online Consumer Lending',
    tags: ['online_lending', 'fintech', 'underbanked', 'AI_underwriting'],
  },
  'BXMT': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Commercial Mortgage REIT',
    tags: ['commercial_mortgage', 'CRE_lending', 'floating_rate', 'Blackstone'],
  },
  'MC': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Investment Banking Advisory',
    tags: ['M&A', 'advisory', 'restructuring', 'independent_bank'],
  },
  'SF': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee', 'interest_income', 'transaction_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Diversified Financial Services',
    tags: ['brokerage', 'investment_banking', 'wealth_mgmt', 'research'],
  },
  'SSB': {
    assetModel: 'asset_light',
    revenueModels: ['interest_income', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Regional Banking',
    tags: ['regional_bank', 'Southeast', 'commercial_banking', 'wealth'],
  },
  // --- Asset Management ---
  'AB': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'Diversified Asset Management',
    tags: ['research', 'fixed_income', 'equities', 'multi_asset'],
  },
  'WETF': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'managed',
    customerModel: 'B2B',
    industrySegment: 'ETF Asset Management',
    tags: ['ETFs', 'smart_beta', 'thematic', 'crypto_ETF'],
  },
  // --- Consumer / Restaurants / Retail ---
  'ENR': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Batteries & Lighting',
    tags: ['batteries', 'Energizer', 'flashlights', 'consumer_staples'],
  },
  'SPB': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Diversified Consumer Products',
    tags: ['home_garden', 'pet_care', 'personal_care', 'hardware'],
  },
  'WWW': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales'],
    deliveryModel: 'hybrid',
    customerModel: 'B2B2C',
    industrySegment: 'Footwear & Apparel',
    tags: ['footwear', 'Merrell', 'Saucony', 'outdoor_lifestyle'],
  },
  'DDD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'consumables'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: '3D Printing & Additive Manufacturing',
    tags: ['3D_printing', 'additive', 'prototyping', 'industrial_printing'],
  },
  // --- Services / Consulting ---
  'ROL': {
    assetModel: 'asset_light',
    revenueModels: ['subscription', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Pest Control Services',
    tags: ['pest_control', 'Orkin', 'recurring_revenue', 'route_based'],
  },
  'FCN': {
    assetModel: 'asset_light',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Management Consulting',
    tags: ['consulting', 'forensic', 'restructuring', 'economic_consulting'],
  },
  'DRVN': {
    assetModel: 'hybrid',
    revenueModels: ['service_fee', 'aftermarket'],
    deliveryModel: 'franchise',
    customerModel: 'B2C',
    industrySegment: 'Automotive Aftermarket Services',
    tags: ['car_wash', 'oil_change', 'auto_glass', 'collision_repair'],
  },
  'PLUS': {
    assetModel: 'asset_light',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'IT Solutions Provider',
    tags: ['IT_reseller', 'cloud_solutions', 'managed_services', 'VAR'],
  },
  'SCS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Office Furniture',
    tags: ['office_furniture', 'workspace', 'ergonomic', 'hybrid_office'],
  },
  'WLFC': {
    assetModel: 'asset_heavy',
    revenueModels: ['leasing', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Aircraft Engine Leasing',
    tags: ['aircraft_engine', 'leasing', 'spare_engines', 'aviation'],
  },
  // --- Energy / Oil & Gas / Mining ---
  'NFE': {
    assetModel: 'asset_heavy',
    revenueModels: ['throughput_fee', 'commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'LNG Infrastructure',
    tags: ['LNG', 'gas_infrastructure', 'terminals', 'power_generation'],
  },
  'WHD': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Wellhead Equipment',
    tags: ['wellhead', 'pressure_control', 'frac', 'spoolable_pipe'],
  },
  'OII': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Subsea Robotics & Engineering',
    tags: ['ROV', 'subsea', 'deepwater', 'offshore_services'],
  },
  'NE': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Offshore Drilling',
    tags: ['offshore_drilling', 'deepwater', 'jackup', 'drillship'],
  },
  'PBR': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Integrated Oil & Gas (Brazil)',
    tags: ['pre_salt', 'deepwater', 'Brazil', 'refining', 'state_owned'],
  },
  'XPRO': {
    assetModel: 'asset_heavy',
    revenueModels: ['service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Well Flow Management',
    tags: ['well_management', 'subsea', 'production_optimization', 'intervention'],
  },
  'AU': {
    assetModel: 'asset_heavy',
    revenueModels: ['commodity_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Gold Mining',
    tags: ['gold', 'mining', 'Africa', 'Americas', 'Australia'],
  },
  // --- Utilities ---
  'ETR': {
    assetModel: 'asset_heavy',
    revenueModels: ['regulated_utility'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Integrated Electric Utility',
    tags: ['nuclear', 'electric_utility', 'Gulf_South', 'regulated'],
  },
  // --- Industrials / Manufacturing ---
  'FLS': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'aftermarket'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Flow Control Equipment',
    tags: ['pumps', 'valves', 'seals', 'flow_control'],
  },
  // --- Media / Broadcasting ---
  'SBGI': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'TV Broadcasting',
    tags: ['TV_stations', 'local_news', 'political_advertising', 'retransmission'],
  },
  'GCI': {
    assetModel: 'asset_light',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Newspaper & Digital Media',
    tags: ['newspapers', 'USA_Today', 'digital_media', 'local_news'],
  },
  'LEE': {
    assetModel: 'asset_light',
    revenueModels: ['advertising', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B2C',
    industrySegment: 'Newspaper Publishing',
    tags: ['newspapers', 'local_news', 'digital_subscriptions', 'print'],
  },
  'RADI': {
    assetModel: 'asset_heavy',
    revenueModels: ['advertising'],
    deliveryModel: 'self_operated',
    customerModel: 'B2B',
    industrySegment: 'Outdoor Advertising',
    tags: ['billboards', 'outdoor', 'DOOH', 'transit_advertising'],
  },
  // --- Gaming / Leisure / Hospitality ---
  'MTN': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'subscription'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Ski Resorts & Mountain Hospitality',
    tags: ['ski_resorts', 'season_pass', 'hospitality', 'Epic_Pass'],
  },
  'BALY': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales', 'service_fee'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Casino & iGaming',
    tags: ['casino', 'sports_betting', 'iGaming', 'brick_and_mortar'],
  },
  'MLCO': {
    assetModel: 'asset_heavy',
    revenueModels: ['product_sales'],
    deliveryModel: 'self_operated',
    customerModel: 'B2C',
    industrySegment: 'Macau Casino & Resort',
    tags: ['Macau', 'casino', 'resort', 'VIP_gaming', 'mass_market'],
  },

  // ========== 80 NEW Stocks: Diverse Mid/Large-Cap (Batch 5) ==========

  // --- IT Services / Outsourcing ---
  'LSPD': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commerce Platform', tags: ['POS', 'e_commerce', 'payments', 'hospitality', 'retail_tech'] },
  'TTEC': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Customer Experience Services', tags: ['CX', 'BPO', 'contact_center', 'digital_transformation'] },
  'RGP': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Professional Consulting', tags: ['consulting', 'finance', 'transformation', 'interim_talent'] },

  // --- Telecom / Connectivity ---
  'LBRDK': { assetModel: 'asset_heavy', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Broadband Infrastructure', tags: ['broadband', 'Charter', 'cable', 'fiber', 'tracking_stock'] },
  'USM': { assetModel: 'asset_heavy', revenueModels: ['subscription', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Wireless Carrier', tags: ['wireless', 'rural', 'towers', 'postpaid', 'regional'] },
  'GOGO': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_based'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Aviation Connectivity', tags: ['inflight_wifi', 'business_aviation', '5G', 'satellite'] },
  'CABO': { assetModel: 'asset_heavy', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Cable & Broadband', tags: ['cable', 'broadband', 'video', 'rural', 'fiber'] },

  // --- Semiconductors / Electronics ---
  'NVMI': { assetModel: 'asset_light', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Semiconductor Metrology', tags: ['metrology', 'process_control', 'wafer_inspection', 'OCD'] },
  'MXL': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mixed-Signal Semiconductors', tags: ['broadband', 'connectivity', 'data_center', 'mixed_signal', 'RF'] },
  'HIMX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Display Driver ICs', tags: ['display_driver', 'TDDI', 'OLED', 'timing_controller', 'WLO'] },
  'ASX': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Semiconductor Testing', tags: ['OSAT', 'testing', 'packaging', 'bumping', 'fabless_support'] },
  'ST': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Sensors & Controls', tags: ['sensors', 'connectors', 'protection', 'industrial', 'automotive'] },
  'KOPN': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Microdisplay Technology', tags: ['microdisplay', 'AR', 'VR', 'defense_optics', 'OLED'] },
  'ITRI': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Smart Grid & IoT', tags: ['smart_meters', 'AMI', 'grid_analytics', 'IoT', 'utility_tech'] },
  'NSSC': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Security & IoT Semiconductors', tags: ['video_surveillance', 'IoT', 'access_control', 'smart_home'] },
  'BHE': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing', tags: ['EMS', 'PCB', 'defense_electronics', 'medical_devices'] },

  // --- EMS / Contract Manufacturing ---
  'FLEX': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing Services', tags: ['EMS', 'supply_chain', 'cloud', 'automotive', 'industrial'] },
  'JABIL': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing Services', tags: ['EMS', 'healthcare', '5G', 'packaging', 'automotive'] },
  'SANM': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing Services', tags: ['EMS', 'optical', 'industrial', 'defense', 'medical'] },
  'CLS': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing Services', tags: ['EMS', 'hyperscaler', 'data_center', 'networking', 'HPS'] },
  'PLXS': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electronics Manufacturing Services', tags: ['EMS', 'healthcare', 'aerospace', 'industrial', 'engineering'] },
  'TTMI': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'PCB & RF Components', tags: ['PCB', 'RF_components', 'aerospace', 'defense', 'medical'] },

  // --- Identity & Security ---
  'PING': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Identity Security', tags: ['identity', 'SSO', 'MFA', 'zero_trust', 'IAM'] },
  'SECU': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Physical Security Products', tags: ['access_control', 'intrusion', 'video', 'locks', 'fire'] },

  // --- Healthcare ---
  'PAHC': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Animal Health', tags: ['veterinary', 'companion_animal', 'livestock', 'OTC', 'parasiticide'] },
  'HCSG': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'managed', customerModel: 'B2B', industrySegment: 'Healthcare Facility Services', tags: ['housekeeping', 'dining', 'nursing_homes', 'facility_management'] },
  'BHC': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Specialty Pharma & Eye Health', tags: ['dermatology', 'GI', 'eye_health', 'Bausch_Lomb', 'generic'] },

  // --- Chemicals / Materials ---
  'ENOV': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Chemicals', tags: ['agrochemicals', 'pharma_intermediates', 'custom_synthesis', 'CDMO'] },
  'PRMW': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'distribution'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Water Solutions', tags: ['water_delivery', 'dispensers', 'filtration', 'hydration', 'exchange'] },

  // --- Oilfield Services / Midstream ---
  'ENLC': { assetModel: 'asset_heavy', revenueModels: ['gathering', 'throughput_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Midstream Gas Processing', tags: ['gathering', 'processing', 'NGL', 'Permian', 'Louisiana'] },
  'AESI': { assetModel: 'asset_heavy', revenueModels: ['gathering', 'throughput_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Midstream Oil & Gas', tags: ['gathering', 'water_midstream', 'Permian', 'produced_water'] },
  'NEX': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Oilfield Well Completions', tags: ['completion', 'frac', 'wellbore', 'cementing', 'wireline'] },

  // --- Utilities ---
  'NJR': { assetModel: 'asset_heavy', revenueModels: ['regulated_utility', 'distribution'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Natural Gas Utility', tags: ['natural_gas', 'LDC', 'New_Jersey', 'clean_energy', 'solar'] },
  'AWR': { assetModel: 'asset_heavy', revenueModels: ['regulated_utility'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Water Utility', tags: ['water', 'California', 'military_bases', 'wastewater', 'regulated'] },
  'MSEX': { assetModel: 'asset_heavy', revenueModels: ['regulated_utility'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Water Utility', tags: ['water', 'New_Jersey', 'wastewater', 'infrastructure', 'dividend_aristocrat'] },
  'NEP': { assetModel: 'asset_heavy', revenueModels: ['throughput_fee', 'commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Renewable Energy Yieldco', tags: ['wind', 'solar', 'battery_storage', 'contracted', 'yieldco'] },

  // --- Construction / Building ---
  'APG': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Architectural Products', tags: ['steel_framing', 'insulation', 'concrete', 'infrastructure', 'building'] },
  'USCR': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Ready-Mix Concrete', tags: ['concrete', 'aggregates', 'Texas', 'Oklahoma', 'construction'] },
  'ACA': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Infrastructure Products', tags: ['aggregates', 'utility_structures', 'steel', 'construction', 'engineered'] },

  // --- Consumer Products ---
  'HNST': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Clean Consumer Products', tags: ['baby', 'personal_care', 'clean_beauty', 'DTC', 'sustainability'] },
  'MNSO': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'franchise', customerModel: 'B2C', industrySegment: 'Value Lifestyle Retail', tags: ['variety', 'IP_licensing', 'China', 'global', 'affordable_lifestyle'] },
  'GPRO': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Action Cameras', tags: ['cameras', 'adventure', 'content_creation', 'subscription', 'accessories'] },
  'CRSR': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Gaming Peripherals', tags: ['keyboards', 'mice', 'headsets', 'streaming', 'Elgato'] },
  'HEAR': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Gaming Audio', tags: ['gaming_headsets', 'audio', 'console', 'PC', 'accessories'] },

  // --- Sporting Goods / Leisure ---
  'GOLF': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Golf Equipment & Apparel', tags: ['golf_balls', 'clubs', 'Titleist', 'FootJoy', 'golf_apparel'] },
  'LTH': { assetModel: 'asset_heavy', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Premium Fitness', tags: ['boutique_fitness', 'cycling', 'rowing', 'yoga', 'premium'] },
  'MTOR': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Powersports & Marine', tags: ['boats', 'engines', 'pontoons', 'outboard', 'marine'] },

  // --- Automotive Services ---
  'CARS': { assetModel: 'platform', revenueModels: ['advertising', 'subscription'], deliveryModel: 'marketplace', customerModel: 'B2B2C', industrySegment: 'Auto Marketplace', tags: ['car_listings', 'dealer_tools', 'digital_advertising', 'marketplace'] },
  'IAA': { assetModel: 'platform', revenueModels: ['transaction_fee', 'service_fee'], deliveryModel: 'marketplace', customerModel: 'B2B', industrySegment: 'Vehicle Auction', tags: ['salvage', 'auction', 'total_loss', 'insurance', 'remarketing'] },

  // --- Financial Services ---
  'KREF': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Mortgage REIT', tags: ['CRE_lending', 'floating_rate', 'senior_loans', 'transitional'] },
  'VOYA': { assetModel: 'asset_light', revenueModels: ['service_fee', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Retirement & Investment', tags: ['retirement', '401k', 'asset_management', 'insurance', 'workplace'] },
  'FHB': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Bank', tags: ['Hawaii', 'banking', 'mortgage', 'wealth_management', 'Pacific'] },
  'ASB': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Bank', tags: ['Wisconsin', 'commercial_banking', 'wealth', 'Midwest'] },
  'MGI': { assetModel: 'asset_light', revenueModels: ['transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Money Transfer', tags: ['remittance', 'money_orders', 'bill_pay', 'digital_transfer', 'global'] },
  'EEFT': { assetModel: 'asset_light', revenueModels: ['transaction_fee', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Cross-Border Payments', tags: ['ATM', 'POS', 'prepaid', 'Europe', 'money_transfer'] },
  'PAY': { assetModel: 'asset_light', revenueModels: ['transaction_fee', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Bill Payment Technology', tags: ['bill_pay', 'biller_direct', 'utilities', 'government', 'SaaS'] },
  'CTOS': { assetModel: 'asset_light', revenueModels: ['transaction_fee', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Merchant Payment Solutions', tags: ['Latin_America', 'payments', 'merchant_acquiring', 'POS', 'fintech'] },
  'HGTY': { assetModel: 'asset_light', revenueModels: ['premium_service', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Specialty Insurance', tags: ['collector_cars', 'enthusiast', 'insurance', 'marketplace', 'community'] },
  'MGP': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gaming REIT', tags: ['casino', 'resort', 'triple_net', 'MGM', 'Las_Vegas'] },

  // --- Security / Armored Transport ---
  'BCO': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Armored Transport & Cash Management', tags: ['armored_cars', 'cash_logistics', 'ATM', 'vaults', 'global'] },

  // --- Media / Broadcasting ---
  'NWS': { assetModel: 'asset_light', revenueModels: ['subscription', 'advertising'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'News & Media', tags: ['news', 'publishing', 'Dow_Jones', 'real_estate_data', 'digital'] },
  'SSTK': { assetModel: 'platform', revenueModels: ['subscription', 'licensing'], deliveryModel: 'marketplace', customerModel: 'B2B', industrySegment: 'Stock Media Platform', tags: ['stock_photos', 'video', 'music', 'AI_images', 'creative'] },

  // --- Laser / Photonics ---
  'IPGP': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'aftermarket'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Industrial Fiber Lasers', tags: ['fiber_laser', 'cutting', 'welding', 'marking', 'high_power'] },

  // --- Data & Analytics ---
  'CLVT': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Research Analytics Platform', tags: ['scientific_research', 'IP_analytics', 'life_sciences', 'academia'] },
  'CCSI': { assetModel: 'asset_light', revenueModels: ['service_fee', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Consulting & Digital Solutions', tags: ['technology_consulting', 'staffing', 'digital', 'cloud_services'] },
  'MIR': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Industrial Intelligence', tags: ['sensors', 'test_measurement', 'monitoring', 'SaaS_analytics'] },

  // --- Education ---
  'GHC': { assetModel: 'hybrid', revenueModels: ['service_fee', 'advertising'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Education & Media Conglomerate', tags: ['Kaplan', 'broadcasting', 'auto_dealerships', 'healthcare', 'diversified'] },
  'LAUR': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'International Education', tags: ['higher_education', 'K12', 'Latin_America', 'online_learning', 'global'] },
  'LINC': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Vocational Education', tags: ['nursing', 'allied_health', 'vocational', 'trade_schools', 'workforce'] },
  'APEI': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Online Higher Education', tags: ['online_university', 'military', 'adult_learners', 'APUS', 'Rasmussen'] },

  // --- Gaming / Lottery Equipment ---
  'LNW': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gaming Equipment', tags: ['slot_machines', 'systems', 'digital', 'casino_equipment'] },
  'IGT': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Lottery & Gaming Systems', tags: ['lottery', 'slot_machines', 'iGaming', 'sports_betting', 'systems'] },

  // --- Airlines ---
  'HA': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Airline', tags: ['Hawaii', 'Pacific', 'leisure', 'inter_island', 'tourism'] },

  // --- REITs ---
  'AIRC': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Apartment REIT', tags: ['multifamily', 'apartments', 'coastal', 'urban', 'same_store'] },

  // --- Insurance ---
  'PNNT': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'middle_market', 'debt', 'equity', 'private_credit'] },

  // --- Data Centers / Cloud ---
  'VNET': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'rental'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'China Data Centers', tags: ['colocation', 'China', 'cloud', 'managed_hosting', 'data_center'] },

  // --- Specialty Vehicles ---
  'SHYF': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Vehicles', tags: ['last_mile_delivery', 'EV_fleet', 'truck_bodies', 'motorhome_chassis'] },
  'MNTK': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Environmental Services', tags: ['used_oil', 're_refining', 'environmental', 'recycling', 'fleet'] },

  // --- NCR Atleos (ATM/Self-Service) ---
  'NATL': { assetModel: 'hybrid', revenueModels: ['service_fee', 'transaction_fee', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'ATM & Self-Service Banking', tags: ['ATM', 'self_service', 'banking', 'network', 'cash_management'] },

  // --- Batch: Missing from business-models (Jan 2026) ---
  'HEES': { assetModel: 'asset_heavy', revenueModels: ['rental', 'product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Equipment Rental', tags: ['heavy_equipment', 'construction', 'cranes', 'earthmoving', 'fleet'] },
  'INFO': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Financial Data & Analytics', tags: ['data', 'analytics', 'indices', 'benchmarks', 'financial_intelligence'] },
  'IPG': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Advertising & Marketing', tags: ['advertising', 'media', 'creative', 'PR', 'agency_holding'] },
  'IQVIA': { assetModel: 'asset_light', revenueModels: ['service_fee', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Pharma CRO & Data Analytics', tags: ['CRO', 'clinical_trials', 'pharma_data', 'real_world_evidence', 'analytics'] },
  'KALU': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Aluminum', tags: ['aluminum', 'aerospace', 'automotive', 'packaging', 'specialty_metals'] },
  'NCR': { assetModel: 'hybrid', revenueModels: ['product_sales', 'service_fee', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'POS & ATM Technology', tags: ['POS', 'ATM', 'retail_tech', 'hospitality', 'digital_banking'] },

  // --- Batch: Additional missing stocks (Jan 2026 - Set B) ---
  'NWLI': { assetModel: 'asset_light', revenueModels: ['premium_service', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Life Insurance', tags: ['life_insurance', 'annuities', 'universal_life', 'conservative'] },
  'OFC': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'self_operated', customerModel: 'B2G', industrySegment: 'Office REIT', tags: ['REIT', 'office', 'defense', 'government', 'data_center'] },
  'OMC': { assetModel: 'asset_light', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Advertising & PR', tags: ['advertising', 'PR', 'media', 'digital', 'creative'] },
  'PAYA': { assetModel: 'platform', revenueModels: ['transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Payment Processing', tags: ['payments', 'integrated', 'ISV', 'B2B_payments', 'ACH'] },
  'PGRE': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Office REIT', tags: ['REIT', 'office', 'Class_A', 'New_York', 'San_Francisco'] },
  'RRGB': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Casual Dining', tags: ['restaurant', 'casual_dining', 'burgers', 'full_service'] },
  'RVTY': { assetModel: 'hybrid', revenueModels: ['product_sales', 'consumables', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Diagnostics & Life Sciences', tags: ['diagnostics', 'genomics', 'newborn_screening', 'life_sciences'] },
  'TRMK': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Mississippi', 'mortgage', 'wealth'] },
  'TPC': { assetModel: 'asset_heavy', revenueModels: ['project_based'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Construction', tags: ['construction', 'civil', 'building', 'specialty', 'infrastructure'] },
  'TR': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Confectionery', tags: ['candy', 'Tootsie_Roll', 'sugar', 'chocolate', 'iconic_brands'] },
  'WTM': { assetModel: 'asset_light', revenueModels: ['premium_service', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Insurance', tags: ['insurance', 'reinsurance', 'holding_company', 'specialty'] },
  'WSP': { assetModel: 'asset_light', revenueModels: ['service_fee', 'project_based'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Engineering Consulting', tags: ['engineering', 'consulting', 'infrastructure', 'environment', 'global'] },

  // --- Batch: Missing from business-models (Jan 2026 - Set C) ---
  'ALEX': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Hawaii REIT', tags: ['REIT', 'Hawaii', 'commercial', 'land', 'diversified'] },
  'BKI': { assetModel: 'platform', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage Technology', tags: ['mortgage', 'fintech', 'servicing', 'origination', 'data_analytics'] },
  'DISH': { assetModel: 'asset_heavy', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Satellite TV & Wireless', tags: ['satellite', 'pay_TV', 'wireless', 'spectrum', 'Sling'] },
  'DLB': { assetModel: 'asset_light', revenueModels: ['licensing', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Audio & IP Licensing', tags: ['audio', 'cinema', 'licensing', 'Atmos', 'Vision'] },
  'DRH': { assetModel: 'asset_heavy', revenueModels: ['rental'], deliveryModel: 'managed', customerModel: 'B2C', industrySegment: 'Hotel REIT', tags: ['REIT', 'hotel', 'resort', 'lodging', 'premium'] },
  'EPC': { assetModel: 'hybrid', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Personal Care', tags: ['razors', 'sun_care', 'feminine', 'Schick', 'Banana_Boat'] },
  'FN': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Optical Packaging & EMS', tags: ['optical', 'packaging', 'precision', 'telecom', 'data_center'] },
  'FRGI': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Quick Service Restaurants', tags: ['restaurant', 'Pollo_Tropical', 'fast_casual', 'Latin'] },
  'GDOT': { assetModel: 'platform', revenueModels: ['transaction_fee', 'interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Fintech & Prepaid Banking', tags: ['prepaid', 'debit', 'BaaS', 'mobile_banking', 'underbanked'] },

  // --- Batch: Small-cap Biotech/Pharma & Healthcare Services (Jan 2026) ---
  'ANIK': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Regenerative Medicine', tags: ['hyaluronic_acid', 'orthopedic', 'regenerative', 'joint_pain'] },
  'ARNA': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['GI', 'inflammation', 'S1P_receptor', 'autoimmune'] },
  'BHG': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Behavioral Health', tags: ['addiction', 'mental_health', 'rehab', 'substance_abuse'] },
  'BLFS': { assetModel: 'asset_light', revenueModels: ['product_sales', 'consumables'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cell Therapy Biopreservation', tags: ['biopreservation', 'cell_therapy', 'cold_chain', 'media'] },
  'CALA': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['oncology', 'RAS', 'targeted_therapy', 'precision_medicine'] },
  'CERE': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gene Therapy Biotech', tags: ['gene_therapy', 'neurology', 'rare_disease', 'AAV'] },
  'CGEN': { assetModel: 'asset_light', revenueModels: ['licensing', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Computational Biotech', tags: ['drug_discovery', 'AI', 'computational_biology', 'immuno_oncology'] },
  'CNSP': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['CNS', 'pain', 'neurology', 'rare_disease'] },
  'COGT': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cell Therapy Biotech', tags: ['NK_cell', 'cell_therapy', 'oncology', 'allogeneic'] },
  'DARE': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Womens Health Pharma', tags: ['womens_health', 'contraception', 'fertility', 'gynecology'] },
  'DMTK': { assetModel: 'asset_light', revenueModels: ['product_sales', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Dermatology Diagnostics', tags: ['genomics', 'dermatology', 'melanoma', 'diagnostics'] },
  'ETON': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Pharma', tags: ['hospital', 'injectable', 'orphan_drug', 'niche_pharma'] },
  'EVLO': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['protein_engineering', 'oncology', 'immuno_oncology', 'bispecific'] },
  'GALT': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['galectin', 'fibrosis', 'liver', 'NASH'] },
  'GHRS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Endocrinology Pharma', tags: ['growth_hormone', 'endocrinology', 'rare_disease', 'pediatric'] },
  'HARP': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['oncology', 'antibody', 'immunology', 'targeted_therapy'] },
  'ICPT': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Liver Disease Pharma', tags: ['NASH', 'PBC', 'liver', 'FXR_agonist'] },
  'LXRX': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['diabetes', 'metabolic', 'SGLT_inhibitor', 'heart_failure'] },
  'MDXH': { assetModel: 'asset_heavy', revenueModels: ['service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Healthcare IT & Services', tags: ['radiology', 'telehealth', 'imaging', 'AI_diagnostics'] },
  'MLAB': { assetModel: 'asset_light', revenueModels: ['product_sales', 'consumables'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Life Science Tools', tags: ['sterilization', 'lab_equipment', 'diagnostics', 'biological_indicators'] },
  'MRSN': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'ADC Biotech', tags: ['ADC', 'antibody_drug_conjugate', 'oncology', 'targeted'] },
  'NKTR': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech Platform', tags: ['polymer_conjugate', 'immuno_oncology', 'pain', 'autoimmune'] },
  'OBSV': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Womens Health Pharma', tags: ['womens_health', 'reproductive', 'fertility', 'endometriosis'] },
  'ONCT': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Oncology Biotech', tags: ['oncology', 'kinase_inhibitor', 'solid_tumor', 'targeted'] },
  'ONEM': { assetModel: 'platform', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Digital Health', tags: ['primary_care', 'virtual_care', 'employer_health', 'membership'] },
  'OPGN': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Diagnostics', tags: ['infectious_disease', 'rapid_diagnostics', 'AMR', 'hospital'] },
  'OTIC': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['otology', 'hearing_loss', 'tinnitus', 'ear'] },
  'PLSE': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Medical Devices', tags: ['lithotripsy', 'urology', 'kidney_stones', 'shockwave'] },
  'PRLD': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['autoimmune', 'inflammation', 'antibody', 'T_cell'] },
  'PRTX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['oncology', 'conditional_activation', 'protease', 'tumor_targeted'] },
  'QDEL': { assetModel: 'asset_light', revenueModels: ['product_sales', 'consumables'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Rapid Diagnostics', tags: ['diagnostics', 'rapid_test', 'infectious_disease', 'POC'] },
  'REPL': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Gene Therapy Biotech', tags: ['gene_therapy', 'rare_disease', 'lysosomal', 'AAV'] },
  // --- Batch: Small-Cap Tech/SaaS/Fintech (Jan 2026) ---
  'AAN': { assetModel: 'asset_heavy', revenueModels: ['leasing', 'rental'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Lease-to-Own Retail', tags: ['lease_to_own', 'furniture', 'electronics', 'retail'] },
  'AMSF': { assetModel: 'asset_light', revenueModels: ['premium_service', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Insurance', tags: ['workers_comp', 'insurance', 'small_business'] },
  'AMWD': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Building Products', tags: ['cabinetry', 'kitchen', 'bath', 'home_improvement'] },
  'APSG': { assetModel: 'asset_light', revenueModels: ['service_fee', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Professional Services & Staffing', tags: ['staffing', 'consulting', 'outsourcing', 'workforce'] },
  'BBSI': { assetModel: 'asset_light', revenueModels: ['service_fee', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'PEO & HR Services', tags: ['PEO', 'HR', 'payroll', 'workers_comp', 'SMB'] },
  'CASA': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Telecom Equipment', tags: ['5G', 'OpenRAN', 'telecom', 'networking', 'wireless'] },
  'CASS': { assetModel: 'asset_light', revenueModels: ['service_fee', 'transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Payment & Information Services', tags: ['freight_audit', 'payment_processing', 'telecom_expense'] },
  'CLDN': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_based'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cloud Security', tags: ['cloud', 'security', 'identity', 'SaaS', 'zero_trust'] },
  'CMBM': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Wireless Networking Equipment', tags: ['fixed_wireless', 'broadband', 'networking', 'PTP', 'PMP'] },
  'COUP': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cloud Software', tags: ['BSM', 'procurement', 'spend_management', 'SaaS', 'enterprise'] },
  'DCT': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Clean Energy Software', tags: ['renewable', 'energy', 'software', 'sustainability', 'carbon'] },
  'DH': { assetModel: 'asset_light', revenueModels: ['subscription', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Healthcare IT', tags: ['EHR', 'healthcare', 'analytics', 'SaaS', 'clinical'] },
  'KVYO': { assetModel: 'platform', revenueModels: ['subscription', 'usage_based'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Marketing Automation', tags: ['email', 'SMS', 'marketing', 'ecommerce', 'automation'] },
  'LAWS': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cloud Software', tags: ['ERP', 'apparel', 'retail', 'supply_chain', 'SaaS'] },
  'NOMD': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Packaging Solutions', tags: ['packaging', 'healthcare', 'food', 'sustainable', 'industrial'] },
  'OPAD': { assetModel: 'platform', revenueModels: ['transaction_fee', 'service_fee'], deliveryModel: 'marketplace', customerModel: 'B2B2C', industrySegment: 'Real Estate Technology', tags: ['iBuyer', 'real_estate', 'proptech', 'marketplace', 'digital'] },

  // --- Batch: Financials/Banks/Insurance/Industrials (Jan 2026 - Set D) ---
  'AAWW': { assetModel: 'asset_heavy', revenueModels: ['service_fee', 'leasing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Air Cargo & Leasing', tags: ['air_freight', 'cargo', 'aircraft_leasing', 'ACMI', 'logistics'] },
  'ABUS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Biotech', tags: ['gene_editing', 'RNA', 'CRISPR', 'genetic_medicine', 'clinical_stage'] },
  'AGO': { assetModel: 'asset_light', revenueModels: ['premium_service', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Financial Guarantee Insurance', tags: ['bond_insurance', 'municipal', 'structured_finance', 'guarantee', 'public_finance'] },
  'BRKL': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Massachusetts', 'commercial_lending', 'mortgage'] },
  'CIGI': { assetModel: 'asset_light', revenueModels: ['service_fee', 'transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Real Estate Services', tags: ['CRE_services', 'brokerage', 'property_management', 'valuation', 'global'] },
  'CNOB': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Connecticut', 'commercial_lending', 'small_business'] },
  'CRGY': { assetModel: 'asset_heavy', revenueModels: ['commodity_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Oil & Gas E&P', tags: ['oil_gas', 'upstream', 'Permian', 'acquisition', 'mineral_rights'] },
  'EBC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'New_England', 'commercial_banking', 'wealth_management'] },
  'FBNC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'North_Carolina', 'mortgage', 'wealth_management'] },
  'GNTY': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Texas', 'commercial_lending', 'SBA'] },
  'IBTX': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Texas', 'commercial_real_estate', 'growth'] },
  'INDB': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Massachusetts', 'commercial_banking', 'wealth_management'] },
  'LKFN': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Indiana', 'commercial_lending', 'trust'] },
  'NNI': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Student Lending & Services', tags: ['student_loans', 'education_finance', 'loan_servicing', 'Nelnet', 'fintech'] },
  'PB': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'California', 'commercial_banking', 'CRE_lending'] },
  'PFBC': { assetModel: 'asset_light', revenueModels: ['interest_income', 'service_fee'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Regional Banking', tags: ['bank', 'community', 'Pennsylvania', 'commercial_lending', 'wealth_management'] },
  'PRA': { assetModel: 'asset_light', revenueModels: ['service_fee', 'transaction_fee'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Debt Collection', tags: ['debt_purchasing', 'collections', 'NPL', 'consumer_debt', 'recovery'] },
  'UFCS': { assetModel: 'asset_light', revenueModels: ['premium_service', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'P&C Insurance', tags: ['property_casualty', 'commercial_lines', 'surety', 'small_business', 'Midwest'] },
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
