/**
 * 行业链条映射配置 v2.0
 *
 * 基于 FMP 的 Industry 分类，定义上下游关系
 *
 * 核心逻辑框架 (从半导体泛化):
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  设备/材料供应商 → 制造商/加工商 → 设计/品牌商 → 终端应用/消费  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * 该模式适用于:
 * - 半导体: 设备商 → 代工厂 → Fabless → 消费电子
 * - 航空航天: 发动机 → 飞机制造 → 航空租赁 → 航空公司 → 旅游
 * - 油气: 油服设备 → E&P → 炼化 → 化工/运输
 * - 汽车: 材料 → 零部件 → 整车厂 → 经销商
 * - 医疗: 生物技术 → 制药 → 分销 → 零售/医院
 * - 云计算: 芯片 → 服务器/网络 → 数据中心 → 云服务 → SaaS
 * - 建筑: 原材料 → 机械设备 → 工程承包 → 房地产
 * - 金融: 交易所/数据 → 投行券商 → 资管 → 终端客户
 */

export interface IndustryChainConfig {
  // 上游 -> 下游行业列表 (FMP Industry级别)
  upstreamToDownstream: Record<string, string[]>;

  // 互补关系 (非上下游，但业务相关)
  complementary: Record<string, string[]>;

  // 行业分组 (同一产业链的所有参与者)
  industryGroups: Record<string, string[]>;

  // 子行业分类覆盖 (用于FMP未细分的行业)
  // symbol -> 更精细的子行业分类
  subIndustryOverrides: Record<string, string>;

  // 子行业上下游关系
  subIndustryChains: Record<string, string[]>;
}

/**
 * 完整的行业链条映射
 */
