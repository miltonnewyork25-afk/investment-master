/**
 * 公司扩展属性配置
 *
 * 包含:
 * 1. 客群画像 - 目标消费者特征
 * 2. 经济周期位置 - 早周期/中周期/晚周期/防御型
 * 3. 宏观敏感度 - 对各宏观因子的敏感程度
 * 4. 跨链影响 - 影响多个产业链的公司
 */

import type {
  CustomerProfile,
  CyclePosition,
  MacroSensitivity,
} from '../types/index.js';

// ============================================================
// 客群画像配置
// ============================================================

export const CUSTOMER_PROFILES: Record<string, CustomerProfile> = {
  // ========== 健身/健康生活方式 ==========
  'LULU': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fitness', 'athleisure', 'yoga', 'wellness', 'health-conscious'],
    valueProps: ['premium', 'quality', 'lifestyle', 'community', 'health'],
    channels: ['retail', 'online', 'direct'],
  },
  'NKE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fitness', 'sports', 'athleisure', 'casual'],
    valueProps: ['performance', 'brand', 'innovation'],
    channels: ['retail', 'online', 'direct'],
  },
  'CELH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fitness', 'energy', 'wellness', 'pre-workout', 'health-conscious'],
    valueProps: ['health', 'energy', 'premium', 'functional', 'lifestyle'],
    channels: ['retail', 'online'],
  },
  'PLNT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fitness', 'gym', 'wellness', 'health-conscious'],
    valueProps: ['value', 'accessibility', 'health', 'community'],
    channels: ['direct', 'subscription'],
  },
  'PTON': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fitness', 'home-workout', 'cycling', 'wellness', 'health-conscious'],
    valueProps: ['premium', 'convenience', 'community', 'connected', 'lifestyle'],
    channels: ['direct', 'subscription', 'online'],
  },

  // ========== 旅游/出行 ==========
  'BKNG': {
    demographics: { ageGroup: 'all', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel'],
    valueProps: ['convenience', 'selection', 'price'],
    channels: ['online'],
  },
  'ABNB': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['travel', 'vacation', 'experience', 'remote-work'],
    valueProps: ['unique', 'local', 'authentic', 'value'],
    channels: ['online'],
  },
  'MAR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['travel', 'business-travel', 'vacation', 'loyalty'],
    valueProps: ['consistency', 'loyalty', 'premium'],
    channels: ['online', 'direct'],
  },
  'HLT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['travel', 'business-travel', 'vacation'],
    valueProps: ['consistency', 'loyalty', 'brand'],
    channels: ['online', 'direct'],
  },
  'UBER': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'travel', 'dining', 'convenience'],
    valueProps: ['convenience', 'on-demand', 'price'],
    channels: ['online'],
  },

  // ========== 餐饮 ==========
  'SBUX': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['coffee', 'social', 'work', 'morning-routine'],
    valueProps: ['premium', 'experience', 'convenience', 'customization'],
    channels: ['retail', 'online', 'subscription'],
  },
  'MCD': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['quick-meal', 'family', 'value', 'convenience'],
    valueProps: ['value', 'convenience', 'consistency', 'speed'],
    channels: ['retail', 'online'],
  },
  'CMG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['lunch', 'dinner', 'health-conscious', 'fast-casual'],
    valueProps: ['fresh', 'quality', 'customization', 'transparency'],
    channels: ['retail', 'online'],
  },
  'DPZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['delivery', 'convenience', 'family', 'social'],
    valueProps: ['convenience', 'value', 'speed', 'technology'],
    channels: ['online', 'retail'],
  },

  // ========== 零售/电商 ==========
  'AMZN': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['shopping', 'convenience', 'entertainment', 'essentials'],
    valueProps: ['convenience', 'selection', 'speed', 'value'],
    channels: ['online', 'subscription'],
  },
  'WMT': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery', 'essentials', 'value-shopping'],
    valueProps: ['value', 'one-stop', 'convenience'],
    channels: ['retail', 'online'],
  },
  'COST': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['bulk-shopping', 'value', 'family', 'small-business'],
    valueProps: ['value', 'quality', 'bulk', 'membership'],
    channels: ['retail', 'subscription'],
  },
  'TGT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['shopping', 'home', 'style', 'convenience'],
    valueProps: ['style', 'value', 'curation', 'experience'],
    channels: ['retail', 'online'],
  },

  // ========== 奢侈品/高端消费 ==========
  'LVMUY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['luxury', 'gifting', 'self-reward', 'status'],
    valueProps: ['luxury', 'heritage', 'exclusivity', 'craftsmanship'],
    channels: ['retail', 'direct'],
  },
  'RH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['home', 'luxury', 'design', 'renovation'],
    valueProps: ['luxury', 'design', 'curation', 'experience'],
    channels: ['retail', 'direct', 'online'],
  },

  // ========== 娱乐/流媒体 ==========
  'NFLX': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'relaxation', 'binge-watching'],
    valueProps: ['content', 'convenience', 'personalization'],
    channels: ['subscription', 'online'],
  },
  'DIS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family', 'entertainment', 'vacation', 'nostalgia'],
    valueProps: ['family', 'magic', 'content', 'experience'],
    channels: ['retail', 'subscription', 'direct'],
  },
  'SPOT': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['music', 'podcast', 'commute', 'workout'],
    valueProps: ['discovery', 'personalization', 'convenience'],
    channels: ['subscription', 'online'],
  },

  // ========== 金融科技 ==========
  'SQ': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['payments', 'investing', 'banking', 'small-business'],
    valueProps: ['simplicity', 'accessibility', 'modern'],
    channels: ['online', 'direct'],
  },
  'PYPL': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online-shopping', 'payments', 'transfers'],
    valueProps: ['security', 'convenience', 'trust'],
    channels: ['online'],
  },
  'SOFI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'investing', 'loans', 'trading', 'learning'],
    valueProps: ['modern', 'integrated', 'simplicity', 'free', 'accessibility'],
    channels: ['online', 'direct'],
  },
  'AFRM': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['shopping', 'financing', 'big-purchases'],
    valueProps: ['transparency', 'flexibility', 'no-hidden-fees'],
    channels: ['online'],
  },
  'COIN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['investing', 'crypto', 'trading', 'speculation', 'learning'],
    valueProps: ['access', 'security', 'simplicity', 'modern', 'accessibility'],
    channels: ['online', 'direct'],
  },
  'HOOD': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'male' },
    occasions: ['investing', 'trading', 'crypto', 'learning', 'banking'],
    valueProps: ['simplicity', 'free', 'accessibility', 'gamification', 'modern'],
    channels: ['online', 'direct'],
  },
  'NU': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'payments', 'credit'],
    valueProps: ['simplicity', 'no-fees', 'modern', 'accessibility'],
    channels: ['online'],
  },

  // ========== 宠物 ==========
  'CHWY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['pet-care', 'convenience', 'subscription'],
    valueProps: ['convenience', 'selection', 'service', 'love'],
    channels: ['online', 'subscription'],
  },
  'IDXX': {
    demographics: { ageGroup: 'all', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['pet-health', 'veterinary'],
    valueProps: ['health', 'diagnostics', 'care'],
    channels: ['direct'],
  },

  // ========== 美容/个护 ==========
  'ULTA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['beauty', 'self-care', 'gifting'],
    valueProps: ['selection', 'experience', 'expertise', 'value'],
    channels: ['retail', 'online'],
  },
  'EL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['beauty', 'skincare', 'luxury', 'anti-aging'],
    valueProps: ['premium', 'efficacy', 'brand', 'prestige'],
    channels: ['retail', 'online', 'direct'],
  },

  // ========== 科技/消费电子 ==========
  'AAPL': {
    demographics: { ageGroup: 'all', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['communication', 'entertainment', 'productivity', 'lifestyle'],
    valueProps: ['premium', 'design', 'ecosystem', 'privacy', 'status'],
    channels: ['retail', 'online', 'direct'],
  },
  'MSFT': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['productivity', 'gaming', 'business', 'education'],
    valueProps: ['productivity', 'integration', 'enterprise', 'reliability'],
    channels: ['online', 'direct', 'retail'],
  },
  'GOOGL': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['search', 'entertainment', 'communication', 'productivity'],
    valueProps: ['convenience', 'free', 'integration', 'innovation'],
    channels: ['online'],
  },
  'META': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['social', 'communication', 'entertainment', 'shopping'],
    valueProps: ['connection', 'community', 'free', 'discovery'],
    channels: ['online'],
  },

  // ========== 汽车 ==========
  'TSLA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['commute', 'lifestyle', 'tech-enthusiast', 'sustainability'],
    valueProps: ['innovation', 'premium', 'sustainability', 'tech', 'status'],
    channels: ['direct', 'online'],
  },
  'F': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['commute', 'family', 'work', 'adventure'],
    valueProps: ['reliability', 'value', 'capability', 'american'],
    channels: ['retail'],
  },
  'GM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'family', 'work'],
    valueProps: ['value', 'variety', 'reliability'],
    channels: ['retail'],
  },
  'RIVN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['adventure', 'lifestyle', 'sustainability', 'outdoor'],
    valueProps: ['adventure', 'sustainability', 'premium', 'tech'],
    channels: ['direct', 'online'],
  },

  // ========== 运动服饰/健身器材 ==========
  'UAA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['fitness', 'sports', 'training'],
    valueProps: ['performance', 'innovation', 'athletic'],
    channels: ['retail', 'online'],
  },
  'DECK': {
    demographics: { ageGroup: 'all', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['comfort', 'casual', 'outdoor'],
    valueProps: ['comfort', 'quality', 'premium'],
    channels: ['retail', 'online'],
  },

  // ========== 家居/家装 ==========
  'HD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['home-improvement', 'diy', 'renovation', 'gardening'],
    valueProps: ['selection', 'value', 'expertise', 'convenience'],
    channels: ['retail', 'online'],
  },
  'LOW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['home-improvement', 'diy', 'renovation', 'gardening'],
    valueProps: ['value', 'service', 'selection'],
    channels: ['retail', 'online'],
  },
  'RH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['home', 'luxury', 'design', 'renovation'],
    valueProps: ['luxury', 'design', 'curation', 'experience'],
    channels: ['retail', 'direct', 'online'],
  },
  'WSM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['home', 'cooking', 'entertaining', 'gifting'],
    valueProps: ['quality', 'curation', 'lifestyle', 'design'],
    channels: ['retail', 'online'],
  },

  // ========== 外卖/配送 ==========
  'DASH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['dining', 'convenience', 'delivery'],
    valueProps: ['convenience', 'speed', 'selection'],
    channels: ['online', 'subscription'],
  },

  // ========== 流媒体/娱乐 ==========
  'ROKU': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'streaming', 'relaxation'],
    valueProps: ['value', 'convenience', 'selection'],
    channels: ['retail', 'online'],
  },

  // ========== 订阅服务 ==========
  'AMZN_PRIME': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['shopping', 'entertainment', 'convenience'],
    valueProps: ['convenience', 'speed', 'value', 'selection'],
    channels: ['subscription', 'online'],
  },

  // ========== 电子产品零售 ==========
  'BBY': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['electronics', 'entertainment', 'home-tech'],
    valueProps: ['selection', 'expertise', 'service', 'price-match'],
    channels: ['retail', 'online'],
  },

  // ========== 户外/运动 ==========
  'DKS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['sports', 'fitness', 'outdoor', 'recreation'],
    valueProps: ['selection', 'value', 'expertise'],
    channels: ['retail', 'online'],
  },

  // ========== 酒店/旅游 (扩展) ==========
  'H': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['travel', 'luxury', 'business-travel'],
    valueProps: ['luxury', 'experience', 'service'],
    channels: ['online', 'direct'],
  },
  'EXPE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'planning'],
    valueProps: ['selection', 'convenience', 'bundling'],
    channels: ['online'],
  },

  // ========== 饮料 ==========
  'KO': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['refreshment', 'social', 'meals', 'everyday'],
    valueProps: ['taste', 'refreshment', 'happiness', 'nostalgia'],
    channels: ['retail'],
  },
  'PEP': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['refreshment', 'snacking', 'social', 'meals'],
    valueProps: ['taste', 'variety', 'convenience'],
    channels: ['retail'],
  },
  'MNST': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'male' },
    occasions: ['energy', 'gaming', 'extreme-sports', 'late-night'],
    valueProps: ['energy', 'bold', 'lifestyle', 'extreme'],
    channels: ['retail', 'online'],
  },

  // ========== 社交媒体 ==========
  'SNAP': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['social', 'communication', 'entertainment', 'ar', 'gaming', 'creativity'],
    valueProps: ['fun', 'authentic', 'creative', 'social', 'free'],
    channels: ['online'],
  },
  'PINS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['planning', 'inspiration', 'shopping', 'diy'],
    valueProps: ['inspiration', 'discovery', 'organization', 'visual'],
    channels: ['online'],
  },
  'RDDT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['community', 'discussion', 'news', 'entertainment'],
    valueProps: ['authenticity', 'community', 'niche', 'anonymity'],
    channels: ['online'],
  },

  // ========== 游戏 ==========
  'EA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['gaming', 'sports', 'entertainment', 'social'],
    valueProps: ['sports', 'live-service', 'community', 'competition'],
    channels: ['online', 'subscription'],
  },
  'TTWO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['gaming', 'entertainment', 'open-world', 'story'],
    valueProps: ['immersion', 'quality', 'story', 'open-world'],
    channels: ['online', 'retail'],
  },
  'RBLX': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['gaming', 'social', 'creativity', 'entertainment', 'communication'],
    valueProps: ['creativity', 'social', 'free', 'fun', 'authentic'],
    channels: ['online'],
  },

  // ========== 医疗健康 ==========
  'CVS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['pharmacy', 'health', 'convenience', 'wellness'],
    valueProps: ['convenience', 'health', 'accessibility', 'service'],
    channels: ['retail', 'online'],
  },
  'WBA': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['pharmacy', 'health', 'convenience'],
    valueProps: ['convenience', 'trust', 'accessibility'],
    channels: ['retail', 'online'],
  },
  'TDOC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['healthcare', 'convenience', 'mental-health', 'wellness', 'self-care'],
    valueProps: ['convenience', 'accessibility', 'privacy', 'modern', 'discretion'],
    channels: ['online', 'subscription'],
  },
  'HIMS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['wellness', 'self-care', 'healthcare', 'convenience', 'mental-health'],
    valueProps: ['convenience', 'discretion', 'modern', 'accessibility', 'privacy'],
    channels: ['online', 'subscription'],
  },
};

