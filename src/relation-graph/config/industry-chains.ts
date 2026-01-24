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

    // Clean Energy / Hydrogen / Alt Fuel
    'PLUG': 'Hydrogen Fuel Cell',              // Plug Power - 氢燃料电池
    'BE': 'Fuel Cell Power',                   // Bloom Energy - 固体氧化物燃料电池
    'CLNE': 'RNG/CNG Fueling',                // Clean Energy Fuels - 可再生天然气加注

    // LNG Export
    'NEXT': 'LNG Export',                      // NextDecade - LNG出口/液化

    // Nuclear Energy (Advanced/SMR)
    'NNE': 'Advanced Nuclear',                 // Nano Nuclear - 微型核反应堆
    'OKLO': 'Advanced Nuclear',                // Oklo - 先进核能/快堆
    'SMR': 'Advanced Nuclear',                 // NuScale Power - 小型模块化反应堆
    'LEU': 'Uranium Enrichment',               // Centrus Energy - 铀浓缩/HALEU
    'UUUU': 'Uranium Mining',                  // Energy Fuels - 铀矿/稀土

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

    // Dental/Medical Distribution
    'HSIC': 'Dental Distribution',             // Henry Schein - 牙科/医疗分销
    'PDCO': 'Veterinary Distribution',         // Patterson Companies - 牙科/兽医分销

    // Gaming/Payments Technology
    'EVERI': 'Gaming Technology',              // Everi Holdings - 游戏技术/支付
    'CXT': 'Payment Sensors',                  // Crane NXT - 支付技术/传感器

    // Media/Sports/Entertainment
    'ATUS': 'Cable/Broadband',                 // Altice USA - 有线/宽带
    'MSGS': 'Pro Sports',                      // MSG Sports - 职业体育队/场馆
    'MSGE': 'Entertainment Venues',            // MSG Entertainment - 娱乐场馆

    // Specialty Manufacturing
    'TRS': 'Specialty Containers',             // TriMas Corp - 特种容器/包装
    'TNET': 'HR/PEO Services',                // TriNet Group - HR/PEO服务
    'NSIT': 'IT Solutions',                    // Insight Enterprises - IT解决方案/分销
    'PLAB': 'Photomasks',                      // Photronics - 半导体光掩模

    // Consumer Products
    'HELE': 'Consumer Housewares',             // Helen of Troy - 消费品/家居用品
    'IPAR': 'Prestige Fragrances',             // Inter Parfums - 高端香水
    'VITL': 'Pasture-Raised Food',             // Vital Farms - 牧场鸡蛋/黄油

    // Specialty Food
    'CHEF': 'Specialty Food Distribution',     // Chef's Warehouse - 特种食品分销

    // Hotel REITs
    'RLJ': 'Select-Service Hotel',             // RLJ Lodging Trust - 精选服务酒店REIT
    'SHO': 'Upper-Upscale Hotel',              // Sunstone Hotel - 高端全服务酒店REIT
    'PEB': 'Lifestyle Hotel',                  // Pebblebrook Hotel - 生活方式酒店REIT
    'RHP': 'Entertainment Venue REIT',         // Ryman Hospitality - 娱乐场馆REIT
    'APLE': 'Select-Service Hotel',            // Apple Hospitality REIT - 精选服务酒店REIT

    // Power/Energy
    'GEV': 'Power Equipment/Grid',             // GE Vernova - 电力设备/电网解决方案
    'TLN': 'Nuclear Power Generation',         // Talen Energy - 核电/发电

    // Utilities
    'PCG': 'Regulated Utility',                // PG&E Corp - 受管制公用事业
    'EIX': 'Regulated Utility',                // Edison International - 受管制公用事业

    // Telecom/Networking
    'FYBR': 'Fiber Broadband',                 // Frontier Communications - 光纤宽带
    'BDC': 'Networking Infrastructure',        // Belden Inc - 网络基础设施

    // Technology
    'AI': 'Enterprise AI Platform',            // C3.ai - 企业AI平台
    'PURE': 'All-Flash Storage',               // Pure Storage - 全闪存数据存储

    // Healthcare
    'GMED': 'Spine Surgery Robotics',          // Globus Medical - 脊柱手术机器人
    'MMSI': 'Interventional Devices',          // Merit Medical - 介入医疗器械

    // Mobility/Industrial
    'VNT': 'Mobility Technology',              // Vontier Corp - 出行科技/燃油

    // Cannabis/Beverage
    'TLRY': 'Cannabis/Craft Beer',             // Tilray Brands - 大麻/精酿啤酒

    // Business Services
    'G': 'Digital Operations',                 // Genpact - 数字运营/BPO

    // ========== 新增14只股票 (2026-01 batch) ==========

    // Medical Devices
    'RMD': 'CPAP/Respiratory Devices',         // ResMed - CPAP/呼吸机医疗设备

    // Biotech
    'ARGX': 'FcRn Antibody Biotech',           // argenx - FcRn抗体生物科技

    // Waste Management
    'WCN': 'Waste Collection/Disposal',        // Waste Connections - 废物收集/处理

    // Building Materials
    'CRH': 'Cement/Aggregates',                // CRH plc - 水泥/骨料建材

    // E-commerce
    'CPNG': 'Korean E-commerce',               // Coupang - 韩国电商

    // Music/Entertainment
    'WMG': 'Music Labels/Publishing',          // Warner Music - 音乐厂牌/版权

    // Aerospace Components
    'MOG.A': 'Flight Control Systems',         // Moog Inc - 飞行控制系统

    // Genetic Testing
    'FLGT': 'Genetic Testing Services',        // Fulgent Genetics - 基因检测

    // Simulation Software
    'ALTR': 'Simulation/CAE Software',         // Altair Engineering - 仿真/CAE软件

    // Banking SaaS
    'QTWO': 'Digital Banking Platform',        // Q2 Holdings - 数字银行平台

    // Flooring
    'TILE': 'Modular Flooring',                // Interface - 模块地板

    // DTC Brands
    'DTC': 'DTC Outdoor Brands',               // Solo Brands - DTC户外品牌

    // BPO
    'TASK': 'Digital BPO Services',            // TaskUs - 数字BPO服务

    // Mortgage Servicing
    'COOP': 'Mortgage Servicing',              // Mr. Cooper - 抵押贷款服务

    // Oil Gathering Midstream
    'HESM': 'Oil Gathering Midstream',         // Hess Midstream - 油气集输

    // Specialty Foods
    'LANC': 'Specialty Foods',                 // Lancaster Colony - 特色食品/酱料

    // Russell 2000 Small-Caps Batch (biotech/pharma)
    'ARQT': 'Immuno-Oncology',                  // Arcus Biosciences - 免疫肿瘤
    'FATE': 'Cell Therapy',                      // Fate Therapeutics - 细胞治疗

    // Russell 2000 Small-Caps Batch (semiconductor)
    'INDI': 'Automotive Chips',                  // Indie Semiconductor - 汽车芯片
    'SLAB': 'IoT Chips',                         // Silicon Labs - IoT无线芯片
    'AOSL': 'Power Semis',                       // Alpha & Omega Semi - 功率MOSFET

    // Russell 2000 Small-Caps Batch (industrial)
    'WAB': 'Rail Equipment',                     // Wabtec - 铁路设备/机车
    'SWX': 'Gas Utility',                        // Southwest Gas - 天然气公用事业

    // Russell 2000 Small-Caps Batch (consumer/retail)
    'PLBY': 'Lifestyle Brands',                  // PLBY Group - 生活方式品牌授权
    'RENT': 'Fashion Rental',                    // Rent the Runway - 时尚租赁
    'BIRD': 'Sustainable Footwear',              // Allbirds - 可持续鞋类DTC

    // Russell 2000/3000 Small-Caps 补充 (Cannabis/EV/Space/Specialty)
    // Cannabis/Alternative
    'CRON': 'Cannabis',                           // Cronos Group - 大麻
    'GTBIF': 'Cannabis MSO',                      // Green Thumb Industries - 大麻MSO

    // EV/Clean Energy
    'FCEL': 'Hydrogen Fuel Cell',                 // FuelCell Energy - 燃料电池平台

    // Space/Satellite
    'VSAT': 'Satellite Communications',           // Viasat - 卫星互联网/通信

    // Specialty Retail/Auto
    'XPEL': 'Auto Accessories',                   // XPEL Inc - 汽车漆面保护膜
    'DORM': 'Aftermarket Auto Parts',             // Dorman Products - 汽车售后零件

    // Data/Analytics
    'EVRI': 'Gaming Technology',                  // Everi Holdings - 博彩金融科技
    'VERX': 'Tax Software',                       // Vertex Inc - 税务合规SaaS

    // ========== 新增21只股票 ==========

    // 债务购买/消费金融
    'ECPG': 'Debt Purchasing',                    // Encore Capital - 债务购买/催收
    'PRAA': 'Debt Purchasing',                    // PRA Group - 债务购买/催收
    'NAVI': 'Student Loan Servicing',             // Navient - 学生贷款服务

    // 数据/分析
    'VRSK': 'Insurance Analytics',                // Verisk Analytics - 保险/风险分析
    'DNB': 'Business Data',                       // Dun & Bradstreet - 商业数据/分析

    // 设施/食品服务
    'ABM': 'Facility Services',                   // ABM Industries - 设施服务/保洁
    'ARMK': 'Food/Facilities Services',           // Aramark - 食品/设施服务

    // 清洁能源
    'CWEN': 'Renewable Wind/Solar',               // Clearway Energy - 可再生能源风电/光伏

    // 网络设备
    'UI': 'Networking Equipment',                 // Ubiquiti - 网络设备/WiFi

    // 媒体/广播
    'SIRI': 'Satellite Radio',                    // SiriusXM - 卫星广播/流媒体
    'IHRT': 'Radio/Podcasts',                     // iHeartMedia - 广播/播客

    // 消费品牌
    'OLPX': 'Premium Hair Care',                  // Olaplex - 高端护发
    'SG': 'Fast Casual Salad',                    // Sweetgreen - 快休闲沙拉

    // 保险/再保险
    'EG': 'Reinsurance',                          // Everest Group - 再保险
    'AXS': 'Specialty Reinsurance',               // Axis Capital - 特种保险/再保险

    // 多元化工业
    'CR': 'Process Industrial',                   // Crane Company - 航空/过程工业
    'ITT': 'Motion/Flow Components',              // ITT Inc - 运动/流体控制组件

    // 草坪/园艺
    'SMG': 'Lawn/Garden',                         // Scotts Miracle-Gro - 草坪/园艺产品

    // 医疗器械/MedTech
    'TMDX': 'Organ Transport',                    // TransMedics - 器官运输/保存
    'IART': 'Neurosurgery Devices',               // Integra LifeSciences - 神经外科器械
    'ATEC': 'Spine Devices',                      // Alphatec - 脊柱手术器械

    // Payments/Fintech - International
    'PSFE': 'Digital Payments',                   // Paysafe - 数字支付/iGaming
    'PAGS': 'Brazil Payments',                    // PagSeguro - 巴西支付
    'STNE': 'Brazil Fintech',                     // StoneCo - 巴西金融科技/支付

    // Digital Fitness
    'BODY': 'Digital Fitness',                    // Beachbody - 数字健身/订阅

    // Diversified Industrial/Infrastructure
    'ROPER': 'Diversified Industrial Software',   // Roper Technologies - 多元化工业软件
    'ZWS': 'Water Technology',                    // Zurn Elkay Water - 水管理/饮水

    // Healthcare/Biotech (Specialty)
    'IOVA': 'Cell Therapy',                       // Iovance - TIL细胞治疗
    'CYTK': 'Cardiac Therapeutics',               // Cytokinetics - 心肌肌球蛋白
    'IRON': 'Hematology Therapeutics',            // Disc Medicine - 血液学
    'VRNA': 'Respiratory Therapeutics',           // Verona Pharma - 呼吸系统

    // AI/Voice Technology
    'SOUN': 'Voice AI Platform',                  // SoundHound AI - 语音AI
    'BBAI': 'AI Decision Analytics',              // BigBear.ai - AI决策分析

    // Energy Services
    'CLB': 'Reservoir Description',               // Core Labs - 油藏描述/生产增强
    'AROC': 'Gas Compression Services',           // Archrock - 天然气压缩
    'USAC': 'Gas Compression Services',           // USA Compression - 天然气采集压缩

    // Orphan references fix
    'CTB': 'Tire Manufacturing',                  // Cooper Tire - 轮胎制造(被GT收购)
    'ERIC': 'Telecom Equipment',                  // Ericsson - 电信设备/5G RAN
    'GT': 'Tire Manufacturing',                   // Goodyear - 轮胎制造/零售
    'HBM': 'Copper Mining',                       // Hudbay Minerals - 铜锌金矿
    'TWOU': 'EdTech Platform',                    // 2U Inc - 在线教育OPM

    // New Batch: Real Estate/Space/IT/Biotech/Financial/eVTOL/Analytics
    'Z': 'Real Estate Tech Platform',              // Zillow - 房地产科技平台
    'COMP': 'Real Estate Brokerage Tech',          // Compass - 房地产经纪科技
    'RDW': 'Space Infrastructure',                 // Redwire - 太空基础设施
    'KD': 'IT Infrastructure Services',            // Kyndryl - IT基础设施服务
    'YOU': 'Identity Verification Tech',           // Clear Secure - 身份验证科技
    'ROIV': 'Biotech Platform',                    // Roivant Sciences - 生物科技平台
    'VCEL': 'Regenerative Medicine',               // Vericel - 再生医学
    'VERV': 'Gene Editing',                        // Verve Therapeutics - 基因编辑
    'SNEX': 'Commodities Brokerage',               // StoneX Group - 大宗商品经纪
    'BSIG': 'Asset Management',                    // BrightSphere - 资产管理
    'ACHR': 'eVTOL',                               // Archer Aviation - eVTOL
    'MTTR': '3D Spatial Data',                     // Matterport - 3D空间数据
    'ENVX': 'Orthopedic Devices',                  // Enovis - 骨科器械
    'AMPL': 'Digital Analytics Platform',          // Amplitude - 数字分析平台
    'SEMR': 'Digital Marketing SaaS',              // SEMrush - 数字营销SaaS
    'SRAD': 'Sports Data Analytics',               // Sportradar - 体育数据分析

    // ---------- Financials (Batch) ----------
    'BHF': 'Life Insurance & Annuities',            // Brighthouse Financial - 年金/寿险
    'BHLB': 'Community Banking',                    // Berkshire Hills Bancorp - 社区银行
    'BOH': 'Regional Banking',                      // Bank of Hawaii - 区域银行
    'CASH': 'BaaS Banking',                         // Pathward Financial - BaaS银行
    'CNO': 'Life & Health Insurance',               // CNO Financial - 寿险/健康险
    'CRD.A': 'Claims Management',                   // Crawford & Company - 理赔管理
    'EVER': 'Insurance Marketplace',                // EverQuote - 保险市场
    'FBRT': 'Mortgage REIT',                        // Franklin BSP Realty Trust - 抵押REIT
    'FG': 'Fixed Annuities',                        // F&G Annuities - 固定年金
    'HOMB': 'Regional Banking',                     // Home BancFunds - 区域银行
    'HTLF': 'Community Banking',                    // Heartland Financial - 社区银行
    'SFBS': 'Commercial Banking',                   // ServisFirst Bancshares - 商业银行
    'UCB': 'Community Banking',                     // United Community Banks - 社区银行
    'WAFD': 'Regional Banking',                     // WaFd - 区域银行

    // ---------- REITs (Batch) ----------
    'AIV': 'Multifamily REIT',                      // Apartment Investment - 多户住宅
    'BNL': 'Net Lease REIT',                        // Broadstone Net Lease - 净租赁
    'CUZ': 'Office REIT',                           // Cousins Properties - 办公REIT
    'ELME': 'Multifamily REIT',                     // Elme Communities - 多户住宅
    'GTY': 'Net Lease REIT',                        // Getty Realty - 净租赁/便利店
    'IRT': 'Multifamily REIT',                      // Independence Realty Trust - 多户住宅
    'KRG': 'Retail REIT',                           // Kite Realty Group - 零售REIT
    'LTC': 'Healthcare REIT',                       // LTC Properties - 高级住宅/护理
    'PECO': 'Retail REIT',                          // Phillips Edison - 杂货锚定
    'PINE': 'Net Lease REIT',                       // Alpine Income - 净租赁
    'ROIC': 'Retail REIT',                          // Retail Opportunity - 杂货锚定零售
    'SKT': 'Retail REIT',                           // Tanger Outlets - 奥特莱斯
    'STOR': 'Net Lease REIT',                       // STORE Capital - 净租赁
    'UNIT': 'Fiber REIT',                           // Uniti Group - 光纤REIT
    'UE': 'Retail REIT',                            // Urban Edge Properties - 城市零售

    // ---------- Energy (Batch) ----------
    'ARIS': 'Water Solutions',                      // Aris Water Solutions - 油田水处理
    'BORR': 'Offshore Drilling',                    // Borr Drilling - 自升式钻井
    'CRC': 'Oil & Gas E&P',                         // California Resources - E&P
    'DRQ': 'Subsea Equipment',                      // Dril-Quip - 海底设备
    'GRNT': 'Mortgage REIT',                        // Granite Point Mortgage - 抵押REIT
    'MUR': 'Oil & Gas E&P',                         // Murphy Oil - E&P
    'PARR': 'Oil Refining',                         // Par Pacific - 炼油
    'VNOM': 'Mineral Rights',                       // Viper Energy - 矿权/版税
    'WTTR': 'Water Solutions',                      // Select Water Solutions - 油田水处理

    // ========== Russell 2000 / S&P 600 Diversification Batch ==========
    'ALIT': 'HR Tech SaaS',                          // Alight - HR/福利管理SaaS
    'PRFT': 'Digital Consulting',                     // Perficient - 数字咨询/IT服务
    'UPWK': 'Freelance Marketplace',                  // Upwork - 自由职业市场
    'COUR': 'Online Education Platform',              // Coursera - 在线教育平台
    'GENI': 'Sports Betting Data',                    // Genius Sports - 体育数据/博彩科技
    'IONQ': 'Quantum Computing',                      // IonQ - 量子计算(离子阱)
    'RGTI': 'Quantum Computing',                      // Rigetti - 量子计算(超导)
    'QBTS': 'Quantum Computing',                      // D-Wave - 量子计算(量子退火)
    'ALAB': 'Data Center Connectivity',               // Astera Labs - 数据中心连接芯片
    'WULF': 'Crypto Mining',                          // TeraWulf - 比特币挖矿/数据中心
    'CIFR': 'Crypto Mining',                          // Cipher Mining - 比特币挖矿
    'HUT': 'Crypto Mining',                           // Hut 8 - 比特币挖矿/HPC
    'BTDR': 'Crypto Mining/ASIC Design',              // Bitdeer - 比特币挖矿/ASIC设计

    // ========== 补充: Healthcare Biotech (2026-01 batch) ==========
    'DNLI': 'Neurodegeneration Therapy',               // Denali Therapeutics - 神经退行性疗法
    'PRAX': 'Neuropsychiatry Therapy',                 // Praxis Precision Medicine - 神经精神疗法
    'DAWN': 'Oncology Drug',                           // Day One Biopharmaceuticals - 儿童肿瘤药物
    'VERA': 'Nephrology Therapy',                      // Vera Therapeutics - 肾脏病疗法
    'JANX': 'Immuno-Oncology',                         // Janux Therapeutics - 免疫肿瘤(TCE)
    'TGTX': 'Hematology Therapeutics',                 // TG Therapeutics - 血液/肿瘤
    'DNAB': 'Vaccine Adjuvant',                        // Dynavax - 疫苗佐剂
    'PRME': 'Gene Editing',                            // Prime Medicine - 先导编辑
    'KROS': 'Hematology Therapeutics',                 // Keros Therapeutics - 血液/骨

    // ========== Consumer / Retail / Services (New Batch) ==========
    'BGFV': 'Sporting Goods Retail',                    // Big 5 Sporting Goods - 运动零售
    'BNED': 'Educational Retail',                       // Barnes & Noble Education - 教育零售
    'BOWL': 'Entertainment Venues',                     // Bowlero - 保龄球娱乐
    'BWMX': 'Home Products Direct Sales',               // Betterware de Mexico - 家居直销
    'COCO': 'Natural Beverages',                        // Vita Coco - 椰子饮品
    'COOK': 'Outdoor Cooking',                          // Traeger - 户外烹饪/烤架
    'CURV': 'Plus-Size Fashion Retail',                 // Torrid - 大码时尚
    'DIN': 'Casual Dining Franchise',                   // Dine Brands - IHOP/Applebee's
    'DLTH': 'Workwear Retail',                          // Duluth Trading - 工装零售
    'DSGR': 'Industrial Distribution',                  // Distribution Solutions - 工业分销
    'EXPR': 'Fashion Retail',                           // Express - 时尚零售
    'FTDR': 'Home Warranty Services',                   // Frontdoor - 家庭保修
    'GRWG': 'Hydroponics Retail',                       // GrowGeneration - 水培零售
    'HRMY': 'Specialty Pharma',                         // Harmony Biosciences - 嗜睡症特药
    'IBTA': 'Digital Rewards Platform',                 // Ibotta - 数字返利平台
    'LMNR': 'Citrus Agriculture',                       // Limoneira - 柑橘/牛油果
    'LQDT': 'Surplus Asset Marketplace',                // Liquidity Services - 剩余资产拍卖
    'LVLU': 'Fashion E-commerce',                       // Lulu's Holdings - 时尚电商
    'MGPI': 'Distilled Spirits',                        // MGP Ingredients - 威士忌/烈酒
    'NAPA': 'Premium Wine',                             // Duckhorn Portfolio - 高端葡萄酒
    'NGVT': 'Specialty Chemicals',                      // Ingevity - 特种化学品
    'ODP': 'Office Products Retail',                    // Office Depot - 办公用品零售
    'SGH': 'Specialty Computing Solutions',             // SMART Global - 特种计算
    'TACO': 'Quick Service Restaurant',                 // Del Taco - 墨西哥快餐
    'THO': 'Recreational Vehicles',                     // Thor Industries - 房车制造
    'TUP': 'Home Storage Products',                     // Tupperware - 家居收纳
    'TVTX': 'Rare Disease Therapeutics',                // Travere Therapeutics - 罕见病
    'VLTO': 'Water Quality & Product ID',               // Veralto - 水质/产品质量
    'WINA': 'Resale Franchise',                         // Winmark - 转售特许经营

    // ========== Biotech/Pharma Emerging & Specialty (Batch 2) ==========
    'ALKS': 'Specialty Pharma',                          // Alkermes - CNS/成瘾特药
    'APLS': 'Emerging Biotech',                          // Apellis - 补体生物科技
    'AGIO': 'Emerging Biotech',                          // Agios - 罕见病
    'AKRO': 'Emerging Biotech',                          // Akero - NASH/代谢
    'ARWR': 'Emerging Biotech',                          // Arrowhead - RNAi疗法
    'AXSM': 'Specialty Pharma',                          // Axsome - CNS制药
    'BHVN': 'Emerging Biotech',                          // Biohaven - 神经/疼痛
    'CORT': 'Specialty Pharma',                          // Corcept - 内分泌特药
    'ENTA': 'Emerging Biotech',                          // Enanta - 抗病毒
    'FGEN': 'Emerging Biotech',                          // FibroGen - 贫血/纤维化
    'GERN': 'Emerging Biotech',                          // Geron - 血液/端粒酶
    'GLPG': 'Emerging Biotech',                          // Galapagos - 炎症
    'GOSS': 'Emerging Biotech',                          // Gossamer Bio - 免疫
    'HZNP': 'Specialty Pharma',                          // Horizon - 罕见病(Amgen收购)
    'IDYA': 'Emerging Biotech',                          // IDEAYA - 精准肿瘤
    'IMGO': 'Emerging Biotech',                          // Imago - 血液肿瘤
    'ITCI': 'Specialty Pharma',                          // Intra-Cellular - CNS
    'KALA': 'Emerging Biotech',                          // Kala Bio - 眼科
    'LQDA': 'Specialty Pharma',                          // Liquidia - 肺动脉
    'MGNX': 'Emerging Biotech',                          // MacroGenics - 抗体肿瘤
    'MIRM': 'Specialty Pharma',                          // Mirum - 肝病特药
    'MRVI': 'Life Sciences Tools',                       // Maravai - 核酸制造
    'NKTX': 'Cell Therapy',                              // Nkarta - NK细胞治疗
    'OLMA': 'Emerging Biotech',                          // Olema - 乳腺癌
    'PTGX': 'Emerging Biotech',                          // Protagonist - 多肽疗法
    'RCUS': 'Emerging Biotech',                          // Arcus - 免疫肿瘤
    'RETA': 'Specialty Pharma',                          // Reata - NF2罕见病(Biogen收购)
    'RLAY': 'Emerging Biotech',                          // Relay - 精准医学
    'RXDX': 'Emerging Biotech',                          // Prometheus - GI自免
    'SAVA': 'Emerging Biotech',                          // Cassava - 阿尔茨海默
    'SLNO': 'Emerging Biotech',                          // Soleno - Prader-Willi
    'SMMT': 'Emerging Biotech',                          // Summit - 肿瘤
    'VCNX': 'Emerging Biotech',                          // Vaccinex - 神经
    'VKTX': 'Emerging Biotech',                          // Viking - 代谢/NASH
    'VRDN': 'Emerging Biotech',                          // Viridian - 甲状腺眼病
    'XERS': 'Specialty Pharma',                          // Xeris - 内分泌
    'YMAB': 'Emerging Biotech',                          // Y-mAbs - 儿童肿瘤
    'ZNTL': 'Emerging Biotech',                          // Zentalis - 肿瘤

    // ---------- Tech/Software/Internet Batch ----------
    'AGYS': 'Hospitality Technology',                      // Agilysys - 酒店科技
    'AVLR': 'Tax Compliance SaaS',                        // Avalara - 税务合规SaaS
    'AYX': 'Data Analytics Platform',                     // Alteryx - 数据分析
    'BASE': 'Database Software',                          // Couchbase - NoSQL数据库
    'BLZE': 'Cloud Storage',                              // Backblaze - 云存储
    'BSY': 'Infrastructure Engineering Software',         // Bentley Systems - 基础设施软件
    'CDAY': 'HCM/Payroll SaaS',                           // Ceridian/Dayforce - HCM
    'CLBT': 'Digital Intelligence',                       // Cellebrite - 数字情报
    'DLO': 'Cross-Border Payments',                       // DLocal - 跨境支付
    'DOMO': 'Business Intelligence SaaS',                 // Domo - BI/分析
    'EVCM': 'SMB Vertical SaaS',                          // EverCommerce - SMB垂直SaaS
    'EVBG': 'Mass Notification SaaS',                     // Everbridge - 大规模通知
    'FIVN': 'Contact Center as a Service',                // Five9 - CCaaS
    'FSLY': 'Edge Computing/CDN',                         // Fastly - 边缘计算/CDN
    'GETY': 'Visual Content Platform',                    // Getty Images - 视觉内容
    'HLIT': 'Video Infrastructure',                       // Harmonic - 视频基础设施
    'INTA': 'Professional Services Tech',                 // Intapp - 专业服务科技
    'KNBE': 'Security Awareness Training',                // KnowBe4 - 安全意识
    'KORE': 'IoT Connectivity',                           // KORE Group - IoT连接
    'LIDR': 'LiDAR Sensors',                              // AEye - 激光雷达
    'MDAI': 'AI Medical Diagnostics',                     // Spectral AI - AI诊断
    'NATI': 'Test & Measurement',                         // NI - 测试测量
    'OOMA': 'Cloud Communications',                       // Ooma - 云通信
    'OS': 'Corporate Performance Management',             // OneStream - 企业CPM
    'PAX': 'Alternative Asset Management',                // Patria - 另类资产管理
    'PERI': 'Digital Advertising Tech',                   // Perion - 广告科技
    'QUBT': 'Quantum Computing Software',                 // Quantum Computing - 量子优化
    'RCAT': 'Drone Technology',                           // Red Cat - 无人机科技
    'RDVT': 'Data Analytics Platform',                    // Red Violet - 数据分析
    'SCWX': 'Managed Security Services',                  // SecureWorks - 托管安全
    'SMWB': 'Digital Intelligence Platform',              // Similarweb - 数字情报
    'SPNS': 'Insurance Technology',                       // Sapiens - 保险科技
    'VMEO': 'Video Platform SaaS',                        // Vimeo - 视频平台
    'VYX': 'Retail/Restaurant POS',                       // NCR Voyix - 零售POS
    'WEAV': 'Healthcare Communications',                  // Weave - 医疗通信
    'WKME': 'Digital Adoption Platform',                  // WalkMe - 数字采纳
    'ZUO': 'Subscription Management',                     // Zuora - 订阅管理

    // ========== 工业/材料/运输批次 ==========
    'AIMC': 'Motion Control',                             // Altra Industrial Motion - 运动控制
    'ATLKY': 'Compressors & Vacuum',                      // Atlas Copco - 压缩机/真空
    'BGSF': 'Workforce Solutions',                        // BG Staffing - 劳务解决方案
    'BWMN': 'Engineering Consulting',                     // Bowman Consulting - 工程咨询
    'CENTA': 'Garden & Pet Products',                     // Central Garden - 花园/宠物
    'CMCO': 'Motion Control',                             // Columbus McKinnon - 运动控制
    'CNDT': 'Business Process Services',                  // Conduent - 业务流程服务
    'CPAC': 'Cement & Building Materials',                // Cementos Pacasmayo - 水泥
    'DCI': 'Filtration Systems',                          // Donaldson - 过滤系统
    'DNOW': 'Energy Distribution',                        // DistributionNOW - 能源分销
    'DY': 'Utility & Telecom Contracting',                // Dycom - 公用事业/电信承包
    'EAF': 'Graphite Electrodes',                         // GrafTech - 石墨电极
    'ERII': 'Pressure Exchangers',                        // Energy Recovery - 压力交换器
    'FLOW': 'Process Technology',                         // SPX FLOW - 工艺技术
    'GBX': 'Railcar Manufacturing',                       // Greenbrier - 铁路车辆制造
    'GEF': 'Industrial Packaging',                        // Greif - 工业包装
    'GTES': 'Power Transmission',                         // Gates Industrial - 动力传输
    'GVA': 'Heavy Construction',                          // Granite Construction - 重型建筑
    'HI': 'Industrial Equipment',                         // Hillenbrand - 工业设备
    'JBT': 'Food & Aerospace Technology',                 // John Bean Technologies - 食品/航空
    'KAI': 'Process Equipment',                           // Kadant - 工艺设备
    'KMT': 'Cutting Tools & Tooling',                     // Kennametal - 切削工具
    'KNTK': 'Midstream Gas',                              // Kinetik - 中游天然气
    'LXFR': 'Gas Cylinders & Specialty Materials',        // Luxfer - 气瓶
    'MBC': 'Cabinetry',                                   // MasterBrand - 橱柜
    'MHK': 'Flooring',                                    // Mohawk Industries - 地板
    'MMS': 'Government Services',                         // Maximus - 政府服务
    'MSA': 'Safety Equipment',                            // MSA Safety - 安全设备
    'MTW': 'Cranes & Lifting',                            // Manitowoc - 起重机
    'NPO': 'Engineered Seals & Components',               // EnPro - 工程密封件
    'NX': 'Building Products',                            // Quanex - 建筑产品
    'SEB': 'Agribusiness & Transport',                    // Seaboard - 农业/运输
    'SSD': 'Structural Connectors',                       // Simpson Manufacturing - 结构连接件
    'TKR': 'Bearings & Power Transmission',               // Timken - 轴承/动力传输
    'TRNS': 'Calibration & Testing',                      // Transcat - 校准/测试
    'UTL': 'Electric & Gas Utility',                      // UNITIL - 公用事业
    'WDFC': 'Maintenance Products',                       // WD-40 - 维护产品
    'WOR': 'Steel Processing',                            // Worthington - 钢材加工
    'FWRG': 'Fast Casual Restaurant',                      // First Watch - 早午餐连锁
    'NUVB': 'Oncology Biotech',                            // Nuvation Bio - 肿瘤生物科技

    // ========== 新增: Healthcare, Industrials, REITs, Banks, Consumer (2026-01-24) ==========
    // --- Biotech ---
    'GPCR': 'Emerging Biotech',                            // Structure Therapeutics - GPCR生物科技
    'CRNX': 'Emerging Biotech',                            // Crinetics Pharmaceuticals - 内分泌生物科技
    'ERAS': 'Emerging Biotech',                            // Erasca - RAS肿瘤生物科技
    'FUSN': 'Emerging Biotech',                            // Fusion Pharmaceuticals - 放射性药物
    'ACLX': 'Cell Therapy',                                // Arcellx - CAR-T细胞治疗
    'BCYC': 'Emerging Biotech',                            // Bicycle Therapeutics - 自行车毒素偶联
    'CMPS': 'Emerging Biotech',                            // COMPASS Pathways - 迷幻疗法
    'CRVS': 'Immuno-Oncology',                             // Corvus Pharmaceuticals - 免疫肿瘤
    'DICE': 'Emerging Biotech',                            // DICE Therapeutics - 口服生物制剂
    'CLDX': 'Emerging Biotech',                            // Celldex Therapeutics - 抗体疗法
    'AVXL': 'Emerging Biotech',                            // Anavex Life Sciences - 神经生物科技
    'BTAI': 'Emerging Biotech',                            // BioXcel Therapeutics - AI神经科学
    'ETNB': 'Emerging Biotech',                            // 89bio - 肝病生物科技
    'CPRX': 'Emerging Biotech',                            // Catalyst Pharma - 罕见神经肌肉
    'ALEC': 'Emerging Biotech',                            // Alector - 神经退行性疾病
    // --- Animal Health ---
    'ELAN': 'Animal Health',                               // Elanco Animal Health - 动物健康
    // --- Infrastructure Engineering ---
    'NVEE': 'Infrastructure Engineering',                  // NV5 Global - 基础设施工程
    // --- Building Products ---
    'GFF': 'Building Products',                            // Griffon Corp - 家居/建筑产品
    // --- REITs ---
    'DEA': 'Office REIT',                                  // Easterly Government Properties - 政府办公REIT
    'CTO': 'Retail REIT',                                  // CTO Realty Growth - 零售/混合REIT
    'GMRE': 'Healthcare REIT',                             // Global Medical REIT - 医疗办公REIT
    'JBGS': 'Office REIT',                                 // JBG SMITH Properties - 混合用途REIT
    'PDM': 'Office REIT',                                  // Piedmont Office Realty - 办公REIT
    // --- Regional Banks ---
    'FIBK': 'Regional Bank',                               // First Interstate BancSystem - 蒙大拿区域银行
    'UBSI': 'Regional Bank',                               // United Bankshares - WV/VA区域银行
    'WTFC': 'Regional Bank',                               // Wintrust Financial - 芝加哥区域银行
    'PPBI': 'Regional Bank',                               // Pacific Premier Bancorp - 加州区域银行
    // --- Consumer ---
    'PRPL': 'Furniture/Mattress',                          // Purple Innovation - DTC床垫
    'CATO': 'Value Retail',                                // Cato Corp - 价值服装零售

    // ========== 新增30只: Media, SaaS, Aviation, Industrials, Banks (2026-01-24) ==========
    // --- Media/Broadcasting ---
    'FOXA': 'Broadcast TV',                                // Fox Corp Class A - 广播电视
    // --- eCommerce Platform SaaS ---
    'BIGC': 'eCommerce Platform SaaS',                     // BigCommerce - 电商SaaS平台
    'VTEX': 'eCommerce Platform SaaS',                     // VTEX - 拉美电商SaaS平台
    // --- UCaaS/Cloud Communications ---
    'RNG': 'UCaaS',                                        // RingCentral - 统一通信
    // --- CX/Workforce Management ---
    'NICE': 'CX Software',                                 // NICE - CX/劳动力管理
    // --- Conversational AI ---
    'LPSN': 'Conversational AI',                           // LivePerson - 对话AI平台
    // --- Aviation Services ---
    'FTAI': 'Aviation Services',                           // FTAI Aviation - 航空租赁/MRO
    // --- Consumer Health ---
    'KVUE': 'Consumer Health',                             // Kenvue - 消费健康产品
    // --- Healthcare Navigation ---
    'ACCD': 'Healthcare Navigation',                       // Accolade - 医疗导航平台
    // --- Computational Drug Discovery ---
    'SDGR': 'Computational Drug Discovery',                // Schrodinger - 计算药物发现
    // --- Digital Lending ---
    'LC': 'Digital Lending',                               // LendingClub - 数字贷款
    // --- Wholesale Mortgage ---
    'UWMC': 'Wholesale Mortgage',                          // UWM Holdings - 批发按揭
    // --- Restaurant Tech ---
    'OLO': 'Restaurant Tech',                              // Olo - 餐饮订购SaaS
    // --- Home Services InsurTech ---
    'PRCH': 'Home Services InsurTech',                     // Porch Group - 家庭服务/保险科技
    // --- Banking Software ---
    'BLND': 'Banking Software',                            // Blend Labs - 按揭/银行SaaS
    // --- IT Management SaaS ---
    'NABL': 'IT Management SaaS',                          // N-able - IT管理SaaS(MSP)
    // --- GRC Software ---
    'WK': 'GRC Software',                                  // Workiva - GRC/ESG报告
    // --- Observability ---
    'NEWR': 'Observability',                               // New Relic - 可观测性/APM
    // --- Cloud SIEM ---
    'SUMO': 'Cloud SIEM',                                  // Sumo Logic - 云SIEM/分析
    // --- CTV Platform ---
    'VZIO': 'CTV Platform',                                // Vizio - 智能电视/CTV平台
    // --- LatAm Payments ---
    'EVTC': 'LatAm Payments',                             // EVERTEC - 拉美支付处理
    // --- AI Data Engineering ---
    'INOD': 'AI Data Engineering',                         // Innodata - AI数据工程
    // --- Power Conversion ---
    'AEIS': 'Power Conversion',                            // Advanced Energy - 电力转换设备
    // --- Railcar ---
    'TRN': 'Railcar',                                      // Trinity Industries - 轨道车辆
    // --- Specialty Chemicals ---
    'ASH': 'Specialty Chemicals',                          // Ashland - 特种化学/添加剂
    // --- Specialty Alloys ---
    'CRS': 'Specialty Alloys',                             // Carpenter Technology - 特种合金
    // --- Metallurgical Coal ---
    'HCC': 'Metallurgical Coal',                           // Warrior Met Coal - 焦煤
    // --- Regional Banks ---
    'CFR': 'Regional Bank',                                // Culberson-Frost Bankers - 德州银行
    'TCBI': 'Regional Bank',                               // Texas Capital Bancshares - 德州商业银行
    'WSFS': 'Regional Bank',                               // WSFS Financial - 中大西洋银行

    // ========== 新增50只: Healthcare / Biotech / MedTech (2026-01-24) ==========
    'ADMA': 'Plasma-Derived Therapeutics',                    // ADMA Biologics - 血浆蛋白
    'AGEN': 'Immuno-Oncology',                                // Agenus - 免疫肿瘤
    'ALLK': 'Allergy/Immunology Biotech',                     // Allakos - 嗜酸性粒细胞
    'AMPH': 'Specialty Pharma',                               // Amphastar - 特种仿制药
    'ANAB': 'Autoimmune Biotech',                             // AnaptysBio - 自免抗体
    'APGE': 'Gene Editing Biotech',                           // Apogee Therapeutics - 基因编辑
    'ARAY': 'Radiation Oncology Equipment',                   // Accuray - 放射治疗设备
    'ATHA': 'Neuroscience Biotech',                           // Athira Pharma - 阿尔茨海默
    'AUPH': 'Nephrology Biotech',                             // Aurinia - 肾病
    'AVEO': 'Oncology Biotech',                               // AVEO Pharma - 肾细胞癌
    'BBI': 'Clinical-Stage Biotech',                          // Brickell Biotech - 临床肿瘤
    'BCAB': 'ADC Biotech',                                    // BioAtla - ADC抗体偶联
    'BDTX': 'Precision Oncology Biotech',                     // Black Diamond - 精准肿瘤
    'BNGO': 'Genomic Analysis Tools',                         // Bionano Genomics - 光学基因组
    'CARA': 'Pain/Pruritus Biotech',                          // Cara Therapeutics - 瘙痒/疼痛
    'CHRS': 'Biosimilars',                                    // Coherus BioSciences - 生物仿制药
    'CLPT': 'Digital Therapeutics',                            // ClearPoint Neuro - 数字疗法
    'DCPH': 'Ophthalmology Biotech',                          // Deciphera - 眼科基因疗法
    'DVAX': 'Vaccine Biotech',                                // Dynavax - 疫苗/佐剂
    'DYN': 'Gene Therapy Biotech',                            // Dyne Therapeutics - AAV基因疗法
    'EDIT': 'Gene Editing Biotech',                           // Editas Medicine - CRISPR基因编辑
    'EXAI': 'AI Drug Discovery',                              // Exscientia - AI药物发现
    'FULC': 'Epigenetics Biotech',                            // Fulcrum Therapeutics - 表观遗传
    'GMAB': 'Antibody Platform Biotech',                      // Genmab - 抗体平台
    'GRTS': 'mRNA Biotech',                                   // Gritstone bio - mRNA疗法
    'HRTX': 'Pain Management Biotech',                        // Heron Therapeutics - 疼痛管理
    'ICAD': 'AI Medical Imaging',                             // iCAD - AI医学影像
    'IMNM': 'Immunology Biotech',                             // Immunomedics - 免疫生物科技
    'INVA': 'Respiratory Pharma',                             // Innoviva - 呼吸制药
    'ISEE': 'Ophthalmology Biotech',                          // IVERIC bio - 视网膜补体
    'KPTI': 'Oncology Biotech',                               // Karyopharm - 核输出抑制
    'LGND': 'Drug Royalties',                                 // Ligand Pharma - 药物特许权
    'MNKD': 'Inhaled Therapeutics',                           // MannKind - 吸入胰岛素
    'MORF': 'Protein Degradation Biotech',                    // Morphic Holding - 蛋白降解
    'MRTX': 'Precision Oncology Biotech',                     // Mirati Therapeutics - KRAS肿瘤
    'MRUS': 'Bispecific Antibody Biotech',                    // Merus - 双特异性抗体
    'NRIX': 'Neuroscience Biotech',                           // Nurix Therapeutics - 神经激酶
    'OCGN': 'Vaccine/Gene Therapy Biotech',                   // Ocugen - 疫苗/基因疗法
    'OGN': 'Womens Health Pharma',                            // Organon - 女性健康
    'RDNT': 'Radiology Services',                             // RadNet - 放射影像服务
    'RGNX': 'Gene Therapy Platform',                          // REGENXBIO - AAV基因疗法
    'SAGE': 'Neuroscience Pharma',                            // Sage Therapeutics - 神经科学
    'SGMO': 'Gene Medicine Biotech',                          // Sangamo - 锌指基因调控
    'SNDX': 'Genomic Medicine Biotech',                       // Syndax Pharmaceuticals - 基因组医学
    'TARS': 'Endocrine Biotech',                              // Tarsus Pharmaceuticals - 内分泌
    'VCYT': 'Molecular Diagnostics',                          // Veracyte - 分子诊断
    'VNDA': 'CNS Specialty Pharma',                           // Vanda Pharmaceuticals - CNS
    'XNCR': 'Antibody Engineering Biotech',                   // Xencor - Fc工程抗体
    'ZYME': 'ADC Biotech',                                    // Zymeworks - ADC平台

    // ========== 补充101只: Industrial/Defense/Energy/Mining subIndustryOverrides ==========
    'ACTG': 'Patent Licensing',                               // Acacia Research - 专利授权
    'ADS': 'Marketing & Loyalty Services',                    // Alliance Data - 营销服务
    'AEYE': 'Digital Accessibility',                          // AudioEye - 数字无障碍
    'AGR': 'Renewable Utility',                               // Avangrid - 可再生能源公用事业
    'AHH': 'Diversified REIT',                                // Armada Hoffler - 多元化REIT
    'AIN': 'Aerospace Composites',                            // Albany International - 航空复合材料
    'AJRD': 'Rocket Propulsion',                              // Aerojet Rocketdyne - 火箭推进
    'ALSN': 'Transmission Systems',                           // Allison Transmission - 变速器
    'AMKR': 'Semiconductor Packaging & Test',                 // Amkor Technology - 半导体封装
    'AMPY': 'Oil & Gas E&P',                                  // Amplify Energy - 油气勘探
    'AMRC': 'Energy Efficiency',                              // Ameresco - 能效服务
    'AMSC': 'Power Electronics & Superconductors',            // American Superconductor - 超导
    'AQN': 'Diversified Utilities',                           // Algonquin Power - 多元化公用事业
    'ATCO': 'Container Leasing',                              // Atlas Corp - 集装箱租赁
    'ATRO': 'Aerospace Electronics',                          // Astronics - 航空电子
    'ATSG': 'Air Cargo Transport',                            // Air Transport Services - 航空货运
    'B': 'Aerospace & Industrial Components',                 // Barnes Group - 航空/工业零件
    'BBU': 'Industrial Conglomerate',                         // Brookfield Business - 工业集团
    'BKSY': 'Geospatial Intelligence',                        // BlackSky - 地理空间情报
    'BKV': 'Natural Gas E&P',                                 // BKV Corp - 天然气勘探
    'BLDP': 'Fuel Cell Systems',                              // Ballard Power - 燃料电池
    'BLX': 'Trade Finance',                                   // Banco Latinoamericano - 贸易融资
    'BRY': 'Oil & Gas E&P',                                   // Berry Corp - 油气勘探
    'BSM': 'Oil & Gas Minerals',                              // Black Stone Minerals - 矿权
    'BTU': 'Coal Mining',                                     // Peabody Energy - 煤矿
    'BWEN': 'Wind Energy Components',                         // Broadwind - 风能组件
    'CDMO': 'Biologics CDMO',                                 // Avid Bioservices - 生物药代工
    'CEIX': 'Coal Mining',                                    // CONSOL Energy - 煤矿
    'CIG': 'Electric Utility',                                // Companhia Energetica - 电力公用
    'CIR': 'Flow Control Equipment',                          // CIRCOR - 流量控制设备
    'CLMT': 'Specialty Refining',                             // Calumet Specialty - 特种炼油
    'CLW': 'Biomass & Specialty Products',                    // Clearwater Paper - 生物质产品
    'CNX': 'Natural Gas E&P',                                 // CNX Resources - 天然气勘探
    'CPE': 'Oil & Gas E&P',                                   // Callon Petroleum - 油气勘探
    'CVEO': 'Workforce Solutions',                            // Civeo - 远程劳动力方案
    'DEN': 'Oil & Gas E&P',                                   // Denbury - 油气/碳捕获
    'DRS': 'Defense Electronics',                             // Leonardo DRS - 国防电子
    'EE': 'Electric Utility',                                 // Excelerate Energy - 电力LNG
    'ENB': 'Midstream Pipeline',                              // Enbridge - 管道运输
    'ENIC': 'Electric Utility',                               // Enel Chile - 智利电力
    'EQNR': 'Integrated Oil & Gas',                           // Equinor - 综合油气
    'ERF': 'Oil & Gas E&P',                                   // Enerplus - 油气勘探
    'GEL': 'Midstream Services',                              // Genesis Energy - 中游服务
    'GLNCY': 'Diversified Mining & Trading',                  // Glencore - 矿业贸易
    'GNSS': 'Mass Notification Systems',                      // Genasys - 声学通知
    'GPP': 'Midstream Gathering',                             // Green Plains Partners - 中游采集
    'GTLS': 'Gas Processing Equipment',                       // Chart Industries - 气处理设备
    'GTN': 'Natural Gas Pipeline',                            // Gray Television - 天然气管道
    'HDS': 'MRO Distribution',                                // HD Supply - MRO分销
    'HEICO': 'Aerospace Replacement Parts',                   // HEICO - 航空替换件
    'HOG': 'Motorcycles',                                     // Harley-Davidson - 摩托车
    'IREN': 'Bitcoin Mining / Data Center',                   // Iris Energy - 比特币挖矿
    'KGC': 'Gold Mining',                                     // Kinross Gold - 黄金开采
    'KOS': 'Oil & Gas E&P',                                   // Kosmos Energy - 油气勘探
    'KRNT': 'Digital Textile Printing',                       // Kornit Digital - 数字纺织
    'LPG': 'LPG Shipping',                                   // Dorian LPG - 液化石油气运输
    'LPX': 'Engineered Wood Products',                        // Louisiana-Pacific - 工程木产品
    'LXU': 'Chemicals & Fertilizers',                         // LSB Industries - 化肥
    'MFGP': 'Enterprise Software',                            // Micro Focus - 企业软件
    'MGRC': 'Modular Equipment Rental',                       // McGrath RentCorp - 模块化租赁
    'MGX': 'Iron Ore Mining',                                 // Metagenomi - 铁矿石
    'MLI': 'Copper & Brass Products',                         // Mueller Industries - 铜产品
    'MMLP': 'Midstream Terminals',                            // Martin Midstream - 中游码头
    'MPLN': 'Midstream Services',                             // MultiPlan - 中游服务
    'MRC': 'PVF Distribution',                                // MRC Global - 管阀件分销
    'MTRN': 'Advanced Materials',                             // Materion - 先进材料
    'NFG': 'Integrated Gas',                                  // National Fuel Gas - 综合天然气
    'NMM': 'Dry Bulk Shipping',                               // Navios Maritime - 干散货运输
    'NRP': 'Natural Resource Royalties',                      // Natural Resource Partners - 资源版税
    'OAS': 'Oil & Gas E&P',                                   // Oasis Petroleum - 油气勘探
    'OFLX': 'Flexible Piping Systems',                        // Omega Flex - 柔性管道
    'OIS': 'Oilfield Services',                               // Oil States International - 油服
    'OPAL': 'Carbon Black & Specialty Chemicals',             // OPAL Fuels - 炭黑特化
    'OXM': 'Premium Apparel',                                 // Oxford Industries - 高端服饰
    'PAA': 'Midstream Pipeline',                              // Plains All American - 管道
    'PBT': 'Oil & Gas Royalties',                             // Permian Basin - 油气版税
    'PDS': 'Oilfield Services',                               // Precision Drilling - 钻井服务
    'PLPC': 'Utility Hardware',                               // Preformed Line - 电力线缆硬件
    'PNM': 'Electric Utility',                                // PNM Resources - 电力公用
    'PNR': 'Water Treatment & Flow Control',                  // Pentair - 水处理
    'RAVN': 'Precision Agriculture & Defense',                // Raven Industries - 精准农业
    'RUSHA': 'Commercial Truck Dealerships',                  // Rush Enterprises - 卡车经销
    'SBR': 'Oilfield Services',                               // Sabine Royalty - 油服/版税
    'SDRL': 'Offshore Drilling',                              // Seadrill - 海上钻井
    'SUN': 'Fuel Distribution',                               // Sunoco - 燃油分销
    'TAC': 'Construction & Industrial Services',              // TransAlta - 建设/工业服务
    'TEP': 'Midstream Gathering',                             // Tallgrass Energy - 中游采集
    'TGS': 'Natural Gas Transport',                           // TGS-NOPEC - 天然气运输
    'TMC': 'Deep-Sea Mining',                                 // The Metals Co - 深海采矿
    'TPL': 'Oil & Gas Royalties',                             // Texas Pacific Land - 油气版税
    'TRP': 'Midstream Pipeline',                              // TC Energy - 管道运输
    'TTI': 'Completion Fluids & Water Management',            // TETRA Technologies - 完井液
    'TU': 'Telecom Utility',                                  // TELUS - 电信公用事业
    'UGI': 'Gas Utility',                                     // UGI Corp - 天然气公用事业
    'UHAL': 'Moving & Storage',                               // U-Haul - 搬家仓储
    'VRRM': 'Traffic Management Solutions',                   // Verra Mobility - 交通管理
    'VTOL': 'Offshore Aviation',                              // Bristow Group - 海上航空
    'VVV': 'Automotive Preventive Maintenance',               // Valvoline - 汽车维护
    'WNC': 'Trailer Manufacturing',                           // Wabash National - 拖车制造
    'WSC': 'Modular Space & Storage',                         // WillScot Mobile Mini - 模块化空间
    'YPF': 'Integrated Oil & Gas',                            // YPF - 阿根廷综合油气

    // === Gap Fill: 97 missing symbols ===
    'ABR': 'Mortgage REIT',
    'ACRE': 'Mortgage REIT',
    'ADTN': 'Networking Equipment',
    'AEL': 'Life Insurance & Annuities',
    'AGM': 'Agricultural Finance',
    'AGNC': 'Mortgage REIT',
    'AIZ': 'Specialty Insurance',
    'AMG': 'Asset Manager',
    'AMP': 'Asset Manager',
    'APTI': 'Digital Advertising Tech',
    'ARI': 'Mortgage REIT',
    'ATEN': 'Network Equipment',
    'AUB': 'Regional Banking',
    'AVPT': 'Cloud Infrastructure',
    'BANF': 'Regional Banking',
    'BCOV': 'Video Platform SaaS',
    'BLKB': 'Enterprise SaaS',
    'BN': 'Alternative Asset Manager',
    'BOTZ': 'Exchange',
    'BPOP': 'Regional Banking',
    'BTBT': 'Crypto Mining',
    'CATY': 'Regional Banking',
    'CCCS': 'Insurance Technology',
    'CGNT': 'Managed Security Services',
    'CLPS': 'IT Services',
    'CMTL': 'Defense Electronics',
    'CNA': 'P&C Insurance',
    'CORZ': 'Bitcoin Mining / Data Center',
    'CPF': 'Regional Banking',
    'CVBF': 'Regional Banking',
    'CXM': 'CX Software',
    'CYRX': 'Cold Storage REIT',
    'DUOT': 'Machine Vision',
    'EBIX': 'Insurance Technology',
    'EFC': 'Mortgage REIT',
    'EGHT': 'UCaaS',
    'EIGI': 'Endpoint Management',
    'ENFN': 'Financial Software',
    'EPIQ': 'Professional Services Tech',
    'ESMT': 'Payment Processing',
    'ESRT': 'Office REIT',
    'EXLS': 'Business Process Services',
    'FARO': 'Precision Instruments',
    'FHI': 'Asset Manager',
    'FORR': 'Management Consulting',
    'GOOD': 'Net Lease REIT',
    'GSKY': 'Consumer Finance',
    'HMN': 'Specialty Insurance',
    'HMST': 'Regional Banking',
    'HPP': 'Office REIT',
    'HRB': 'Tax Software',
    'INN': 'Hotel REIT',
    'IRNT': 'Cybersecurity',
    'ISBC': 'Regional Banking',
    'IVR': 'Mortgage REIT',
    'KRNY': 'Regional Banking',
    'LADR': 'Mortgage REIT',
    'LEDS': 'Electronic Components',
    'LLAP': 'Space Systems',
    'LVOX': 'Contact Center as a Service',
    'MAIN': 'Business Development Company',
    'MCHX': 'Digital Analytics Platform',
    'MCY': 'Auto Insurance',
    'MFA': 'Mortgage REIT',
    'MICT': 'FinTech SaaS',
    'MIND': 'Telecom Equipment',
    'MITT': 'Mortgage REIT',
    'MMI': 'Commercial RE Services',
    'MODN': 'Enterprise SaaS',
    'MSTR': 'Business Intelligence SaaS',
    'NKLA': 'EV OEM',
    'NLY': 'Mortgage REIT',
    'NYMT': 'Mortgage REIT',
    'OPRX': 'Pharma Tech',
    'OSPN': 'Identity Verification Tech',
    'PFSI': 'Mortgage Lender',
    'PLTK': 'Online Gaming',
    'PMT': 'Mortgage REIT',
    'PSEC': 'Business Development Company',
    'QADA': 'Enterprise ERP',
    'QCRH': 'Regional Banking',
    'RGA': 'Reinsurance',
    'RNST': 'Regional Banking',
    'RWT': 'Mortgage REIT',
    'SABR': 'Hospitality Technology',
    'SAFE': 'Net Lease REIT',
    'SEAT': 'Live Entertainment',
    'SGHT': 'Ophthalmic Devices',
    'SLRC': 'Business Development Company',
    'SPNT': 'Specialty Reinsurance',
    'SSTI': 'Law Enforcement Tech',
    'STWD': 'Mortgage REIT',
    'TIGO': 'Wireless Carrier',
    'TTGT': 'Business Data',
    'TWO': 'Mortgage REIT',
    'UPLD': 'Work Management SaaS',
    'XHR': 'Hotel REIT',

    // === Gap Fill Batch 2: 47 remaining symbols ===
    'ALG': 'Specialty Industrial',
    'ALHC': 'Home Health Services',
    'AMRX': 'Generic Pharma',
    'APPS': 'Digital Advertising Tech',
    'AVA': 'Electric & Gas Utility',
    'AVTR': 'Life Sciences Tools',
    'AXNX': 'Neurosurgery Devices',
    'BARK': 'Pet Products',
    'BILI': 'Streaming',
    'BKH': 'Electric & Gas Utility',
    'BRKR': 'Precision Instruments',
    'CBRL': 'Casual Dining',
    'DBX': 'Cloud Storage',
    'DM': '3D Printing',
    'DOLE': 'Packaged Foods',
    'EDU': 'EdTech',
    'EVH': 'Healthcare IT/EHR',
    'FDP': 'Packaged Foods',
    'FLWS': 'Specialty E-commerce',
    'GEVO': 'Renewable Fuels',
    'GSAT': 'Satellite Communications',
    'HTHT': 'Hotel Chain',
    'IQ': 'Streaming',
    'LIVN': 'Cardiac Therapeutics',
    'MDU': 'Diversified Utilities',
    'MGEE': 'Electric & Gas Utility',
    'NVRO': 'Neurosurgery Devices',
    'NWE': 'Electric & Gas Utility',
    'OGE': 'Electric Utility',
    'OGS': 'Gas Utility',
    'OTLY': 'Natural Foods',
    'OTTR': 'Electric & Gas Utility',
    'PACB': 'Genetic Testing',
    'PCRX': 'Specialty Pharma',
    'PETS': 'Pet E-commerce',
    'PL': 'Geospatial Intelligence',
    'POSH': 'Fashion E-commerce',
    'RGEN': 'Life Science Tools',
    'SGFY': 'Home Health Services',
    'SR': 'Gas Utility',
    'SSYS': '3D Printing',
    'TAL': 'EdTech',
    'TCOM': 'OTA',
    'TITN': 'Ag Equipment',
    'TWIST': 'Synthetic Biology',
    'WB': 'Social Platform',
    'YMM': 'Freight Brokerage',
    // --- Additional 5 ---
    'BRFS': 'Food Producer',                                   // BRF S.A. - 巴西肉类加工
    'AMWL': 'Telehealth',                                      // Amwell - 远程医疗
    'RUTH': 'Restaurant',                                      // Ruth's Chris - 高端餐饮
    'DAVE': 'Neobank',                                         // Dave - 新银行
    'NNDM': 'Industrial Automation',                           // Nano Dimension - 3D电子打印

    // ========== 64 NEW STOCKS: subIndustryOverrides ==========
    // --- Consumer Staples ---
    'SPB': 'Household Products',                               // Spectrum Brands - 家居/宠物产品
    'EPC': 'Personal Care',                                    // Edgewell Personal Care - 个护产品
    'ENR': 'Consumer Electronics',                             // Energizer - 电池/便携电源
    'TR': 'Confectionery',                                     // Tootsie Roll - 糖果
    // --- Utilities ---
    'ATO': 'Gas Utility',                                      // Atmos Energy - 天然气公用
    'ALE': 'Electric Utility',                                 // ALLETE - 电力公用
    'POR': 'Electric Utility',                                 // Portland General - 电力公用
    // --- Insurance ---
    'MKL': 'Specialty Insurance',                              // Markel - 特种保险
    'UNUM': 'Life Insurance',                                  // Unum Group - 人寿/残疾保险
    // --- Telecom / Media ---
    'LUMN': 'Fiber Telecom',                                   // Lumen Technologies - 光纤电信
    'DISH': 'Satellite TV',                                    // DISH Network - 卫星电视
    'SATS': 'Satellite Communications',                        // EchoStar - 卫星通信
    'LBRDK': 'Cable & Broadband',                              // Liberty Broadband - 有线宽带
    'NWS': 'Publishing & Media',                               // News Corp - 出版/新闻
    'IPG': 'Advertising Agency',                               // Interpublic - 广告
    'OMC': 'Advertising Agency',                               // Omnicom - 广告
    'CCO': 'Outdoor Advertising',                              // Clear Channel - 户外广告
    // --- Industrials ---
    'CSL': 'Building Products',                                // Carlisle Companies - 建材
    'SCHN': 'Scrap Metal',                                     // Schnitzer Steel - 废钢回收
    'KALU': 'Aluminum Products',                               // Kaiser Aluminum - 铝制品
    'HEES': 'Equipment Rental',                                // H&E Equipment - 设备租赁
    'TPC': 'Construction & Engineering',                       // Tutor Perini - 重型施工
    'AGX': 'Construction & Engineering',                       // Argan - 电厂建设
    'WSP': 'Engineering Services',                             // WSP Global - 工程咨询
    'MYRG': 'Electrical Construction',                         // MYR Group - 电气施工
    'APG': 'Safety Services',                                  // APi Group - 安全/消防
    'AYI': 'Lighting & Controls',                              // Acuity Brands - 照明
    'MATV': 'Specialty Materials',                             // Mativ - 特种材料
    'ITRI': 'Smart Grid',                                      // Itron - 智能电表
    // --- Tech / Electronics ---
    'DLB': 'Audio Technology',                                 // Dolby - 音频技术
    'RVTY': 'Life Sciences Tools',                             // Revvity - 生命科学
    'IQVIA': 'CRO & Health Data',                              // IQVIA - 临床研究/数据
    'CTLT': 'Pharma CDMO',                                     // Catalent - 药物CDMO
    'FN': 'Optical Manufacturing',                             // Fabrinet - 光学制造
    'FLEX': 'Electronics Manufacturing',                       // Flex - 电子代工
    'JBL': 'Electronics Manufacturing',                        // Jabil - 电子代工
    'TTMI': 'Printed Circuit Boards',                          // TTM Technologies - PCB
    'HEAR': 'Gaming Peripherals',                              // Turtle Beach - 游戏外设
    // --- Financial / Payments ---
    'EEFT': 'Cross-Border Payments',                           // Euronet - 跨境支付
    'GDOT': 'Prepaid & BaaS',                                  // Green Dot - 预付卡
    'PAYA': 'Integrated Payments',                             // Paya - B2B支付
    'BKI': 'Mortgage Technology',                              // Black Knight - 按揭科技
    'NCR': 'POS & ATM',                                        // NCR - 零售/银行科技
    'VOYA': 'Retirement Services',                             // Voya Financial - 退休服务
    'EQH': 'Life Insurance',                                   // Equitable - 寿险/资管
    'NWLI': 'Life Insurance',                                  // National Western Life - 寿险
    'WTM': 'Specialty Insurance',                              // White Mountains - 特种保险
    'TRMK': 'Community Banking',                               // Trustmark - 社区银行
    // --- Data & Analytics ---
    'INFO': 'Financial Data',                                  // IHS Markit - 金融数据
    // --- Midstream Energy ---
    'ENLC': 'Midstream Gas',                                   // EnLink - 中游天然气
    // --- Hospitality / Entertainment ---
    'DRH': 'Hotel REIT',                                       // DiamondRock - 酒店REIT
    'BALY': 'Casino & iGaming',                                // Bally's - 赌场
    // --- Airlines ---
    'HA': 'Regional Airline',                                  // Hawaiian Airlines - 地区航空
    // --- Restaurants ---
    'RRGB': 'Casual Dining',                                   // Red Robin - 休闲餐饮
    'FRGI': 'Fast Casual',                                     // Fiesta Restaurant - 快餐
    'SAFM': 'Poultry Processing',                              // Sanderson Farms - 禽肉加工
    // --- Packaging & Materials ---
    'GPK': 'Paperboard Packaging',                             // Graphic Packaging - 纸板包装
    'REYN': 'Consumer Packaging',                              // Reynolds Consumer - 消费包装
    'ATR': 'Dispensing & Closures',                            // AptarGroup - 分配/封装
    'AVY': 'Labels & Materials',                               // Avery Dennison - 标签/材料
    // --- REITs ---
    'OFC': 'Office REIT',                                      // Corporate Office - 政府办公
    'PGRE': 'Office REIT',                                     // Paramount Group - 办公REIT
    'ALEX': 'Diversified REIT',                                // Alexander & Baldwin - 夏威夷REIT
    'RLGY': 'Real Estate Services',                            // Realogy - 房产经纪

    // ========== Batch 3: 54 new stocks subIndustryOverrides ==========
    'MASI': 'Patient Monitoring Devices',                       // Masimo - 患者监护
    'AMC': 'Movie Theaters',                                    // AMC Entertainment - 电影院
    'NXST': 'TV Broadcasting',                                  // Nexstar Media - 电视广播
    'FWONK': 'Motorsports Media',                               // Liberty Formula One - F1赛事
    'ZD': 'Digital Media',                                      // Ziff Davis - 数字媒体
    'ELS': 'Manufactured Housing REIT',                         // Equity LifeStyle - MH REIT
    'TPG': 'Alternative Asset Management',                      // TPG Inc - 另类资管
    'MBLY': 'ADAS Chips',                                       // Mobileye - ADAS芯片
    'HIPPO': 'InsurTech',                                       // Hippo Holdings - 保险科技
    'KINS': 'Property Insurance',                               // Kingstone - 财产保险
    'GDYN': 'IT Consulting',                                    // Grid Dynamics - IT咨询
    'NUVEI': 'Payment Processing',                              // Nuvei - 支付处理
    'RACE': 'Luxury Automotive',                                // Ferrari - 豪华汽车
    'PII': 'Powersports',                                       // Polaris - 动力运动
    'AHCO': 'Home Medical Equipment',                           // AdaptHealth - 家庭医疗
    'RBRK': 'Data Security',                                    // Rubrik - 数据安全
    'MCFT': 'Recreational Boats',                               // MasterCraft - 游艇
    'MBUU': 'Recreational Boats',                               // Malibu Boats - 游艇
    'SHLS': 'Solar BOS Components',                             // Shoals Technologies - 太阳能BOS
    'GPRE': 'Ethanol & Biofuels',                               // Green Plains - 乙醇
    'CCRN': 'Healthcare Staffing',                              // Cross Country - 医疗人力
    'AMN': 'Healthcare Staffing',                               // AMN Healthcare - 医疗人力
    'UNM': 'Employee Benefits Insurance',                       // Unum Group - 员工保险
    'GNW': 'Long-Term Care Insurance',                          // Genworth - 长护保险
    'FLUT': 'Online Sports Betting',                            // Flutter - 体育博彩
    'PGNY': 'Fertility Benefits',                               // Progyny - 生育福利
    'SEM': 'Specialty Hospitals',                               // Select Medical - 专科医院
    'PATK': 'Building Products',                                // Patrick Industries - 建材
    'LL': 'Flooring Retail',                                    // LL Flooring - 地板零售
    'EURN': 'Crude Oil Tankers',                                // Euronav - 原油油轮
    'NAT': 'Crude Oil Tankers',                                 // Nordic American - 油轮
    'TRMD': 'Product Tankers',                                  // TORM - 成品油轮
    'HAFN': 'Product & Chemical Tankers',                       // Hafnia - 化学品油轮
    'CMRE': 'Containership Leasing',                            // Costamare - 集装箱租赁
    'GSL': 'Containership Leasing',                             // Global Ship Lease - 集装箱
    'ASC': 'LPG Carriers',                                      // Ardmore Shipping - LPG船
    'TDC': 'Enterprise Data Analytics',                         // Teradata - 数据分析
    'SDC': 'DTC Dental',                                        // SmileDirectClub - DTC正畸
    'HCP': 'Healthcare IT',                                     // HashiCorp Health - 医疗IT
    'SN': 'Specialty Metals',                                   // SharkNinja - 特种金属
    'SMP': 'Auto Aftermarket Parts',                            // Standard Motor - 汽配
    'SCHL': 'Publishing',                                       // Scholastic - 出版
    'HMH': 'Educational Content',                               // HMH - 教育内容
    'BKD': 'Senior Living',                                     // Brookdale - 养老社区
    'NXE': 'Uranium Mining',                                    // NexGen Energy - 铀矿
    'JKS': 'Solar Module Manufacturing',                        // JinkoSolar - 太阳能组件
    'DQ': 'Polysilicon Manufacturing',                          // Daqo - 多晶硅
    'CSIQ': 'Solar Module Manufacturing',                       // Canadian Solar - 太阳能
    'BEPC': 'Renewable Power Generation',                       // Brookfield Renewable - 可再生能源
    'CPLP': 'LNG Carrier Leasing',                              // Capital Product - LNG船
    'CLDR': 'Enterprise Data Cloud',                            // Cloudera - 数据云
    'KRTX': 'Neuroscience Biotech',                             // Karuna - 神经精神药
    'PACW': 'Technology Banking',                               // PacWest - 科技银行
    'BFLY': 'Point-of-Care Ultrasound',                         // Butterfly - 便携超声
    'PRTS': 'Online Auto Parts',                                // CarParts.com - 在线汽配
    'KGS': 'Natural Gas Utility',                               // Kodiak Gas - 天然气公用
    'SAIL': 'Identity Security',                                // SailPoint - 身份安全
    'MIME': 'Email Security',                                   // Mimecast - 邮件安全