export const INDUSTRY_CHAIN_CONFIG: IndustryChainConfig = {
  upstreamToDownstream: {
    // ========== 半导体产业链 ==========
    'Semiconductor Equipment & Materials': [
      'Semiconductors',
    ],

    'Semiconductors': [
      'Consumer Electronics',
      'Computer Hardware',
      'Communication Equipment',
      'Electronic Components',
      'Auto - Manufacturers',
      'Software - Infrastructure',
    ],

    // ========== 航空航天产业链 ==========
    'Aerospace & Defense': [
      'Airlines, Airports & Air Services',
      'Air Freight & Logistics',
    ],

    'Airlines, Airports & Air Services': [
      'Lodging',
      'Resorts & Casinos',
      'Travel Services',
    ],

    // ========== 油气产业链 ==========
    'Oil & Gas Equipment & Services': [
      'Oil & Gas Exploration & Production',
      'Oil & Gas Integrated',
    ],

    'Oil & Gas Exploration & Production': [
      'Oil & Gas Midstream',
      'Oil & Gas Refining & Marketing',
    ],

    'Oil & Gas Integrated': [
      'Oil & Gas Refining & Marketing',
      'Chemicals',
    ],

    'Oil & Gas Midstream': [
      'Oil & Gas Refining & Marketing',
    ],

    'Oil & Gas Refining & Marketing': [
      'Chemicals',
      'Chemicals - Specialty',
      'Airlines, Airports & Air Services',
      'Trucking',
      'Marine Shipping',
    ],

    // ========== 汽车产业链 ==========
    'Chemicals - Specialty': [
      'Auto - Parts',
      'Auto - Manufacturers',
      'Electrical Equipment & Parts',
    ],

    'Auto - Parts': [
      'Auto - Manufacturers',
    ],

    'Auto - Manufacturers': [
      'Auto & Truck Dealerships',
      'Rental & Leasing Services',
    ],

    // ========== 建筑/基建产业链 ==========
    'Steel': [
      'Construction & Engineering',
      'Farm & Heavy Construction Machinery',
      'Metal Fabrication',
      'Auto - Manufacturers',
      'Aerospace & Defense',
    ],

    'Other Industrial Metals & Mining': [
      'Steel',
      'Construction Materials',
      'Electrical Equipment & Parts',
    ],

    'Construction Materials': [
      'Construction & Engineering',
      'Residential Construction',
      'Building Materials',
    ],

    'Farm & Heavy Construction Machinery': [
      'Agricultural Inputs',
      'Construction & Engineering',
      'Oil & Gas Exploration & Production',
    ],

    'Construction & Engineering': [
      'Residential Construction',
      'Real Estate - Development',
      'Real Estate - Diversified',
    ],

    // ========== 医疗产业链 ==========
    'Biotechnology': [
      'Drug Manufacturers - General',
      'Drug Manufacturers - Specialty & Generic',
      'Medical - Distribution',
    ],

    'Drug Manufacturers - General': [
      'Medical - Distribution',
      'Pharmaceutical Retailers',
      'Medical - Care Facilities',
    ],

    'Drug Manufacturers - Specialty & Generic': [
      'Medical - Distribution',
      'Pharmaceutical Retailers',
    ],

    'Medical - Distribution': [
      'Pharmaceutical Retailers',
      'Medical - Care Facilities',
      'Medical - Healthcare Plans',
    ],

    'Medical - Devices': [
      'Medical - Care Facilities',
      'Medical - Diagnostics & Research',
    ],

    'Medical - Instruments & Equipment': [
      'Medical - Care Facilities',
      'Medical - Diagnostics & Research',
    ],

    // ========== 科技/云计算产业链 ==========
    'Computer Hardware': [
      'Information Technology Services',
      'Software - Infrastructure',
    ],

    'Communication Equipment': [
      'Telecom Services',
      'Information Technology Services',
    ],

    'Software - Infrastructure': [
      'Software - Application',
      'Information Technology Services',
      'Internet Content & Information',
    ],

    'Information Technology Services': [
      'Software - Application',
      'Financial - Data & Stock Exchanges',
    ],

    // ========== 金融服务产业链 ==========
    'Financial - Data & Stock Exchanges': [
      'Capital Markets',
      'Asset Management',
      'Banks - Diversified',
    ],

    'Financial - Credit Services': [
      'Consumer Finance',
      'Banks - Regional',
      'Banks - Diversified',
    ],

    'Capital Markets': [
      'Asset Management',
    ],

    // ========== 零售/消费产业链 ==========
    'Agricultural Inputs': [
      'Farm Products',
    ],

    'Farm Products': [
      'Packaged Foods',
      'Food Distribution',
      'Beverages - Non-Alcoholic',
      'Beverages - Alcoholic',
    ],

    'Food Distribution': [
      'Grocery Stores',
      'Discount Stores',
      'Restaurants',
    ],

    'Packaged Foods': [
      'Grocery Stores',
      'Discount Stores',
      'Restaurants',
    ],

    'Beverages - Non-Alcoholic': [
      'Grocery Stores',
      'Discount Stores',
      'Restaurants',
    ],

    'Beverages - Alcoholic': [
      'Grocery Stores',
      'Restaurants',
    ],

    // ========== 物流/运输产业链 ==========
    // 航运是全球贸易的基础设施，服务于多个下游行业
    'Marine Shipping': [
      'Internet Retail',        // 电商进口
      'Specialty Retail',       // 零售商进口
      'Discount Stores',        // 折扣店进口
      'Auto - Manufacturers',   // 汽车零部件
      'Consumer Electronics',   // 消费电子
      'Semiconductors',         // 芯片运输
      'Chemicals',              // 化工品
      'Steel',                  // 钢铁
    ],

    'Trucking': [
      'Integrated Freight & Logistics',
      'Internet Retail',
      'Specialty Retail',
    ],

    'Railroads': [
      'Integrated Freight & Logistics',
      'Steel',
      'Chemicals',
      'Agriculture',
    ],

    'Integrated Freight & Logistics': [
      'Specialty Retail',
      'Internet Retail',
      'Discount Stores',
    ],

    // 航空货运 - 高价值、时效性货物
    'Air Freight & Logistics': [
      'Semiconductors',
      'Medical - Devices',
      'Internet Retail',
      'Consumer Electronics',
    ],

    // ========== 电信/通信产业链 ==========
    'Telecom Services': [
      'Internet Content & Information',
      'Entertainment',
    ],

    // ========== 公用事业/能源产业链 ==========
    'Electrical Equipment & Parts': [
      'Utilities - Regulated Electric',
      'Utilities - Renewable',
      'Utilities - Independent Power Producers',
    ],

    'Solar': [
      'Utilities - Renewable',
      'Utilities - Independent Power Producers',
    ],

    'Uranium': [
      'Utilities - Regulated Electric',
    ],

    // ========== 保险产业链 ==========
    'Insurance Brokers': [
      'Insurance - Property & Casualty',
      'Insurance - Life',
      'Insurance - Diversified',
    ],

    'Insurance - Property & Casualty': [
      'Auto & Truck Dealerships',
      'Residential Construction',
    ],

    // ========== 包装产业链 ==========
    'Packaging & Containers': [
      'Packaged Foods',
      'Beverages - Non-Alcoholic',
      'Beverages - Alcoholic',
      'Household & Personal Products',
    ],

    // ========== 个人护理/家居产业链 ==========
    'Household & Personal Products': [
      'Grocery Stores',
      'Discount Stores',
      'Specialty Retail',
    ],

    // ========== REIT产业链 ==========
    'REIT - Industrial': [
      'Integrated Freight & Logistics',
      'Internet Retail',
    ],

    'REIT - Retail': [
      'Specialty Retail',
      'Restaurants',
    ],

    // ========== 人力资源/专业服务 ==========
    'Staffing & Employment Services': [
      'Information Technology Services',
      'Medical - Care Facilities',
      'Construction & Engineering',
    ],

    // ========== 废弃物管理 ==========
    'Waste Management': [
      'Construction & Engineering',
      'Residential Construction',
      'Oil & Gas Exploration & Production',
    ],

    // ========== 互联网/电商产业链 ==========
    'Internet Retail': [
      'Specialty Retail',            // 电商替代实体零售
      'Discount Stores',             // 竞争
    ],

    // ========== 广告/媒体产业链 ==========
    'Advertising Agencies': [
      'Internet Content & Information',  // 数字广告投放
      'Entertainment',                   // 媒体广告
      'Telecom Services',                // 电信广告
    ],

    // ========== 房地产/住宅产业链 ==========
    'Residential Construction': [
      'Building Materials',          // 建材采购
      'Household & Personal Products', // 入住采购
      'Furnishings, Fixtures & Appliances', // 家电家居
    ],

    'Building Materials': [
      'Residential Construction',    // 住宅建设
      'Construction & Engineering',  // 商业建设
    ],

    // ========== 教育/人力产业链 ==========
    'Education & Training Services': [
      'Staffing & Employment Services',  // 人才输出
      'Information Technology Services',  // IT人才
    ],

    // ========== 支付/金融科技 ==========
    'Financial - Conglomerates': [
      'Banks - Diversified',
      'Insurance - Diversified',
      'Capital Markets',
    ],

    'Banks - Diversified': [
      'Banks - Regional',
      'Financial - Credit Services',
    ],

    // ========== 娱乐/内容 ==========
    'Entertainment': [
      'Leisure',
      'Gambling',
    ],

    // ========== 游戏 ==========
    'Electronic Gaming & Multimedia': [
      'Internet Content & Information',
      'Consumer Electronics',
    ],

    // ========== 奢侈品/服装 ==========
    'Luxury Goods': [
      'Specialty Retail',
      'Internet Retail',
    ],

    'Apparel - Manufacturers': [
      'Apparel - Retail',
      'Specialty Retail',
      'Internet Retail',
    ],

    'Footwear & Accessories': [
      'Specialty Retail',
      'Internet Retail',
      'Discount Stores',
    ],

    'Personal Care Products': [
      'Grocery Stores',
      'Specialty Retail',
      'Discount Stores',
    ],

    // ========== 工业设备 ==========
    'Specialty Industrial Machinery': [
      'Construction & Engineering',
      'Oil & Gas Exploration & Production',
      'Auto - Manufacturers',
    ],

    'Industrial Distribution': [
      'Construction & Engineering',
      'Farm & Heavy Construction Machinery',
      'Auto - Parts',
    ],

    'Scientific & Technical Instruments': [
      'Medical - Diagnostics & Research',
      'Construction & Engineering',
      'Oil & Gas Exploration & Production',
    ],

    'Industrial Conglomerates': [
      'Aerospace & Defense',
      'Construction & Engineering',
      'Auto - Manufacturers',
      'Utilities - Regulated Electric',
    ],
  },

  complementary: {
    // 服务同一客户群但非上下游
    'Apparel - Retail': [
      'Footwear & Accessories',
      'Apparel - Manufacturers',
    ],

    'Restaurants': [
      'Packaged Foods',
      'Beverages - Non-Alcoholic',
      'Food Distribution',
    ],

    'Lodging': [
      'Airlines, Airports & Air Services',
      'Travel Services',
      'Resorts & Casinos',
    ],

    'Banks - Diversified': [
      'Insurance - Life',
      'Asset Management',
      'Capital Markets',
      'Banks - Regional',
    ],

    // 医疗互补
    'Medical - Healthcare Plans': [
      'Medical - Care Facilities',
      'Pharmaceutical Retailers',
      'Medical - Devices',
    ],

    // 云计算互补
    'Internet Content & Information': [
      'Software - Application',
      'Entertainment',
      'Electronic Gaming & Multimedia',
    ],

    // 零售互补
    'Specialty Retail': [
      'Internet Retail',
      'Discount Stores',
      'Apparel - Retail',
    ],

    'Grocery Stores': [
      'Discount Stores',
      'Household Products',
      'Packaged Foods',
    ],

    // 能源互补
    'Oil & Gas Exploration & Production': [
      'Oil & Gas Midstream',
      'Marine Shipping',
    ],

    'Utilities - Regulated Electric': [
      'Utilities - Renewable',
      'Utilities - Independent Power Producers',
      'Solar',
    ],

    // 房地产互补
    'Residential Construction': [
      'Building Materials',
      'Banks - Regional',
      'Insurance - Property & Casualty',
    ],

    // 支付/金融互补
    'Financial - Credit Services': [
      'Internet Retail',
      'Specialty Retail',
      'Travel Services',
    ],

    // 物流互补
    'Integrated Freight & Logistics': [
      'Railroads',
      'Trucking',
      'Marine Shipping',
    ],

    // 科技硬件互补
    'Consumer Electronics': [
      'Electronic Gaming & Multimedia',
      'Software - Application',
      'Telecom Services',
    ],

    'Semiconductors': [
      'Electronic Components',
      'Computer Hardware',
      'Communication Equipment',
    ],

    // 汽车互补
    'Auto - Manufacturers': [
      'Auto - Parts',
      'Rental & Leasing Services',
      'Insurance - Property & Casualty',
    ],

    // 传媒/娱乐互补
    'Entertainment': [
      'Electronic Gaming & Multimedia',
      'Internet Content & Information',
      'Advertising Agencies',
    ],

    // 工业互补
    'Industrial Distribution': [
      'Electrical Equipment & Parts',
      'Farm & Heavy Construction Machinery',
      'Specialty Industrial Machinery',
    ],

    // 消费品互补
    'Household Products': [
      'Personal Care Products',
      'Packaged Foods',
    ],

    'Beverages - Alcoholic': [
      'Beverages - Non-Alcoholic',
      'Restaurants',
      'Grocery Stores',
    ],

    // REIT互补
    'REIT - Retail': [
      'REIT - Industrial',
      'Specialty Retail',
      'Restaurants',
    ],

    // 保险互补
    'Insurance - Life': [
      'Insurance - Property & Casualty',
      'Insurance Brokers',
      'Asset Management',
    ],

    // 电信互补
    'Telecom Services': [
      'Internet Content & Information',
      'Software - Infrastructure',
      'Communication Equipment',
    ],

    // 航空旅游互补
    'Airlines, Airports & Air Services': [
      'Lodging',
      'Travel Services',
      'Resorts & Casinos',
    ],

    // 生物科技互补
    'Biotechnology': [
      'Drug Manufacturers - General',
      'Medical - Devices',
      'Medical - Diagnostics & Research',
    ],

    // 农业互补
    'Agricultural Inputs': [
      'Farm Products',
      'Farm & Heavy Construction Machinery',
      'Packaged Foods',
    ],

    // 建筑互补
    'Construction & Engineering': [
      'Construction Materials',
      'Building Materials',
      'Residential Construction',
    ],

    // 可再生能源互补
    'Solar': [
      'Electrical Equipment & Parts',
      'Utilities - Renewable',
      'Uranium',
    ],

    // 科技基础设施互补
    'Software - Infrastructure': [
      'Information Technology Services',
      'Semiconductors',
      'Communication Equipment',
    ],

    // 教育互补
    'Education & Training Services': [
      'Software - Application',
      'Internet Content & Information',
      'Staffing & Employment Services',
    ],

    // 奢侈品互补
    'Luxury Goods': [
      'Apparel - Manufacturers',
      'Footwear & Accessories',
      'Lodging',
    ],

    // 废物处理互补
    'Waste Management': [
      'Construction & Engineering',
      'Utilities - Regulated Electric',
      'Chemicals - Specialty',
    ],

    // 食品互补
    'Packaged Foods': [
      'Beverages - Non-Alcoholic',
      'Grocery Stores',
      'Food Distribution',
    ],

    // 资本市场互补
    'Capital Markets': [
      'Financial - Data & Stock Exchanges',
      'Asset Management',
      'Insurance Brokers',
    ],
  },

  industryGroups: {
    'Semiconductor Chain': [
      'Semiconductor Equipment & Materials',
      'Semiconductors',
      'Consumer Electronics',
      'Computer Hardware',
      'Electronic Components',
    ],

    'Oil & Gas Chain': [
      'Oil & Gas Equipment & Services',
      'Oil & Gas Exploration & Production',
      'Oil & Gas Integrated',
      'Oil & Gas Midstream',
      'Oil & Gas Refining & Marketing',
      'Chemicals',
    ],

    'Healthcare Chain': [
      'Biotechnology',
      'Drug Manufacturers - General',
      'Drug Manufacturers - Specialty & Generic',
      'Medical - Distribution',
      'Pharmaceutical Retailers',
      'Medical - Care Facilities',
      'Medical - Healthcare Plans',
      'Medical - Devices',
      'Medical - Instruments & Equipment',
    ],

    'Construction Chain': [
      'Other Industrial Metals & Mining',
      'Steel',
      'Construction Materials',
      'Farm & Heavy Construction Machinery',
      'Construction & Engineering',
      'Residential Construction',
      'Building Materials',
    ],

    'Auto Chain': [
      'Chemicals - Specialty',
      'Auto - Parts',
      'Auto - Manufacturers',
      'Auto & Truck Dealerships',
      'Rental & Leasing Services',
    ],

    'Aviation Chain': [
      'Aerospace & Defense',
      'Airlines, Airports & Air Services',
      'Air Freight & Logistics',
      'Lodging',
      'Travel Services',
    ],

    'Tech/Cloud Chain': [
      'Semiconductors',
      'Computer Hardware',
      'Communication Equipment',
      'Software - Infrastructure',
      'Software - Application',
      'Information Technology Services',
      'Internet Content & Information',
    ],

    'Financial Chain': [
      'Financial - Data & Stock Exchanges',
      'Financial - Credit Services',
      'Capital Markets',
      'Asset Management',
      'Banks - Diversified',
      'Banks - Regional',
      'Insurance - Property & Casualty',
      'Insurance - Life',
      'Insurance - Diversified',
      'Insurance Brokers',
    ],

    'Consumer Retail Chain': [
      'Agricultural Inputs',
      'Farm Products',
      'Packaged Foods',
      'Beverages - Non-Alcoholic',
      'Food Distribution',
      'Grocery Stores',
      'Discount Stores',
      'Specialty Retail',
      'Restaurants',
    ],

    'Industrial Chain': [
      'Other Industrial Metals & Mining',
      'Steel',
      'Construction Materials',
      'Farm & Heavy Construction Machinery',
      'Construction & Engineering',
      'Industrial Conglomerates',
      'Railroads',
      'Trucking',
      'Integrated Freight & Logistics',
    ],

    'Packaging Chain': [
      'Other Industrial Metals & Mining',
      'Packaging & Containers',
      'Packaged Foods',
      'Beverages - Non-Alcoholic',
    ],

    'Chemicals Chain': [
      'Chemicals',
      'Chemicals - Specialty',
      'Construction Materials',
      'Auto - Parts',
      'Packaged Foods',
    ],

    'Environmental Services Chain': [
      'Waste Collection',
      'Waste Processing',
      'Environmental Remediation',
      'Hazardous Waste',
    ],

    'Professional Services Chain': [
      'Staffing & Temp',
      'Professional Services',
      'Uniform & Workplace',
    ],

    'Education Chain': [
      'Education Services',
      'EdTech',
    ],

    'Precious Metals Chain': [
      'Gold Mining',
      'Precious Metals Streaming',
    ],

    'EV Infrastructure Chain': [
      'EV Charging',
      'EV Battery',
      'EV OEM',
    ],

    'Real Estate Services Chain': [
      'Commercial Real Estate Services',
      'Residential Real Estate Tech',
    ],

    'Data Center Chain': [
      'Data Center Infrastructure',
      'Data Center REIT',
      'Cloud Computing',
    ],

    'Shipping & Maritime Chain': [
      'Marine Shipping',
      'Container Shipping',
      'Dry Bulk Shipping',
      'Crude Tanker',
      'Product Tanker',
      'LNG Shipping',
    ],

    'Insurance Chain': [
      'Insurance - Property & Casualty',
      'Insurance - Life',
      'Insurance Brokers',
      'Insurance - Diversified',
    ],

    'REIT Chain': [
      'Industrial REIT',
      'Retail REIT',
      'Net Lease REIT',
      'Residential REIT',
      'Office REIT',
      'Healthcare REIT',
      'Self-Storage REIT',
      'Data Center REIT',
    ],

    'Digital Advertising Chain': [
      'Social Platform',
      'AdTech DSP',
      'AdTech Verification',
      'AdTech SSP',
      'AdTech Platform',
      'Streaming',
      'Audio Streaming',
    ],

    'Beauty & Personal Care Chain': [
      'Prestige Beauty',
      'Mass Beauty',
      'Beauty Retail',
      'Household Products',
    ],

    'Apparel & Fashion Chain': [
      'Athletic Apparel',
      'Accessible Luxury',
      'Fashion Brand',
      'Luxury Apparel',
      'Outdoor Apparel',
      'Basics Apparel',
      'Denim Brand',
      'Apparel Retail',
      'Sporting Goods Retail',
      'Off-Price Retail',
    ],

    'Restaurant Chain': [
      'QSR',
      'Coffee Chain',
      'Fast Casual',
      'Casual Dining',
      'Food Distribution',
      'Food Delivery',
    ],

    'Payments & FinTech Chain': [
      'Payment Network',
      'Payment Processor',
      'Digital Payments',
      'Consumer Finance',
      'Auto Finance',
      'FinTech SaaS',
    ],

    'Travel & Hospitality Chain': [
      'Hotel Chain',
      'Short-term Rental',
      'OTA',
      'Cruise Lines',
      'Travel Meta',
      'Ride-hailing',
      'Car Rental',
      'Full-Service Airline',
      'Low-Cost Airline',
    ],

    'Utilities Chain': [
      'Utilities - Regulated Electric',
      'Utilities - Renewable',
      'Utilities - Independent Power Producers',
      'Solar',
      'Solar Manufacturing',
      'Solar Equipment',
      'Electrical Equipment & Parts',
    ],

    'Telecom & Connectivity Chain': [
      'Wireless Carrier',
      'Cable Operator',
      'Tower REIT',
      'Network Equipment',
    ],

    'Cybersecurity & Infrastructure Chain': [
      'Cybersecurity',
      'Data Center Infrastructure',
      'Data Center REIT',
      'Cloud Hyperscaler',
      'Enterprise SaaS',
    ],

    'Agriculture Chain': [
      'Ag Equipment',
      'Ag & Construction Equipment',
      'Ag Inputs',
      'Ag Commodities',
      'Fertilizer',
      'Food Ingredients',
      'Food Distribution',
    ],

    'Media & Content Chain': [
      'Media Conglomerate',
      'Streaming',
      'Gaming Publisher',
      'Gaming Platform',
      'Broadcast TV',
    ],

    'Mining & Metals Chain': [
      'Copper Mining',
      'Gold Mining',
      'Aluminum',
      'Steel',
      'Steel Distributor',
      'Aggregates',
      'Cement',
    ],
  },

  // ============================================================
  // 子行业分类覆盖 (Symbol-Level)
  // 用于FMP行业分类过于粗略的情况
  // ============================================================
  subIndustryOverrides: {
    // ========== 半导体产业链细分 ==========
    // 设备商 (Semiconductor Equipment)
    'LRCX': 'Semiconductor Equipment',    // Lam Research - 刻蚀/沉积
    'AMAT': 'Semiconductor Equipment',    // Applied Materials - 综合设备
    'ASML': 'Semiconductor Equipment',    // ASML - 光刻机
    'KLAC': 'Semiconductor Equipment',    // KLA Corp - 检测设备
    'TER': 'Semiconductor Equipment',     // Teradyne - 测试设备
    'ENTG': 'Semiconductor Equipment',    // Entegris - 材料/过滤
    'ONTO': 'Semiconductor Equipment',    // Onto Innovation - 检测
    'ACMR': 'Semiconductor Equipment',    // ACM Research - 清洗设备
    'MKSI': 'Semiconductor Equipment',    // MKS Instruments
    'CAMT': 'Semiconductor Equipment',    // Camtek
    'COHU': 'Semiconductor Equipment',    // Cohu - 测试设备
    'ICHR': 'Semiconductor Equipment',    // Ichor Holdings
    'UCTT': 'Semiconductor Equipment',    // Ultra Clean Holdings
    'FORM': 'Semiconductor Equipment',    // FormFactor - 探针卡
    'KLIC': 'Semiconductor Equipment',    // Kulicke & Soffa - 封装
    'TOELY': 'Semiconductor Equipment',   // Tokyo Electron
    'AEHR': 'Semiconductor Equipment',    // Aehr Test Systems

    // 晶圆代工 (Foundry)
    'TSM': 'Semiconductor Foundry',       // TSMC
    'UMC': 'Semiconductor Foundry',       // 联电
    'GFS': 'Semiconductor Foundry',       // GlobalFoundries

    // 存储芯片 (Memory)
    'MU': 'Memory Chips',                 // Micron - DRAM/NAND
    'WDC': 'Memory Chips',                // Western Digital - NAND/HDD
    'STX': 'Memory Chips',                // Seagate - HDD

    // Fabless芯片设计
    'NVDA': 'Fabless Chips',              // NVIDIA - GPU/AI
    'AMD': 'Fabless Chips',               // AMD - CPU/GPU
    'AVGO': 'Fabless Chips',              // Broadcom - 网络/无线
    'QCOM': 'Fabless Chips',              // Qualcomm - 移动芯片
    'MRVL': 'Fabless Chips',              // Marvell - 数据基础设施
    'NXPI': 'Fabless Chips',              // NXP - 汽车/工业
    'SWKS': 'Fabless Chips',              // Skyworks - 射频
    'QRVO': 'Fabless Chips',              // Qorvo - 射频
    'MPWR': 'Fabless Chips',              // Monolithic Power - 电源管理
    'ON': 'Fabless Chips',                // ON Semi - 汽车/工业
    'MCHP': 'Fabless Chips',              // Microchip - MCU
    'LSCC': 'Fabless Chips',              // Lattice - FPGA
    'SMTC': 'Fabless Chips',              // Semtech - 模拟
    'ALGM': 'Fabless Chips',              // Allegro - 传感器

    // IDM (设计+制造一体)
    'INTC': 'IDM',                        // Intel
    'TXN': 'IDM',                         // Texas Instruments
    'ADI': 'IDM',                         // Analog Devices
    'MXIM': 'IDM',                        // Maxim (已被ADI收购)
    'WOLF': 'IDM',                        // Wolfspeed - SiC

    // ========== 航空航天产业链细分 ==========
    // 发动机制造商 (Engine Manufacturers)
    'GE': 'Aircraft Engine',              // GE Aerospace - CFM/GE9X
    'RTX': 'Aircraft Engine',             // Raytheon (Pratt & Whitney)
    'SAFRY': 'Aircraft Engine',           // Safran (CFM合资)
    'RR': 'Aircraft Engine',              // Rolls-Royce

    // 飞机制造商 (Aircraft OEM)
    'BA': 'Aircraft OEM',                 // Boeing
    'EADSY': 'Aircraft OEM',              // Airbus
    'ERJ': 'Aircraft OEM',                // Embraer - 支线飞机
    'TXT': 'Aircraft OEM',                // Textron - 公务机

    // 航空结构件/系统 (Aerostructures)
    'SPR': 'Aerostructures',              // Spirit AeroSystems
    'TDG': 'Aerostructures',              // TransDigm - 航空零部件
    'HEI': 'Aerostructures',              // HEICO - 航空零部件
    'HXL': 'Aerostructures',              // Hexcel - 复合材料
    'MOG-A': 'Aerostructures',            // Moog - 飞控系统
    'WWD': 'Aerostructures',              // Woodward - 控制系统

    // 航空租赁 (Aircraft Leasing)
    'AER': 'Aircraft Leasing',            // AerCap
    'AL': 'Aircraft Leasing',             // Air Lease
    'FLY': 'Aircraft Leasing',            // Fly Leasing

    // 航空MRO (Maintenance/Repair/Overhaul)
    'AAR': 'Aviation MRO',                // AAR Corp
    'AIR': 'Aviation MRO',                // AAR Corp (注意不是Airbus)
    'VSEC': 'Aviation MRO',               // VSE Corp

    // 航空公司 - 全服务 (Full-Service Carrier)
    'DAL': 'Full-Service Airline',        // Delta
    'UAL': 'Full-Service Airline',        // United
    'AAL': 'Full-Service Airline',        // American

    // 航空公司 - 低成本 (Low-Cost Carrier)
    'LUV': 'Low-Cost Airline',            // Southwest
    'JBLU': 'Low-Cost Airline',           // JetBlue
    'ALK': 'Low-Cost Airline',            // Alaska Air
    'SAVE': 'Low-Cost Airline',           // Spirit Airlines
    'ULCC': 'Low-Cost Airline',           // Frontier

    // ========== 油气产业链细分 ==========
    // 油服设备 (Oilfield Equipment)
    'SLB': 'Oilfield Services',           // Schlumberger
    'HAL': 'Oilfield Services',           // Halliburton
    'BKR': 'Oilfield Services',           // Baker Hughes
    'NOV': 'Oilfield Equipment',          // NOV Inc - 钻井设备
    'FTI': 'Oilfield Equipment',          // TechnipFMC - 海底设备
    'CHX': 'Oilfield Equipment',          // ChampionX - 化学品
    'WFRD': 'Oilfield Services',          // Weatherford
    'LBRT': 'Oilfield Services',          // Liberty Energy - 压裂
    'HP': 'Oilfield Equipment',           // Helmerich & Payne - 钻机
    'PTEN': 'Oilfield Equipment',         // Patterson-UTI - 钻机

    // 上游E&P - 页岩油 (Shale Oil)
    'PXD': 'Shale E&P',                   // Pioneer (Permian)
    'FANG': 'Shale E&P',                  // Diamondback (Permian)
    'EOG': 'Shale E&P',                   // EOG Resources
    'COP': 'Shale E&P',                   // ConocoPhillips
    'DVN': 'Shale E&P',                   // Devon Energy
    'OXY': 'Shale E&P',                   // Occidental

    // 上游E&P - 海上/国际 (Offshore/International)
    'HES': 'International E&P',           // Hess - Guyana
    'MRO': 'International E&P',           // Marathon Oil
    'APA': 'International E&P',           // APA Corp

    // 综合油气 (Integrated)
    'XOM': 'Integrated Oil',              // ExxonMobil
    'CVX': 'Integrated Oil',              // Chevron
    'SHEL': 'Integrated Oil',             // Shell
    'BP': 'Integrated Oil',               // BP
    'TTE': 'Integrated Oil',              // TotalEnergies

    // 中游管道 (Midstream)
    'WMB': 'Midstream Pipeline',          // Williams Companies
    'KMI': 'Midstream Pipeline',          // Kinder Morgan
    'ET': 'Midstream Pipeline',           // Energy Transfer
    'EPD': 'Midstream Pipeline',          // Enterprise Products
    'MPLX': 'Midstream Pipeline',         // MPLX LP
    'TRGP': 'Midstream Pipeline',         // Targa Resources
    'OKE': 'Midstream Pipeline',          // ONEOK

    // 下游炼化 (Refining)
    'VLO': 'Refining',                    // Valero
    'MPC': 'Refining',                    // Marathon Petroleum
    'PSX': 'Refining',                    // Phillips 66
    'DK': 'Refining',                     // Delek
    'PBF': 'Refining',                    // PBF Energy
    'HFC': 'Refining',                    // HollyFrontier

    // ========== 汽车/EV产业链细分 ==========
    // 电池材料 - 锂 (Lithium)
    'ALB': 'EV Battery Materials',        // Albemarle - 锂
    'SQM': 'EV Battery Materials',        // SQM - 锂
    'LTHM': 'EV Battery Materials',       // Livent - 锂
    'LAC': 'EV Battery Materials',        // Lithium Americas
    'PLL': 'EV Battery Materials',        // Piedmont Lithium

    // 电池/电芯 (Battery Cells) - 美股有限
    'QS': 'EV Battery',                   // QuantumScape - 固态电池

    // Tier 1 电动化零部件 (EV Components)
    'APTV': 'EV Components Tier1',        // Aptiv - 电气架构
    'LEA': 'EV Components Tier1',         // Lear - 座椅/电子
    'BWA': 'EV Components Tier1',         // BorgWarner - 电驱动
    'ALV': 'EV Components Tier1',         // Autoliv - 安全

    // Tier 1 传统零部件 (Traditional Auto Parts)
    'MGA': 'Auto Parts Tier1',            // Magna - 综合
    'VC': 'Auto Parts Tier1',             // Visteon - 座舱电子
    'ADNT': 'Auto Parts Tier1',           // Adient - 座椅
    'DAN': 'Auto Parts Tier1',            // Dana - 传动系统
    'MOD': 'Auto Parts Tier1',            // Modine - 热管理
    'AXL': 'Auto Parts Tier1',            // AAM - 传动系统
    'GNTX': 'Auto Parts Tier1',           // Gentex - 后视镜
    'THRM': 'Auto Parts Tier1',           // Gentherm - 热舒适

    // 整车厂 - EV纯电 (Pure EV)
    'TSLA': 'EV OEM',                     // Tesla
    'RIVN': 'EV OEM',                     // Rivian
    'LCID': 'EV OEM',                     // Lucid
    'FSR': 'EV OEM',                      // Fisker
    'NIO': 'EV OEM',                      // NIO (中概)
    'XPEV': 'EV OEM',                     // XPeng (中概)
    'LI': 'EV OEM',                       // Li Auto (中概)

    // 整车厂 - 传统 (Traditional OEM)
    'F': 'Traditional OEM',               // Ford
    'GM': 'Traditional OEM',              // GM
    'STLA': 'Traditional OEM',            // Stellantis
    'TM': 'Traditional OEM',              // Toyota
    'HMC': 'Traditional OEM',             // Honda

    // 汽车经销商 (Dealers)
    'AN': 'Auto Dealer',                  // AutoNation
    'PAG': 'Auto Dealer',                 // Penske Auto
    'LAD': 'Auto Dealer',                 // Lithia Motors
    'GPI': 'Auto Dealer',                 // Group 1 Auto
    'SAH': 'Auto Dealer',                 // Sonic Automotive
    'ABG': 'Auto Dealer',                 // Asbury Automotive
    'KMX': 'Auto Dealer',                 // CarMax - 二手车
    'CVNA': 'Auto Dealer',                // Carvana - 线上

    // ========== 医疗产业链细分 ==========
    // 生物技术 - 大型 (Large Biotech)
    'AMGN': 'Large Biotech',              // Amgen
    'GILD': 'Large Biotech',              // Gilead
    'VRTX': 'Large Biotech',              // Vertex
    'REGN': 'Large Biotech',              // Regeneron
    'BIIB': 'Large Biotech',              // Biogen
    'MRNA': 'Large Biotech',              // Moderna

    // 生物技术 - 中小型 (Emerging Biotech)
    'SGEN': 'Emerging Biotech',           // Seagen
    'INCY': 'Emerging Biotech',           // Incyte
    'ALNY': 'Emerging Biotech',           // Alnylam
    'BMRN': 'Emerging Biotech',           // BioMarin
    'EXEL': 'Emerging Biotech',           // Exelixis
    'SRPT': 'Emerging Biotech',           // Sarepta

    // 大型制药 (Big Pharma)
    'LLY': 'Big Pharma',                  // Eli Lilly
    'PFE': 'Big Pharma',                  // Pfizer
    'MRK': 'Big Pharma',                  // Merck
    'ABBV': 'Big Pharma',                 // AbbVie
    'BMY': 'Big Pharma',                  // Bristol-Myers
    'JNJ': 'Big Pharma',                  // Johnson & Johnson
    'NVS': 'Big Pharma',                  // Novartis
    'AZN': 'Big Pharma',                  // AstraZeneca
    'GSK': 'Big Pharma',                  // GSK
    'SNY': 'Big Pharma',                  // Sanofi
    'NVO': 'Big Pharma',                  // Novo Nordisk

    // 仿制药 (Generic/Specialty)
    'TEVA': 'Generic Pharma',             // Teva
    'VTRS': 'Generic Pharma',             // Viatris
    'PRGO': 'Generic Pharma',             // Perrigo

    // 医疗分销 (Distributors)
    'MCK': 'Pharma Distributor',          // McKesson
    'ABC': 'Pharma Distributor',          // AmerisourceBergen
    'CAH': 'Pharma Distributor',          // Cardinal Health

    // 药店零售 (Pharmacy Retail)
    'CVS': 'Pharmacy Retail',             // CVS Health
    'WBA': 'Pharmacy Retail',             // Walgreens
    'RAD': 'Pharmacy Retail',             // Rite Aid

    // PBM/保险 (PBM/Insurance)
    'UNH': 'Health Insurance',            // UnitedHealth (Optum)
    'CI': 'Health Insurance',             // Cigna (Express Scripts)
    'HUM': 'Health Insurance',            // Humana
    'ELV': 'Health Insurance',            // Elevance Health
    'CNC': 'Health Insurance',            // Centene

    // 医院 (Hospitals)
    'HCA': 'Hospital',                    // HCA Healthcare
    'THC': 'Hospital',                    // Tenet Healthcare
    'UHS': 'Hospital',                    // Universal Health
    'CYH': 'Hospital',                    // Community Health

    // 医疗器械 - 大型 (Large MedTech)
    'MDT': 'Large MedTech',               // Medtronic
    'ABT': 'Large MedTech',               // Abbott
    'SYK': 'Large MedTech',               // Stryker
    'BSX': 'Large MedTech',               // Boston Scientific
    'EW': 'Large MedTech',                // Edwards Lifesciences
    'ISRG': 'Large MedTech',              // Intuitive Surgical
    'DXCM': 'Large MedTech',              // DexCom
    'ZBH': 'Large MedTech',               // Zimmer Biomet
    'BDX': 'Large MedTech',               // Becton Dickinson

    // 生命科学工具 (Life Sciences Tools)
    'TMO': 'Life Sciences Tools',         // Thermo Fisher
    'DHR': 'Life Sciences Tools',         // Danaher
    'A': 'Life Sciences Tools',           // Agilent
    'IQV': 'CRO',                         // IQVIA - 临床CRO
    'CRL': 'CRO',                         // Charles River - 临床前CRO
    'WAT': 'Life Sciences Tools',         // Waters

    // 动物健康 (Animal Health)
    'ZTS': 'Animal Health',               // Zoetis
    'IDXX': 'Animal Health',              // IDEXX

    // ========== 云计算/数据中心产业链细分 ==========
    // 服务器/存储硬件 (Server Hardware)
    'DELL': 'Server Hardware',            // Dell
    'HPE': 'Server Hardware',             // HPE
    'NTAP': 'Server Hardware',            // NetApp
    'PSTG': 'Server Hardware',            // Pure Storage
    'SMCI': 'Server Hardware',            // Super Micro

    // 网络设备 (Network Equipment)
    'CSCO': 'Network Equipment',          // Cisco
    'ANET': 'Network Equipment',          // Arista Networks
    'JNPR': 'Network Equipment',          // Juniper
    'FFIV': 'Network Equipment',          // F5 Networks
    'CIEN': 'Network Equipment',          // Ciena - 光网络

    // 数据中心REIT (Data Center REIT)
    'EQIX': 'Data Center REIT',           // Equinix
    'DLR': 'Data Center REIT',            // Digital Realty
    'AMT': 'Data Center REIT',            // American Tower (通信塔)
    'CCI': 'Data Center REIT',            // Crown Castle
    'SBAC': 'Data Center REIT',           // SBA Communications

    // 消费电子 (Consumer Electronics)
    'AAPL': 'Consumer Electronics',        // Apple
    'SONO': 'Consumer Electronics',        // Sonos - 智能音箱

    // 计算机硬件 (Computer Hardware)
    'HPQ': 'Computer Hardware',            // HP Inc - PC/打印

    // 云服务商 - Hyperscaler (Cloud Provider)
    'AMZN': 'Cloud Hyperscaler',          // AWS
    'MSFT': 'Cloud Hyperscaler',          // Azure
    'GOOGL': 'Cloud Hyperscaler',         // Google Cloud
    'ORCL': 'Cloud Hyperscaler',          // Oracle Cloud
    'IBM': 'Cloud Hyperscaler',           // IBM Cloud

    // SaaS - 企业软件 (Enterprise SaaS)
    'CRM': 'Enterprise SaaS',             // Salesforce
    'NOW': 'Enterprise SaaS',             // ServiceNow
    'WDAY': 'Enterprise SaaS',            // Workday
    'SNOW': 'Enterprise SaaS',            // Snowflake
    'TEAM': 'Enterprise SaaS',            // Atlassian
    'ZS': 'Enterprise SaaS',              // Zscaler
    'CRWD': 'Enterprise SaaS',            // CrowdStrike
    'DDOG': 'Enterprise SaaS',            // Datadog
    'NET': 'Enterprise SaaS',             // Cloudflare
    'MDB': 'Enterprise SaaS',             // MongoDB
    'PANW': 'Enterprise SaaS',            // Palo Alto Networks
    'OKTA': 'Enterprise SaaS',            // Okta - IAM
    'HUBS': 'Enterprise SaaS',            // HubSpot - CRM/Marketing
    'PLTR': 'Enterprise SaaS',            // Palantir - Data/AI

    // 垂直SaaS (Vertical SaaS)
    'VEEV': 'Vertical SaaS',              // Veeva - 生命科学
    'BILL': 'FinTech SaaS',               // BILL - SMB AP/AR
    'SHOP': 'E-commerce Platform',         // Shopify

    // ========== 工业综合/多元化 (Industrial Conglomerates) ==========
    'HON': 'Industrial Conglomerate',     // Honeywell
    'MMM': 'Industrial Conglomerate',     // 3M
    // GE: defined above as 'Aircraft Engine'
    'ITW': 'Industrial Conglomerate',     // Illinois Tool Works
    'EMR': 'Industrial Automation',       // Emerson
    'ETN': 'Industrial Conglomerate',     // Eaton
    'PH': 'Industrial Conglomerate',      // Parker Hannifin
    'ROK': 'Industrial Automation',       // Rockwell Automation

    // ========== 国防/航空航天 (Defense) ==========
    'LMT': 'Defense Prime',               // Lockheed Martin
    'GD': 'Defense Prime',                // General Dynamics
    'NOC': 'Defense Prime',               // Northrop Grumman
    'HII': 'Defense Prime',               // Huntington Ingalls - 造船
    'LHX': 'Defense Electronics',         // L3Harris - 电子战
    'HWM': 'Aerospace Supplier',          // Howmet - 航空紧固件/发动机件

    // ========== 铁路 (Railroads) ==========
    'UNP': 'Class I Railroad',            // Union Pacific
    'CSX': 'Class I Railroad',            // CSX
    'NSC': 'Class I Railroad',            // Norfolk Southern

    // ========== 工业分销 (Industrial Distribution) ==========
    'FAST': 'Industrial Distribution',    // Fastenal
    'GWW': 'Industrial Distribution',     // Grainger
    'MSM': 'Industrial Distribution',     // MSC Industrial
    'WSO': 'HVAC Distribution',           // Watsco
    'POOL': 'Pool Distribution',          // Pool Corp

    // ========== 卡车/发动机 (Trucks & Engines) ==========
    'PCAR': 'Truck OEM',                  // PACCAR
    'CMI': 'Engine & Power',              // Cummins

    // ========== 建筑/基建产业链细分 ==========
    // 铜/有色金属 (Copper/Non-Ferrous)
    'FCX': 'Copper Mining',               // Freeport-McMoRan
    'SCCO': 'Copper Mining',              // Southern Copper
    'TECK': 'Copper Mining',              // Teck Resources
    'AA': 'Aluminum',                     // Alcoa
    'CENX': 'Aluminum',                   // Century Aluminum

    // 钢铁 (Steel)
    'NUE': 'Steel Producer',              // Nucor
    'STLD': 'Steel Producer',             // Steel Dynamics
    'CLF': 'Steel Producer',              // Cleveland-Cliffs
    'X': 'Steel Producer',                // US Steel
    'RS': 'Steel Distributor',            // Reliance Steel

    // 骨料/建材 (Aggregates)
    'VMC': 'Aggregates',                  // Vulcan Materials
    'MLM': 'Aggregates',                  // Martin Marietta
    'SUM': 'Aggregates',                  // Summit Materials
    'CX': 'Cement',                       // Cemex

    // 建筑机械 (Construction Equipment)
    'CAT': 'Construction Equipment',      // Caterpillar
    'DE': 'Ag & Construction Equipment',  // Deere
    'AGCO': 'Ag Equipment',               // AGCO
    'CNHI': 'Ag & Construction Equipment',// CNH Industrial
    'TEX': 'Construction Equipment',      // Terex
    'OSK': 'Specialty Vehicles',          // Oshkosh

    // 工程承包 (Engineering & Construction)
    'ACM': 'E&C Contractor',              // AECOM
    'J': 'E&C Contractor',                // Jacobs
    'PWR': 'E&C Contractor',              // Quanta Services
    'MTZ': 'E&C Contractor',              // MasTec
    'EME': 'E&C Contractor',              // EMCOR
    'FLR': 'E&C Contractor',              // Fluor
    'KBR': 'E&C Contractor',              // KBR

    // 房屋建筑商 (Homebuilders)
    'LEN': 'Homebuilder',                 // Lennar
    'DHI': 'Homebuilder',                 // D.R. Horton
    'PHM': 'Homebuilder',                 // PulteGroup
    'TOL': 'Homebuilder',                 // Toll Brothers
    'NVR': 'Homebuilder',                 // NVR
    'KBH': 'Homebuilder',                 // KB Home
    'MTH': 'Homebuilder',                 // Meritage Homes

    // 建筑材料/产品 (Building Products)
    'JHX': 'Building Products',             // James Hardie - 纤维水泥
    'AZEK': 'Building Products',            // AZEK - 复合材料
    'OC': 'Building Products',              // Owens Corning - 绝缘/屋顶
    'BLDR': 'Building Products Distributor',// Builders FirstSource

    // 房地产服务 (Real Estate Services)
    'RKT': 'Mortgage Lender',              // Rocket Mortgage
    'FAF': 'Title Insurance',              // First American Financial
    'FNF': 'Title Insurance',              // Fidelity National Financial

    // ========== 包装 (Packaging) ==========
    'BALL': 'Metal Packaging',            // Ball Corp
    'CCK': 'Metal Packaging',             // Crown Holdings
    'PKG': 'Paper Packaging',             // Packaging Corp
    'IP': 'Paper Packaging',              // International Paper
    'WRK': 'Paper Packaging',             // WestRock
    'AMCR': 'Flexible Packaging',         // Amcor

    // ========== 特种化工/工业气体 (Specialty Chemicals) ==========
    'APD': 'Industrial Gases',            // Air Products
    'LIN': 'Industrial Gases',            // Linde
    'SHW': 'Coatings',                    // Sherwin-Williams
    'PPG': 'Coatings',                    // PPG Industries
    'ECL': 'Specialty Chemicals',         // Ecolab
    'IFF': 'Specialty Chemicals',         // IFF
    'DD': 'Specialty Chemicals',           // DuPont
    // ALB: defined above as 'EV Battery Materials'

    // ========== 金融服务产业链细分 ==========
    // 交易所 (Exchanges)
    'ICE': 'Exchange',                    // ICE (NYSE)
    'CME': 'Exchange',                    // CME Group
    'NDAQ': 'Exchange',                   // Nasdaq
    'CBOE': 'Exchange',                   // CBOE

    // 金融数据/评级 (Financial Data)
    'SPGI': 'Financial Data',             // S&P Global
    'MSCI': 'Financial Data',             // MSCI
    'MCO': 'Financial Data',              // Moody's
    'FDS': 'Financial Data',              // FactSet
    'MORN': 'Financial Data',             // Morningstar
    'TRI': 'Financial Data',              // Thomson Reuters

    // 投行/券商 (Investment Banks)
    'GS': 'Investment Bank',              // Goldman Sachs
    'MS': 'Investment Bank',              // Morgan Stanley
    'JPM': 'Universal Bank',              // JPMorgan
    'C': 'Universal Bank',                // Citigroup
    'BAC': 'Universal Bank',              // Bank of America
    'WFC': 'Universal Bank',              // Wells Fargo
    'BK': 'Custody Bank',                 // Bank of New York Mellon
    'STT': 'Custody Bank',                // State Street

    // 资管/另类 (Asset Management)
    'BLK': 'Asset Manager',               // BlackRock
    'BX': 'Alternative Asset Manager',    // Blackstone
    'KKR': 'Alternative Asset Manager',   // KKR
    'APO': 'Alternative Asset Manager',   // Apollo
    'CG': 'Alternative Asset Manager',    // Carlyle
    'ARES': 'Alternative Asset Manager',  // Ares
    'OWL': 'Alternative Asset Manager',   // Blue Owl
    'TROW': 'Asset Manager',              // T. Rowe Price
    'BEN': 'Asset Manager',               // Franklin Resources
    'IVZ': 'Asset Manager',               // Invesco

    // 支付网络 (Payment Networks)
    'V': 'Payment Network',               // Visa
    'MA': 'Payment Network',              // Mastercard
    'AXP': 'Payment Network',             // American Express
    'DFS': 'Payment Network',             // Discover

    // 支付处理 (Payment Processing)
    'FIS': 'Payment Processor',           // FIS
    'FISV': 'Payment Processor',          // Fiserv
    'GPN': 'Payment Processor',           // Global Payments
    'FI': 'Payment Processor',            // Fiserv
    'WU': 'Remittance',                   // Western Union
    'PYPL': 'Digital Payments',           // PayPal
    'SQ': 'Digital Payments',             // Block (Square)
    'ADYEY': 'Payment Processor',         // Adyen

    // ========== 消费品产业链细分 ==========
    // 农业投入/种子 (Ag Inputs)
    'CTVA': 'Ag Inputs',                  // Corteva - 种子/农药
    'FMC': 'Ag Inputs',                   // FMC - 农药
    'MOS': 'Fertilizer',                  // Mosaic - 化肥
    'NTR': 'Fertilizer',                  // Nutrien - 化肥
    'CF': 'Fertilizer',                   // CF Industries - 氮肥

    // 农产品贸易/加工 (Ag Trading)
    'ADM': 'Ag Commodities',              // ADM
    'BG': 'Ag Commodities',               // Bunge
    'INGR': 'Food Ingredients',           // Ingredion

    // 包装食品 - 零食 (Snacks)
    'PEP': 'Snacks & Beverages',          // PepsiCo (Frito-Lay)
    'MDLZ': 'Snacks',                     // Mondelez
    'HSY': 'Snacks',                      // Hershey
    'K': 'Cereal & Snacks',               // Kellanova
    'GIS': 'Packaged Foods',              // General Mills
    'CPB': 'Packaged Foods',              // Campbell's
    'CAG': 'Packaged Foods',              // Conagra
    'SJM': 'Packaged Foods',              // J.M. Smucker

    // 饮料 (Beverages)
    'KO': 'Soft Drinks',                  // Coca-Cola
    'KDP': 'Soft Drinks',                 // Keurig Dr Pepper
    'MNST': 'Energy Drinks',              // Monster
    'CELH': 'Energy Drinks',              // Celsius

    // 酒精饮料 (Alcoholic Beverages)
    'STZ': 'Beer & Spirits',              // Constellation Brands
    'TAP': 'Beer',                        // Molson Coors
    'DEO': 'Spirits',                     // Diageo
    'SAM': 'Craft Beer',                  // Boston Beer

    // 美妆/个护 (Beauty & Personal Care)
    'EL': 'Prestige Beauty',              // Estée Lauder
    'COTY': 'Mass Beauty',                // Coty

    // 时尚/奢侈品牌 (Fashion & Luxury Brands)
    'TPR': 'Accessible Luxury',           // Tapestry (Coach, Kate Spade)
    'CPRI': 'Accessible Luxury',          // Capri (Michael Kors, Versace)
    'PVH': 'Fashion Brand',              // PVH (Calvin Klein, Tommy Hilfiger)
    'RL': 'Luxury Apparel',              // Ralph Lauren
    'VFC': 'Outdoor Apparel',            // VF Corp (The North Face, Vans)
    'HBI': 'Basics Apparel',             // Hanesbrands
    'LEVI': 'Denim Brand',              // Levi Strauss

    // 餐饮 - 快餐 (QSR)
    'MCD': 'QSR',                         // McDonald's
    'SBUX': 'Coffee Chain',               // Starbucks
    'YUM': 'QSR',                         // Yum! Brands
    'CMG': 'Fast Casual',                 // Chipotle
    'DPZ': 'QSR',                         // Domino's
    'WEN': 'QSR',                         // Wendy's
    'QSR': 'QSR',                         // Restaurant Brands
    'DRI': 'Casual Dining',               // Darden Restaurants

    // 大型零售 (Mass Retail)
    'WMT': 'Mass Retail',                 // Walmart
    'COST': 'Warehouse Club',             // Costco
    'BJ': 'Warehouse Club',              // BJ's Wholesale Club
    'TGT': 'Mass Retail',                 // Target
    'M': 'Department Store',              // Macy's
    'KSS': 'Department Store',            // Kohl's
    'DG': 'Dollar Store',                 // Dollar General
    'DLTR': 'Dollar Store',               // Dollar Tree

    // 专业零售 (Specialty Retail)
    'HD': 'Home Improvement',             // Home Depot
    'LOW': 'Home Improvement',            // Lowe's
    'BBY': 'Electronics Retail',          // Best Buy
    'CHWY': 'Pet E-commerce',             // Chewy - 宠物电商
    'PTON': 'Connected Fitness',          // Peloton - 健身
    'ULTA': 'Beauty Retail',              // Ulta
    'LULU': 'Athletic Apparel',           // Lululemon
    'NKE': 'Athletic Apparel',            // Nike
    'UAA': 'Athletic Apparel',            // Under Armour
    'DKS': 'Sporting Goods Retail',       // Dick's Sporting Goods
    'TJX': 'Off-Price Retail',            // TJX
    'ROST': 'Off-Price Retail',           // Ross Stores
    'BURL': 'Off-Price Retail',           // Burlington

    // 电商 (E-commerce)
    // AMZN: defined above as 'Cloud Hyperscaler'
    'EBAY': 'E-commerce Marketplace',     // eBay
    'ETSY': 'E-commerce Marketplace',     // Etsy
    'W': 'E-commerce',                    // Wayfair - 家居电商

    // 家居用品 (Household Products)
    'PG': 'Household Products',           // Procter & Gamble
    'CL': 'Household Products',           // Colgate-Palmolive
    'KMB': 'Household Products',          // Kimberly-Clark
    'CHD': 'Household Products',          // Church & Dwight
    'CLX': 'Household Products',          // Clorox

    // 烟草 (Tobacco)
    'PM': 'Tobacco',                      // Philip Morris
    'MO': 'Tobacco',                      // Altria
    'BTI': 'Tobacco',                     // British American Tobacco

    // 食品分销 (Food Distribution)
    'SYY': 'Food Distribution',           // Sysco
    'USFD': 'Food Distribution',          // US Foods
    'KR': 'Grocery',                      // Kroger

    // 服装零售 (Apparel Retail)
    'GPS': 'Apparel Retail',              // Gap
    'ANF': 'Apparel Retail',              // Abercrombie
    'AEO': 'Apparel Retail',              // American Eagle
    'URBN': 'Apparel Retail',             // Urban Outfitters

    // 汽配零售 (Auto Parts Retail)
    'ORLY': 'Auto Parts Retail',          // O'Reilly
    'AZO': 'Auto Parts Retail',           // AutoZone
    'AAP': 'Auto Parts Retail',           // Advance Auto Parts

    // 家居家具零售 (Home Furnishing Retail)
    'RH': 'Home Furnishing Retail',       // RH (Restoration Hardware)
    'WSM': 'Home Furnishing Retail',      // Williams-Sonoma

    // 邮轮 (Cruise Lines)
    'RCL': 'Cruise Lines',                // Royal Caribbean
    'CCL': 'Cruise Lines',                // Carnival
    'NCLH': 'Cruise Lines',               // Norwegian

    // ========== 旅游/出行产业链细分 ==========
    // 酒店 (Hotels)
    'MAR': 'Hotel Chain',                 // Marriott
    'HLT': 'Hotel Chain',                 // Hilton
    'H': 'Hotel Chain',                   // Hyatt
    'IHG': 'Hotel Chain',                 // IHG
    'WH': 'Hotel Chain',                  // Wyndham

    // 在线旅游 (OTA)
    'BKNG': 'OTA',                        // Booking Holdings
    'EXPE': 'OTA',                        // Expedia
    'ABNB': 'Short-term Rental',          // Airbnb
    'TRIP': 'Travel Meta',                // TripAdvisor

    // 出行/配送服务 (Mobility & Delivery)
    'UBER': 'Ride-hailing',               // Uber
    'LYFT': 'Ride-hailing',               // Lyft
    'DASH': 'Food Delivery',              // DoorDash

    // 租车 (Car Rental)
    'CAR': 'Car Rental',                  // Avis Budget
    'HTZ': 'Car Rental',                  // Hertz

    // ========== 航运物流产业链细分 ==========
    // 集装箱航运 (Container Shipping)
    'ZIM': 'Container Shipping',          // ZIM - 以色列
    'MATX': 'Container Shipping',         // Matson - 太平洋/Jones Act
    'KEX': 'Container Shipping',          // Kirby - 内河/沿海
    'MAERSK.B': 'Container Shipping',      // Maersk - 丹麦集装箱航运(参考)

    // 干散货航运 (Dry Bulk Shipping)
    'GOGL': 'Dry Bulk Shipping',          // Golden Ocean - Cape/Panamax
    'SBLK': 'Dry Bulk Shipping',          // Star Bulk - 多船型
    'GNK': 'Dry Bulk Shipping',           // Genco - 超灵便/巴拿马
    'EGLE': 'Dry Bulk Shipping',          // Eagle Bulk - 超灵便

    // 油轮运输 (Tanker Shipping)
    'FRO': 'Crude Tanker',                // Frontline - VLCC/苏伊士
    'DHT': 'Crude Tanker',                // DHT - VLCC
    'TNK': 'Crude Tanker',                // Teekay Tankers - 阿芙拉/苏伊士
    'STNG': 'Product Tanker',             // Scorpio - 成品油轮
    'INSW': 'Product Tanker',             // International Seaways

    // LNG运输
    'FLNG': 'LNG Shipping',               // Flex LNG
    'GLNG': 'LNG Shipping',               // Golar LNG

    // 快递物流 (Express Logistics)
    'FDX': 'Express Logistics',           // FedEx
    'UPS': 'Express Logistics',           // UPS

    // 货运代理 (Freight Forwarding)
    'EXPD': 'Freight Forwarding',         // Expeditors
    'CHRW': 'Freight Brokerage',          // C.H. Robinson

    // 第三方物流/卡车 (3PL/Trucking)
    'XPO': 'LTL Trucking',                // XPO - LTL
    'JBHT': 'Intermodal',                 // J.B. Hunt - 联运
    'ODFL': 'LTL Trucking',               // Old Dominion
    'SAIA': 'LTL Trucking',               // Saia
    'KNX': 'Truckload',                   // Knight-Swift

    // 铁路货运 (Rail Freight) - UNP/CSX/NSC already defined above
    'CP': 'Class I Railroad',             // Canadian Pacific
    'CNI': 'Class I Railroad',            // Canadian National

    // ========== 保险细分 ==========
    'PGR': 'P&C Insurance',              // Progressive
    'ALL': 'P&C Insurance',              // Allstate
    'TRV': 'P&C Insurance',              // Travelers
    'CB': 'P&C Insurance',               // Chubb
    'AIG': 'P&C Insurance',              // AIG
    'MET': 'Life Insurance',             // MetLife
    'PRU': 'Life Insurance',             // Prudential
    'AFL': 'Life Insurance',             // Aflac
    'HIG': 'Diversified Insurance',      // Hartford Financial
    'AON': 'Insurance Broker',           // Aon
    'MMC': 'Insurance Broker',           // Marsh McLennan
    'WTW': 'Insurance Broker',           // WTW
    'AJG': 'Insurance Broker',           // Gallagher
    'BRO': 'Insurance Broker',           // Brown & Brown

    // ========== 银行/消费金融细分 ==========
    // 区域银行 (Regional Banks)
    'USB': 'Regional Bank',               // U.S. Bancorp
    'PNC': 'Regional Bank',               // PNC Financial
    'TFC': 'Regional Bank',               // Truist
    'KEY': 'Regional Bank',               // KeyCorp
    'FITB': 'Regional Bank',              // Fifth Third
    'RF': 'Regional Bank',                // Regions Financial
    'CFG': 'Regional Bank',               // Citizens Financial
    'HBAN': 'Regional Bank',              // Huntington
    'MTB': 'Regional Bank',               // M&T Bank

    // 消费金融 (Consumer Finance)
    'COF': 'Consumer Finance',            // Capital One
    'SYF': 'Consumer Finance',            // Synchrony
    'ALLY': 'Auto Finance',               // Ally Financial

    // 券商 (Brokerage)
    'SCHW': 'Brokerage',                 // Schwab

    // ========== REITs细分 ==========
    'PLD': 'Industrial REIT',             // Prologis
    'REXR': 'Industrial REIT',            // Rexford
    'STAG': 'Industrial REIT',            // STAG
    'SPG': 'Retail REIT',                 // Simon Property
    'O': 'Net Lease REIT',                // Realty Income
    'NNN': 'Net Lease REIT',              // NNN
    'VICI': 'Net Lease REIT',             // VICI
    'EQR': 'Residential REIT',            // Equity Residential
    'AVB': 'Residential REIT',            // AvalonBay
    'MAA': 'Residential REIT',            // Mid-America
    'INVH': 'Residential REIT',           // Invitation Homes
    'BXP': 'Office REIT',                 // Boston Properties
    'VNO': 'Office REIT',                 // Vornado
    'WELL': 'Healthcare REIT',            // Welltower
    'VTR': 'Healthcare REIT',             // Ventas
    'OHI': 'Healthcare REIT',             // Omega Healthcare
    'PSA': 'Self-Storage REIT',           // Public Storage
    'EXR': 'Self-Storage REIT',           // Extra Space

    // ========== 公用事业细分 ==========
    'NEE': 'Regulated Utility',            // NextEra
    'DUK': 'Regulated Utility',            // Duke
    'SO': 'Regulated Utility',             // Southern
    'AEP': 'Regulated Utility',            // AEP
    'EXC': 'Regulated Utility',            // Exelon
    'XEL': 'Regulated Utility',            // Xcel
    'VST': 'Independent Power',            // Vistra
    'NRG': 'Independent Power',            // NRG
    'CEG': 'Independent Power',            // Constellation
    'ENPH': 'Solar Equipment',             // Enphase
    'SEDG': 'Solar Equipment',             // SolarEdge
    'FSLR': 'Solar Manufacturing',         // First Solar
    'RUN': 'Solar Installer',              // Sunrun
    'AWK': 'Water Utility',                // American Water Works

    // 废弃物处理 (Waste Management)
    'WM': 'Waste Collection',              // Waste Management
    'RSG': 'Waste Collection',             // Republic Services
    'CLH': 'Hazardous Waste',              // Clean Harbors - 危废

    // ========== 电信/媒体/娱乐细分 ==========
    // 电信运营商 (Telecom Operators)
    'T': 'Wireless Carrier',              // AT&T
    'VZ': 'Wireless Carrier',             // Verizon
    'TMUS': 'Wireless Carrier',           // T-Mobile

    // 有线电视/宽带 (Cable & Broadband)
    'CMCSA': 'Cable Operator',            // Comcast
    'CHTR': 'Cable Operator',             // Charter
    'LBRDA': 'Cable Operator',            // Liberty Broadband

    // 流媒体 (Streaming)
    'NFLX': 'Streaming',                  // Netflix
    'DIS': 'Media Conglomerate',          // Disney
    'WBD': 'Media Conglomerate',          // Warner Bros
    'PARA': 'Media Conglomerate',         // Paramount
    'FOX': 'Broadcast TV',               // Fox
    'SPOT': 'Audio Streaming',            // Spotify

    // 游戏 (Gaming)
    'EA': 'Gaming Publisher',             // EA
    'TTWO': 'Gaming Publisher',           // Take-Two
    'RBLX': 'Gaming Platform',            // Roblox

    // 数字广告 (Digital Advertising)
    'TTD': 'AdTech DSP',                  // The Trade Desk
    'DV': 'AdTech Verification',          // DoubleVerify
    'MGNI': 'AdTech SSP',                 // Magnite
    'APP': 'AdTech Platform',             // AppLovin

    // 社交媒体 (Social Media)
    'META': 'Social Platform',            // Meta
    'SNAP': 'Social Platform',            // Snap
    'PINS': 'Social Platform',            // Pinterest
    'RDDT': 'Social Platform',            // Reddit

    // IT服务 (IT Services)
    // IBM: defined above as 'Cloud Hyperscaler'
    'ACN': 'IT Consulting',               // Accenture
    'INFY': 'IT Outsourcing',             // Infosys
    'WIT': 'IT Outsourcing',              // Wipro
    'CTSH': 'IT Outsourcing',             // Cognizant
    'EPAM': 'IT Consulting',              // EPAM

    // EDA/设计软件 (EDA & Simulation)
    'CDNS': 'EDA Software',               // Cadence
    'SNPS': 'EDA Software',               // Synopsys
    'ANSS': 'Simulation Software',        // Ansys

    // ========== 环保/废物管理 - 补充 (Environmental Services) ==========
    'CWST': 'Waste Processing',             // Casella Waste
    'ECOL': 'Environmental Remediation',    // US Ecology

    // ========== 人力资源/职业服务 (Staffing & Professional Services) ==========
    'RHI': 'Staffing & Temp',               // Robert Half
    'MAN': 'Staffing & Temp',               // ManpowerGroup
    'ASGN': 'Staffing & Temp',              // ASGN Inc
    'NSP': 'Professional Services',         // Insperity - PEO
    'CTAS': 'Uniform & Workplace',          // Cintas

    // ========== 教育 (Education) ==========
    'LOPE': 'Education Services',           // Grand Canyon Education
    'STRA': 'Education Services',           // Strategic Education
    'DUOL': 'EdTech',                       // Duolingo
    'CHGG': 'EdTech',                       // Chegg

    // ========== 房地产服务 (Real Estate Services) ==========
    'CBRE': 'Commercial Real Estate Services',  // CBRE Group
    'JLL': 'Commercial Real Estate Services',   // Jones Lang LaSalle
    'ZG': 'Residential Real Estate Tech',       // Zillow
    'RDFN': 'Residential Real Estate Tech',     // Redfin

    // ========== 贵金属 (Precious Metals) ==========
    'NEM': 'Gold Mining',                   // Newmont
    'GOLD': 'Gold Mining',                  // Barrick Gold
    'AEM': 'Gold Mining',                   // Agnico Eagle
    'WPM': 'Precious Metals Streaming',     // Wheaton Precious Metals
    'FNV': 'Precious Metals Streaming',     // Franco-Nevada

    // ========== EV充电基础设施 (EV Infrastructure) ==========
    'CHPT': 'EV Charging',                  // ChargePoint
    'EVGO': 'EV Charging',                  // EVgo
    'BLNK': 'EV Charging',                  // Blink Charging

    // ========== 数据中心基础设施 (Data Center Infrastructure) ==========
    'VRT': 'Data Center Infrastructure',    // Vertiv
    'PWSC': 'Data Center Infrastructure',   // PowerSchool (Data Infra)

    // ========== 补充覆盖 - 化工 (Chemicals) ==========
    'CE': 'Specialty Chemicals',            // Celanese - 醋酸/工程材料
    'EMN': 'Specialty Chemicals',           // Eastman Chemical
    'DOW': 'Commodity Chemicals',           // Dow - 大宗化工
    'LYB': 'Commodity Chemicals',           // LyondellBasell - 聚烯烃

    // ========== 补充覆盖 - 食品 (Food) ==========
    'KHC': 'Packaged Foods',                // Kraft Heinz
    'HRL': 'Packaged Foods',                // Hormel Foods
    'TSN': 'Packaged Foods',                // Tyson Foods
    'WING': 'QSR',                          // Wingstop - 快餐

    // ========== 补充覆盖 - 金融科技 (FinTech) ==========
    'COIN': 'Digital Payments',             // Coinbase - 加密交易
    'HOOD': 'Brokerage',                    // Robinhood - 零售券商
    'AFRM': 'Digital Payments',             // Affirm - BNPL
    'SOFI': 'Digital Payments',             // SoFi - 数字银行
    'NU': 'Digital Payments',               // Nu Holdings - 数字银行
    'IBKR': 'Brokerage',                    // Interactive Brokers

    // ========== 补充覆盖 - 保险/资管 (Insurance/AM) ==========
    'LNC': 'Life Insurance',                // Lincoln National
    'PFG': 'Life Insurance',                // Principal Financial
    'LPLA': 'Brokerage',                    // LPL Financial

    // ========== 补充覆盖 - 科技/SaaS (Tech/SaaS) ==========
    'DOCU': 'Enterprise SaaS',             // DocuSign
    'SPLK': 'Enterprise SaaS',             // Splunk
    'ZM': 'Enterprise SaaS',               // Zoom
    'FTNT': 'Cybersecurity',                // Fortinet
    'S': 'Cybersecurity',                   // SentinelOne

    // ========== 补充覆盖 - 游戏/流媒体 (Gaming/Streaming) ==========
    'ATVI': 'Gaming Publisher',             // Activision Blizzard
    'U': 'Game Engine',                     // Unity - 游戏引擎
    'ROKU': 'Streaming',                    // Roku - 流媒体硬件+平台

    // ========== 补充覆盖 - 消费/健康 (Consumer/Health) ==========
    'ADDYY': 'Athletic Apparel',            // Adidas
    'FL': 'Sporting Goods Retail',          // Foot Locker
    'HIMS': 'Digital Health',               // Hims & Hers
    'TDOC': 'Digital Health',               // Teladoc

    // ========== 补充覆盖 - 缺失的S&P 500 ==========
    'SAP': 'Enterprise ERP',               // SAP - ERP/Business Suite
    'INTU': 'SMB Software',                // Intuit - TurboTax/QuickBooks
    'ADP': 'Enterprise SaaS',             // ADP - HCM/Payroll
    'ADSK': 'Enterprise SaaS',            // Autodesk - Design/BIM
    'GEHC': 'Large MedTech',              // GE HealthCare - Imaging
    'HOLX': 'Large MedTech',              // Hologic - Women's Health
    'URI': 'Equipment Rental',             // United Rentals
    'SWK': 'Industrial Conglomerate',      // Stanley Black & Decker
    'IR': 'Specialty Industrial',          // Ingersoll Rand
    'DOV': 'Specialty Industrial',         // Dover Corporation
    'XYL': 'Water Technology',             // Xylem - Water Infrastructure
    'OTIS': 'Building Systems',            // Otis - Elevators
    'CARR': 'Building Systems',            // Carrier - HVAC/Fire Safety
    'DECK': 'Athletic Apparel',            // Deckers - HOKA/UGG
    'AES': 'Independent Power',            // AES Corporation
    'WEC': 'Regulated Utility',            // WEC Energy
    'ES': 'Regulated Utility',             // Eversource
    'ED': 'Regulated Utility',             // Con Edison
    'D': 'Regulated Utility',              // Dominion Energy
    'DTE': 'Regulated Utility',            // DTE Energy
    'AEE': 'Regulated Utility',            // Ameren
    'CMS': 'Regulated Utility',            // CMS Energy
    'ARE': 'Life Science REIT',            // Alexandria RE

    // ========== 补充覆盖 - 工业/建筑 ==========
    'HRI': 'Equipment Rental',             // Herc Holdings
    'WTS': 'Water Technology',             // Watts Water
    'TT': 'Building Systems',              // Trane Technologies
    'LII': 'Building Systems',             // Lennox International
    'GGG': 'Specialty Industrial',         // Graco
    'ROP': 'Specialty Industrial',         // Roper Technologies

    // ========== 补充覆盖 - 医疗健康 ==========
    'ALGN': 'Large MedTech',              // Align Technology - 隐适美
    'PODD': 'Large MedTech',              // Insulet - Omnipod
    'TECH': 'Life Sciences Tools',        // Bio-Techne - 蛋白试剂

    // ========== 补充覆盖 - 金融服务 ==========
    'MKTX': 'Exchange',                   // MarketAxess - 债券电子交易

    // ========== 补充覆盖 - 科技 ==========
    'PTC': 'Design Software',             // PTC - CAD/PLM/IoT
    'MANH': 'Enterprise SaaS',            // Manhattan Associates - 供应链
    'PAYC': 'Enterprise SaaS',            // Paycom - HCM/Payroll

    // ========== 补充覆盖 - 消费/零售 ==========
    'FIVE': 'Dollar Store',               // Five Below - 折扣零售

    // ========== 补充覆盖 - 工业 ==========
    'NDSN': 'Specialty Industrial',       // Nordson - 精密点胶
    'FTV': 'Specialty Industrial',        // Fortive - 仪器/传感
    'AME': 'Specialty Industrial',        // AMETEK - 电子仪器

    // ========== 补充覆盖 - 能源/材料 ==========
    'OVV': 'Shale E&P',                   // Ovintiv - 多盆地
    'CTRA': 'Shale E&P',                  // Coterra - Marcellus/Permian
    'RPM': 'Coatings',                    // RPM International - 特种涂料

    // ========== 补充覆盖 - 30只新增股票 ==========

    // 汽车后市场
    'CPRT': 'Auto Auction',               // Copart - 在线车辆拍卖/保险理赔

    // 医药包装/灭菌
    'WST': 'Pharma Packaging',            // West Pharmaceutical - 药物封装
    'STE': 'Medical Sterilization',       // STERIS - 灭菌/感染控制

    // 生命科学工具
    'ILMN': 'Life Sciences Tools',        // Illumina - 基因测序

    // 包装
    'SEE': 'Flexible Packaging',          // Sealed Air - 食品/保护包装

    // 电力设备
    'GNRC': 'Power Equipment',            // Generac - 备用发电机

    // 特种工业
    'IEX': 'Specialty Industrial',        // IDEX - 泵/流量控制
    'RBC': 'Specialty Industrial',        // Regal Rexnord - 运动控制
    'LECO': 'Welding Equipment',          // Lincoln Electric - 焊接设备
    'TTC': 'Outdoor Equipment',           // Toro - 园林/灌溉设备

    // 科技仪器/测试
    'TRMB': 'Geospatial Tech',            // Trimble - 地理空间/建筑科技
    'TDY': 'Test & Measurement',          // Teledyne - 仪器/成像
    'ZBRA': 'Enterprise Mobility',        // Zebra Technologies - 条码/RFID
    'KEYS': 'Test & Measurement',         // Keysight - 电子测试测量
    'GRMN': 'Consumer Electronics',       // Garmin - GPS/穿戴

    // 半导体设备
    'BRKS': 'Semiconductor Equipment',    // Brooks Automation - 自动化
    'ACLS': 'Semiconductor Equipment',    // Axcelis - 离子注入

    // 金融数据/基础设施
    'FICO': 'Financial Data',             // Fair Isaac - 信用评分
    'BR': 'Financial Infrastructure',     // Broadridge - 金融基础设施
    'RJF': 'Brokerage',                   // Raymond James - 财富管理
    'VIRT': 'Market Making',              // Virtu Financial - 做市商
    'TW': 'Exchange',                     // Tradeweb - 固收电子交易

    // 商业信息/SaaS
    'CSGP': 'Commercial Real Estate Data', // CoStar - 商业地产数据
    'AZPN': 'Process Industry Software',  // Aspen Technology - 流程优化

    // IT 服务
    'GLOB': 'IT Consulting',              // Globant - 数字化转型

    // 国防/政府IT
    'BAH': 'Defense IT',                  // Booz Allen Hamilton - 国防咨询
    'LDOS': 'Defense IT',                 // Leidos - 国防IT服务
    'AXON': 'Law Enforcement Tech',       // Axon Enterprise - 执法科技

    // 金属/材料
    'ATI': 'Specialty Metals',            // ATI - 钛/镍合金(航空)

    // 工业分销
    'WCC': 'Industrial Distribution',     // WESCO International - 电气分销

    // ========== 新增30只 (2026-01补充) ==========

    // 生物科技/诊断
    'BNTX': 'Large Biotech',              // BioNTech - mRNA疫苗/肿瘤
    'RARE': 'Emerging Biotech',           // Ultragenyx - 罕见病基因治疗
    'IONS': 'Emerging Biotech',           // Ionis - 反义寡核苷酸RNA疗法
    'EXAS': 'Diagnostics',               // Exact Sciences - 癌症早筛
    'NTRA': 'Diagnostics',               // Natera - 基因检测/产前
    'TXG': 'Life Science Tools',          // 10x Genomics - 单细胞测序

    // 消费/餐饮
    'RVLV': 'Online Fashion Retail',      // Revolve - 时尚电商
    'CAVA': 'Fast Casual',               // CAVA Group - 地中海快餐
    'BUD': 'Beer',                        // AB InBev - 全球啤酒龙头

    // 博彩/娱乐
    'DKNG': 'Online Gaming',              // DraftKings - 体育博彩
    'CZR': 'Casino & Resort',             // Caesars - 赌场度假村
    'MGM': 'Casino & Resort',             // MGM Resorts - 赌场娱乐
    'WYNN': 'Casino & Resort',            // Wynn Resorts - 高端赌场
    'PENN': 'Casino & Resort',            // Penn Entertainment - 区域赌场

    // 运输物流
    'GXO': 'Contract Logistics',          // GXO Logistics - 合同物流
    'HUBG': 'Intermodal',                 // Hub Group - 多式联运
    'WERN': 'Truckload',                  // Werner - 整车运输

    // REITs
    'HST': 'Hotel REIT',                  // Host Hotels - 酒店REIT
    'PK': 'Hotel REIT',                   // Park Hotels - 酒店REIT
    'SLG': 'Office REIT',                 // SL Green - 纽约办公REIT
    'KIM': 'Retail REIT',                 // Kimco - 零售REIT
    'CUBE': 'Self-Storage REIT',          // CubeSmart - 自助仓储

    // 地区银行
    'ZION': 'Regional Bank',              // Zions Bancorp - 山间银行
    'NTRS': 'Trust Bank',                 // Northern Trust - 托管银行
    'CMA': 'Regional Bank',              // Comerica - 商业银行

    // 太阳能
    'NOVA': 'Solar Installer',            // Sunnova - 住宅光伏
    'ARRY': 'Solar Equipment',            // Array Technologies - 跟踪支架
    'SPWR': 'Solar Installer',            // SunPower - 住宅光伏系统

    // 建材
    'TREX': 'Building Products',          // Trex - 复合甲板材料
    'MAS': 'Building Products',           // Masco - 水龙头/橱柜

    // ========== 2026-01 新增30只 ==========

    // 网络安全 (Cybersecurity)
    'CYBR': 'Cybersecurity',              // CyberArk - 身份安全/特权访问
    'TENB': 'Cybersecurity',              // Tenable - 漏洞管理
    'QLYS': 'Cybersecurity',              // Qualys - 云安全/合规
    'VRNS': 'Cybersecurity',              // Varonis - 数据安全
    'RPD': 'Cybersecurity',               // Rapid7 - 威胁检测/响应

    // HCM/Payroll SaaS
    'PCTY': 'Enterprise SaaS',            // Paylocity - HCM/薪资

    // CPaaS/通信平台
    'TWLO': 'Enterprise SaaS',            // Twilio - 通信API/CPaaS

    // 企业SaaS
    'IOT': 'Enterprise SaaS',             // Samsara - IoT车队管理
    'CFLT': 'Enterprise SaaS',            // Confluent - 数据流Kafka
    'DT': 'Enterprise SaaS',              // Dynatrace - 可观测性
    'GTLB': 'Enterprise SaaS',            // GitLab - DevSecOps
    'TOST': 'Enterprise SaaS',            // Toast - 餐饮SaaS/POS

    // 透析服务 (Dialysis)
    'DVA': 'Hospital',                    // DaVita - 透析中心

    // 护理/康复
    'ENSG': 'Hospital',                   // Ensign Group - 专业护理
    'ACHC': 'Hospital',                   // Acadia Healthcare - 行为健康
    'SGRY': 'Hospital',                   // Surgery Partners - 门诊手术
    'AMED': 'Hospital',                   // Amedisys - 居家护理

    // 医生网络/健康科技
    'DOCS': 'Enterprise SaaS',            // Doximity - 医生网络平台

    // 铀矿 (Uranium)
    'CCJ': 'Uranium',                     // Cameco - 铀矿开采

    // 稀土 (Rare Earth)
    'MP': 'Specialty Metals',             // MP Materials - 稀土开采

    // 国防科技
    'KTOS': 'Defense Electronics',        // Kratos - 无人机/高超音速
    'BWXT': 'Defense Prime',              // BWX Technologies - 核推进
    'RKLB': 'Aerospace Supplier',         // Rocket Lab - 太空发射

    // 汽配分销
    'GPC': 'Auto Parts Retail',           // Genuine Parts - NAPA汽配

    // 乡村零售
    'TSCO': 'Specialty Retail',           // Tractor Supply - 农场/乡村

    // 食品加工
    'DAR': 'Food Ingredients',            // Darling Ingredients - 动物副产品
    'CALM': 'Food Ingredients',           // Cal-Maine Foods - 鸡蛋
    'POST': 'Food Ingredients',           // Post Holdings - 包装食品
    'FLO': 'Food Ingredients',            // Flowers Foods - 烘焙
    'SFM': 'Grocery',                     // Sprouts Farmers Market - 有机超市

    // ========== 2026-01 第四批 30只 ==========

    // 天然气E&P (Natural Gas E&P)
    'EQT': 'Natural Gas E&P',             // EQT Corp - 美国最大天然气生产商
    'RRC': 'Natural Gas E&P',             // Range Resources - 阿巴拉契亚天然气
    'AR': 'Natural Gas E&P',              // Antero Resources - 阿巴拉契亚天然气/NGL
    'SWN': 'Natural Gas E&P',             // Southwestern Energy - 天然气

    // Permian E&P
    'MTDR': 'Shale E&P',                  // Matador Resources - Permian油气
    'PR': 'Shale E&P',                    // Permian Resources - Permian成长
    'MGY': 'Shale E&P',                   // Magnolia Oil & Gas - Eagle Ford

    // 特种制药 (Specialty Pharma)
    'JAZZ': 'Specialty Pharma',           // Jazz Pharmaceuticals - 睡眠/神经
    'UTHR': 'Specialty Pharma',           // United Therapeutics - 肺动脉高压
    'NBIX': 'Specialty Pharma',           // Neurocrine Biosciences - 运动障碍
    'PCVX': 'Emerging Biotech',           // Vaxcyte - 肺炎球菌疫苗

    // 电气/工业设备
    'HUBB': 'Electrical Equipment',       // Hubbell - 电气设备/电网
    'FIX': 'E&C Contractor',             // Comfort Systems - 暖通承包
    'AIT': 'Industrial Distribution',     // Applied Industrial Tech - 工业分销
    'ALLE': 'Building Products',          // Allegion - 安防锁具
    'WLK': 'Commodity Chemicals',         // Westlake Chemical - PVC/聚乙烯

    // 特种服务
    'SCI': 'Death Care',                  // Service Corp Intl - 殡葬服务

    // REITs
    'IRM': 'Specialty REIT',              // Iron Mountain - 数据中心/档案
    'LAMR': 'Advertising REIT',           // Lamar Advertising - 户外广告
    'OUT': 'Advertising REIT',            // Outfront Media - 户外广告
    'CPT': 'Residential REIT',            // Camden Property - 公寓
    'AMH': 'Residential REIT',            // American Homes 4 Rent - 独栋租赁
    'REG': 'Retail REIT',                 // Regency Centers - 超市锚定零售
    'FR': 'Industrial REIT',              // First Industrial - 物流仓储
    'PEAK': 'Healthcare REIT',            // Healthpeak - 生命科学/医疗办公

    // 卡车租赁/物流
    'R': 'Truck Leasing',                 // Ryder System - 卡车租赁/车队管理

    // 特种零售
    'JWN': 'Department Store',            // Nordstrom - 高端百货
    'BOOT': 'Specialty Retail',           // Boot Barn - 西部/工装零售

    // 新增30只 - 消费/医疗/金融科技/工业/材料/媒体
    'MKC': 'Packaged Foods',              // McCormick - 调味品/香料
    'MOH': 'Managed Care',               // Molina Healthcare - Medicaid管理
    'BAX': 'Medical Devices',             // Baxter International - 医疗产品
    'SNA': 'Specialty Industrial',        // Snap-on - 专业工具
    'WPC': 'Net Lease REIT',              // W.P. Carey - 多元化净租赁
    'SRE': 'Regulated Utility',           // Sempra - 公用事业/基础设施
    'MTCH': 'Social Platform',            // Match Group - 约会平台
    'GDDY': 'Cloud Infrastructure',       // GoDaddy - 域名/托管
    'AKAM': 'Cloud Infrastructure',       // Akamai - CDN/安全
    'GEN': 'Consumer Cybersecurity',      // Gen Digital - Norton/Avast消费安全
    'PATH': 'Enterprise SaaS',            // UiPath - RPA/自动化
    'AOS': 'Building Products',           // A.O. Smith - 热水器/水处理
    'LSTR': 'Truckload',                  // Landstar - 轻资产卡车
    'RXO': '3PL',                         // RXO - 卡车经纪/物流
    'SEIC': 'Asset Management',           // SEI Investments - 投资管理技术
    'SON': 'Packaging',                   // Sonoco - 工业/消费包装
    'BLL': 'Packaging',                   // Ball Corp - 铝罐包装
    'EXP': 'Aggregates',                  // Eagle Materials - 石膏/水泥
    'LYV': 'Live Entertainment',          // Live Nation - 演唱会/Ticketmaster
    'PAYX': 'HCM SaaS',                  // Paychex - 薪资/人力资源
    'JKHY': 'FinTech SaaS',              // Jack Henry - 银行核心系统
    'WEX': 'Payment Processing',          // WEX - 车队卡/支付
    'CNH': 'Farm Equipment',              // CNH Industrial - 农机/工程机械
    'JCI': 'Building Systems',            // Johnson Controls - 楼宇自动化
    'AAON': 'Building Systems',           // AAON - 商用HVAC
    'CRUS': 'Analog Semis',               // Cirrus Logic - 音频/触觉IC
    'MTSI': 'RF Semiconductor',           // MACOM - RF/微波模拟半导体
    'NYT': 'Digital Media',               // New York Times - 数字新闻
    'SHAK': 'Fast Casual',               // Shake Shack - 快休闲汉堡
    'ERIE': 'P&C Insurance',              // Erie Indemnity - 财产险
    'TXRH': 'Fast Casual',               // Texas Roadhouse - 休闲牛排
    'EAT': 'Fast Casual',                // Brinker - Chili's/Maggiano's
    'PLAY': 'Live Entertainment',         // Dave & Buster's - 娱乐餐饮
    'ESS': 'Apartment REIT',             // Essex Property - 西海岸公寓
    'UDR': 'Apartment REIT',             // UDR - 公寓REIT
    'SUI': 'Specialty REIT',             // Sun Communities - 制造房/RV
    'APPN': 'Enterprise SaaS',           // Appian - 低代码平台
    'BRZE': 'Enterprise SaaS',           // Braze - 客户互动平台
    'DOCN': 'Cloud Infrastructure',      // DigitalOcean - 开发者云
    'ZI': 'Enterprise SaaS',             // ZoomInfo - B2B数据/情报
    'ESTC': 'Enterprise SaaS',           // Elastic - 搜索/可观测性
    'CRDO': 'High-Speed Interconnect',   // Credo Technology - 高速互连
    'WRB': 'P&C Insurance',              // W.R. Berkley - 专业财险
    'RNR': 'Reinsurance',                // RenaissanceRe - 再保险
    'ACGL': 'Reinsurance',               // Arch Capital - 再保险
    'AFG': 'P&C Insurance',              // American Financial - 专业险
    'GMS': 'Building Products Distribution', // GMS - 墙板/天花分销
    'BECN': 'Building Products Distribution', // Beacon - 屋顶分销
    'FND': 'Home Improvement',           // Floor & Decor - 地板/瓷砖
    'AWI': 'Building Products',          // Armstrong World - 天花/墙面
    'DGX': 'Diagnostics',               // Quest Diagnostics - 检验
    'LH': 'Diagnostics',                // Labcorp - 检验/药物开发
    'SAIC': 'Defense IT',                // SAIC - 政府IT
    'CACI': 'Defense IT',                // CACI - 国防/情报IT
    'DIOD': 'Analog Semis',             // Diodes - 分立/模拟
    'VSH': 'Electronic Components',     // Vishay - 被动元件/分立
    'AVNT': 'Specialty Chemicals',       // Avient - 特种聚合物
    'OLN': 'Specialty Chemicals',        // Olin - 氯碱化工/弹药
    'PFGC': 'Food Distribution',         // Performance Food - 餐饮配送
    'CACC': 'Subprime Auto',             // Credit Acceptance - 次贷汽车
    'CASY': 'Convenience Store',         // Casey's General Stores - 便利店/披萨
    'TPX': 'Home Furnishings',           // Tempur-Sealy - 床垫/寝具
    'LEG': 'Furniture Components',       // Leggett & Platt - 弹簧/泡沫/组件
    'DNUT': 'Fast Casual',               // Krispy Kreme - 甜甜圈
    'EPRT': 'Net Lease REIT',            // Essential Properties - 净租赁
    'ADC': 'Net Lease REIT',             // Agree Realty - 净租赁
    'COLD': 'Cold Storage REIT',         // Americold - 冷链仓储
    'WAL': 'Regional Bank',              // Western Alliance - 成长型银行
    'EWBC': 'Regional Bank',             // East West Bancorp - 亚裔银行
    'ONB': 'Regional Bank',              // Old National - 中西部银行
    'PNFP': 'Regional Bank',             // Pinnacle Financial - 东南部银行
    'OZK': 'Regional Bank',              // Bank OZK - 建筑贷款
    'GH': 'Diagnostics',                 // Guardant Health - 液体活检
    'TFX': 'Medical Devices',            // Teleflex - 特种医疗器械
    'XRAY': 'Dental Equipment',          // Dentsply Sirona - 牙科设备
    'DTM': 'Nat Gas Midstream',          // DT Midstream - 天然气中游
    'AM': 'Nat Gas Midstream',           // Antero Midstream - 气体采集
    'WES': 'Nat Gas Midstream',          // Western Midstream - 气体加工
    'DINO': 'Oil Refinery',              // HF Sinclair - 炼油/可再生能源
    'FOUR': 'Payment Processing',        // Shift4 - 综合支付
    'RPAY': 'Payment Processing',        // Repay Holdings - 支付方案
    'FELE': 'Water Technology',           // Franklin Electric - 泵送系统
    'CW': 'Defense Electronics',         // Curtiss-Wright - 国防/核电
    'HAYW': 'Building Products',         // Hayward - 泳池/户外设备
    'IRDM': 'Satellite Communications',  // Iridium - 卫星通信
    'COKE': 'Soft Drinks',               // Coca-Cola Consolidated - 可口可乐瓶装
    'FRPT': 'Pet Products',              // Freshpet - 鲜粮宠物食品
    'FNB': 'Regional Bank',              // F.N.B. Corp - 中大西洋银行
    'NVST': 'Dental Equipment',          // Envista Holdings - 牙科产品
    'EGP': 'Industrial REIT',            // EastGroup - 阳光带工业REIT
    'OLLI': 'Discount Retail',           // Ollie's - 尾货折扣零售
    'MEDP': 'CRO',                       // Medpace - 中型生物CRO
    'ICLR': 'CRO',                       // Icon PLC - 全球CRO
    'BMBL': 'Social Platform',           // Bumble - 约会社交平台
    'NOVT': 'Specialty Industrial',      // Novanta - 精密光子/医疗
    'COHR': 'Semiconductor Equipment',   // Coherent - 光学/激光/SiC
    'CWK': 'Real Estate Services',       // Cushman & Wakefield - 商业地产服务
    'KNSL': 'P&C Insurance',             // Kinsale Capital - E&S专业保险
    'RYAN': 'Insurance Broker',          // Ryan Specialty - 保险批发
    'RIG': 'Offshore Driller',           // Transocean - 深水钻井
    'VAL': 'Offshore Driller',           // Valaris - 海上钻井
    'NBR': 'Oil Services',               // Nabors - 钻井服务
    'DOOR': 'Building Products',         // Masonite - 门类产品
    'JELD': 'Building Products',         // JELD-WEN - 窗/门
    'BF.B': 'Spirits',                   // Brown-Forman - 威士忌/烈酒
    'NTNX': 'Cloud Infrastructure',      // Nutanix - 混合云
    'WIX': 'SMB Software',               // Wix - 网站建设
    'SQSP': 'SMB Software',              // Squarespace - 网站/电商
    'HAS': 'Toys & Games',               // Hasbro - 玩具/游戏
    'MAT': 'Toys & Games',               // Mattel - 芭比/风火轮
    'CROX': 'Athletic Footwear',         // Crocs - 休闲鞋
    'ONON': 'Athletic Footwear',         // On Holding - 跑步鞋
    'CHRD': 'E&P',                       // Chord Energy - Bakken页岩
    'FBP': 'Regional Bank',              // First BanCorp - 波多黎各银行
    'GRND': 'Social Platform',           // Grindr - LGBTQ+约会
    'IAC': 'Digital Media',              // IAC - Dotdash Meredith/互联网
    'YELP': 'AdTech DSP',               // Yelp - 本地商家广告
    'OPEN': 'Online Real Estate',        // Opendoor - iBuying平台
    'LUNR': 'Space Systems',             // Intuitive Machines - 月球着陆器
    'ASTS': 'Satellite Communications',  // AST SpaceMobile - 直连卫星

    // ========== 新增30只: advisory banks, office REITs, E&P, DTC brands, consulting ==========
    'SKX': 'Athletic Footwear',           // Skechers - 运动休闲鞋
    'ASAN': 'Enterprise SaaS',            // Asana - 工作管理SaaS
    'BOX': 'Enterprise SaaS',             // Box - 云内容管理
    'WMS': 'Building Products',           // Advanced Drainage - 排水/基建
    'ATKR': 'Electrical Equipment',       // Atkore - 电气管道
    'SPXC': 'Building Systems',           // SPX Technologies - HVAC/检测
    'OSCR': 'Health Insurance Tech',      // Oscar Health - 科技健康险
    'LAZ': 'Investment Bank',             // Lazard - 咨询/资管
    'PIPR': 'Investment Bank',            // Piper Sandler - 中市场投行
    'EVR': 'Investment Bank',             // Evercore - 精英咨询
    'HLI': 'Investment Bank',             // Houlihan Lokey - 重组/M&A
    'PJT': 'Investment Bank',             // PJT Partners - 战略咨询
    'SM': 'E&P',                          // SM Energy - Permian/Eagle Ford
    'NOG': 'E&P',                         // Northern Oil & Gas - 非运营E&P
    'KRC': 'Office REIT',                 // Kilroy Realty - 西海岸办公
    'DEI': 'Office REIT',                 // Douglas Emmett - LA办公
    'HIW': 'Office REIT',                 // Highwoods - 阳光带办公
    'VRTS': 'Asset Management',           // Virtus - 多精品资管
    'STEP': 'Alternative Asset Management', // StepStone - 私募市场
    'ALGT': 'Low-Cost Airline',           // Allegiant - 超低成本航空
    'INMD': 'Medical Devices',            // InMode - 微创美容器械
    'HALO': 'Biotech Platform',           // Halozyme - ENHANZE药物递送
    'SITE': 'Building Products Distribution', // SiteOne - 景观分销
    'EXPO': 'Consulting',                 // Exponent - 工程/科学咨询
    'WIRE': 'Electrical Equipment',       // Encore Wire - 铜线/电缆
    'WRBY': 'Specialty E-commerce',       // Warby Parker - DTC眼镜
    'FIGS': 'Specialty E-commerce',       // FIGS - 医疗服装DTC
    'BROS': 'Fast Casual',                // Dutch Bros - 驾车咖啡
    'ACAD': 'Small Pharma',               // Acadia Pharma - CNS特药
    'DBI': 'Specialty Retail',            // Designer Brands - DSW鞋类

    // ========== 新增50家公司子行业分类 ==========

    // --- 地区银行 ---
    'NYCB': 'Regional Bank',              // NY Community Bancorp - 多户/CRE
    'VLY': 'Regional Bank',               // Valley National - 新泽西
    'FHN': 'Regional Bank',               // First Horizon - 田纳西
    'SNV': 'Regional Bank',               // Synovus - 乔治亚
    'HWC': 'Regional Bank',               // Hancock Whitney - 墨西哥湾南部
    'WBS': 'Regional Bank',               // Webster Financial - 康州
    'COLB': 'Regional Bank',              // Columbia Banking - 太平洋西北

    // --- Tech/SaaS ---
    'SMAR': 'Enterprise SaaS',            // Smartsheet - 工作管理
    'MQ': 'FinTech SaaS',                 // Marqeta - 卡发行
    'DSGX': 'Enterprise SaaS',            // Descartes - 物流IT
    'TWKS': 'IT Services',                // Thoughtworks - 技术咨询
    'CERT': 'CRO',                        // Certara - 生物模拟
    'FLT': 'Payment Processing',          // FLEETCOR/Corpay - 商业支付

    // --- Consumer/Retail ---
    'ELF': 'Mass Beauty',                 // e.l.f. Beauty - 平价美妆
    'BBWI': 'Specialty Retail',           // Bath & Body Works - 个护
    'DDS': 'Specialty Retail',            // Dillard's - 百货
    'GOOS': 'Luxury Apparel',            // Canada Goose - 奢侈外衣
    'SMPL': 'Packaged Foods',            // Simply Good Foods - 营养食品
    'NWSA': 'Digital Media',             // News Corp - 数字媒体
    'TRUP': 'P&C Insurance',             // Trupanion - 宠物保险

    // --- Entertainment/Sports ---
    'TKO': 'Live Entertainment',          // TKO Group - UFC/WWE
    'EDR': 'Live Entertainment',          // Endeavor - 体育/娱乐经纪
    'SIX': 'Theme Parks',                 // Six Flags - 主题公园
    'SEAS': 'Theme Parks',                // SeaWorld - 海洋公园

    // --- REITs ---
    'FRT': 'Retail REIT',                 // Federal Realty - 优质零售
    'BRX': 'Retail REIT',                 // Brixmor - 零售REIT
    'NSA': 'Self-Storage REIT',           // National Storage - 仓储

    // --- Insurance/Mortgage ---
    'ESNT': 'Mortgage Insurance',         // Essent - 按揭保险
    'NMIH': 'Mortgage Insurance',         // NMI Holdings - 按揭保险
    'RDN': 'Mortgage Insurance',          // Radian - 按揭/产权
    'MTG': 'Mortgage Insurance',          // MGIC - 按揭保险
    'SLM': 'Consumer Finance',            // Sallie Mae - 学生贷款

    // --- Waste/Environment ---
    'GFL': 'Waste Collection',            // GFL Environmental - 废弃物收集
    'SRCL': 'Environmental Services',     // Stericycle - 医疗废弃物

    // --- Biotech/Pharma ---
    'LEGN': 'Large Biotech',              // Legend Biotech - BCMA细胞疗法
    'BCRX': 'Small Pharma',              // BioCryst - 罕见病
    'BEAM': 'Biotech Platform',           // Beam Therapeutics - 碱基编辑
    'FOLD': 'Small Pharma',              // Amicus - Fabry病
    'ARVN': 'Biotech Platform',           // Arvinas - 蛋白质降解
    'KURA': 'Small Pharma',              // Kura Oncology - menin抑制
    'IMVT': 'Small Pharma',              // Immunovant - FcRn抗体

    // --- Industrials ---
    'CSWI': 'Specialty Industrial',       // CSW Industrials - 特种产品
    'RRX': 'Specialty Industrial',        // Regal Rexnord - 动力传动
    'ESE': 'Specialty Industrial',        // ESCO Technologies - 公用事业方案
    'MWA': 'Water Technology',            // Mueller Water - 水基建
    'LNN': 'Farm Equipment',              // Lindsay Corp - 灌溉
    'FSS': 'Specialty Industrial',        // Federal Signal - 安全/清洁

    // --- Energy ---
    'TALO': 'E&P',                        // Talos Energy - 墨西哥湾
    'CRK': 'Natural Gas E&P',            // Comstock Resources - Haynesville
    'SD': 'E&P',                          // SandRidge Energy - 中大陆

    // --- 补充6家 ---
    'SFNC': 'Regional Bank',              // Simmons First - 中南部银行
    'SBCF': 'Regional Bank',              // Seacoast Banking - 佛州银行
    'FFIN': 'Regional Bank',              // First Financial - 德州银行
    'AX': 'Regional Bank',                // Axos Financial - 数字银行
    'CALX': 'Specialty Industrial',       // Calix - 宽带接入平台
    'IESC': 'Specialty Industrial',       // IES Holdings - 电气承包

    // ========== 追加企业 (2026-01-24) ==========
    'ADBE': 'Creative Software',         // Adobe - 创意设计软件
    'BRK.B': 'Diversified Conglomerate', // Berkshire Hathaway - 多元化集团
    'MARA': 'Crypto Mining',             // Marathon Digital - 加密挖矿

    // ========== 追加50只新股票 ==========
    'MTD': 'Precision Instruments',     // Mettler-Toledo - 精密仪器
    'GL': 'Life Insurance',              // Globe Life - 人寿保险
    'CINF': 'P&C Insurance',            // Cincinnati Financial - 财产险
    'CNP': 'Regulated Utility',         // CenterPoint Energy - 电力/天然气
    'EVRG': 'Regulated Utility',        // Evergy - 电力公用
    'FE': 'Regulated Utility',          // FirstEnergy - 电力输配
    'LNT': 'Regulated Utility',         // Alliant Energy - 电力/天然气
    'NI': 'Gas Utility',                // NiSource - 天然气公用
    'PNW': 'Regulated Utility',         // Pinnacle West - 电力公用
    'PPL': 'Regulated Utility',         // PPL Corporation - 电力配送
    'LFUS': 'Electronic Components',    // Littelfuse - 电子元件
    'PCOR': 'Construction Software',    // Procore - 建筑SaaS
    'MNDY': 'Work Management SaaS',     // monday.com - 工作管理
    'GLBE': 'Cross-border Commerce',    // Global-e - 跨境电商
    'WOOF': 'Pet Retail',               // Petco - 宠物零售
    'GDRX': 'Pharma Tech',              // GoodRx - 药品折扣平台
    'RPRX': 'Pharma Royalties',         // Royalty Pharma - 药品特许权

    // ========== S&P 400 Midcap 追加 (30 stocks) ==========
    // --- Regional Banks ---
    'BANR': 'Regional Bank',              // Banner Financial - 太平洋西北
    'CUBI': 'Regional Bank',              // Customers Bancorp - 宾州数字银行
    'NBTB': 'Regional Bank',              // NBT Bancorp - 纽约
    'CBSH': 'Regional Bank',              // Commerce Bankshares - 密苏里

    // --- Insurance ---
    'RLI': 'Specialty Insurance',          // RLI Corp - 特种P&C
    'PLMR': 'Specialty Insurance',         // Palomar - 巨灾保险
    'ROOT': 'Insurtech',                   // Root Inc - 车险科技
    'LMND': 'Insurtech',                   // Lemonade - 保险科技
    'KMPR': 'Auto Insurance',              // Kemper - 汽车保险

    // --- Specialty Industrial ---
    'ROCK': 'Building Products',           // Gibraltar Industries - 建材

    // --- Tech/SaaS ---
    'ALRM': 'Smart Home',                  // Alarm.com - 智能家居
    'ARLO': 'Smart Home Camera',           // Arlo - 智能摄像
    'RAMP': 'Data Infrastructure',         // LiveRamp - 数据连接
    'PYCR': 'HCM SaaS',                    // Paycor - HCM
    'CWAN': 'Financial Software',          // Clearwater Analytics - 金融软件
    'NCNO': 'Banking Software',            // nCino - 银行SaaS
    'JAMF': 'Endpoint Management',         // Jamf - 终端管理

    // --- Consumer/Restaurant ---
    'JACK': 'Quick Service Restaurant',    // Jack in the Box - 快餐
    'CAKE': 'Casual Dining',               // Cheesecake Factory - 正餐
    'DINE': 'Restaurant Franchisor',       // Dine Brands - 餐饮特许

    // --- Healthcare ---
    'NVAX': 'Vaccine Manufacturer',        // Novavax - 疫苗
    'GKOS': 'Ophthalmic Devices',          // Glaukos - 眼科器械
    'INSP': 'Sleep Therapy Devices',       // Inspire Medical - 睡眠

    // --- Energy ---
    'STEM': 'Battery Storage',             // Stem Inc - 储能软件
    'FLNC': 'Battery Storage',             // Fluence - 储能系统
    'ORA': 'Geothermal Energy',            // Ormat - 地热能

    // --- Materials ---
    'CMC': 'Steel Recycler',               // Commercial Metals - 废钢
    'ASPN': 'Advanced Materials',          // Aspen Aerogels - 气凝胶

    // --- REITs ---
    'IIPR': 'Specialty REIT',              // Innovative Industrial - 大麻REIT

    // --- Transportation ---
    'SNDR': 'TL Trucking',                 // Schneider National - 整车运输

    // --- Specialty Metals ---
    'HAYN': 'Specialty Metals',            // Haynes International - 高温/耐腐蚀合金

    // --- Gas Utility ---
    'SW': 'Gas Utility',                   // Southwest Gas - 天然气配送

    // --- AdTech/Digital ---
    'PUBM': 'AdTech DSP',                  // PubMatic - 程序化广告
    'RSI': 'Online Gaming',                // Rush Street Interactive - 在线博彩

    // --- Communications/Software ---
    'BAND': 'CPaaS',                       // Bandwidth - 通信平台
    'PAR': 'Restaurant Tech',              // PAR Technology - 餐饮科技
    'FLYW': 'Financial Infrastructure',    // Flywire - 金融基础设施

    // --- Healthcare ---
    'USPH': 'Outpatient Rehab',            // US Physical Therapy - 门诊康复
    'NEO': 'Medical Diagnostics',          // NeoGenomics - 医学诊断
    'AZTA': 'Life Science Tools',          // Azenta - 生命科学工具
    'BIO': 'Life Science Tools',           // Bio-Rad - 生命科学工具

    // --- Materials/Mining ---
    'TROX': 'Commodity Chemicals',         // Tronox - 钛白粉
    'CC': 'Commodity Chemicals',           // Chemours - 氟化学品
    'SMID': 'Cement/Precast Concrete',     // Smith-Midland - 预制混凝土
    'UEC': 'Uranium Mining',               // Uranium Energy - 铀矿
    'DNN': 'Uranium Mining',               // Denison Mines - 铀矿
    'MAXN': 'Solar Manufacturing',         // Maxeon Solar - 太阳能制造

    // --- Energy ---
    'SLDP': 'EV Battery',                  // Solid Power - 固态电池
    'RIOT': 'Crypto Mining',               // Riot Platforms - 比特币挖矿
    'CLSK': 'Crypto Mining',               // CleanSpark - 比特币挖矿

    // --- Consumer/Retail ---
    'COLM': 'Outdoor Apparel',             // Columbia Sportswear - 户外服装
    'ACI': 'Specialty Grocery',            // Albertsons - 食品零售
    'GO': 'Specialty Grocery',             // Grocery Outlet - 折扣食品
    'PLCE': 'Basics Apparel',              // Children's Place - 儿童服装
    'GIII': 'Basics Apparel',              // G-III Apparel - 授权品牌服装
    'LOVE': 'Home Furnishings',            // Lovesac - 模块化家具
    'ARHS': 'Home Furnishings',            // Arhaus - 高端家具
    'MUSA': 'Convenience Store',           // Murphy USA - 便利店
    'PZZA': 'Quick Service Restaurant',    // Papa John's - 披萨快餐
    'BLMN': 'Casual Dining',              // Bloomin' Brands - 休闲餐饮
    'JJSF': 'Bakery/Snacks',              // J&J Snack Foods - 烘焙零食
    'SNBR': 'Furniture/Mattress',          // Sleep Number - 智能床垫
    'FIZZ': 'Soft Drinks',                 // National Beverage - 软饮料
    'IRBT': 'Smart Home',                  // iRobot - 扫地机器人

    // --- Transport/Logistics ---
    'HTLD': 'TL Trucking',                 // Heartland Express - 整车运输
    'GATX': 'Truck/Railcar Leasing',       // GATX Corp - 铁路车辆租赁
    'CSV': 'Death Care',                   // Carriage Services - 殡葬服务

    // --- Specialty Vehicles ---
    'REVG': 'Specialty Vehicles',          // REV Group - 特种车辆

    // --- Industrials ---
    'THS': 'Food Ingredients/Private Label', // TreeHouse Foods - 食品原料
    'BERY': 'Flexible Packaging',          // Berry Global - 柔性包装
    'HURN': 'Professional Services',       // Huron Consulting - 咨询
    'ICF': 'Professional Services',        // ICF International - 政府咨询

    // --- Semiconductors/Electronics ---
    'LITE': 'High-Speed Interconnect',     // Lumentum - 光通信
    'VIAV': 'High-Speed Interconnect',     // Viavi Solutions - 网络测试

    // --- Outdoor Equipment ---
    'YETI': 'Outdoor Equipment',           // YETI - 户外装备
    'CLAR': 'Outdoor Equipment',           // Clarus Corp - 户外装备

    // ========== 追加 (2026-01-24 batch 2) ==========

    // --- Water Utilities ---
    'WTRG': 'Water Utility',               // Essential Utilities - 水务
    'CWT': 'Water Utility',                // California Water Service - 水务
    'SJW': 'Water Utility',                // SJW Group - 水务

    // --- Consumer/Retail ---
    'SHOO': 'Fashion Footwear',            // Steven Madden - 时尚鞋类
    'FAT': 'Restaurant Franchisor',        // FAT Brands - 餐饮特许
    'DENN': 'Restaurant Franchisor',       // Denny's - 餐饮特许
    'SKY': 'Manufactured Housing',         // Skyline Champion - 制造住房
    'EXPI': 'Residential Real Estate Tech', // eXp Realty - 房产科技
    'PNTG': 'Skilled Nursing',             // Pennant Group - 护理服务

    // --- Homebuilders ---
    'GRBK': 'Homebuilder',                // Green Brick Partners - 住宅
    'CCS': 'Homebuilder',                 // Century Communities - 住宅
    'MHO': 'Homebuilder',                 // M/I Homes - 住宅
    'LGIH': 'Homebuilder',                // LGI Homes - 住宅

    // --- Energy/Materials ---
    'CVI': 'Oil Refinery',                // CVR Energy - 炼油
    'ZEUS': 'Steel Distributor',           // Olympic Steel - 钢材分销
    'RES': 'Oil Services',                 // RPC Inc - 油服/压裂
    'PUMP': 'Oil Services',                // ProPetro - 油服/压裂
    'AMR': 'Metallurgical Coal',           // Alpha Metallurgical - 焦煤

    // --- Building Products ---
    'IBP': 'Building Products',            // Installed Building Products - 保温安装

    // --- Technology/Software ---
    'ACIW': 'Financial Software',          // ACI Worldwide - 金融软件/支付
    'CGNX': 'Machine Vision',              // Cognex - 机器视觉
    'PD': 'DevOps Software',               // PagerDuty - 事故管理
    'PRGS': 'Enterprise Software',         // Progress Software - 企业软件

    // --- Other ---
    'SLGN': 'Specialty Packaging',         // Silgan Holdings - 食品/药品包装
    'TDW': 'Offshore Marine Services',     // Tidewater - 海洋服务
    'CRAI': 'Management Consulting',       // CRA International - 管理咨询
    'LNTH': 'Nuclear Imaging',             // Lantheus Holdings - 核医学

    // --- S&P 600 Small-Cap Additions ---

    // Healthcare/MedTech
    'OMCL': 'Pharmacy Automation',           // Omnicell - 药房自动化
    'NVCR': 'Cancer Treatment Devices',      // NovoCure - 肿瘤治疗设备(TTFields)
    'PRCT': 'Surgical Robotics',             // PROCEPT BioRobotics - 手术机器人
    'IRTC': 'Cardiac Monitoring',            // iRhythm Technologies - 心脏监测
    'TNDM': 'Insulin Pump Devices',          // Tandem Diabetes - 胰岛素泵

    // Semiconductors/Tech
    'POWI': 'Power Semiconductor',           // Power Integrations - 电源半导体
    'AMBA': 'Video Processing Chip',         // Ambarella - 视频处理芯片
    'CEVA': 'Chip IP Licensing',             // CEVA Inc - 芯片IP授权
    'RMBS': 'Memory Interface IP',           // Rambus - 内存接口IP/芯片
    'PI': 'RFID Solutions',                  // Impinj - RFID解决方案

    // Industrials
    'ESAB': 'Welding & Cutting Equipment',   // ESAB Corp - 焊接切割设备
    'SPSC': 'Supply Chain SaaS',             // SPS Commerce - 供应链SaaS
    'NVRI': 'Environmental Services',        // Enviri Group - 环保服务
    'SKYW': 'Regional Airline',              // SkyWest Inc - 区域航空

    // Consumer/Restaurant
    'BJRI': 'Casual Dining',                 // BJ's Restaurants - 休闲餐饮
    'KRUS': 'Fast Casual Japanese',          // Kura Sushi - 日式快餐
    'LOCO': 'Quick Service Restaurant',      // El Pollo Loco - 快餐
    'PRDO': 'For-Profit Education',          // Perdoceo Education - 营利教育

    // Regional Banks
    'GBCI': 'Regional Bank',              // Glacier Bancorp - 区域银行
    'TOWN': 'Regional Bank',              // TowneBank - 区域银行
    'HOPE': 'Regional Bank',              // Hope Bancorp - 区域银行
    'OFG': 'Regional Bank',               // OFG Bancorp - 区域银行
    'UMBF': 'Regional Bank',              // UMB Financial - 区域银行
    'ABCB': 'Regional Bank',              // Ameris Bancorp - 区域银行

    // Energy
    'REPX': 'Shale E&P',                     // Riley Exploration - 页岩油气
    'CIVI': 'Shale E&P',                     // Civitas Resources - 页岩油气
    'HLX': 'Subsea Services',                // Helix Energy Solutions - 海底服务
    'ARCH': 'Metallurgical Coal',            // Arch Resources - 焦煤

    // ========== S&P 600 Small-Cap Additions ==========

    // Consumer/Retail
    'SCVL': 'Footwear Retail',               // Shoe Carnival - 鞋类零售
    'LESL': 'Pool Supplies Retail',          // Leslie's - 泳池用品零售
    'PLNT': 'Fitness Franchise',             // Planet Fitness - 健身加盟
    'XPOF': 'Boutique Fitness',              // Xponential Fitness - 精品健身
    'EYE': 'Eyewear Retail',                 // National Vision - 眼镜零售

    // Biotech
    'MDGL': 'NASH Therapy',                  // Madrigal Pharmaceuticals - NASH药物
    'KRYS': 'Gene Therapy',                  // Krystal Biotech - 基因治疗

    // Industrial Equipment
    'POWL': 'Power Distribution Equipment',  // Powell Industries - 配电设备
    'MIDD': 'Commercial Kitchen Equipment',  // Middleby Corp - 商用厨房设备
    'EPAC': 'Hydraulic Tools',               // Enerpac Tool - 液压工具

    // Specialty Finance
    'TREE': 'Online Lending Marketplace',    // LendingTree - 在线贷款市场
    'WRLD': 'Subprime Consumer Finance',     // World Acceptance - 次贷消费金融
    'EZPW': 'Pawn/Consumer Finance',         // EZCorp - 典当/消费金融

    // Regional Banks
    'FCNCA': 'Regional Bank',                // First Citizens BancShares - 区域银行
    'IBOC': 'Regional Bank',                 // International Bancshares - 区域银行
    'CADE': 'Regional Bank',                 // Cadence Bank - 区域银行

    // Transportation
    'ARCB': 'LTL Trucking',                  // ArcBest Corp - LTL货运
    'MRTN': 'Temperature-Controlled Trucking', // Marten Transport - 冷链货运
    'FWRD': 'Expedited Freight',             // Forward Air - 加急货运

    // REITs
    'TRNO': 'Industrial REIT',               // Terreno Realty - 工业REIT

    // Specialty Chemicals
    'HWKN': 'Specialty Chemical Distribution', // Hawkins Inc - 特种化学品分销
    'KWR': 'Industrial Fluids',              // Quaker Houghton - 工业流体
    'IOSP': 'Specialty Chemicals',           // Innospec - 特种化学品
    'CBT': 'Carbon Black',                   // Cabot Corp - 炭黑
    'BCPC': 'Specialty Ingredients',         // Balchem Corp - 特种配料

    // Insurance/Gaming
    'HCI': 'Homeowners Insurance',             // HCI Group - 房屋保险
    'GDEN': 'Casino/Tavern Gaming',            // Golden Entertainment - 博彩/酒馆
    'RRR': 'Casino/Tavern Gaming',             // Red Rock Resorts - 赌场
    'CHDN': 'Horse Racing/Gaming',             // Churchill Downs - 赛马/博彩

    // AdTech/Marketing
    'IAS': 'Ad Verification',                  // Integral Ad Science - 广告验证
    'ZETA': 'Marketing Data Platform',         // Zeta Global - 营销数据平台
    'CARG': 'Auto Marketplace',                // CarGurus - 汽车市场平台

    // Auto/RV
    'LCII': 'RV Components',                   // LCI Industries - 房车零部件
    'WGO': 'RV Manufacturing',                 // Winnebago - 房车制造
    'CWH': 'RV Retail',                        // Camping World - 房车零售
    'FOXF': 'Performance Suspension',          // Fox Factory - 高性能悬挂
    'MPAA': 'Auto Parts Remanufacturing',      // Motorcar Parts - 汽车零件再制造

    // Auto Parts
    'LKQ': 'Alternative Auto Parts',           // LKQ Corp - 替代汽车配件

    // Food/Beverage
    'JBSS': 'Nut Processing',                  // John B. Sanfilippo - 坚果加工
    'BGS': 'Packaged Foods',                   // B&G Foods - 包装食品
    'UTZ': 'Salty Snacks',                     // Utz Brands - 咸味零食
    'HAIN': 'Natural Foods',                   // Hain Celestial - 天然有机食品

    // Healthcare Services
    'CHE': 'Hospice Care',                     // Chemed/VITAS - 临终关怀
    'NHC': 'Long-term Care',                   // National HealthCare - 长期护理
    'ADUS': 'Home Health Services',            // Addus HomeCare - 家庭健康服务

    // Real Estate
    'NMRK': 'Commercial RE Services',          // Newmark Group - 商业地产服务
    'RMR': 'REIT Management',                  // RMR Group - REIT管理
    'HHH': 'Master Planned Communities',       // Howard Hughes - 总体规划社区

    // Education
    'LRN': 'Online K-12',                      // Stride Inc - 在线K-12教育
    'ATGE': 'Healthcare Education',            // Adtalem Global - 医疗教育

    // Staffing
    'KFRC': 'Staffing/Workforce',              // Kforce - 科技/金融人力
    'KELYA': 'Staffing/Workforce',             // Kelly Services - 人力资源

    // Environmental
    'MEG': 'Environmental Consulting',         // Montrose Environmental - 环保咨询

    // SaaS
    'FRSH': 'Customer Service SaaS',           // Freshworks - 客服SaaS

    // ========== 新增19只 (2026-01-24) ==========
    'ADT': 'Home Security',                    // ADT - 家庭安防
    'BFAM': 'Childcare Services',              // Bright Horizons - 托儿服务
    'CNK': 'Movie Theater',                    // Cinemark - 电影院
    'DAC': 'Container Shipping',               // Danaos - 集装箱航运
    'ETD': 'Home Furnishing',                  // Ethan Allen - 家居
    'FBIN': 'Building Products',               // Fortune Brands - 建材
    'FUN': 'Theme Parks',                      // Cedar Fair - 主题公园
    'GRAB': 'Super App',                       // Grab - 超级App
    'IMAX': 'Cinema Technology',               // IMAX - 影院科技
    'LOGI': 'Computer Peripherals',            // Logitech - 电脑外设
    'LVMUY': 'Luxury Conglomerate',            // LVMH - 奢侈品集团
    'LVS': 'Casino & Resort',                  // Las Vegas Sands - 赌场度假村
    'OLED': 'Display Materials',               // Universal Display - 显示材料
    'REZI': 'Home Comfort',                    // Resideo - 家居舒适
    'SKIN': 'Medical Aesthetics',              // Beauty Health - 医美
    'TMHC': 'Homebuilders',                    // Taylor Morrison - 住宅建筑
    'WHR': 'Home Appliances',                  // Whirlpool - 家电
    'USNA': 'Health Supplements',              // USANA - 保健品
    'NUS': 'Health Supplements',               // Nu Skin - 保健品

    // ========== 新增29只 (Gene Editing/Biotech/FinTech/Infra等) ==========

    // Gene Editing/Biotech
    'TWST': 'Synthetic Biology',               // Twist Bioscience - 合成生物工具
    'CRSP': 'Gene Editing',                    // CRISPR Therapeutics - 基因编辑疗法
    'NTLA': 'Gene Editing',                    // Intellia Therapeutics - 体内基因编辑
    'RXRX': 'AI Drug Discovery',              // Recursion Pharmaceuticals - AI药物发现

    // Clean Energy
    'PLUG': 'Hydrogen Fuel Cell',              // Plug Power - 氢燃料电池

    // FinTech
    'UPST': 'AI Lending',                      // Upstart - AI借贷平台
    'RELY': 'Digital Remittance',              // Remitly - 数字汇款
    'PAYO': 'Cross-border Payments',           // Payoneer - 跨境支付

    // Software/Analytics
    'VRNT': 'CX Analytics',                    // Verint Systems - CX分析/AI
    'TYL': 'Government Software',              // Tyler Technologies - 政府软件
    'APPF': 'Property Management SaaS',        // AppFolio - 物业管理SaaS

    // Banking/Finance SaaS
    'ALKT': 'Digital Banking SaaS',            // Alkami Technology - 数字银行SaaS
    'HQY': 'HSA Platform',                     // HealthEquity - HSA管理平台

    // Infrastructure/Construction
    'ASTE': 'Road Building Equipment',         // Astec Industries - 筑路设备
    'ROAD': 'Highway Construction',            // Construction Partners - 公路建设
    'PRIM': 'Infrastructure Construction',     // Primoris Services - 基础设施建设
    'STRL': 'E-Infrastructure',                // Sterling Infrastructure - 电子基础设施
    'TTEK': 'Environmental Consulting',        // Tetra Tech - 环保/基础设施咨询
    'KNF': 'Construction Materials/Aggregates', // Knife River - 建材/骨料
    'APOG': 'Architectural Glass',             // Apogee Enterprises - 建筑玻璃
    'GLDD': 'Marine Dredging',                 // Great Lakes Dredge - 海洋疏浚

    // Materials/Wood
    'UFPI': 'Wood/Composite Products',         // UFP Industries - 木材/复合建材

    // Life Science Diagnostics
    'CDNA': 'Transplant Diagnostics',          // CareDx - 移植诊断
    'MYGN': 'Genetic Testing',                 // Myriad Genetics - 基因检测
    'OLINK': 'Proteomics Tools',               // Olink Proteomics - 蛋白质组学工具

    // Death Care/Industrial
    'MATW': 'Memorialization',                 // Matthews International - 纪念产品

    // Agriculture
    'ANDE': 'Ag Supply Chain',                 // Andersons - 农业供应链/乙醇

    // Digital Infrastructure
    'DBRG': 'Digital Infrastructure Investment', // DigitalBridge - 数字基础设施投资

    // Industrial Auctions
    'RBA': 'Industrial Auctions',              // RB Global - 工业设备拍卖

    // ========== 新增25只 (Chemicals/Insurance/Healthcare IT/Retail/Defense/Semi/Biotech/Marine/Casino/BPO/Industrial) ==========

    // Specialty Chemicals/Coatings
    'AXTA': 'Automotive Coatings',             // Axalta - 汽车/工业涂料
    'FUL': 'Adhesives & Sealants',             // H.B. Fuller - 粘合剂/密封剂
    'ESI': 'Electronics Chemicals',            // Element Solutions - 电子化学品

    // Insurance
    'SIGI': 'Specialty P&C Insurance',         // Selective Insurance - 特种P&C保险
    'ORI': 'Diversified Insurance',            // Old Republic - 多元化保险/产权
    'THG': 'P&C Insurance',                    // Hanover Insurance - P&C保险

    // Healthcare IT
    'NXGN': 'Healthcare IT/EHR',               // NextGen Healthcare - EHR
    'PINC': 'Healthcare GPO',                  // Premier Inc - 医疗GPO/分析
    'HCAT': 'Healthcare Analytics',            // Health Catalyst - 医疗分析
    'PHR': 'Patient Intake Tech',              // Phreesia - 患者入院技术

    // Consumer Retail
    'SIG': 'Jewelry Retail',                   // Signet Jewelers - 珠宝零售
    'MNRO': 'Auto Service',                    // Monro Inc - 汽车服务/修理
    'VSCO': 'Lingerie Retail',                 // Victoria's Secret - 内衣/美妆零售

    // Defense/Aerospace
    'AVAV': 'Tactical Drones',                 // AeroVironment - 战术无人机
    'MRCY': 'Defense Computing',               // Mercury Systems - 国防电子/计算

    // Semiconductor
    'SYNA': 'Human Interface Semi',            // Synaptics - 人机界面半导体
    'SITM': 'MEMS Timing',                     // SiTime - MEMS时钟半导体

    // Healthcare/Biotech
    'HAE': 'Blood Management',                 // Haemonetics - 血液管理技术
    'RVMD': 'Oncology Drug',                   // Revolution Medicines - 肿瘤药物
    'PTCT': 'Rare Disease Therapy',            // PTC Therapeutics - 罕见病疗法

    // Marine/Recreation
    'BC': 'Marine Products',                   // Brunswick - 船舶/休闲产品
    'HZO': 'Boat Retail',                      // MarineMax - 船舶零售/服务

    // Casino
    'MCRI': 'Regional Casino',                 // Monarch Casino - 赌场/酒店

    // Business Services
    'CNXC': 'CX Business Services',            // Concentrix - CX商业服务/BPO

    // Diversified Industrial
    'SXI': 'Diversified Industrial',           // Standex International - 多元化工业

    // Chip Architecture/IP Licensing
    'ARM': 'Chip Architecture/IP',             // Arm Holdings - 芯片架构IP授权

    // Grocery Delivery Platform
    'CART': 'Grocery Delivery Platform',       // Instacart - 生鲜配送平台

    // Premium Footwear
    'BIRK': 'Premium Footwear',               // Birkenstock - 高端凉鞋

    // LatAm E-commerce
    'MELI': 'LatAm E-commerce',               // MercadoLibre - 拉美电商/金融科技

    // SE Asia Platform
    'SE': 'SE Asia Platform',                  // Sea Limited - 东南亚游戏/电商/金融

    // Chinese E-commerce
    'BABA': 'Chinese E-commerce',              // Alibaba - 中国电商/云
    'PDD': 'Chinese E-commerce',               // PDD Holdings - 全球电商Temu/拼多多
    'JD': 'Chinese E-commerce',                // JD.com - 中国电商/物流

    // Chinese Search/AI
    'BIDU': 'Chinese Search/AI',               // Baidu - 中国搜索/AI

    // Chinese Oncology Biotech
    'BGNE': 'Chinese Oncology',                // BeiGene - 中国肿瘤生物科技

    // eVTOL
    'JOBY': 'eVTOL',                           // Joby Aviation - eVTOL空中出租车

    // Premium EV
    'PSNY': 'Premium EV',                      // Polestar - 高端电动汽车

    // Integrated Steel
    'X': 'Integrated Steel',                   // US Steel - 综合钢铁

    // Iron Ore Mining
    'VALE': 'Iron Ore Mining',                 // Vale - 铁矿石/镍矿

    // Diversified Mining
    'RIO': 'Diversified Mining',               // Rio Tinto - 多元化矿业
    'BHP': 'Diversified Mining',               // BHP Group - 多元化矿业

    // LNG Export
    'LNG': 'LNG Export',                       // Cheniere Energy - LNG出口/液化

    // ========== 补充: 2026-01 第八批 (20只新股票) ==========

    // Biotech
    'XENE': 'Epilepsy Biotech',                // Xenon Pharmaceuticals - 癫痫生物科技
    'SWTX': 'Rare Tumor Biotech',              // SpringWorks Therapeutics - 罕见肿瘤生物科技
    'KYMR': 'Protein Degradation',             // Kymera Therapeutics - 蛋白降解
    'RCKT': 'Gene Therapy',                    // Rocket Pharmaceuticals - 基因治疗

    // Healthcare REITs
    'GLPI': 'Casino REIT',                     // Gaming & Leisure Properties - 赌场REIT
    'MPW': 'Hospital REIT',                    // Medical Properties Trust - 医院REIT
    'SBRA': 'Senior Housing REIT',             // Sabra Healthcare REIT - 老年住宅REIT
    'DOC': 'Healthcare REIT',                  // Healthpeak Properties - 医疗/生命科学REIT

    // Consumer
    'PTLO': 'Fast Casual Restaurant',          // Portillo's - 快餐连锁
    'ARKO': 'Convenience Store/Fuel',          // ARKO Group - 便利店/加油

    // Industrial
    'BLBD': 'School Bus Manufacturing',        // Blue Bird Corp - 校车制造

    // E&P
    'VTLE': 'Shale E&P',                       // Vital Energy - 页岩油E&P
    'GPOR': 'Natural Gas E&P',                 // Gulfport Energy - 天然气E&P

    // Regional Banks
    'TBBK': 'Banking-as-a-Service',            // The Bancorp - BaaS银行
    'FFBC': 'Regional Bank',                   // First Financial Bankshares - 区域银行
    'WSBC': 'Regional Bank',                   // WesBanco - 区域银行

    // Healthcare Services
    'LFST': 'Mental Health Services',          // LifeStance Health - 心理健康服务
    'OPCH': 'Home Infusion',                   // Option Care Health - 家庭输液服务
    'PACS': 'Post-Acute Care',                 // PACS Group - 急性期后护理
  },

  // ============================================================
  // 子行业上下游关系
  // ============================================================
  subIndustryChains: {
    // ========== 半导体产业链 ==========
    'Semiconductor Equipment': [
      'Semiconductor Foundry',
      'IDM',
      'Memory Chips',
      'Fabless Chips',
    ],

    'Semiconductor Foundry': [
      'Fabless Chips',
    ],

    'Fabless Chips': [
      'Consumer Electronics',
      'Computer Hardware',
      'Auto - Manufacturers',
      'Server Hardware',
    ],

    'Memory Chips': [
      'Consumer Electronics',
      'Computer Hardware',
      'Server Hardware',
    ],

    'IDM': [
      'Consumer Electronics',
      'Computer Hardware',
      'Auto - Manufacturers',
    ],

    // ========== 航空航天产业链 ==========
    // 发动机 → 飞机制造 → 租赁 → 航空公司 → 旅游
    'Aircraft Engine': [
      'Aircraft OEM',
      'Aviation MRO',
    ],

    'Aerostructures': [
      'Aircraft OEM',
    ],

    'Aircraft OEM': [
      'Aircraft Leasing',
      'Full-Service Airline',
      'Low-Cost Airline',
    ],

    'Aircraft Leasing': [
      'Full-Service Airline',
      'Low-Cost Airline',
    ],

    'Aviation MRO': [
      'Full-Service Airline',
      'Low-Cost Airline',
    ],

    'Full-Service Airline': [
      'Hotel Chain',
      'OTA',
      'Car Rental',
    ],

    'Low-Cost Airline': [
      'Hotel Chain',
      'OTA',
      'Short-term Rental',
    ],

    // ========== 油气产业链 ==========
    // 油服设备 → E&P → 中游 → 炼化 → 化工/运输
    'Oilfield Services': [
      'Shale E&P',
      'International E&P',
      'Integrated Oil',
    ],

    'Oilfield Equipment': [
      'Shale E&P',
      'International E&P',
      'Oilfield Services',
    ],

    'Shale E&P': [
      'Midstream Pipeline',
      'Refining',
      'LNG Shipping',           // LNG出口
      'Commodity Chemicals',    // 化工原料
    ],

    'International E&P': [
      'Midstream Pipeline',
      'Refining',
    ],

    'Integrated Oil': [
      'Refining',
      'Midstream Pipeline',
    ],

    'Midstream Pipeline': [
      'Refining',
      'LNG Shipping',           // 天然气出口
      'Commodity Chemicals',    // 化工原料
    ],

    'Refining': [
      'Full-Service Airline',
      'Low-Cost Airline',
      'Truckload',                 // 长途卡车用柴油
      'LTL Trucking',              // 零担卡车
      'Crude Tanker',              // 原油运输
      'Product Tanker',            // 成品油运输
    ],

    // ========== 航运物流产业链 ==========
    // 全球贸易流: 制造商 → 航运 → 物流 → 零售商/消费者
    // 航运是全球贸易的核心基础设施

    // 集装箱航运 - 服务电商/零售/制造业
    'Container Shipping': [
      'Express Logistics',         // 快递物流
      'Freight Forwarding',        // 货代
      'Mass Retail',               // 大型零售
      'Internet Retail',           // 电商
    ],

    // 干散货航运 - 运输大宗商品
    'Dry Bulk Shipping': [
      'Steel Producer',            // 运输铁矿石
      'Ag Commodities',            // 运输粮食
      'Fertilizer',                // 运输化肥
    ],

    // 原油油轮 - 运输原油
    'Crude Tanker': [
      'Refining',                  // 炼厂需要原油
      'Integrated Oil',            // 综合油企
    ],

    // 成品油轮 - 运输成品油
    'Product Tanker': [
      'Mass Retail',               // 加油站
      'Full-Service Airline',      // 航空燃油
      'Truckload',                 // 柴油
    ],

    // LNG运输 - 服务天然气产业
    'LNG Shipping': [
      'Utilities - Regulated Electric',  // 电厂
      'Chemicals',                       // 化工
    ],

    // 快递物流 - 最后一公里
    'Express Logistics': [
      'Internet Retail',           // 电商配送
      'Mass Retail',               // 零售配送
      'Specialty Retail',          // 专业零售配送
    ],

    // 货运代理 - 整合运力
    'Freight Forwarding': [
      'Express Logistics',
      'Internet Retail',
    ],

    // 货运经纪 - 卡车运力撮合
    'Freight Brokerage': [
      'LTL Trucking',
      'Truckload',
    ],

    // LTL零担 - 小批量货物
    'LTL Trucking': [
      'Mass Retail',
      'Internet Retail',
    ],

    // 联运 - 铁路+卡车
    'Intermodal': [
      'Container Shipping',        // 港口接驳
      'Class I Railroad',          // 铁路运输
      'Mass Retail',
    ],

    // 铁路 - 大宗长途
    'Class I Railroad': [
      'Steel Producer',            // 钢铁运输
      'Ag Commodities',            // 农产品运输
      'Intermodal',                // 联运服务
    ],

    // ========== 汽车/EV产业链 ==========
    // 材料 → 电池 → Tier1 → OEM → 经销商
    'EV Battery Materials': [
      'EV Battery',
      'EV Components Tier1',
    ],

    'EV Battery': [
      'EV OEM',
      'Traditional OEM',
    ],

    'EV Components Tier1': [
      'EV OEM',
      'Traditional OEM',
    ],

    'Auto Parts Tier1': [
      'EV OEM',
      'Traditional OEM',
      'Auto Dealer',            // 售后零配件
      'Specialty Vehicles',     // 特种车辆
    ],

    'EV OEM': [
      'Auto Dealer',
      'EV Charging',            // 充电网络
      'Auto Finance',           // 汽车金融
    ],

    'Traditional OEM': [
      'Auto Dealer',
      'Car Rental',
    ],

    // ========== 医疗产业链 ==========
    // 生物技术 → 制药 → 分销 → 零售/医院
    'Emerging Biotech': [
      'Big Pharma',
      'Large Biotech',
    ],

    'Large Biotech': [
      'Pharma Distributor',
      'Pharmacy Retail',
      'Life Sciences Tools',     // 研发工具
    ],

    'Big Pharma': [
      'Pharma Distributor',
      'Pharmacy Retail',
      'Hospital',
      'Life Sciences Tools',     // 研发工具采购
    ],

    'Generic Pharma': [
      'Pharma Distributor',
      'Pharmacy Retail',
    ],

    'Pharma Distributor': [
      'Pharmacy Retail',
      'Hospital',
      'Health Insurance',
    ],

    'Pharmacy Retail': [
      'Health Insurance',
      'Pharma Distributor',   // 药品采购
    ],

    'Large MedTech': [
      'Hospital',
      'Pharma Distributor',   // 分销渠道
      'Health Insurance',      // 报销审批
      'Digital Health',        // 远程医疗设备
    ],

    // 生命科学工具服务于制药/生物科技研发
    'Life Sciences Tools': [
      'Big Pharma',
      'Large Biotech',
      'Emerging Biotech',
    ],

    'CRO': [
      'Big Pharma',
      'Large Biotech',
      'Emerging Biotech',
    ],

    // 动物健康相对独立
    'Animal Health': [
      'Ag Commodities',  // 畜牧业相关
    ],

    // ========== 云计算/数据中心产业链 ==========
    // 芯片 → 服务器/网络 → 数据中心 → 云服务 → SaaS
    'Server Hardware': [
      'Data Center REIT',
      'Cloud Hyperscaler',
    ],

    'Network Equipment': [
      'Data Center REIT',
      'Cloud Hyperscaler',
      'Wireless Carrier',      // 运营商采购
      'Cable Operator',        // 有线网络
    ],

    'Data Center REIT': [
      'Cloud Hyperscaler',
      'Enterprise SaaS',        // SaaS托管
      'Financial Data',         // 金融数据托管
    ],

    'Cloud Hyperscaler': [
      'Enterprise SaaS',
      'Streaming',              // 内容分发
      'Gaming Platform',        // 云游戏
      'Digital Health',         // 医疗云
    ],

    // ========== 建筑/基建产业链 ==========
    // 矿业 → 钢铁 → 机械 → 工程 → 房建
    'Copper Mining': [
      'Steel Producer',
      'Construction Equipment',
      'EV Components Tier1',
    ],

    'Aluminum': [
      'Aircraft OEM',
      'Auto Parts Tier1',
    ],

    'Steel Producer': [
      'Construction Equipment',
      'E&C Contractor',
      'Auto Parts Tier1',
    ],

    'Steel Distributor': [
      'E&C Contractor',
      'Homebuilder',
    ],

    'Aggregates': [
      'E&C Contractor',
      'Homebuilder',
    ],

    'Construction Equipment': [
      'E&C Contractor',
      'Shale E&P',
    ],

    'Ag & Construction Equipment': [
      'E&C Contractor',
      'Ag Inputs',
    ],

    'Ag Equipment': [
      'Ag Inputs',
      'Ag Commodities',
    ],

    'E&C Contractor': [
      'Homebuilder',
      'Data Center REIT',
      'Industrial REIT',        // 工业建筑
      'Midstream Pipeline',     // 管道建设
    ],

    // 建筑材料 → 房建商 → 房贷/产权保险
    'Building Products': [
      'Homebuilder',
      'Building Products Distributor',
    ],

    'Building Products Distributor': [
      'Homebuilder',
    ],

    'Homebuilder': [
      'Mortgage Lender',
      'Title Insurance',
      'Home Furnishing Retail', // 家居采购
      'Home Improvement',       // 装修材料
    ],

    'Mortgage Lender': [
      'Title Insurance',
    ],

    // ========== 工业产业链扩展 ==========
    // 工业综合 - 服务多个下游
    'Industrial Conglomerate': [
      'E&C Contractor',
      'Aircraft OEM',
      'Traditional OEM',
      'Data Center REIT',
    ],

    // 工业自动化 - 服务制造业
    'Industrial Automation': [
      'Traditional OEM',
      'EV OEM',
      'E&C Contractor',
      'Semiconductor Foundry',
    ],

    // 工业分销 - 服务各类制造/建筑
    'Industrial Distribution': [
      'E&C Contractor',
      'Construction Equipment',
      'Traditional OEM',
    ],

    // HVAC分销 - 服务建筑/房建
    'HVAC Distribution': [
      'Homebuilder',
      'E&C Contractor',
    ],

    // 泳池分销 - 服务房建
    'Pool Distribution': [
      'Homebuilder',
    ],

    // 卡车制造 - 服务物流/运输
    'Truck OEM': [
      'LTL Trucking',
      'Truckload',
      'Express Logistics',
    ],

    // 发动机/动力系统
    'Engine & Power': [
      'Truck OEM',
      'Construction Equipment',
      'Class I Railroad',
    ],

    // 特种车辆
    'Specialty Vehicles': [
      'E&C Contractor',
      'Defense Prime',
    ],

    // ========== 包装产业链 ==========
    // 金属包装 - 服务饮料/食品
    'Metal Packaging': [
      'Soft Drinks',
      'Energy Drinks',
      'Snacks & Beverages',
    ],

    // 纸包装 - 服务电商/零售/食品
    'Paper Packaging': [
      'E-commerce',
      'Mass Retail',
      'Packaged Foods',
    ],

    // 柔性包装 - 服务食品/医疗
    'Flexible Packaging': [
      'Packaged Foods',
      'Snacks',
      'Big Pharma',
    ],

    // ========== 特种化工产业链 ==========
    // 工业气体 - 基础工业原料
    'Industrial Gases': [
      'Steel Producer',
      'Refining',
      'Semiconductor Foundry',
      'Big Pharma',
      'Hospital',             // 医用氧气
      'Water Utility',        // 水处理
    ],

    // 涂料 - 服务建筑/汽车/航空
    'Coatings': [
      'Homebuilder',
      'Traditional OEM',      // 汽车涂料
      'Auto Parts Tier1',
      'Aircraft OEM',
    ],

    // 特种化学品 - 服务多行业
    'Specialty Chemicals': [
      'Packaged Foods',
      'Household Products',
      'Big Pharma',
      'Coatings',             // 颜料/助剂
      'EV OEM',               // 电池材料
    ],

    // 锂 - 服务电池/EV
    'Lithium': [
      'EV Battery',
      'EV Components Tier1',
    ],

    // 水泥 - 服务基建
    'Cement': [
      'E&C Contractor',
      'Homebuilder',
    ],

    // ========== 保险产业链 ==========
    // 保险经纪 → 保险公司
    'Insurance Broker': [
      'P&C Insurance',
      'Life Insurance',
    ],

    // P&C保险 - 与房产/汽车相关
    'P&C Insurance': [
      'Auto Dealer',
      'Homebuilder',
    ],

    // 人寿保险 - 与资管相关
    'Life Insurance': [
      'Asset Manager',
      'Alternative Asset Manager',
    ],

    // ========== 银行/金融产业链 ==========
    // 交易所/数据 → 投行 → 资管 (金融服务链)
    'Exchange': [
      'Investment Bank',
      'Brokerage',
      'Alternative Asset Manager',
    ],

    'Financial Data': [
      'Investment Bank',
      'Asset Manager',
      'Alternative Asset Manager',
    ],

    // 投行 → 资管/银行
    'Investment Bank': [
      'Asset Manager',
      'Alternative Asset Manager',
    ],

    // 大型银行 → 区域银行/消费金融 (批发资金、代理银行)
    'Universal Bank': [
      'Regional Bank',
      'Consumer Finance',
      'Asset Manager',
    ],

    // 区域银行 → 消费金融/住房贷款
    'Regional Bank': [
      'Consumer Finance',
      'Auto Finance',
      'Homebuilder',
    ],

    // 支付基础设施 → 消费者终端
    'Payment Processor': [
      'Payment Network',
      'Digital Payments',
      'Regional Bank',
      'E-commerce',
      'Mass Retail',
    ],

    'Payment Network': [
      'Consumer Finance',
      'Digital Payments',
      'Payment Processor',
    ],

    'Digital Payments': [
      'E-commerce',
      'Mass Retail',            // 移动支付
      'QSR',                    // 快餐支付
      'Ride-hailing',           // 出行支付
    ],

    // 资管 → 券商渠道
    'Asset Manager': [
      'Brokerage',
    ],

    'Alternative Asset Manager': [
      'Brokerage',
      'Industrial REIT',        // 不动产投资
      'Data Center REIT',       // 基建投资
      'E&C Contractor',         // 基建项目
    ],

    // 托管银行 → 资管/券商 (托管/清算服务)
    'Custody Bank': [
      'Asset Manager',
      'Alternative Asset Manager',
      'Brokerage',
    ],

    // ========== REITs产业链 ==========
    // 工业REIT - 服务物流/电商
    'Industrial REIT': [
      'Express Logistics',
      'E-commerce',
      'LTL Trucking',
      'Truckload',            // 卡车运输
      'Warehouse Club',       // 仓储配送
    ],

    // 零售REIT - 服务零售商
    'Retail REIT': [
      'Mass Retail',
      'Apparel Retail',
    ],

    // 净租赁REIT - 服务稳定租户
    'Net Lease REIT': [
      'QSR',
      'Dollar Store',
      'Auto Parts Retail',
    ],

    // 住宅REIT - 与住房市场相关
    'Residential REIT': [
      'Homebuilder',
    ],

    // 办公REIT - 服务企业租户
    'Office REIT': [
      'Enterprise SaaS',
      'IT Consulting',
    ],

    // 医疗REIT - 服务医疗运营商
    'Healthcare REIT': [
      'Hospital',
      'Big Pharma',
      'Pharma Distributor',   // 配送中心
      'Pharmacy Retail',      // 零售药房
    ],

    // 自存储 - 与搬迁/住房相关
    'Self-Storage REIT': [
      'Homebuilder',
      'Residential REIT',
    ],

    // ========== 公用事业产业链 ==========
    // 受管制公用事业 - 基础设施
    'Regulated Utility': [
      'Residential REIT',
      'Industrial REIT',
      'Data Center REIT',
    ],

    // 独立发电商 - 向批发市场售电
    'Independent Power': [
      'Data Center REIT',
      'Cloud Hyperscaler',
    ],

    // 太阳能设备 - 服务安装商和公用事业
    'Solar Equipment': [
      'Solar Installer',
      'Regulated Utility',
    ],

    // 太阳能制造 - 服务公用事业
    'Solar Manufacturing': [
      'Regulated Utility',
      'Independent Power',
    ],

    // 太阳能安装 - 服务消费者
    'Solar Installer': [
      'Homebuilder',
      'Residential REIT',
    ],

    // 水务 - 基础设施
    'Water Utility': [
      'Homebuilder',
      'Residential REIT',
    ],

    // 废弃物收集 - 服务各行业 (matches subIndustryOverrides)
    'Waste Collection': [
      'Waste Processing',
      'Homebuilder',
      'E&C Contractor',
    ],

    'Environmental Services': [
      'Shale E&P',           // 油田废弃物
      'E&C Contractor',
      'Integrated Steel',    // 钢铁废料
      'Construction Equipment', // 建筑废弃物
    ],

    // ========== 电信/媒体产业链 ==========
    // 电信运营商 - 基础设施
    'Wireless Carrier': [
      'Streaming',
      'Social Platform',
      'Cloud Hyperscaler',
    ],

    // 有线电视 - 内容分发
    'Cable Operator': [
      'Streaming',
      'Media Conglomerate',
    ],

    // 流媒体 - 向广告商/硬件提供受众
    'Streaming': [
      'AdTech DSP',
      'AdTech SSP',
      'Media Conglomerate',    // 内容采购
      'Consumer Electronics',  // 显示终端
      'Cable Operator',        // 网络分发
    ],

    // 媒体集团 - 内容 → 广告
    'Media Conglomerate': [
      'AdTech DSP',
      'Streaming',
    ],

    // 社交平台 - 广告/电商/游戏
    'Social Platform': [
      'AdTech DSP',
      'AdTech Verification',
      'E-commerce Platform',   // 社交电商
      'Gaming Publisher',      // 游戏分发
    ],

    // AdTech DSP → 验证/SSP
    'AdTech DSP': [
      'AdTech Verification',
    ],

    // 游戏 → 广告平台
    'Gaming Publisher': [
      'AdTech Platform',
    ],

    'Gaming Platform': [
      'Gaming Publisher',     // 游戏引擎服务发行商
      'AdTech Platform',
    ],

    // 音频流媒体
    'Audio Streaming': [
      'AdTech DSP',
    ],

    // IT服务 - 服务企业客户
    'IT Services': [
      'Enterprise SaaS',
      'Cloud Hyperscaler',
    ],

    'IT Consulting': [
      'Enterprise SaaS',
      'Cloud Hyperscaler',
    ],

    'IT Outsourcing': [
      'Enterprise SaaS',
      'Cloud Hyperscaler',
      'Financial Data',        // 金融系统服务
    ],

    // 垂直SaaS - 服务特定行业
    'Vertical SaaS': [
      'Big Pharma',         // Veeva服务制药
      'Large Biotech',
      'CRO',
    ],

    // FinTech SaaS - 服务SMB财务
    'FinTech SaaS': [
      'Enterprise SaaS',    // 与CRM/ERP集成
    ],

    // 电商平台 - 服务商家
    'E-commerce Platform': [
      'Enterprise SaaS',    // 与营销/CRM集成
    ],

    // EDA → 芯片设计
    'EDA Software': [
      'Fabless Chips',
      'IDM',
      'Semiconductor Foundry',
    ],

    'Simulation Software': [
      'Fabless Chips',
      'Industrial Conglomerate',
      'Industrial Automation',
    ],

    'Design Software': [
      'Industrial Automation',
      'Industrial Conglomerate',
      'Large MedTech',
    ],

    // ========== 国防产业链 ==========
    // 国防主承包商 - B2G模式
    'Defense Prime': [
      'Full-Service Airline',  // 军转民技术
    ],

    // 国防电子
    'Defense Electronics': [
      'Defense Prime',
    ],

    // 航空零部件供应商
    'Aerospace Supplier': [
      'Aircraft OEM',
      'Aircraft Engine',
      'Defense Prime',
    ],

    // (金融服务产业链已在上方定义)

    // ========== 消费品产业链 ==========
    // 农业投入 → 农产品 → 加工 → 品牌 → 零售/餐饮
    'Fertilizer': [
      'Ag Commodities',
    ],

    'Ag Inputs': [
      'Ag Commodities',
    ],

    'Ag Commodities': [
      'Packaged Foods',
      'Snacks',
      'Snacks & Beverages',  // PEP等综合零食饮料公司
      'Soft Drinks',
    ],

    'Food Ingredients': [
      'Packaged Foods',
      'Snacks',
      'Soft Drinks',
    ],

    'Packaged Foods': [
      'Mass Retail',
      'Warehouse Club',
      'Dollar Store',           // 折扣渠道
      'Grocery',                // 超市渠道
      'E-commerce',             // 线上渠道
    ],

    'Snacks': [
      'Mass Retail',
      'Warehouse Club',
      'Dollar Store',           // 折扣渠道
      'Dollar Store',
    ],

    'Snacks & Beverages': [
      'Mass Retail',
      'Warehouse Club',
      'QSR',
    ],

    'Soft Drinks': [
      'Mass Retail',
      'QSR',
      'Casual Dining',
    ],

    'Energy Drinks': [
      'Mass Retail',
      'Warehouse Club',
    ],

    'Cereal & Snacks': [
      'Mass Retail',
      'Warehouse Club',
    ],

    // 咖啡连锁 → 零售/OTA (客流关联)
    'Coffee Chain': [
      'Mass Retail',               // 购物中心客流
      'Grocery',                   // 超市零售渠道(包装咖啡)
    ],

    // 长途卡车运输 → 零售终端
    'Truckload': [
      'Mass Retail',               // 大宗配送
      'Warehouse Club',            // 仓储配送
      'Grocery',                   // 生鲜配送
    ],

    // ========== 旅游/出行产业链 ==========
    'Hotel Chain': [
      'OTA',
      'Travel Meta',            // 比价平台
      'Ride-hailing',           // 酒店出行
    ],

    'Short-term Rental': [
      'OTA',
    ],

    'OTA': [
      'Legacy Airline',
      'Hotel Management',
      'Car Rental',
    ],

    // 邮轮 - 与旅游产业链相关
    'Cruise Lines': [
      'OTA',
      'Hotel Chain',
    ],

    // ========== 消费品扩展产业链 ==========
    // 家居用品 → 零售
    'Household Products': [
      'Mass Retail',
      'Warehouse Club',
      'Dollar Store',
      'Grocery',
    ],

    // 烟草 → 便利店/零售
    'Tobacco': [
      'Mass Retail',
      'Dollar Store',
      'Grocery',
    ],

    // 食品分销 → 餐饮/零售
    'Food Distribution': [
      'QSR',
      'Fast Casual',
      'Casual Dining',
      'Hospital',  // 医院餐饮
    ],

    // 杂货店
    'Grocery': [
      'Packaged Foods',
      'Household Products',
    ],

    // 家居建材 → 房建
    'Home Improvement': [
      'Homebuilder',
    ],

    // 家居家具
    'Home Furnishing Retail': [
      'Homebuilder',
    ],

    // 运动服饰 → 零售渠道
    'Athletic Apparel': [
      'Sporting Goods Retail',
      'Mass Retail',
      'E-commerce',
    ],

    // 服装零售 - 与运动服饰相关
    'Apparel Retail': [
      'Athletic Apparel',
      'Off-Price Retail',
    ],

    // 汽配零售 - 与汽车后市场相关
    'Auto Parts Retail': [
      'Traditional OEM',  // 保有量驱动
      'Auto Dealer',      // 二手车维修
    ],

    // 酒精饮料 → 餐饮/零售渠道
    'Beer & Spirits': [
      'QSR',
      'Casual Dining',
      'Mass Retail',
      'Grocery',
    ],

    'Beer': [
      'Mass Retail',
      'Grocery',
      'Casual Dining',
    ],

    'Spirits': [
      'Casual Dining',
      'Mass Retail',
      'Grocery',
    ],

    'Craft Beer': [
      'Mass Retail',
      'Grocery',
    ],

    // 美妆 → 零售渠道
    'Prestige Beauty': [
      'Beauty Retail',
      'Mass Retail',
    ],

    'Mass Beauty': [
      'Mass Retail',
      'Dollar Store',
      'Grocery',
    ],

    // 时尚品牌 → 零售渠道
    'Accessible Luxury': [
      'Off-Price Retail',
      'Mass Retail',
    ],

    'Fashion Brand': [
      'Off-Price Retail',
      'Mass Retail',
      'Apparel Retail',
    ],

    'Luxury Apparel': [
      'Apparel Retail',
    ],

    'Outdoor Apparel': [
      'Apparel Retail',
      'Mass Retail',
    ],

    'Basics Apparel': [
      'Mass Retail',
      'Dollar Store',
    ],

    'Denim Brand': [
      'Apparel Retail',
      'Mass Retail',
      'Off-Price Retail',
    ],

    // ========== 环保服务链 ==========
    'Waste Processing': [
      'Environmental Remediation',
    ],
    'Hazardous Waste': [
      'Environmental Remediation',
    ],

    // ========== 人力资源链 ==========
    'Staffing & Temp': [
      'Professional Services',
      'E&C Contractor',       // 建筑劳务
      'Enterprise SaaS',      // IT/技术人才
      'Hospital',             // 护理人员
      'Mass Retail',          // 季节性零售
    ],

    // ========== 教育链 ==========
    'EdTech': [
      'Education Services',
      'Enterprise SaaS',      // 学习管理系统
    ],

    // ========== 贵金属链 ==========
    'Gold Mining': [
      'Precious Metals Streaming',
    ],

    // ========== EV充电链 ==========
    'EV Charging': [
      'EV OEM',
    ],

    // ========== 数据中心链 ==========
    'Data Center Infrastructure': [
      'Data Center REIT',
    ],

    // ========== 房地产服务链 ==========
    'Commercial Real Estate Services': [
      'Data Center REIT',
    ],
    'Residential Real Estate Tech': [
      'Homebuilder',
    ],

    // ========== 消费金融/汽车金融链 ==========
    'Consumer Finance': [
      'Mass Retail',          // 消费信贷 → 零售消费
      'Auto Dealer',          // 信用卡/分期
      'E-commerce',           // 在线消费
    ],

    'Auto Finance': [
      'Auto Dealer',          // 汽车贷款 → 经销商
      'Traditional OEM',      // 产能消化/销量驱动
    ],

    // ========== 电商/外卖平台链 ==========
    'E-commerce Marketplace': [
      'Payment Processor',    // 交易处理
      'Express Logistics',    // 物流配送
      'Enterprise SaaS',      // 卖家工具
    ],

    'Food Delivery': [
      'QSR',                  // 快餐客户
      'Fast Casual',          // 餐饮客户
      'Casual Dining',        // 正餐客户
    ],

    // ========== 媒体/广告补充 ==========
    'Broadcast TV': [
      'AdTech DSP',           // 广告库存
      'AdTech Verification',  // 广告验证
      'Streaming',            // 内容分发
    ],

    // ========== 旅游补充 ==========
    'Travel Meta': [
      'Hotel Chain',          // 酒店比价
      'OTA',                  // 预订渠道
      'Cruise Lines',         // 邮轮评价
    ],

    'Ride-hailing': [
      'Car Rental',           // 竞争替代
      'Full-Service Airline',  // 机场接送
      'Hotel Chain',           // 酒店出行
    ],

    // ========== 零售/消费补充 ==========
    'Electronics Retail': [
      'Consumer Electronics', // 上游供应
      'Payment Processor',    // 支付基础设施
    ],

    'Uniform & Workplace': [
      'E&C Contractor',       // 建筑工装
      'Hospital',             // 医疗制服
      'Professional Services', // 企业客户
    ],

    // ========== 医疗采购链补充 ==========
    'Hospital': [
      'Pharma Distributor',   // 药品采购
    ],

    // ========== 数字健康链 ==========
    'Digital Health': [
      'Hospital',             // 远程问诊服务医院
      'Health Insurance',     // 保险覆盖
      'Pharmacy Retail',      // 在线处方
    ],

    // ========== 大宗化工链 ==========
    'Commodity Chemicals': [
      'Packaged Foods',       // 包装材料
      'Homebuilder',          // 建筑化工
      'Traditional OEM',      // 汽车化工
    ],

    // ========== 网络安全链 ==========
    'Cybersecurity': [
      'Enterprise SaaS',      // 保护SaaS平台
      'Cloud Hyperscaler',    // 保护云基础设施
      'Universal Bank',       // 银行安全
    ],

    // ========== 百货/零售补充 ==========
    'Department Store': [
      'Apparel Retail',        // 服装竞争
      'Mass Retail',           // 零售竞争替代
    ],

    // 宠物电商 → 宠物上游
    'Pet E-commerce': [
      'Animal Health',         // 宠物医疗产品
    ],

    // 健身平台
    'Connected Fitness': [
      'Streaming',             // 内容竞争
      'Consumer Electronics',  // 硬件竞争
    ],

    // 计算机硬件 → 下游
    'Computer Hardware': [
      'Enterprise SaaS',       // 办公设备
      'Mass Retail',           // 零售渠道
    ],

    // ========== 终端消费链补充 ==========
    'Enterprise SaaS': [
      'Cloud Hyperscaler',     // 基础设施需求
      'Data Center REIT',      // 数据中心需求
      'IT Outsourcing',        // 实施服务
      'Cybersecurity',         // 安全需求
    ],

    'Auto Dealer': [
      'Traditional OEM',       // 车辆采购
      'EV OEM',                // 电动车采购
      'Auto Finance',          // 金融合作
    ],

    'QSR': [
      'Food Distribution',     // 食材采购
      'Packaged Foods',        // 供应链
      'Payment Processor',     // 支付处理
    ],

    'Casual Dining': [
      'Food Distribution',     // 食材配送
      'Beer & Spirits',        // 酒水采购
    ],

    'Fast Casual': [
      'Food Distribution',     // 供应链
      'Payment Processor',     // 支付
    ],

    'Mass Retail': [
      'Express Logistics',     // 物流配送
      'Payment Processor',     // 收银支付
      'Consumer Electronics',  // 电子产品
    ],

    'Off-Price Retail': [
      'Apparel Retail',        // 过季库存
      'Mass Retail',           // 竞争替代
    ],

    'Beauty Retail': [
      'Prestige Beauty',       // 品牌采购
      'Mass Beauty',           // 大众品牌
    ],

    'Consumer Electronics': [
      'Cloud Hyperscaler',     // 云服务集成
      'Streaming',             // 内容终端
    ],

    // ========== 健康保险链 ==========
    'Health Insurance': [
      'Hospital',              // 支付医院费用
      'Pharmacy Retail',       // 处方药覆盖
      'Digital Health',        // 远程医疗覆盖
      'Large MedTech',         // 设备审批/报销
    ],

    // ========== 生活服务链补充 ==========
    'Car Rental': [
      'Full-Service Airline',  // 机场租车
      'Hotel Chain',           // 酒店配套
      'Traditional OEM',       // 车队采购
    ],

    // ========== 证券经纪链 ==========
    'Brokerage': [
      'Exchange',              // 交易所接入
      'Financial Data',        // 数据供应
    ],

    // ========== 企业软件补充链 ==========
    'Enterprise ERP': [
      'Cloud Hyperscaler',     // 云基础设施
      'IT Outsourcing',        // 系统集成实施
      'Enterprise SaaS',       // 与SaaS集成
    ],

    'SMB Software': [
      'Payment Processor',     // 支付集成
      'E-commerce',            // 在线商店集成
      'Digital Payments',      // 金融服务
    ],

    // ========== 工业设备补充链 ==========
    'Equipment Rental': [
      'Construction Equipment',  // 设备来源
      'E&C Contractor',          // 施工客户
      'Homebuilder',             // 住宅建设客户
    ],

    'Specialty Industrial': [
      'E&C Contractor',          // 工程客户
      'Shale E&P',               // 油气客户
      'Commodity Chemicals',     // 化工客户
    ],

    'Water Technology': [
      'Regulated Utility',       // 公用事业客户
      'E&C Contractor',          // 工程集成
      'Homebuilder',             // 住宅供水
    ],

    'Building Systems': [
      'Commercial REIT',         // 商业建筑
      'E&C Contractor',          // 建设阶段
      'Homebuilder',             // 住宅安装
      'Industrial REIT',         // 仓库/工业
    ],

    // ========== 生命科学REIT ==========
    'Life Science REIT': [
      'Large Pharma',            // 制药研发
      'Large Biotech',           // 生物科技研发
      'Large MedTech',           // 医疗设备研发
    ],

    // ========== 补充链 - 新增子行业连接 ==========

    'Auto Auction': [
      'Auto Dealer',             // 二手车供应
      'Auto Finance',            // 贷款回收车辆
    ],

    'Pharma Packaging': [
      'Big Pharma',              // 药品包装需求
      'Large Biotech',           // 生物药包装
      'Generic Pharma',          // 仿制药包装
    ],

    'Medical Sterilization': [
      'Hospital',                // 医院灭菌服务
      'Large MedTech',           // 设备灭菌
    ],

    'Power Equipment': [
      'Homebuilder',             // 住宅备用电源
      'Data Center REIT',        // 备用发电
      'Regulated Utility',       // 电力设备
    ],

    'Welding Equipment': [
      'E&C Contractor',          // 建设焊接
      'Shipbuilder',             // 造船焊接
      'Midstream Pipeline',      // 管道焊接
    ],

    'Outdoor Equipment': [
      'Homebuilder',             // 园林设备
      'Ag & Construction Equipment',  // 场地维护
    ],

    'Geospatial Tech': [
      'E&C Contractor',          // 测量/BIM
      'Ag & Construction Equipment',  // 精准农业
    ],

    'Test & Measurement': [
      'Semiconductor Equipment', // 芯片测试
      'Network Equipment',       // 通信测试
      'Large MedTech',           // 医疗设备测试
    ],

    'Enterprise Mobility': [
      'Express Logistics',       // 仓库扫描
      'Mass Retail',             // 零售移动终端
      'Hospital',                // 医疗追踪
    ],

    'Financial Infrastructure': [
      'Exchange',                // 交易后处理
      'Brokerage',               // 经纪后台
      'Asset Manager',           // 基金管理
    ],

    'Market Making': [
      'Exchange',                // 交易所流动性
      'Brokerage',               // 做市服务
    ],

    'Commercial Real Estate Data': [
      'Commercial REIT',         // 数据服务
      'Industrial REIT',         // 物业数据
    ],

    'Process Industry Software': [
      'Commodity Chemicals',     // 化工优化
      'Midstream Pipeline',      // 管道优化
      'Shale E&P',               // 油气优化
    ],

    'Defense IT': [
      'Defense Prime',           // 国防IT系统
      'Cybersecurity',           // 安全服务
    ],

    'Law Enforcement Tech': [
      'Enterprise SaaS',         // 执法SaaS平台
    ],

    'Specialty Metals': [
      'Aircraft Engine',         // 航空合金
      'Aerospace Supplier',      // 航天材料
      'Large MedTech',           // 植入物合金
    ],

    'Remittance': [
      'Digital Payments',        // 数字支付竞争
      'Regional Bank',           // 银行汇款通道
    ],

    'Diversified Insurance': [
      'Regional Bank',           // 银保合作
      'Insurance Broker',        // 经纪分销
    ],

    // ========== 新增子行业链 - 博彩/物流/医疗 ==========
    'Casino & Resort': [
      'Hotel Chain',             // 酒店住宿
      'Full-Service Airline',    // 航空合作
      'Payment Processor',       // 赌场支付
    ],

    'Online Gaming': [
      'Streaming',               // 体育直播合作
      'Payment Processor',       // 在线支付
    ],

    'Contract Logistics': [
      'E-commerce',              // 电商履约
      'Mass Retail',             // 零售配送
      'Express Logistics',       // 快递合作
    ],

    'Hotel REIT': [
      'Hotel Chain',             // 酒店运营商
      'Travel Meta',             // OTA渠道
    ],

    'Diagnostics': [
      'Hospital',                // 医院检测
      'Big Pharma',              // 伴随诊断
      'Health Insurance',        // 保险报销
    ],

    'Life Science Tools': [
      'Big Pharma',              // 研发工具
      'Large Biotech',           // 生物研发
      'CRO',                     // 合同研究
    ],

    'Online Fashion Retail': [
      'Apparel Retail',          // 时装零售竞争
      'Express Logistics',       // 配送
      'Payment Processor',       // 在线支付
    ],

    'Trust Bank': [
      'Asset Manager',           // 资产管理服务
      'Exchange',                // 证券托管
      'Financial Data',          // 数据服务
    ],

    'Uranium': [
      'Regulated Utility',       // 核电站燃料
      'Independent Power',       // 核能发电
    ],

    // ========== 新增子行业链 - 第四批 ==========
    'Natural Gas E&P': [
      'Midstream Pipeline',      // 管道运输
      'LNG Shipping',            // LNG出口
      'Commodity Chemicals',     // 化工原料
    ],

    'Specialty Pharma': [
      'Pharma Distributor',      // 药品分销
      'Pharmacy Retail',         // 药房零售
      'Hospital',                // 医院处方
    ],

    'Death Care': [
      'Life Insurance',          // 寿险预需计划
    ],

    'Advertising REIT': [
      'AdTech DSP',              // 数字广告竞争
      'Social Platform',         // 品牌广告竞争
    ],

    'Electrical Equipment': [
      'Regulated Utility',       // 电力公司采购
      'E&C Contractor',          // 工程承包安装
      'Industrial REIT',         // 工业设施用电
    ],

    'Truck Leasing': [
      'Truckload',               // 整车运输客户
      'LTL Trucking',            // 零担运输客户
      'Express Logistics',       // 快递物流客户
    ],

    'Specialty REIT': [
      'Enterprise SaaS',         // 数据中心客户（云/SaaS）
      'Cloud Hyperscaler',       // 云托管客户
      'Big Pharma',              // 医药合规存储
    ],

    // ========== 新增子行业链 - 第五批 (30只新股票) ==========

    // 管理式医疗 → 医院/药房
    'Managed Care': [
      'Hospital',                // 支付医院费用
      'Pharmacy Retail',         // 处方药覆盖
      'Digital Health',          // 远程医疗合作
    ],

    // 医疗器械 → 医院
    'Medical Devices': [
      'Hospital',                // 医院采购
      'Health Insurance',        // 保险报销
      'Pharma Distributor',      // 分销渠道
    ],

    // 云基础设施(CDN/托管) → 企业SaaS/电商
    'Cloud Infrastructure': [
      'Enterprise SaaS',         // SaaS交付基础设施
      'E-commerce',              // 电商网站性能
      'Social Platform',         // 社交平台CDN
      'Streaming',               // 视频CDN
    ],

    // 消费网络安全 → 终端消费者(无明确下游，连接零售)
    'Consumer Cybersecurity': [
      'Mass Retail',             // 零售渠道分销
      'E-commerce',              // 在线订阅分销
    ],

    // 3PL物流 → 零售/电商
    '3PL': [
      'Mass Retail',             // 零售配送
      'E-commerce',              // 电商履约
      'Truckload',               // 整车运输合作
    ],

    // 包装 → 食品饮料/消费品
    'Packaging': [
      'Packaged Foods',          // 食品包装
      'Soft Drinks',             // 饮料包装(铝罐)
      'Beer & Spirits',          // 酒类包装
      'Household Products',      // 消费品包装
    ],

    // 现场娱乐 → 广告/平台
    'Live Entertainment': [
      'AdTech DSP',              // 活动广告
      'Social Platform',         // 社交传播
      'Streaming',               // 直播竞争
    ],

    // HCM SaaS → 企业客户
    'HCM SaaS': [
      'Enterprise SaaS',         // 与ERP/CRM集成
      'Regional Bank',           // 薪资代发合作
      'SMB Software',            // SMB生态集成
    ],

    // 支付处理(车队卡) → 物流/运输
    'Payment Processing': [
      'Truckload',               // 车队加油卡
      'LTL Trucking',            // 零担车队
      'Express Logistics',       // 快递车队
    ],

    // 农机 → 农业商品
    'Farm Equipment': [
      'Ag Commodities',          // 农业生产
      'Fertilizer',              // 农资配套
    ],

    // 模拟半导体 → 消费电子
    'Analog Semis': [
      'Consumer Electronics',    // 音频/触觉终端
      'Fabless Chips',           // 芯片集成
    ],

    // RF半导体 → 通信/国防
    'RF Semiconductor': [
      'Network Equipment',       // 5G基站
      'Defense Electronics',     // 国防雷达/通信
      'Wireless Carrier',        // 运营商设备
    ],

    // 数字媒体 → 广告
    'Digital Media': [
      'AdTech DSP',              // 广告库存
      'Social Platform',         // 内容分发竞争
      'Streaming',               // 数字内容竞争
    ],

    // 资产管理(已有Asset Manager, 新增Asset Management连接)
    'Asset Management': [
      'Brokerage',               // 经纪渠道
      'Regional Bank',           // 银行财富管理
    ],

    // ========== 新增子行业链 - 第六批 (30只新股票) ==========

    // 公寓REIT → 住房市场
    'Apartment REIT': [
      'Homebuilder',             // 新建公寓/出租住宅
      'Residential REIT',        // 住宅REIT同行
      'Home Improvement',        // 租户装修需求
    ],

    // 再保险 → P&C保险
    'Reinsurance': [
      'P&C Insurance',           // 分保业务
      'Life Insurance',          // 寿险再保
    ],

    // 建材分销 → 建筑商
    'Building Products Distribution': [
      'Homebuilder',             // 住宅建商客户
      'Building Products',       // 上游建材供应
      'E&C Contractor',          // 商业工程承包
    ],

    // 次贷汽车 → 汽车经销
    'Subprime Auto': [
      'Auto Dealer',             // 经销商合作
      'P&C Insurance',           // 车险配套
    ],

    // 高速互连 → 数据中心/网络
    'High-Speed Interconnect': [
      'Network Equipment',       // 网络设备客户
      'Data Center REIT',        // 数据中心互连
      'Cloud Hyperscaler',       // 超大规模云
    ],

    // 电子元件 → 终端产品
    'Electronic Components': [
      'Consumer Electronics',    // 消费电子终端
      'Auto - Manufacturers',    // 汽车电子
      'Industrial Conglomerate', // 工业设备
    ],

    // 便利店 → 消费终端
    'Convenience Store': [
      'Soft Drinks',             // 饮料供应
      'Food Distribution',       // 食品配送
    ],

    // 家居寝具 → 组件上游
    'Home Furnishings': [
      'Furniture Components',    // 弹簧/泡沫组件
    ],

    // 家具组件 → 家居下游
    'Furniture Components': [
      'Home Furnishings',        // 床垫/家具制造
    ],

    // 冷链仓储REIT → 食品供应链
    'Cold Storage REIT': [
      'Food Distribution',       // 食品配送客户
      'Grocery Retail',          // 超市冷藏需求
    ],

    // 牙科设备 → 医疗终端
    'Dental Equipment': [
      'Medical Devices',         // 医疗器械同行
      'Diagnostics',             // 诊断设备关联
    ],

    // 天然气中游 → 油气产业链
    'Nat Gas Midstream': [
      'Oil Refinery',            // 炼油下游
      'Power Generation',        // 发电用气
    ],

    // 炼油 → 燃料终端
    'Oil Refinery': [
      'Convenience Store',       // 加油站便利店
      'Nat Gas Midstream',       // 中游气源
    ],

    // 卫星通信 → 终端应用
    'Satellite Communications': [
      'Defense Electronics',     // 国防通信需求
      'Network Equipment',       // 网络设备集成
    ],

    // 宠物产品 → 消费终端
    'Pet Products': [
      'Grocery Retail',          // 超市渠道
      'E-Commerce',              // 电商渠道
    ],

    // ========== 新增子行业链 - 第七批 (30只新股票) ==========

    // 商业地产服务 → 房地产下游
    'Real Estate Services': [
      'Industrial REIT',         // 工业物业服务
      'Office REIT',             // 办公物业服务
      'Retail REIT',             // 零售物业服务
      'Homebuilder',             // 住宅交易服务
    ],

    // 海上钻井 → 油气E&P
    'Offshore Driller': [
      'International E&P',       // 国际油气开采
      'Integrated Oil',          // 综合油企深水项目
    ],

    // 玩具/游戏 → 零售渠道
    'Toys & Games': [
      'Mass Retail',             // 大型零售渠道
      'E-commerce',              // 电商渠道
      'Streaming',               // 娱乐IP授权
    ],

    // 线上房地产 → 房产相关
    'Online Real Estate': [
      'Homebuilder',             // 新房交易
      'Mortgage Lender',         // 按揭合作
      'Title Insurance',         // 产权保险
    ],

    // 太空系统 → 国防/卫星
    'Space Systems': [
      'Defense Prime',           // 国防航天合作
      'Satellite Communications', // 卫星基础设施
    ],

    // 运动鞋 → 零售渠道
    'Athletic Footwear': [
      'Sporting Goods Retail',   // 运动零售渠道
      'Mass Retail',             // 大众零售渠道
      'E-commerce',              // 电商DTC
    ],

    // 油田服务 → 上游E&P
    'Oil Services': [
      'Shale E&P',               // 页岩油气
      'International E&P',       // 国际E&P
      'Integrated Oil',          // 综合油企
    ],

    // 折扣零售(独立终端，无明确下游)
    'Discount Retail': [
      'Mass Retail',             // 零售竞争替代
    ],

    // E&P → 中下游
    'E&P': [
      'Midstream Pipeline',      // 管道运输
      'Refining',                // 炼油
    ],

    // ========== 新增子行业链 - advisory banks, office REITs, E&P, DTC brands, consulting ==========

    // 生物技术平台 → 大药企/生物科技(授权客户)
    'Biotech Platform': [
      'Big Pharma',              // 授权合作
      'Large Biotech',           // 生物科技客户
      'Emerging Biotech',        // 新兴生物科技客户
    ],

    // 工程/科学咨询(独立终端)
    'Consulting': [
      'P&C Insurance',           // 保险诉讼/理赔
      'E&C Contractor',          // 工程事故分析
    ],

    // DTC电商 → 物流/支付
    'Specialty E-commerce': [
      'Express Logistics',       // 配送物流
      'Payment Processor',       // 支付处理
    ],

    // 小型制药 → 分销/保险
    'Small Pharma': [
      'Pharma Distributor',      // 药品分销
      'Health Insurance',        // 保险报销
      'Pharmacy Retail',         // 零售药房
    ],

    // 另类资管 → 经纪/银行渠道
    'Alternative Asset Management': [
      'Investment Bank',         // 投行承销/募资
      'Brokerage',               // 经纪分销
    ],

    // ========== 新增子行业链 ==========

    // 主题公园 → 下游消费/旅游
    'Theme Parks': [
      'Travel Services',         // 旅游服务
      'Lodging',                 // 住宿
      'Live Entertainment',      // 现场娱乐
    ],

    // 按揭保险 → 下游地产/银行
    'Mortgage Insurance': [
      'Mortgage Lender',         // 按揭贷款
      'Homebuilder',             // 住宅建设
      'Regional Bank',           // 地区银行
    ],


    // ========== 追加子行业链 (2026-01-24) ==========
    'Auto OEM': [
      'Auto Parts Retail',
      'Car Rental',
      'Auto Dealer',
    ],

    'Global Bank': [
      'Asset Management',
      'Capital Markets',
      'Commercial Real Estate Services',
    ],

    'Creative Software': [
      'Digital Media',
      'AdTech DSP',
      'E-commerce Platform',
    ],

    'Legacy Airline': [
      'Hotel',
      'Car Rental',
      'Travel Meta',
    ],

    'Hospital Operator': [
      'Medical Devices',
      'Pharma Distribution',
      'Health Insurance',
    ],

    'Factory Automation': [
      'Auto OEM',
      'Semiconductor Fab',
      'Consumer Electronics OEM',
    ],

    'Solar Panel Manufacturer': [
      'Residential Solar',
      'Utility-Scale Solar',
      'Regulated Utility',
    ],

    'Digital Bank': [
      'Payment Network',
      'Consumer Finance',
      'Subprime Auto',
    ],

    'Neobank': [
      'Payment Network',
      'Digital Bank',
      'Consumer Finance',
    ],

    'Retail Brokerage': [
      'Capital Markets',
      'Crypto Exchange',
      'ETF Provider',
    ],

    'Dollar Store': [
      'Packaged Foods',
      'Mass Beauty',
      'Basics Apparel',
    ],

    'Connected TV': [
      'AdTech DSP',
      'Streaming',
      'Content Studio',
    ],

    'Digital Mortgage': [
      'Title Insurance',
      'Mortgage Insurance',
      'Residential Real Estate Tech',
    ],

    'HVAC': [
      'Residential Construction',
      'Data Center Infrastructure',
      'Commercial Real Estate Services',
    ],

    'Residential HVAC': [
      'Residential Construction',
      'Building Products Distribution',
      'Home Furnishings',
    ],

    'Edge Computing': [
      'Enterprise Cybersecurity',
      'Cloud Hyperscaler',
      'Enterprise SaaS',
    ],

    'Database Platform': [
      'Cloud Hyperscaler',
      'Enterprise SaaS',
      'Data Infrastructure',
    ],

    'Data Streaming': [
      'Cloud Hyperscaler',
      'Enterprise SaaS',
      'Data Infrastructure',
    ],

    'Crypto Exchange': [
      'Payment Network',
      'Capital Markets',
      'Crypto Mining',
    ],

    'Crypto Mining': [
      'Semiconductor Fab',
      'Data Center Infrastructure',
      'Regulated Utility',
    ],

    'For-Profit Education': [
      'EdTech',
      'Education Services',
      'Student Housing',
      'Enterprise Software',   // 教育科技
      'Consumer Finance',      // 助学贷款
    ],

    'Backup Power': [
      'Residential Construction',
      'Data Center Infrastructure',
      'Regulated Utility',
    ],

    'Diversified Conglomerate': [
      'Insurance',
      'Railroad',
      'Regulated Utility',
    ],

    'Telecom Carrier': [
      'Enterprise SaaS',
      'Edge Computing',
      'Streaming',
    ],

    'Digital Engineering': [
      'Enterprise SaaS',
      'Cloud Hyperscaler',
      'E-commerce Platform',
    ],

    'Value Retail': [
      'Toys & Games',
      'Mass Beauty',
      'Basics Apparel',
    ],

    'HVAC & Refrigeration': [
      'Cold Storage REIT',
      'Grocery',
      'Data Center Infrastructure',
    ],

    // ========== 追加50只新股票子行业链 ==========
    'Analytical Instruments': [
      'Large Pharma',
      'Biotech Platform',
      'Life Sciences Tools',
    ],
    'Precision Instruments': [
      'Analytical Instruments',
      'Large Pharma',
      'Chemical Specialty',
    ],
    'Gas Utility': [
      'Residential Construction',
      'Industrial Gases',
      'Nat Gas Midstream',
    ],
    'Pool & Spa Distribution': [
      'Residential Construction',
      'Chemical Specialty',
      'Home Furnishings',
    ],
    'Marketing SaaS': [
      'E-commerce Platform',
      'Digital Media',
      'Enterprise SaaS',
    ],
    'Construction Software': [
      'Residential Construction',
      'Commercial Real Estate Services',
      'Construction Equipment',
    ],
    'Work Management SaaS': [
      'Enterprise SaaS',
      'IT Outsourcing',
      'Digital Engineering',
    ],
    'Cross-border Commerce': [
      'E-commerce Platform',
      'Payment Network',
      'Express Logistics',
    ],
    'Pet Retail': [
      'Pet Products',
      'Veterinary',
      'Online Pet Retail',
    ],
    'Online Pet Retail': [
      'Pet Products',
      'Express Logistics',
      'Packaged Foods',
    ],
    'Home Sharing': [
      'OTA',
      'Hotel Management',
      'Travel Meta',
    ],
    'Hotel Management': [
      'Hotel REIT',
      'Travel Meta',
      'OTA',
    ],
    'Health Tech': [
      'Hospital Operator',
      'Large Pharma',
      'Medical Devices',
    ],
    'Pharma Tech': [
      'Pharmacy Retail',
      'Large Pharma',
      'Health Insurance',
    ],
    'Telehealth': [
      'Health Insurance',
      'Hospital Operator',
      'Large Pharma',
    ],
    'Pharma Royalties': [
      'Large Pharma',
      'Large Biotech',
      'Small Pharma',
    ],
    'Wealth Management Platform': [
      'Online Brokerage',
      'Asset Management',
      'Financial Infrastructure',
    ],
    'Online Brokerage': [
      'Capital Markets',
      'Crypto Exchange',
      'ETF Provider',
    ],
    'Options Exchange': [
      'Capital Markets',
      'Market Making',
      'Financial Infrastructure',
    ],
    'Fixed Income Trading': [
      'Capital Markets',
      'Asset Management',
      'Global Bank',
    ],
    'Solar Inverter': [
      'Residential Solar',
      'Solar Panel Manufacturer',
      'Regulated Utility',
    ],
    'Integrated Steel': [
      'Auto OEM',
      'Construction Equipment',
      'Residential Construction',
    ],

    // ========== S&P 400 Midcap 新增产业链 ==========
    'Smart Home': [
      'Residential Construction',
      'IoT Platform',
      'Telecom Carrier',
    ],
    'Smart Home Camera': [
      'Smart Home',
      'Edge Computing',
      'Consumer Electronics OEM',
    ],
    'Restaurant Tech': [
      'Quick Service Restaurant',
      'Fast Casual Restaurant',
      'Casual Dining',
    ],
    'Banking Software': [
      'Regional Bank',
      'Global Bank',
      'Digital Bank',
    ],
    'Endpoint Management': [
      'Enterprise SaaS',
      'Enterprise Cybersecurity',
      'IT Outsourcing',
    ],
    'Fast Casual Restaurant': [
      'Packaged Foods',
      'Food Distribution',
      'Commercial Real Estate Services',
    ],
    'Restaurant Franchisor': [
      'Quick Service Restaurant',
      'Fast Casual Restaurant',
      'Commercial Real Estate Services',
    ],
    'Genetic Testing': [
      'Large Pharma',
      'Hospital Operator',
      'Health Insurance',
    ],
    'Cancer Diagnostics': [
      'Hospital Operator',
      'Large Pharma',
      'Health Insurance',
    ],
    'Ophthalmic Devices': [
      'Hospital Operator',
      'Medical Devices',
      'Health Insurance',
    ],
    'Sleep Therapy Devices': [
      'Hospital Operator',
      'Medical Devices',
      'Health Insurance',
    ],
    'Battery Storage': [
      'Solar Panel Manufacturer',
      'Regulated Utility',
      'Data Center Infrastructure',
    ],
    'Geothermal Energy': [
      'Regulated Utility',
      'Industrial Gases',
      'Residential Construction',
    ],
    'Steel Recycler': [
      'Construction Equipment',
      'Residential Construction',
      'Auto OEM',
    ],
    'Mini Mill Steel': [
      'Construction Equipment',
      'Residential Construction',
      'Auto OEM',
    ],
    'Advanced Materials': [
      'Aerospace',
      'EV Battery',
      'Oil Services',
    ],
    'Insurtech': [
      'P&C Insurance',
      'Auto Insurance',
      'Health Insurance',
    ],
    'Auto Insurance': [
      'Auto OEM',
      'Auto Parts Retail',
      'Car Rental',
    ],
    'Pacific Shipping': [
      'Container Shipping',
      'Express Logistics',
      'Port Operator',
    ],
    'TL Trucking': [
      'LTL Trucking',
      'Express Logistics',
      'Intermodal',
    ],
    'Building Materials Distribution': [
      'Residential Construction',
      'Building Products',
      'Commercial Real Estate Services',
    ],
    'Life Science Reagents': [
      'Large Pharma',
      'Biotech Platform',
      'Analytical Instruments',
    ],
    'Financial Software': [
      'Asset Management',
      'Online Brokerage',
      'Global Bank',
    ],
    'Vaccine Manufacturer': [
      'Large Pharma',
      'Hospital Operator',
      'Health Insurance',
    ],
    'Specialty Insurance': [
      'Reinsurance',
      'P&C Insurance',
      'Commercial Real Estate Services',
    ],

    // ========== 新增子行业链 ==========
    'CPaaS': [
      'Enterprise SaaS',
      'Contact Center',
      'Financial Infrastructure',
    ],
    'Outpatient Rehab': [
      'Hospital Operator',
      'Health Insurance',
      'Medical Devices',
    ],
    'Medical Diagnostics': [
      'Hospital Operator',
      'Large Pharma',
      'Health Insurance',
    ],
    'Cement/Precast Concrete': [
      'Residential Construction',
      'Building Products',
      'Construction Equipment',
    ],
    'Uranium Mining': [
      'Regulated Utility',
      'Nuclear Equipment',
      'Industrial Gases',
    ],
    'Specialty Grocery': [
      'Packaged Foods',
      'Food Distribution',
      'Consumer Staples',
    ],
    'Bakery/Snacks': [
      'Food Distribution',
      'Packaged Foods',
      'Quick Service Restaurant',
    ],
    'Furniture/Mattress': [
      'Residential Construction',
      'Home Furnishings',
      'Mass Retail',
    ],
    'Truck/Railcar Leasing': [
      'TL Trucking',
      'LTL Trucking',
      'Midstream Pipeline',
    ],
    'Food Ingredients/Private Label': [
      'Specialty Grocery',
      'Mass Retail',
      'Packaged Foods',
    ],

    // ========== 追加子行业链 (2026-01-24 batch 2) ==========

    // 时尚鞋类 → 零售渠道
    'Fashion Footwear': [
      'Department Store',             // 百货渠道
      'Mass Retail',                  // 大众零售
      'E-commerce',                   // 电商DTC
    ],

    // 制造住房 → 社区/零售
    'Manufactured Housing': [
      'Homebuilder',                  // 住宅市场竞争
      'Building Products',            // 上游建材
      'Mortgage Lender',              // 按揭融资
    ],

    // 护理服务 → 医疗终端
    'Skilled Nursing': [
      'Hospital Operator',            // 医院转介
      'Health Insurance',             // 保险支付方
      'Home Health',                  // 居家护理
    ],

    // 游戏引擎 → 游戏/内容
    'Game Engine': [
      'Gaming',                       // 游戏开发者
      'Streaming',                    // 流媒体内容
      'AR/VR',                        // 元宇宙/AR/VR
    ],

    // 焦煤 → 钢铁
    'Metallurgical Coal': [
      'Integrated Steel',             // 高炉钢厂
      'Steel Distributor',            // 钢材分销
    ],

    // 机器视觉 → 自动化终端
    'Machine Vision': [
      'Factory Automation',           // 工厂自动化
      'Semiconductor Equipment',      // 半导体检测
      'E-commerce',                   // 物流仓储
    ],

    // DevOps软件 → IT终端
    'DevOps Software': [
      'Cloud Infrastructure',         // 云基础设施
      'Enterprise Software',          // 企业IT
      'Cybersecurity',                // 安全运维
    ],

    // 企业软件 → IT终端
    'Enterprise Software': [
      'Cloud Infrastructure',         // 云平台
      'Financial Software',           // 金融科技
      'System Integrator',            // 系统集成商
    ],

    // 食品/药品包装 → 消费品
    'Specialty Packaging': [
      'Packaged Foods',               // 食品包装客户
      'Large Pharma',                 // 药品包装客户
      'Consumer Staples',             // 消费品包装
    ],

    // 海洋服务 → 海上油气
    'Offshore Marine Services': [
      'International E&P',            // 国际深水E&P
      'Integrated Oil',               // 综合油企海上项目
      'Offshore Driller',             // 海上钻井配合
    ],

    // 管理咨询 → 企业客户
    'Management Consulting': [
      'Large Pharma',                 // 药企诉讼
      'P&C Insurance',                // 保险诉讼
      'Global Bank',                  // 金融合规
    ],

    // 核医学影像 → 医疗终端
    'Nuclear Imaging': [
      'Hospital Operator',            // 医院影像科
      'Health Insurance',             // 保险覆盖
      'Large Pharma',                 // 药物伴随诊断
    ],

    // ========== S&P 600 Small-Cap Additions ==========

    // 药房自动化 → 医院/药房
    'Pharmacy Automation': [
      'Hospital Operator',            // 医院药房
      'Pharma Distribution',          // 药品分销
      'Health Insurance',             // 效率降本
    ],

    // 肿瘤治疗设备 → 医疗终端
    'Cancer Treatment Devices': [
      'Hospital Operator',            // 肿瘤科
      'Health Insurance',             // 保险报销
      'Large Pharma',                 // 联合治疗
    ],

    // 手术机器人 → 医院
    'Surgical Robotics': [
      'Hospital Operator',            // 手术室
      'Medical Devices',              // 器械配套
      'Health Insurance',             // 手术报销
    ],

    // 心脏监测 → 医疗终端
    'Cardiac Monitoring': [
      'Hospital Operator',            // 心内科
      'Health Insurance',             // 远程监护报销
      'Medical Devices',              // 心脏器械协同
    ],

    // 胰岛素泵 → 糖尿病管理
    'Insulin Pump Devices': [
      'Hospital Operator',            // 内分泌科
      'Health Insurance',             // 慢病报销
      'Medical Devices',              // CGM配套
    ],

    // 电源半导体 → 电子终端
    'Power Semiconductor': [
      'Consumer Electronics',         // 消费电子电源
      'EV Battery',                   // 新能源汽车
      'Industrial Automation',        // 工业电源
    ],

    // 视频处理芯片 → 终端应用
    'Video Processing Chip': [
      'Consumer Electronics',         // 安防摄像
      'Auto OEM',                     // 汽车视觉
      'Cloud Infrastructure',         // 云端视频
    ],

    // 芯片IP授权 → 芯片设计
    'Chip IP Licensing': [
      'Fabless Chips',                // 芯片设计客户
      'Consumer Electronics',         // 消费电子芯片
      'Communication Equipment',      // 通信芯片
    ],

    // 内存接口IP → 存储/计算
    'Memory Interface IP': [
      'Memory Chips',                 // 内存厂商
      'Server/Storage',               // 服务器
      'Data Center Infrastructure',   // 数据中心
    ],

    // RFID → 零售/物流
    'RFID Solutions': [
      'Mass Retail',                  // 零售库存管理
      'Express Logistics',            // 物流追踪
      'Pharma Distribution',          // 药品追溯
    ],

    // 焊接切割 → 工业制造
    'Welding & Cutting Equipment': [
      'Construction Equipment',       // 工程机械
      'Integrated Steel',             // 钢结构焊接
      'Aerospace',                    // 航空航天焊接
    ],

    // 供应链SaaS → 零售/物流
    'Supply Chain SaaS': [
      'Mass Retail',                  // 零售供应链
      'Express Logistics',            // 物流管理
      'E-commerce',                   // 电商供应链
    ],

    // 区域航空 → 干线航空
    'Regional Airline': [
      'Low-Cost Airline',             // 干线航空衔接
      'Travel Services',              // 旅游服务
      'Aerospace',                    // 飞机制造
    ],

    // 日式快餐 → 餐饮消费
    'Fast Casual Japanese': [
      'Food Distribution',            // 食材供应
      'Casual Dining',                // 餐饮同行
      'Quick Service Restaurant',     // 快餐竞争
    ],

    // 海底服务 → 海上油气
    'Subsea Services': [
      'International E&P',            // 国际深水项目
      'Integrated Oil',               // 综合油企
      'Offshore Driller',             // 海上钻井
    ],

    // ========== S&P 600 Small-Cap Sub-Industry Chains ==========

    // 鞋类零售 → 消费者/品牌
    'Footwear Retail': [
      'Footwear',                     // 鞋类品牌供应
      'Mass Retail',                  // 零售竞争
      'Athletic Apparel',             // 运动鞋关联
    ],

    // 次贷消费金融 → 金融服务
    'Subprime Consumer Finance': [
      'Consumer Finance',             // 消费金融同行
      'Regional Bank',                // 银行竞争
    ],

    // 泳池用品零售 → 消费者(泳池屋主)
    'Pool Supplies Retail': [
      'Homebuilder',                  // 新建泳池需求
      'Building Products',            // 建筑/泳池用品
    ],

    // 健身加盟 → 消费者/房产
    'Fitness Franchise': [
      'Retail REIT',                  // 商业物业租户
      'Athleisure',                   // 运动休闲关联
    ],

    // 精品健身 → 消费者/房产
    'Boutique Fitness': [
      'Retail REIT',                  // 商业物业租户
      'Athleisure',                   // 运动休闲关联
    ],

    // 眼镜零售 → 医疗/消费
    'Eyewear Retail': [
      'Medical Devices',              // 镜片/隐形眼镜供应
      'Mass Retail',                  // 零售竞争
    ],

    // NASH药物 → 制药/肝脏疾病
    'NASH Therapy': [
      'Big Pharma',                   // 药企合作/竞争
      'Pharma Distributor',           // 分销渠道
      'Specialty Pharma',             // 特药竞争
    ],

    // 基因治疗 → 生物科技
    'Gene Therapy': [
      'Big Pharma',                   // 授权合作
      'Emerging Biotech',             // 生物技术同行
      'Life Sciences Tools',          // 研发工具
    ],

    // 配电设备 → 电力/工业
    'Power Distribution Equipment': [
      'Electrical Equipment',         // 电气设备同行
      'E&C Contractor',               // 工程承包客户
      'Industrial REIT',              // 工业设施用电
    ],

    // 商用厨房设备 → 餐饮/食品
    'Commercial Kitchen Equipment': [
      'Casual Dining',                // 餐饮客户
      'Quick Service Restaurant',     // 快餐客户
      'Food Distribution',            // 食品加工客户
    ],

    // 液压工具 → 工业/建筑
    'Hydraulic Tools': [
      'Construction Equipment',       // 建筑设备
      'E&C Contractor',               // 工程承包
      'Integrated Steel',             // 重工业客户
    ],

    // 在线贷款市场 → 金融/消费
    'Online Lending Marketplace': [
      'Regional Bank',                // 银行放贷方
      'Mortgage REIT',                // 抵押贷款
      'Consumer Finance',             // 消费金融
    ],

    // 典当/消费金融 → 金融/零售
    'Pawn/Consumer Finance': [
      'Consumer Finance',             // 消费金融同行
      'Discount Retail',              // 二手商品零售
    ],

    // 冷链货运 → 食品/物流
    'Temperature-Controlled Trucking': [
      'Food Distribution',            // 食品分销客户
      'Packaged Foods',               // 食品生产客户
      'Grocery Retail',               // 杂货零售
    ],

    // 加急货运 → 物流/零售
    'Expedited Freight': [
      'LTL Trucking',                 // LTL货运同行
      'Express Logistics',            // 快递物流
      'Internet Retail',              // 电商客户
    ],

    // 特种化学品分销 → 化工/工业
    'Specialty Chemical Distribution': [
      'Specialty Chemicals',          // 化学品供应
      'Water Treatment',              // 水处理客户
      'Industrial Gases',             // 工业气体同行
    ],

    // 工业流体 → 金属加工/制造
    'Industrial Fluids': [
      'Integrated Steel',             // 钢铁加工客户
      'Auto Parts',                   // 汽车制造客户
      'Construction Equipment',       // 重型设备客户
    ],

    // 炭黑 → 轮胎/橡胶
    'Carbon Black': [
      'Auto Parts',                   // 轮胎/汽车配件
      'Specialty Chemicals',          // 特种化学品同行
      'Commodity Chemicals',          // 大宗化工同行
    ],

    // 特种配料 → 食品/营养/动物
    'Specialty Ingredients': [
      'Packaged Foods',               // 食品客户
      'Animal Health',                // 动物健康客户
      'Specialty Chemicals',          // 化学品同行
    ],

    // ========== 保险产业链 ==========
    // 房屋保险 → 房地产相关
    'Homeowners Insurance': [
      'Master Planned Communities',   // 房屋社区客户
    ],

    // ========== 博彩/娱乐产业链 ==========
    'Casino/Tavern Gaming': [
      'Resorts & Casinos',            // 赌场同行
    ],

    'Horse Racing/Gaming': [
      'Resorts & Casinos',            // 赌场同行
    ],

    // ========== 广告科技产业链 ==========
    // 广告验证 → 广告平台
    'Ad Verification': [
      'Marketing Data Platform',      // 营销平台下游
    ],

    // 营销数据平台 → 广告投放
    'Marketing Data Platform': [
      'Advertising Agencies',         // 广告代理客户
    ],

    // 汽车市场平台 → 经销商
    'Auto Marketplace': [
      'Auto & Truck Dealerships',     // 汽车经销商
    ],

    // ========== 房车产业链 ==========
    // 零部件 → 制造 → 零售
    'RV Components': [
      'RV Manufacturing',             // 房车制造商
    ],

    'RV Manufacturing': [
      'RV Retail',                    // 房车零售商
    ],

    'RV Retail': [],                  // 终端消费

    // 高性能悬挂 → 户外/汽车
    'Performance Suspension': [
      'RV Manufacturing',             // 房车制造
      'Auto - Manufacturers',         // 汽车制造
    ],

    // ========== 汽车配件产业链 ==========
    'Auto Parts Remanufacturing': [
      'Alternative Auto Parts',       // 替代配件分销
    ],

    'Alternative Auto Parts': [
      'Auto & Truck Dealerships',     // 汽车经销商
    ],

    // ========== 食品产业链 ==========
    'Nut Processing': [
      'Packaged Foods',               // 包装食品
      'Salty Snacks',                 // 零食客户
    ],

    'Salty Snacks': [],               // 终端消费

    'Natural Foods': [],              // 终端消费

    // ========== 医疗服务产业链 ==========
    'Hospice Care': [],               // 终端患者

    'Long-term Care': [
      'Home Health Services',         // 居家护理转介
    ],

    'Home Health Services': [],       // 终端患者

    // ========== 房地产服务产业链 ==========
    'Commercial RE Services': [
      'REIT Management',              // REIT管理
    ],

    'REIT Management': [],            // 终端REIT

    'Master Planned Communities': [], // 终端购房者

    // ========== 教育产业链 ==========
    'Online K-12': [],                // 终端学生

    'Healthcare Education': [
      'Hospice Care',                 // 医疗服务人才输送
      'Long-term Care',               // 护理人才输送
      'Home Health Services',         // 家庭护理人才输送
    ],

    // ========== 人力资源产业链 ==========
    'Staffing/Workforce': [],         // 终端企业客户

    // ========== 环保产业链 ==========
    'Environmental Consulting': [],   // 终端企业/政府客户

    // ========== SaaS产业链 ==========
    'Customer Service SaaS': [],      // 终端企业客户

    // ========== 新增29只子行业链 (Gene Editing/Biotech/FinTech/Infra等) ==========

    // 基因编辑/生物技术产业链
    // 合成生物工具 → 基因编辑 → AI药物发现 (工具→疗法→应用)
    'Synthetic Biology': [
      'Gene Editing',                  // DNA合成工具供应基因编辑
      'AI Drug Discovery',             // 合成生物学数据用于AI药物发现
    ],

    'Gene Editing': [],                // 终端疗法 (患者)

    'AI Drug Discovery': [],           // 终端制药合作 (药企)

    // 氢能产业链
    'Hydrogen Fuel Cell': [],          // 终端工业/运输客户

    // 金融科技产业链
    'AI Lending': [],                  // 终端银行/借贷机构

    'Digital Remittance': [],          // 终端消费者(汇款人)

    'Cross-border Payments': [],       // 终端自由职业者/企业

    // 软件/分析产业链
    'CX Analytics': [],                // 终端企业客户

    'Government Software': [],         // 终端政府机构

    'Property Management SaaS': [],    // 终端物业管理公司

    // 银行/金融SaaS产业链
    'Digital Banking SaaS': [],        // 终端社区银行/信用社

    'HSA Platform': [],                // 终端雇主/消费者

    // 基础设施/建筑产业链
    // 建材/骨料 → 筑路设备 → 公路/基础设施建设 (材料→设备→施工)
    'Construction Materials/Aggregates': [
      'Highway Construction',          // 骨料供应公路建设
      'Infrastructure Construction',   // 骨料供应基础设施建设
    ],

    'Road Building Equipment': [
      'Highway Construction',          // 筑路设备供应公路建设
      'Infrastructure Construction',   // 设备供应基础设施建设
    ],

    'Architectural Glass': [
      'E-Infrastructure',             // 建筑玻璃供应电子基础设施
      'Infrastructure Construction',   // 建筑玻璃供应建筑
    ],

    'Wood/Composite Products': [
      'E-Infrastructure',             // 木材供应建筑
      'Infrastructure Construction',   // 木材供应基础设施
    ],

    'Highway Construction': [],        // 终端政府/出行者

    'Infrastructure Construction': [], // 终端工业/公用事业客户

    'E-Infrastructure': [],            // 终端数据中心/商业客户

    'Marine Dredging': [],             // 终端政府/港口客户

    // 生命科学诊断产业链
    'Proteomics Tools': [
      'Transplant Diagnostics',        // 蛋白质组学工具用于移植诊断
      'Genetic Testing',               // 蛋白质组学工具辅助基因检测
    ],

    'Transplant Diagnostics': [],      // 终端移植中心/医院

    // 殡葬/纪念产业链
    'Memorialization': [],             // 终端殡仪馆/墓地

    // 农业产业链
    'Ag Supply Chain': [],             // 终端农场/食品加工

    // 数字基础设施产业链
    'Digital Infrastructure Investment': [],  // 终端数字经济客户

    // 工业拍卖产业链
    'Industrial Auctions': [],         // 终端设备买卖方

    // 产权保险产业链
    'Title Insurance': ['Regional Bank', 'Real Estate Services', 'Mortgage Lender'],

    // 仓储会员店产业链
    'Warehouse Club': ['Packaged Food', 'Consumer Staples', 'Mass Retail'],

    // 体育用品零售产业链
    'Sporting Goods Retail': ['Athletic Footwear', 'Outdoor Equipment', 'Apparel Manufacturing'],

    // 电子商务产业链
    'E-commerce': ['Payments', 'Logistics', 'Packaged Food', 'Consumer Electronics'],

    // 广告验证产业链
    'AdTech Verification': ['AdTech DSP', 'Digital Advertising', 'Enterprise SaaS'],

    // 广告供给侧平台产业链
    'AdTech SSP': ['AdTech DSP', 'Digital Advertising', 'AdTech Verification'],

    // 广告平台产业链
    'AdTech Platform': ['AdTech DSP', 'AdTech SSP', 'Digital Advertising'],

    // 环境修复产业链
    'Environmental Remediation': ['Environmental Services', 'Construction & Engineering', 'Waste Management'],

    // 专业服务产业链
    'Professional Services': ['Enterprise SaaS', 'Government Software', 'Management Consulting'],

    // 教育服务产业链
    'Education Services': ['Online K-12', 'For-Profit Education', 'Healthcare Education'],

    // 贵金属流媒体产业链
    'Precious Metals Streaming': ['Gold Mining', 'Silver Mining', 'Specialty Metals'],

    // 数据基础设施产业链
    'Data Infrastructure': ['Cloud Computing', 'Enterprise SaaS', 'Digital Infrastructure Investment'],

    // 快餐产业链
    'Quick Service Restaurant': ['Packaged Food', 'Food Distribution', 'Restaurant Tech'],

    // 家庭安防产业链
    'Home Security': ['Smart Home', 'IoT Platform', 'Alarm Monitoring'],

    // 托幼服务产业链
    'Childcare Services': ['Education Services', 'Real Estate Services', 'Staffing/Workforce'],

    // 电影院产业链
    'Movie Theater': ['Entertainment', 'Cinema Technology', 'Content Streaming'],

    // 家居装饰产业链
    'Home Furnishing': ['Residential Construction', 'Home Furnishings', 'Mass Retail'],

    // 超级应用产业链
    'Super App': ['Payments', 'E-commerce', 'Digital Advertising'],

    // 影院技术产业链
    'Cinema Technology': ['Movie Theater', 'Entertainment', 'Display Technology'],

    // 电脑外设产业链
    'Computer Peripherals': ['Consumer Electronics', 'Enterprise Hardware', 'Semiconductor'],

    // 奢侈品集团产业链
    'Luxury Conglomerate': ['Fashion Brand', 'Prestige Beauty', 'Luxury Goods'],

    // 显示材料产业链
    'Display Materials': ['Consumer Electronics', 'Display Technology', 'Semiconductor'],

    // 家庭舒适产业链
    'Home Comfort': ['HVAC & Refrigeration', 'Building Products', 'Residential Construction'],

    // 医学美容产业链
    'Medical Aesthetics': ['Medical Devices', 'Prestige Beauty', 'Dermatology'],

    // 住宅建设产业链
    'Homebuilders': ['Building Products', 'Residential Construction', 'Regional Bank'],

    // 家用电器产业链
    'Home Appliances': ['Consumer Electronics', 'Residential Construction', 'Mass Retail'],

    // 健康补充剂产业链
    'Health Supplements': ['Packaged Food', 'Specialty Retail', 'Direct Selling'],

    // ========== 新增子行业链 ==========

    // 汽车涂料产业链
    'Automotive Coatings': ['Auto - Manufacturers', 'Auto Parts', 'Body Shop'],

    // 粘合剂/密封剂产业链
    'Adhesives & Sealants': ['Building Products', 'Packaging', 'Consumer Electronics'],

    // 电子化学品产业链
    'Electronics Chemicals': ['Semiconductor Foundry', 'PCB Manufacturing', 'Consumer Electronics'],

    // 医疗IT/EHR产业链
    'Healthcare IT/EHR': ['Hospital', 'Ambulatory Care', 'Medical Practice'],

    // 医疗GPO产业链
    'Healthcare GPO': ['Hospital', 'Medical Devices', 'Pharmaceutical'],

    // 医疗分析产业链
    'Healthcare Analytics': ['Hospital', 'Health Insurance', 'Pharmaceutical'],

    // 患者入院技术产业链
    'Patient Intake Tech': ['Hospital', 'Ambulatory Care', 'Medical Practice'],

    // 珠宝零售产业链
    'Jewelry Retail': ['Luxury Goods', 'Specialty Retail', 'Consumer Discretionary'],

    // 汽车服务产业链
    'Auto Service': ['Auto Parts', 'Tire Manufacturing', 'Consumer Services'],

    // 内衣零售产业链
    'Lingerie Retail': ['Apparel Manufacturing', 'Specialty Retail', 'E-commerce'],

    // 战术无人机产业链
    'Tactical Drones': ['Defense Electronics', 'Military', 'Aerospace Components'],

    // 国防计算产业链
    'Defense Computing': ['Defense Electronics', 'Military', 'Signal Processing'],

    // 人机界面半导体产业链
    'Human Interface Semi': ['Consumer Electronics', 'IoT Platform', 'Auto - Manufacturers'],

    // MEMS时钟产业链
    'MEMS Timing': ['Consumer Electronics', 'Telecom Equipment', 'Aerospace Components'],

    // 血液管理产业链
    'Blood Management': ['Hospital', 'Blood Bank', 'Surgical Services'],

    // 肿瘤药物产业链
    'Oncology Drug': ['Hospital', 'Oncology Center', 'Pharmaceutical'],

    // 罕见病疗法产业链
    'Rare Disease Therapy': ['Hospital', 'Specialty Pharmacy', 'Pharmaceutical'],

    // 船舶产品产业链
    'Marine Products': ['Boat Retail', 'Marina', 'Recreation'],

    // 船舶零售产业链
    'Boat Retail': ['Marina', 'Consumer Services', 'Recreation'],

    // CX商业服务产业链
    'CX Business Services': ['Enterprise SaaS', 'Customer Management', 'Digital Advertising'],

    // 特种P&C保险产业链
    'Specialty P&C Insurance': ['Commercial Insurance', 'Personal Lines', 'Reinsurance'],

    // 多元化保险产业链
    'Diversified Insurance': ['Commercial Insurance', 'Title Insurance', 'Reinsurance'],

    // P&C保险产业链
    'P&C Insurance': ['Commercial Insurance', 'Personal Lines', 'Reinsurance'],

    // 区域赌场产业链
    'Regional Casino': ['Entertainment', 'Hospitality', 'Consumer Services'],

    // 多元化工业产业链
    'Diversified Industrial': ['Electronics', 'Engraving', 'Engineering Technology'],

    // 芯片架构/IP授权产业链
    'Chip Architecture/IP': ['Fabless Chips', 'Semiconductor Foundry', 'Consumer Electronics', 'Server Hardware'],

    // 生鲜配送平台产业链
    'Grocery Delivery Platform': ['Grocery Retail', 'Consumer Services', 'Digital Advertising'],

    // 高端鞋履产业链
    'Premium Footwear': ['Specialty Retail', 'Department Store', 'Consumer Services'],

    // 拉美电商产业链
    'LatAm E-commerce': ['Consumer Services', 'Digital Advertising', 'Fintech', 'Logistics'],

    // 东南亚平台产业链
    'SE Asia Platform': ['Consumer Services', 'Digital Advertising', 'Gaming', 'Fintech'],

    // 中国电商产业链
    'Chinese E-commerce': ['Consumer Services', 'Digital Advertising', 'Logistics', 'Cloud Computing'],

    // 中国搜索/AI产业链
    'Chinese Search/AI': ['Digital Advertising', 'Cloud Computing', 'Autonomous Driving', 'AI Services'],

    // 中国肿瘤生物科技产业链
    'Chinese Oncology': ['Hospital', 'Oncology Center', 'Pharmaceutical', 'Clinical Trials'],

    // eVTOL空中出租车产业链
    'eVTOL': ['Urban Air Mobility', 'Aviation Services', 'Consumer Services'],

    // 高端电动汽车产业链
    'Premium EV': ['Auto Dealer', 'EV Charging', 'Consumer Services', 'Auto - Manufacturers'],

    // 综合钢铁产业链
    'Integrated Steel': ['Construction Chain', 'Auto - Manufacturers', 'Industrial Chain', 'Infrastructure'],

    // 铁矿石矿业产业链
    'Iron Ore Mining': ['Integrated Steel', 'Construction Chain', 'Industrial Chain'],

    // 多元化矿业产业链
    'Diversified Mining': ['Integrated Steel', 'Construction Chain', 'EV Chain', 'Industrial Chain'],

    // LNG出口产业链
    'LNG Export': ['Utilities', 'Industrial Chain', 'Power Generation', 'Petrochemical'],

    // ========== 补充子行业链定义 (提升图连通性) ==========
    'AI Services': ['Cloud Computing', 'Enterprise SaaS', 'Semiconductor'],
    'Aerospace Components': ['Aerospace & Defense', 'Aviation Services', 'Military'],
    'Alarm Monitoring': ['Home Security', 'Smart Home', 'Telecom Equipment'],
    'Ambulatory Care': ['Medical Devices', 'Pharmaceutical', 'Health Insurance'],
    'Apparel Manufacturing': ['Specialty Retail', 'E-commerce', 'Fashion Brand'],
    'Auto - Manufacturers': ['Auto Parts', 'Semiconductor', 'EV Chain'],
    'Auto Parts': ['Auto - Manufacturers', 'Body Shop', 'Auto Parts Distribution'],
    'Autonomous Driving': ['Semiconductor', 'AI Services', 'Auto - Manufacturers'],
    'Aviation Services': ['Aerospace Components', 'Military', 'Logistics'],
    'Blood Bank': ['Medical Devices', 'Ambulatory Care', 'Pharmaceutical'],
    'Body Shop': ['Auto Parts', 'Auto - Manufacturers', 'P&C Insurance'],
    'Clinical Trials': ['Pharmaceutical', 'Biotechnology', 'Medical Devices'],
    'Cloud Computing': ['Enterprise SaaS', 'AI Services', 'Semiconductor'],
    'Commercial Insurance': ['P&C Insurance', 'Regional Bank', 'Construction & Engineering'],
    'Construction & Engineering': ['Building Products', 'Construction Materials', 'Infrastructure'],
    'Construction Chain': ['Building Products', 'Residential Construction', 'Construction & Engineering'],
    'Consumer Discretionary': ['Specialty Retail', 'Restaurants', 'Entertainment'],
    'Consumer Services': ['Consumer Discretionary', 'Specialty Retail', 'Entertainment'],
    'Consumer Staples': ['Packaged Food', 'Grocery Retail', 'Specialty Retail'],
    'Content Streaming': ['Entertainment', 'Digital Advertising', 'Cloud Computing'],
    'Customer Management': ['Enterprise SaaS', 'AI Services', 'CX Business Services'],
    'Dermatology': ['Medical Devices', 'Pharmaceutical', 'Medical Aesthetics'],
    'Digital Advertising': ['AdTech DSP', 'Content Streaming', 'E-commerce'],
    'Direct Selling': ['Consumer Staples', 'Health Supplements', 'Packaged Food'],
    'Display Technology': ['Consumer Electronics', 'Semiconductor', 'Display Materials'],
    'EV Chain': ['Auto - Manufacturers', 'EV Battery', 'Semiconductor'],
    'Electronics': ['Semiconductor', 'Consumer Electronics', 'PCB Manufacturing'],
    'Engineering Technology': ['AI Services', 'Enterprise SaaS', 'Infrastructure'],
    'Engraving': ['Memorialization', 'Specialty Industrial', 'Consumer Services'],
    'Enterprise Hardware': ['Semiconductor', 'Cloud Computing', 'Electronics'],
    'Entertainment': ['Content Streaming', 'Gaming', 'Digital Advertising'],
    'Fintech': ['Payments', 'Regional Bank', 'Enterprise SaaS'],
    'Gaming': ['Semiconductor', 'Entertainment', 'Content Streaming'],
    'Grocery Retail': ['Packaged Food', 'Food Distribution', 'Consumer Staples'],
    'Hospitality': ['Restaurants', 'Entertainment', 'Real Estate Services'],
    'Industrial Chain': ['Specialty Industrial', 'Building Products', 'Construction & Engineering'],
    'Infrastructure': ['Construction & Engineering', 'Utilities', 'Power Generation'],
    'IoT Platform': ['Semiconductor', 'Cloud Computing', 'Smart Home'],
    'Logistics': ['Trucking', 'Aviation Services', 'E-commerce'],
    'Luxury Goods': ['Fashion Brand', 'Specialty Retail', 'Luxury Conglomerate'],
    'Marina': ['Marine Products', 'Boat Retail', 'Recreation'],
    'Medical Practice': ['Medical Devices', 'Pharmaceutical', 'Health Insurance'],
    'Military': ['Aerospace & Defense', 'Defense Electronics', 'Tactical Drones'],
    'Oncology Center': ['Medical Devices', 'Pharmaceutical', 'Clinical Trials'],
    'PCB Manufacturing': ['Semiconductor', 'Electronics', 'Consumer Electronics'],
    'Packaged Food': ['Grocery Retail', 'Food Distribution', 'Consumer Staples'],
    'Payments': ['Fintech', 'Regional Bank', 'E-commerce'],
    'Personal Lines': ['P&C Insurance', 'Auto Insurance', 'Homeowners Insurance'],
    'Petrochemical': ['Specialty Chemicals', 'Commodity Chemicals', 'Oil Refinery'],
    'Pharmaceutical': ['Clinical Trials', 'Medical Practice', 'Specialty Pharmacy'],
    'Power Generation': ['Utilities', 'Infrastructure', 'Regulated Utility'],
    'Recreation': ['Marine Products', 'Outdoor Equipment', 'Entertainment'],
    'Residential Construction': ['Building Products', 'Homebuilders', 'Regional Bank'],
    'Semiconductor': ['Electronics', 'Consumer Electronics', 'Cloud Computing'],
    'Signal Processing': ['Semiconductor', 'Telecom Equipment', 'Electronics'],
    'Silver Mining': ['Precious Metals Streaming', 'Specialty Metals', 'Electronics'],
    'Specialty Pharmacy': ['Pharmaceutical', 'Health Insurance', 'Packaged Food'],
    'Specialty Retail': ['E-commerce', 'Consumer Discretionary', 'Logistics'],
    'Surgical Services': ['Medical Devices', 'Ambulatory Care', 'Pharmaceutical'],
    'Telecom Equipment': ['Semiconductor', 'Cloud Computing', 'Electronics'],
    'Tire Manufacturing': ['Auto Parts', 'Auto - Manufacturers', 'Specialty Chemicals'],
    'Urban Air Mobility': ['Aerospace Components', 'EV Chain', 'Aviation Services'],
    'Utilities': ['Power Generation', 'Infrastructure', 'Regulated Utility'],
    'Waste Management': ['Environmental Services', 'Construction & Engineering', 'Infrastructure'],

    // ========== 补充子行业链 - 2026-01 第八批 (20只新股票) ==========

    // 癫痫生物科技 → 制药/医院
    'Epilepsy Biotech': [
      'Big Pharma',                   // 授权合作
      'Hospital Operator',            // 处方渠道
      'Health Insurance',             // 保险报销
    ],

    // 罕见肿瘤生物科技 → 制药/医院
    'Rare Tumor Biotech': [
      'Big Pharma',                   // 授权合作
      'Hospital Operator',            // 肿瘤中心
      'Health Insurance',             // 保险报销
    ],

    // 蛋白降解 → 生物科技/制药
    'Protein Degradation': [
      'Big Pharma',                   // 授权合作
      'Large Biotech',                // 生物科技客户
      'Emerging Biotech',             // 新兴生物科技
    ],

    // 赌场REIT → 博彩运营商
    'Casino REIT': [
      'Casino & Resort',              // 赌场运营商租户
      'Hotel Chain',                  // 酒店配套
    ],

    // 医院REIT → 医疗运营商
    'Hospital REIT': [
      'Hospital Operator',            // 医院运营商租户
      'Health Insurance',             // 保险支付方
    ],

    // 老年住宅REIT → 医疗/养老
    'Senior Housing REIT': [
      'Long-term Care',               // 护理运营商租户
      'Home Health Services',         // 居家护理转介
      'Health Insurance',             // 保险支付方
    ],

    // 医疗REIT → 生命科学/医疗
    'Healthcare REIT': [
      'Large Pharma',                 // 生命科学研发租户
      'Large Biotech',                // 生物科技研发租户
      'Hospital Operator',            // 门诊设施租户
    ],

    // 便利店/加油 → 燃油/食品
    'Convenience Store/Fuel': [
      'Oil Refinery',                 // 燃油供应
      'Soft Drinks',                  // 饮料供应
      'Food Distribution',            // 食品配送
    ],

    // 校车制造 → 教育/政府
    'School Bus Manufacturing': [
      'Education Services',           // 学校客户
      'EV Battery',                   // 电动校车电池
    ],

    // 天然气E&P → 中下游(已有定义，此处为覆盖确认)
    // 'Natural Gas E&P' already defined above

    // BaaS银行 → 金融科技/支付
    'Banking-as-a-Service': [
      'Fintech',                      // 金融科技合作方
      'Payment Processor',            // 支付处理合作
      'Digital Bank',                 // 数字银行客户
    ],

    // 心理健康服务 → 保险/医院
    'Mental Health Services': [
      'Health Insurance',             // 保险支付方
      'Hospital Operator',            // 医院转介
      'Telehealth',                   // 远程问诊
    ],

    // 家庭输液服务 → 医院/药品
    'Home Infusion': [
      'Hospital Operator',            // 医院出院转介
      'Big Pharma',                   // 药品供应
      'Health Insurance',             // 保险支付方
    ],

    // 急性期后护理 → 医院/保险
    'Post-Acute Care': [
      'Hospital Operator',            // 医院出院转介
      'Health Insurance',             // 保险支付方
      'Home Health Services',         // 居家护理竞争/转介
    ],

    // 科技健康险 → 医疗支付
    'Health Insurance Tech': [
      'Hospital Operator',            // 支付医院费用
      'Pharmacy Retail',              // 处方药覆盖
      'Digital Health',               // 远程医疗合作
      'Telehealth',                   // 虚拟问诊
    ],
  },
};