// ============================================================
// 经济周期位置配置
// ============================================================

export const CYCLE_POSITIONS: Record<string, CyclePosition> = {
  // ========== 早周期 (Early Cycle) ==========
  // 利率敏感、经济复苏初期受益
  // 房地产、金融、非必需消费
  'LEN': 'early',     // 房建
  'DHI': 'early',
  'PHM': 'early',
  'TOL': 'early',
  'HD': 'early',      // 家装
  'LOW': 'early',
  'WHR': 'early',     // 家电
  'F': 'early',       // 汽车
  'GM': 'early',
  'TSLA': 'early',
  'AN': 'early',      // 汽车经销
  'JPM': 'early',     // 银行
  'BAC': 'early',
  'WFC': 'early',
  'C': 'early',
  'SCHW': 'early',    // 券商
  'MS': 'early',
  'GS': 'early',

  // ========== 中周期 (Mid Cycle) ==========
  // 经济扩张期受益、资本开支增加
  // 工业、材料、科技
  'CAT': 'mid',       // 工业机械
  'DE': 'mid',
  'EMR': 'mid',
  'HON': 'mid',
  'GE': 'mid',
  'NUE': 'mid',       // 钢铁
  'STLD': 'mid',
  'CLF': 'mid',
  'FCX': 'mid',       // 铜矿
  'MSFT': 'mid',      // 科技
  'AAPL': 'mid',
  'GOOGL': 'mid',
  'AMZN': 'mid',
  'NVDA': 'mid',
  'AMD': 'mid',
  'LRCX': 'mid',      // 半导体设备
  'AMAT': 'mid',
  'ASML': 'mid',
  'FDX': 'mid',       // 物流
  'UPS': 'mid',

  // ========== 晚周期 (Late Cycle) ==========
  // 经济过热期受益、大宗商品
  // 能源、材料
  'XOM': 'late',      // 能源
  'CVX': 'late',
  'COP': 'late',
  'EOG': 'late',
  'SLB': 'late',      // 油服
  'HAL': 'late',
  'BKR': 'late',
  'VLO': 'late',      // 炼化
  'MPC': 'late',
  'PSX': 'late',
  'MOS': 'late',      // 化肥
  'NTR': 'late',
  'CF': 'late',
  'ADM': 'late',      // 农产品
  'BG': 'late',
  'GOLD': 'late',     // 黄金
  'NEM': 'late',

  // ========== 航运物流 (Late Cycle / Cyclical) ==========
  // 航运是强周期行业，与全球贸易、大宗商品价格高度相关
  // 集装箱航运
  'ZIM': 'late',      // 集装箱航运
  'MATX': 'late',     // Matson - 太平洋航线
  // 干散货航运 - 与铁矿石、煤炭、粮食需求相关
  'GOGL': 'late',     // Golden Ocean - Capesize
  'SBLK': 'late',     // Star Bulk
  'GNK': 'late',      // Genco
  'EGLE': 'late',     // Eagle Bulk
  // 油轮运输 - 与原油贸易相关
  'FRO': 'late',      // Frontline - VLCC
  'STNG': 'late',     // Scorpio Tankers - 成品油
  'TNK': 'late',      // Teekay Tankers
  'DHT': 'late',      // DHT Holdings
  'INSW': 'late',     // International Seaways
  // LNG运输
  'FLNG': 'mid',      // Flex LNG - 长约为主，周期性较弱
  // 物流快递 - 中周期
  'FDX': 'mid',       // FedEx
  'UPS': 'mid',       // UPS
  // 货代/经纪 - 轻资产，相对稳定
  'EXPD': 'mid',      // Expeditors
  'CHRW': 'mid',      // C.H. Robinson
  // 铁路 - 中周期
  'UNP': 'mid',       // Union Pacific
  'CSX': 'mid',       // CSX
  'NSC': 'mid',       // Norfolk Southern
  // 卡车物流
  'XPO': 'mid',       // XPO
  'JBHT': 'mid',      // J.B. Hunt

  // ========== 防御型 (Defensive) ==========
  // 经济下行期防御、必需消费、公用事业、医疗
  'JNJ': 'defensive', // 医疗
  'PFE': 'defensive',
  'MRK': 'defensive',
  'ABBV': 'defensive',
  'LLY': 'defensive',
  'UNH': 'defensive',
  'CVS': 'defensive',
  'WBA': 'defensive',
  'MCK': 'defensive',
  'PG': 'defensive',  // 必需消费
  'KO': 'defensive',
  'PEP': 'defensive',
  'CL': 'defensive',
  'KMB': 'defensive',
  'GIS': 'defensive',
  'K': 'defensive',
  'WMT': 'defensive',
  'COST': 'defensive',
  'DG': 'defensive',
  'NEE': 'defensive', // 公用事业
  'DUK': 'defensive',
  'SO': 'defensive',
  'D': 'defensive',
  'AEP': 'defensive',
  'T': 'defensive',   // 电信
  'VZ': 'defensive',
  'TMUS': 'defensive',
};