// ========== 70 NEW STOCKS ==========
    'NTES': 'Online Gaming',                                    // NetEase - 网络游戏
    'TME': 'Music Streaming',                                   // Tencent Music - 音乐流媒体
    'VIPS': 'Discount E-Commerce',                              // Vipshop - 折扣电商
    'ZTO': 'Express Delivery',                                  // ZTO Express - 快递物流
    'BEKE': 'Real Estate Platform',                             // KE Holdings - 房产平台
    'FUTU': 'Digital Brokerage',                                // Futu - 互联网券商
    'DIDI': 'Ride-Hailing',                                     // DiDi - 出行平台
    'LKNCY': 'Coffee Chain',                                    // Luckin Coffee - 咖啡连锁
    'TIGR': 'Digital Brokerage',                                // UP Fintech - 互联网券商
    'GAP': 'Apparel Retail',                                    // Gap Inc - 服装零售
    'PKI': 'Life Science Instruments',                          // PerkinElmer - 生命科学
    'MACOM': 'RF Semiconductors',                               // MACOM - RF芯片
    'CHH': 'Hotel Franchise',                                   // Choice Hotels - 酒店特许
    'RYAAY': 'Low-Cost Airline',                                // Ryanair - 廉价航空
    'CPA': 'Regional Airline',                                  // Copa Holdings - 拉美航空
    'AZUL': 'Regional Airline',                                 // Azul - 巴西航空
    'AC': 'Full-Service Airline',                               // Air Canada - 加拿大航空
    'BLDE': 'Air Mobility',                                     // Blade - 空中出行
    'SPCE': 'Space Tourism',                                    // Virgin Galactic - 太空旅游
    'MMYT': 'OTA',                                              // MakeMyTrip - 印度OTA
    'PEG': 'Electric Utility',                                  // PSEG - 电力公用事业
    'XP': 'Digital Brokerage',                                  // XP Inc - 巴西券商
    'BAM': 'Alternative Asset Management',                      // Brookfield AM - 另类资管
    'RE': 'Reinsurance',                                        // Everest Re - 再保险
    'LPRO': 'Auto Lending Technology',                          // Open Lending - 汽车贷款
    'ARCC': 'Business Development Company',                     // Ares Capital - BDC
    'HTGC': 'Business Development Company',                     // Hercules Capital - BDC
    'ORCC': 'Business Development Company',                     // Owl Rock Capital - BDC
    'BXSL': 'Business Development Company',                     // Blackstone SL - BDC
    'IEP': 'Diversified Conglomerate',                          // Icahn Enterprises - 综合集团
    'FROG': 'DevOps Platform',                                  // JFrog - DevOps
    'PEGA': 'BPM Software',                                    // Pegasystems - BPM
    'GWRE': 'Insurance Technology',                             // Guidewire - 保险科技
    'SSNC': 'Financial Software',                               // SS&C - 金融软件
    'FVRR': 'Freelance Marketplace',                            // Fiverr - 自由职业
    'DAVA': 'IT Services',                                      // Endava - IT服务
    'VMW': 'Virtualization Software',                           // VMware - 虚拟化
    'YEXT': 'Digital Presence Platform',                        // Yext - 数字存在
    'GRPN': 'Local Commerce',                                   // Groupon - 本地团购
    'ANGI': 'Home Services Marketplace',                        // Angi - 家居服务
    'DOXI': 'Physician Network',                                // Doximity - 医生网络
    'PLAN': 'Enterprise Planning',                              // Anaplan - 企业规划
    'UDMY': 'Online Education',                                 // Udemy - 在线教育
    'BYND': 'Plant-Based Meat',                                 // Beyond Meat - 植物肉
    'LW': 'Frozen Potato Products',                             // Lamb Weston - 冷冻薯条
    'HYLN': 'EV Powertrain',                                    // Hyliion - EV动力
    'GOEV': 'Electric Vehicle',                                 // Canoo - 电动车
    'PTRA': 'Electric Bus',                                     // Proterra - 电动巴士
    'TELL': 'LNG Development',                                  // Tellurian - LNG开发
    'CHK': 'Natural Gas E&P',                                   // Chesapeake - 天然气
    'VRM': 'Online Auto Retail',                                // Vroom - 线上二手车
    'WESCO': 'Electrical Distribution',                         // WESCO - 电气分销
    'MDC': 'Homebuilding',                                      // MDC Holdings - 住宅建设
    'DFH': 'Homebuilding',                                      // Dream Finders - 住宅建设
    'CVCO': 'Manufactured Housing',                             // Cavco - 预制房屋
    'LEGH': 'Manufactured Housing',                             // Legacy Housing - 预制房屋
    'RMAX': 'Real Estate Franchise',                            // RE/MAX - 房产经纪
    'RGLD': 'Precious Metals Royalty',                          // Royal Gold - 贵金属版税
    'IAG': 'Gold Mining',                                       // IAMGOLD - 黄金矿业
    'AGI': 'Gold Mining',                                       // Alamos Gold - 黄金矿业
    'INFN': 'Optical Networking',                               // Infinera - 光网络
    'COMM': 'Network Infrastructure',                           // CommScope - 网络基建
    'AAOI': 'Optical Components',                               // Applied Optoelectronics - 光器件
    'GILT': 'Satellite Networking',                             // Gilat Satellite - 卫星网络
    'BITF': 'Bitcoin Mining',                                   // Bitfarms - 比特币挖矿
    'BYD': 'Casino & Gaming',                                   // Boyd Gaming - 赌场博彩
    'LAZR': 'Lidar Sensors',                                    // Luminar - 激光雷达
    'OUST': 'Lidar Sensors',                                    // Ouster - 激光雷达
    'LILM': 'eVTOL Aircraft',                                   // Lilium - 电动飞行器
    'SWI': 'IT Management Software',                            // SolarWinds - IT管理
    'CRTO': 'Performance Advertising',                          // Criteo - 效果广告

    // ========== 补充69只: Healthcare/Biotech/MedTech subIndustryOverrides ==========
    'ABCL': 'Antibody Discovery',                             // AbCellera - 抗体发现
    'ACRS': 'Dermatology Biotech',                            // Aclaris - 皮肤科生物
    'ADPT': 'Immune Diagnostics',                             // Adaptive Biotech - 免疫诊断
    'ADVM': 'Gene Therapy',                                   // Adverum - 基因治疗
    'AFMD': 'Immuno-Oncology',                                // Affimed - 免疫肿瘤
    'ALDX': 'Ophthalmology Biotech',                          // Aldeyra - 眼科生物
    'ANGO': 'Vascular Access Devices',                        // AngioDynamics - 血管通路
    'ANIP': 'Specialty Generics',                             // ANI Pharma - 特种仿制药
    'ANNX': 'Rare Disease Biotech',                           // Annexon - 罕见病生物
    'AORT': 'Cardiovascular Devices',                         // Artivion - 心血管器械
    'APYX': 'Energy-Based Surgical Devices',                  // Apyx Medical - 能量手术
    'BNR': 'Health IT',                                       // Burning Rock - 健康信息
    'CABA': 'ADC Biotech',                                    // Cabaletta - ADC生物
    'CANO': 'Primary Care',                                   // Cano Health - 初级保健
    'CERS': 'Surgical Sensing',                               // Cerus - 手术感知
    'CKPT': 'Immuno-Oncology',                                // Checkpoint - 免疫肿瘤
    'CLOV': 'Medicare Advantage',                             // Clover Health - 医保优势
    'CLVR': 'Health Data Analytics',                          // Clever Leaves - 健康数据
    'CNMD': 'Surgical Devices',                               // CONMED - 外科器械
    'COO': 'Contact Lens & Women Health',                     // CooperCompanies - 隐形眼镜
    'CRIS': 'Precision Oncology',                             // Curis - 精准肿瘤
    'CTMX': 'Antibody Biotech',                              // CytomX - 抗体生物
    'ELEV': 'Obesity Biotech',                                // Elevation Oncology - 肥胖生物
    'EMBC': 'Vascular Devices',                               // Embecta - 血管器械
    'EPZM': 'Epigenetics Biotech',                            // Epizyme - 表观遗传
    'ESTA': 'Aesthetic Devices',                              // Establishment Labs - 医美器械
    'ICUI': 'Infusion Therapy',                               // ICU Medical - 输液治疗
    'IGMS': 'Antibody Engineering',                           // IGM Biosciences - 抗体工程
    'IMCR': 'Immuno-Oncology',                                // Immunocore - 免疫肿瘤
    'INSM': 'Rare Disease Pharma',                            // Insmed - 罕见病制药
    'IRWD': 'GI Pharma',                                     // Ironwood Pharma - 消化道
    'ITGR': 'Surgical Instruments',                           // Integer Holdings - 手术器械
    'ITOS': 'Immuno-Oncology',                                // iTeos - 免疫肿瘤
    'LMAT': 'Cardiovascular Devices',                         // LeMaitre - 心血管器械
    'LUNG': 'Pulmonary Devices',                              // Pulmonx - 肺部器械
    'LYEL': 'Cell Therapy',                                   // Lyell Immunopharma - 细胞治疗
    'MDXG': 'Regenerative Medicine',                          // MiMedx - 再生医学
    'NARI': 'Neurovascular Devices',                          // Inari Medical - 神经血管
    'NBWR': 'Wound Care Devices',                             // MiMedx Wound - 伤口护理
    'NEOG': 'Food & Animal Safety',                           // Neogen - 食品/动物安全
    'NUVA': 'Spine Surgery Devices',                          // NuVasive - 脊柱手术
    'OCUL': 'Ophthalmology Biotech',                          // Ocular Therapeutix - 眼科
    'OFIX': 'Orthopedic Devices',                             // Orthofix - 骨科器械
    'ORIC': 'Oncology Biotech',                               // ORIC Pharma - 肿瘤生物
    'PEN': 'GI Devices',                                      // Penumbra - 消化道器械
    'PETQ': 'Veterinary Pharma',                              // PetIQ - 兽药
    'PLRX': 'ADC Biotech',                                   // Pliant - ADC生物
    'PPD': 'Clinical Research CRO',                           // PPD - CRO临床研究
    'PRTA': 'Neurodegeneration Biotech',                      // Prothena - 神经退行
    'RPTX': 'Precision Oncology',                             // Repare - 精准肿瘤
    'RVNC': 'Medical Aesthetics',                             // Revance - 医美注射
    'SANA': 'Cell Therapy',                                   // Sana Biotech - 细胞治疗
    'SENS': 'CGM Devices',                                    // Senseonics - 连续血糖
    'SIBN': 'Spine Surgery Devices',                          // SI-BONE - 脊柱器械
    'SILK': 'Robotic Surgery',                                // Silk Road Medical - 机器人手术
    'SPNE': 'Spine Surgery Devices',                          // SeaSpine - 脊柱器械
    'SRRK': 'Neuroscience Biotech',                           // Scholar Rock - 神经科学
    'STAA': 'Ophthalmic Devices',                             // STAAR Surgical - 眼科器械
    'STVN': 'Radiotherapy Devices',                           // Stevanato - 放疗器械
    'SUPN': 'CNS Pharma',                                    // Supernus - CNS制药
    'SWAV': 'Cardiovascular Devices',                         // ShockWave - 心血管器械
    'TALK': 'Digital Mental Health',                          // Talkspace - 数字心理
    'TCRR': 'TCR Therapy',                                   // TCR2 Therapeutics - TCR疗法
    'TCRT': 'TCR Therapy',                                   // Alaunos - TCR疗法
    'TMCI': 'Robotic Surgery',                                // TransMedics - 机器人手术
    'TRIL': 'Immuno-Oncology',                                // Trillium - 免疫肿瘤
    'TYRA': 'Precision Oncology',                             // Tyra Biosciences - 精准肿瘤
    'VINC': 'Gene Therapy',                                   // Vincerx - 基因治疗
    'VTYX': 'Autoimmune Biotech',                             // Ventyx - 自身免疫

    // ========== 80 NEW S&P 500 / Russell 1000: subIndustryOverrides ==========
    // --- IT Services / Data Analytics ---
    'CDW': 'IT Solutions Distribution',                          // CDW - IT分销方案
    'IT': 'Research & Advisory',                                 // Gartner - 研究咨询
    'VRSN': 'Domain Registry',                                   // VeriSign - 域名注册
    'EFX': 'Credit Bureau & Analytics',                          // Equifax - 信用数据
    'TRU': 'Credit Bureau & Analytics',                          // TransUnion - 信用数据
    'DXC': 'IT Outsourcing',                                     // DXC Technology - IT外包
    'DOX': 'IT Services',                                        // Amdocs - IT服务
    'GIB': 'IT Consulting',                                      // CGI Group - IT咨询
    'BL': 'Financial Accounting Software',                       // BlackLine - 财务SaaS
    'VERINT': 'Customer Engagement Software',                    // Verint - 客户分析
    // --- Industrials / Building Products ---
    'IDEX': 'Specialty Pumps & Flow Control',                    // IDEX - 特种泵/流控
    'FBHS': 'Building Products',                                 // Fortune Brands - 家居建材
    'BLD': 'Insulation Installation',                            // TopBuild - 隔热安装
    'PGTI': 'Impact-Resistant Windows',                          // PGT - 防风窗户
    'MODG': 'Golf & Entertainment',                              // Topgolf Callaway - 高尔夫
    // --- Asset Management ---
    'VCTR': 'Multi-Boutique Asset Management',                   // Victory Capital - 资管
    'APAM': 'Active Asset Management',                           // Artisan Partners - 主动管理
    'HLNE': 'Alternative Investment Advisory',                   // Hamilton Lane - 另类投资
    'FGL': 'Annuity Insurance',                                  // FGL Holdings - 年金保险
    // --- Restaurants ---
    'ARCO': 'QSR Franchise (Latin America)',                     // Arcos Dorados - 拉美快餐
    'NDLS': 'Fast Casual Dining',                                // Noodles & Company - 面食
    'CHUY': 'Casual Dining (Tex-Mex)',                           // Chuy's - 墨西哥餐厅
    // --- Retail / Apparel ---
    'UA': 'Athletic Apparel & Footwear',                         // Under Armour - 运动服饰
    'CRI': 'Children Apparel',                                   // Carter's - 童装
    'ASO': 'Sporting Goods Retail',                              // Academy Sports - 体育用品
    'CAL': 'Footwear Retail',                                    // Caleres - 鞋类零售
    'HIBB': 'Athletic Footwear Retail',                          // Hibbett - 运动鞋零售
    'KTB': 'Casual Apparel',                                     // Kontoor Brands - 休闲服饰
    // --- Healthcare Distribution ---
    'OMI': 'Medical Supply Distribution',                        // Owens & Minor - 医疗分销
    // --- Media / Entertainment ---
    'FWONA': 'Motorsports Media',                                // Liberty F1 - 赛车媒体
    'SONY': 'Consumer Electronics & Entertainment',              // Sony - 电子娱乐
    'NTDOY': 'Gaming Console & Software',                        // Nintendo - 游戏主机
    'MSG': 'Sports & Entertainment Venues',                      // MSG - 体育场馆
    'WDDD': 'Digital Media Services',                            // Wideopenwest - 数字媒体
    'TDS': 'Rural Telecom',                                      // TDS - 农村电信
    // --- Financials ---
    'BOKF': 'Regional Banking (Energy)',                         // BOK Financial - 区域银行
    'JEF': 'Investment Banking',                                 // Jefferies - 投行
    'VIRTU': 'Electronic Market Making',                         // Virtu - 电子做市
    // --- Energy (Canadian Oil & Gas) ---
    'SU': 'Oil Sands Integrated',                                // Suncor - 油砂整合
    'CNQ': 'Oil Sands E&P',                                      // Canadian Natural - 油砂E&P
    'CVE': 'Oil Sands Integrated',                               // Cenovus - 油砂整合
    'IMO': 'Oil Sands Integrated',                               // Imperial Oil - 油砂整合
    // --- Chemicals ---
    'MEOH': 'Methanol Production',                               // Methanex - 甲醇生产
    'HUN': 'Specialty Chemicals (Polyurethanes)',                 // Huntsman - 聚氨酯
    'BRBR': 'Protein & Nutrition',                               // BellRing Brands - 蛋白营养
    // --- Utilities ---
    'TXNM': 'Electric Utility (Southwest)',                      // TXNM Energy - 电力公用
    // --- Consumer Staples ---
    'BF': 'Premium Spirits',                                     // Brown-Forman - 高端烈酒
    // --- Tech Distribution ---
    'AVT': 'Electronic Components Distribution',                 // Avnet - 电子元件分销
    'ARW': 'Electronic Components Distribution',                 // Arrow Electronics - 电子分销
    'SNX': 'IT Products Distribution',                           // TD SYNNEX - IT分销
    // --- Mining / Precious Metals ---
    'PKX': 'Integrated Steel',                                   // POSCO - 综合钢铁
    'EGO': 'Gold Mining',                                        // Eldorado Gold - 黄金矿业
    'BTG': 'Gold Mining',                                        // B2Gold - 黄金矿业
    'AG': 'Silver Mining',                                       // First Majestic - 白银矿业
    'HL': 'Silver & Base Metals Mining',                         // Hecla Mining - 白银矿业
    'PAAS': 'Silver Mining',                                     // Pan American Silver - 白银
    'CDE': 'Silver Mining',                                      // Coeur Mining - 白银矿业
    'SSRM': 'Gold Mining',                                       // SSR Mining - 黄金矿业
    'SBSW': 'PGM Mining',                                        // Sibanye-Stillwater - PGM矿
    // --- Sports / Recreation ---
    'ELY': 'Golf Equipment & Entertainment',                     // Callaway/Topgolf - 高尔夫
    // --- Additional: Packaging / Equipment / Exchange ---
    'OI': 'Glass Packaging',                                     // O-I Glass - 玻璃包装
    'TORO': 'Outdoor Power Equipment',                           // Toro Company - 户外设备
    'LSEG': 'Financial Market Infrastructure',                   // London Stock Exchange - 交易所
    'CUTR': 'Medical Aesthetics Devices',                        // Cutera - 医美设备

    // ========== Batch 6: 80 NEW mid/large-cap subIndustryOverrides ==========
    // --- Building / Construction ---
    'CNM': 'Water & Fire Protection Distribution',               // Core & Main - 水务分销
    'USLM': 'Lime & Limestone',                                  // US Lime - 石灰石
    'BCC': 'Engineered Wood Products',                            // Boise Cascade - 木制品
    // --- Insurance / Mortgage Insurance ---
    'JRVR': 'Specialty Insurance',                                // James River - 特种保险
    'STC': 'Title Insurance',                                     // Stewart Info - 产权保险
    'NMI': 'Mortgage Insurance',                                  // NMI Holdings - 抵押保险
    'MGIC': 'Mortgage Insurance',                                 // MGIC - 抵押保险
    // --- Telecom / Internet ---
    'GOOG': 'Internet Services & Cloud',                          // Alphabet C - 互联网
    'EXTR': 'Enterprise Networking',                              // Extreme Networks - 企业网络
    'IDCC': 'Wireless Technology Licensing',                      // InterDigital - 无线专利
    // --- Chemicals / Materials / Steel ---
    'TMST': 'Specialty Steel',                                    // TimkenSteel - 特种钢
    'TX': 'Flat Steel Products',                                  // Ternium - 拉美钢铁
    'SID': 'Integrated Steel',                                    // CSN - 巴西综合钢铁
    // --- Pharma / Healthcare ---
    'NOVO': 'GLP-1 Diabetes & Obesity',                           // Novo Nordisk - GLP-1药物
    'TAK': 'Diversified Pharma',                                  // Takeda - 多元化制药
    'RHHBY': 'Pharma & Diagnostics',                              // Roche - 肿瘤/诊断
    'SOLV': 'Healthcare Products',                                // Solventum - 医疗产品
    'SHC': 'Sterilization Services',                              // Sotera Health - 灭菌服务
    'AMEH': 'Physician Practice Management',                      // Apollo Medical - 医师管理
    'RCM': 'Healthcare Revenue Cycle',                            // R1 RCM - 医疗收入周期
    'DNA': 'Synthetic Biology',                                   // Ginkgo Bioworks - 合成生物
    // --- Payments / Finance ---
    'CPAY': 'Corporate Payments',                                 // Corpay - 企业支付
    'OMF': 'Consumer Lending',                                    // OneMain - 消费贷
    'OPFI': 'Online Consumer Lending',                            // OppFi - 在线贷款
    'BXMT': 'Commercial Mortgage REIT',                           // Blackstone Mortgage - 商业抵押
    'MC': 'Investment Banking Advisory',                          // Moelis - 投行咨询
    'SF': 'Diversified Financial Services',                       // Stifel - 多元金融
    'SSB': 'Regional Banking',                                    // SouthState - 区域银行
    // --- Asset Management ---
    'AB': 'Diversified Asset Management',                         // AllianceBernstein - 资产管理
    'WETF': 'ETF Asset Management',                               // WisdomTree - ETF资管
    // --- Consumer / Retail ---
    'WWW': 'Footwear & Apparel',                                  // Wolverine - 鞋类
    'DDD': '3D Printing',                                         // 3D Systems - 3D打印
    // --- Services ---
    'ROL': 'Pest Control Services',                               // Rollins - 害虫防治
    'FCN': 'Management Consulting',                               // FTI Consulting - 管理咨询
    'DRVN': 'Automotive Aftermarket Services',                    // Driven Brands - 汽车服务
    'PLUS': 'IT Solutions Provider',                              // ePlus - IT方案
    'SCS': 'Office Furniture',                                    // Steelcase - 办公家具
    'WLFC': 'Aircraft Engine Leasing',                            // Willis Lease - 发动机租赁
    // --- Energy / Mining ---
    'NFE': 'LNG Infrastructure',                                  // New Fortress - LNG基础设施
    'WHD': 'Wellhead Equipment',                                  // Cactus - 井口设备
    'OII': 'Subsea Robotics',                                     // Oceaneering - 水下机器人
    'NE': 'Offshore Drilling',                                    // Noble Corp - 海上钻井
    'PBR': 'Integrated Oil & Gas',                                // Petrobras - 巴西石油
    'XPRO': 'Well Flow Management',                               // Expro - 油井管理
    'AU': 'Gold Mining',                                          // AngloGold Ashanti - 金矿
    // --- Utilities ---
    'ETR': 'Integrated Electric Utility',                         // Entergy - 电力公用
    // --- Industrials ---
    'FLS': 'Flow Control Equipment',                              // Flowserve - 泵/阀
    // --- Media ---
    'SBGI': 'TV Broadcasting',                                    // Sinclair - 电视台
    'SSP': 'TV Broadcasting',                                     // E.W. Scripps - 电视广播
    'TGNA': 'TV Broadcasting',                                    // Tegna - 电视广播
    'GCI': 'Newspaper & Digital Media',                           // Gannett - 报业
    'LEE': 'Newspaper Publishing',                                // Lee Enterprises - 报业
    'RADI': 'Outdoor Advertising',                                // Radius Global - 户外广告
    // --- Gaming / Leisure ---
    'MTN': 'Ski Resorts',                                         // Vail Resorts - 滑雪度假
    'MLCO': 'Macau Casino',                                       // Melco Resorts - 澳门博彩
    // ========== Batch 7: 31 new stocks subIndustryOverrides ==========
    // --- Connectivity / Telecom ---
    'GOGO': 'Aviation Connectivity',                                // Gogo - 机载互联网
    // --- Consumer Products ---
    'GOLF': 'Golf Equipment',                                       // Acushnet - 高尔夫器材(Titleist)
    'GPRO': 'Action Cameras',                                       // GoPro - 运动相机
    'HNST': 'Clean Consumer Products',                              // Honest Company - 清洁消费品
    'MNSO': 'Value Lifestyle Retail',                               // MINISO - 生活好物零售
    // --- Healthcare / Facility Services ---
    'HCSG': 'Healthcare Facility Services',                         // Healthcare Services Group - 医疗设施服务
    // --- Insurance ---
    'HGTY': 'Specialty Insurance',                                  // Hagerty - 经典车保险
    // --- Semiconductors / Electronics ---
    'HIMX': 'Display Driver ICs',                                   // Himax - 显示驱动IC
    'IPGP': 'Industrial Fiber Lasers',                              // IPG Photonics - 光纤激光器
    'KOPN': 'Microdisplay Technology',                              // Kopin - 微显示器
    'MXL': 'Mixed-Signal Semiconductors',                           // MaxLinear - 混合信号芯片
    'NSSC': 'Security & IoT Semiconductors',                        // NAPCO Security - 安防IoT芯片
    'NVMI': 'Semiconductor Metrology',                              // Nova Ltd - 半导体量测
    // --- Financial Services ---
    'KREF': 'Commercial Mortgage REIT',                             // KKR Real Estate Finance - 商业地产抵押REIT
    'MGI': 'Money Transfer',                                        // MoneyGram - 汇款
    'MGP': 'Gaming REIT',                                           // MGM Growth Properties - 博彩REIT
    'LSPD': 'Commerce Platform',                                    // Lightspeed Commerce - 商务平台
    // --- Auto / Vehicle ---
    'IAA': 'Vehicle Auction',                                       // IAA Inc - 汽车拍卖
    'MTOR': 'Powersports & Marine',                                 // Meritor - 动力运动与船舶
    // --- Gaming / Entertainment ---
    'IGT': 'Lottery & Gaming Systems',                              // International Game Technology - 彩票与博彩系统
    'LNW': 'Gaming Equipment',                                      // Light & Wonder - 博彩设备
    // --- Education ---
    'LAUR': 'International Education',                              // Laureate Education - 国际教育
    'LINC': 'Vocational Education',                                 // Lincoln Educational - 职业教育
    // --- Fitness ---
    'LTH': 'Premium Fitness',                                       // Life Time Group - 高端健身
    // --- Industrial / Environmental ---
    'MIR': 'Radiation Detection',                                   // Mirion Technologies - 辐射检测
    'MNTK': 'Environmental Services',                               // Montrose Environmental - 环保服务
    'NEX': 'Oilfield Completions',                                  // NexTier Oilfield - 油田完井
    // --- Utilities ---
    'MSEX': 'Water Utility',                                        // Middlesex Water - 水务
    'NJR': 'Natural Gas Utility',                                   // New Jersey Resources - 天然气公用事业
    'NEP': 'Renewable Energy Yieldco',                              // NextEra Energy Partners - 清洁能源YieldCo
    // --- Technology / Self-Service ---
    'NATL': 'ATM & Self-Service Banking',                           // NCR Atleos - ATM/自助银行

    // ========== Batch 8: 16 new stocks subIndustryOverrides ==========
    'PAHC': 'Animal Health Products',                                // Phibro Animal Health - 动物保健产品
    'PAY': 'Bill Payment Technology',                                // Paymentus - 账单支付技术
    'PING': 'Identity Security',                                     // Ping Identity - 身份安全
    'PLXS': 'Electronics Manufacturing Services',                    // Plexus Corp - 电子代工服务
    'PNNT': 'Business Development Company',                          // PennantPark - 业务发展公司
    'PRMW': 'Water Solutions',                                       // Primo Water - 饮用水解决方案
    'RGP': 'Professional Consulting',                                // Resources Connection - 专业咨询
    'SANM': 'Electronics Manufacturing Services',                    // Sanmina - 电子代工服务
    'SECU': 'Insurance & Mortgage Services',                         // Security National Financial - 保险与抵押服务
    'SHYF': 'Specialty Vehicles',                                    // Shyft Group - 专用车辆
    'SSTK': 'Stock Media Platform',                                  // Shutterstock - 图片素材平台
    'ST': 'Sensors & Controls',                                      // Sensata Technologies - 传感器与控制
    'TTEC': 'Customer Experience Services',                          // TTEC Holdings - 客户体验服务
    'USCR': 'Ready-Mix Concrete',                                    // U.S. Concrete - 预拌混凝土
    'USM': 'Regional Wireless Carrier',                              // US Cellular - 区域无线运营商
    'VNET': 'China Data Centers',                                    // VNET Group - 中国数据中心

    // ========== Batch 9: 20 new stocks subIndustryOverrides ==========
    // --- Construction / Materials ---
    'ACA': 'Construction Products & Aggregates',                       // Arcosa - 建筑产品与骨料
    // --- Energy ---
    'AESI': 'Proppant & Oilfield Services',                           // Atlas Energy Solutions - 压裂支撑剂与油田服务
    // --- Real Estate ---
    'AIRC': 'Apartment REIT',                                          // Apartment Income REIT - 公寓REIT
    // --- Education ---
    'APEI': 'Online Education',                                        // American Public Education - 在线教育
    // --- Banking ---
    'ASB': 'Regional Banking',                                         // Associated Banc-Corp - 区域银行
    'FHB': 'Regional Banking',                                         // First Hawaiian Bank - 区域银行(夏威夷)
    // --- Semiconductor ---
    'ASX': 'Semiconductor Packaging',                                  // ASE Technology - 半导体封装
    // --- Utilities ---
    'AWR': 'Water Utility',                                            // American States Water - 水务公用事业
    // --- Security / Logistics ---
    'BCO': 'Security & Cash Logistics',                                // Brink's - 安保与现金物流
    // --- Pharmaceuticals ---
    'BHC': 'Specialty Pharma',                                         // Bausch Health - 特种制药
    // --- Electronics Manufacturing ---
    'BHE': 'Electronics Manufacturing Services',                       // Benchmark Electronics - 电子代工服务
    'CLS': 'Electronics Manufacturing Services',                       // Celestica - 电子代工服务
    // --- Telecom / Cable ---
    'CABO': 'Cable & Broadband',                                       // Cable One - 有线电视与宽带
    // --- Automotive ---
    'CARS': 'Auto Marketplace',                                        // Cars.com - 汽车交易平台
    // --- Cloud / IT ---
    'CCSI': 'Cloud Fax & Digital Documents',                           // Consensus Cloud Solutions - 云传真与数字文档
    // --- Data & Analytics ---
    'CLVT': 'Research Analytics & IP',                                 // Clarivate - 研究分析与知识产权
    // --- Gaming Peripherals ---
    'CRSR': 'Gaming Peripherals & Components',                         // Corsair Gaming - 游戏外设与组件
    // --- Specialty Trucks ---
    'CTOS': 'Specialty Truck Rental & Sales',                          // Custom Truck One Source - 特种卡车租赁与销售
    // --- Medical Devices ---
    'ENOV': 'Orthopedic & Surgical Devices',                           // Enovis - 骨科与手术器械
    // --- Diversified ---
    'GHC': 'Diversified Media & Education',                            // Graham Holdings - 多元化媒体与教育

    // ========== Batch: Small-cap Biotech/Pharma & Healthcare Services (Jan 2026) ==========
    'ANIK': 'Regenerative Medicine',                                      // Anika Therapeutics - 再生医学/透明质酸
    'ARNA': 'GI & Inflammation Biotech',                                  // Arena Pharmaceuticals - GI/炎症
    'BHG': 'Behavioral Health Services',                                  // Bright Health - 行为健康服务
    'BLFS': 'Cell Therapy Biopreservation',                               // BioLife Solutions - 细胞治疗保存
    'CALA': 'Oncology Biotech',                                           // Calithera - RAS靶向肿瘤
    'CERE': 'Gene Therapy Biotech',                                       // Cerevel Therapeutics - 基因治疗/神经
    'CGEN': 'Computational Drug Discovery',                               // Compugen - 计算生物学药物发现
    'CNSP': 'CNS Oncology Biotech',                                       // CNS Pharmaceuticals - CNS肿瘤
    'COGT': 'Cell Therapy Biotech',                                       // Cogent - NK细胞治疗
    'DARE': 'Womens Health Pharma',                                       // Dare Bioscience - 女性健康制药
    'DMTK': 'Dermatology Diagnostics',                                    // DermTech - 皮肤基因组诊断
    'ETON': 'Specialty Injectable Pharma',                                // Eton Pharmaceuticals - 特种注射药
    'EVLO': 'Protein Engineering Biotech',                                // Evolvus - 蛋白质工程生物技术
    'GALT': 'Fibrosis Biotech',                                           // Galectin Therapeutics - 半乳糖凝集素/纤维化
    'GHRS': 'Endocrinology Pharma',                                       // GH Research - 内分泌/生长激素
    'HARP': 'Oncology Antibody Biotech',                                  // Harpoon Therapeutics - 肿瘤抗体
    'ICPT': 'Liver Disease Pharma',                                       // Intercept Pharma - NASH/PBC肝病
    'LXRX': 'Metabolic Disease Biotech',                                  // Lexicon - 糖尿病/代谢
    'MDXH': 'Radiology & Telehealth',                                     // MDxHealth - 放射/远程医疗
    'MLAB': 'Life Science Tools',                                         // Mesa Labs - 灭菌/实验室设备
    'MRSN': 'ADC Oncology Biotech',                                       // Mersana - 抗体药物偶联
    'NKTR': 'Polymer Conjugate Biotech',                                  // Nektar Therapeutics - 聚合物偶联
    'OBSV': 'Reproductive Health Biotech',                                // ObsEva - 女性生殖健康
    'ONCT': 'Oncology Biotech',                                           // Onconova - 肿瘤激酶抑制
    'ONEM': 'Digital Primary Care',                                       // 1Life Healthcare - 数字初级保健
    'OPGN': 'Infectious Disease Diagnostics',                             // OpGen - 感染病快速诊断
    'OTIC': 'Otology Biotech',                                            // Otonomy - 耳科/听力治疗
    'PLSE': 'Lithotripsy Devices',                                        // Pulse Biosciences - 碎石设备
    'PRLD': 'Autoimmune Biotech',                                         // Prelude Therapeutics - 自免/炎症
    'PRTX': 'Conditional Activation Biotech',                             // ProTx - 条件激活肿瘤靶向
    'QDEL': 'Rapid Point-of-Care Diagnostics',                            // QuidelOrtho - 快速即时诊断
    'REPL': 'Gene Therapy Biotech',                                       // Replimune - 基因治疗/罕见病
    // ========== Batch: Small-Cap Tech/SaaS/Fintech (Jan 2026) ==========
    'AAN': 'Lease-to-Own Retail',                                           // Aarons Holdings - 租赁零售
    'AMSF': 'Workers Compensation Insurance',                               // AMERISAFE - 工伤保险
    'AMWD': 'Cabinetry & Building Products',                                // American Woodmark - 橱柜建材
    'APSG': 'Professional Staffing & Services',                             // Applied Signal - 专业人力服务
    'BBSI': 'PEO & HR Services',                                            // Barrett Business Services - PEO/HR
    'CASA': '5G Telecom Equipment',                                          // Casa Systems - 5G电信设备
    'CASS': 'Payment & Information Services',                                // Cass Information - 支付信息服务
    'CLDN': 'Cloud Identity Security',                                       // Clarivate/Celldene - 云身份安全
    'CMBM': 'Fixed Wireless Broadband Equipment',                           // Cambium Networks - 固定无线宽带
    'COUP': 'Procurement SaaS',                                             // Coupa Software - 采购管理SaaS
    'DCT': 'Clean Energy Software',                                          // Duck Creek - 清洁能源软件
    'DH': 'Healthcare Data Analytics SaaS',                                  // Definitive Healthcare - 医疗数据SaaS
    'KVYO': 'Marketing Automation Platform',                                 // Klaviyo - 营销自动化平台
    'LAWS': 'Vertical Industry ERP SaaS',                                    // Lawson - 垂直行业ERP
    'NOMD': 'Specialty Packaging',                                           // Nomad Foods - 特种包装
    'OPAD': 'Real Estate Technology Platform',                               // Offerpad - 房地产科技平台

    // ========== Batch: Financials/Banks/Insurance/Industrials (Jan 2026 - Set D) ==========
    'AAWW': 'Air Cargo & Leasing',                                           // Atlas Air - 货运航空/飞机租赁
    'ABUS': 'Gene Editing Biotech',                                          // Arbutus Biopharma - 基因编辑/RNA
    'AGO': 'Financial Guarantee Insurance',                                  // Assured Guaranty - 债券担保保险
    'BRKL': 'Regional Banking',                                              // Brookline Bancorp - 马萨诸塞区域银行
    'CIGI': 'Commercial Real Estate Services',                               // Colliers International - 商业地产服务
    'CNOB': 'Regional Banking',                                              // ConnectOne Bancorp - 新泽西区域银行
    'CRGY': 'Oil & Gas E&P',                                                 // Crescent Energy - 油气勘探开发
    'EBC': 'Regional Banking',                                               // Eastern Bankshares - 新英格兰区域银行
    'FBNC': 'Regional Banking',                                              // First Bancshares NC - 北卡区域银行
    'GNTY': 'Regional Banking',                                              // Guaranty Bancshares - 德州区域银行
    'IBTX': 'Regional Banking',                                              // Independent Bank TX - 德州区域银行
    'INDB': 'Regional Banking',                                              // Independent Bank MA - 马萨诸塞区域银行
    'LKFN': 'Regional Banking',                                              // Lakeland Financial - 印第安纳区域银行
    'NNI': 'Student Lending & Services',                                     // Nelnet - 学生贷款/教育金融
    'PB': 'Regional Banking',                                                // Prosperity Bancshares - 德州区域银行
    'PFBC': 'Regional Banking',                                              // Preferred Bank - 加州区域银行
    'PRA': 'Specialty Insurance',                                            // ProAssurance - 专业责任保险
    'UFCS': 'P&C Insurance',                                                 // United Fire Group - 财产/意外保险

    // ========== Batch: Consumer/Retail/Restaurants (Jan 2026 - Set E) ==========
    'BWW': 'Casual Dining (Sports Bar)',                                       // Buffalo Wild Wings - 运动酒吧/休闲餐饮
    'LE': 'Apparel Retail (DTC)',                                              // Lands' End - 服装目录/电商
    'LZB': 'Furniture Manufacturing & Retail',                                 // La-Z-Boy - 家具制造/零售
    'NATH': 'QSR Franchisor',                                                  // Nathan's Famous - 热狗品牌/特许
    'NWL': 'Consumer Products Conglomerate',                                   // Newell Brands - 消费品集团
    'ONL': 'Office REIT',                                                      // Orion Office REIT - 办公REIT
    'ORG': 'Women\'s Health Pharma',                                            // Organon - 女性健康/制药
    'OVEN': 'Fast Casual Restaurant',                                          // Oven Restaurant - 快休闲餐厅
    'PBPB': 'Fast Casual (Sandwich)',                                          // Potbelly - 三明治快休闲
    'REAL': 'Luxury Consignment Marketplace',                                  // The RealReal - 奢侈品寄售
    'SWIM': 'Pool Products Manufacturing',                                     // Latham Group - 泳池产品
    'TCS': 'Specialty Retail (Organization)',                                  // The Container Store - 收纳用品零售

    // ========== Batch: Industrials/Materials/Construction (Jan 2026 - Set F) ==========
    'CFX': 'Welding & Cutting Equipment',                                       // Colfax/ESAB - 焊接切割设备
    'ECVT': 'Specialty Catalysts & Chemicals',                                  // Ecovyst - 特种催化剂
    'FNKO': 'Collectibles & Licensed Products',                                 // Funko - 流行文化收藏品
    'GCP': 'Construction Chemicals',                                            // GCP Applied Tech - 建筑化学品
    'HNI': 'Office Furniture & Hearth',                                         // HNI Corp - 办公家具/壁炉
    'KOP': 'Carbon Compounds & Wood Preservation',                              // Koppers - 碳化合物/木材防腐
    'NVT': 'Electrical Connection & Protection',                                // nVent Electric - 电气连接保护
    'RXN': 'Water Management Solutions',                                        // Rexnord/Zurn Elkay - 水管理

    // ========== Batch: Energy/Utilities/Mining/REITs (Jan 2026 - Set G) ==========
    'BCEI': 'Shale E&P (DJ Basin)',                                              // Bonanza Creek Energy - DJ盆地页岩油气
    'BEP': 'Renewable Energy IPP',                                               // Brookfield Renewable Partners - 可再生能源
    'CQP': 'LNG Export Terminal',                                                // Cheniere Energy Partners - LNG出口终端
    'DKL': 'Midstream Logistics',                                                // Delek Logistics Partners - 中游物流
    'ETRN': 'Midstream Gathering & Transmission',                                // Equitrans Midstream - 天然气采集/输送
    'HE': 'Regulated Utility (Electric)',                                        // Hawaiian Electric - 夏威夷受管制电力
    'IDA': 'Regulated Utility (Electric)',                                       // IDACORP - 爱达荷受管制电力
    'KRP': 'Oil & Gas Mineral Rights',                                           // Kimbell Royalty Partners - 油气矿权
    'LAND': 'Farmland REIT',                                                     // Gladstone Land - 农田REIT
    'NGM': 'Clinical-Stage Biotech',                                             // NGM Biopharmaceuticals - 临床阶段生物科技
    'NS': 'Midstream Pipeline & Storage',                                        // NuStar Energy - 中游管道/储存
    'PAGP': 'Midstream Pipeline (Crude/NGL)',                                    // Plains All American - 原油/NGL管道
    'PBA': 'Midstream Pipeline (Canadian)',                                      // Pembina Pipeline - 加拿大中游管道
    'QEP': 'Shale E&P (Permian/Williston)',                                      // QEP Resources - 页岩油气E&P
    'SLCA': 'Frac Sand & Industrial Minerals',                                   // U.S. Silica - 压裂砂/工业矿物
    'SRC': 'Net Lease REIT',                                                     // Spirit Realty Capital - 净租赁REIT
    'TPVG': 'Venture Lending BDC',                                               // TriplePoint Venture Growth - 风投贷款
    'XEC': 'Shale E&P (Permian/Midcontinent)',                                   // Cimarex Energy - 页岩E&P
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
      'Commercial Insurance',    // 商业保险
      'Personal Lines',          // 个人保险
      'Reinsurance',             // 再保险
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
      'Large Pharma',         // 生命科学研发租户
      'Large Biotech',        // 生物科技研发租户
      'Hospital Operator',    // 门诊设施租户
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
      'Commercial Insurance',    // 商业保险
      'Title Insurance',         // 产权保险
      'Reinsurance',             // 再保险
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
      'Construction Chain',      // 建筑产业链
      'Auto - Manufacturers',    // 汽车制造商
      'Industrial Chain',        // 工业产业链
      'Infrastructure',          // 基础设施
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

    // 氢能/清洁能源产业链
    'Hydrogen Fuel Cell': [
      'Fuel Cell Power',               // 同类燃料电池技术
      'RNG/CNG Fueling',              // 替代燃料同行
    ],

    'Fuel Cell Power': [
      'Hydrogen Fuel Cell',            // 同类燃料电池
      'Regulated Utility',             // 电力客户
      'Independent Power',             // 分布式发电
    ],

    'RNG/CNG Fueling': [
      'Truckload',                     // 卡车车队客户
      'LTL Trucking',                  // 零担车队客户
      'Natural Gas E&P',               // 天然气上游供应
    ],

    // 先进核能产业链
    'Advanced Nuclear': [
      'Uranium Enrichment',            // 核燃料供应
      'Uranium Mining',                // 铀矿上游
      'Nuclear Power Generation',      // 传统核电同行
      'Regulated Utility',             // 电力客户
    ],

    'Uranium Enrichment': [
      'Advanced Nuclear',              // 先进核能客户
      'Nuclear Power Generation',      // 传统核电客户
      'Uranium Mining',                // 铀矿上游供应
    ],

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

    // 肿瘤生物科技产业链
    'Oncology Biotech': ['Oncology Drug', 'Biotechnology', 'Clinical Trials', 'Pharmaceutical'],

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

    // ========== 牙科/医疗分销产业链 ==========
    // 牙科分销 → 牙科诊所/医院
    'Dental Distribution': [
      'Veterinary Distribution',      // 兽医分销(类似渠道)
    ],

    // 兽医分销 → 兽医诊所
    'Veterinary Distribution': [
      'Dental Distribution',          // 牙科分销(互补渠道)
    ],

    // ========== 游戏/支付技术产业链 ==========
    // 游戏技术 → 赌场运营
    'Gaming Technology': [
      'Payment Sensors',              // 支付传感器(互补技术)
    ],

    // 支付传感器 → 自动售货/ATM
    'Payment Sensors': [
      'Gaming Technology',            // 游戏技术(支付验证)
    ],

    // ========== 媒体/体育/娱乐产业链 ==========
    // 有线/宽带 → 消费者
    'Cable/Broadband': [
      'Pro Sports',                   // 体育内容分发
      'Entertainment Venues',         // 娱乐内容
    ],

    // 职业体育 → 媒体/票务
    'Pro Sports': [
      'Entertainment Venues',         // 共享场馆
      'Cable/Broadband',              // 转播权
    ],

    // 娱乐场馆 → 消费者体验
    'Entertainment Venues': [
      'Pro Sports',                   // 共享受众
    ],

    // ========== 特种制造/服务产业链 ==========
    // 特种容器 → 消费品/工业包装
    'Specialty Containers': [
      'Consumer Housewares',          // 消费品包装
      'Specialty Food Distribution',  // 食品包装
    ],

    // HR/PEO服务 → 企业客户
    'HR/PEO Services': [
      'IT Solutions',                 // IT企业客户重叠
    ],

    // IT解决方案 → 企业IT需求
    'IT Solutions': [
      'HR/PEO Services',              // 企业服务互补
    ],

    // ========== 半导体光掩模产业链 ==========
    // 光掩模 → 半导体制造
    'Photomasks': [
      'Semiconductor Foundry',        // 代工厂客户
    ],

    // ========== 消费品产业链 ==========
    // 消费家居 → 零售渠道
    'Consumer Housewares': [
      'Prestige Fragrances',          // 消费品同渠道
    ],

    // 高端香水 → 零售/百货
    'Prestige Fragrances': [
      'Consumer Housewares',          // 消费品同渠道
    ],

    // 牧场食品 → 杂货零售
    'Pasture-Raised Food': [
      'Specialty Food Distribution',  // 特种食品渠道
    ],

    // ========== 特种食品产业链 ==========
    // 特种食品分销 → 餐厅/酒店
    'Specialty Food Distribution': [
      'Select-Service Hotel',         // 酒店餐饮供应
      'Upper-Upscale Hotel',          // 高端酒店餐饮
      'Lifestyle Hotel',              // 生活方式酒店餐饮
      'Entertainment Venue REIT',     // 场馆餐饮
    ],

    // ========== 酒店REIT产业链 ==========
    // 精选服务酒店 → 旅游/商务
    'Select-Service Hotel': [
      'Upper-Upscale Hotel',          // 同业竞争/互补
      'Lifestyle Hotel',              // 同业竞争/互补
      'Entertainment Venue REIT',     // 会议/活动互补
    ],

    // 高端全服务酒店 → 商务/休闲
    'Upper-Upscale Hotel': [
      'Select-Service Hotel',         // 同业竞争
      'Lifestyle Hotel',              // 同业竞争
    ],

    // 生活方式酒店 → 都市/休闲
    'Lifestyle Hotel': [
      'Select-Service Hotel',         // 同业竞争
      'Upper-Upscale Hotel',          // 同业竞争
      'Entertainment Venue REIT',     // 活动/娱乐互补
    ],

    // 娱乐场馆REIT → 会议/活动
    'Entertainment Venue REIT': [
      'Select-Service Hotel',         // 住宿需求
      'Lifestyle Hotel',              // 住宿需求
      'Entertainment Venues',         // 娱乐同业
      'Pro Sports',                   // 活动内容
    ],

    // ========== 电力/能源产业链 ==========
    // 电力设备 → 发电/公用事业
    'Power Equipment/Grid': [
      'Regulated Utility',            // 电网设备客户
      'Independent Power',            // 发电设备客户
      'Nuclear Power Generation',     // 核电设备
    ],

    // 核电发电 → 公用事业/数据中心
    'Nuclear Power Generation': [
      'Regulated Utility',            // 电力供应
      'Independent Power',            // 电力批发
    ],

    // ========== 电信/网络产业链 ==========
    // 光纤宽带 → 消费者/企业
    'Fiber Broadband': [
      'Cable/Broadband',              // 同业竞争
      'Networking Infrastructure',    // 网络设备供应
    ],

    // ========== 技术产业链 ==========
    // 企业AI平台 → 企业客户
    'Enterprise AI Platform': [
      'Enterprise Software',          // 企业软件协同
      'Cloud Infrastructure',         // 云平台依赖
    ],

    // 全闪存存储 → 数据中心/企业
    'All-Flash Storage': [
      'Server Hardware',              // 服务器配套
      'Data Center REIT',             // 数据中心客户
      'Cloud Infrastructure',         // 云存储
    ],

    // ========== 医疗产业链 ==========
    // 脊柱手术机器人 → 医院/器械
    'Spine Surgery Robotics': [
      'Medical Devices',              // 器械同行
      'Surgical Robotics',            // 手术机器人同行
    ],

    // 介入医疗器械 → 医院/手术
    'Interventional Devices': [
      'Medical Devices',              // 器械同行
    ],

    // ========== 出行科技产业链 ==========
    // 出行科技 → 能源/车队
    'Mobility Technology': [
      'Gas Utility',                  // 燃油分销
      'EV Charging',                  // 充电设备
    ],

    // ========== 大麻/饮料产业链 ==========
    // 大麻/精酿 → 消费
    'Cannabis/Craft Beer': [
      'Craft Brewery',                // 精酿同行
    ],

    // ========== 商业服务产业链 ==========
    // 数字运营 → 企业客户
    'Digital Operations': [
      'IT Solutions',                 // IT服务同行
      'CX Business Services',        // CX服务同行
    ],

    // ========== 补充: 孤立子行业链接 ==========

    // 医疗器械/呼吸设备
    'CPAP/Respiratory Devices': [
      'Medical Devices',
      'Home Health Services',
      'Health Insurance',
    ],

    // FcRn抗体生物技术
    'FcRn Antibody Biotech': [
      'Biotechnology',
      'Clinical Trials',
      'Pharmaceutical',
    ],

    // 废物收集/处理
    'Waste Collection/Disposal': [
      'Waste Management',
      'Environmental Services',
      'Infrastructure',
    ],

    // 水泥/骨料
    'Cement/Aggregates': [
      'Construction Materials',
      'Residential Construction',
      'Infrastructure',
    ],

    // 韩国电商
    'Korean E-commerce': [
      'E-commerce',
      'Payments',
      'Logistics',
    ],

    // 音乐标签/出版
    'Music Labels/Publishing': [
      'Entertainment',
      'Content Streaming',
      'Digital Advertising',
    ],

    // 飞控系统
    'Flight Control Systems': [
      'Aerospace & Defense',
      'Aviation Services',
      'Tactical Drones',
    ],

    // 基因检测服务
    'Genetic Testing Services': [
      'Genetic Testing',
      'Medical Diagnostics',
      'Clinical Trials',
    ],

    // 仿真/CAE软件
    'Simulation/CAE Software': [
      'Enterprise SaaS',
      'Engineering Technology',
      'Aerospace & Defense',
    ],

    // 数字银行平台
    'Digital Banking Platform': [
      'Regional Bank',
      'Fintech',
      'Payments',
    ],

    // 模块化地板
    'Modular Flooring': [
      'Building Materials',
      'Residential Construction',
      'Commercial Construction',
    ],

    // DTC户外品牌
    'DTC Outdoor Brands': [
      'Outdoor Recreation',
      'E-commerce',
      'Specialty Retail',
    ],

    // 数字BPO服务
    'Digital BPO Services': [
      'IT Solutions',
      'CX Business Services',
      'Enterprise SaaS',
    ],

    // 抵押贷款服务
    'Mortgage Servicing': [
      'Mortgage Finance',
      'Regional Bank',
      'Housing Market',
    ],

    // 油气集输中游
    'Oil Gathering Midstream': [
      'Midstream',
      'E&P',
      'Natural Gas',
    ],

    // 特色食品
    'Specialty Foods': [
      'Food Distribution',
      'Grocery',
      'Restaurant Supply',
    ],

    // 免疫肿瘤
    'Immuno-Oncology': [
      'Biotechnology',
      'Clinical Trials',
      'Oncology Center',
    ],

    // 细胞治疗
    'Cell Therapy': [
      'Biotechnology',
      'Clinical Trials',
      'Gene Editing',
    ],

    // 汽车芯片
    'Automotive Chips': [
      'Semiconductor',
      'Auto - Manufacturers',
      'Autonomous Driving',
    ],

    // IoT芯片
    'IoT Chips': [
      'Semiconductor',
      'IoT Platform',
      'Smart Home',
    ],

    // 功率半导体
    'Power Semis': [
      'Semiconductor',
      'EV Charging',
      'Industrial Automation',
    ],

    // 铁路设备
    'Rail Equipment': [
      'Specialty Industrial',
      'Logistics',
      'Infrastructure',
    ],

    // 生活方式品牌
    'Lifestyle Brands': [
      'Fashion Brand',
      'E-commerce',
      'Direct Selling',
    ],

    // 时尚租赁
    'Fashion Rental': [
      'Online Fashion Retail',
      'E-commerce',
      'Luxury Goods',
    ],

    // 可持续鞋类
    'Sustainable Footwear': [
      'Footwear',
      'E-commerce',
      'Specialty Retail',
    ],

    // 大麻
    'Cannabis': [
      'Cannabis/Craft Beer',
      'Consumer Staples',
      'Pharmaceutical',
    ],

    // 大麻MSO (多州运营)
    'Cannabis MSO': [
      'Cannabis',
      'Specialty Retail',
      'Consumer Staples',
    ],

    // 汽车配件
    'Auto Accessories': [
      'Auto Parts',
      'Auto - Manufacturers',
      'Specialty Retail',
    ],

    // 汽车售后零件
    'Aftermarket Auto Parts': [
      'Auto Parts',
      'Auto Service',
      'Specialty Retail',
    ],

    // 税务软件
    'Tax Software': [
      'Enterprise SaaS',
      'Accounting Services',
      'Fintech',
    ],

    // ========== 新增21只股票子行业链 ==========

    // 债务购买 → 银行/消费金融(购买不良贷款)
    'Debt Purchasing': [
      'Regional Bank',                // 银行出售不良资产
      'Consumer Finance',             // 消费金融不良贷款
      'Subprime Consumer Finance',    // 次贷消费金融
    ],

    // 学生贷款服务 → 教育/金融
    'Student Loan Servicing': [
      'For-Profit Education',         // 教育机构学费贷款
      'Consumer Finance',             // 消费金融同行
      'Regional Bank',                // 银行贷款服务
    ],

    // 保险数据分析 → 保险公司
    'Insurance Analytics': [
      'P&C Insurance',                // 财产险客户
      'Specialty Insurance',          // 特种险客户
      'Reinsurance',                  // 再保险客户
    ],

    // 商业数据 → 企业信用/金融
    'Business Data': [
      'Regional Bank',                // 银行信用决策
      'P&C Insurance',                // 保险承保分析
      'Enterprise SaaS',              // 企业软件集成
    ],

    // 设施服务 → 商业地产
    'Facility Services': [
      'Office REIT',                  // 办公楼客户
      'Industrial REIT',              // 工业设施客户
      'Retail REIT',                  // 零售物业客户
    ],

    // 食品/设施服务 → 企业/场馆
    'Food/Facilities Services': [
      'Office REIT',                  // 办公楼餐饮
      'Entertainment Venues',         // 场馆餐饮
      'Education Services',           // 学校餐饮
    ],

    // 可再生能源风电/光伏 → 电网/公用事业
    'Renewable Wind/Solar': [
      'Regulated Utility',            // 电力购买协议
      'Independent Power',            // 独立发电商
      'Industrial REIT',              // 工业设施用电
    ],

    // 网络设备 → 企业/消费终端
    'Networking Equipment': [
      'Cloud Infrastructure',         // 云基础设施网络
      'Data Center REIT',             // 数据中心网络
      'Smart Home',                   // 智能家居网络
    ],

    // 卫星广播 → 汽车/媒体
    'Satellite Radio': [
      'Auto OEM',                     // 汽车预装
      'Content Streaming',            // 流媒体竞争
      'Digital Advertising',          // 广告市场
    ],

    // 广播/播客 → 广告/媒体
    'Radio/Podcasts': [
      'Digital Advertising',          // 广告竞争
      'Content Streaming',            // 流媒体竞争
      'Entertainment',                // 娱乐内容
    ],

    // 高端护发 → 零售/美容
    'Premium Hair Care': [
      'Prestige Beauty',              // 高端美容同行
      'Specialty Retail',             // 专业零售渠道
      'E-commerce',                   // 电商DTC渠道
    ],

    // 快休闲沙拉 → 餐饮/食品
    'Fast Casual Salad': [
      'Fast Casual Restaurant',       // 快休闲同行
      'Food Distribution',            // 食材供应
      'Commercial Real Estate Services', // 门店选址
    ],

    // 再保险 → 保险同业(已有'Reinsurance'定义，此处为确认)
    // 'Reinsurance' already defined above

    // 特种再保险 → 保险公司
    'Specialty Reinsurance': [
      'P&C Insurance',                // 财产险分保
      'Specialty Insurance',          // 特种险分保
      'Reinsurance',                  // 再保险同行
    ],

    // 过程工业 → 航空/工业终端
    'Process Industrial': [
      'Aerospace',                    // 航空航天客户
      'Regulated Utility',            // 公用事业流程控制
      'Specialty Chemicals',          // 化工过程设备
    ],

    // 运动/流体控制组件 → 工业/航空/汽车
    'Motion/Flow Components': [
      'Aerospace',                    // 航空航天组件
      'Auto - Manufacturers',         // 汽车制动/连接器
      'Industrial Automation',        // 工业自动化
    ],

    // 草坪/园艺 → 零售/住房
    'Lawn/Garden': [
      'Home Improvement',             // 家居建材渠道
      'Mass Retail',                  // 大众零售渠道
      'Homebuilder',                  // 新建住宅配套
    ],

    // 器官运输 → 医院/移植
    'Organ Transport': [
      'Hospital Operator',            // 移植中心
      'Health Insurance',             // 保险覆盖
      'Medical Devices',              // 器械配套
    ],

    // 神经外科器械 → 医院/手术
    'Neurosurgery Devices': [
      'Hospital Operator',            // 神经外科
      'Medical Devices',              // 器械同行
      'Health Insurance',             // 保险报销
    ],

    // 脊柱器械 → 医院/手术
    'Spine Devices': [
      'Hospital Operator',            // 脊柱外科
      'Spine Surgery Robotics',       // 脊柱手术机器人
      'Health Insurance',             // 保险报销
    ],

    // 巴西支付 → 电商/中小企业
    'Brazil Payments': [
      'E-commerce',                   // 巴西电商
      'Digital Payments',             // 全球数字支付
      'SMB Banking',                  // 中小企业银行
    ],

    // 巴西金融科技 → 银行/支付
    'Brazil Fintech': [
      'Digital Payments',             // 支付基础设施
      'SMB Banking',                  // 中小企业金融
      'E-commerce',                   // 电商平台
    ],

    // 数字健身 → 消费者健康
    'Digital Fitness': [
      'Connected Fitness',            // 智能健身设备
      'Streaming Media',              // 流媒体内容
      'DTC Wellness',                 // 直销健康品
    ],

    // 多元化工业软件 → 垂直SaaS/工业
    'Diversified Industrial Software': [
      'Enterprise SaaS',              // 企业软件
      'Industrial Automation',        // 工业自动化
      'Vertical SaaS',                // 垂直行业软件
    ],

    // 心脏治疗 → 心血管
    'Cardiac Therapeutics': [
      'Cardiology Devices',           // 心脏器械
      'Specialty Pharma',             // 特种药物
      'Heart Failure',                // 心衰治疗
    ],

    // 血液学治疗 → 罕见病
    'Hematology Therapeutics': [
      'Rare Disease',                 // 罕见病
      'Specialty Pharma',             // 特种药物
      'Diagnostics',                  // 诊断
    ],

    // 呼吸系统治疗 → 肺病学
    'Respiratory Therapeutics': [
      'Pulmonology Devices',          // 肺部设备
      'Specialty Pharma',             // 特种药物
      'Inhaled Therapeutics',         // 吸入治疗
    ],

    // 语音AI平台 → 对话式AI
    'Voice AI Platform': [
      'Conversational AI',            // 对话AI
      'Restaurant Technology',        // 餐饮科技
      'Automotive Software',          // 汽车软件
    ],

    // AI决策分析 → 国防/情报
    'AI Decision Analytics': [
      'Defense Technology',           // 国防科技
      'Intelligence Analytics',       // 情报分析
      'Government IT',                // 政府IT
    ],

    // 油藏描述 → 油田服务
    'Reservoir Description': [
      'Oilfield Services',            // 油田服务
      'Production Enhancement',       // 增产
      'E&P',                          // 勘探与开采
    ],

    // 天然气压缩 → 中游基建
    'Gas Compression Services': [
      'Midstream',                    // 中游
      'Natural Gas Processing',       // 天然气处理
      'Pipeline Infrastructure',      // 管道基础设施
    ],

    // 在线教育平台 → 高等教育/职业培训
    'EdTech Platform': [
      'Online Education',             // 在线教育
      'University Services',          // 大学服务
      'Professional Training',        // 职业培训
    ],

    // ========== 新增16只子行业链 ==========

    // 房地产科技平台 → 房地产服务
    'Real Estate Tech Platform': [
      'Real Estate Services',         // 房地产服务
      'Residential Construction',     // 住宅建设
      'Regional Bank',                // 区域银行(抵押贷款)
    ],

    // 房地产经纪科技 → 房地产服务
    'Real Estate Brokerage Tech': [
      'Real Estate Services',         // 房地产服务
      'Residential Construction',     // 住宅建设
      'Real Estate Tech Platform',    // 房地产科技平台
    ],

    // 太空基础设施 → 太空系统
    'Space Infrastructure': [
      'Space Systems',                // 太空系统
      'Satellite Communications',     // 卫星通信
      'Aerospace Supplier',           // 航空航天供应商
    ],

    // IT基础设施服务 → 企业IT
    'IT Infrastructure Services': [
      'Enterprise SaaS',              // 企业SaaS
      'Cloud Infrastructure',         // 云基础设施
      'Data Center REIT',             // 数据中心REIT
    ],

    // 身份验证科技 → 安全/旅行
    'Identity Verification Tech': [
      'Cybersecurity',                // 网络安全
      'Airlines',                     // 航空公司
      'Entertainment',                // 娱乐(场馆入场)
    ],

    // 再生医学 → 骨科/外科
    'Regenerative Medicine': [
      'Orthopedic Devices',           // 骨科器械
      'Surgical Services',            // 外科服务
      'Biotechnology',                // 生物技术
    ],

    // 大宗商品经纪 → 交易/金融
    'Commodities Brokerage': [
      'E&P',                          // 勘探与开采
      'Ag Commodities',               // 农业大宗商品
      'Asset Management',             // 资产管理
    ],

    // 3D空间数据 → 房地产/建筑
    '3D Spatial Data': [
      'Real Estate Services',         // 房地产服务
      'Construction Software',        // 建筑软件
      'Enterprise SaaS',              // 企业SaaS
    ],

    // 骨科器械 → 外科/医疗
    'Orthopedic Devices': [
      'Medical Devices',              // 医疗器械
      'Surgical Services',            // 外科服务
      'Ambulatory Care',              // 门诊护理
    ],

    // 数字分析平台 → 企业软件
    'Digital Analytics Platform': [
      'Enterprise SaaS',              // 企业SaaS
      'Digital Marketing SaaS',       // 数字营销SaaS
      'Social Platform',              // 社交平台
    ],

    // 数字营销SaaS → 营销/广告
    'Digital Marketing SaaS': [
      'Enterprise SaaS',              // 企业SaaS
      'Social Platform',              // 社交平台
      'Digital Advertising',          // 数字广告
    ],

    // 体育数据分析 → 博彩/体育
    'Sports Data Analytics': [
      'Sports Betting',               // 体育博彩
      'Entertainment',                // 娱乐
      'Enterprise SaaS',              // 企业SaaS
    ],

    // ========== Russell 2000 / S&P 600 Diversification Batch - 新增子行业链 ==========

    // HR科技SaaS → 企业客户
    'HR Tech SaaS': [
      'Enterprise SaaS',              // 企业SaaS集成
      'HCM SaaS',                     // HCM协同(Workday等)
      'Regional Bank',                // 薪资代发合作
    ],

    // 数字咨询 → IT/企业服务
    'Digital Consulting': [
      'Enterprise SaaS',              // SaaS实施服务
      'Cloud Infrastructure',         // 云迁移客户
      'Digital Engineering',          // 数字工程同行
    ],

    // 自由职业市场 → 企业/个人
    'Freelance Marketplace': [
      'Enterprise SaaS',              // 企业用工需求
      'Digital Engineering',          // 技术外包竞争
      'HR Tech SaaS',                 // HR科技协同
    ],

    // 在线教育平台 → 大学/企业
    'Online Education Platform': [
      'For-Profit Education',         // 教育同行
      'Enterprise SaaS',              // 企业培训集成
      'Education Services',           // 教育服务
    ],

    // 体育博彩数据 → 博彩/媒体
    'Sports Betting Data': [
      'Online Gaming',                // 在线博彩客户
      'Sports Data Analytics',        // 体育分析同行
      'Entertainment',                // 媒体/内容
    ],

    // 量子计算 → 企业/科研
    'Quantum Computing': [
      'Cloud Hyperscaler',            // 云量子服务
      'Enterprise SaaS',              // 企业优化计算
      'AI Services',                  // AI/ML加速
    ],

    // 数据中心连接芯片 → 服务器/网络
    'Data Center Connectivity': [
      'Server Hardware',              // 服务器互连
      'Network Equipment',            // 网络设备客户
      'Cloud Hyperscaler',            // 超大规模云客户
    ],

    // 加密挖矿/ASIC设计 → 半导体/数据中心
    'Crypto Mining/ASIC Design': [
      'Crypto Mining',                // 挖矿设备客户
      'Data Center Infrastructure',   // 数据中心
      'Semiconductor Foundry',        // 芯片代工
    ],

    // ========== 补充: Healthcare Biotech (2026-01 batch) ==========

    // 神经退行性疗法 → 神经科/罕见病
    'Neurodegeneration Therapy': [
      'Neurology',                    // 神经科
      'Rare Disease',                 // 罕见病
      'Specialty Pharma',             // 特种药物
    ],

    // 神经精神疗法 → 精神科/神经科
    'Neuropsychiatry Therapy': [
      'Neurology',                    // 神经科
      'Psychiatry',                   // 精神科
      'Specialty Pharma',             // 特种药物
    ],

    // 肾脏病疗法 → 肾病科/免疫
    'Nephrology Therapy': [
      'Nephrology',                   // 肾病科
      'Autoimmune Therapy',           // 自身免疫
      'Specialty Pharma',             // 特种药物
    ],

    // 疫苗佐剂 → 疫苗/生物科技
    'Vaccine Adjuvant': [
      'Vaccines',                     // 疫苗制造
      'Biotechnology',                // 生物科技
      'Large Biotech',                // 大型生物科技(合作伙伴)
    ],

    // ========== Fix orphan sub-industries: Financials/REITs/Energy batch ==========

    // 寿险/年金 → 财富管理
    'Life Insurance & Annuities': [
      'Wealth Management',            // 财富管理
      'Retirement Services',          // 退休服务
    ],

    // 社区银行 → 本地金融
    'Community Banking': [
      'Mortgage Lending',             // 抵押贷款
      'Small Business Lending',       // 小企业贷款
    ],

    // 区域银行 → 贷款/存款
    'Regional Banking': [
      'Mortgage Lending',             // 抵押贷款
      'Commercial Lending',           // 商业贷款
    ],

    // BaaS银行 → 金融科技
    'BaaS Banking': [
      'FinTech SaaS',                 // 金融科技合作
      'Digital Payments',             // 数字支付
    ],

    // 寿险/健康险 → 保险服务
    'Life & Health Insurance': [
      'Wealth Management',            // 财富管理
      'Healthcare Services',          // 健康服务
    ],

    // 理赔管理 → 保险运营
    'Claims Management': [
      'Property Insurance',           // 财产保险
      'Insurance Technology',         // 保险科技
    ],

    // 保险市场 → 保险分销
    'Insurance Marketplace': [
      'Property Insurance',           // 财产保险
      'Auto Insurance',               // 汽车保险
    ],

    // 固定年金 → 退休储蓄
    'Fixed Annuities': [
      'Wealth Management',            // 财富管理
      'Retirement Services',          // 退休服务
    ],

    // 商业银行 → 企业融资
    'Commercial Banking': [
      'Commercial Lending',           // 商业贷款
      'Treasury Management',          // 资金管理
    ],

    // 多户住宅REIT → 住房
    'Multifamily REIT': [
      'Property Management',          // 物业管理
      'Residential Construction',     // 住宅建设
    ],

    // 净租赁REIT (已有但补充链条)
    // 'Net Lease REIT' - already exists at line ~3885

    // 光纤REIT → 电信基础设施
    'Fiber REIT': [
      'Fiber Broadband',              // 光纤宽带
      'Telecom Infrastructure',       // 电信基础设施
    ],

    // 油田水处理 → 油服
    'Water Solutions': [
      'Oilfield Services',            // 油田服务
      'Shale E&P',                    // 页岩油E&P
    ],

    // 海上钻井 → E&P
    'Offshore Drilling': [
      'International E&P',            // 国际E&P
      'Deepwater E&P',                // 深水E&P
    ],

    // 海底设备 → 海上开发
    'Subsea Equipment': [
      'Offshore Drilling',            // 海上钻井
      'International E&P',            // 国际E&P
    ],

    // 油气勘探生产 → 中下游
    'Oil & Gas E&P': [
      'Midstream Pipeline',           // 中游管道
      'Oil Refining',                 // 炼油
    ],

    // 炼油 → 化工/运输
    'Oil Refining': [
      'Commodity Chemicals',          // 大宗化学品
      'Fuel Distribution',            // 燃油分销
    ],

    // 矿权/版税 → E&P
    'Mineral Rights': [
      'Shale E&P',                    // 页岩油E&P
      'Oil & Gas E&P',                // 传统E&P
    ],

    // 抵押REIT → 房地产融资
    'Mortgage REIT': [
      'Mortgage Lending',             // 抵押贷款
      'Commercial Real Estate',       // 商业地产
    ],

    // ========== Fix orphan sub-industries: Consumer/Retail/Services batch ==========

    // 教育零售 → 学校/教育
    'Educational Retail': [
      'Education',                    // 教育
      'Specialty Retail',             // 特种零售
    ],

    // 家居直销 → 消费品
    'Home Products Direct Sales': [
      'Consumer Products',            // 消费品
      'Direct Selling',               // 直销渠道
    ],

    // 天然饮料 → 饮料/健康
    'Natural Beverages': [
      'Beverages',                    // 饮料行业
      'Health & Wellness',            // 健康消费
    ],

    // 户外烹饪 → 户外/消费品
    'Outdoor Cooking': [
      'Consumer Products',            // 消费品
      'Outdoor Recreation',           // 户外休闲
    ],

    // 大码时尚零售 → 服装
    'Plus-Size Fashion Retail': [
      'Fashion Brand',                // 时尚品牌
      'E-commerce',                   // 电商渠道
    ],

    // 休闲餐饮特许 → 餐饮
    'Casual Dining Franchise': [
      'Restaurant Chain',             // 餐饮连锁
      'Franchise',                    // 加盟模式
    ],

    // 工装零售 → 服装/劳保
    'Workwear Retail': [
      'Specialty Retail',             // 特种零售
      'Consumer Products',            // 消费品
    ],

    // 时尚零售 → 服装/电商
    'Fashion Retail': [
      'Fashion Brand',                // 时尚品牌
      'E-commerce',                   // 电商
    ],

    // 家庭保修服务 → 房产服务
    'Home Warranty Services': [
      'Home Services',                // 家庭服务
      'Property Management',          // 物业管理
    ],

    // 水培零售 → 园艺/农业
    'Hydroponics Retail': [
      'Agriculture',                  // 农业
      'Specialty Retail',             // 特种零售
    ],

    // 数字奖励平台 → 营销科技
    'Digital Rewards Platform': [
      'Digital Marketing SaaS',       // 数字营销
      'Enterprise SaaS',              // 企业SaaS
    ],

    // 柑橘农业 → 农产品
    'Citrus Agriculture': [
      'Agriculture',                  // 农业
      'Food Processing',              // 食品加工
    ],

    // 剩余资产市场 → 拍卖/B2B
    'Surplus Asset Marketplace': [
      'E-commerce',                   // 电商
      'Industrial Services',          // 工业服务
    ],

    // 时尚电商 → 零售/电商
    'Fashion E-commerce': [
      'Fashion Brand',                // 时尚品牌
      'E-commerce',                   // 电商
    ],

    // 蒸馏酒 → 酒类
    'Distilled Spirits': [
      'Beverages',                    // 饮料
      'Specialty Retail',             // 特种零售
    ],

    // 高端葡萄酒 → 酒类
    'Premium Wine': [
      'Beverages',                    // 饮料
      'Luxury Goods',                 // 奢侈品
    ],

    // 办公用品零售 → 办公/零售
    'Office Products Retail': [
      'Specialty Retail',             // 零售
      'E-commerce',                   // 电商
    ],

    // 特种计算解决方案 → 半导体/IT
    'Specialty Computing Solutions': [
      'Server Hardware',              // 服务器
      'Memory Chips',                 // 存储芯片
    ],

    // 房车 → 户外/消费品
    'Recreational Vehicles': [
      'Outdoor Recreation',           // 户外休闲
      'Auto - Manufacturers',         // 汽车制造
    ],

    // 家庭收纳产品 → 消费品
    'Home Storage Products': [
      'Consumer Products',            // 消费品
      'Specialty Retail',             // 零售
    ],

    // 罕见病疗法 → 特种药物
    'Rare Disease Therapeutics': [
      'Rare Disease',                 // 罕见病
      'Specialty Pharma',             // 特种药物
    ],

    // 水质/产品ID → 工业检测
    'Water Quality & Product ID': [
      'Water Technology',             // 水技术
      'Industrial Automation',        // 工业自动化
    ],

    // 转售特许经营 → 零售/循环经济
    'Resale Franchise': [
      'Specialty Retail',             // 特种零售
      'Franchise',                    // 加盟模式
    ],

    // 基础设施工程 → 建筑/政府
    'Infrastructure Engineering': [
      'Construction & Engineering',   // 建筑工程
      'Building Products',            // 建筑产品
      'Office REIT',                  // 办公物业客户
    ],

    // ========== 新增子行业链 (2026-01-24) ==========

    // 电商SaaS平台 → 电商/支付/物流
    'eCommerce Platform SaaS': [
      'E-commerce',                   // 电商客户
      'Payments',                     // 支付集成
      'Logistics',                    // 履约物流
    ],

    // UCaaS → 企业SaaS/通信
    'UCaaS': [
      'Enterprise SaaS',              // 企业软件协同
      'Conversational AI',            // AI客服集成
      'CX Software',                  // CX平台集成
    ],

    // CX软件 → 企业SaaS/AI
    'CX Software': [
      'Enterprise SaaS',              // 企业软件
      'Conversational AI',            // 对话AI
      'UCaaS',                        // 通信平台
    ],

    // 消费健康 → 零售/医药
    'Consumer Health': [
      'Pharmacy Retail',              // 药房渠道
      'Grocery Retail',               // 超市渠道
      'Consumer Staples',             // 消费必需品同行
    ],

    // 医疗导航 → 保险/数字健康
    'Healthcare Navigation': [
      'Health Insurance',             // 保险合作
      'Digital Health',               // 数字健康
      'Enterprise SaaS',              // 企业HR集成
    ],

    // 计算药物发现 → 药企/生物科技
    'Computational Drug Discovery': [
      'Big Pharma',                   // 大药企客户
      'Emerging Biotech',             // 生物科技客户
      'AI Services',                  // AI/ML技术
    ],

    // 数字贷款 → 银行/金融科技
    'Digital Lending': [
      'Regional Bank',                // 银行竞争/合作
      'Fintech',                      // 金融科技同行
      'Mortgage Lender',              // 按揭贷款
    ],

    // 批发按揭 → 银行/房地产
    'Wholesale Mortgage': [
      'Mortgage Lender',              // 按揭贷款行业
      'Regional Bank',                // 银行合作
      'Real Estate Services',         // 房地产服务
    ],

    // 家庭服务保险科技 → 保险/房地产
    'Home Services InsurTech': [
      'P&C Insurance',                // 财产险
      'Real Estate Services',         // 房地产服务
      'Mortgage Lender',              // 按揭贷款
    ],

    // IT管理SaaS → 企业SaaS/安全
    'IT Management SaaS': [
      'Enterprise SaaS',              // 企业软件
      'Cybersecurity',                // 网络安全
      'Cloud Computing',              // 云计算
    ],

    // GRC软件 → 企业SaaS/合规
    'GRC Software': [
      'Enterprise SaaS',              // 企业软件
      'Regional Bank',                // 银行合规客户
      'Health Insurance',             // 保险合规客户
    ],

    // 可观测性 → 企业SaaS/云计算
    'Observability': [
      'Enterprise SaaS',              // 企业软件
      'Cloud Computing',              // 云计算
      'Cybersecurity',                // 安全监控
    ],

    // 云SIEM → 安全/企业SaaS
    'Cloud SIEM': [
      'Cybersecurity',                // 网络安全
      'Enterprise SaaS',              // 企业软件
      'Cloud Computing',              // 云计算
    ],

    // CTV平台 → 流媒体/广告
    'CTV Platform': [
      'Content Streaming',            // 流媒体竞争
      'Digital Advertising',          // 数字广告
      'Consumer Electronics',         // 消费电子
    ],

    // 拉美支付 → 金融科技/电商
    'LatAm Payments': [
      'Payments',                     // 全球支付行业
      'Fintech',                      // 金融科技
      'E-commerce',                   // 电商客户
    ],

    // AI数据工程 → AI服务/企业SaaS
    'AI Data Engineering': [
      'AI Services',                  // AI服务
      'Enterprise SaaS',              // 企业软件客户
      'Cloud Computing',              // 云计算
    ],

    // 电力转换 → 半导体设备/工业
    'Power Conversion': [
      'Semiconductor Equipment',      // 半导体设备
      'Industrial Automation',        // 工业自动化
      'Power Equipment',              // 电力设备
    ],

    // 轨道车辆 → 铁路/化工/能源
    'Railcar': [
      'Railroad',                     // 铁路运营商
      'Specialty Chemicals',          // 化工品运输
      'Midstream Gas',                // 油气运输
    ],

    // 特种合金 → 航空/国防/医疗
    'Specialty Alloys': [
      'Aerospace Components',         // 航空零部件
      'Aviation Services',            // 航空服务
      'Medical Devices',              // 医疗器械
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