// ============================================================
// 辅助函数
// ============================================================

/**
 * 获取行业的上游行业列表
 */
export function getUpstreamIndustries(industry: string): string[] {
  const upstreams: string[] = [];

  for (const [upstream, downstreams] of Object.entries(INDUSTRY_CHAIN_CONFIG.upstreamToDownstream)) {
    if (downstreams.includes(industry)) {
      upstreams.push(upstream);
    }
  }

  return upstreams;
}

/**
 * 获取行业的下游行业列表
 */
export function getDownstreamIndustries(industry: string): string[] {
  return INDUSTRY_CHAIN_CONFIG.upstreamToDownstream[industry] || [];
}

/**
 * 获取行业所属的产业链组
 */
export function getIndustryGroup(industry: string): string | null {
  for (const [group, industries] of Object.entries(INDUSTRY_CHAIN_CONFIG.industryGroups)) {
    if (industries.includes(industry)) {
      return group;
    }
  }
  return null;
}

/**
 * 判断两个行业是否在同一产业链
 */
export function areInSameChain(industryA: string, industryB: string): boolean {
  for (const industries of Object.values(INDUSTRY_CHAIN_CONFIG.industryGroups)) {
    if (industries.includes(industryA) && industries.includes(industryB)) {
      return true;
    }
  }
  return false;
}

