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
    'U': 'Gaming Platform',                 // Unity - 游戏引擎
    'ROKU': 'Streaming',                    // Roku - 流媒体硬件+平台

    // ========== 补充覆盖 - 消费/健康 (Consumer/Health) ==========
    'ADDYY': 'Athletic Apparel',            // Adidas
    'FL': 'Sporting Goods Retail',          // Foot Locker
    'HIMS': 'Digital Health',               // Hims & Hers
    'TDOC': 'Digital Health',               // Teladoc
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
    ],

    'EV OEM': [
      'Auto Dealer',
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
    ],

    'Big Pharma': [
      'Pharma Distributor',
      'Pharmacy Retail',
      'Hospital',
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
    ],

    'Data Center REIT': [
      'Cloud Hyperscaler',
    ],

    'Cloud Hyperscaler': [
      'Enterprise SaaS',
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
    ],

    // 资管 → 券商渠道
    'Asset Manager': [
      'Brokerage',
    ],

    'Alternative Asset Manager': [
      'Brokerage',
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
    ],

    'Snacks': [
      'Mass Retail',
      'Warehouse Club',
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
    ],

    'Short-term Rental': [
      'OTA',
    ],

    'OTA': [
      'Ride-hailing',
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