// ============================================================
// 宏观敏感度配置
// ============================================================

export const MACRO_SENSITIVITY: Record<string, MacroSensitivity> = {
  // ========== 利率高敏感 (正相关 - 受益于加息) ==========
  'JPM': {
    interestRate: 0.8, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.4, dollarIndex: 0.3, oilPrice: 0.1,
  },
  'BAC': {
    interestRate: 0.8, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.4, dollarIndex: 0.3, oilPrice: 0.1,
  },
  'WFC': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: 0.2, oilPrice: 0.0,
  },

  // ========== 利率高敏感 (负相关 - 受损于加息) ==========
  'LEN': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'DHI': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'TSLA': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.4,
  },

  // ========== 油价高敏感 (正相关) ==========
  'XOM': {
    interestRate: 0.2, inflation: 0.5, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'CVX': {
    interestRate: 0.2, inflation: 0.5, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'SLB': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.85,
  },

  // ========== 油价高敏感 (负相关) ==========
  'DAL': {
    interestRate: -0.3, inflation: -0.4, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.8,
  },
  'UAL': {
    interestRate: -0.3, inflation: -0.4, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.8,
  },
  'LUV': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.75,
  },

  // ========== 美元高敏感 (负相关 - 出口/海外收入) ==========
  'AAPL': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'MSFT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'PG': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'KO': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },

  // ========== 航运物流 (全球贸易敏感) ==========
  // 集装箱航运 - 与全球贸易、消费需求高度相关
  'ZIM': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: -0.5, oilPrice: -0.3,
  },
  'MATX': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: -0.3,
  },

  // 干散货航运 - 与大宗商品、中国需求高度相关
  'GOGL': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.9, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.6, oilPrice: -0.2,
  },
  'SBLK': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.9, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.6, oilPrice: -0.2,
  },
  'GNK': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.9, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.6, oilPrice: -0.2,
  },

  // 油轮运输 - 油价正相关（油价高→运输需求高）
  'FRO': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.7,
  },
  'STNG': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.6,
  },
  'DHT': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.7,
  },

  // 快递物流 - 与消费、电商相关
  'FDX': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.4,
  },
  'UPS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.4,
  },

  // 铁路 - 与工业生产、大宗商品相关
  'UNP': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'CSX': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // ========== 防御型 (低宏观敏感度) ==========
  'JNJ': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'UNH': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'WMT': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
};