/**
 * 获取两个行业的关系类型
 */
export function getIndustryRelation(
  industryA: string,
  industryB: string
): 'upstream' | 'downstream' | 'complementary' | 'same_chain' | null {
  const aDownstreams = getDownstreamIndustries(industryA);
  if (aDownstreams.includes(industryB)) {
    return 'upstream';
  }

  const bDownstreams = getDownstreamIndustries(industryB);
  if (bDownstreams.includes(industryA)) {
    return 'downstream';
  }

  const aComplementary = INDUSTRY_CHAIN_CONFIG.complementary[industryA] || [];
  const bComplementary = INDUSTRY_CHAIN_CONFIG.complementary[industryB] || [];
  if (aComplementary.includes(industryB) || bComplementary.includes(industryA)) {
    return 'complementary';
  }

  if (areInSameChain(industryA, industryB)) {
    return 'same_chain';
  }

  return null;
}

/**
 * 获取公司的子行业分类 (如果有覆盖)
 */
export function getSubIndustry(symbol: string): string | null {
  return INDUSTRY_CHAIN_CONFIG.subIndustryOverrides[symbol] || null;
}

/**
 * 获取子行业的下游
 */
export function getSubIndustryDownstreams(subIndustry: string): string[] {
  return INDUSTRY_CHAIN_CONFIG.subIndustryChains[subIndustry] || [];
}

/**
 * 检查两个公司的子行业关系 (基于symbol)
 */
export function getSubIndustryRelation(
  symbolA: string,
  symbolB: string
): 'upstream' | 'downstream' | null {
  const subA = getSubIndustry(symbolA);
  const subB = getSubIndustry(symbolB);

  if (!subA && !subB) return null;

  // A是B的上游
  if (subA) {
    const downstreams = getSubIndustryDownstreams(subA);
    if (subB && downstreams.includes(subB)) {
      return 'upstream';
    }
  }

  // B是A的上游
  if (subB) {
    const downstreams = getSubIndustryDownstreams(subB);
    if (subA && downstreams.includes(subA)) {
      return 'downstream';
    }
  }

  return null;
}

/**
 * 获取统计信息
 */
export function getConfigStats(): {
  totalSymbols: number;
  subIndustryCount: number;
  chainCount: number;
} {
  const symbols = Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides);
  const subIndustries = new Set(Object.values(INDUSTRY_CHAIN_CONFIG.subIndustryOverrides));
  const chains = Object.keys(INDUSTRY_CHAIN_CONFIG.subIndustryChains);

  return {
    totalSymbols: symbols.length,
    subIndustryCount: subIndustries.size,
    chainCount: chains.length,
  };
}

export default INDUSTRY_CHAIN_CONFIG;