// ============================================================
// 跨产业链影响配置
// ============================================================

export const CROSS_CHAIN_IMPACT: Record<string, string[]> = {
  // 半导体影响多个下游
  'NVDA': ['Semiconductor Chain', 'Tech/Cloud Chain', 'Auto Chain', 'Gaming'],
  'AMD': ['Semiconductor Chain', 'Tech/Cloud Chain', 'Gaming'],
  'INTC': ['Semiconductor Chain', 'Tech/Cloud Chain', 'Auto Chain'],
  'QCOM': ['Semiconductor Chain', 'Consumer Electronics', 'Auto Chain', 'IoT'],

  // 云服务影响多个行业
  'AMZN': ['Tech/Cloud Chain', 'Consumer Retail Chain', 'Logistics'],
  'MSFT': ['Tech/Cloud Chain', 'Enterprise Software', 'Gaming'],
  'GOOGL': ['Tech/Cloud Chain', 'Advertising', 'Consumer Tech'],

  // 锂/电池影响多个终端
  'ALB': ['EV/Auto Chain', 'Energy Storage', 'Consumer Electronics'],
  'SQM': ['EV/Auto Chain', 'Energy Storage', 'Agriculture'],

  // 钢铁影响多个下游
  'NUE': ['Construction Chain', 'Auto Chain', 'Energy Infrastructure'],
  'STLD': ['Construction Chain', 'Auto Chain', 'Industrial'],

  // 能源影响运输和化工
  'XOM': ['Oil & Gas Chain', 'Chemicals', 'Aviation Chain'],
  'CVX': ['Oil & Gas Chain', 'Chemicals', 'Aviation Chain'],

  // 支付网络影响多个消费场景
  'V': ['Financial Chain', 'Consumer Retail Chain', 'Travel Chain', 'E-commerce'],
  'MA': ['Financial Chain', 'Consumer Retail Chain', 'Travel Chain', 'E-commerce'],

  // 航运物流 - 全球贸易基础设施
  'ZIM': ['Container Shipping', 'Consumer Retail Chain', 'E-commerce', 'Semiconductor Chain'],
  'MATX': ['Container Shipping', 'Consumer Retail Chain', 'Pacific Trade'],
  'FDX': ['Express Logistics', 'E-commerce', 'Consumer Retail Chain', 'Healthcare'],
  'UPS': ['Express Logistics', 'E-commerce', 'Consumer Retail Chain', 'Healthcare'],
  'UNP': ['Rail Freight', 'Industrial Chain', 'Agriculture', 'Energy'],
  'CSX': ['Rail Freight', 'Industrial Chain', 'Auto Chain', 'Energy'],
};

// ============================================================
// 辅助函数
// ============================================================

/**
 * 计算两个客群画像的重合度
 */
export function calculateCustomerOverlap(
  profileA: CustomerProfile,
  profileB: CustomerProfile
): number {
  let score = 0;
  let totalWeight = 0;

  // 人口统计重合 (权重30%)
  const demoWeight = 0.3;
  let demoScore = 0;
  if (profileA.demographics.ageGroup === profileB.demographics.ageGroup ||
      profileA.demographics.ageGroup === 'all' ||
      profileB.demographics.ageGroup === 'all') {
    demoScore += 0.4;
  }
  if (profileA.demographics.incomeLevel === profileB.demographics.incomeLevel ||
      profileA.demographics.incomeLevel === 'all' ||
      profileB.demographics.incomeLevel === 'all') {
    demoScore += 0.4;
  }
  if (profileA.demographics.gender === profileB.demographics.gender ||
      profileA.demographics.gender === 'all' ||
      profileB.demographics.gender === 'all' ||
      !profileA.demographics.gender ||
      !profileB.demographics.gender) {
    demoScore += 0.2;
  }
  score += demoScore * demoWeight;
  totalWeight += demoWeight;

  // 消费场景重合 (权重35%)
  const occasionWeight = 0.35;
  const occasionIntersection = profileA.occasions.filter(o => profileB.occasions.includes(o));
  const occasionUnion = [...new Set([...profileA.occasions, ...profileB.occasions])];
  const occasionScore = occasionUnion.length > 0
    ? occasionIntersection.length / occasionUnion.length
    : 0;
  score += occasionScore * occasionWeight;
  totalWeight += occasionWeight;

  // 价值主张重合 (权重25%)
  const valueWeight = 0.25;
  const valueIntersection = profileA.valueProps.filter(v => profileB.valueProps.includes(v));
  const valueUnion = [...new Set([...profileA.valueProps, ...profileB.valueProps])];
  const valueScore = valueUnion.length > 0
    ? valueIntersection.length / valueUnion.length
    : 0;
  score += valueScore * valueWeight;
  totalWeight += valueWeight;

  // 渠道重合 (权重10%)
  const channelWeight = 0.1;
  const channelIntersection = profileA.channels.filter(c => profileB.channels.includes(c));
  const channelUnion = [...new Set([...profileA.channels, ...profileB.channels])];
  const channelScore = channelUnion.length > 0
    ? channelIntersection.length / channelUnion.length
    : 0;
  score += channelScore * channelWeight;
  totalWeight += channelWeight;

  return score / totalWeight;
}

/**
 * 计算宏观敏感度相似度
 */
export function calculateMacroSimilarity(
  sensA: MacroSensitivity,
  sensB: MacroSensitivity
): number {
  const factors: (keyof MacroSensitivity)[] = [
    'interestRate', 'inflation', 'gdpGrowth', 'unemployment',
    'consumerConfidence', 'housingMarket', 'dollarIndex', 'oilPrice',
  ];

  // 计算向量余弦相似度
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const factor of factors) {
    const a = sensA[factor];
    const b = sensB[factor];
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}

/**
 * 检查两个公司是否有跨链关联
 */
export function checkCrossChainRelation(
  symbolA: string,
  symbolB: string
): string[] {
  const chainsA = CROSS_CHAIN_IMPACT[symbolA] || [];
  const chainsB = CROSS_CHAIN_IMPACT[symbolB] || [];

  // 找到共同影响的产业链
  return chainsA.filter(chain => chainsB.includes(chain));
}

/**
 * 获取公司的客群画像
 */
export function getCustomerProfile(symbol: string): CustomerProfile | null {
  return CUSTOMER_PROFILES[symbol] || null;
}

/**
 * 获取公司的周期位置
 */
export function getCyclePosition(symbol: string): CyclePosition | null {
  return CYCLE_POSITIONS[symbol] || null;
}

/**
 * 获取公司的宏观敏感度
 */
export function getMacroSensitivity(symbol: string): MacroSensitivity | null {
  return MACRO_SENSITIVITY[symbol] || null;
}

export default {
  CUSTOMER_PROFILES,
  CYCLE_POSITIONS,
  MACRO_SENSITIVITY,
  CROSS_CHAIN_IMPACT,
};
