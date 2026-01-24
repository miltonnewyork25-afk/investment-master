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
  'COTY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['beauty', 'fragrance', 'cosmetics', 'self-care'],
    valueProps: ['brand', 'value', 'trend'],
    channels: ['retail', 'online'],
  },
  'TPR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fashion', 'accessories', 'gifting', 'luxury'],
    valueProps: ['brand', 'quality', 'accessible-luxury', 'heritage'],
    channels: ['retail', 'online', 'direct'],
  },
  'RL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fashion', 'lifestyle', 'luxury', 'heritage'],
    valueProps: ['premium', 'heritage', 'lifestyle', 'quality'],
    channels: ['retail', 'online', 'direct'],
  },
  'STZ': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['social', 'dining', 'relaxation', 'celebration'],
    valueProps: ['premium', 'brand', 'taste', 'lifestyle'],
    channels: ['retail', 'online'],
  },
  'DEO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['social', 'celebration', 'gifting', 'luxury'],
    valueProps: ['premium', 'heritage', 'quality', 'variety'],
    channels: ['retail', 'online'],
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

  // ========== 电信 (Consumer) ==========
  'T': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['communication', 'entertainment', 'connectivity', 'family'],
    valueProps: ['reliability', 'coverage', 'bundling', 'value'],
    channels: ['retail', 'online', 'direct'],
  },
  'VZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['communication', 'connectivity', 'business', 'streaming'],
    valueProps: ['reliability', 'network_quality', 'coverage', 'premium'],
    channels: ['retail', 'online', 'direct'],
  },
  'TMUS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['communication', 'streaming', 'value', 'family'],
    valueProps: ['value', 'innovation', 'simplicity', 'coverage'],
    channels: ['retail', 'online'],
  },

  // ========== 企业SaaS (B2B - Enterprise IT Buyer) ==========
  'CRM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'digital-transform', 'sales', 'automation'],
    valueProps: ['platform', 'integration', 'ai', 'ecosystem'],
    channels: ['direct', 'online'],
  },
  'NOW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'digital-transform', 'automation', 'workflow'],
    valueProps: ['platform', 'automation', 'integration', 'efficiency'],
    channels: ['direct'],
  },
  'WDAY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'hr', 'finance', 'workforce'],
    valueProps: ['cloud', 'integration', 'analytics', 'user_experience'],
    channels: ['direct'],
  },
  'CRWD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'security', 'threat-detection', 'compliance'],
    valueProps: ['security', 'cloud_native', 'ai', 'real_time'],
    channels: ['direct', 'online'],
  },
  'PANW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'security', 'network', 'compliance'],
    valueProps: ['platform', 'security', 'integration', 'automation'],
    channels: ['direct'],
  },
  'ORCL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'database', 'cloud', 'erp'],
    valueProps: ['enterprise', 'reliability', 'integration', 'performance'],
    channels: ['direct'],
  },
  'CSCO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'networking', 'security', 'collaboration'],
    valueProps: ['reliability', 'enterprise', 'integration', 'scale'],
    channels: ['direct', 'retail'],
  },
  'DELL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['enterprise-it', 'infrastructure', 'storage', 'compute'],
    valueProps: ['reliability', 'enterprise', 'performance', 'scale'],
    channels: ['direct', 'retail'],
  },

  // ========== 建筑/基建 (B2B - Construction Buyer) ==========
  'CAT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['construction', 'mining', 'infrastructure', 'rental'],
    valueProps: ['reliability', 'performance', 'dealer_network', 'resale'],
    channels: ['retail', 'direct'],
  },
  'DE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['agriculture', 'construction', 'infrastructure', 'precision'],
    valueProps: ['precision', 'technology', 'dealer_network', 'reliability'],
    channels: ['retail', 'direct'],
  },
  'SHW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['home-improvement', 'construction', 'renovation', 'professional'],
    valueProps: ['quality', 'selection', 'expertise', 'pro_service'],
    channels: ['retail', 'direct'],
  },
  'VMC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['construction', 'infrastructure', 'road-building', 'development'],
    valueProps: ['proximity', 'quality', 'reliability', 'scale'],
    channels: ['direct'],
  },

  // ========== 低成本航空 - 补充 ==========
  'JBLU': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'weekend-trips', 'leisure'],
    valueProps: ['value', 'comfort', 'entertainment', 'legroom'],
    channels: ['online', 'direct'],
  },
  'ALK': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'west-coast'],
    valueProps: ['reliability', 'loyalty', 'value', 'premium_economy'],
    channels: ['online', 'direct'],
  },
  'SAVE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'budget-travel', 'leisure'],
    valueProps: ['low_price', 'point-to-point', 'no-frills'],
    channels: ['online', 'direct'],
  },
  'ULCC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'budget-travel', 'leisure'],
    valueProps: ['low_price', 'frequency', 'no-frills'],
    channels: ['online', 'direct'],
  },

  // ========== 汽车OEM/经销商 - 补充 ==========
  'STLA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'family', 'outdoor', 'work'],
    valueProps: ['brand_variety', 'SUV', 'truck', 'value'],
    channels: ['retail', 'direct'],
  },
  'TM': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'family', 'reliability', 'daily-use'],
    valueProps: ['reliability', 'resale_value', 'hybrid', 'efficiency'],
    channels: ['retail'],
  },
  'HMC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'family', 'motorcycles', 'outdoor'],
    valueProps: ['reliability', 'value', 'efficiency', 'practicality'],
    channels: ['retail'],
  },
  'FSR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['commute', 'luxury', 'sustainability', 'tech'],
    valueProps: ['design', 'EV', 'sustainability', 'premium'],
    channels: ['direct', 'online'],
  },
  'NIO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['commute', 'tech', 'premium', 'family'],
    valueProps: ['premium', 'battery_swap', 'community', 'tech'],
    channels: ['direct', 'online'],
  },
  'XPEV': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'tech', 'autonomous', 'daily-use'],
    valueProps: ['smart', 'autonomous', 'tech', 'value'],
    channels: ['direct', 'online'],
  },
  'LI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['family', 'road-trip', 'commute', 'outdoor'],
    valueProps: ['range', 'family', 'space', 'practical_EV'],
    channels: ['direct', 'online'],
  },
  'GPI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['vehicle-purchase', 'luxury', 'service', 'upgrade'],
    valueProps: ['selection', 'luxury', 'service', 'financing'],
    channels: ['retail'],
  },
  'SAH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['vehicle-purchase', 'luxury', 'service', 'pre-owned'],
    valueProps: ['premium', 'luxury', 'service', 'convenience'],
    channels: ['retail', 'online'],
  },
  'ABG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['vehicle-purchase', 'service', 'trade-in', 'financing'],
    valueProps: ['selection', 'value', 'service', 'one-stop'],
    channels: ['retail', 'online'],
  },
  'CAR': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'temporary-transport'],
    valueProps: ['convenience', 'selection', 'price', 'flexibility'],
    channels: ['online', 'retail'],
  },
  'HTZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'temporary-transport'],
    valueProps: ['convenience', 'brand', 'selection', 'loyalty'],
    channels: ['online', 'retail'],
  },

  // ========== 旅游/电商/零售 - 补充 ==========
  'TRIP': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'restaurants', 'research'],
    valueProps: ['reviews', 'price_comparison', 'user_content', 'planning'],
    channels: ['online'],
  },
  'MTH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home-purchase', 'family', 'relocation', 'first-home'],
    valueProps: ['value', 'design', 'energy_efficiency', 'community'],
    channels: ['direct', 'online'],
  },
  'IHG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'family'],
    valueProps: ['brand_variety', 'loyalty', 'consistency', 'value'],
    channels: ['online', 'direct'],
  },
  'WH': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['travel', 'vacation', 'road-trip', 'budget-travel'],
    valueProps: ['value', 'consistency', 'loyalty', 'accessibility'],
    channels: ['online', 'direct'],
  },
  'EBAY': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['shopping', 'collectibles', 'bargain', 'secondhand'],
    valueProps: ['selection', 'price', 'auction', 'unique_items'],
    channels: ['online'],
  },
  'ETSY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['gifts', 'home-decor', 'handmade', 'personalized'],
    valueProps: ['unique', 'handmade', 'personalized', 'artisan'],
    channels: ['online'],
  },
  'TJX': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'female' },
    occasions: ['shopping', 'bargain', 'fashion', 'home-decor'],
    valueProps: ['value', 'brands', 'treasure_hunt', 'savings'],
    channels: ['retail'],
  },
  'ROST': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'female' },
    occasions: ['shopping', 'bargain', 'fashion', 'basics'],
    valueProps: ['value', 'discount', 'brands', 'savings'],
    channels: ['retail'],
  },
  'WEN': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['dining', 'quick-meal', 'drive-thru', 'lunch'],
    valueProps: ['quality', 'value', 'fresh', 'convenience'],
    channels: ['retail', 'direct'],
  },
  'LYFT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commute', 'night-out', 'airport', 'convenience'],
    valueProps: ['convenience', 'price', 'safety', 'app'],
    channels: ['online'],
  },
  'RAD': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['pharmacy', 'health', 'convenience', 'wellness'],
    valueProps: ['convenience', 'proximity', 'pharmacy', 'health'],
    channels: ['retail'],
  },
  'CYH': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['healthcare', 'emergency', 'surgery', 'chronic-care'],
    valueProps: ['access', 'proximity', 'community', 'acute_care'],
    channels: ['direct'],
  },

  // ========== 大型零售 - 补充 (Mass Retail) ==========
  'DG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['convenience', 'household', 'snacks', 'quick-trip'],
    valueProps: ['value', 'proximity', 'convenience', 'affordability'],
    channels: ['retail'],
  },
  'DLTR': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['household', 'party', 'snacks', 'bargain'],
    valueProps: ['value', 'treasure_hunt', 'affordability'],
    channels: ['retail'],
  },

  // ========== 快餐/餐饮 - 补充 ==========
  'YUM': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['quick-meal', 'drive-thru', 'convenience', 'snack'],
    valueProps: ['value', 'convenience', 'variety', 'speed'],
    channels: ['retail'],
  },

  // ========== 电商平台 - 补充 ==========
  'SHOP': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['small-business', 'online-shopping', 'direct-brand', 'entrepreneurship'],
    valueProps: ['simplicity', 'tools', 'independence', 'growth'],
    channels: ['online'],
  },

  // ========== 运动/户外 - 补充 ==========
  'ADDYY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['sports', 'athleisure', 'fitness', 'casual', 'streetwear'],
    valueProps: ['brand', 'performance', 'style', 'collaboration'],
    channels: ['retail', 'online', 'direct'],
  },
  'FL': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['sneakers', 'streetwear', 'sports', 'fashion'],
    valueProps: ['selection', 'brands', 'culture', 'exclusives'],
    channels: ['retail', 'online'],
  },

  // ========== 航空公司 ==========
  'DAL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['business_travel', 'vacation', 'family_trip', 'commute'],
    valueProps: ['reliability', 'loyalty_program', 'premium_service', 'network'],
    channels: ['online', 'mobile', 'travel_agent'],
  },
  'UAL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['business_travel', 'international', 'vacation', 'connecting'],
    valueProps: ['global_network', 'loyalty', 'premium_cabins', 'hubs'],
    channels: ['online', 'mobile', 'travel_agent'],
  },
  'LUV': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['leisure', 'weekend_trip', 'family', 'budget_travel'],
    valueProps: ['low_fare', 'no_fees', 'flexibility', 'fun'],
    channels: ['online', 'mobile'],
  },
  'AAL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['business_travel', 'vacation', 'domestic', 'international'],
    valueProps: ['network', 'loyalty', 'frequency', 'alliances'],
    channels: ['online', 'mobile', 'travel_agent'],
  },

  // ========== 邮轮 ==========
  'CCL': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['vacation', 'retirement', 'family_reunion', 'celebration'],
    valueProps: ['all_inclusive', 'entertainment', 'destinations', 'relaxation'],
    channels: ['online', 'travel_agent'],
  },
  'RCL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['family_vacation', 'adventure', 'celebration', 'getaway'],
    valueProps: ['innovation', 'family_friendly', 'adventure', 'luxury'],
    channels: ['online', 'travel_agent'],
  },

  // ========== 家居建材 ==========
  'DHI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['first_home', 'family_growth', 'relocation', 'upgrade'],
    valueProps: ['affordability', 'selection', 'quality', 'speed'],
    channels: ['sales_center', 'online'],
  },
  'LEN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['first_home', 'move_up', 'relocation', 'retirement'],
    valueProps: ['value', 'design', 'communities', 'technology'],
    channels: ['sales_center', 'online'],
  },

  // ========== 餐饮补充 ==========
  'DRI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_dinner', 'celebration', 'casual_dining', 'date_night'],
    valueProps: ['variety', 'value', 'atmosphere', 'quality'],
    channels: ['retail', 'online', 'delivery'],
  },
  'WING': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'male' },
    occasions: ['sports_watching', 'casual_meal', 'group_dining', 'takeout'],
    valueProps: ['flavor', 'sports', 'social', 'delivery'],
    channels: ['retail', 'delivery', 'online'],
  },

  // ========== 包装食品 ==========
  'GIS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_meals', 'breakfast', 'baking', 'snacking'],
    valueProps: ['trust', 'nutrition', 'convenience', 'variety'],
    channels: ['grocery', 'mass_retail', 'online'],
  },
  'K': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['breakfast', 'snacking', 'school_lunch', 'convenience'],
    valueProps: ['brands', 'nutrition', 'taste', 'convenience'],
    channels: ['grocery', 'mass_retail'],
  },
  'KHC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_cooking', 'quick_meals', 'condiments', 'snacking'],
    valueProps: ['iconic_brands', 'value', 'taste', 'convenience'],
    channels: ['grocery', 'mass_retail', 'warehouse'],
  },
  'MDLZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['snacking', 'treat', 'gift', 'sharing'],
    valueProps: ['brands', 'indulgence', 'variety', 'quality'],
    channels: ['grocery', 'mass_retail', 'convenience'],
  },
  'HSY': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['holiday', 'gift', 'treat', 'sharing', 'celebration'],
    valueProps: ['iconic_brands', 'quality', 'variety', 'tradition'],
    channels: ['grocery', 'mass_retail', 'convenience', 'online'],
  },

  // ========== 家居用品 ==========
  'PG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['daily_essentials', 'household', 'personal_care', 'baby'],
    valueProps: ['quality', 'trust', 'innovation', 'brand_portfolio'],
    channels: ['grocery', 'mass_retail', 'warehouse', 'online'],
  },
  'CL': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['oral_care', 'cleaning', 'personal_care', 'pet_nutrition'],
    valueProps: ['trust', 'efficacy', 'global_brands', 'value'],
    channels: ['grocery', 'mass_retail', 'pharmacy'],
  },
  'KMB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['baby_care', 'personal_care', 'household', 'workplace'],
    valueProps: ['quality', 'essentials', 'trust', 'comfort'],
    channels: ['grocery', 'mass_retail', 'warehouse', 'online'],
  },
  'CLX': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['cleaning', 'disinfecting', 'wellness', 'home_care'],
    valueProps: ['efficacy', 'safety', 'trust', 'essential'],
    channels: ['grocery', 'mass_retail', 'warehouse'],
  },

  // ========== 支付/银行 ==========
  'V': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['shopping', 'travel', 'online_purchase', 'daily_spend'],
    valueProps: ['acceptance', 'security', 'rewards', 'convenience'],
    channels: ['partner_banks', 'online', 'mobile'],
  },
  'MA': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['shopping', 'travel', 'online_purchase', 'daily_spend'],
    valueProps: ['global_acceptance', 'security', 'innovation', 'priceless'],
    channels: ['partner_banks', 'online', 'mobile'],
  },
  'JPM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['banking', 'investing', 'mortgage', 'credit_card'],
    valueProps: ['scale', 'products', 'technology', 'rewards'],
    channels: ['branch', 'online', 'mobile'],
  },
  'BAC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'auto_loan', 'saving'],
    valueProps: ['convenience', 'digital', 'network', 'services'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ========== 保险 ==========
  'UNH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['health_coverage', 'pharmacy', 'wellness', 'employer_plan'],
    valueProps: ['network', 'coverage', 'digital_tools', 'optum_services'],
    channels: ['employer', 'exchange', 'direct', 'online'],
  },
  'MET': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['life_insurance', 'dental', 'disability', 'retirement'],
    valueProps: ['reliability', 'global', 'benefits', 'financial_protection'],
    channels: ['employer', 'agent', 'online'],
  },

  // ========== 公用事业 ==========
  'NEE': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_power', 'solar', 'reliability'],
    valueProps: ['clean_energy', 'reliability', 'affordability', 'innovation'],
    channels: ['utility_bill', 'online'],
  },

  // ========== 烟草 ==========
  'PM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['smoking', 'nicotine', 'reduced_risk', 'habitual'],
    valueProps: ['brands', 'quality', 'iqos_innovation', 'satisfaction'],
    channels: ['retail', 'convenience', 'duty_free'],
  },
  'MO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['smoking', 'nicotine', 'habitual', 'convenience'],
    valueProps: ['marlboro', 'availability', 'loyalty', 'value'],
    channels: ['convenience', 'retail', 'gas_station'],
  },

  // ========== 酒类 ==========
  'TAP': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['sports', 'social', 'barbecue', 'relaxation'],
    valueProps: ['refreshment', 'brands', 'affordability', 'tradition'],
    channels: ['grocery', 'convenience', 'bar', 'online'],
  },
  'SAM': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['craft_beer', 'social', 'discovery', 'dining'],
    valueProps: ['variety', 'quality', 'innovation', 'local_craft'],
    channels: ['grocery', 'bar', 'liquor_store'],
  },

  // ========== 服装零售 ==========
  'GPS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['casual', 'work', 'basics', 'athleisure'],
    valueProps: ['value', 'variety', 'brands', 'accessibility'],
    channels: ['retail', 'online', 'outlet'],
  },
  'ANF': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['casual', 'going_out', 'vacation', 'date'],
    valueProps: ['style', 'quality', 'brand', 'experience'],
    channels: ['retail', 'online'],
  },
  'URBN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fashion', 'home_decor', 'lifestyle', 'self_expression'],
    valueProps: ['curation', 'aesthetics', 'lifestyle', 'discovery'],
    channels: ['retail', 'online'],
  },
  'HBI': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['everyday_basics', 'underwear', 'activewear', 'essentials'],
    valueProps: ['comfort', 'value', 'quality', 'basics'],
    channels: ['mass_retail', 'online', 'warehouse'],
  },

  // ========== 汽配零售 ==========
  'AZO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['car_repair', 'maintenance', 'diy', 'emergency'],
    valueProps: ['expertise', 'parts_availability', 'service', 'value'],
    channels: ['retail', 'online'],
  },
  'ORLY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['car_repair', 'professional_mechanic', 'diy', 'maintenance'],
    valueProps: ['selection', 'expertise', 'availability', 'professional_grade'],
    channels: ['retail', 'online'],
  },

  // ========== 住房/抵押 ==========
  'RKT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'refinance', 'personal_loan', 'first_home'],
    valueProps: ['speed', 'digital', 'simplicity', 'transparency'],
    channels: ['online', 'mobile'],
  },

  // ========== 券商 ==========
  'SCHW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investing', 'retirement', 'trading', 'wealth_management'],
    valueProps: ['low_cost', 'tools', 'research', 'service'],
    channels: ['online', 'mobile', 'branch'],
  },

  // ========== 计算机/消费电子 ==========
  'HPQ': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['work', 'printing', 'home_office', 'school'],
    valueProps: ['reliability', 'value', 'productivity', 'ecosystem'],
    channels: ['retail', 'online', 'enterprise'],
  },
  'SONO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_audio', 'music', 'entertainment', 'smart_home'],
    valueProps: ['sound_quality', 'design', 'multi_room', 'ecosystem'],
    channels: ['retail', 'online', 'direct'],
  },

  // ========== 饮料 ==========
  'KDP': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['morning_coffee', 'refreshment', 'convenience', 'variety'],
    valueProps: ['keurig_system', 'brand_variety', 'convenience', 'value'],
    channels: ['grocery', 'mass_retail', 'warehouse', 'online'],
  },

  // ========== 太阳能 ==========
  'ENPH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['solar_installation', 'energy_savings', 'home_upgrade', 'sustainability'],
    valueProps: ['efficiency', 'reliability', 'monitoring', 'microinverter'],
    channels: ['installer', 'online'],
  },

  // ========== 包装食品补充 ==========
  'CAG': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['frozen_meals', 'snacking', 'family_dinner', 'convenience'],
    valueProps: ['convenience', 'brands', 'value', 'variety'],
    channels: ['grocery', 'mass_retail', 'warehouse'],
  },
  'CPB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['soup', 'snacking', 'comfort_food', 'quick_meal'],
    valueProps: ['trust', 'nostalgia', 'convenience', 'brands'],
    channels: ['grocery', 'mass_retail'],
  },
  'SJM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['breakfast', 'coffee', 'pet_food', 'baking'],
    valueProps: ['quality', 'brands', 'taste', 'tradition'],
    channels: ['grocery', 'mass_retail', 'warehouse'],
  },
  'TSN': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['protein', 'family_meals', 'grilling', 'meal_prep'],
    valueProps: ['quality', 'variety', 'value', 'protein_brands'],
    channels: ['grocery', 'mass_retail', 'warehouse', 'foodservice'],
  },
  'CHD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['cleaning', 'personal_care', 'laundry', 'wellness'],
    valueProps: ['value', 'trusted_brands', 'efficacy', 'variety'],
    channels: ['grocery', 'mass_retail', 'warehouse', 'online'],
  },

  // ========== 消费金融 ==========
  'SYF': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['large_purchase', 'home_improvement', 'healthcare', 'retail_financing'],
    valueProps: ['financing_options', 'rewards', 'partnership', 'accessibility'],
    channels: ['retail_partner', 'online', 'mobile'],
  },

  // ========== 家具/家居零售补充 ==========
  'W': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_furnishing', 'apartment', 'renovation', 'decor'],
    valueProps: ['selection', 'value', 'convenience', 'visualization'],
    channels: ['online', 'mobile'],
  },

  // ========== 汽车零售 ==========
  'CVNA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['car_purchase', 'trade_in', 'financing', 'convenience'],
    valueProps: ['no_haggle', 'delivery', 'selection', 'digital_first'],
    channels: ['online', 'vending_machine'],
  },

  // ========== 时尚/奢侈品 ==========
  'CPRI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['luxury', 'fashion', 'accessory', 'formal'],
    valueProps: ['glamour', 'brands', 'craftsmanship', 'status'],
    channels: ['retail', 'online', 'wholesale'],
  },
  'VFC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['outdoor', 'workwear', 'casual', 'adventure'],
    valueProps: ['durability', 'heritage', 'performance', 'brands'],
    channels: ['retail', 'online', 'wholesale'],
  },
  'PVH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fashion', 'basics', 'underwear', 'denim'],
    valueProps: ['iconic_brands', 'style', 'quality', 'global'],
    channels: ['retail', 'wholesale', 'online'],
  },

  // ========== 百货/折扣零售 ==========
  'M': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'female' },
    occasions: ['shopping', 'fashion', 'home', 'gift', 'event'],
    valueProps: ['brands', 'selection', 'experience', 'loyalty'],
    channels: ['retail', 'online'],
  },
  'KSS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_clothing', 'home', 'value_shopping', 'basics'],
    valueProps: ['value', 'kohls_cash', 'convenience', 'brands'],
    channels: ['retail', 'online'],
  },
  'BJ': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['bulk_shopping', 'grocery', 'household', 'gas'],
    valueProps: ['value', 'membership', 'convenience', 'selection'],
    channels: ['warehouse', 'online'],
  },

  // ========== 消费金融 ==========
  'ALLY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_loan', 'savings', 'investing', 'banking'],
    valueProps: ['digital_first', 'rates', 'no_fees', 'simplicity'],
    channels: ['online', 'mobile'],
  },
  'COF': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['credit_card', 'travel_rewards', 'banking', 'auto_loan'],
    valueProps: ['rewards', 'no_foreign_fee', 'matching', 'digital'],
    channels: ['online', 'mobile', 'retail_partner'],
  },
  'DFS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['credit_card', 'cashback', 'banking', 'student_loan'],
    valueProps: ['cashback', 'no_annual_fee', 'service', 'simplicity'],
    channels: ['online', 'mobile'],
  },
  'AXP': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['travel', 'business_expense', 'premium_purchase', 'dining'],
    valueProps: ['prestige', 'rewards', 'perks', 'service'],
    channels: ['online', 'mobile', 'phone'],
  },

  // ========== 有线/电信 ==========
  'CMCSA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['internet', 'tv', 'streaming', 'mobile'],
    valueProps: ['bundling', 'speed', 'content', 'coverage'],
    channels: ['retail', 'online', 'phone'],
  },
  'CHTR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['internet', 'tv', 'mobile', 'bundling'],
    valueProps: ['speed', 'no_contract', 'bundling', 'coverage'],
    channels: ['retail', 'online', 'phone'],
  },

  // ========== 住宅REIT ==========
  'EQR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['apartment_rental', 'relocation', 'urban_living', 'lease'],
    valueProps: ['location', 'amenities', 'quality', 'community'],
    channels: ['online', 'leasing_office'],
  },
  'AVB': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['apartment_rental', 'urban_living', 'commute', 'lifestyle'],
    valueProps: ['quality', 'location', 'amenities', 'management'],
    channels: ['online', 'leasing_office'],
  },
  'INVH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_rental', 'family', 'relocation', 'flexibility'],
    valueProps: ['single_family', 'space', 'neighborhood', 'no_mortgage'],
    channels: ['online', 'property_manager'],
  },

  // ========== 自存储REIT ==========
  'PSA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['moving', 'declutter', 'renovation', 'business_storage'],
    valueProps: ['convenience', 'security', 'accessibility', 'variety'],
    channels: ['online', 'retail'],
  },
  'EXR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['moving', 'storage', 'downsizing', 'seasonal'],
    valueProps: ['locations', 'value', 'convenience', 'security'],
    channels: ['online', 'retail'],
  },

  // ========== 房建补充 ==========
  'PHM': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['first_home', 'move_up', 'active_adult', 'retirement'],
    valueProps: ['design', 'quality', 'value', 'communities'],
    channels: ['sales_center', 'online'],
  },
  'TOL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['luxury_home', 'move_up', 'relocation', 'custom'],
    valueProps: ['luxury', 'customization', 'quality', 'locations'],
    channels: ['sales_center', 'online'],
  },
  'NVR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['first_home', 'family_home', 'relocation', 'upgrade'],
    valueProps: ['value', 'speed', 'quality', 'financing'],
    channels: ['sales_center', 'online'],
  },

  // ========== P&C保险 ==========
  'PGR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_insurance', 'home_insurance', 'bundling', 'switching'],
    valueProps: ['price', 'ease', 'name_your_price', 'snapshot'],
    channels: ['online', 'mobile', 'agent'],
  },
  'ALL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_insurance', 'home_insurance', 'life', 'bundling'],
    valueProps: ['protection', 'agent_relationship', 'bundling', 'trust'],
    channels: ['agent', 'online', 'phone'],
  },

  // ========== 管理式医疗 ==========
  'CI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['health_plan', 'pharmacy', 'dental', 'employer_benefit'],
    valueProps: ['network', 'pharmacy_benefit', 'wellness', 'affordability'],
    channels: ['employer', 'exchange', 'online'],
  },
  'HUM': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['medicare', 'health_plan', 'wellness', 'pharmacy'],
    valueProps: ['medicare_focus', 'care_coordination', 'wellness', 'simplicity'],
    channels: ['direct', 'agent', 'online'],
  },
  'ELV': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['health_plan', 'medicaid', 'employer_benefit', 'family'],
    valueProps: ['scale', 'access', 'value', 'network'],
    channels: ['employer', 'exchange', 'government'],
  },

  // ========== 公用事业 ==========
  'DUK': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'gas', 'home_power', 'reliability'],
    valueProps: ['reliability', 'affordability', 'clean_transition', 'service'],
    channels: ['utility_bill', 'online'],
  },
  'SO': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'gas', 'home_energy', 'reliability'],
    valueProps: ['reliability', 'low_rates', 'service', 'southern_reach'],
    channels: ['utility_bill', 'online'],
  },

  // ========== 汽车零售 ==========
  'KMX': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['used_car', 'trade_in', 'financing', 'first_car'],
    valueProps: ['no_haggle', 'selection', 'warranty', 'transparency'],
    channels: ['retail', 'online'],
  },

  // ========== 食品零售 ==========
  'KR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['weekly_grocery', 'pharmacy', 'fuel', 'household'],
    valueProps: ['value', 'selection', 'loyalty', 'convenience'],
    channels: ['retail', 'online', 'pickup'],
  },

  // ========== 教育 ==========
  'DUOL': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['language_learning', 'education', 'self_improvement', 'travel_prep'],
    valueProps: ['gamification', 'free_tier', 'accessibility', 'fun'],
    channels: ['mobile', 'online'],
  },

  // ========== 房地产科技 ==========
  'ZG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_search', 'home_value', 'mortgage', 'rental'],
    valueProps: ['data', 'zestimate', 'convenience', 'comparison'],
    channels: ['online', 'mobile'],
  },

  // ========== 太阳能安装 ==========
  'RUN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['solar_installation', 'energy_savings', 'home_upgrade', 'ev_charging'],
    valueProps: ['savings', 'lease_options', 'installation', 'monitoring'],
    channels: ['door_to_door', 'online', 'referral'],
  },

  // ========== 娱乐/媒体 ==========
  'PARA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['streaming', 'sports', 'news', 'entertainment'],
    valueProps: ['content_library', 'sports', 'brands', 'value'],
    channels: ['streaming', 'cable', 'theatrical'],
  },
  'WBD': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['streaming', 'movies', 'documentary', 'family_entertainment'],
    valueProps: ['hbo_content', 'dc_universe', 'discovery', 'quality'],
    channels: ['streaming', 'cable', 'theatrical'],
  },
  'FOX': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'male' },
    occasions: ['news', 'sports', 'entertainment', 'political'],
    valueProps: ['perspective', 'sports_rights', 'live_content', 'loyalty'],
    channels: ['cable', 'streaming', 'online'],
  },

  // ========== 服装补充 ==========
  'AEO': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['casual', 'denim', 'intimates', 'back_to_school'],
    valueProps: ['inclusivity', 'comfort', 'value', 'aerie'],
    channels: ['retail', 'online'],
  },
  'LEVI': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['denim', 'casual', 'heritage', 'everyday'],
    valueProps: ['iconic', 'quality', 'fit', 'heritage'],
    channels: ['retail', 'wholesale', 'online'],
  },

  // ========== 水务 ==========
  'AWK': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['water_service', 'home_utility', 'reliability'],
    valueProps: ['essential', 'reliability', 'infrastructure', 'quality'],
    channels: ['utility_bill', 'online'],
  },

  // ========== 区域银行 (大型零售业务) ==========
  'WFC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'credit_card', 'investing'],
    valueProps: ['network', 'products', 'convenience', 'digital'],
    channels: ['branch', 'online', 'mobile'],
  },
  'USB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'payments', 'credit_card'],
    valueProps: ['service', 'digital', 'reliability', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'PNC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'wealth', 'education_savings'],
    valueProps: ['technology', 'community', 'virtual_wallet', 'service'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ========== 人寿保险 ==========
  'PRU': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['life_insurance', 'retirement', 'annuity', 'financial_planning'],
    valueProps: ['stability', 'expertise', 'protection', 'retirement_solutions'],
    channels: ['agent', 'employer', 'online'],
  },
  'AFL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['supplemental_insurance', 'cancer_coverage', 'accident', 'disability'],
    valueProps: ['supplemental', 'affordability', 'peace_of_mind', 'payroll'],
    channels: ['employer', 'agent', 'online'],
  },

  // ========== 邮轮补充 ==========
  'NCLH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['vacation', 'celebration', 'freestyle', 'adventure'],
    valueProps: ['freestyle', 'destinations', 'entertainment', 'luxury'],
    channels: ['online', 'travel_agent'],
  },

  // ========== 房建补充 ==========
  'KBH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['first_home', 'family', 'relocation', 'value_home'],
    valueProps: ['design_studio', 'energy_efficiency', 'value', 'personalization'],
    channels: ['sales_center', 'online'],
  },

  // ========== 汽配补充 ==========
  'AAP': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['car_repair', 'maintenance', 'emergency', 'diy'],
    valueProps: ['expertise', 'parts', 'service', 'value'],
    channels: ['retail', 'online'],
  },

  // ========== 消费金融/FinTech ==========
  'IBKR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['trading', 'investing', 'options', 'global_markets'],
    valueProps: ['low_cost', 'global_access', 'tools', 'margin_rates'],
    channels: ['online', 'mobile'],
  },

  // ========== EV ==========
  'LCID': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'male' },
    occasions: ['luxury_ev', 'technology', 'sustainability', 'performance'],
    valueProps: ['range', 'luxury', 'technology', 'design'],
    channels: ['direct', 'online', 'studio'],
  },

  // ========== 食品补充 ==========
  'HRL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['protein', 'snacking', 'quick_meal', 'deli'],
    valueProps: ['quality', 'brands', 'convenience', 'protein'],
    channels: ['grocery', 'mass_retail', 'foodservice'],
  },

  // ========== 公用事业补充 ==========
  'AEP': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_power', 'reliability', 'service'],
    valueProps: ['reliability', 'affordability', 'reach', 'infrastructure'],
    channels: ['utility_bill', 'online'],
  },
  'XEL': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'gas', 'clean_energy', 'home_power'],
    valueProps: ['clean_energy_leader', 'reliability', 'affordability', 'service'],
    channels: ['utility_bill', 'online'],
  },
  'EXC': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'gas', 'home_power', 'service'],
    valueProps: ['reliability', 'clean_generation', 'affordability', 'programs'],
    channels: ['utility_bill', 'online'],
  },

  // ========== 区域银行 (零售银行业务) ==========
  'TFC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'insurance', 'wealth'],
    valueProps: ['community', 'service', 'digital', 'insurance_bundling'],
    channels: ['branch', 'online', 'mobile'],
  },
  'FITB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'auto_loan', 'saving'],
    valueProps: ['community', 'momentum_banking', 'digital', 'service'],
    channels: ['branch', 'online', 'mobile'],
  },
  'RF': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'wealth', 'small_business'],
    valueProps: ['southern_presence', 'service', 'community', 'digital'],
    channels: ['branch', 'online', 'mobile'],
  },
  'KEY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'investing', 'business'],
    valueProps: ['relationship', 'digital', 'community', 'advisory'],
    channels: ['branch', 'online', 'mobile'],
  },
  'CFG': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'student_loan', 'mortgage', 'personal_loan'],
    valueProps: ['education_refi', 'digital', 'community', 'service'],
    channels: ['branch', 'online', 'mobile'],
  },
  'HBAN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'auto_loan', 'mortgage', 'small_business'],
    valueProps: ['community', 'service', 'midwest_presence', 'digital'],
    channels: ['branch', 'online', 'mobile'],
  },
  'MTB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'wealth', 'commercial'],
    valueProps: ['northeast_presence', 'stability', 'service', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ========== 医院系统 ==========
  'HCA': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['emergency', 'surgery', 'outpatient', 'maternity'],
    valueProps: ['access', 'quality', 'network', 'specialists'],
    channels: ['hospital', 'clinic', 'online'],
  },
  'THC': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['emergency', 'surgery', 'behavioral_health', 'outpatient'],
    valueProps: ['ambulatory', 'specialists', 'access', 'quality'],
    channels: ['hospital', 'clinic', 'surgery_center'],
  },
  'UHS': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['behavioral_health', 'acute_care', 'emergency', 'rehab'],
    valueProps: ['behavioral_specialty', 'access', 'quality', 'programs'],
    channels: ['hospital', 'clinic', 'residential'],
  },

  // ========== 汽车经销商 ==========
  'PAG': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['luxury_car', 'service', 'trade_in', 'financing'],
    valueProps: ['luxury_brands', 'selection', 'service', 'experience'],
    channels: ['dealer', 'online'],
  },
  'LAD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['car_purchase', 'service', 'trade_in', 'financing'],
    valueProps: ['selection', 'digital_retail', 'service', 'value'],
    channels: ['dealer', 'online'],
  },

  // ========== 资产管理 (零售投资者) ==========
  'BEN': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investing', 'retirement', 'income', 'wealth_preservation'],
    valueProps: ['global', 'fixed_income', 'expertise', 'track_record'],
    channels: ['advisor', 'online', 'direct'],
  },
  'IVZ': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investing', 'etf', 'retirement', 'alternatives'],
    valueProps: ['global', 'solutions', 'etf_platform', 'expertise'],
    channels: ['advisor', 'online', 'institutional'],
  },

  // ========== 教育服务 ==========
  'LOPE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['degree', 'career_advancement', 'adult_education', 'online_learning'],
    valueProps: ['affordability', 'flexibility', 'outcomes', 'support'],
    channels: ['online', 'campus'],
  },
  'STRA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['degree', 'professional_development', 'career_change', 'military'],
    valueProps: ['flexibility', 'career_focus', 'online', 'support'],
    channels: ['online', 'campus'],
  },

  // ========== 通用制药 (OTC消费者) ==========
  'PRGO': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['otc_medicine', 'wellness', 'pain_relief', 'cold_flu'],
    valueProps: ['value', 'store_brand', 'quality', 'accessibility'],
    channels: ['pharmacy', 'grocery', 'mass_retail'],
  },

  // ========== 补充: 最后22个消费者相关公司 ==========

  // --- 汽车零售 ---
  'AN': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['vehicle_purchase', 'service', 'parts', 'trade_in'],
    valueProps: ['selection', 'financing', 'service', 'convenience'],
    channels: ['dealership', 'online'],
  },

  // --- 大型制药 (B2B2C) ---
  'SNY': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['chronic_disease', 'rare_disease', 'vaccine', 'consumer_health'],
    valueProps: ['innovation', 'efficacy', 'global_access', 'specialty'],
    channels: ['hospital', 'pharmacy', 'clinic'],
  },

  // --- 数字健康 ---
  'DXCM': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['diabetes_management', 'glucose_monitoring', 'chronic_care'],
    valueProps: ['continuous_monitoring', 'convenience', 'data', 'accuracy'],
    channels: ['pharmacy', 'online', 'clinic'],
  },

  // --- EV充电 ---
  'EVGO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['ev_charging', 'road_trip', 'daily_commute'],
    valueProps: ['fast_charging', 'network', 'convenience', 'sustainability'],
    channels: ['app', 'station', 'partner_locations'],
  },

  // --- 教育科技 ---
  'CHGG': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['homework', 'exam_prep', 'tutoring', 'textbook'],
    valueProps: ['affordability', 'convenience', 'instant_help', 'academic_success'],
    channels: ['online', 'mobile_app'],
  },

  // --- 新兴生物制药 (B2B2C) ---
  'SGEN': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['cancer_treatment', 'oncology', 'rare_disease'],
    valueProps: ['innovation', 'targeted_therapy', 'efficacy'],
    channels: ['hospital', 'specialty_pharmacy'],
  },
  'INCY': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['oncology', 'inflammation', 'autoimmune'],
    valueProps: ['innovation', 'specialty', 'efficacy'],
    channels: ['hospital', 'specialty_pharmacy'],
  },
  'BMRN': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['rare_disease', 'genetic_disorder', 'enzyme_replacement'],
    valueProps: ['rare_disease_expertise', 'innovation', 'patient_support'],
    channels: ['hospital', 'specialty_pharmacy', 'home_infusion'],
  },
  'EXEL': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['cancer_treatment', 'oncology', 'kidney_cancer'],
    valueProps: ['targeted_therapy', 'innovation', 'efficacy'],
    channels: ['hospital', 'specialty_pharmacy'],
  },
  'SRPT': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['rare_disease', 'gene_therapy', 'muscular_dystrophy'],
    valueProps: ['gene_therapy', 'innovation', 'rare_disease_focus'],
    channels: ['hospital', 'specialty_center'],
  },

  // --- 金融数据 (B2B2C) ---
  'MORN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investment_research', 'fund_selection', 'portfolio_analysis'],
    valueProps: ['data_quality', 'independence', 'research', 'ratings'],
    channels: ['online', 'subscription', 'financial_advisor'],
  },

  // --- 游戏 ---
  'ATVI': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'male' },
    occasions: ['gaming', 'entertainment', 'social', 'esports'],
    valueProps: ['franchise_quality', 'multiplayer', 'competitive', 'content_updates'],
    channels: ['digital_store', 'console', 'mobile', 'pc'],
  },

  // --- 仿制药 (B2B2C) ---
  'TEVA': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['chronic_disease', 'pain_relief', 'generic_rx'],
    valueProps: ['affordability', 'accessibility', 'generic_quality'],
    channels: ['pharmacy', 'hospital', 'online_pharmacy'],
  },
  'VTRS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['chronic_disease', 'generic_rx', 'biosimilar'],
    valueProps: ['affordability', 'broad_portfolio', 'accessibility'],
    channels: ['pharmacy', 'hospital', 'online_pharmacy'],
  },

  // --- 独立电力 ---
  'NRG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['electricity', 'home_energy', 'renewable_plan'],
    valueProps: ['choice', 'competitive_pricing', 'renewable_options', 'reliability'],
    channels: ['online', 'direct_sales', 'broker'],
  },

  // --- 寿险 ---
  'LNC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['life_insurance', 'annuity', 'retirement', 'wealth_protection'],
    valueProps: ['security', 'retirement_income', 'tax_advantage', 'legacy'],
    channels: ['financial_advisor', 'broker', 'online'],
  },

  // --- 管理式医疗 ---
  'CNC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['medicaid', 'healthcare', 'managed_care', 'marketplace'],
    valueProps: ['access', 'affordability', 'network', 'government_program'],
    channels: ['government', 'marketplace', 'broker'],
  },

  // --- 住宅REIT ---
  'MAA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['apartment_rental', 'relocation', 'lifestyle'],
    valueProps: ['location', 'amenities', 'value', 'sunbelt_markets'],
    channels: ['online', 'property_office', 'broker'],
  },

  // --- 房地产科技 ---
  'RDFN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_purchase', 'home_sale', 'refinance', 'market_research'],
    valueProps: ['savings', 'technology', 'transparency', 'lower_commission'],
    channels: ['online', 'mobile_app', 'agent'],
  },

  // --- 快餐 ---
  'QSR': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['quick_meal', 'drive_through', 'breakfast', 'snack'],
    valueProps: ['convenience', 'value', 'speed', 'consistency'],
    channels: ['drive_through', 'dine_in', 'delivery', 'mobile_app'],
  },

  // --- 光伏设备 (B2B2C) ---
  'SEDG': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['solar_installation', 'home_energy', 'sustainability'],
    valueProps: ['efficiency', 'monitoring', 'reliability', 'innovation'],
    channels: ['installer', 'distributor', 'online'],
  },

  // --- 烟草 (B2B2C) ---
  'BTI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['tobacco', 'nicotine', 'alternatives'],
    valueProps: ['brand', 'satisfaction', 'reduced_risk_alternatives'],
    channels: ['convenience_store', 'gas_station', 'online'],
  },

  // --- 公用事业 (B2C) ---
  'WEC': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'heating', 'cooling', 'cooking'],
    valueProps: ['reliability', 'affordability', 'clean_energy'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'ES': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'heating', 'cooling'],
    valueProps: ['reliability', 'affordability', 'grid_resilience'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'ED': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'steam', 'gas', 'cooling'],
    valueProps: ['reliability', 'urban_infrastructure', 'essential_service'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'D': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'heating'],
    valueProps: ['reliability', 'affordability', 'clean_energy_transition'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'DTE': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'heating'],
    valueProps: ['reliability', 'affordability', 'community_programs'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'AEE': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'heating'],
    valueProps: ['reliability', 'affordability', 'clean_energy'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },
  'CMS': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'heating', 'cooling'],
    valueProps: ['reliability', 'affordability', 'renewable_programs'],
    channels: ['utility_bill', 'online_portal', 'phone'],
  },

  // --- 博彩/娱乐 (Gaming/Entertainment) ---
  'CZR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'dining', 'shows', 'sports_betting'],
    valueProps: ['rewards', 'experience', 'variety', 'excitement'],
    channels: ['casino', 'online', 'mobile_app', 'sportsbook'],
  },
  'MGM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'luxury_dining', 'shows', 'convention'],
    valueProps: ['luxury', 'entertainment', 'rewards', 'experience'],
    channels: ['casino', 'hotel', 'online', 'mobile_app'],
  },
  'WYNN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['luxury_entertainment', 'gambling', 'fine_dining', 'spa'],
    valueProps: ['ultra_luxury', 'exclusivity', 'service', 'ambiance'],
    channels: ['casino', 'hotel', 'concierge'],
  },
  'PENN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['sports_betting', 'gambling', 'entertainment'],
    valueProps: ['accessibility', 'sports_integration', 'rewards'],
    channels: ['casino', 'online', 'mobile_app'],
  },
  'DKNG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['sports_betting', 'fantasy_sports', 'iGaming'],
    valueProps: ['convenience', 'excitement', 'promotions', 'social'],
    channels: ['mobile_app', 'online'],
  },

  // --- 快餐/餐饮 ---
  'CAVA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['lunch', 'dinner', 'healthy_meal', 'quick_service'],
    valueProps: ['healthy', 'fresh', 'Mediterranean', 'customizable'],
    channels: ['dine_in', 'online', 'delivery', 'mobile_app'],
  },

  // --- 啤酒 ---
  'BUD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['social', 'sports', 'casual_dining', 'celebration'],
    valueProps: ['brand', 'variety', 'accessibility', 'tradition'],
    channels: ['retail', 'bar_restaurant', 'convenience_store'],
  },

  // --- 有线电视 ---
  'LBRDA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['internet', 'TV', 'phone', 'streaming'],
    valueProps: ['speed', 'bundling', 'reliability', 'coverage'],
    channels: ['retail_store', 'online', 'phone'],
  },

  // --- 调味品/食品 ---
  'MKC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['cooking', 'meal_prep', 'grilling', 'baking'],
    valueProps: ['quality', 'flavor', 'variety', 'trusted_brand'],
    channels: ['retail', 'online', 'grocery'],
  },

  // --- 约会/社交 ---
  'MTCH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['dating', 'relationships', 'social'],
    valueProps: ['convenience', 'matching', 'variety', 'safety'],
    channels: ['mobile_app', 'online'],
  },

  // --- 消费安全 ---
  'GEN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online_security', 'privacy', 'device_protection'],
    valueProps: ['protection', 'peace_of_mind', 'comprehensive', 'trusted'],
    channels: ['online', 'retail', 'OEM_bundling'],
  },

  // --- 现场娱乐 ---
  'LYV': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['concerts', 'festivals', 'live_events', 'entertainment'],
    valueProps: ['experience', 'access', 'variety', 'exclusivity'],
    channels: ['online', 'mobile_app', 'venue'],
  },

  // --- 数字新闻 ---
  'NYT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['news', 'reading', 'cooking', 'games', 'podcasts'],
    valueProps: ['quality_journalism', 'depth', 'credibility', 'digital_experience'],
    channels: ['online', 'mobile_app', 'subscription'],
  },

  // --- 快休闲餐饮 ---
  'SHAK': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['lunch', 'dinner', 'casual_dining', 'quick_meal'],
    valueProps: ['premium_quality', 'fresh', 'urban', 'experience'],
    channels: ['dine_in', 'delivery', 'mobile_app'],
  },

  // --- 域名/网站(B2B2C) ---
  'GDDY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['website_creation', 'online_store', 'branding', 'email'],
    valueProps: ['simplicity', 'affordability', 'all_in_one', 'support'],
    channels: ['online', 'mobile_app'],
  },

  // --- 公用事业(B2B2C) ---
  'WPC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investment', 'income', 'diversification'],
    valueProps: ['stable_income', 'diversification', 'inflation_protection'],
    channels: ['brokerage', 'online'],
  },
  'SRE': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'home_energy'],
    valueProps: ['reliability', 'essential_service', 'infrastructure'],
    channels: ['direct', 'utility_billing'],
  },

  // ========== 第六批: 餐饮/REIT/诊断/汽车金融 ==========

  // --- 休闲餐饮(B2C) ---
  'TXRH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['dinner', 'family_dining', 'casual_dining', 'celebration'],
    valueProps: ['value', 'quality_steak', 'family_friendly', 'fresh_baked'],
    channels: ['dine_in', 'takeout'],
  },
  'EAT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['lunch', 'dinner', 'casual_dining', 'happy_hour'],
    valueProps: ['value', 'variety', 'convenience', 'familiar'],
    channels: ['dine_in', 'delivery', 'takeout'],
  },
  'PLAY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'group_outing', 'date_night', 'events'],
    valueProps: ['fun', 'experience', 'games', 'social', 'food_drinks'],
    channels: ['dine_in', 'events', 'mobile_app'],
  },

  // --- 公寓REIT(B2B2C) ---
  'ESS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['housing', 'rental', 'relocation', 'urban_living'],
    valueProps: ['location', 'amenities', 'west_coast', 'quality'],
    channels: ['online', 'direct', 'broker'],
  },
  'UDR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['housing', 'rental', 'relocation'],
    valueProps: ['amenities', 'convenience', 'diverse_markets', 'quality'],
    channels: ['online', 'direct', 'broker'],
  },

  // --- 特殊REIT(B2C) ---
  'SUI': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['housing', 'retirement', 'rv_living', 'vacation'],
    valueProps: ['affordability', 'community', 'lifestyle', 'outdoor'],
    channels: ['direct', 'online'],
  },

  // --- 地板零售(B2B2C) ---
  'FND': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['renovation', 'new_home', 'flooring', 'remodel'],
    valueProps: ['selection', 'value', 'warehouse', 'pro_quality'],
    channels: ['retail', 'online', 'pro_desk'],
  },

  // --- 诊断检验(B2B2C) ---
  'DGX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['health_screening', 'diagnostic', 'employer_testing', 'routine'],
    valueProps: ['accuracy', 'convenience', 'network', 'reliability'],
    channels: ['direct', 'physician_referral', 'employer'],
  },
  'LH': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['health_screening', 'diagnostic', 'clinical_trial', 'drug_development'],
    valueProps: ['accuracy', 'comprehensive', 'research', 'innovation'],
    channels: ['direct', 'physician_referral', 'pharma_partner'],
  },

  // --- 次贷汽车金融(B2B2C) ---
  'CACC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['car_purchase', 'auto_financing', 'credit_rebuild'],
    valueProps: ['accessibility', 'second_chance', 'dealer_network', 'approval'],
    channels: ['dealer', 'online'],
  },

  // --- 便利店(B2C) ---
  'CASY': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fuel', 'snack', 'prepared_food', 'convenience', 'road_trip'],
    valueProps: ['convenience', 'location', 'pizza', 'fuel', 'value'],
    channels: ['retail'],
  },

  // --- 床垫/寝具(B2C) ---
  'TPX': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_furnishing', 'sleep', 'mattress_replacement', 'new_home'],
    valueProps: ['comfort', 'premium', 'quality', 'sleep_technology'],
    channels: ['retail', 'online', 'direct'],
  },

  // --- 甜甜圈连锁(B2C) ---
  'DNUT': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['snack', 'breakfast', 'treat', 'gathering', 'impulse'],
    valueProps: ['indulgence', 'experience', 'freshness', 'brand'],
    channels: ['retail', 'wholesale'],
  },

  // --- 区域银行(B2B2C) ---
  'WAL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['banking', 'business_lending', 'mortgage', 'tech_banking'],
    valueProps: ['growth', 'innovation', 'relationship', 'specialization'],
    channels: ['direct', 'online'],
  },
  'EWBC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['banking', 'trade_finance', 'cross_border', 'real_estate'],
    valueProps: ['cultural_expertise', 'bilingual', 'cross_border', 'relationship'],
    channels: ['direct', 'online'],
  },
  'ONB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'small_business', 'savings'],
    valueProps: ['community', 'convenience', 'relationship', 'stability'],
    channels: ['retail', 'online'],
  },
  'PNFP': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['banking', 'wealth_management', 'business_lending', 'advisory'],
    valueProps: ['service', 'relationship', 'local_expertise', 'growth'],
    channels: ['direct', 'online'],
  },
  'FNB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'small_business', 'wealth'],
    valueProps: ['community', 'convenience', 'relationship', 'trust'],
    channels: ['retail', 'online'],
  },

  // --- 炼油/可再生能源(B2B2C) ---
  'DINO': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fuel', 'commute', 'travel', 'heating'],
    valueProps: ['availability', 'value', 'reliability', 'local'],
    channels: ['retail', 'wholesale'],
  },

  // --- 泳池/户外设备(B2B2C) ---
  'HAYW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['pool_maintenance', 'home_improvement', 'outdoor_living', 'renovation'],
    valueProps: ['quality', 'automation', 'energy_efficiency', 'durability'],
    channels: ['dealer', 'retail', 'online'],
  },

  // --- 卫星通信(B2B2C) ---
  'IRDM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['remote_communication', 'maritime', 'aviation', 'emergency', 'iot'],
    valueProps: ['global_coverage', 'reliability', 'safety', 'connectivity'],
    channels: ['direct', 'dealer'],
  },

  // --- 可乐瓶装(B2B2C) ---
  'COKE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['beverage', 'refreshment', 'meal', 'snack', 'social'],
    valueProps: ['brand', 'distribution', 'availability', 'taste'],
    channels: ['retail', 'wholesale', 'vending'],
  },

  // --- 鲜粮宠物食品(B2C) ---
  'FRPT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['pet_food', 'pet_health', 'premium_pet_care'],
    valueProps: ['fresh', 'natural', 'health', 'premium', 'quality'],
    channels: ['retail', 'online'],
  },

  // --- 折扣零售(B2C) ---
  'OLLI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['bargain_hunting', 'home', 'seasonal', 'treasure_hunt'],
    valueProps: ['value', 'savings', 'discovery', 'variety'],
    channels: ['retail'],
  },

  // --- 约会社交(B2C) ---
  'BMBL': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['dating', 'social', 'networking', 'friendship'],
    valueProps: ['safety', 'empowerment', 'community', 'quality_matches'],
    channels: ['online', 'subscription'],
  },
  'GRND': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['dating', 'social', 'community', 'lgbtq'],
    valueProps: ['community', 'inclusivity', 'location_based', 'identity'],
    channels: ['online', 'subscription'],
  },

  // --- 烈酒(B2C) ---
  'BF.B': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['social', 'celebration', 'relaxation', 'gifting', 'dining'],
    valueProps: ['heritage', 'premium', 'craftsmanship', 'brand', 'aged'],
    channels: ['retail', 'bars_restaurants', 'online'],
  },

  // --- 玩具/游戏(B2C) ---
  'HAS': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['play', 'gifting', 'gaming', 'entertainment', 'holiday'],
    valueProps: ['fun', 'imagination', 'brand', 'collectible', 'nostalgia'],
    channels: ['retail', 'online', 'direct'],
  },
  'MAT': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['play', 'gifting', 'creative_play', 'holiday', 'collectible'],
    valueProps: ['iconic', 'imagination', 'brand', 'fashion', 'nostalgia'],
    channels: ['retail', 'online', 'direct'],
  },

  // --- 运动鞋(B2C) ---
  'CROX': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['casual', 'comfort', 'outdoor', 'lifestyle', 'customization'],
    valueProps: ['comfort', 'fun', 'lightweight', 'customizable', 'value'],
    channels: ['retail', 'online', 'direct'],
  },
  'ONON': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['running', 'training', 'athleisure', 'performance'],
    valueProps: ['performance', 'innovation', 'premium', 'swiss_design', 'comfort'],
    channels: ['retail', 'online', 'direct'],
  },

  // --- 数字媒体(B2C) ---
  'IAC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['information', 'lifestyle', 'entertainment', 'inspiration'],
    valueProps: ['content', 'expertise', 'trust', 'discovery'],
    channels: ['online'],
  },

  // --- 线上房地产(B2C) ---
  'OPEN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_selling', 'home_buying', 'relocation', 'convenience'],
    valueProps: ['speed', 'certainty', 'convenience', 'simplicity'],
    channels: ['online', 'direct'],
  },

  // --- SMB软件(B2B2C) ---
  'WIX': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['website_creation', 'online_store', 'business_launch', 'portfolio'],
    valueProps: ['ease_of_use', 'affordability', 'flexibility', 'design'],
    channels: ['online', 'subscription'],
  },
  'SQSP': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['website_creation', 'branding', 'commerce', 'portfolio'],
    valueProps: ['design', 'premium', 'simplicity', 'aesthetics'],
    channels: ['online', 'subscription'],
  },

  // --- 区域银行(B2B2C) ---
  'FBP': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'mortgage', 'savings', 'business_loan'],
    valueProps: ['local', 'community', 'accessibility', 'trust'],
    channels: ['retail', 'online', 'direct'],
  },

  // --- 本地广告(B2B2C) ---
  'YELP': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['restaurant', 'local_services', 'shopping', 'reviews'],
    valueProps: ['trust', 'discovery', 'reviews', 'local', 'recommendations'],
    channels: ['online'],
  },

  // --- 运动鞋(B2C) ---
  'SKX': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['walking', 'casual', 'work', 'fitness', 'everyday'],
    valueProps: ['comfort', 'affordability', 'variety', 'durability'],
    channels: ['retail', 'online', 'wholesale'],
  },

  // --- 健康保险(B2C) ---
  'OSCR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['health_insurance', 'open_enrollment'],
    valueProps: ['simplicity', 'technology', 'affordability'],
    channels: ['online', 'app', 'broker'],
  },

  // --- 航空(B2C) ---
  'ALGT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['leisure_travel', 'vacation', 'beach', 'family_trip'],
    valueProps: ['low_fare', 'direct_flights', 'small_city_access', 'bundled_travel'],
    channels: ['online', 'direct'],
  },

  // --- DTC眼镜(B2C) ---
  'WRBY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['eyewear', 'prescription', 'fashion', 'eye_exam'],
    valueProps: ['affordability', 'style', 'convenience', 'social_mission'],
    channels: ['online', 'retail', 'direct'],
  },

  // --- 医疗服装(B2C) ---
  'FIGS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['work_apparel', 'medical', 'healthcare_professional', 'uniform'],
    valueProps: ['style', 'comfort', 'premium_quality', 'community'],
    channels: ['online', 'direct'],
  },

  // --- 咖啡连锁(B2C) ---
  'BROS': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['morning_coffee', 'afternoon_pick_up', 'drive_thru', 'snack'],
    valueProps: ['speed', 'customization', 'loyalty', 'fun_atmosphere'],
    channels: ['retail', 'drive_thru'],
  },

  // --- CNS制药(B2B2C) ---
  'ACAD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['neurological_treatment', 'psychiatric', 'chronic_condition', 'specialist_visit'],
    valueProps: ['efficacy', 'specialty', 'innovation', 'patient_support'],
    channels: ['pharmacy', 'specialist'],
  },

  // --- 鞋类零售(B2C) ---
  'DBI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'female' },
    occasions: ['shoe_shopping', 'seasonal', 'casual', 'work_shoes'],
    valueProps: ['variety', 'value', 'brands', 'convenience'],
    channels: ['retail', 'online'],
  },

  // ========== 新增50家公司客群画像 ==========

  // --- 地区银行(B2B2C) ---
  'NYCB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['mortgage', 'deposits', 'commercial_banking', 'multifamily'],
    valueProps: ['local', 'CRE_expertise', 'convenience', 'community'],
    channels: ['branch', 'online'],
  },
  'VLY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'mortgage', 'small_business'],
    valueProps: ['local', 'relationship', 'convenience', 'community'],
    channels: ['branch', 'online'],
  },
  'FHN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['commercial_banking', 'wealth_management', 'deposits', 'mortgage'],
    valueProps: ['regional_expertise', 'relationship', 'fixed_income', 'trust'],
    channels: ['branch', 'online', 'advisor'],
  },
  'SNV': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'treasury', 'small_business'],
    valueProps: ['community', 'relationship', 'convenience', 'local'],
    channels: ['branch', 'online'],
  },
  'HWC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'energy_lending', 'wealth'],
    valueProps: ['gulf_south_expertise', 'relationship', 'community', 'stability'],
    channels: ['branch', 'online'],
  },
  'WBS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'HSA', 'healthcare_finance'],
    valueProps: ['healthcare_specialty', 'relationship', 'convenience', 'HSA'],
    channels: ['branch', 'online'],
  },
  'COLB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'small_business', 'mortgage'],
    valueProps: ['community', 'local', 'relationship', 'pacific_northwest'],
    channels: ['branch', 'online'],
  },

  // --- 平价美妆(B2C) ---
  'ELF': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'female' },
    occasions: ['daily_makeup', 'skincare', 'value_beauty', 'social_media'],
    valueProps: ['affordable', 'quality', 'cruelty_free', 'trendy', 'inclusive'],
    channels: ['retail', 'online', 'drugstore'],
  },

  // --- 个护零售(B2C) ---
  'BBWI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['self_care', 'gifting', 'home_fragrance', 'seasonal'],
    valueProps: ['fragrance', 'experience', 'variety', 'promotions', 'indulgence'],
    channels: ['retail', 'online'],
  },

  // --- 百货(B2C) ---
  'DDS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['apparel_shopping', 'cosmetics', 'home_furnishing', 'seasonal'],
    valueProps: ['selection', 'brands', 'service', 'southeast_presence'],
    channels: ['retail', 'online'],
  },

  // --- 奢侈外衣(B2C) ---
  'GOOS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['winter_outerwear', 'luxury_fashion', 'outdoor', 'travel'],
    valueProps: ['premium', 'warmth', 'craftsmanship', 'status', 'durability'],
    channels: ['retail', 'online', 'direct'],
  },

  // --- 营养食品(B2C) ---
  'SMPL': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['snacking', 'fitness', 'meal_replacement', 'diet', 'convenience'],
    valueProps: ['nutrition', 'protein', 'low_carb', 'convenience', 'taste'],
    channels: ['retail', 'online'],
  },

  // --- 数字媒体(B2C) ---
  'NWSA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['news', 'business_info', 'real_estate_data', 'publishing'],
    valueProps: ['authoritative', 'depth', 'global', 'data', 'premium_content'],
    channels: ['online', 'subscription', 'print'],
  },

  // --- 宠物保险(B2C) ---
  'TRUP': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['pet_health', 'veterinary', 'pet_ownership', 'insurance'],
    valueProps: ['comprehensive', 'direct_pay', 'no_payout_limits', 'peace_of_mind'],
    channels: ['online', 'veterinary_partners'],
  },

  // --- 格斗/体育娱乐(B2C) ---
  'TKO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['combat_sports', 'live_events', 'PPV', 'streaming', 'fan_engagement'],
    valueProps: ['excitement', 'entertainment', 'community', 'spectacle'],
    channels: ['streaming', 'live_events', 'TV'],
  },

  // --- 主题公园(B2C) ---
  'SIX': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_outing', 'thrill_seeking', 'summer', 'weekend'],
    valueProps: ['thrills', 'fun', 'value', 'seasonal_pass', 'accessibility'],
    channels: ['direct', 'online'],
  },
  'SEAS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_outing', 'animal_encounter', 'vacation', 'education'],
    valueProps: ['unique_experience', 'marine_life', 'rides', 'seasonal_pass'],
    channels: ['direct', 'online'],
  },

  // --- 自助仓储REIT(B2C) ---
  'NSA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['moving', 'decluttering', 'life_transition', 'seasonal_storage'],
    valueProps: ['convenience', 'security', 'accessibility', 'flexible_terms'],
    channels: ['online', 'direct'],
  },

  // --- 学生贷款(B2B2C) ---
  'SLM': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['college_tuition', 'education_finance', 'savings', 'refinance'],
    valueProps: ['education_access', 'competitive_rates', 'flexibility', 'digital'],
    channels: ['online', 'campus_partners'],
  },

  // --- 罕见病制药(B2B2C) ---
  'BCRX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['rare_disease_treatment', 'HAE_management', 'chronic_condition'],
    valueProps: ['efficacy', 'oral_therapy', 'patient_support', 'rare_disease_expertise'],
    channels: ['specialty_pharmacy', 'physician'],
  },
  'FOLD': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['Fabry_treatment', 'lysosomal_disease', 'enzyme_therapy', 'chronic_care'],
    valueProps: ['efficacy', 'oral_option', 'patient_support', 'rare_disease_access'],
    channels: ['specialty_pharmacy', 'physician'],
  },

  // --- 补充6家银行(B2B2C) ---
  'SFNC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'wealth', 'insurance', 'mortgage'],
    valueProps: ['community', 'relationship', 'local', 'mid_south'],
    channels: ['branch', 'online'],
  },
  'SBCF': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'wealth', 'mortgage'],
    valueProps: ['community', 'relationship', 'florida', 'local'],
    channels: ['branch', 'online'],
  },
  'FFIN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['commercial_banking', 'deposits', 'trust', 'mortgage'],
    valueProps: ['conservative', 'stability', 'community', 'texas'],
    channels: ['branch', 'online'],
  },
  'AX': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online_banking', 'savings', 'securities_lending', 'commercial'],
    valueProps: ['digital', 'competitive_rates', 'convenience', 'technology'],
    channels: ['online'],
  },

  // ========== 多元化集团 (Diversified Conglomerate) ==========
  'BRK.B': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['insurance', 'investment', 'daily_essentials', 'energy'],
    valueProps: ['reliability', 'value', 'trust', 'diversification'],
    channels: ['retail', 'online', 'agent'],
  },

  // ========== 公用事业 B2B2C (Utilities) ==========
  'CNP': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'EVRG': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'FE': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'LNT': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'natural_gas', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'NI': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['natural_gas', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'PNW': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },
  'PPL': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['electricity', 'home_energy'],
    valueProps: ['reliability', 'essential', 'regulated'],
    channels: ['direct', 'online'],
  },

  // ========== 宠物零售 B2C (Pet Retail) ==========
  'WOOF': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['pet_food', 'pet_supplies', 'grooming', 'veterinary'],
    valueProps: ['selection', 'convenience', 'service', 'community'],
    channels: ['retail', 'online'],
  },

  // ========== 保险 B2C (Insurance) ==========
  'GL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['life_insurance', 'supplemental', 'family_protection'],
    valueProps: ['security', 'affordable', 'direct'],
    channels: ['agent', 'direct', 'online'],
  },

  // ========== 医药折扣 B2C (Pharma Discount) ==========
  'GDRX': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['prescription', 'pharmacy', 'healthcare_savings'],
    valueProps: ['savings', 'convenience', 'transparency', 'accessibility'],
    channels: ['online', 'mobile'],
  },

  // ========== 送金 B2C (Money Transfer) ==========
  'WU': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['remittance', 'money_transfer', 'bill_payment'],
    valueProps: ['convenience', 'global_reach', 'speed', 'trust'],
    channels: ['retail', 'online', 'mobile'],
  },

  // ========== 保険 B2B2C (Insurance) ==========
  'HIG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['property_insurance', 'casualty', 'employee_benefits'],
    valueProps: ['security', 'reliability', 'comprehensive'],
    channels: ['agent', 'broker', 'online'],
  },
  'ERIE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_insurance', 'home_insurance', 'life_insurance'],
    valueProps: ['affordable', 'local_service', 'reliability'],
    channels: ['agent', 'online'],
  },

  // ========== 医療機器 B2B2C (Medical Devices) ==========
  'ALGN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['dental', 'orthodontics', 'cosmetic'],
    valueProps: ['aesthetics', 'innovation', 'convenience'],
    channels: ['dental_office', 'online'],
  },
  'PODD': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['diabetes_management', 'insulin_delivery'],
    valueProps: ['convenience', 'health', 'innovation'],
    channels: ['healthcare_provider', 'pharmacy', 'online'],
  },
  'INMD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['body_contouring', 'skin_treatment', 'cosmetic'],
    valueProps: ['minimally_invasive', 'aesthetics', 'results'],
    channels: ['medical_office', 'clinic'],
  },

  // ========== 小売 B2C (Retail) ==========
  'FIVE': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['gifts', 'home_decor', 'impulse'],
    valueProps: ['value', 'fun', 'discovery'],
    channels: ['retail'],
  },
  'RVLV': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fashion', 'occasion_wear', 'seasonal'],
    valueProps: ['trend', 'curation', 'brand'],
    channels: ['online', 'mobile'],
  },
  'JWN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fashion', 'department_store', 'seasonal'],
    valueProps: ['quality', 'service', 'selection'],
    channels: ['retail', 'online'],
  },
  'BOOT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['western_wear', 'outdoor', 'workwear'],
    valueProps: ['authenticity', 'quality', 'selection'],
    channels: ['retail', 'online'],
  },
  'BURL': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['discount_shopping', 'seasonal', 'everyday'],
    valueProps: ['value', 'brand_deals', 'treasure_hunt'],
    channels: ['retail'],
  },
  'TSCO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['farm_supplies', 'pet', 'outdoor_living'],
    valueProps: ['selection', 'value', 'expertise'],
    channels: ['retail', 'online'],
  },
  'SFM': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['grocery', 'organic', 'health_food'],
    valueProps: ['fresh', 'natural', 'quality'],
    channels: ['retail'],
  },

  // ========== 発電機 B2C (Power Equipment) ==========
  'GNRC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['backup_power', 'storm_prep', 'home_improvement'],
    valueProps: ['reliability', 'protection', 'independence'],
    channels: ['dealer', 'retail', 'online'],
  },

  // ========== GPS/ウェアラブル B2C (GPS/Wearables) ==========
  'GRMN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fitness', 'outdoor', 'marine', 'aviation'],
    valueProps: ['precision', 'durability', 'innovation'],
    channels: ['retail', 'online', 'specialty'],
  },

  // ========== 金融サービス B2C (Financial Services) ==========
  'RJF': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['investment', 'retirement', 'wealth_management'],
    valueProps: ['personalized', 'trust', 'comprehensive'],
    channels: ['advisor', 'online'],
  },

  // ========== 診断 B2B2C (Diagnostics) ==========
  'EXAS': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['cancer_screening', 'preventive_health'],
    valueProps: ['early_detection', 'non_invasive', 'convenience'],
    channels: ['healthcare_provider', 'direct'],
  },
  'NTRA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'all', gender: 'female' },
    occasions: ['prenatal', 'genetic_testing', 'oncology'],
    valueProps: ['accuracy', 'early_detection', 'innovation'],
    channels: ['healthcare_provider', 'lab'],
  },

  // ========== ホテル B2C (Hotels/Hospitality) ==========
  'HST': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['business_travel', 'leisure', 'conference'],
    valueProps: ['luxury', 'location', 'service'],
    channels: ['online', 'direct', 'travel_agent'],
  },
  'PK': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['business_travel', 'leisure', 'resort'],
    valueProps: ['upscale', 'location', 'amenities'],
    channels: ['online', 'direct', 'travel_agent'],
  },

  // ========== ストレージ B2C (Self-Storage) ==========
  'CUBE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['moving', 'decluttering', 'life_transition'],
    valueProps: ['convenience', 'security', 'flexibility'],
    channels: ['online', 'direct'],
  },


  // ========== 太陽光 B2C (Residential Solar) ==========
  'SPWR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_solar', 'energy_savings', 'green_energy'],
    valueProps: ['efficiency', 'reliability', 'premium'],
    channels: ['dealer', 'direct_sales', 'online'],
  },

  // ========== 住宅設備 B2B2C (Home Products) ==========
  'MAS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_renovation', 'new_construction', 'repair'],
    valueProps: ['quality', 'brand', 'selection'],
    channels: ['retail', 'dealer', 'online'],
  },
  'AOS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['water_heater', 'water_treatment', 'home_comfort'],
    valueProps: ['reliability', 'efficiency', 'essential'],
    channels: ['dealer', 'retail', 'plumber'],
  },

  // ========== ヘルスケア B2C (Healthcare Services) ==========
  'DVA': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['dialysis', 'kidney_care', 'chronic_disease'],
    valueProps: ['essential', 'accessibility', 'expertise'],
    channels: ['clinic', 'healthcare_provider'],
  },
  'ENSG': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['skilled_nursing', 'rehabilitation', 'senior_care'],
    valueProps: ['quality_care', 'local', 'comprehensive'],
    channels: ['healthcare_provider', 'direct'],
  },
  'ACHC': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['behavioral_health', 'addiction', 'mental_health'],
    valueProps: ['specialized', 'comprehensive', 'recovery'],
    channels: ['healthcare_provider', 'referral', 'direct'],
  },
  'SGRY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['surgery', 'outpatient', 'specialty_care'],
    valueProps: ['convenience', 'efficiency', 'quality'],
    channels: ['healthcare_provider', 'referral'],
  },
  'AMED': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['home_health', 'hospice', 'personal_care'],
    valueProps: ['comfort', 'home_based', 'compassionate'],
    channels: ['healthcare_provider', 'referral', 'direct'],
  },

  // ========== 自動車部品 B2B2C (Auto Parts Distribution) ==========
  'GPC': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'male' },
    occasions: ['auto_repair', 'maintenance', 'DIY'],
    valueProps: ['selection', 'availability', 'expertise'],
    channels: ['retail', 'professional', 'online'],
  },

  // ========== 食品 B2B2C (Food Producers) ==========
  'CALM': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery', 'breakfast', 'cooking'],
    valueProps: ['fresh', 'quality', 'value'],
    channels: ['grocery', 'retail'],
  },
  'POST': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['breakfast', 'snack', 'daily_nutrition'],
    valueProps: ['convenience', 'taste', 'value'],
    channels: ['grocery', 'retail'],
  },
  'FLO': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery', 'daily_bread', 'sandwich'],
    valueProps: ['freshness', 'value', 'availability'],
    channels: ['grocery', 'retail'],
  },

  // ========== 製薬 B2B2C (Specialty Pharma) ==========
  'JAZZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['sleep_disorders', 'oncology', 'rare_disease'],
    valueProps: ['specialized', 'efficacy', 'innovation'],
    channels: ['healthcare_provider', 'specialty_pharmacy'],
  },
  'UTHR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['pulmonary_hypertension', 'rare_disease'],
    valueProps: ['life_saving', 'specialized', 'support'],
    channels: ['healthcare_provider', 'specialty_pharmacy'],
  },
  'NBIX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['movement_disorders', 'neurology', 'psychiatry'],
    valueProps: ['specialized', 'efficacy', 'innovation'],
    channels: ['healthcare_provider', 'specialty_pharmacy'],
  },
  'PCVX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['vaccination', 'pneumonia_prevention', 'infectious_disease'],
    valueProps: ['prevention', 'efficacy', 'next_generation'],
    channels: ['healthcare_provider', 'pharmacy'],
  },

  // ========== 葬儀 B2C (Funeral Services) ==========
  'SCI': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['funeral', 'pre_planning', 'cemetery'],
    valueProps: ['trust', 'compassion', 'comprehensive'],
    channels: ['direct', 'retail', 'online'],
  },

  // ========== 賃貸住宅 B2C (Residential REITs) ==========
  'CPT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['apartment_rental', 'relocation', 'lifestyle'],
    valueProps: ['location', 'amenities', 'community'],
    channels: ['online', 'direct'],
  },
  'AMH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_rental', 'family', 'suburban_living'],
    valueProps: ['space', 'flexibility', 'neighborhood'],
    channels: ['online', 'direct'],
  },

  // ========== S&P 400 Midcap B2C/B2B2C 追加 ==========

  // --- Regional Banks (B2B2C) ---
  'BANR': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['checking', 'savings', 'mortgage', 'small_business'],
    valueProps: ['community', 'local', 'personal_service', 'convenience'],
    channels: ['branch', 'online', 'mobile'],
  },
  'CUBI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['checking', 'savings', 'business_lending', 'fintech'],
    valueProps: ['digital', 'technology', 'speed', 'competitive_rates'],
    channels: ['online', 'mobile'],
  },
  'NBTB': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['checking', 'savings', 'mortgage', 'wealth_management'],
    valueProps: ['community', 'trust', 'personal_service', 'stability'],
    channels: ['branch', 'online', 'mobile'],
  },
  'CBSH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['checking', 'savings', 'commercial', 'trust'],
    valueProps: ['service', 'reliability', 'midwest_values', 'wealth_services'],
    channels: ['branch', 'online', 'mobile'],
  },

  // --- Insurance B2C ---
  'ROOT': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_insurance', 'safe_driving', 'mobile_purchase'],
    valueProps: ['fairness', 'technology', 'savings', 'mobile_first'],
    channels: ['mobile', 'online'],
  },
  'LMND': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['renters_insurance', 'homeowners', 'pet_insurance'],
    valueProps: ['simplicity', 'instant', 'social_good', 'digital'],
    channels: ['mobile', 'online'],
  },
  'KMPR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_insurance', 'home_insurance', 'personal_lines'],
    valueProps: ['value', 'reliability', 'local_agents', 'bundling'],
    channels: ['agent', 'online', 'mobile'],
  },

  // --- Smart Home B2B2C ---
  'ALRM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_security', 'smart_home', 'energy_management'],
    valueProps: ['security', 'convenience', 'connected', 'automation'],
    channels: ['dealer', 'online', 'mobile'],
  },

  // --- Smart Home Camera B2C ---
  'ARLO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_security', 'baby_monitor', 'package_theft'],
    valueProps: ['wireless', 'easy_setup', 'smart_alerts', 'cloud'],
    channels: ['retail', 'online', 'mobile'],
  },

  // --- Restaurant B2C ---
  'JACK': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'male' },
    occasions: ['late_night', 'drive_through', 'quick_meal', 'budget'],
    valueProps: ['convenience', 'value', 'late_hours', 'variety'],
    channels: ['drive_through', 'dine_in', 'delivery'],
  },
  'CAKE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['celebration', 'family_dinner', 'date_night', 'brunch'],
    valueProps: ['variety', 'portions', 'atmosphere', 'cheesecake'],
    channels: ['dine_in', 'takeout', 'delivery'],
  },
  'DINE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_dining', 'breakfast', 'casual_meal', 'neighborhood'],
    valueProps: ['familiar', 'value', 'convenience', 'variety'],
    channels: ['dine_in', 'takeout', 'delivery'],
  },

  // --- Residential Solar B2C ---
  'NOVA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['solar_installation', 'energy_savings', 'home_improvement'],
    valueProps: ['savings', 'green', 'energy_independence', 'financing'],
    channels: ['dealer', 'online', 'direct'],
  },

  // --- Gas Utility B2B2C ---
  'SW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_heating', 'cooking', 'water_heating', 'essential_utility'],
    valueProps: ['reliability', 'essential', 'regulated_rates', 'safety'],
    channels: ['direct', 'utility_billing'],
  },

  // --- Online Gaming B2C ---
  'RSI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['sports_betting', 'casino', 'entertainment', 'live_events'],
    valueProps: ['convenience', 'variety', 'promotions', 'mobile_first'],
    channels: ['mobile', 'online'],
  },

  // --- Healthcare B2C ---
  'USPH': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['injury_recovery', 'surgery_rehab', 'chronic_pain', 'sports_therapy'],
    valueProps: ['clinical_expertise', 'convenience', 'insurance_accepted', 'local'],
    channels: ['clinic', 'referral'],
  },

  // --- Consumer/Retail B2C ---
  'COLM': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['outdoor_recreation', 'hiking', 'skiing', 'casual_wear'],
    valueProps: ['durability', 'value', 'technology', 'outdoor_performance'],
    channels: ['retail', 'online', 'wholesale', 'outlet'],
  },
  'ACI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'weekly_meals', 'pharmacy', 'household'],
    valueProps: ['convenience', 'fresh_food', 'pharmacy', 'loyalty_rewards'],
    channels: ['store', 'online', 'delivery'],
  },
  'GO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'bargain_hunting', 'pantry_stocking'],
    valueProps: ['value', 'treasure_hunt', 'savings', 'brand_variety'],
    channels: ['store'],
  },
  'PLCE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['back_to_school', 'seasonal', 'growth_spurts', 'basics'],
    valueProps: ['value', 'variety', 'convenience', 'quality_basics'],
    channels: ['retail', 'online', 'outlet'],
  },
  'LOVE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_furnishing', 'moving', 'home_upgrade', 'entertainment'],
    valueProps: ['modular', 'customizable', 'washable', 'lifetime_value'],
    channels: ['showroom', 'online', 'popup'],
  },
  'ARHS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_furnishing', 'renovation', 'new_home', 'design_refresh'],
    valueProps: ['artisan_quality', 'unique_design', 'sustainability', 'premium'],
    channels: ['showroom', 'online'],
  },
  'MUSA': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fuel_stop', 'road_trip', 'quick_snack', 'tobacco'],
    valueProps: ['low_price_fuel', 'convenience', 'location', 'speed'],
    channels: ['store'],
  },
  'PZZA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['delivery', 'family_dinner', 'game_day', 'quick_meal'],
    valueProps: ['quality_ingredients', 'delivery', 'digital_ordering', 'rewards'],
    channels: ['delivery', 'carryout', 'dine_in', 'mobile'],
  },
  'BLMN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_dinner', 'celebration', 'date_night', 'casual_dining'],
    valueProps: ['steakhouse', 'atmosphere', 'variety', 'value'],
    channels: ['dine_in', 'takeout', 'delivery'],
  },
  'SNBR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['mattress_replacement', 'sleep_improvement', 'new_home', 'wellness'],
    valueProps: ['smart_technology', 'adjustable', 'sleep_tracking', 'comfort'],
    channels: ['retail', 'online', 'direct'],
  },
  'IRBT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_cleaning', 'convenience', 'smart_home', 'gift'],
    valueProps: ['automation', 'time_saving', 'smart_mapping', 'hands_free'],
    channels: ['retail', 'online', 'direct'],
  },
  'CSV': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['bereavement', 'pre_planning', 'memorial', 'cremation'],
    valueProps: ['compassion', 'dignity', 'local_tradition', 'comprehensive'],
    channels: ['direct', 'referral'],
  },
  'YETI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['outdoor_recreation', 'camping', 'fishing', 'tailgating', 'gift'],
    valueProps: ['durability', 'premium', 'outdoor_lifestyle', 'brand_status'],
    channels: ['retail', 'online', 'wholesale', 'direct'],
  },
  'CLAR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['climbing', 'skiing', 'adventure_sports', 'outdoor_recreation'],
    valueProps: ['performance', 'safety', 'innovation', 'adventure_lifestyle'],
    channels: ['specialty_retail', 'online', 'wholesale'],
  },

  // --- B2B2C Profiles ---
  'GIII': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['seasonal', 'outerwear', 'fashion', 'everyday'],
    valueProps: ['brand_names', 'value', 'style', 'quality'],
    channels: ['wholesale', 'retail', 'online', 'department_store'],
  },
  'JJSF': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['snacking', 'stadium_events', 'school', 'entertainment'],
    valueProps: ['taste', 'convenience', 'fun', 'nostalgia'],
    channels: ['food_service', 'retail', 'vending', 'stadium'],
  },
  'FIZZ': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['refreshment', 'health_alternative', 'social', 'daily_hydration'],
    valueProps: ['zero_calorie', 'natural_flavor', 'sparkling', 'healthy'],
    channels: ['retail', 'online', 'wholesale'],
  },

  // ========== 追加 (2026-01-24 batch 2) ==========

  // --- Water Utilities (B2B2C) ---
  'WTRG': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_utility', 'reliability'],
    valueProps: ['reliability', 'water_quality', 'essential', 'infrastructure'],
    channels: ['direct_service', 'utility_bill', 'online'],
  },
  'CWT': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_utility', 'reliability'],
    valueProps: ['reliability', 'water_quality', 'local_service', 'essential'],
    channels: ['direct_service', 'utility_bill', 'online'],
  },
  'SJW': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_utility', 'reliability'],
    valueProps: ['reliability', 'water_quality', 'local_service', 'essential'],
    channels: ['direct_service', 'utility_bill', 'online'],
  },

  // --- Homebuilders (B2C) ---
  'GRBK': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'first_home', 'family_growth', 'move_up'],
    valueProps: ['affordability', 'new_construction', 'customization', 'land_development'],
    channels: ['model_homes', 'online', 'real_estate_agents'],
  },
  'CCS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'first_home', 'family_growth', 'affordability'],
    valueProps: ['affordability', 'new_construction', 'customization', 'entry_level'],
    channels: ['model_homes', 'online', 'real_estate_agents'],
  },
  'MHO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'first_home', 'family_growth', 'relocation'],
    valueProps: ['affordability', 'new_construction', 'customization', 'smart_design'],
    channels: ['model_homes', 'online', 'real_estate_agents'],
  },
  'LGIH': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'first_home', 'family_growth', 'affordability'],
    valueProps: ['affordability', 'new_construction', 'move_in_ready', 'bulk_value'],
    channels: ['model_homes', 'online', 'real_estate_agents'],
  },

  // --- Restaurant Franchisors (B2C) ---
  'FAT': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['casual_meal', 'quick_service', 'dining_out', 'sports_bar'],
    valueProps: ['variety', 'brand_portfolio', 'value', 'experience'],
    channels: ['dine_in', 'takeout', 'delivery', 'drive_through'],
  },
  'DENN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['breakfast', 'family_dining', 'late_night', 'casual_meal'],
    valueProps: ['value', 'familiar', 'breakfast_specialty', '24hr_service'],
    channels: ['dine_in', 'takeout', 'delivery'],
  },

  // --- Footwear (B2C) ---
  'SHOO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['fashion', 'everyday_wear', 'going_out', 'seasonal'],
    valueProps: ['trend', 'style', 'affordability', 'variety'],
    channels: ['retail', 'online', 'department_store', 'wholesale'],
  },

  // --- Manufactured Housing (B2C) ---
  'SKY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'affordable_housing', 'retirement', 'first_home'],
    valueProps: ['affordability', 'quality', 'customization', 'speed'],
    channels: ['dealer_network', 'online', 'communities'],
  },

  // --- Real Estate Services (B2B2C) ---
  'EXPI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'home_sale', 'relocation', 'investment'],
    valueProps: ['technology', 'agent_support', 'commission_model', 'virtual'],
    channels: ['online', 'agent_network', 'virtual_platform'],
  },

  // --- Skilled Nursing (B2C) ---
  'PNTG': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'mass', gender: 'all' },
    occasions: ['elderly_care', 'rehabilitation', 'home_health', 'hospice'],
    valueProps: ['quality_care', 'compassion', 'skilled_staff', 'local'],
    channels: ['direct_service', 'hospital_referral', 'online'],
  },

  // --- Game Engine (B2B2C) ---
  'U': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['game_development', 'AR_VR', '3D_content', 'simulation'],
    valueProps: ['platform', 'tools', 'monetization', 'real_time_3D'],
    channels: ['online', 'direct', 'app_store'],
  },

  // --- S&P 600 Small-Cap Additions ---

  // Casual Dining (B2C)
  'BJRI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['dinner', 'family_dining', 'social'],
    valueProps: ['variety', 'casual_atmosphere', 'value'],
    channels: ['dine_in', 'takeout', 'delivery'],
  },
  // Japanese Fast Casual (B2C)
  'KRUS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['dinner', 'date_night', 'social'],
    valueProps: ['novelty', 'quality_food', 'experience'],
    channels: ['dine_in'],
  },
  // Quick Service Restaurant (B2C)
  'LOCO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['lunch', 'dinner', 'quick_meal'],
    valueProps: ['value', 'freshness', 'speed'],
    channels: ['drive_through', 'dine_in', 'delivery'],
  },
  // For-Profit Education (B2C)
  'PRDO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['career_advancement', 'degree_completion'],
    valueProps: ['flexibility', 'affordability', 'career_outcomes'],
    channels: ['online'],
  },
  // Insulin Pump Devices (B2B2C)
  'TNDM': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['chronic_disease_management'],
    valueProps: ['convenience', 'accuracy', 'quality_of_life'],
    channels: ['healthcare_provider', 'direct'],
  },
  // Regional Banks (B2B2C)
  'GBCI': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'TOWN': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'HOPE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'OFG': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'UMBF': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'ABCB': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ---------- S&P 600 Consumer/Retail ----------
  'SCVL': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['shoe_shopping', 'back_to_school'],
    valueProps: ['value', 'selection', 'brands'],
    channels: ['store', 'online'],
  },
  'LESL': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['pool_maintenance', 'seasonal'],
    valueProps: ['expertise', 'convenience', 'selection'],
    channels: ['store', 'online'],
  },
  'XPOF': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fitness', 'wellness'],
    valueProps: ['community', 'variety', 'quality_instruction'],
    channels: ['studio', 'app'],
  },
  'EYE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['vision_care', 'eye_exam'],
    valueProps: ['affordability', 'convenience', 'selection'],
    channels: ['store', 'online'],
  },

  // ---------- S&P 600 Specialty Finance ----------
  'TREE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['loan_shopping', 'refinance', 'insurance'],
    valueProps: ['comparison', 'convenience', 'savings'],
    channels: ['online', 'mobile'],
  },
  'WRLD': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['emergency_funding', 'personal_loan'],
    valueProps: ['access', 'speed'],
    channels: ['branch'],
  },
  'EZPW': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['short_term_funding', 'buying_goods'],
    valueProps: ['immediate_cash', 'value_goods'],
    channels: ['store'],
  },

  // ---------- S&P 600 Regional Banks ----------
  'FCNCA': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'IBOC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'CADE': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ========== 保险 (Insurance B2B2C) ==========
  'HCI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_purchase', 'policy_renewal', 'property_protection'],
    valueProps: ['coverage', 'claims_service', 'affordability'],
    channels: ['agent', 'online'],
  },

  // ========== 博彩/娱乐 (Casino/Gaming B2C) ==========
  'GDEN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'dining'],
    valueProps: ['excitement', 'entertainment', 'rewards'],
    channels: ['casino', 'online', 'app'],
  },
  'RRR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'dining'],
    valueProps: ['excitement', 'entertainment', 'rewards'],
    channels: ['casino', 'online', 'app'],
  },
  'CHDN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'dining'],
    valueProps: ['excitement', 'entertainment', 'rewards'],
    channels: ['casino', 'online', 'app'],
  },

  // ========== 汽车市场 (Auto Marketplace B2C) ==========
  'CARG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['car_shopping', 'selling_car'],
    valueProps: ['transparency', 'comparison', 'convenience'],
    channels: ['online', 'app'],
  },

  // ========== 房车/户外 (RV/Outdoor B2C/B2B2C) ==========
  'WGO': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['recreation', 'travel', 'retirement'],
    valueProps: ['freedom', 'adventure', 'quality'],
    channels: ['dealer', 'online'],
  },
  'CWH': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['recreation', 'travel', 'retirement'],
    valueProps: ['freedom', 'adventure', 'quality'],
    channels: ['dealer', 'online'],
  },
  'FOXF': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['recreation', 'travel', 'retirement'],
    valueProps: ['freedom', 'adventure', 'quality'],
    channels: ['dealer', 'online'],
  },

  // ========== 食品品牌 (Food B2C/B2B2C) ==========
  'JBSS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'snacking'],
    valueProps: ['taste', 'value', 'convenience'],
    channels: ['grocery', 'mass_retail', 'online'],
  },
  'BGS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'snacking'],
    valueProps: ['taste', 'value', 'convenience'],
    channels: ['grocery', 'mass_retail', 'online'],
  },
  'UTZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'snacking'],
    valueProps: ['taste', 'value', 'convenience'],
    channels: ['grocery', 'mass_retail', 'online'],
  },
  'HAIN': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'snacking'],
    valueProps: ['taste', 'value', 'convenience'],
    channels: ['grocery', 'mass_retail', 'online'],
  },

  // ========== 医疗服务 (Healthcare B2C) ==========
  'CHE': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['healthcare_need', 'aging_care'],
    valueProps: ['quality_care', 'compassion', 'proximity'],
    channels: ['healthcare_provider', 'referral'],
  },
  'NHC': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['healthcare_need', 'aging_care'],
    valueProps: ['quality_care', 'compassion', 'proximity'],
    channels: ['healthcare_provider', 'referral'],
  },
  'ADUS': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['healthcare_need', 'aging_care'],
    valueProps: ['quality_care', 'compassion', 'proximity'],
    channels: ['healthcare_provider', 'referral'],
  },

  // ========== 房地产 (Real Estate B2C) ==========
  'HHH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_purchase', 'community_living'],
    valueProps: ['master_plan', 'amenities', 'appreciation'],
    channels: ['model_homes', 'realtor', 'online'],
  },

  // ========== 教育 (Education B2C) ==========
  'LRN': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['education', 'career_change'],
    valueProps: ['flexibility', 'career_outcomes', 'accreditation'],
    channels: ['online', 'campus'],
  },
  'ATGE': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['education', 'career_change'],
    valueProps: ['flexibility', 'career_outcomes', 'accreditation'],
    channels: ['online', 'campus'],
  },

  // ========== 数字汇款/跨境支付 ==========
  'RELY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['sending_money', 'family_support'],
    valueProps: ['speed', 'low_cost', 'trust'],
    channels: ['app', 'online'],
  },
  'PAYO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['freelance_payment', 'business_payment'],
    valueProps: ['global_reach', 'multi_currency', 'low_fees'],
    channels: ['online', 'app'],
  },

  // ========== HSA健康储蓄 ==========
  'HQY': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['healthcare_savings', 'benefits_enrollment'],
    valueProps: ['tax_savings', 'investment_options', 'convenience'],
    channels: ['employer', 'online', 'app'],
  },

  // ========== 数据中心REIT ==========
  'DLR': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['data_hosting', 'cloud_infrastructure'],
    valueProps: ['reliability', 'connectivity', 'scalability'],
    channels: ['direct_sales', 'online'],
  },

  // ========== 保险经纪 ==========
  'BRO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['insurance_purchase', 'risk_management'],
    valueProps: ['expertise', 'selection', 'service'],
    channels: ['broker', 'online'],
  },

  // ========== 家庭安防 ==========
  'ADT': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_protection', 'moving'],
    valueProps: ['security', 'peace_of_mind', 'monitoring'],
    channels: ['direct_sales', 'retail', 'online'],
  },

  // ========== 托幼服务 ==========
  'BFAM': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['childcare', 'back_to_work'],
    valueProps: ['quality_care', 'convenience', 'employer_benefit'],
    channels: ['center', 'employer'],
  },

  // ========== 电影院 ==========
  'CNK': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'date_night', 'family_outing'],
    valueProps: ['experience', 'convenience', 'value'],
    channels: ['theater', 'app', 'online'],
  },

  // ========== 家居零售 ==========
  'ETD': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_furnishing', 'remodel', 'moving'],
    valueProps: ['quality', 'design', 'customization'],
    channels: ['showroom', 'online', 'interior_designer'],
  },

  // ========== 家居产品 ==========
  'FBIN': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_improvement', 'remodel', 'new_home'],
    valueProps: ['quality', 'design', 'durability'],
    channels: ['home_center', 'dealer', 'online'],
  },

  // ========== 主题公园 ==========
  'FUN': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['family_outing', 'entertainment', 'vacation'],
    valueProps: ['thrills', 'family_fun', 'seasonal_events'],
    channels: ['park', 'online', 'app'],
  },

  // ========== 超级应用 ==========
  'GRAB': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['ride_hailing', 'food_delivery', 'payments'],
    valueProps: ['convenience', 'speed', 'variety'],
    channels: ['app'],
  },

  // ========== 电脑外设 ==========
  'LOGI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['work_setup', 'gaming', 'content_creation'],
    valueProps: ['quality', 'ergonomics', 'design'],
    channels: ['retail', 'online', 'direct'],
  },

  // ========== 赌场度假村 ==========
  'LVS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['vacation', 'gambling', 'convention'],
    valueProps: ['luxury', 'entertainment', 'integrated_resort'],
    channels: ['resort', 'online', 'travel_agent'],
  },

  // ========== 家庭舒适/安防 ==========
  'REZI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_improvement', 'hvac_install', 'security'],
    valueProps: ['comfort', 'efficiency', 'connected_home'],
    channels: ['contractor', 'retail', 'online'],
  },

  // ========== 住宅建设 ==========
  'TMHC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['home_purchase', 'family_growth', 'relocation'],
    valueProps: ['quality_construction', 'design', 'community'],
    channels: ['model_homes', 'realtor', 'online'],
  },

  // ========== 家用电器 ==========
  'WHR': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['appliance_replacement', 'new_home', 'remodel'],
    valueProps: ['reliability', 'brand_trust', 'innovation'],
    channels: ['retail', 'home_center', 'online'],
  },

  // ========== 健康补充剂 ==========
  'USNA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['health_wellness', 'nutrition'],
    valueProps: ['quality', 'science_backed', 'community'],
    channels: ['direct_selling', 'online'],
  },

  // ========== 美容健康 ==========
  'NUS': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'female' },
    occasions: ['skincare', 'anti_aging', 'wellness'],
    valueProps: ['innovation', 'science', 'community'],
    channels: ['direct_selling', 'online'],
  },

  // ========== 珠宝零售 ==========
  'SIG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['engagement', 'anniversary', 'gift', 'holiday'],
    valueProps: ['selection', 'financing', 'branding'],
    channels: ['store', 'online'],
  },

  // ========== 汽车服务 ==========
  'MNRO': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['auto_maintenance', 'tire_replacement', 'repair'],
    valueProps: ['convenience', 'trust', 'value'],
    channels: ['store'],
  },

  // ========== 内衣/美妆零售 ==========
  'VSCO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'female' },
    occasions: ['intimates_shopping', 'beauty', 'self_care'],
    valueProps: ['brand', 'fit', 'style'],
    channels: ['store', 'online'],
  },

  // ========== 船舶/休闲 ==========
  'BC': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['boating', 'fishing', 'recreation'],
    valueProps: ['quality', 'performance', 'brand'],
    channels: ['dealer', 'marine_retail'],
  },
  'HZO': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['boat_purchase', 'marine_service'],
    valueProps: ['selection', 'expertise', 'service'],
    channels: ['marina', 'showroom'],
  },

  // ========== 赌场 ==========
  'MCRI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['entertainment', 'gambling', 'dining'],
    valueProps: ['experience', 'local_gaming', 'value'],
    channels: ['casino'],
  },

  // ========== 保险 (B2B2C) ==========
  'SIGI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['insurance_purchase', 'renewal'],
    valueProps: ['coverage', 'service', 'value'],
    channels: ['agent', 'broker', 'online'],
  },
  'ORI': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['insurance_purchase', 'renewal'],
    valueProps: ['coverage', 'service', 'value'],
    channels: ['agent', 'broker', 'online'],
  },
  'THG': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'all', gender: 'all' },
    occasions: ['insurance_purchase', 'renewal'],
    valueProps: ['coverage', 'service', 'value'],
    channels: ['agent', 'broker', 'online'],
  },

  // ========== 生鲜配送 (Grocery Delivery) ==========
  'CART': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['grocery_shopping', 'convenience', 'busy_schedule'],
    valueProps: ['convenience', 'speed', 'selection'],
    channels: ['app', 'online'],
  },

  // ========== 高端鞋履 (Premium Footwear) ==========
  'BIRK': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['casual_footwear', 'comfort', 'fashion'],
    valueProps: ['comfort', 'durability', 'heritage'],
    channels: ['retail', 'online', 'department_store'],
  },

  // ========== 拉美电商 (LatAm E-commerce) ==========
  'MELI': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online_shopping', 'payments'],
    valueProps: ['selection', 'convenience', 'fintech'],
    channels: ['app', 'online'],
  },

  // ========== 东南亚平台 (SE Asia Platform) ==========
  'SE': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['gaming', 'shopping', 'payments'],
    valueProps: ['entertainment', 'convenience', 'value'],
    channels: ['app', 'online'],
  },

  // ========== 中国电商/科技 (Chinese E-commerce/Tech) ==========
  'BABA': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online_shopping', 'wholesale'],
    valueProps: ['selection', 'value', 'global_trade'],
    channels: ['app', 'online'],
  },
  'PDD': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['bargain_shopping', 'daily_deals'],
    valueProps: ['ultra_value', 'gamification', 'social_shopping'],
    channels: ['app'],
  },
  'JD': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['electronics_shopping', 'fast_delivery'],
    valueProps: ['authenticity', 'speed', 'quality'],
    channels: ['app', 'online'],
  },
  'BIDU': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['search', 'information', 'AI_services'],
    valueProps: ['comprehensive', 'AI_powered', 'local_content'],
    channels: ['web', 'app'],
  },

  // ========== eVTOL (eVTOL Air Taxi) ==========
  'JOBY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'high_net_worth', gender: 'all' },
    occasions: ['urban_transport', 'airport_transfer'],
    valueProps: ['speed', 'convenience', 'sustainability'],
    channels: ['app'],
  },

  // ========== 高端电动汽车 (Premium EV) ==========
  'PSNY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['car_purchase', 'ev_adoption'],
    valueProps: ['design', 'sustainability', 'performance'],
    channels: ['online', 'showroom'],
  },

  // ========== 补充: 2026-01 第八批 (B2C/B2B2C) ==========

  // --- 快餐 (Fast Casual) ---
  'PTLO': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['lunch', 'dinner', 'quick_meal'],
    valueProps: ['authentic_flavor', 'nostalgia', 'speed'],
    channels: ['dine_in', 'drive_through', 'takeout'],
  },

  // --- 便利店/加油 ---
  'ARKO': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['fuel_purchase', 'convenience_shopping'],
    valueProps: ['location', 'speed', 'value'],
    channels: ['store', 'fuel_pump'],
  },

  // --- 心理健康 ---
  'LFST': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'all', gender: 'all' },
    occasions: ['mental_health', 'therapy', 'wellness'],
    valueProps: ['accessibility', 'quality_care', 'insurance_accepted'],
    channels: ['office', 'telehealth'],
  },

  // --- 家庭输液 ---
  'OPCH': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['chronic_treatment', 'home_therapy'],
    valueProps: ['home_convenience', 'clinical_expertise', 'insurance'],
    channels: ['home_delivery', 'healthcare_provider'],
  },

  // --- 急性期后护理 ---
  'PACS': {
    demographics: { ageGroup: 'boomer', incomeLevel: 'all', gender: 'all' },
    occasions: ['post_surgery', 'rehabilitation', 'long_term_care'],
    valueProps: ['quality_care', 'proximity', 'outcomes'],
    channels: ['facility', 'referral'],
  },

  // --- 区域银行 (B2B2C) ---
  'FFBC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },
  'WSBC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['banking', 'lending', 'mortgage'],
    valueProps: ['local_service', 'relationship', 'community'],
    channels: ['branch', 'online', 'mobile'],
  },

  // ========== 有线/宽带 ==========
  'ATUS': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['internet', 'tv', 'phone'],
    valueProps: ['bundling', 'speed', 'local_service'],
    channels: ['online', 'phone', 'retail'],
  },

  // ========== 体育/娱乐 ==========
  'MSGS': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'male' },
    occasions: ['sports_event', 'entertainment'],
    valueProps: ['premium_experience', 'loyalty', 'iconic_teams'],
    channels: ['venue', 'streaming', 'app'],
  },
  'MSGE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['concerts', 'shows', 'events'],
    valueProps: ['premium_venue', 'unique_experience', 'iconic_location'],
    channels: ['venue', 'online', 'app'],
  },

  // ========== 消费品 ==========
  'HELE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['home_care', 'personal_care'],
    valueProps: ['quality', 'brand_trust', 'innovation'],
    channels: ['retail', 'online'],
  },
  'IPAR': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['fragrance_purchase', 'gift', 'self_treat'],
    valueProps: ['prestige', 'quality', 'brand_variety'],
    channels: ['department_store', 'specialty', 'online'],
  },
  'VITL': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['grocery_shopping', 'ethical_eating'],
    valueProps: ['animal_welfare', 'quality', 'transparency'],
    channels: ['grocery', 'natural_store', 'online'],
  },

  // ========== 公用事业 (Utilities - B2B2C) ==========
  'PCG': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_energy'],
    valueProps: ['reliability', 'safety', 'clean_energy'],
    channels: ['direct_service', 'online'],
  },
  'EIX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_energy'],
    valueProps: ['reliability', 'clean_energy', 'affordability'],
    channels: ['direct_service', 'online'],
  },

  // ========== 电信宽带 (Fiber Broadband - B2C) ==========
  'FYBR': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['internet_service', 'broadband'],
    valueProps: ['fiber_speed', 'reliability', 'value'],
    channels: ['online', 'phone', 'retail'],
  },

  // ========== 大麻/饮料 (Cannabis/Beverage - B2C) ==========
  'TLRY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['recreation', 'wellness'],
    valueProps: ['quality', 'brand_variety', 'craft'],
    channels: ['dispensary', 'retail'],
  },

  // ========== 补充 B2C/B2B2C 公司 ==========
  'CPNG': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'all' },
    occasions: ['online_shopping', 'grocery', 'convenience'],
    valueProps: ['rocket_delivery', 'selection', 'value'],
    channels: ['app', 'online'],
  },
  'WMG': {
    demographics: { ageGroup: 'gen_z', incomeLevel: 'mass', gender: 'all' },
    occasions: ['music_listening', 'entertainment'],
    valueProps: ['artist_catalog', 'discovery', 'quality'],
    channels: ['streaming', 'retail', 'live_events'],
  },
  'TILE': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['renovation', 'commercial_design', 'flooring'],
    valueProps: ['sustainability', 'design', 'durability'],
    channels: ['dealer', 'architect', 'online'],
  },
  'DTC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['outdoor_recreation', 'camping', 'lifestyle'],
    valueProps: ['quality', 'brand_community', 'direct_relationship'],
    channels: ['online', 'retail'],
  },
  'COOP': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'mass', gender: 'all' },
    occasions: ['mortgage_servicing', 'refinance', 'home_purchase'],
    valueProps: ['digital_experience', 'service', 'rates'],
    channels: ['online', 'phone', 'app'],
  },
  'SWX': {
    demographics: { ageGroup: 'all', incomeLevel: 'all', gender: 'all' },
    occasions: ['essential_service', 'home_heating'],
    valueProps: ['reliability', 'safety', 'affordability'],
    channels: ['direct_service', 'online'],
  },
  'PLBY': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'mass', gender: 'male' },
    occasions: ['entertainment', 'lifestyle', 'fashion'],
    valueProps: ['brand_heritage', 'lifestyle', 'content'],
    channels: ['online', 'retail', 'licensing'],
  },
  'RENT': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'female' },
    occasions: ['fashion', 'events', 'work_wardrobe'],
    valueProps: ['variety', 'sustainability', 'affordability'],
    channels: ['app', 'online'],
  },
  'BIRD': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'affluent', gender: 'all' },
    occasions: ['casual_footwear', 'sustainable_shopping'],
    valueProps: ['comfort', 'sustainability', 'simplicity'],
    channels: ['online', 'retail'],
  },
  'LANC': {
    demographics: { ageGroup: 'all', incomeLevel: 'mass', gender: 'all' },
    occasions: ['grocery_shopping', 'cooking'],
    valueProps: ['quality', 'brand_trust', 'taste'],
    channels: ['grocery', 'mass_retail'],
  },
};

// ============================================================
// 经济周期位置配置
// ============================================================

export const CYCLE_POSITIONS: Record<string, CyclePosition> = {
  // ========== 早周期 (Early Cycle) ==========
  // 利率敏感、经济复苏初期受益
  // 房地产、金融、非必需消费

  // ---------- 房建 (Homebuilders) ----------
  'LEN': 'early',     // Lennar
  'DHI': 'early',     // D.R. Horton
  'PHM': 'early',     // PulteGroup
  'TOL': 'early',     // Toll Brothers
  'NVR': 'early',     // NVR
  'KBH': 'early',     // KB Home
  // 建筑材料/产品 (Building Products)
  'JHX': 'early',     // James Hardie - 纤维水泥
  'AZEK': 'early',    // AZEK - 复合材料
  'OC': 'early',      // Owens Corning - 绝缘/屋顶
  'BLDR': 'early',    // Builders FirstSource - 分销
  // 房地产服务 (Real Estate Services)
  'RKT': 'early',     // Rocket Mortgage
  'FAF': 'early',     // First American Financial
  'FNF': 'early',     // Fidelity National Financial

  // ---------- 家居建材 (Home Improvement) ----------
  'HD': 'early',      // Home Depot
  'LOW': 'early',     // Lowe's

  // ---------- 家电 (Appliances) ----------
  'WHR': 'early',     // 家电

  // ---------- 汽车 (Automotive) ----------
  'F': 'early',       // Ford
  'GM': 'early',      // General Motors
  'TSLA': 'early',    // Tesla
  'RIVN': 'early',    // Rivian
  'LCID': 'early',    // Lucid
  // 零部件 (Auto Parts OEM)
  'APTV': 'early',    // Aptiv - 电气化
  'BWA': 'early',     // BorgWarner - 电驱动
  'LEA': 'early',     // Lear - 座椅/电子
  'MGA': 'early',     // Magna - 综合Tier1
  'ALV': 'mid',       // Autoliv - 安全件(相对稳定)
  'GNTX': 'mid',      // Gentex - 后视镜(相对稳定)
  // 经销商 (Dealers)
  'AN': 'early',      // AutoNation
  'PAG': 'early',     // Penske Automotive
  'LAD': 'early',     // Lithia Motors
  'KMX': 'early',     // CarMax
  'CVNA': 'early',    // Carvana

  // ---------- 餐饮 (Restaurants) ----------
  'MCD': 'early',     // McDonald's - 价值导向
  'SBUX': 'early',    // Starbucks
  'CMG': 'early',     // Chipotle
  'YUM': 'early',     // Yum! Brands
  'DRI': 'early',     // Darden
  'QSR': 'early',     // Restaurant Brands
  'WING': 'early',    // Wingstop

  // ---------- 旅游/酒店 (Travel & Hospitality) ----------
  'MAR': 'early',     // Marriott
  'HLT': 'early',     // Hilton
  'WH': 'early',      // Wyndham
  'ABNB': 'early',    // Airbnb
  'BKNG': 'early',    // Booking
  'EXPE': 'early',    // Expedia

  // ---------- 服装零售 (Apparel Retail) ----------
  'GPS': 'early',     // Gap
  'ANF': 'early',     // Abercrombie
  'AEO': 'early',     // American Eagle
  'URBN': 'early',    // Urban Outfitters

  // ---------- 专业零售 (Specialty Retail) ----------
  'BBY': 'early',     // Best Buy
  'ULTA': 'early',    // Ulta Beauty
  'W': 'early',       // Wayfair
  'RH': 'early',      // RH (Restoration Hardware)
  'WSM': 'early',     // Williams-Sonoma

  // ---------- 汽配零售 (Auto Parts Retail) ----------
  'ORLY': 'mid',      // O'Reilly - 相对防御
  'AZO': 'mid',       // AutoZone - 相对防御
  'AAP': 'mid',       // Advance Auto Parts

  // ---------- 邮轮 (Cruise Lines) ----------
  'RCL': 'early',     // Royal Caribbean
  'CCL': 'early',     // Carnival
  'NCLH': 'early',    // Norwegian

  // 大型银行 (Money Center Banks)
  'JPM': 'early',     // JP Morgan
  'BAC': 'early',     // Bank of America
  'WFC': 'early',     // Wells Fargo
  'C': 'early',       // Citigroup

  // 区域银行 (Regional Banks)
  'PNC': 'early',     // PNC Financial
  'USB': 'early',     // U.S. Bancorp
  'TFC': 'early',     // Truist
  'FITB': 'early',    // Fifth Third
  'RF': 'early',      // Regions
  'KEY': 'early',     // KeyCorp
  'CFG': 'early',     // Citizens
  'HBAN': 'early',    // Huntington
  'MTB': 'early',     // M&T Bank

  // 投资银行/券商
  'GS': 'early',      // Goldman Sachs
  'MS': 'early',      // Morgan Stanley
  'SCHW': 'early',    // Schwab

  // 消费金融
  'COF': 'early',     // Capital One
  'DFS': 'early',     // Discover
  'SYF': 'early',     // Synchrony

  // ========== 中周期 (Mid Cycle) ==========
  // 经济扩张期受益、资本开支增加
  // 工业、材料、科技

  // ---------- 工业综合 (Industrial Conglomerates) ----------
  'HON': 'mid',       // Honeywell
  'MMM': 'mid',       // 3M
  'GE': 'mid',        // GE Aerospace
  'ITW': 'mid',       // Illinois Tool Works
  'EMR': 'mid',       // Emerson
  'ETN': 'mid',       // Eaton
  'PH': 'mid',        // Parker Hannifin
  'ROK': 'mid',       // Rockwell Automation

  // ---------- 建筑/农业机械 (Construction & Ag Equipment) ----------
  'CAT': 'mid',       // Caterpillar
  'DE': 'mid',        // Deere
  'AGCO': 'mid',      // AGCO
  'CNHI': 'mid',      // CNH Industrial
  'PCAR': 'mid',      // PACCAR
  'CMI': 'mid',       // Cummins
  'TEX': 'mid',       // Terex
  'OSK': 'mid',       // Oshkosh

  // ---------- 工业分销 (Industrial Distribution) ----------
  'FAST': 'mid',      // Fastenal
  'GWW': 'mid',       // Grainger
  'MSM': 'mid',       // MSC Industrial
  'WSO': 'mid',       // Watsco
  'POOL': 'mid',      // Pool Corp

  // ---------- 钢铁 (Steel) ----------
  'NUE': 'mid',       // Nucor
  'STLD': 'mid',      // Steel Dynamics
  'CLF': 'mid',       // Cleveland-Cliffs
  'X': 'mid',         // US Steel
  'RS': 'mid',        // Reliance Steel

  // ---------- 铜/有色金属 (Copper & Non-Ferrous) ----------
  'FCX': 'mid',       // Freeport-McMoRan
  'SCCO': 'mid',      // Southern Copper
  'AA': 'mid',        // Alcoa

  // ---------- 骨料/水泥 (Aggregates & Cement) ----------
  'VMC': 'mid',       // Vulcan Materials
  'MLM': 'mid',       // Martin Marietta
  'CX': 'mid',        // Cemex

  // ---------- 工程承包 (E&C) ----------
  'PWR': 'mid',       // Quanta Services
  'ACM': 'mid',       // AECOM
  'J': 'mid',         // Jacobs
  'MTZ': 'mid',       // MasTec
  'EME': 'mid',       // EMCOR Group

  // ---------- 包装 (Packaging) ----------
  'BALL': 'mid',      // Ball Corp
  'CCK': 'mid',       // Crown Holdings
  'PKG': 'mid',       // Packaging Corp
  'IP': 'mid',        // International Paper
  'WRK': 'mid',       // WestRock
  'AMCR': 'mid',      // Amcor

  // ---------- 特种化工/工业气体 (Specialty Chemicals) ----------
  'APD': 'mid',       // Air Products
  'LIN': 'mid',       // Linde
  'SHW': 'mid',       // Sherwin-Williams
  'PPG': 'mid',       // PPG Industries
  'ECL': 'mid',       // Ecolab
  'IFF': 'mid',       // IFF
  'ALB': 'late',      // Albemarle - 锂周期

  // ---------- 航空航天/国防 (Aerospace & Defense) ----------
  // 国防相对防御，商用航空周期性
  'BA': 'mid',        // Boeing - 商用航空周期
  'RTX': 'defensive', // Raytheon - 国防为主
  'LMT': 'defensive', // Lockheed Martin - 国防
  'GD': 'defensive',  // General Dynamics - 国防
  'NOC': 'defensive', // Northrop Grumman - 国防
  'HII': 'defensive', // Huntington Ingalls - 国防
  'TXT': 'mid',       // Textron - 商用
  'HWM': 'mid',       // Howmet - 航空零部件
  'TDG': 'mid',       // TransDigm - 航空零部件
  'HEI': 'mid',       // HEICO - 航空零部件
  'LHX': 'defensive', // L3Harris - 国防电子
  // 航空公司 (Airlines) - 早周期，油价极敏感
  'DAL': 'early',     // Delta
  'UAL': 'early',     // United
  'AAL': 'early',     // American
  'LUV': 'early',     // Southwest

  // ---------- 科技 (Tech) ----------
  'MSFT': 'mid',      // 科技
  'AAPL': 'mid',
  'HPQ': 'mid',
  'SONO': 'mid',
  'GOOGL': 'mid',
  'AMZN': 'mid',
  'NVDA': 'mid',
  'AMD': 'mid',
  'LRCX': 'mid',      // 半导体设备
  'AMAT': 'mid',
  'ASML': 'mid',
  'KLAC': 'mid',       // KLA - 检测设备
  'TER': 'mid',        // Teradyne - 测试设备
  // 芯片设计/IDM
  'INTC': 'mid',       // Intel
  'QCOM': 'mid',       // Qualcomm
  'AVGO': 'mid',       // Broadcom
  'MRVL': 'mid',       // Marvell
  'NXPI': 'mid',       // NXP - 汽车/工业
  'SWKS': 'mid',       // Skyworks - 射频
  'QRVO': 'mid',       // Qorvo - 射频
  'ON': 'mid',         // ON Semi - 汽车/工业
  // 代工/存储
  'TSM': 'mid',        // TSMC
  'MU': 'early',       // Micron - 存储周期性更强
  'WDC': 'early',      // Western Digital - 存储

  // ---------- 科技硬件/基础设施 ----------
  'DELL': 'mid',       // 服务器/PC
  'HPE': 'mid',        // 服务器/存储
  'NTAP': 'mid',       // 存储
  'PSTG': 'mid',       // 存储
  'SMCI': 'mid',       // AI服务器
  'IBM': 'mid',        // IT服务/云
  'CSCO': 'mid',       // 网络设备
  'ANET': 'mid',       // 云网络
  'JNPR': 'mid',       // 路由器
  'FFIV': 'mid',       // 应用交付
  'CIEN': 'mid',       // 光网络
  'EQIX': 'defensive', // 数据中心REIT
  'DLR': 'defensive',  // 数据中心REIT

  // ---------- SaaS/软件 ----------
  'CRM': 'mid',        // Salesforce
  'NOW': 'mid',        // ServiceNow
  'WDAY': 'mid',       // Workday
  'SNOW': 'mid',       // Snowflake
  'TEAM': 'mid',       // Atlassian
  'DDOG': 'mid',       // Datadog
  'MDB': 'mid',        // MongoDB
  'NET': 'mid',        // Cloudflare
  'CRWD': 'mid',       // CrowdStrike
  'PANW': 'mid',       // Palo Alto
  'ZS': 'mid',         // Zscaler
  'FTNT': 'mid',       // Fortinet
  'ORCL': 'mid',       // Oracle
  'OKTA': 'mid',       // Okta
  'VEEV': 'defensive', // Veeva - 生命科学垂直(刚需)
  'HUBS': 'mid',       // HubSpot
  'BILL': 'mid',       // BILL Holdings
  'SHOP': 'mid',       // Shopify
  'PLTR': 'mid',       // Palantir

  // ---------- 电信 (Telecom) ----------
  'CMCSA': 'defensive', // Comcast
  'CHTR': 'defensive',  // Charter
  'LBRDA': 'defensive', // Liberty Broadband

  // ---------- 媒体/娱乐 ----------
  'DIS': 'mid',        // Disney
  'NFLX': 'mid',       // Netflix
  'WBD': 'mid',        // Warner Bros
  'PARA': 'mid',       // Paramount
  'FOX': 'defensive',  // Fox
  'SPOT': 'mid',       // Spotify
  'META': 'mid',       // Meta

  // ---------- 游戏 ----------
  'EA': 'mid',         // EA
  'TTWO': 'mid',       // Take-Two
  'RBLX': 'mid',       // Roblox

  // ---------- 数字广告 ----------
  'TTD': 'mid',        // Trade Desk
  'DV': 'mid',         // DoubleVerify
  'MGNI': 'mid',       // Magnite
  'APP': 'mid',        // AppLovin

  // 资产管理/另类资管 (Mid Cycle - 与市场周期相关)
  'BLK': 'mid',       // BlackRock
  'BX': 'mid',        // Blackstone
  'KKR': 'mid',       // KKR
  'APO': 'mid',       // Apollo
  'ARES': 'mid',      // Ares
  'CG': 'mid',        // Carlyle
  'TROW': 'mid',      // T. Rowe Price
  'LPLA': 'mid',      // LPL Financial

  // 支付网络 (Defensive - 刚需消费)
  'V': 'defensive',    // Visa
  'MA': 'defensive',   // Mastercard
  'AXP': 'mid',        // American Express (更偏中周期，旅行消费)

  // 金融科技/支付 (Mid Cycle)
  'PYPL': 'mid',       // PayPal
  'SQ': 'mid',         // Block/Square
  'FIS': 'defensive',  // FIS (基础设施)
  'FISV': 'defensive', // Fiserv (基础设施)
  'GPN': 'mid',        // Global Payments
  'FI': 'defensive',   // Fiserv (基础设施)
  'WU': 'defensive',   // Western Union (汇款刚需)

  // 交易所 (Mid Cycle - 与交易量相关)
  'CME': 'mid',       // CME Group
  'ICE': 'mid',       // ICE
  'NDAQ': 'mid',      // Nasdaq
  'CBOE': 'mid',      // CBOE

  // 金融数据 (Mid Cycle - 与资本市场活动相关)
  'SPGI': 'mid',      // S&P Global
  'MCO': 'mid',       // Moody's
  'MSCI': 'mid',      // MSCI

  // ---------- 保险 (Insurance) ----------
  'PGR': 'mid',        // Progressive - P&C
  'ALL': 'mid',        // Allstate - P&C
  'TRV': 'mid',        // Travelers - P&C
  'CB': 'mid',         // Chubb - P&C
  'AIG': 'mid',        // AIG - P&C
  'MET': 'mid',        // MetLife - Life
  'PRU': 'mid',        // Prudential - Life
  'HIG': 'mid',         // Hartford Financial - Diversified
  'AON': 'defensive',  // Aon - Broker
  'MMC': 'defensive',  // Marsh - Broker
  'WTW': 'defensive',  // WTW - Broker
  'AJG': 'defensive',  // Gallagher - Broker
  'BRO': 'defensive',  // Brown & Brown - Broker

  // ---------- IT服务/咨询 ----------
  'ACN': 'mid',        // Accenture
  'INFY': 'mid',       // Infosys
  'WIT': 'mid',        // Wipro
  'CTSH': 'mid',       // Cognizant
  'EPAM': 'mid',       // EPAM

  // ---------- EDA/设计软件 ----------
  'CDNS': 'mid',       // Cadence
  'SNPS': 'mid',       // Synopsys
  'ANSS': 'mid',       // Ansys

  // ---------- REITs (利率敏感) ----------
  'PLD': 'mid',        // Prologis - 工业REIT
  'REXR': 'mid',       // Rexford - 工业REIT
  'STAG': 'mid',       // STAG - 工业REIT
  'SPG': 'mid',        // Simon Property - 零售REIT
  'O': 'defensive',    // Realty Income - 净租赁
  'NNN': 'defensive',  // NNN - 净租赁
  'VICI': 'defensive', // VICI - 博彩净租赁
  'EQR': 'mid',        // Equity Residential
  'AVB': 'mid',        // AvalonBay
  'MAA': 'mid',        // Mid-America Apartment
  'INVH': 'mid',       // Invitation Homes
  'BXP': 'mid',        // Boston Properties - 办公
  'VNO': 'mid',        // Vornado - 办公
  'WELL': 'defensive', // Welltower - 医疗
  'VTR': 'defensive',  // Ventas - 医疗
  'OHI': 'defensive',  // Omega Healthcare
  'PSA': 'defensive',  // Public Storage
  'EXR': 'defensive',  // Extra Space Storage

  // ---------- 公用事业 (Utilities) ----------
  'EXC': 'defensive',  // Exelon
  'XEL': 'defensive',  // Xcel Energy
  'VST': 'mid',        // Vistra - IPP
  'NRG': 'mid',        // NRG Energy - IPP
  'CEG': 'mid',        // Constellation - 核电
  'ENPH': 'mid',       // Enphase - 太阳能设备
  'SEDG': 'mid',       // SolarEdge
  'FSLR': 'mid',       // First Solar
  'RUN': 'mid',        // Sunrun
  'AWK': 'defensive',  // American Water Works
  // 废弃物处理 (Waste Management)
  'WM': 'defensive',   // Waste Management
  'RSG': 'defensive',  // Republic Services
  'CLH': 'mid',        // Clean Harbors - 特殊废弃物(工业周期)

  // ========== 晚周期 (Late Cycle) ==========
  // 经济过热期受益、大宗商品
  // 能源、材料

  // 综合油气 (Integrated Oil)
  'XOM': 'late',      // ExxonMobil
  'CVX': 'late',      // Chevron
  'SHEL': 'late',     // Shell
  'BP': 'late',       // BP
  'TTE': 'late',      // TotalEnergies

  // 油服设备 (Oilfield Services)
  'SLB': 'late',      // Schlumberger
  'HAL': 'late',      // Halliburton
  'BKR': 'late',      // Baker Hughes
  'NOV': 'late',      // NOV Inc
  'LBRT': 'late',     // Liberty Energy
  'HP': 'late',       // Helmerich & Payne

  // E&P - 页岩油 (Shale E&P)
  'EOG': 'late',      // EOG Resources
  'PXD': 'late',      // Pioneer
  'FANG': 'late',     // Diamondback
  'DVN': 'late',      // Devon
  'COP': 'late',      // ConocoPhillips
  'OXY': 'late',      // Occidental

  // E&P - 国际 (International E&P)
  'HES': 'late',      // Hess
  'MRO': 'late',      // Marathon Oil
  'APA': 'late',      // APA Corp

  // 中游管道 (Midstream) - 相对稳定但仍是晚周期
  'WMB': 'late',      // Williams
  'KMI': 'late',      // Kinder Morgan
  'ET': 'late',       // Energy Transfer
  'EPD': 'late',      // Enterprise Products
  'MPLX': 'late',     // MPLX
  'OKE': 'late',      // ONEOK
  'TRGP': 'late',     // Targa Resources

  // 炼化 (Refining)
  'VLO': 'late',      // Valero
  'MPC': 'late',      // Marathon Petroleum
  'PSX': 'late',      // Phillips 66
  'DK': 'late',       // Delek
  'PBF': 'late',      // PBF Energy

  // 化工 (Chemicals) - 与油气周期相关
  'DOW': 'late',      // Dow
  'LYB': 'late',      // LyondellBasell
  'CE': 'late',       // Celanese
  'EMN': 'late',      // Eastman

  // 化肥
  'MOS': 'late',      // Mosaic
  'NTR': 'late',      // Nutrien
  'CF': 'late',       // CF Industries

  // 农产品
  'ADM': 'late',      // ADM
  'BG': 'late',       // Bunge

  // 黄金
  'GOLD': 'late',     // Barrick
  'NEM': 'late',      // Newmont

  // ========== 航运物流 (Late Cycle / Cyclical) ==========
  // 航运是强周期行业，与全球贸易、大宗商品价格高度相关
  // 集装箱航运
  'ZIM': 'late',      // 集装箱航运
  'MATX': 'late',     // Matson - 太平洋航线
  'MAERSK.B': 'mid',    // Maersk - 丹麦集装箱航运(参考)
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

  // ---------- 家居用品 (Household Products) ----------
  'PG': 'defensive',  // Procter & Gamble
  'CL': 'defensive',  // Colgate-Palmolive
  'KMB': 'defensive', // Kimberly-Clark
  'CHD': 'defensive', // Church & Dwight
  'CLX': 'defensive', // Clorox

  // ---------- 包装食品 (Packaged Food) ----------
  'GIS': 'defensive', // General Mills
  'K': 'defensive',   // Kellogg
  'KHC': 'defensive', // Kraft Heinz
  'HSY': 'defensive', // Hershey
  'CAG': 'defensive', // Conagra
  'CPB': 'defensive', // Campbell Soup
  'SJM': 'defensive', // J.M. Smucker
  'MDLZ': 'defensive', // Mondelez
  'HRL': 'defensive', // Hormel
  'TSN': 'mid',       // Tyson - 商品周期性

  // ---------- 饮料 (Beverages) ----------
  'KO': 'defensive',  // Coca-Cola
  'PEP': 'defensive', // PepsiCo
  'MNST': 'defensive', // Monster Beverage
  'CELH': 'mid',      // Celsius - 高成长
  'KDP': 'defensive', // Keurig Dr Pepper

  // ---------- 酒精饮料 (Alcoholic Beverages) ----------
  'STZ': 'defensive', // Constellation Brands
  'TAP': 'defensive', // Molson Coors
  'DEO': 'defensive', // Diageo
  'SAM': 'mid',       // Boston Beer - 高成长波动

  // ---------- 美妆 (Beauty) ----------
  'EL': 'mid',        // Estée Lauder - 旅游零售敏感
  'COTY': 'mid',      // Coty

  // ---------- 时尚/奢侈品牌 (Fashion) ----------
  'TPR': 'mid',       // Tapestry
  'CPRI': 'mid',      // Capri
  'PVH': 'mid',       // PVH
  'RL': 'mid',        // Ralph Lauren
  'VFC': 'mid',       // VF Corp
  'HBI': 'mid',       // Hanesbrands
  'LEVI': 'mid',      // Levi Strauss

  // ---------- 烟草 (Tobacco) ----------
  'PM': 'defensive',  // Philip Morris
  'MO': 'defensive',  // Altria
  'BTI': 'defensive', // British American Tobacco

  // ---------- 食品零售/分销 ----------
  'WMT': 'defensive', // Walmart
  'COST': 'defensive', // Costco
  'BJ': 'defensive',  // BJ's Wholesale Club
  'KR': 'defensive',  // Kroger
  'SYY': 'defensive', // Sysco
  'USFD': 'defensive', // US Foods

  // ---------- 折扣零售/百货 ----------
  'DG': 'defensive',  // Dollar General
  'DLTR': 'defensive', // Dollar Tree
  'M': 'mid',         // Macy's - 百货周期
  'KSS': 'mid',       // Kohl's - 百货周期
  'CHWY': 'defensive', // Chewy - 宠物必需品
  'PTON': 'early',    // Peloton - 可选消费

  // ---------- 公用事业 ----------
  'NEE': 'defensive', // 公用事业
  'DUK': 'defensive',
  'SO': 'defensive',
  'D': 'defensive',
  'AEP': 'defensive',

  // ---------- 电信 ----------
  'T': 'defensive',   // 电信
  'VZ': 'defensive',
  'TMUS': 'defensive',

  // 保险经纪 (已在上方定义)
  'AFL': 'defensive', // Aflac
  'LNC': 'defensive', // Lincoln National
  'PFG': 'defensive', // Principal

  // ========== 医疗健康 (Defensive) ==========
  // 大型制药 - 稳定现金流、专利保护
  'JNJ': 'defensive',   // Johnson & Johnson
  'PFE': 'defensive',   // Pfizer
  'MRK': 'defensive',   // Merck
  'ABBV': 'defensive',  // AbbVie
  'LLY': 'defensive',   // Eli Lilly
  'BMY': 'defensive',   // Bristol-Myers
  'AZN': 'defensive',   // AstraZeneca
  'NVS': 'defensive',   // Novartis
  'GSK': 'defensive',   // GSK
  'NVO': 'defensive',   // Novo Nordisk

  // 生物科技 - 略带成长属性但仍防御
  'AMGN': 'defensive',  // Amgen
  'GILD': 'defensive',  // Gilead
  'BIIB': 'defensive',  // Biogen
  'VRTX': 'defensive',  // Vertex
  'REGN': 'defensive',  // Regeneron
  'MRNA': 'mid',        // Moderna - 疫苗周期性
  'ALNY': 'defensive',  // Alnylam

  // 医疗器械 - 手术量与经济相关但需求刚性
  'MDT': 'defensive',   // Medtronic
  'ABT': 'defensive',   // Abbott
  'SYK': 'defensive',   // Stryker
  'BSX': 'defensive',   // Boston Scientific
  'ISRG': 'defensive',  // Intuitive Surgical
  'EW': 'defensive',    // Edwards Lifesciences
  'ZBH': 'defensive',   // Zimmer Biomet
  'BDX': 'defensive',   // Becton Dickinson

  // 医疗保险/管理式医疗
  'UNH': 'defensive',   // UnitedHealth
  'ELV': 'defensive',   // Elevance
  'HUM': 'defensive',   // Humana
  'CI': 'defensive',    // Cigna
  'CNC': 'defensive',   // Centene

  // 药品分销
  'MCK': 'defensive',   // McKesson
  'ABC': 'defensive',   // AmerisourceBergen
  'CAH': 'defensive',   // Cardinal Health

  // 药房零售
  'CVS': 'defensive',   // CVS Health
  'WBA': 'defensive',   // Walgreens

  // 医院系统 - 略带周期性
  'HCA': 'mid',         // HCA Healthcare
  'THC': 'mid',         // Tenet
  'UHS': 'mid',         // Universal Health

  // 生命科学工具 - 研发支出驱动
  'TMO': 'mid',         // Thermo Fisher
  'DHR': 'mid',         // Danaher
  'A': 'mid',           // Agilent
  'IQV': 'mid',         // IQVIA
  'CRL': 'mid',         // Charles River Labs
  'WAT': 'mid',         // Waters

  // 动物健康 - 防御性
  'ZTS': 'defensive',   // Zoetis
  'IDXX': 'defensive',  // IDEXX
  // ---------- 半导体设备 - 补充 ----------
  'ENTG': 'mid',
  'ONTO': 'mid',
  'ACMR': 'mid',
  'MKSI': 'mid',
  'CAMT': 'mid',
  'COHU': 'mid',
  'ICHR': 'mid',
  'UCTT': 'mid',
  'FORM': 'mid',
  'KLIC': 'mid',
  'TOELY': 'mid',
  'AEHR': 'mid',
  // ---------- Fabless/IDM/Foundry - 补充 ----------
  'TXN': 'mid',
  'ADI': 'mid',
  'MXIM': 'mid',
  'WOLF': 'mid',
  'MPWR': 'mid',
  'MCHP': 'mid',
  'LSCC': 'mid',
  'SMTC': 'mid',
  'ALGM': 'mid',
  'UMC': 'mid',
  'GFS': 'mid',
  'STX': 'mid',
  // ---------- 航空工业 - 补充 ----------
  'EADSY': 'mid',
  'ERJ': 'mid',
  'SAFRY': 'mid',
  'RR': 'mid',
  'SPR': 'mid',
  'HXL': 'mid',
  'WWD': 'mid',
  'AAR': 'mid',
  'AIR': 'mid',
  'VSEC': 'defensive',
  'AER': 'mid',
  'AL': 'mid',
  'FLY': 'mid',
  // ---------- 低成本航空 - 补充 ----------
  'JBLU': 'early',
  'ALK': 'early',
  'SAVE': 'early',
  'ULCC': 'early',
  // ---------- 汽车 - 补充 ----------
  'STLA': 'early',
  'TM': 'early',
  'HMC': 'early',
  'FSR': 'early',
  'NIO': 'early',
  'XPEV': 'early',
  'LI': 'early',
  'VC': 'early',
  'ADNT': 'early',
  'DAN': 'early',
  'MOD': 'early',
  'AXL': 'early',
  'THRM': 'early',
  'GPI': 'early',
  'SAH': 'early',
  'ABG': 'early',
  'CAR': 'early',
  'HTZ': 'early',
  // ---------- EV电池 - 补充 ----------
  'LTHM': 'mid',
  'LAC': 'mid',
  'PLL': 'mid',
  'QS': 'mid',
  // ---------- 运输 - 补充 ----------
  'CP': 'mid',
  'CNI': 'mid',
  'ODFL': 'mid',
  'SAIA': 'mid',
  'KNX': 'mid',
  'KEX': 'mid',
  'GLNG': 'late',
  // ---------- 农业 - 补充 ----------
  'CTVA': 'mid',
  'FMC': 'mid',
  'INGR': 'defensive',
  // ---------- 矿业/资源 - 补充 ----------
  'CENX': 'late',
  'TECK': 'late',
  'SUM': 'mid',
  // ---------- 油气服务 - 补充 ----------
  'FTI': 'late',
  'CHX': 'late',
  'PTEN': 'late',
  'WFRD': 'late',
  'HFC': 'late',
  // ---------- 医药/生物 - 补充 ----------
  'SNY': 'defensive',
  'SGEN': 'defensive',
  'INCY': 'defensive',
  'BMRN': 'defensive',
  'EXEL': 'defensive',
  'SRPT': 'defensive',
  'TEVA': 'defensive',
  'VTRS': 'defensive',
  'PRGO': 'defensive',
  'CYH': 'mid',
  'RAD': 'defensive',
  'DXCM': 'defensive',
  // ---------- 金融 - 补充 ----------
  'BEN': 'mid',
  'IVZ': 'mid',
  'OWL': 'mid',
  'FDS': 'defensive',
  'MORN': 'defensive',
  'TRI': 'defensive',
  'ADYEY': 'mid',
  // ---------- 基础设施REIT - 补充 ----------
  'AMT': 'defensive',
  'CCI': 'defensive',
  'SBAC': 'defensive',
  // ---------- 工程/建筑 - 补充 ----------
  'FLR': 'mid',
  'KBR': 'defensive',
  // ---------- 旅游/零售 - 补充 ----------
  'TRIP': 'early',
  'MTH': 'early',
  'IHG': 'early',
  'EBAY': 'mid',
  'ETSY': 'early',
  'TJX': 'mid',
  'ROST': 'mid',
  'WEN': 'defensive',
  'LYFT': 'early',
  // ---------- 环保服务 - 补充 ----------
  'CWST': 'defensive',
  'ECOL': 'mid',
  // ---------- 人力资源 - 补充 ----------
  'RHI': 'early',
  'MAN': 'early',
  'ASGN': 'early',
  'NSP': 'mid',
  'CTAS': 'defensive',
  // ---------- 教育 - 补充 ----------
  'LOPE': 'defensive',
  'STRA': 'defensive',
  'DUOL': 'mid',
  'CHGG': 'mid',
  // ---------- 房地产服务 - 补充 ----------
  'CBRE': 'early',
  'JLL': 'early',
  'ZG': 'early',
  'RDFN': 'early',
  // ---------- 贵金属 - 补充 ----------
  'AEM': 'late',
  'WPM': 'late',
  'FNV': 'late',
  // ---------- EV充电 - 补充 ----------
  'CHPT': 'mid',
  'EVGO': 'mid',
  'BLNK': 'mid',
  // ---------- 数据中心基础设施 - 补充 ----------
  'VRT': 'mid',
  'PWSC': 'defensive',
  // ---------- 消费品牌 - 补充 ----------
  'NKE': 'mid',        // Nike - 品牌消费
  'LULU': 'mid',       // Lululemon - 品牌消费
  'UAA': 'early',      // Under Armour - 周期性更强
  'DKS': 'early',      // Dick's - 零售周期
  'FL': 'early',       // Foot Locker - 零售周期
  'TGT': 'mid',        // Target - 大型零售
  'ADDYY': 'mid',      // Adidas - 品牌消费
  'DPZ': 'mid',        // Domino's - 快餐
  // ---------- 科技/互联网 - 补充 ----------
  'SNAP': 'early',     // Snapchat - 广告周期
  'PINS': 'early',     // Pinterest - 广告周期
  'ROKU': 'early',     // Roku - 广告+消费
  'RDDT': 'early',     // Reddit - 早期
  'ZM': 'mid',         // Zoom - 企业IT
  'U': 'mid',          // Unity - 游戏引擎(中周期)
  'ATVI': 'defensive', // Activision - 游戏防御
  'DOCU': 'mid',       // DocuSign - 企业SaaS
  'SPLK': 'mid',       // Splunk - 企业分析
  'S': 'mid',          // SentinelOne - 安全
  // ---------- 金融科技 - 补充 ----------
  'COIN': 'early',     // Coinbase - 加密高波动
  'HOOD': 'early',     // Robinhood - 零售交易
  'AFRM': 'early',     // Affirm - BNPL周期
  'SOFI': 'early',     // SoFi - 金融科技
  'NU': 'early',       // Nu Holdings - 新兴市场
  'IBKR': 'mid',       // Interactive Brokers
  'ALLY': 'early',     // Ally Financial - 汽车贷
  // ---------- 出行/外卖 - 补充 ----------
  'UBER': 'mid',       // Uber - 平台经济
  'DASH': 'mid',       // DoorDash - 外卖平台
  // ---------- 医疗/数字健康 - 补充 ----------
  'HIMS': 'early',     // Hims & Hers
  'TDOC': 'mid',       // Teladoc
  // ---------- 酒店 - 补充 ----------
  'H': 'early',        // Hyatt - 酒店
  // ---------- 矿业 - 补充 ----------
  'SQM': 'mid',        // SQM - 锂矿
  // ---------- 托管银行/化工 - 补充 ----------
  'BK': 'mid',         // Bank of New York Mellon - 托管
  'STT': 'mid',        // State Street - 托管
  'DD': 'mid',         // DuPont - 特种化工
  // ---------- 缺失S&P 500 - 补充 ----------
  'SAP': 'defensive',  // SAP - 企业ERP粘性极高
  'INTU': 'defensive', // Intuit - 税务/会计刚需
  'ADP': 'defensive',  // ADP - 薪资刚需服务
  'ADSK': 'mid',       // Autodesk - 建筑/制造周期
  'GEHC': 'defensive', // GE HealthCare - 医疗刚需
  'HOLX': 'defensive', // Hologic - 医疗诊断
  'URI': 'early',      // United Rentals - 建设周期
  'SWK': 'mid',        // Stanley Black & Decker
  'IR': 'mid',         // Ingersoll Rand - 工业设备
  'DOV': 'mid',        // Dover - 多元工业
  'XYL': 'late',       // Xylem - 水基础设施/政策驱动
  'OTIS': 'defensive', // Otis - 服务收入高占比
  'CARR': 'mid',       // Carrier - 建筑周期
  'DECK': 'mid',       // Deckers - 消费可选
  'AES': 'defensive',  // AES - 发电合约
  'WEC': 'defensive',  // WEC Energy - 受管制
  'ES': 'defensive',   // Eversource - 受管制
  'ED': 'defensive',   // Con Edison - 受管制
  'DTE': 'defensive',  // DTE Energy - 受管制
  'AEE': 'defensive',  // Ameren - 受管制
  'CMS': 'defensive',  // CMS Energy - 受管制
  'ARE': 'late',       // Alexandria - 生物科技REIT
  // ---------- 工业/建筑 - 补充 ----------
  'HRI': 'early',      // Herc Holdings - 设备租赁周期
  'WTS': 'mid',        // Watts Water - 水基础设施
  'TT': 'mid',         // Trane Technologies - 建筑HVAC
  'LII': 'mid',        // Lennox - HVAC周期
  'GGG': 'mid',        // Graco - 流体处理
  'ROP': 'defensive',  // Roper - 利基软件+工业

  // ---------- 补充: 医疗健康 ----------
  'ALGN': 'mid',       // Align Technology - 牙科消费医疗
  'PODD': 'defensive', // Insulet - 胰岛素泵刚需
  'TECH': 'mid',       // Bio-Techne - 生命科学试剂

  // ---------- 补充: 金融服务 ----------
  'MKTX': 'mid',       // MarketAxess - 债券交易量周期

  // ---------- 补充: 科技 ----------
  'PTC': 'mid',        // PTC - 工业设计软件
  'MANH': 'defensive', // Manhattan Associates - 供应链刚需
  'PAYC': 'defensive', // Paycom - 工资单刚需

  // ---------- 补充: 消费/零售 ----------
  'FIVE': 'early',     // Five Below - 消费信心敏感

  // ---------- 补充: 工业 ----------
  'NDSN': 'mid',       // Nordson - 制造业周期
  'FTV': 'mid',        // Fortive - 工业仪器周期
  'AME': 'mid',        // AMETEK - 电子仪器周期

  // ---------- 补充: 能源/材料 ----------
  'OVV': 'late',       // Ovintiv - 油气晚周期
  'CTRA': 'late',      // Coterra - 油气晚周期
  'RPM': 'mid',        // RPM International - 建筑涂料周期

  // ---------- 补充: 30只新增股票 ----------

  // 汽车后市场
  'CPRT': 'defensive', // Copart - 保险理赔刚需(事故量稳定)

  // 医药包装/灭菌
  'WST': 'defensive',  // West Pharmaceutical - 注射剂包装刚需
  'STE': 'defensive',  // STERIS - 医院灭菌刚需

  // 生命科学工具
  'ILMN': 'mid',       // Illumina - 基因测序设备capex

  // 包装
  'SEE': 'mid',        // Sealed Air - 工业/食品包装周期

  // 电力设备
  'GNRC': 'mid',       // Generac - 住宅建设/极端天气

  // 特种工业
  'IEX': 'mid',        // IDEX - 工业生产周期
  'RBC': 'mid',        // Regal Rexnord - 制造业周期
  'LECO': 'mid',       // Lincoln Electric - 制造业capex周期
  'TTC': 'mid',        // Toro - 住宅/商用景观

  // 科技仪器/测试
  'TRMB': 'mid',       // Trimble - 建筑/农业周期
  'TDY': 'mid',        // Teledyne - 工业/国防仪器
  'ZBRA': 'mid',       // Zebra Technologies - 企业IT支出
  'KEYS': 'mid',       // Keysight - 5G/半导体测试capex
  'GRMN': 'mid',       // Garmin - 消费电子周期

  // 半导体设备
  'BRKS': 'mid',       // Brooks Automation - 半导体设备周期
  'ACLS': 'mid',       // Axcelis - 半导体设备周期

  // 金融数据/基础设施
  'FICO': 'defensive', // Fair Isaac - 信用评分刚需
  'BR': 'defensive',   // Broadridge - 合规通讯刚需
  'RJF': 'mid',        // Raymond James - 市场周期
  'VIRT': 'early',     // Virtu Financial - 波动率受益
  'TW': 'mid',         // Tradeweb - 债券交易量

  // 商业信息/SaaS
  'CSGP': 'mid',       // CoStar - 商业地产交易周期
  'AZPN': 'mid',       // Aspen Technology - 化工/能源capex

  // IT 服务
  'GLOB': 'mid',       // Globant - 企业IT支出

  // 国防/政府IT
  'BAH': 'defensive',  // Booz Allen - 政府预算稳定
  'LDOS': 'defensive', // Leidos - 政府合同稳定
  'AXON': 'defensive', // Axon - 执法预算刚需

  // 金属/材料
  'ATI': 'late',       // ATI - 航空/能源晚周期

  // 工业分销
  'WCC': 'mid',        // WESCO - 建设/工业周期

  // ========== 新增30只 (2026-01补充) ==========

  // 生物科技/诊断
  'BNTX': 'mid',       // BioNTech - 疫苗周期性
  'RARE': 'defensive', // Ultragenyx - 罕见病刚需
  'IONS': 'defensive', // Ionis - RNA疗法管线
  'EXAS': 'defensive', // Exact Sciences - 癌症筛查刚需
  'NTRA': 'defensive', // Natera - 基因检测刚需
  'TXG': 'mid',        // 10x Genomics - 研究预算周期

  // 消费/餐饮
  'RVLV': 'early',     // Revolve - 非必需消费
  'CAVA': 'early',     // CAVA - 餐饮消费信心
  'BUD': 'defensive',  // AB InBev - 啤酒防御性

  // 博彩/娱乐
  'DKNG': 'early',     // DraftKings - 消费娱乐支出
  'CZR': 'early',      // Caesars - 消费/旅游周期
  'MGM': 'early',      // MGM - 旅游/会议周期
  'WYNN': 'early',     // Wynn - 高端消费/澳门
  'PENN': 'early',     // Penn - 区域博彩消费

  // 运输物流
  'GXO': 'mid',        // GXO - 物流外包/电商量
  'HUBG': 'mid',       // Hub Group - 货运量周期
  'WERN': 'mid',       // Werner - 整车运输周期

  // REITs
  'HST': 'early',      // Host Hotels - 旅游/商旅周期
  'PK': 'early',       // Park Hotels - 酒店入住率
  'SLG': 'mid',        // SL Green - 办公租赁周期
  'KIM': 'mid',        // Kimco - 零售租赁
  'CUBE': 'late',      // CubeSmart - 住宅流动性/搬家

  // 地区银行
  'ZION': 'early',     // Zions - 利率/信贷周期
  'NTRS': 'mid',       // Northern Trust - AUM/市场周期
  'CMA': 'early',      // Comerica - 商业贷款/利率

  // 太阳能
  'NOVA': 'mid',       // Sunnova - 利率/政策敏感
  'ARRY': 'mid',       // Array - 公用事业光伏capex
  'SPWR': 'mid',       // SunPower - 住宅光伏利率敏感

  // 建材
  'TREX': 'early',     // Trex - 住宅翻新/新建
  'MAS': 'early',      // Masco - 住宅装修周期

  // ========== 2026-01 新增30只 ==========

  // 网络安全 (Cybersecurity) - 防御性,IT预算驱动
  'CYBR': 'defensive',  // CyberArk - 身份安全刚需
  'TENB': 'defensive',  // Tenable - 漏洞管理刚需
  'QLYS': 'defensive',  // Qualys - 合规安全刚需
  'VRNS': 'defensive',  // Varonis - 数据安全
  'RPD': 'defensive',   // Rapid7 - 威胁检测

  // HCM/SaaS - IT支出中周期
  'PCTY': 'mid',        // Paylocity - HCM/薪资
  'TWLO': 'mid',        // Twilio - 通信平台
  'IOT': 'mid',         // Samsara - IoT车队
  'CFLT': 'mid',        // Confluent - 数据流
  'DT': 'mid',          // Dynatrace - 可观测性
  'GTLB': 'mid',        // GitLab - DevSecOps
  'TOST': 'mid',        // Toast - 餐饮SaaS

  // 医疗服务 - 防御性/刚需
  'DVA': 'defensive',   // DaVita - 透析刚需
  'ENSG': 'defensive',  // Ensign - 护理刚需
  'ACHC': 'defensive',  // Acadia - 行为健康刚需
  'DOCS': 'defensive',  // Doximity - 医生网络
  'SGRY': 'defensive',  // Surgery Partners - 门诊手术
  'AMED': 'defensive',  // Amedisys - 居家护理

  // 材料/矿业 - 中/晚周期
  'CCJ': 'mid',         // Cameco - 铀矿/核能周期
  'MP': 'mid',          // MP Materials - 稀土/EV周期

  // 国防 - 防御性(政府支出驱动)
  'KTOS': 'defensive',  // Kratos - 国防无人机
  'BWXT': 'defensive',  // BWX Tech - 核推进/国防
  'RKLB': 'mid',        // Rocket Lab - 太空发射(成长期)

  // 消费零售
  'GPC': 'late',        // Genuine Parts - 后周期汽配
  'TSCO': 'defensive',  // Tractor Supply - 农村刚需

  // 食品 - 防御性
  'DAR': 'mid',         // Darling - 可再生柴油周期
  'CALM': 'defensive',  // Cal-Maine - 鸡蛋刚需
  'POST': 'defensive',  // Post Holdings - 包装食品
  'FLO': 'defensive',   // Flowers Foods - 面包刚需
  'SFM': 'defensive',   // Sprouts - 有机超市

  // ---------- 补充: 第四批30只 ----------

  // 天然气E&P - 高周期性(气价驱动)
  'EQT': 'late',        // EQT - 美国最大天然气生产商
  'RRC': 'late',        // Range Resources - 阿巴拉契亚天然气
  'AR': 'late',         // Antero Resources - 天然气/NGL
  'SWN': 'late',        // Southwestern Energy - 天然气

  // Permian E&P - 高周期性(油价驱动)
  'MTDR': 'late',       // Matador Resources - Permian
  'PR': 'late',         // Permian Resources - Permian成长型
  'MGY': 'late',        // Magnolia Oil & Gas - Eagle Ford

  // 特种制药 - 相对防御
  'JAZZ': 'defensive',  // Jazz Pharmaceuticals - 专利药
  'UTHR': 'defensive',  // United Therapeutics - 肺动脉高压
  'NBIX': 'defensive',  // Neurocrine - 运动障碍
  'PCVX': 'early',      // Vaxcyte - 临床阶段(资本市场敏感)

  // 电气/工业 - 中周期
  'HUBB': 'mid',        // Hubbell - 电网/公用事业capex
  'FIX': 'mid',         // Comfort Systems - 商业建筑周期
  'AIT': 'mid',         // Applied Industrial - 工业MRO
  'ALLE': 'mid',        // Allegion - 商业/住宅建筑
  'WLK': 'early',       // Westlake Chemical - 化工强周期

  // 特种服务
  'SCI': 'defensive',   // Service Corp - 殡葬(人口老龄化)

  // REITs - 利率敏感中周期
  'IRM': 'mid',         // Iron Mountain - 数据中心/档案
  'LAMR': 'mid',        // Lamar - 户外广告(广告支出周期)
  'OUT': 'mid',         // Outfront - 户外广告
  'CPT': 'mid',         // Camden - 公寓(住房周期)
  'AMH': 'mid',         // American Homes - 独栋租赁
  'REG': 'mid',         // Regency Centers - 零售REIT
  'FR': 'mid',          // First Industrial - 工业REIT
  'PEAK': 'mid',        // Healthpeak - 医疗REIT

  // 卡车租赁
  'R': 'mid',            // Ryder - 卡车租赁/车队管理

  // 特种零售
  'JWN': 'early',       // Nordstrom - 高端消费周期
  'BOOT': 'early',      // Boot Barn - 消费可选
  'BURL': 'mid',        // Burlington - 折扣零售(相对防御)

  // 新增30只 - 消费/医疗/金融科技/工业/材料/媒体
  'MKC': 'defensive',   // McCormick - 调味品(必需消费)
  'MOH': 'defensive',   // Molina - Medicaid管理(防御)
  'BAX': 'mid',         // Baxter - 医疗产品
  'SNA': 'mid',         // Snap-on - 专业工具
  'WPC': 'defensive',   // W.P. Carey - 净租赁REIT
  'SRE': 'defensive',   // Sempra - 公用事业
  'MTCH': 'mid',        // Match Group - 约会平台
  'GDDY': 'mid',        // GoDaddy - 域名/托管
  'AKAM': 'mid',        // Akamai - CDN/安全
  'GEN': 'mid',         // Gen Digital - 消费安全
  'PATH': 'early',      // UiPath - RPA/自动化(早期成长)
  'AOS': 'mid',         // A.O. Smith - 热水器
  'LSTR': 'mid',        // Landstar - 轻资产卡车
  'RXO': 'mid',         // RXO - 卡车经纪
  'SEIC': 'mid',        // SEI Investments - 投资管理
  'SON': 'mid',         // Sonoco - 包装
  'BLL': 'mid',         // Ball Corp - 铝罐包装
  'EXP': 'early',       // Eagle Materials - 石膏/水泥(早周期)
  'LYV': 'mid',         // Live Nation - 现场娱乐
  'PAYX': 'defensive',  // Paychex - 薪资(防御型SaaS)
  'JKHY': 'defensive',  // Jack Henry - 银行核心(防御)
  'WEX': 'mid',         // WEX - 支付处理
  'CNH': 'early',       // CNH Industrial - 农机(早周期)
  'JCI': 'mid',         // Johnson Controls - 楼宇自动化
  'AAON': 'mid',        // AAON - 商用HVAC
  'CRUS': 'early',      // Cirrus Logic - 模拟半导体(早周期)
  'MTSI': 'early',      // MACOM - RF半导体(早周期)
  'NYT': 'defensive',   // NYT - 数字订阅(防御)
  'SHAK': 'mid',        // Shake Shack - 快休闲
  'ERIE': 'defensive',  // Erie Indemnity - 财产险(防御)
  'TXRH': 'mid',        // Texas Roadhouse - 休闲牛排(中周期)
  'EAT': 'mid',         // Brinker - Chili's(中周期)
  'PLAY': 'mid',        // Dave & Buster's - 娱乐餐饮(中周期)
  'ESS': 'defensive',   // Essex Property - 公寓REIT(防御)
  'UDR': 'defensive',   // UDR - 公寓REIT(防御)
  'SUI': 'mid',         // Sun Communities - 制造房/RV(中周期)
  'APPN': 'early',      // Appian - 低代码(早期)
  'BRZE': 'early',      // Braze - 客户互动(早期)
  'DOCN': 'mid',        // DigitalOcean - 开发者云(中周期)
  'ZI': 'mid',          // ZoomInfo - B2B数据(中周期)
  'ESTC': 'mid',        // Elastic - 搜索/可观测(中周期)
  'CRDO': 'early',      // Credo Technology - 高速互连(早周期)
  'WRB': 'defensive',   // W.R. Berkley - 专业财险(防御)
  'RNR': 'defensive',   // RenaissanceRe - 再保险(防御)
  'ACGL': 'defensive',  // Arch Capital - 再保险(防御)
  'AFG': 'defensive',   // American Financial - 专业险(防御)
  'GMS': 'mid',         // GMS - 建材分销(中周期)
  'BECN': 'mid',        // Beacon - 屋顶分销(中周期)
  'FND': 'mid',         // Floor & Decor - 地板(中周期)
  'AWI': 'mid',         // Armstrong World - 天花(中周期)
  'DGX': 'defensive',   // Quest Diagnostics - 检验(防御)
  'LH': 'defensive',    // Labcorp - 检验(防御)
  'SAIC': 'defensive',  // SAIC - 政府IT(防御)
  'CACI': 'defensive',  // CACI - 国防IT(防御)
  'DIOD': 'early',      // Diodes - 模拟/分立(早周期)
  'VSH': 'early',       // Vishay - 被动元件(早周期)
  'AVNT': 'mid',        // Avient - 特种聚合物(中周期)
  'OLN': 'mid',         // Olin - 氯碱化工(中周期)
  'PFGC': 'mid',        // Performance Food - 餐饮配送(中周期)
  'CACC': 'early',      // Credit Acceptance - 次贷汽车(早周期)
  'CASY': 'defensive',  // Casey's General Stores - 便利店(防御)
  'TPX': 'mid',         // Tempur-Sealy - 床垫(中周期)
  'LEG': 'mid',         // Leggett & Platt - 家具组件(中周期)
  'DNUT': 'mid',        // Krispy Kreme - 甜甜圈(中周期)
  'EPRT': 'defensive',  // Essential Properties - 净租赁REIT(防御)
  'ADC': 'defensive',   // Agree Realty - 净租赁REIT(防御)
  'COLD': 'defensive',  // Americold - 冷链仓储REIT(防御)
  'WAL': 'mid',         // Western Alliance - 成长型银行(中周期)
  'EWBC': 'mid',        // East West Bancorp - 亚裔银行(中周期)
  'ONB': 'mid',         // Old National - 中西部银行(中周期)
  'PNFP': 'mid',        // Pinnacle Financial - 东南部银行(中周期)
  'OZK': 'mid',         // Bank OZK - 建筑贷款(中周期)
  'GH': 'early',        // Guardant Health - 液体活检(早周期)
  'TFX': 'mid',         // Teleflex - 特种医疗器械(中周期)
  'XRAY': 'mid',        // Dentsply Sirona - 牙科设备(中周期)
  'DTM': 'mid',         // DT Midstream - 天然气中游(中周期)
  'AM': 'mid',          // Antero Midstream - 气体采集(中周期)
  'WES': 'mid',         // Western Midstream - 气体加工(中周期)
  'DINO': 'early',      // HF Sinclair - 炼油(早周期)
  'FOUR': 'mid',        // Shift4 Payments - 综合支付(中周期)
  'RPAY': 'mid',        // Repay Holdings - 支付方案(中周期)
  'FELE': 'mid',        // Franklin Electric - 泵送系统(中周期)
  'CW': 'defensive',    // Curtiss-Wright - 国防/核电(防御)
  'HAYW': 'mid',        // Hayward - 泳池/户外(中周期)
  'IRDM': 'defensive',  // Iridium - 卫星通信(防御)
  'COKE': 'defensive',  // Coca-Cola Consolidated - 可乐瓶装(防御)
  'FRPT': 'mid',        // Freshpet - 鲜粮宠物食品(中周期)
  'FNB': 'mid',         // F.N.B. Corp - 中大西洋银行(中周期)
  'NVST': 'mid',        // Envista Holdings - 牙科产品(中周期)
  'EGP': 'defensive',   // EastGroup - 阳光带工业REIT(防御)
  'OLLI': 'defensive',  // Ollie's - 尾货折扣零售(防御)
  'MEDP': 'defensive',  // Medpace - 中型CRO(防御)
  'ICLR': 'defensive',  // Icon PLC - 全球CRO(防御)
  'BMBL': 'mid',        // Bumble - 约会社交(中周期)
  'NOVT': 'mid',        // Novanta - 精密光子/医疗(中周期)
  'COHR': 'early',      // Coherent - 光学/激光/SiC(早周期)
  'CWK': 'mid',         // Cushman & Wakefield - 商业地产服务(中周期)
  'KNSL': 'mid',        // Kinsale Capital - E&S保险(中周期)
  'RYAN': 'mid',        // Ryan Specialty - 保险批发(中周期)
  'RIG': 'early',       // Transocean - 深水钻井(早周期)
  'VAL': 'early',       // Valaris - 海上钻井(早周期)
  'NBR': 'early',       // Nabors - 钻井服务(早周期)
  'DOOR': 'mid',        // Masonite - 门类产品(中周期)
  'JELD': 'mid',        // JELD-WEN - 窗/门(中周期)
  'BF.B': 'defensive',  // Brown-Forman - 烈酒(防御)
  'NTNX': 'mid',        // Nutanix - 混合云(中周期)
  'WIX': 'mid',         // Wix - 网站建设(中周期)
  'SQSP': 'mid',        // Squarespace - 网站/电商(中周期)
  'HAS': 'mid',         // Hasbro - 玩具/游戏(中周期)
  'MAT': 'mid',         // Mattel - 玩具(中周期)
  'CROX': 'mid',        // Crocs - 休闲鞋(中周期)
  'ONON': 'mid',        // On Holding - 跑步鞋(中周期)
  'CHRD': 'early',      // Chord Energy - Bakken页岩(早周期)
  'FBP': 'mid',         // First BanCorp - 波多黎各银行(中周期)
  'GRND': 'mid',        // Grindr - LGBTQ+约会(中周期)
  'IAC': 'mid',         // IAC - 数字媒体(中周期)
  'YELP': 'mid',        // Yelp - 本地广告(中周期)
  'OPEN': 'early',      // Opendoor - iBuying(早周期)
  'LUNR': 'early',      // Intuitive Machines - 月球着陆器(早周期)
  'ASTS': 'early',      // AST SpaceMobile - 直连卫星(早周期)

  // ========== 新增30只: advisory banks, office REITs, E&P, DTC brands, consulting ==========
  'SKX': 'mid',          // Skechers - 休闲运动鞋(中周期)
  'ASAN': 'early',       // Asana - 工作管理SaaS(早周期)
  'BOX': 'mid',          // Box - 云内容管理(中周期)
  'WMS': 'mid',          // Advanced Drainage - 排水/基建(中周期)
  'ATKR': 'early',       // Atkore - 电气管道(早周期)
  'SPXC': 'mid',         // SPX Technologies - HVAC/检测(中周期)
  'OSCR': 'defensive',   // Oscar Health - 科技健康险(防御)
  'LAZ': 'mid',          // Lazard - 咨询/资管(中周期)
  'PIPR': 'mid',         // Piper Sandler - 中市场投行(中周期)
  'EVR': 'mid',          // Evercore - 精英咨询投行(中周期)
  'HLI': 'mid',          // Houlihan Lokey - 重组/M&A(中周期)
  'PJT': 'mid',          // PJT Partners - 战略咨询(中周期)
  'SM': 'early',         // SM Energy - Permian/Eagle Ford(早周期)
  'NOG': 'early',        // Northern Oil & Gas - 非运营E&P(早周期)
  'KRC': 'mid',          // Kilroy Realty - 西海岸办公REIT(中周期)
  'DEI': 'mid',          // Douglas Emmett - LA办公REIT(中周期)
  'HIW': 'mid',          // Highwoods - 阳光带办公REIT(中周期)
  'VRTS': 'mid',         // Virtus - 多精品资管(中周期)
  'STEP': 'mid',         // StepStone - 私募市场(中周期)
  'ALGT': 'early',       // Allegiant - 超低成本航空(早周期)
  'INMD': 'mid',         // InMode - 微创美容器械(中周期)
  'HALO': 'mid',         // Halozyme - ENHANZE药物递送(中周期)
  'SITE': 'mid',         // SiteOne - 景观材料分销(中周期)
  'EXPO': 'defensive',   // Exponent - 工程/科学咨询(防御)
  'WIRE': 'early',       // Encore Wire - 铜线/电缆(早周期)
  'WRBY': 'mid',         // Warby Parker - DTC眼镜(中周期)
  'FIGS': 'mid',         // FIGS - 医疗服装DTC(中周期)
  'BROS': 'mid',         // Dutch Bros - 驾车咖啡(中周期)
  'ACAD': 'mid',         // Acadia Pharma - CNS特药(中周期)
  'DBI': 'mid',          // Designer Brands - DSW鞋类零售(中周期)

  // ========== 新增50家公司周期位置 ==========
  'NYCB': 'mid',          // NY Community Bancorp - 地区银行(中周期)
  'VLY': 'mid',           // Valley National - 地区银行(中周期)
  'FHN': 'mid',           // First Horizon - 地区银行(中周期)
  'SNV': 'mid',           // Synovus - 地区银行(中周期)
  'HWC': 'mid',           // Hancock Whitney - 地区银行(中周期)
  'WBS': 'mid',           // Webster Financial - 地区银行(中周期)
  'COLB': 'mid',          // Columbia Banking - 地区银行(中周期)
  'SMAR': 'mid',          // Smartsheet - 工作管理SaaS(中周期)
  'MQ': 'mid',            // Marqeta - 卡发行平台(中周期)
  'DSGX': 'mid',          // Descartes - 物流IT(中周期)
  'TWKS': 'mid',          // Thoughtworks - 技术咨询(中周期)
  'CERT': 'mid',          // Certara - 生物模拟SaaS(中周期)
  'FLT': 'mid',           // FLEETCOR/Corpay - 商业支付(中周期)
  'ELF': 'mid',           // e.l.f. Beauty - 平价美妆(中周期)
  'BBWI': 'mid',          // Bath & Body Works - 个护零售(中周期)
  'DDS': 'mid',           // Dillard's - 百货(中周期)
  'GOOS': 'mid',          // Canada Goose - 奢侈外衣(中周期)
  'SMPL': 'defensive',    // Simply Good Foods - 营养食品(防御)
  'NWSA': 'mid',          // News Corp - 数字媒体(中周期)
  'TRUP': 'mid',          // Trupanion - 宠物保险(中周期)
  'TKO': 'mid',           // TKO Group - UFC/WWE(中周期)
  'EDR': 'mid',           // Endeavor Group - 体育娱乐(中周期)
  'SIX': 'mid',           // Six Flags - 主题公园(中周期)
  'SEAS': 'mid',          // SeaWorld - 海洋公园(中周期)
  'FRT': 'defensive',     // Federal Realty - 优质零售REIT(防御)
  'BRX': 'defensive',     // Brixmor - 零售REIT(防御)
  'NSA': 'defensive',     // National Storage - 仓储REIT(防御)
  'ESNT': 'mid',          // Essent - 按揭保险(中周期)
  'NMIH': 'mid',          // NMI Holdings - 按揭保险(中周期)
  'RDN': 'mid',           // Radian - 按揭/产权(中周期)
  'MTG': 'mid',           // MGIC - 按揭保险(中周期)
  'SLM': 'mid',           // Sallie Mae - 学生贷款(中周期)
  'GFL': 'defensive',     // GFL Environmental - 废弃物(防御)
  'SRCL': 'defensive',    // Stericycle - 医疗废弃物(防御)
  'LEGN': 'early',        // Legend Biotech - BCMA细胞疗法(早周期)
  'BCRX': 'early',        // BioCryst - 罕见病(早周期)
  'BEAM': 'early',        // Beam Therapeutics - 碱基编辑(早周期)
  'FOLD': 'early',        // Amicus - Fabry病(早周期)
  'ARVN': 'early',        // Arvinas - 蛋白质降解(早周期)
  'KURA': 'early',        // Kura Oncology - menin抑制(早周期)
  'IMVT': 'early',        // Immunovant - FcRn抗体(早周期)
  'CSWI': 'mid',          // CSW Industrials - 特种工业(中周期)
  'RRX': 'mid',           // Regal Rexnord - 动力传动(中周期)
  'ESE': 'mid',           // ESCO Technologies - 公用事业方案(中周期)
  'MWA': 'mid',           // Mueller Water - 水基础设施(中周期)
  'LNN': 'mid',           // Lindsay Corp - 灌溉/基建(中周期)
  'FSS': 'mid',           // Federal Signal - 安全/清洁(中周期)
  'TALO': 'early',        // Talos Energy - 墨西哥湾E&P(早周期)
  'CRK': 'early',         // Comstock Resources - Haynesville天然气(早周期)
  'SD': 'early',          // SandRidge Energy - 中大陆E&P(早周期)
  'SFNC': 'mid',          // Simmons First - 中南部银行(中周期)
  'SBCF': 'mid',          // Seacoast Banking - 佛州银行(中周期)
  'FFIN': 'mid',          // First Financial - 德州银行(中周期)
  'AX': 'mid',            // Axos Financial - 数字银行(中周期)
  'CALX': 'mid',          // Calix - 宽带接入平台(中周期)
  'IESC': 'mid',          // IES Holdings - 电气/机械承包(中周期)
  'ADBE': 'late',          // Adobe - 创意软件(晚周期)
  'BRK.B': 'defensive',    // Berkshire Hathaway - 多元化集团(防御)
  'MARA': 'early',         // Marathon Digital - 加密挖矿(早周期)

  // --- 追加50只: S&P 500 Remaining ---
  'MTD': 'mid',            // Mettler-Toledo - 精密仪器(中周期)
  'GL': 'defensive',       // Globe Life - 人寿保险(防御)
  'CINF': 'defensive',     // Cincinnati Financial - 财产险(防御)
  'CNP': 'defensive',      // CenterPoint Energy - 公用事业(防御)
  'EVRG': 'defensive',     // Evergy - 公用事业(防御)
  'FE': 'defensive',       // FirstEnergy - 公用事业(防御)
  'LNT': 'defensive',      // Alliant Energy - 公用事业(防御)
  'NI': 'defensive',       // NiSource - 天然气公用(防御)
  'PNW': 'defensive',      // Pinnacle West - 公用事业(防御)
  'PPL': 'defensive',      // PPL Corporation - 公用事业(防御)

  // --- Mid-cap Industrials ---
  'LFUS': 'mid',           // Littelfuse - 电子元件(中周期)

  // --- Mid-cap Tech ---
  'PCOR': 'early',         // Procore - 建筑SaaS(早周期)
  'MNDY': 'early',         // monday.com - 工作管理SaaS(早周期)
  'GLBE': 'early',         // Global-e - 跨境电商(早周期)

  // --- Consumer/Retail ---
  'WOOF': 'mid',           // Petco - 宠物零售(中周期)

  // --- Healthcare ---
  'GDRX': 'mid',           // GoodRx - 医药折扣(中周期)
  'RPRX': 'defensive',     // Royalty Pharma - 药品特许权(防御)

  // ========== S&P 400 Midcap 追加 (30 stocks) ==========
  // --- Regional Banks ---
  'BANR': 'mid',           // Banner Financial - 地区银行(中周期)
  'CUBI': 'mid',           // Customers Bancorp - 地区银行(中周期)
  'NBTB': 'mid',           // NBT Bancorp - 地区银行(中周期)
  'CBSH': 'mid',           // Commerce Bankshares - 地区银行(中周期)

  // --- Insurance ---
  'RLI': 'defensive',      // RLI Corp - 特种P&C(防御)
  'PLMR': 'defensive',     // Palomar - 特种保险(防御)
  'ROOT': 'early',         // Root Inc - 保险科技(早周期)
  'LMND': 'early',         // Lemonade - 保险科技(早周期)
  'KMPR': 'mid',           // Kemper - 汽车保险(中周期)

  // --- Specialty Industrial ---
  'ROCK': 'mid',           // Gibraltar Industries - 建材(中周期)

  // --- Tech/SaaS ---
  'ALRM': 'mid',           // Alarm.com - 智能家居(中周期)
  'ARLO': 'mid',           // Arlo - 智能摄像(中周期)
  'RAMP': 'mid',           // LiveRamp - 数据连接(中周期)
  'PYCR': 'mid',           // Paycor - HCM SaaS(中周期)
  'CWAN': 'mid',           // Clearwater Analytics - 金融软件(中周期)
  'NCNO': 'mid',           // nCino - 银行SaaS(中周期)
  'JAMF': 'mid',           // Jamf - 终端管理(中周期)

  // --- Consumer/Restaurant ---
  'JACK': 'mid',           // Jack in the Box - QSR(中周期)
  'CAKE': 'mid',           // Cheesecake Factory - 正餐(中周期)
  'DINE': 'mid',           // Dine Brands - 餐饮特许(中周期)

  // --- Healthcare ---
  'NVAX': 'early',         // Novavax - 疫苗(早周期)
  'GKOS': 'mid',           // Glaukos - 眼科器械(中周期)
  'INSP': 'mid',           // Inspire Medical - 睡眠治疗(中周期)

  // --- Energy ---
  'STEM': 'early',         // Stem Inc - 储能(早周期)
  'FLNC': 'early',         // Fluence - 储能(早周期)
  'ORA': 'defensive',      // Ormat - 地热能(防御)

  // --- Materials ---
  'CMC': 'mid',            // Commercial Metals - 废钢回收(中周期)
  'ASPN': 'early',         // Aspen Aerogels - 先进材料(早周期)

  // --- REITs ---
  'IIPR': 'early',         // Innovative Industrial - 大麻REIT(早周期)

  // --- Transportation ---
  'SNDR': 'mid',           // Schneider National - 整车运输(中周期)

  // --- Specialty Metals ---
  'HAYN': 'late',          // Haynes International - 高温合金(晚周期/航空)

  // --- Gas Utility ---
  'SW': 'defensive',       // Southwest Gas - 天然气公用事业(防御)

  // --- AdTech/Digital ---
  'PUBM': 'mid',           // PubMatic - AdTech DSP(中周期)
  'RSI': 'mid',            // Rush Street Interactive - 在线博彩(中周期)

  // --- Communications/Software ---
  'BAND': 'mid',           // Bandwidth - CPaaS(中周期)
  'PAR': 'mid',            // PAR Technology - 餐饮科技(中周期)
  'FLYW': 'mid',           // Flywire - 金融基础设施(中周期)

  // --- Healthcare ---
  'USPH': 'defensive',     // US Physical Therapy - 门诊康复(防御)
  'NEO': 'mid',            // NeoGenomics - 医学诊断(中周期)
  'AZTA': 'mid',           // Azenta - 生命科学工具(中周期)
  'BIO': 'mid',            // Bio-Rad - 生命科学工具(中周期)

  // --- Materials/Mining ---
  'TROX': 'mid',           // Tronox - 商品化学品(中周期)
  'CC': 'mid',             // Chemours - 商品化学品(中周期)
  'SMID': 'early',         // Smith-Midland - 预制混凝土(早周期)
  'UEC': 'early',          // Uranium Energy - 铀矿(早周期)
  'DNN': 'early',          // Denison Mines - 铀矿(早周期)
  'MAXN': 'early',         // Maxeon Solar - 太阳能制造(早周期)

  // --- Energy ---
  'SLDP': 'early',         // Solid Power - EV电池(早周期)
  'RIOT': 'early',         // Riot Platforms - 加密货币挖矿(早周期)
  'CLSK': 'early',         // CleanSpark - 加密货币挖矿(早周期)

  // --- Consumer/Retail ---
  'COLM': 'mid',           // Columbia Sportswear - 户外服装(中周期)
  'ACI': 'defensive',      // Albertsons - 食品零售(防御)
  'GO': 'defensive',       // Grocery Outlet - 折扣食品(防御)
  'PLCE': 'mid',           // Children's Place - 基础服装(中周期)
  'GIII': 'mid',           // G-III Apparel - 基础服装(中周期)
  'LOVE': 'mid',           // Lovesac - 家具(中周期)
  'ARHS': 'mid',           // Arhaus - 家具(中周期)
  'MUSA': 'defensive',     // Murphy USA - 便利店(防御)
  'PZZA': 'mid',           // Papa John's - 快餐(中周期)
  'BLMN': 'mid',           // Bloomin' Brands - 正餐(中周期)
  'JJSF': 'defensive',    // J&J Snack Foods - 烘焙零食(防御)
  'SNBR': 'mid',           // Sleep Number - 家具/床垫(中周期)
  'FIZZ': 'defensive',     // National Beverage - 软饮料(防御)
  'IRBT': 'mid',           // iRobot - 智能家居(中周期)

  // --- Transport/Logistics ---
  'HTLD': 'mid',           // Heartland Express - 整车运输(中周期)
  'GATX': 'mid',           // GATX Corp - 铁路车辆租赁(中周期)
  'CSV': 'defensive',      // Carriage Services - 殡葬服务(防御)

  // --- Specialty Vehicles ---
  'REVG': 'mid',           // REV Group - 特种车辆(中周期)

  // --- Industrials ---
  'THS': 'defensive',      // TreeHouse Foods - 食品原料/自有品牌(防御)
  'BERY': 'mid',           // Berry Global - 柔性包装(中周期)
  'HURN': 'defensive',     // Huron Consulting - 专业服务(防御)
  'ICF': 'defensive',      // ICF International - 政府咨询(防御)

  // --- Semiconductors/Electronics ---
  'LITE': 'mid',           // Lumentum - 光通信(中周期)
  'VIAV': 'mid',           // Viavi Solutions - 网络测试(中周期)

  // --- Outdoor Equipment ---
  'YETI': 'mid',           // YETI - 户外装备(中周期)
  'CLAR': 'mid',           // Clarus Corp - 户外装备(中周期)

  // ========== 追加 (2026-01-24 batch 2) ==========

  // --- Water Utilities (Defensive) ---
  'WTRG': 'defensive',      // Essential Utilities - 水务(防御)
  'CWT': 'defensive',       // California Water Service - 水务(防御)
  'SJW': 'defensive',       // SJW Group - 水务(防御)

  // --- Consumer/Retail ---
  'SHOO': 'mid',            // Steven Madden - 鞋类(中周期)
  'FAT': 'mid',             // FAT Brands - 餐饮特许(中周期)
  'DENN': 'mid',            // Denny's - 餐饮特许(中周期)
  'SKY': 'early',           // Skyline Champion - 制造住房(早周期)
  'EXPI': 'mid',            // eXp Realty - 房产服务(中周期)
  'PNTG': 'defensive',      // Pennant Group - 护理(防御)

  // --- Homebuilders (Early Cycle) ---
  'GRBK': 'early',          // Green Brick Partners - 住宅(早周期)
  'CCS': 'early',           // Century Communities - 住宅(早周期)
  'MHO': 'early',           // M/I Homes - 住宅(早周期)
  'LGIH': 'early',          // LGI Homes - 住宅(早周期)

  // --- Energy/Materials ---
  'CVI': 'late',            // CVR Energy - 炼油(晚周期)
  'ZEUS': 'mid',            // Olympic Steel - 钢材分销(中周期)
  'RES': 'late',            // RPC Inc - 油服(晚周期)
  'PUMP': 'late',           // ProPetro - 油服(晚周期)
  'AMR': 'mid',             // Alpha Metallurgical - 焦煤(中周期)

  // --- Building Products ---
  'IBP': 'early',           // Installed Building Products - 建材安装(早周期)

  // --- Technology/Software (Defensive) ---
  'ACIW': 'defensive',      // ACI Worldwide - 金融软件(防御)
  'CGNX': 'mid',            // Cognex - 机器视觉(中周期)
  'PD': 'defensive',        // PagerDuty - DevOps(防御)
  'PRGS': 'defensive',      // Progress Software - 企业软件(防御)

  // --- Other ---
  'SLGN': 'mid',            // Silgan Holdings - 食品包装(中周期)
  'TDW': 'late',            // Tidewater - 海洋服务(晚周期)
  'CRAI': 'defensive',      // CRA International - 管理咨询(防御)
  'LNTH': 'defensive',      // Lantheus Holdings - 核医学(防御)

  // --- S&P 600 Small-Cap Additions ---

  // Healthcare/MedTech
  'OMCL': 'mid',            // Omnicell - 药房自动化(中周期)
  'NVCR': 'mid',            // NovoCure - 肿瘤治疗设备(中周期)
  'PRCT': 'mid',            // PROCEPT BioRobotics - 手术机器人(中周期)
  'IRTC': 'mid',            // iRhythm Technologies - 心脏监测(中周期)
  'TNDM': 'mid',            // Tandem Diabetes - 胰岛素泵(中周期)

  // Semiconductors/Tech
  'POWI': 'mid',            // Power Integrations - 电源半导体(中周期)
  'AMBA': 'mid',            // Ambarella - 视频处理芯片(中周期)
  'CEVA': 'mid',            // CEVA Inc - 芯片IP授权(中周期)
  'RMBS': 'mid',            // Rambus - 内存接口IP(中周期)
  'PI': 'mid',              // Impinj - RFID解决方案(中周期)

  // Industrials
  'ESAB': 'mid',            // ESAB Corp - 焊接切割设备(中周期)
  'SPSC': 'defensive',      // SPS Commerce - 供应链SaaS(防御)
  'NVRI': 'mid',            // Enviri Group - 环保服务(中周期)
  'SKYW': 'mid',            // SkyWest Inc - 区域航空(中周期)

  // Consumer/Restaurant
  'BJRI': 'mid',            // BJ's Restaurants - 休闲餐饮(中周期)
  'KRUS': 'mid',            // Kura Sushi - 日式快餐(中周期)
  'LOCO': 'mid',            // El Pollo Loco - 快餐(中周期)
  'PRDO': 'defensive',      // Perdoceo Education - 营利教育(防御)

  // Regional Banks
  'GBCI': 'mid',            // Glacier Bancorp - 区域银行(中周期)
  'TOWN': 'mid',            // TowneBank - 区域银行(中周期)
  'HOPE': 'mid',            // Hope Bancorp - 区域银行(中周期)
  'OFG': 'mid',             // OFG Bancorp - 区域银行(中周期)
  'UMBF': 'mid',            // UMB Financial - 区域银行(中周期)
  'ABCB': 'mid',            // Ameris Bancorp - 区域银行(中周期)

  // Energy
  'REPX': 'late',           // Riley Exploration - 页岩油气E&P(晚周期)
  'CIVI': 'late',           // Civitas Resources - 页岩油气E&P(晚周期)
  'HLX': 'late',            // Helix Energy Solutions - 海底服务(晚周期)
  'ARCH': 'mid',            // Arch Resources - 焦煤(中周期)

  // S&P 600 Consumer/Retail
  'SCVL': 'mid',            // Shoe Carnival - 鞋类零售(中周期)
  'LESL': 'mid',            // Leslie's - 泳池用品零售(中周期)
  'PLNT': 'mid',            // Planet Fitness - 健身加盟(中周期)
  'XPOF': 'mid',            // Xponential Fitness - 精品健身(中周期)
  'EYE': 'mid',             // National Vision - 眼镜零售(中周期)

  // Biotech
  'MDGL': 'mid',            // Madrigal Pharmaceuticals - NASH药物(中周期)
  'KRYS': 'early',          // Krystal Biotech - 基因治疗(早周期)

  // Industrial Equipment
  'POWL': 'mid',            // Powell Industries - 配电设备(中周期)
  'MIDD': 'mid',            // Middleby Corp - 商用厨房设备(中周期)
  'EPAC': 'mid',            // Enerpac Tool - 液压工具(中周期)

  // Specialty Finance
  'TREE': 'mid',            // LendingTree - 在线贷款市场(中周期)
  'WRLD': 'mid',            // World Acceptance - 消费金融/次贷(中周期)
  'EZPW': 'mid',            // EZCorp - 典当/消费金融(中周期)

  // Regional Banks
  'FCNCA': 'mid',           // First Citizens BancShares - 区域银行(中周期)
  'IBOC': 'mid',            // International Bancshares - 区域银行(中周期)
  'CADE': 'mid',            // Cadence Bank - 区域银行(中周期)

  // Transportation
  'ARCB': 'mid',            // ArcBest Corp - LTL货运(中周期)
  'MRTN': 'mid',            // Marten Transport - 冷链货运(中周期)
  'FWRD': 'mid',            // Forward Air - 加急货运(中周期)

  // REITs
  'TRNO': 'mid',            // Terreno Realty - 工业REIT(中周期)

  // Specialty Chemicals
  'HWKN': 'mid',            // Hawkins Inc - 特种化学品分销(中周期)
  'KWR': 'mid',             // Quaker Houghton - 工业流体(中周期)
  'IOSP': 'mid',            // Innospec - 特种化学品(中周期)
  'CBT': 'mid',             // Cabot Corp - 炭黑/特种化学品(中周期)
  'BCPC': 'mid',            // Balchem Corp - 特种配料(中周期)

  // Insurance/Gaming
  'HCI': 'mid',             // HCI Group - 房屋保险(中周期)
  'GDEN': 'mid',            // Golden Entertainment - 博彩/酒馆(中周期)
  'RRR': 'mid',             // Red Rock Resorts - 赌场(中周期)
  'CHDN': 'mid',            // Churchill Downs - 赛马/博彩(中周期)

  // AdTech/Marketing
  'IAS': 'defensive',       // Integral Ad Science - 广告验证(防御型)
  'ZETA': 'mid',            // Zeta Global - 营销数据平台(中周期)
  'CARG': 'mid',            // CarGurus - 汽车市场平台(中周期)

  // Auto/RV
  'LCII': 'mid',            // LCI Industries - 房车零部件(中周期)
  'WGO': 'mid',             // Winnebago - 房车制造(中周期)
  'CWH': 'mid',             // Camping World - 房车零售(中周期)
  'FOXF': 'mid',            // Fox Factory - 悬挂系统(中周期)
  'MPAA': 'mid',            // Motorcar Parts - 汽车零件再制造(中周期)

  // Auto Parts
  'LKQ': 'mid',             // LKQ Corp - 替代汽车配件(中周期)

  // Food/Beverage
  'JBSS': 'defensive',      // John B. Sanfilippo - 坚果加工(防御型)
  'BGS': 'defensive',       // B&G Foods - 包装食品(防御型)
  'UTZ': 'defensive',       // Utz Brands - 咸味零食(防御型)
  'HAIN': 'defensive',      // Hain Celestial - 天然有机食品(防御型)

  // Healthcare Services
  'CHE': 'defensive',       // Chemed/VITAS - 临终关怀(防御型)
  'NHC': 'defensive',       // National HealthCare - 长期护理(防御型)
  'ADUS': 'defensive',      // Addus HomeCare - 家庭健康服务(防御型)

  // Real Estate
  'NMRK': 'mid',            // Newmark Group - 商业地产服务(中周期)
  'RMR': 'defensive',       // RMR Group - REIT管理(防御型)
  'HHH': 'early',           // Howard Hughes - 总体规划社区(早周期)

  // Education
  'LRN': 'defensive',       // Stride Inc - 在线K-12教育(防御型)
  'ATGE': 'defensive',      // Adtalem Global - 医疗教育(防御型)

  // Staffing
  'KFRC': 'mid',            // Kforce - 科技/金融人力(中周期)
  'KELYA': 'mid',           // Kelly Services - 人力资源(中周期)

  // Environmental
  'MEG': 'defensive',       // Montrose Environmental - 环保咨询(防御型)

  // SaaS
  'FRSH': 'mid',            // Freshworks - 客服SaaS(中周期)

  // ========== 新增19只 (2026-01-24) ==========

  // Security/Services
  'ADT': 'defensive',       // ADT - 安防订阅(防御型)

  // Childcare
  'BFAM': 'defensive',      // Bright Horizons - 托儿服务(防御型)

  // Entertainment
  'CNK': 'mid',             // Cinemark - 电影院(中周期)
  'IMAX': 'mid',            // IMAX - 影院科技(中周期)

  // Shipping
  'DAC': 'early',           // Danaos - 集装箱航运(早周期)

  // Housing/Furnishing
  'ETD': 'late',            // Ethan Allen - 家居(晚周期)
  'FBIN': 'mid',            // Fortune Brands - 建材(中周期)
  'TMHC': 'early',          // Taylor Morrison - 房建(早周期)
  'REZI': 'mid',            // Resideo - HVAC(中周期)

  // Leisure/Travel
  'FUN': 'mid',             // Cedar Fair - 主题公园(中周期)
  'LVS': 'mid',             // Las Vegas Sands - 赌场(中周期)

  // Tech/Platform
  'GRAB': 'early',          // Grab - 超级App(早周期)
  'LOGI': 'mid',            // Logitech - PC外设(中周期)
  'OLED': 'early',          // Universal Display - 显示技术(早周期)

  // Luxury
  'LVMUY': 'late',          // LVMH - 奢侈品(晚周期)

  // Aesthetics
  'SKIN': 'mid',            // Beauty Health - 医美(中周期)

  // Health Supplements
  'USNA': 'defensive',      // USANA - 保健品(防御型)
  'NUS': 'defensive',       // Nu Skin - 保健品(防御型)

  // ========== 新增29只 (Gene Editing/Biotech/FinTech/Infra等) ==========

  // Gene Editing/Biotech
  'TWST': 'early',           // Twist Bioscience - 合成生物工具(早周期)
  'CRSP': 'early',           // CRISPR Therapeutics - 基因编辑(早周期)
  'NTLA': 'early',           // Intellia Therapeutics - 体内基因编辑(早周期)
  'RXRX': 'early',           // Recursion Pharmaceuticals - AI药物发现(早周期)

  // Clean Energy
  'PLUG': 'early',           // Plug Power - 氢燃料电池(早周期)

  // FinTech
  'UPST': 'mid',             // Upstart - AI借贷平台(中周期)
  'RELY': 'defensive',       // Remitly - 数字汇款(防御型)
  'PAYO': 'defensive',       // Payoneer - 跨境支付(防御型)

  // Software/Analytics
  'VRNT': 'defensive',       // Verint Systems - CX分析/AI(防御型)
  'TYL': 'defensive',        // Tyler Technologies - 政府软件(防御型)
  'APPF': 'defensive',       // AppFolio - 物业管理SaaS(防御型)

  // Banking/Finance SaaS
  'ALKT': 'defensive',       // Alkami Technology - 数字银行SaaS(防御型)
  'HQY': 'defensive',        // HealthEquity - HSA管理(防御型)

  // Infrastructure/Construction
  'ASTE': 'mid',             // Astec Industries - 筑路设备(中周期)
  'ROAD': 'mid',             // Construction Partners - 公路建设(中周期)
  'PRIM': 'mid',             // Primoris Services - 基础设施建设(中周期)
  'STRL': 'mid',             // Sterling Infrastructure - 电子基础设施(中周期)
  'TTEK': 'defensive',       // Tetra Tech - 环保/基础设施咨询(防御型)
  'KNF': 'mid',              // Knife River - 建材/骨料(中周期)
  'APOG': 'mid',             // Apogee Enterprises - 建筑玻璃(中周期)
  'GLDD': 'mid',             // Great Lakes Dredge - 海洋疏浚(中周期)

  // Materials/Wood
  'UFPI': 'mid',             // UFP Industries - 木材/复合建材(中周期)

  // Life Science Diagnostics
  'CDNA': 'defensive',       // CareDx - 移植诊断(防御型)
  'MYGN': 'defensive',       // Myriad Genetics - 基因检测(防御型)
  'OLINK': 'mid',            // Olink Proteomics - 蛋白质组学(中周期)

  // Death Care/Industrial
  'MATW': 'defensive',       // Matthews International - 纪念产品(防御型)

  // Agriculture
  'ANDE': 'mid',             // Andersons - 农业供应链/乙醇(中周期)

  // Digital Infrastructure
  'DBRG': 'mid',             // DigitalBridge - 数字基础设施投资(中周期)

  // Industrial Auctions
  'RBA': 'mid',              // RB Global - 工业设备拍卖(中周期)

  // ---------- 特种化学品/涂料 (Specialty Chemicals/Coatings) ----------
  'AXTA': 'mid',             // Axalta - 汽车/工业涂料(中周期)
  'FUL': 'mid',              // H.B. Fuller - 粘合剂/密封剂(中周期)
  'ESI': 'mid',              // Element Solutions - 电子化学品(中周期)

  // ---------- 保险 (Insurance) ----------
  'SIGI': 'mid',             // Selective Insurance - 特种P&C保险(中周期)
  'ORI': 'defensive',        // Old Republic - 多元化保险/产权(防御型)
  'THG': 'mid',              // Hanover Insurance - P&C保险(中周期)

  // ---------- 医疗IT (Healthcare IT) ----------
  'NXGN': 'defensive',       // NextGen Healthcare - EHR(防御型)
  'PINC': 'defensive',       // Premier Inc - 医疗GPO/分析(防御型)
  'HCAT': 'defensive',       // Health Catalyst - 医疗分析(防御型)
  'PHR': 'defensive',        // Phreesia - 患者入院技术(防御型)

  // ---------- 消费零售 (Consumer Retail) ----------
  'SIG': 'mid',              // Signet Jewelers - 珠宝零售(中周期)
  'MNRO': 'defensive',       // Monro Inc - 汽车服务/修理(防御型)
  'VSCO': 'mid',             // Victoria's Secret - 内衣/美妆零售(中周期)

  // ---------- 国防/航天 (Defense/Aerospace) ----------
  'AVAV': 'mid',             // AeroVironment - 战术无人机(中周期)
  'MRCY': 'mid',             // Mercury Systems - 国防电子(中周期)

  // ---------- 半导体 (Semiconductor) ----------
  'SYNA': 'mid',             // Synaptics - 人机界面半导体(中周期)
  'SITM': 'mid',             // SiTime - MEMS时钟半导体(中周期)

  // ---------- 医疗/生物科技 (Healthcare/Biotech) ----------
  'HAE': 'defensive',        // Haemonetics - 血液管理技术(防御型)
  'RVMD': 'early',           // Revolution Medicines - 肿瘤药物(早周期)
  'PTCT': 'mid',             // PTC Therapeutics - 罕见病疗法(中周期)

  // ---------- 船舶/休闲 (Marine/Recreation) ----------
  'BC': 'mid',               // Brunswick - 船舶/休闲产品(中周期)
  'HZO': 'mid',              // MarineMax - 船舶零售/服务(中周期)

  // ---------- 赌场 (Casino) ----------
  'MCRI': 'mid',             // Monarch Casino - 赌场/酒店(中周期)

  // ---------- 商业服务 (Business Services) ----------
  'CNXC': 'defensive',       // Concentrix - CX商业服务/BPO(防御型)

  // ---------- 多元化工业 (Diversified Industrial) ----------
  'SXI': 'mid',              // Standex International - 多元化工业(中周期)

  // ---------- 芯片架构/IP (Chip Architecture/IP) ----------
  'ARM': 'mid',              // Arm Holdings - 芯片架构IP授权(中周期)

  // ---------- 生鲜配送 (Grocery Delivery) ----------
  'CART': 'mid',             // Instacart - 生鲜配送平台(中周期)

  // ---------- 高端鞋履 (Premium Footwear) ----------
  'BIRK': 'mid',             // Birkenstock - 高端凉鞋(中周期)

  // ---------- 拉美/东南亚电商 (LatAm/SE Asia E-commerce) ----------
  'MELI': 'mid',             // MercadoLibre - 拉美电商/金融科技(中周期)
  'SE': 'mid',               // Sea Limited - 东南亚游戏/电商/金融(中周期)

  // ---------- 中国电商/科技 (Chinese E-commerce/Tech) ----------
  'BABA': 'mid',             // Alibaba - 中国电商/云(中周期)
  'PDD': 'mid',              // PDD Holdings - 全球电商Temu/拼多多(中周期)
  'JD': 'mid',               // JD.com - 中国电商/物流(中周期)
  'BIDU': 'mid',             // Baidu - 中国搜索/AI(中周期)

  // ---------- 中国肿瘤生物科技 (Chinese Oncology Biotech) ----------
  'BGNE': 'mid',             // BeiGene - 中国肿瘤生物科技(中周期)

  // ---------- eVTOL/电动飞行器 ----------
  'JOBY': 'early',           // Joby Aviation - eVTOL空中出租车(早周期)

  // ---------- 高端电动汽车 (Premium EV) ----------
  'PSNY': 'early',           // Polestar - 高端电动汽车(早周期)

  // ---------- 钢铁 (Steel) ----------
  'X': 'mid',                // US Steel - 综合钢铁(中周期)

  // ---------- 矿业 (Mining) ----------
  'VALE': 'mid',             // Vale - 铁矿石/镍矿(中周期)
  'RIO': 'mid',              // Rio Tinto - 多元化矿业(中周期)
  'BHP': 'mid',              // BHP Group - 多元化矿业(中周期)

  // ---------- LNG出口 (LNG Export) ----------
  'LNG': 'mid',              // Cheniere Energy - LNG出口/液化(中周期)

  // ---------- 补充: 2026-01 第八批 ----------
  // Biotech (early cycle)
  'XENE': 'early',            // Xenon Pharmaceuticals - 癫痫生物科技(早周期)
  'SWTX': 'early',            // SpringWorks Therapeutics - 罕见肿瘤生物科技(早周期)
  'KYMR': 'early',            // Kymera Therapeutics - 蛋白降解生物科技(早周期)
  'RCKT': 'early',            // Rocket Pharmaceuticals - 基因治疗(早周期)

  // Healthcare REITs
  'GLPI': 'mid',              // Gaming & Leisure Properties - 赌场REIT(中周期)
  'MPW': 'defensive',         // Medical Properties Trust - 医院REIT(防御)
  'SBRA': 'defensive',        // Sabra Healthcare REIT - 老年住宅REIT(防御)
  'DOC': 'defensive',         // Healthpeak Properties - 医疗/生命科学REIT(防御)

  // Consumer
  'PTLO': 'mid',              // Portillo's - 快餐(中周期)
  'ARKO': 'defensive',        // ARKO Group - 便利店/加油(防御)

  // Industrial
  'BLBD': 'mid',              // Blue Bird Corp - 校车制造(中周期)

  // E&P (late cycle)
  'VTLE': 'late',             // Vital Energy - 页岩油E&P(晚周期)
  'GPOR': 'late',             // Gulfport Energy - 天然气E&P(晚周期)

  // Regional Banks (mid cycle)
  'TBBK': 'mid',              // The Bancorp - BaaS银行(中周期)
  'FFBC': 'mid',              // First Financial Bankshares - 区域银行(中周期)
  'WSBC': 'mid',              // WesBanco - 区域银行(中周期)

  // Healthcare Services (defensive)
  'LFST': 'defensive',        // LifeStance Health - 心理健康(防御)
  'OPCH': 'defensive',        // Option Care Health - 家庭输液(防御)
  'PACS': 'defensive',        // PACS Group - 急性期后护理(防御)

  // Dental/Medical Distribution (defensive)
  'HSIC': 'defensive',        // Henry Schein - 牙科/医疗分销(防御)
  'PDCO': 'defensive',        // Patterson Companies - 牙科/兽医分销(防御)

  // Gaming/Payments Tech (mid cycle)
  'EVERI': 'mid',             // Everi Holdings - 游戏技术/支付(中周期)
  'CXT': 'mid',               // Crane NXT - 支付技术/传感器(中周期)

  // Media/Sports/Entertainment
  'ATUS': 'defensive',        // Altice USA - 有线/宽带(防御)
  'MSGS': 'mid',              // MSG Sports - 职业体育(中周期)
  'MSGE': 'mid',              // MSG Entertainment - 娱乐场馆(中周期)

  // Specialty Manufacturing (mid cycle)
  'TRS': 'mid',               // TriMas Corp - 特种容器/包装(中周期)
  'TNET': 'defensive',        // TriNet Group - HR/PEO服务(防御)
  'NSIT': 'mid',              // Insight Enterprises - IT解决方案(中周期)
  'PLAB': 'mid',              // Photronics - 半导体光掩模(中周期)

  // Consumer Products (mid cycle)
  'HELE': 'mid',              // Helen of Troy - 消费品/家居(中周期)
  'IPAR': 'mid',              // Inter Parfums - 高端香水(中周期)
  'VITL': 'defensive',        // Vital Farms - 牧场鸡蛋/黄油(防御)

  // Specialty Food Distribution (mid cycle)
  'CHEF': 'mid',              // Chef's Warehouse - 特种食品分销(中周期)

  // Hotel REITs (mid cycle)
  'RLJ': 'mid',               // RLJ Lodging Trust - 精选服务酒店REIT(中周期)
  'SHO': 'mid',               // Sunstone Hotel - 高端全服务酒店REIT(中周期)
  'PEB': 'mid',               // Pebblebrook Hotel - 生活方式酒店REIT(中周期)
  'RHP': 'mid',               // Ryman Hospitality - 娱乐场馆REIT(中周期)
  'APLE': 'mid',              // Apple Hospitality REIT - 精选服务酒店REIT(中周期)

  // Power/Energy (mid cycle)
  'GEV': 'mid',               // GE Vernova - 电力设备/电网(中周期)
  'TLN': 'mid',               // Talen Energy - 核电/发电(中周期)

  // Utilities (defensive)
  'PCG': 'defensive',         // PG&E Corp - 受管制公用事业(防御)
  'EIX': 'defensive',         // Edison International - 受管制公用事业(防御)

  // Telecom/Networking
  'FYBR': 'defensive',        // Frontier Communications - 光纤宽带(防御)
  'BDC': 'mid',               // Belden Inc - 网络基础设施(中周期)

  // Technology
  'AI': 'early',              // C3.ai - 企业AI平台(早周期)
  'PURE': 'mid',              // Pure Storage - 全闪存(中周期)

  // Healthcare (mid cycle)
  'GMED': 'mid',              // Globus Medical - 脊柱手术机器人(中周期)
  'MMSI': 'mid',              // Merit Medical - 介入医疗器械(中周期)

  // Mobility/Industrial (mid cycle)
  'VNT': 'mid',               // Vontier Corp - 出行科技/燃油(中周期)

  // Cannabis (early cycle)
  'TLRY': 'early',            // Tilray Brands - 大麻/精酿啤酒(早周期)

  // Business Services (defensive)
  'G': 'defensive',           // Genpact - 数字运营/BPO(防御)

  // ========== 新增15只股票 (2026-01 batch) ==========

  // Large-cap gap fills
  'RMD': 'mid',               // ResMed - 医疗设备CPAP/呼吸机(中周期)
  'ARGX': 'mid',              // argenx - FcRn抗体生物科技(中周期)
  'WCN': 'defensive',         // Waste Connections - 废物管理(防御型)
  'CRH': 'mid',               // CRH plc - 水泥/建材(中周期)
  'CPNG': 'mid',              // Coupang - 韩国电商(中周期)
  'WMG': 'defensive',         // Warner Music - 音乐厂牌(防御型)
  'MOG.A': 'mid',             // Moog Inc - 航空航天组件(中周期)

  // Russell 2000 small-caps (healthcare)
  'FLGT': 'defensive',        // Fulgent Genetics - 基因检测(防御型)

  // Russell 2000 small-caps (tech/software)
  'ALTR': 'mid',              // Altair Engineering - 仿真软件(中周期)
  'QTWO': 'mid',              // Q2 Holdings - 银行SaaS(中周期)

  // Russell 2000 small-caps (industrials/materials)
  'TILE': 'mid',              // Interface - 模块地板(中周期)

  // Russell 2000 small-caps (consumer/financial)
  'DTC': 'early',             // Solo Brands - DTC户外品牌(早周期)
  'TASK': 'mid',              // TaskUs - BPO外包(中周期)
  'COOP': 'mid',              // Mr. Cooper - 抵押贷款服务(中周期)

  // Energy/Midstream - Oil Gathering
  'HESM': 'early',             // Hess Midstream - 油气集输(早周期)

  // Food/Beverage - Specialty Foods
  'LANC': 'defensive',         // Lancaster Colony - 特色食品(防御)
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

  'MTB': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.5, housingMarket: 0.5, dollarIndex: 0.1, oilPrice: 0.0,
  },

  'ALLY': {
    interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.1,
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
  'PHM': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'NVR': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'TOL': {
    interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'KBH': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.2,
  },

  // 建筑材料 (新建+翻新驱动，利率敏感略低)
  'JHX': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.8, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'AZEK': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'OC': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.8, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'BLDR': {
    interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 房地产服务 (利率极敏感 - 房贷交易量)
  'RKT': {
    interestRate: -0.9, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'FAF': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'FNF': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0,
  },

  'TSLA': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.4,
  },

  // 汽车 - 传统OEM (利率负相关，消费信心正相关，油价负面)
  'F': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: -0.3,
  },
  'GM': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: -0.3,
  },

  // 汽车 - EV纯电 (利率负相关更强，油价反向受益)
  'RIVN': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.4,
  },
  'LCID': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.4,
  },

  // 汽车零部件 (与OEM同步，利率负相关)
  'APTV': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'BWA': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'LEA': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'MGA': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.4, oilPrice: -0.2,
  },
  'ALV': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'GNTX': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // 汽车经销商 (利率负相关 - 贷款购车，消费信心正相关)
  'AN': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'PAG': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'LAD': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'KMX': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'CVNA': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.1,
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
  'HAL': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.85,
  },
  'BKR': {
    interestRate: 0.1, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.8,
  },

  // E&P公司 - 油价高度正相关
  'EOG': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'PXD': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'FANG': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'DVN': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.88,
  },
  'COP': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.85,
  },
  'OXY': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'HES': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.88,
  },
  'MRO': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.85,
  },
  'APA': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.85,
  },

  // 中游管道 - 油价敏感度较低，更稳定
  'WMB': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.4,
  },
  'KMI': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.4,
  },
  'ET': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },
  'EPD': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.4,
  },
  'OKE': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.45,
  },
  'TRGP': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },

  // 炼化 - 利润取决于裂解价差，与油价关系复杂
  'VLO': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'MPC': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'PSX': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },

  // 化工 - 油价是成本，中等敏感
  'DOW': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'LYB': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.3,
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
  'AAL': {
    interestRate: -0.4, inflation: -0.4, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.8,
  },

  // 酒店 - 商务/旅游双驱动，消费信心正相关
  'MAR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'HLT': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'WH': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'ABNB': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'BKNG': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.2,
  },
  'EXPE': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // 国防 - 低宏观敏感(政府合同)
  'LHX': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ========== 美元高敏感 (负相关 - 出口/海外收入) ==========
  'AAPL': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'HPQ': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'SONO': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MSFT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'GOOGL': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'META': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'AMZN': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: -0.1,
  },

  // 科技硬件/基础设施
  'DELL': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'HPE': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SMCI': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'IBM': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CSCO': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'ANET': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'DLR': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // SaaS/软件
  'CRM': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'NOW': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CRWD': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PANW': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ORCL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'OKTA': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'VEEV': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'HUBS': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'BILL': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SHOP': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PLTR': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // IT服务/咨询 - 企业IT支出驱动
  'ACN': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'INFY': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'WIT': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'CTSH': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'EPAM': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // EDA/设计软件 - 半导体设计支出驱动
  'CDNS': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SNPS': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ANSS': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // ========== 半导体 (Semiconductors) ==========
  // 设备商 - 资本支出周期驱动，利率弱负相关
  'LRCX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'AMAT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'ASML': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'KLAC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'TER': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 芯片设计 - 消费电子/云驱动，美元负敏感
  'NVDA': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'AMD': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'INTC': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'QCOM': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'AVGO': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'MRVL': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'NXPI': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'SWKS': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'QRVO': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ON': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 代工/存储 - 周期性更强
  'TSM': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'MU': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'WDC': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 电信 - 防御型，低GDP敏感
  'T': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'VZ': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TMUS': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CMCSA': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CHTR': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LBRDA': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // 媒体/娱乐
  'DIS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'NFLX': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'WBD': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SPOT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PARA': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'FOX': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // 游戏
  'EA': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'TTWO': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 数字广告
  'TTD': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'APP': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MGNI': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'DV': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // REITs - 高利率敏感
  'PLD': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'SPG': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'O': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'EQR': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'AVB': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'INVH': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'BXP': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'WELL': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'PSA': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'EQIX': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 公用事业 - 防御型，高利率敏感
  'NEE': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'DUK': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SO': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'EXC': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'VST': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.3,
  },
  'CEG': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ENPH': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'FSLR': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'AEP': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'XEL': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SEDG': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'RUN': {
    interestRate: -0.6, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: 0.2,
  },

  // 废弃物处理 - 防御型，略受GDP影响
  'WM': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'RSG': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'CLH': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },

  'AWK': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
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
  'MAERSK.B': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.5,
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
  // 货运经纪/LTL - 经济周期敏感，油价影响
  'XPO': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.3,
  },
  'CHRW': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'JBHT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.4,
  },
  'EXPD': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.2,
  },

  // ========== 金融行业 (利率高敏感) ==========

  // 区域银行 - 利率敏感度最高
  'PNC': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'USB': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'TFC': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'FITB': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'RF': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'KEY': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'CFG': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'HBAN': {
    interestRate: 0.85, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.2, oilPrice: 0.0,
  },

  // 投资银行 - 市场活动敏感
  'GS': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.1,
  },
  'MS': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.1,
  },

  // 资产管理 - 市场表现敏感
  'BLK': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BX': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'KKR': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'APO': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'ARES': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'TROW': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 消费金融 - 信用周期敏感
  'COF': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.7,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: -0.1,
  },
  'DFS': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.7,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: -0.1,
  },
  'SYF': {
    interestRate: 0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.7,
    consumerConfidence: 0.7, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: -0.1,
  },

  // 券商
  'SCHW': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },

  // 交易所 - 波动率敏感
  'CME': {
    interestRate: 0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.3,
  },
  'ICE': {
    interestRate: 0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.2,
  },
  'NDAQ': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 金融数据 - 资本市场活动敏感
  'SPGI': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'MCO': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'MSCI': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 支付网络 - 消费量驱动，低利率敏感
  'V': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MA': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'AXP': {
    interestRate: 0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // 金融科技基础设施 - 防御型
  'FIS': {
    interestRate: 0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'FISV': {
    interestRate: 0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'GPN': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'FI': {
    interestRate: 0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'WU': {
    interestRate: 0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 保险 - 相对防御但利率正相关
  'TRV': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'ALL': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: -0.2,
  },
  'PGR': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: -0.2,
  },
  'CB': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'MET': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PRU': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'AFL': {
    interestRate: 0.5, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'HIG': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // ========== 医疗健康 (低宏观敏感度 - 防御型) ==========

  // 大型制药 - 需求刚性，低周期敏感
  'JNJ': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PFE': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MRK': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ABBV': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'LLY': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'BMY': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'NVO': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // 生物科技 - 类似大型制药
  'AMGN': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GILD': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'VRTX': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'REGN': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 医疗器械 - 略受手术量影响
  'MDT': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ABT': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SYK': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ISRG': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 医疗保险/管理式医疗 - 略受失业率影响
  'UNH': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ELV': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CI': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'HUM': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 药品分销 - 低敏感度
  'MCK': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ABC': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CAH': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 生命科学工具 - 研发支出相关
  'TMO': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'DHR': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'A': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'IQV': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CRL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 动物健康 - 防御性
  'ZTS': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IDXX': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 消费必需品 (低宏观敏感度 - 防御型) ==========

  // 家居用品 - 需求刚性，美元负敏感
  'PG': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'CL': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'KMB': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'CHD': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'CLX': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 包装食品 - 需求稳定，通胀正相关
  'GIS': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'K': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'KHC': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'HSY': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'CAG': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'CPB': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'SJM': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'MDLZ': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'HRL': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 饮料 - 需求稳定，美元负敏感
  'KO': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'PEP': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'MNST': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'KDP': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 酒精饮料 - 需求稍有弹性，但总体防御
  'STZ': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'TAP': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'DEO': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'SAM': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 美妆 - 中等周期性，旅游零售敏感
  'EL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'COTY': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 时尚/奢侈品 - 消费信心和GDP高度敏感
  'TPR': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'CPRI': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'PVH': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'RL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'VFC': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'HBI': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'LEVI': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 烟草 - 需求极度刚性
  'PM': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: 0.0,
  },
  'MO': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'BTI': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // 食品零售 - 防御性
  'WMT': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'COST': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'BJ': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'KR': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'SYY': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'USFD': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.2,
  },

  // 折扣零售 - 逆周期（经济差时受益）
  'DG': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: -0.1, unemployment: 0.3,
    consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'DLTR': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: -0.1, unemployment: 0.3,
    consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 百货 - 消费周期敏感
  'M': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'KSS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 宠物/健身电商
  'CHWY': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'PTON': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 消费可选 (高宏观敏感度 - 周期性) ==========

  // 家居建材 - 房地产周期敏感
  'HD': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'LOW': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 餐饮 - 消费者信心敏感
  'MCD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'SBUX': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'CMG': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'YUM': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'DRI': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'QSR': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'DPZ': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'WING': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 服装/运动 - 高消费者信心敏感
  'NKE': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'LULU': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 服装零售 - 高消费者信心敏感
  'GPS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'ANF': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'AEO': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'URBN': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 折扣零售 - 相对防御(经济下行受益)
  'TJX': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'ROST': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'DKS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 专业零售 - 消费者信心敏感
  'BBY': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'ULTA': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'RH': {
    interestRate: -0.6, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.8, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'WSM': {
    interestRate: -0.5, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'W': {
    interestRate: -0.6, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 汽配零售 - 相对防御（维修需求）
  'ORLY': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.2,
  },
  'AZO': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.2,
  },

  // 邮轮 - 极高周期敏感
  'RCL': {
    interestRate: -0.5, inflation: -0.4, gdpGrowth: 0.8, unemployment: -0.6,
    consumerConfidence: 0.9, housingMarket: 0.1, dollarIndex: 0.3, oilPrice: -0.5,
  },
  'CCL': {
    interestRate: -0.5, inflation: -0.4, gdpGrowth: 0.8, unemployment: -0.6,
    consumerConfidence: 0.9, housingMarket: 0.1, dollarIndex: 0.3, oilPrice: -0.5,
  },
  'NCLH': {
    interestRate: -0.5, inflation: -0.4, gdpGrowth: 0.8, unemployment: -0.6,
    consumerConfidence: 0.9, housingMarket: 0.1, dollarIndex: 0.3, oilPrice: -0.5,
  },

  // ========== 工业/材料 (中周期 - 高GDP敏感度) ==========

  // 工业综合 - GDP和资本开支敏感
  'HON': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'MMM': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'GE': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'ITW': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'EMR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'ETN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PH': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'ROK': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // 建筑/农业机械 - 高GDP和投资敏感
  'CAT': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.8, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.4, oilPrice: 0.3,
  },
  'DE': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'AGCO': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'CNHI': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'PCAR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'CMI': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'TEX': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'OSK': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 铁路 - GDP敏感，相对稳定
  'UNP': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'CSX': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'NSC': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // 工业分销 - GDP敏感
  'FAST': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'GWW': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'MSM': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'WSO': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.6, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'POOL': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 钢铁 - 高GDP和工业生产敏感
  'NUE': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.8, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'STLD': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.8, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'CLF': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.8, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'X': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.8, unemployment: -0.5,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.5, oilPrice: 0.2,
  },
  'RS': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.3, oilPrice: 0.1,
  },

  // 铜/有色金属 - 高GDP和通胀敏感
  'FCX': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.6, oilPrice: 0.3,
  },
  'SCCO': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.6, oilPrice: 0.3,
  },
  'AA': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.8, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.5, oilPrice: 0.4,
  },

  // 骨料/水泥 - 基建周期敏感
  'VMC': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'MLM': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'CX': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.4, oilPrice: -0.1,
  },

  // 工程承包 - 资本开支敏感
  'PWR': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'ACM': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'J': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'MTZ': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'EME': {  // EMCOR - 电气/机械承包
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.1,
  },

  // 包装 - 消费需求驱动，相对稳定
  'BALL': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'CCK': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'PKG': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'IP': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'WRK': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'AMCR': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },

  // 特种化工/工业气体 - GDP敏感
  'APD': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'LIN': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'SHW': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.6, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'PPG': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.4, oilPrice: 0.1,
  },
  'ECL': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'IFF': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.1,
  },
  'ALB': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: 0.2,
  },

  // 航空航天/国防 - 国防相对防御，商用航空周期性
  'BA': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.2,
  },
  'RTX': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'LMT': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'GD': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'NOC': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'HII': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'TXT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'HWM': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'TDG': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'HEI': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ========== 半导体设备 - capex cycle敏感 ==========
  'ENTG': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ONTO': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ACMR': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'MKSI': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CAMT': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'COHU': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ICHR': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'UCTT': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'FORM': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'KLIC': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'TOELY': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'AEHR': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // ========== Fabless/IDM/Foundry - 科技周期敏感 ==========
  'TXN': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ADI': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MXIM': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'WOLF': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'MPWR': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MCHP': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'LSCC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SMTC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ALGM': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'UMC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'GFS': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'STX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // ========== 航空工业 - 航空周期 ==========
  'EADSY': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'ERJ': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'SAFRY': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'RR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'SPR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'HXL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'WWD': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'AAR': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'AIR': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'VSEC': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'AER': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.3,
  },
  'AL': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.3,
  },
  'FLY': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.3,
  },

  // ========== 低成本航空 - 油价高敏感 ==========
  'JBLU': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.7,
  },
  'ALK': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.7,
  },
  'SAVE': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.8,
  },
  'ULCC': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.8,
  },

  // ========== 汽车OEM/零部件 - 利率+消费者信心 ==========
  'STLA': {
    interestRate: -0.5, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'TM': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'HMC': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'FSR': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'NIO': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'XPEV': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'LI': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'VC': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'ADNT': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'DAN': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'MOD': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'AXL': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'THRM': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'GPI': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'SAH': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'ABG': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'CAR': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'HTZ': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.2,
  },

  // ========== EV电池材料 - 商品周期 ==========
  'LTHM': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'LAC': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'PLL': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.2,
  },
  'QS': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.2,
  },

  // ========== 运输/铁路 - GDP驱动 ==========
  'CP': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'CNI': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'ODFL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.3,
  },
  'SAIA': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.3,
  },
  'KNX': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.4,
  },
  'KEX': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.3,
  },
  'GLNG': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },

  // ========== 农业 - 商品价格敏感 ==========
  'CTVA': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'FMC': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'INGR': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },

  // ========== 矿业/资源 - 商品超级周期 ==========
  'CENX': {
    interestRate: -0.2, inflation: 0.5, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.6, oilPrice: 0.3,
  },
  'TECK': {
    interestRate: -0.2, inflation: 0.5, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.5, oilPrice: 0.3,
  },
  'SUM': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // ========== 油气服务 - 油价高度正相关 ==========
  'FTI': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  'CHX': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  'PTEN': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.8,
  },
  'WFRD': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  'HFC': {
    interestRate: 0.1, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.5,
  },

  // ========== 医药/生物 - 防御型 ==========
  'SNY': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SGEN': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'INCY': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'BMRN': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'EXEL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'SRPT': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TEVA': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'VTRS': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PRGO': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CYH': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'RAD': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'DXCM': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 金融/数据 - 混合 ==========
  'BEN': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'IVZ': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'OWL': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'FDS': {
    interestRate: 0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'MORN': {
    interestRate: 0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TRI': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ADYEY': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 基础设施REIT - 利率敏感 ==========
  'AMT': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CCI': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'SBAC': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 工程/建筑 ==========
  'FLR': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'KBR': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },

  // ========== 旅游/零售/电商 ==========
  'TRIP': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'MTH': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.7, unemployment: -0.5,
    consumerConfidence: 0.7, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'IHG': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'EBAY': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ETSY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'WEN': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'LYFT': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.3,
  },
  'CWST': { interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.1 },
  'ECOL': { interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.2 },
  'RHI': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.7, unemployment: -0.8, consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'MAN': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.7, unemployment: -0.8, consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0 },
  'ASGN': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.7, consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'NSP': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.6, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'CTAS': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.5, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'LOPE': { interestRate: 0.0, inflation: 0.0, gdpGrowth: -0.2, unemployment: 0.3, consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'STRA': { interestRate: 0.0, inflation: 0.0, gdpGrowth: -0.2, unemployment: 0.3, consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'DUOL': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'CHGG': { interestRate: -0.1, inflation: 0.0, gdpGrowth: -0.1, unemployment: 0.2, consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'CBRE': { interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4, consumerConfidence: 0.4, housingMarket: 0.7, dollarIndex: -0.2, oilPrice: 0.0 },
  'JLL': { interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.4, consumerConfidence: 0.4, housingMarket: 0.7, dollarIndex: -0.2, oilPrice: 0.0 },
  'ZG': { interestRate: -0.8, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4, consumerConfidence: 0.6, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0 },
  'RDFN': { interestRate: -0.8, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4, consumerConfidence: 0.6, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0 },
  'NEM': { interestRate: -0.7, inflation: 0.7, gdpGrowth: -0.2, unemployment: 0.2, consumerConfidence: -0.3, housingMarket: 0.0, dollarIndex: -0.8, oilPrice: 0.2 },
  'GOLD': { interestRate: -0.7, inflation: 0.7, gdpGrowth: -0.2, unemployment: 0.2, consumerConfidence: -0.3, housingMarket: 0.0, dollarIndex: -0.8, oilPrice: 0.2 },
  'AEM': { interestRate: -0.7, inflation: 0.7, gdpGrowth: -0.2, unemployment: 0.2, consumerConfidence: -0.3, housingMarket: 0.0, dollarIndex: -0.8, oilPrice: 0.2 },
  'WPM': { interestRate: -0.6, inflation: 0.6, gdpGrowth: -0.1, unemployment: 0.1, consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: -0.7, oilPrice: 0.1 },
  'FNV': { interestRate: -0.6, inflation: 0.6, gdpGrowth: -0.1, unemployment: 0.1, consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: -0.7, oilPrice: 0.1 },
  'CHPT': { interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3 },
  'EVGO': { interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3 },
  'BLNK': { interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3 },
  'VRT': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'PWSC': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },

  // ========== 金融 - 补充 (Financial Services) ==========
  // 托管银行 (Custody Banks) - 利率受益，AUM相关
  'BK': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'STT': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'C': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'AIG': {
    interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CBOE': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'IBKR': {
    interestRate: 0.6, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'LPLA': {
    interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'PFG': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LNC': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 保险经纪 (Insurance Brokers)
  'AJG': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'AON': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MMC': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BRO': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'WTW': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CG': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 金融科技 (FinTech)
  'COIN': {
    interestRate: -0.5, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'HOOD': {
    interestRate: 0.3, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'AFRM': {
    interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SOFI': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NU': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'SQ': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PYPL': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 医疗保健 - 补充 (Healthcare) ==========
  'AZN': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'GSK': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'NVS': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MRNA': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ALNY': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BIIB': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 医疗器械 (Medical Devices)
  'BDX': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'BSX': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'EW': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'ZBH': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'WAT': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 医院/医疗服务 (Hospitals & Health Services)
  'HCA': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'UHS': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'THC': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 保险/PBM (MCO/PBM)
  'CNC': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: -0.1, unemployment: 0.2,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CVS': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'WBA': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 远程医疗/数字健康
  'TDOC': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'HIMS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ========== 科技/软件 - 补充 (Tech/Software) ==========
  'DDOG': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SNOW': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TEAM': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NET': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ZS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'FTNT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'DOCU': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'WDAY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MDB': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SPLK': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 网络设备/IT基础设施
  'CIEN': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'JNPR': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'FFIV': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NTAP': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PSTG': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 社交媒体/消费互联网
  'SNAP': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PINS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ROKU': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RDDT': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ZM': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 游戏引擎/元宇宙
  'U': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RBLX': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ATVI': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 消费 - 补充 (Consumer) ==========
  'TGT': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'UAA': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'FL': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'AAP': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'CELH': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ADDYY': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 出行/外卖平台
  'UBER': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.3,
  },
  'DASH': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // ========== 能源 - 补充 (Energy) ==========
  'BP': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.8,
  },
  'SHEL': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.8,
  },
  'TTE': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.8,
  },
  'MPLX': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.5,
  },
  'NRG': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.3,
  },
  'DK': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.6,
  },
  'PBF': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.5,
  },
  'NOV': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.7,
  },
  'LBRT': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.8,
  },
  'HP': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.8,
  },

  // ========== 农业/化工 (Agriculture & Chemicals) ==========
  'ADM': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'BG': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'CF': {
    interestRate: 0.0, inflation: 0.4, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.5,
  },
  'MOS': {
    interestRate: 0.0, inflation: 0.4, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.3,
  },
  'NTR': {
    interestRate: 0.0, inflation: 0.4, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.4,
  },
  'TSN': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'SQM': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.2,
  },
  // 特种化工 (Specialty Chemicals)
  'CE': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.3,
  },
  'EMN': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.3,
  },
  'DD': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // ========== REIT - 补充 (Real Estate Investment Trusts) ==========
  'EXR': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'MAA': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'VNO': {
    interestRate: -0.7, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'VICI': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'OHI': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NNN': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'STAG': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'REXR': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'VTR': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // ========== 航运 - 补充 (Shipping) ==========
  'EGLE': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.5,
  },
  'INSW': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.6,
  },
  'TNK': {
    interestRate: 0.1, inflation: 0.4, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.6,
  },
  'FLNG': {
    interestRate: 0.0, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.4,
  },

  // ========== 其他 - 补充 ==========
  'S': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'H': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ========== 缺失S&P 500 - 补充 ==========
  'SAP': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'INTU': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ADP': {
    interestRate: 0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.4,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ADSK': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GEHC': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'HOLX': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'URI': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'SWK': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'DOV': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'XYL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'OTIS': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CARR': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'DECK': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'AES': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'WEC': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'ES': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'ED': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'D': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'DTE': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'AEE': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'CMS': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'ARE': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ========== 工业/建筑 - 补充 ==========
  'HRI': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'WTS': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TT': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'LII': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'GGG': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ROP': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ---------- 补充: 医疗健康 ----------
  'ALGN': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'PODD': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TECH': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // ---------- 补充: 金融服务 ----------
  'MKTX': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ---------- 补充: 科技 ----------
  'PTC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MANH': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PAYC': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ---------- 补充: 消费/零售 ----------
  'FIVE': {
    interestRate: -0.3, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ---------- 补充: 工业 ----------
  'NDSN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'FTV': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'AME': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.1,
  },

  // ---------- 补充: 能源/材料 ----------
  'OVV': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  'CTRA': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.8,
  },
  'RPM': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ---------- 补充: 30只新增股票 ----------

  // 汽车后市场
  'CPRT': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },

  // 医药包装/灭菌
  'WST': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'STE': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // 生命科学工具
  'ILMN': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 包装
  'SEE': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // 电力设备
  'GNRC': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.2,
  },

  // 特种工业
  'IEX': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'RBC': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'LECO': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'TTC': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 科技仪器/测试
  'TRMB': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TDY': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'ZBRA': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'KEYS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'GRMN': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // 半导体设备
  'BRKS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ACLS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 金融数据/基础设施
  'FICO': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'BR': {
    interestRate: 0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RJF': {
    interestRate: 0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'VIRT': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: -0.2, unemployment: 0.2,
    consumerConfidence: -0.3, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.1,
  },
  'TW': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 商业信息/SaaS
  'CSGP': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'AZPN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.4,
  },

  // IT 服务
  'GLOB': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 国防/政府IT
  'BAH': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'LDOS': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'AXON': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // 金属/材料
  'ATI': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.2,
  },

  // 工业分销
  'WCC': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 新增30只 (2026-01补充) ==========

  // 生物科技/诊断
  'BNTX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'RARE': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IONS': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'EXAS': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'NTRA': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TXG': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 消费/餐饮
  'RVLV': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'CAVA': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'BUD': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // 博彩/娱乐
  'DKNG': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CZR': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: -0.1,
  },
  'MGM': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.1,
  },
  'WYNN': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.2, oilPrice: -0.1,
  },
  'PENN': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 运输物流
  'GXO': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'HUBG': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'WERN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.3,
  },

  // REITs
  'HST': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: -0.2,
  },
  'PK': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.7, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: -0.2,
  },
  'SLG': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'KIM': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CUBE': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 地区银行
  'ZION': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.2, oilPrice: 0.1,
  },
  'NTRS': {
    interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'CMA': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: 0.2, oilPrice: 0.2,
  },

  // 太阳能
  'NOVA': {
    interestRate: -0.7, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.2,
  },
  'ARRY': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'SPWR': {
    interestRate: -0.7, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.2,
  },

  // 建材
  'TREX': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'MAS': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ========== 2026-01 新增30只 ==========

  // 网络安全 - IT预算驱动,低宏观敏感
  'CYBR': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TENB': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'QLYS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'VRNS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RPD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // SaaS/Cloud - 利率负相关(成长股),IT支出正相关
  'PCTY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TWLO': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IOT': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'CFLT': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'DT': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GTLB': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TOST': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 医疗服务 - 防御性,低宏观敏感
  'DVA': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ENSG': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ACHC': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'DOCS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'SGRY': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'AMED': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 材料/矿业 - 大宗商品价格敏感
  'CCJ': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.3,
  },
  'MP': {
    interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.1,
  },

  // 国防 - 政府支出驱动,低宏观敏感
  'KTOS': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'BWXT': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'RKLB': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // 消费零售
  'GPC': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'TSCO': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // 食品 - 防御性/大宗农产品
  'DAR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.5,
  },
  'CALM': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'POST': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'FLO': {
    interestRate: 0.0, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'SFM': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // ---------- 补充: 第四批30只 ----------

  // 天然气E&P - 天然气价格高敏感
  'EQT': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.6,
  },
  'RRC': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },
  'AR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },
  'SWN': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },

  // Permian E&P - 油价高敏感
  'MTDR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  'PR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  'MGY': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.8,
  },

  // 特种制药 - 低宏观敏感(专利药刚需)
  'JAZZ': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'UTHR': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'NBIX': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PCVX': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // 电气/工业设备
  'HUBB': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'FIX': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'AIT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'ALLE': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'WLK': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: -0.3, oilPrice: 0.3,
  },

  // 特种服务 - 防御性
  'SCI': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // REITs - 利率高敏感
  'IRM': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LAMR': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'OUT': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'CPT': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'AMH': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'REG': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'FR': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PEAK': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // 特种零售
  'JWN': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'BOOT': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'BURL': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // 卡车租赁 - 经济周期敏感
  'R': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // ========== 新增30只 - 消费/医疗/金融科技/工业/材料/媒体 ==========

  // 调味品 - 必需消费(防御)
  'MKC': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // Medicaid管理 - 政府合同(防御)
  'MOH': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: -0.1, unemployment: 0.3,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 医疗产品 - 稳定需求
  'BAX': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 专业工具 - 工业周期
  'SNA': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 净租赁REIT - 利率敏感
  'WPC': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 公用事业 - 利率/基建
  'SRE': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.2,
  },
  // 约会平台 - 消费者信心
  'MTCH': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 域名/托管 - SMB支出
  'GDDY': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // CDN/安全 - 互联网流量
  'AKAM': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 消费安全 - 防御型订阅
  'GEN': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // RPA/自动化 - 企业IT支出
  'PATH': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 热水器 - 住房周期
  'AOS': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.6, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 轻资产卡车 - 货运周期
  'LSTR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.3,
  },
  // 卡车经纪 - 货运周期
  'RXO': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },
  // 投资管理技术 - 资本市场
  'SEIC': {
    interestRate: 0.3, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 工业包装 - 经济周期
  'SON': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 铝罐包装 - 饮料消费
  'BLL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },
  // 石膏/水泥 - 建设周期
  'EXP': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 现场娱乐 - 消费者可选
  'LYV': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 薪资SaaS - 就业市场
  'PAYX': {
    interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.4,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 银行核心系统 - 金融IT(防御)
  'JKHY': {
    interestRate: 0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 车队卡/支付 - 物流周期
  'WEX': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.3,
  },
  // 农机 - 农业周期
  'CNH': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },
  // 楼宇自动化 - 建设/改造周期
  'JCI': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1,
  },
  // 商用HVAC - 商业建设周期
  'AAON': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 模拟半导体 - 消费电子周期
  'CRUS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // RF半导体 - 5G/国防周期
  'MTSI': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 数字新闻订阅 - 防御型
  'NYT': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 快休闲 - 消费者可选
  'SHAK': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 财产险 - 防御/利率正相关
  'ERIE': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // ========== 第六批: 餐饮/REIT/SaaS/保险/建材/国防/化工 ==========

  // 休闲餐饮 - 消费者可选/食品成本
  'TXRH': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'EAT': {
    interestRate: -0.3, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },
  // 娱乐餐饮 - 高度可选消费
  'PLAY': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },
  // 公寓REIT - 利率敏感/住房相关
  'ESS': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'UDR': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 特殊REIT - 制造房/RV
  'SUI': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // Enterprise SaaS - 成长型/利率敏感
  'APPN': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BRZE': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ZI': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ESTC': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 云基础设施 - SMB/开发者
  'DOCN': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 高速互连半导体 - 数据中心周期
  'CRDO': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 专业P&C保险 - 利率正相关/防御
  'WRB': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'AFG': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 再保险 - 利率正相关/灾难事件
  'RNR': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'ACGL': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 建材分销 - 住房建设周期
  'GMS': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'BECN': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 地板零售 - 住房/翻新周期
  'FND': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 建材(天花) - 商业建设
  'AWI': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 诊断检验 - 防御型医疗
  'DGX': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LH': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 政府/国防IT - 预算驱动/防御
  'SAIC': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'CACI': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 模拟/分立半导体 - 工业/汽车周期
  'DIOD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'VSH': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 特种化工 - 工业周期/油价
  'AVNT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'OLN': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.3,
  },
  // 餐饮配送 - 餐饮行业周期
  'PFGC': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },
  // 次贷汽车金融 - 利率/信用周期
  'CACC': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: -0.2, unemployment: 0.3,
    consumerConfidence: -0.3, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: -0.1,
  },
  // 便利店 - 防御消费/油价相关
  'CASY': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.3,
  },
  // 床垫/家居 - 住房/消费周期
  'TPX': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: -0.2, oilPrice: -0.1,
  },
  // 家具组件 - 住房/工业周期
  'LEG': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: -0.1,
  },
  // 甜甜圈连锁 - 消费周期
  'DNUT': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 净租赁REIT - 利率敏感/防御
  'EPRT': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'ADC': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 冷链仓储REIT - 食品供应链/防御
  'COLD': {
    interestRate: -0.5, inflation: 0.3, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },
  // 区域银行 - 利率/信贷周期
  'WAL': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.2, oilPrice: 0.0,
  },
  'EWBC': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.3, oilPrice: 0.0,
  },
  'ONB': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'PNFP': {
    interestRate: 0.7, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'OZK': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.6, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'FNB': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 液体活检/基因诊断 - 成长型/低周期敏感
  'GH': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 特种医疗器械 - 中周期/医疗支出
  'TFX': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 牙科设备 - 消费医疗
  'XRAY': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  'NVST': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },
  // 天然气中游 - 油气周期/利率
  'DTM': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },
  'AM': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },
  'WES': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },
  // 炼油 - 油价利差/早周期
  'DINO': {
    interestRate: -0.2, inflation: 0.4, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.7,
  },
  // 综合支付 - GDP/消费周期
  'FOUR': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RPAY': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 泵送/水技术 - 工业周期
  'FELE': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.1,
  },
  // 国防电子 - 政府支出/防御
  'CW': {
    interestRate: 0.0, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.2, oilPrice: 0.1,
  },
  // 泳池/户外 - 住房/消费周期
  'HAYW': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 卫星通信 - 防御/低周期敏感
  'IRDM': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.2, oilPrice: 0.0,
  },
  // 可乐瓶装 - 防御消费
  'COKE': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 鲜粮宠物食品 - 消费周期/宠物经济
  'FRPT': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 阳光带工业REIT - 利率/工业
  'EGP': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 折扣零售 - 防御/反周期(经济差时受益)
  'OLLI': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: -0.2, unemployment: 0.3,
    consumerConfidence: -0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  // CRO - 防御(药企研发支出稳定)
  'MEDP': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ICLR': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 约会社交 - 消费者信心/就业
  'BMBL': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 精密工业 - GDP/工业周期
  'NOVT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 光学/半导体设备 - 资本开支周期
  'COHR': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 商业地产服务 - 利率/地产周期
  'CWK': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // E&S专业保险 - 保费周期
  'KNSL': {
    interestRate: 0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 保险批发 - 保费周期
  'RYAN': {
    interestRate: 0.3, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 深水钻井 - 油价驱动
  'RIG': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  'VAL': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  // 钻井服务 - 油价驱动
  'NBR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  // 建材(门) - 住房周期
  'DOOR': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'JELD': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: -0.2, oilPrice: -0.1,
  },
  // 烈酒 - 防御消费
  'BF.B': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 混合云 - IT支出周期
  'NTNX': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // SMB软件 - 中小企业周期
  'WIX': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SQSP': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 玩具 - 消费者信心/节日
  'HAS': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'MAT': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 休闲鞋 - 消费者可选
  'CROX': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ONON': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // Bakken页岩E&P - 油价驱动
  'CHRD': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  // 波多黎各银行 - 利率/地方经济
  'FBP': {
    interestRate: 0.5, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 约会社交 - 消费者信心
  'GRND': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 数字媒体 - 广告周期
  'IAC': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 本地广告 - SMB广告支出
  'YELP': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // iBuying - 住房周期强敏感
  'OPEN': {
    interestRate: -0.8, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.9, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 月球着陆器 - 政府航天预算
  'LUNR': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 直连卫星 - 科技投资/电信
  'ASTS': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 新增30只: advisory banks, office REITs, E&P, DTC brands, consulting ==========

  // 运动鞋 - 消费者可选
  'SKX': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 工作管理SaaS - IT支出
  'ASAN': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 云内容SaaS - IT支出(成熟)
  'BOX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 排水/基建 - 建设周期
  'WMS': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.6, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // 电气管道 - 建设/电气化
  'ATKR': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // HVAC/检测 - 建设周期
  'SPXC': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1,
  },
  // 科技健康险 - 低周期/政策驱动
  'OSCR': {
    interestRate: 0.2, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 咨询投行 - 资本市场/M&A周期
  'LAZ': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'PIPR': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'EVR': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'HLI': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'PJT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // Permian/Eagle Ford E&P - 油价驱动
  'SM': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.9,
  },
  // 非运营E&P - 油价驱动
  'NOG': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  // 办公REIT - 利率/办公需求
  'KRC': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'DEI': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'HIW': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 多精品资管 - 资本市场
  'VRTS': {
    interestRate: 0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 私募市场 - 资本市场/利率
  'STEP': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0,
  },
  // 超低成本航空 - 消费者可选/油价
  'ALGT': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.5,
  },
  // 微创美容 - 消费医疗
  'INMD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // 药物递送平台 - 低宏观敏感(授权/特许权)
  'HALO': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 景观分销 - 住房/户外
  'SITE': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.6, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // 工程咨询 - 防御型(诉讼/监管刚需)
  'EXPO': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 铜线电缆 - 建设/电气化周期
  'WIRE': {
    interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.1,
  },
  // DTC眼镜 - 消费者可选
  'WRBY': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // 医疗服装DTC - 就业/消费
  'FIGS': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 驾车咖啡连锁 - 消费周期
  'BROS': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  // CNS特药 - 低宏观敏感(专利药刚需)
  'ACAD': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // 鞋类零售 - 消费者可选
  'DBI': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // ========== 新增50家公司宏观敏感度 ==========

  // 地区银行 - 利率/信贷周期
  'NYCB': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'VLY': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'FHN': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SNV': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'HWC': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'WBS': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'COLB': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Tech/SaaS - 利率/增长敏感
  'SMAR': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MQ': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'DSGX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'TWKS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'CERT': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'FLT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.2,
  },

  // Consumer/Retail - 消费/GDP敏感
  'ELF': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BBWI': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'DDS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'GOOS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'SMPL': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'NWSA': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TRUP': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Entertainment/Sports - 消费可选
  'TKO': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'EDR': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SIX': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'SEAS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // REITs - 利率/房地产
  'FRT': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'BRX': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NSA': {
    interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Mortgage Insurance - 住房/利率高度敏感
  'ESNT': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NMIH': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'RDN': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'MTG': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.4, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // 学生贷款 - 利率/就业
  'SLM': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Waste/Environment - 防御性
  'GFL': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'SRCL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Biotech/Pharma - 低宏观敏感(pipeline驱动)
  'LEGN': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BCRX': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'BEAM': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'FOLD': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ARVN': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'KURA': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'IMVT': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Industrials - 工业/GDP周期
  'CSWI': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RRX': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'ESE': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MWA': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LNN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'FSS': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Energy E&P - 油价/增长高敏感
  'TALO': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.9,
  },
  'CRK': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.7,
  },
  'SD': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  // 补充6家
  'SFNC': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SBCF': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'FFIN': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'AX': {
    interestRate: 0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CALX': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IESC': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ========== 追加企业 (2026-01-24) ==========
  'ADBE': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'BRK.B': {
    interestRate: 0.3, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.1,
  },
  'MARA': {
    interestRate: -0.7, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.3,
  },

  // --- 追加50只: S&P 500 Remaining ---
  'MTD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'GL': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'CINF': {
    interestRate: 0.5, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'CNP': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.2,
  },
  'EVRG': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'FE': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'LNT': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'NI': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.3,
  },
  'PNW': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },
  'PPL': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.1,
  },

  // --- Mid-cap Industrials ---
  'LFUS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // --- Mid-cap Tech ---
  'PCOR': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MNDY': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GLBE': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.1,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // --- Consumer/Retail ---
  'WOOF': {
    interestRate: -0.3, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // --- Healthcare ---
  'GDRX': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.2, unemployment: 0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RPRX': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== S&P 400 Midcap 追加 (30 stocks) ==========

  // --- Regional Banks - 利率正相关 ---
  'BANR': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CUBI': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NBTB': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CBSH': {
    interestRate: 0.6, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // --- Insurance ---
  'RLI': {
    interestRate: 0.3, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'PLMR': {
    interestRate: 0.3, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ROOT': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.2,
  },
  'LMND': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'KMPR': {
    interestRate: 0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.2,
  },

  // --- Specialty Industrial ---
  'ROCK': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // --- Tech/SaaS ---
  'ALRM': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ARLO': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RAMP': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PYCR': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CWAN': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NCNO': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'JAMF': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Consumer/Restaurant ---
  'JACK': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'CAKE': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'DINE': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // --- Healthcare ---
  'NVAX': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GKOS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'INSP': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Energy ---
  'STEM': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'FLNC': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'ORA': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.2,
  },

  // --- Materials ---
  'CMC': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'ASPN': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.2,
  },

  // --- REITs ---
  'IIPR': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.3, unemployment: 0.0,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // --- Transportation ---
  'SNDR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.3,
  },

  // --- Specialty Metals ---
  'HAYN': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // --- Gas Utility ---
  'SW': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.3,
  },

  // --- AdTech/Digital ---
  'PUBM': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RSI': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // --- Communications/Software ---
  'BAND': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PAR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'FLYW': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // --- Healthcare ---
  'USPH': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NEO': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'AZTA': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'BIO': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Materials/Mining ---
  'TROX': {
    interestRate: -0.3, inflation: 0.4, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.4, oilPrice: 0.1,
  },
  'CC': {
    interestRate: -0.3, inflation: 0.4, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.4, oilPrice: 0.1,
  },
  'SMID': {
    interestRate: -0.4, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'UEC': {
    interestRate: -0.4, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'DNN': {
    interestRate: -0.4, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.1,
  },
  'MAXN': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // --- Energy ---
  'SLDP': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.2,
  },
  'RIOT': {
    interestRate: -0.7, inflation: 0.5, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'CLSK': {
    interestRate: -0.7, inflation: 0.5, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.2,
  },

  // --- Consumer/Retail ---
  'COLM': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'ACI': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'GO': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.1,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'PLCE': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'GIII': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'LOVE': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ARHS': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.5, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'MUSA': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.3,
  },
  'PZZA': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'BLMN': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'JJSF': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'SNBR': {
    interestRate: -0.3, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'FIZZ': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'IRBT': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Transport/Logistics ---
  'HTLD': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: -0.5,
  },
  'GATX': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'CSV': {
    interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // --- Specialty Vehicles ---
  'REVG': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // --- Industrials ---
  'THS': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'BERY': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'HURN': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ICF': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // --- Semiconductors/Electronics ---
  'LITE': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'VIAV': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Outdoor Equipment ---
  'YETI': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'CLAR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // ========== 追加 (2026-01-24 batch 2) ==========

  // --- Water Utilities ---
  'WTRG': {
    interestRate: 0.6, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'CWT': {
    interestRate: 0.6, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SJW': {
    interestRate: 0.6, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // --- Consumer/Retail ---
  'SHOO': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'FAT': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'DENN': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'SKY': {
    interestRate: -0.6, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'EXPI': {
    interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'PNTG': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // --- Homebuilders ---
  'GRBK': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'CCS': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'MHO': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'LGIH': {
    interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.5,
    consumerConfidence: 0.6, housingMarket: 0.8, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // --- Energy/Materials ---
  'CVI': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.6,
  },
  'ZEUS': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1,
  },
  'RES': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },
  'PUMP': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },
  'AMR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // --- Building Products ---
  'IBP': {
    interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // --- Technology/Software ---
  'ACIW': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CGNX': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PD': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PRGS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // --- Other ---
  'SLGN': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'TDW': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.8,
  },
  'CRAI': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'LNTH': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // --- S&P 600 Small-Cap Additions ---

  // Healthcare/MedTech
  'OMCL': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NVCR': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PRCT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'IRTC': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'TNDM': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Semiconductors/Tech
  'POWI': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'AMBA': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'CEVA': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'RMBS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'PI': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // Industrials
  'ESAB': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'SPSC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'NVRI': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },
  'SKYW': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Consumer/Restaurant
  'BJRI': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'KRUS': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'LOCO': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'PRDO': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: -0.2, unemployment: 0.4,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Regional Banks
  'GBCI': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'TOWN': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'HOPE': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'OFG': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'UMBF': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'ABCB': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },

  // Energy
  'REPX': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },
  'CIVI': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },
  'HLX': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },
  'ARCH': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1,
  },

  // S&P 600 Consumer/Retail
  'SCVL': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'LESL': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'PLNT': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'XPOF': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'EYE': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Biotech
  'MDGL': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'KRYS': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Industrial Equipment
  'POWL': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'MIDD': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'EPAC': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // Specialty Finance
  'TREE': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'WRLD': {
    interestRate: 0.3, inflation: -0.2, gdpGrowth: -0.2, unemployment: 0.4,
    consumerConfidence: -0.3, housingMarket: -0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'EZPW': {
    interestRate: 0.3, inflation: -0.2, gdpGrowth: -0.2, unemployment: 0.4,
    consumerConfidence: -0.3, housingMarket: -0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Regional Banks
  'FCNCA': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'IBOC': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'CADE': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },

  // Transportation
  'ARCB': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.4,
  },
  'MRTN': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.4,
  },
  'FWRD': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.4,
  },

  // REITs
  'TRNO': {
    interestRate: -0.6, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Specialty Chemicals
  'HWKN': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'KWR': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'IOSP': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'CBT': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'BCPC': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // Insurance
  'HCI': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Gaming/Casino
  'GDEN': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'RRR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'CHDN': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // AdTech/Marketing
  'IAS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'ZETA': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CARG': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // RV/Recreation
  'LCII': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.3,
  },
  'WGO': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.3,
  },
  'CWH': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.3,
  },
  'FOXF': {
    interestRate: -0.4, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.3,
  },

  // Auto Parts
  'MPAA': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'LKQ': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // Food/Staples
  'JBSS': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'BGS': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'UTZ': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },
  'HAIN': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // Healthcare Services
  'CHE': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'NHC': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ADUS': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Real Estate Services
  'NMRK': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'RMR': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'HHH': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Education
  'LRN': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: -0.2, unemployment: 0.3,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ATGE': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: -0.2, unemployment: 0.3,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Staffing
  'KFRC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.6,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'KELYA': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.5, unemployment: -0.6,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Environmental
  'MEG': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },

  // SaaS
  'FRSH': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // ========== 新增19只 (2026-01-24) ==========

  // Security/Services
  'ADT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Childcare
  'BFAM': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Entertainment
  'CNK': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.4,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'IMAX': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Shipping
  'DAC': {
    interestRate: 0.1, inflation: 0.2, gdpGrowth: 0.7, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: 0.3,
  },

  // Housing/Furnishing
  'ETD': {
    interestRate: -0.5, inflation: -0.3, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.7, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'FBIN': {
    interestRate: -0.5, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.8, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'TMHC': {
    interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.6, unemployment: -0.4,
    consumerConfidence: 0.5, housingMarket: 0.9, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'REZI': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'WHR': {
    interestRate: -0.6, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.8, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // Leisure/Travel
  'FUN': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: -0.1,
  },
  'LVS': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // Tech/Platform
  'GRAB': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.2,
  },
  'LOGI': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0,
  },
  'OLED': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // Luxury
  'LVMUY': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: -0.4, oilPrice: 0.0,
  },

  // Aesthetics
  'SKIN': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Health Supplements
  'USNA': {
    interestRate: 0.0, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NUS': {
    interestRate: 0.0, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // ========== 新增29只 (Gene Editing/Biotech/FinTech/Infra等) ==========

  // Gene Editing/Biotech
  'TWST': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'CRSP': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'NTLA': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RXRX': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Clean Energy (Hydrogen)
  'PLUG': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },

  // FinTech/Payments
  'UPST': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'RELY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PAYO': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Software/Analytics
  'VRNT': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'TYL': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'APPF': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Banking/Finance SaaS
  'ALKT': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'HQY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Infrastructure/Construction
  'ASTE': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'ROAD': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'PRIM': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'STRL': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'TTEK': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },
  'GLDD': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // Construction Materials
  'KNF': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'APOG': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: -0.1,
  },
  'UFPI': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.4, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // Diagnostics/Life Science
  'CDNA': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'MYGN': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'OLINK': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Death Care/Industrial
  'MATW': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Agriculture
  'ANDE': {
    interestRate: -0.1, inflation: 0.3, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // Digital Infrastructure
  'DBRG': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Industrial Auctions
  'RBA': {
    interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // Specialty Chemicals/Coatings
  'AXTA': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'FUL': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },
  'ESI': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // Insurance
  'SIGI': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'ORI': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'THG': {
    interestRate: 0.4, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Healthcare IT
  'NXGN': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PINC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'HCAT': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PHR': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Jewelry Retail
  'SIG': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // Auto Service
  'MNRO': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Lingerie Retail
  'VSCO': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Defense
  'AVAV': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'MRCY': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Semiconductor
  'SYNA': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },
  'SITM': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: -0.1,
  },

  // Blood Management
  'HAE': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Biotech
  'RVMD': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'PTCT': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Marine/Recreation
  'BC': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.2,
  },
  'HZO': {
    interestRate: -0.4, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.7, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.2,
  },

  // Casino
  'MCRI': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // BPO
  'CNXC': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Diversified Industrial
  'SXI': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // Chip Architecture/IP
  'ARM': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // Grocery Delivery
  'CART': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Premium Footwear
  'BIRK': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // LatAm/SE Asia E-commerce
  'MELI': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'SE': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },
  'PDD': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.5, oilPrice: -0.1,
  },

  // Chinese Tech
  'BABA': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'JD': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },
  'BIDU': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.4, oilPrice: -0.1,
  },

  // Chinese Biotech
  'BGNE': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // EV/eVTOL
  'JOBY': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },
  'PSNY': {
    interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.3,
  },

  // Steel
  'X': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.4, oilPrice: 0.1,
  },

  // Mining
  'VALE': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.5, oilPrice: 0.1,
  },
  'RIO': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.5, oilPrice: 0.1,
  },
  'BHP': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.6, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.5, oilPrice: 0.1,
  },

  // LNG Export
  'LNG': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.6,
  },

  // ========== 补充: 2026-01 第八批 ==========

  // Biotech
  'XENE': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'SWTX': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'KYMR': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  'RCKT': {
    interestRate: -0.5, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Casino REIT
  'GLPI': {
    interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Healthcare REITs
  'MPW': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'SBRA': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  'DOC': {
    interestRate: -0.6, inflation: 0.1, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Fast Casual Restaurant
  'PTLO': {
    interestRate: -0.2, inflation: -0.3, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Convenience/Fuel
  'ARKO': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.2,
  },

  // School Bus Manufacturing
  'BLBD': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.2,
  },

  // E&P
  'VTLE': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },
  'GPOR': {
    interestRate: -0.2, inflation: 0.3, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.7,
  },

  // Banking-as-a-Service
  'TBBK': {
    interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Regional Bank
  'FFBC': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },
  'WSBC': {
    interestRate: 0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.4,
    consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.1, oilPrice: 0.0,
  },

  // Mental Health Services
  'LFST': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.1,
    consumerConfidence: -0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Home Infusion
  'OPCH': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Post-Acute Care (same as home infusion profile)
  'PACS': {
    interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Dental/Medical Distribution
  'HSIC': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'PDCO': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Gaming Technology
  'EVERI': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  'CXT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },

  // Cable/Broadband
  'ATUS': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Pro Sports/Venues
  'MSGS': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'MSGE': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Specialty Manufacturing
  'TRS': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.1,
  },

  // HR/PEO Services
  'TNET': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.5,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // IT Distribution
  'NSIT': {
    interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Photomasks
  'PLAB': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // Consumer Products
  'HELE': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.2,
    consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Fragrances
  'IPAR': {
    interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },

  // Eggs/Food
  'VITL': {
    interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.0, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1,
  },

  // Specialty Food Distribution
  'CHEF': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Hotel REITs
  'RLJ': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'SHO': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'PEB': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'RHP': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },
  'APLE': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2,
  },

  // Power Equipment
  'GEV': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.2,
  },

  // Nuclear/Power Generation
  'TLN': {
    interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.1,
  },

  // Regulated Utility
  'PCG': {
    interestRate: 0.6, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },
  'EIX': {
    interestRate: 0.6, inflation: -0.2, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.0, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1,
  },

  // Fiber Broadband
  'FYBR': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0,
  },

  // Networking Infrastructure
  'BDC': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Enterprise AI
  'AI': {
    interestRate: -0.4, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // All-Flash Storage
  'PURE': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Surgical Robotics
  'GMED': {
    interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Interventional Medical Devices
  'MMSI': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // Mobility Technology
  'VNT': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.2,
  },

  // Cannabis
  'TLRY': {
    interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // BPO/Digital Operations
  'G': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },

  // ========== 新增15只股票 (2026-01 batch) ==========

  // Medical Devices - CPAP/Ventilators
  'RMD': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.0,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // Biotech - FcRn antibodies
  'ARGX': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // Waste Management - defensive
  'WCN': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.2,
  },
  // Building Materials - cement/aggregates
  'CRH': {
    interestRate: -0.5, inflation: 0.1, gdpGrowth: 0.6, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: -0.2, oilPrice: -0.2,
  },
  // Korean E-commerce
  'CPNG': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.4, oilPrice: -0.1,
  },
  // Music Labels - defensive
  'WMG': {
    interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.1, unemployment: -0.1,
    consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
  },
  // Aerospace Components
  'MOG.A': {
    interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.2, oilPrice: 0.1,
  },
  // Genetic Testing
  'FLGT': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.1, unemployment: 0.0,
    consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0,
  },
  // Simulation Software
  'ALTR': {
    interestRate: -0.3, inflation: 0.0, gdpGrowth: 0.4, unemployment: -0.2,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // Banking SaaS
  'QTWO': {
    interestRate: 0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.2,
    consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // Modular Flooring
  'TILE': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3,
    consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: -0.2, oilPrice: -0.1,
  },
  // DTC Outdoor Brands
  'DTC': {
    interestRate: -0.3, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3,
    consumerConfidence: 0.6, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: -0.1,
  },
  // BPO/Outsourcing
  'TASK': {
    interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0,
  },
  // Mortgage Servicing
  'COOP': {
    interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.3,
    consumerConfidence: 0.4, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0,
  },
  // Oil Gathering Midstream
  'HESM': {
    interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.5,
  },
  // Specialty Foods
  'LANC': {
    interestRate: -0.1, inflation: -0.2, gdpGrowth: 0.2, unemployment: -0.1,
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
  'XOM': ['Oil & Gas Chain', 'Chemicals', 'Aviation Chain', 'Tanker Shipping'],
  'CVX': ['Oil & Gas Chain', 'Chemicals', 'Aviation Chain', 'Tanker Shipping'],
  'SLB': ['Oilfield Services', 'Oil & Gas Chain', 'LNG Shipping'],
  'HAL': ['Oilfield Services', 'Oil & Gas Chain'],
  'EOG': ['Oil & Gas Chain', 'Midstream'],
  'VLO': ['Refining', 'Aviation Chain', 'Trucking', 'Product Tanker'],
  'MPC': ['Refining', 'Midstream', 'Retail'],
  'WMB': ['Midstream', 'Natural Gas', 'Utilities'],
  'DOW': ['Chemicals', 'Plastics', 'Packaging'],

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

  // 金融 - 跨行业基础设施
  'JPM': ['Banking', 'Investment Banking', 'Asset Management', 'Consumer Finance', 'Real Estate'],
  'BAC': ['Banking', 'Wealth Management', 'Consumer Finance', 'Real Estate'],
  'GS': ['Investment Banking', 'Trading', 'Asset Management', 'Private Equity'],
  'MS': ['Investment Banking', 'Wealth Management', 'Trading', 'Asset Management'],
  'BLK': ['Asset Management', 'ETF', 'Technology', 'ESG'],
  'BX': ['Private Equity', 'Real Estate', 'Credit', 'Infrastructure'],
  'SPGI': ['Ratings', 'Index', 'Commodities', 'Analytics'],
  'CME': ['Derivatives', 'Commodities', 'Interest Rates', 'FX'],

  // 医疗健康 - 产业链交叉
  'JNJ': ['Big Pharma', 'Medical Devices', 'Consumer Health'],
  'UNH': ['Managed Care', 'PBM', 'Healthcare IT', 'Provider Services'],
  'CVS': ['Pharmacy Retail', 'PBM', 'Managed Care', 'Healthcare Services'],
  'TMO': ['Life Sciences Tools', 'Diagnostics', 'Pharma Services', 'Bioprocessing'],
  'DHR': ['Life Sciences Tools', 'Diagnostics', 'Environmental', 'Industrial'],
  'ABT': ['Medical Devices', 'Diagnostics', 'Nutrition', 'Diabetes Care'],
  'MCK': ['Drug Distribution', 'Specialty Pharma', 'Healthcare IT', 'Oncology'],

  // 半导体 - 跨链补充
  'TXN': ['Semiconductor Chain', 'Auto Chain', 'Industrial Chain'],
  'ADI': ['Semiconductor Chain', 'Industrial Chain', 'Auto Chain', 'Healthcare'],
  'MCHP': ['Semiconductor Chain', 'Industrial Chain', 'Auto Chain', 'IoT'],
  'WOLF': ['Semiconductor Chain', 'EV/Auto Chain', 'Energy Infrastructure'],

  // 航空 - 跨链
  'EADSY': ['Aviation Chain', 'Defense', 'Space', 'Helicopter'],
  'SAFRY': ['Aviation Chain', 'Defense', 'Helicopter', 'Propulsion'],

  // 锂/电池 - 跨链补充
  'LTHM': ['EV/Auto Chain', 'Energy Storage', 'Consumer Electronics'],
  'LAC': ['EV/Auto Chain', 'Energy Storage'],

  // 运输 - 跨链补充
  'CP': ['Rail Freight', 'Agriculture', 'Energy', 'Industrial Chain'],
  'CNI': ['Rail Freight', 'Agriculture', 'Energy', 'Consumer Retail Chain'],

  // 农业 - 跨链
  'CTVA': ['Agriculture', 'Chemicals', 'Biotech'],
  'ADM': ['Agriculture', 'Food Chain', 'Biofuels', 'Nutrition'],

  // 矿业 - 跨链
  'TECK': ['Mining', 'Steel Chain', 'EV/Auto Chain', 'Energy'],

  // 基础设施 - 跨链
  'AMT': ['Telecom Infrastructure', 'Data Centers', 'Fiber', '5G'],
  'CCI': ['Telecom Infrastructure', 'Small Cells', 'Fiber', '5G'],

  // 工业气体 - 跨多个产业链
  'APD': ['Industrial Gases', 'Semiconductor Chain', 'Healthcare', 'Energy', 'Steel Chain'],
  'LIN': ['Industrial Gases', 'Semiconductor Chain', 'Healthcare', 'Energy', 'Chemicals'],

  // 工业综合 - 跨链
  'HON': ['Industrial Chain', 'Aviation Chain', 'Building Tech', 'Defense', 'Oil & Gas Chain'],
  'GE': ['Aviation Chain', 'Energy', 'Healthcare', 'Industrial Chain'],
  'MMM': ['Industrial Chain', 'Healthcare', 'Consumer', 'Electronics', 'Auto Chain'],

  // 建材/化工 - 跨链
  'SHW': ['Coatings', 'Construction Chain', 'Auto Chain', 'Industrial Chain'],
  'PPG': ['Coatings', 'Auto Chain', 'Aviation Chain', 'Construction Chain'],
  'ECL': ['Chemicals', 'Food Chain', 'Healthcare', 'Hospitality', 'Industrial Chain'],
  'DD': ['Specialty Chemicals', 'Electronics', 'Auto Chain', 'Construction Chain'],

  // 零售/消费 - 跨链
  'WMT': ['Consumer Retail Chain', 'Grocery', 'Pharmacy', 'Financial Services', 'Logistics'],
  'COST': ['Consumer Retail Chain', 'Grocery', 'Travel', 'Financial Services'],
  'PG': ['Consumer Staples', 'Grocery', 'Mass Retail', 'E-commerce', 'Beauty'],
  'KO': ['Beverages', 'QSR', 'Mass Retail', 'Hospitality'],

  // 科技平台 - 跨链
  'AAPL': ['Consumer Electronics', 'Semiconductor Chain', 'Streaming', 'Payments', 'Healthcare'],
  'META': ['Social Media', 'Advertising', 'VR/AR', 'E-commerce'],
  'CRM': ['Enterprise SaaS', 'E-commerce', 'Healthcare', 'Financial Services'],

  // 包装 - 跨链
  'IP': ['Paper Packaging', 'E-commerce', 'Consumer Retail Chain', 'Industrial Chain'],
  'BALL': ['Metal Packaging', 'Beverages', 'Aerospace'],

  // 电信 - 跨链
  'TMUS': ['Wireless', 'Streaming', 'IoT', 'Enterprise'],
  'VZ': ['Wireless', 'Fiber', 'Enterprise', 'IoT'],

  // 保险 - 跨产业链
  'BRK.B': ['Insurance', 'Energy', 'Rail', 'Consumer', 'Real Estate'],
  'AIG': ['P&C Insurance', 'Life Insurance', 'Commercial', 'Real Estate'],

  // 大型科技服务 - 跨链
  'ACN': ['IT Consulting', 'Healthcare IT', 'Financial Services', 'Government', 'Industrial'],
  'IBM': ['Tech/Cloud Chain', 'Healthcare IT', 'Financial Services', 'AI'],

  // 汽车OEM - 跨链
  'F': ['Auto Chain', 'EV Chain', 'Financial Services', 'Fleet/Commercial'],
  'GM': ['Auto Chain', 'EV Chain', 'Financial Services', 'Autonomous Driving'],
  'TSLA': ['EV Chain', 'Energy Storage', 'Solar', 'AI/Autonomous'],

  // 防务/航空 - 跨链
  'LMT': ['Defense', 'Aviation Chain', 'Space', 'Cybersecurity'],
  'RTX': ['Defense', 'Aviation Chain', 'Cybersecurity', 'Missile'],
  'NOC': ['Defense', 'Space', 'Cybersecurity', 'Autonomous'],
  'BA': ['Aviation Chain', 'Defense', 'Space', 'Satellite'],
  'GD': ['Defense', 'Aviation Chain', 'Marine', 'IT Services'],

  // 零售平台 - 跨链
  'TGT': ['Consumer Retail Chain', 'Grocery', 'Apparel', 'Beauty'],
  'HD': ['Home Improvement', 'Construction Chain', 'Pro Services'],
  'LOW': ['Home Improvement', 'Construction Chain', 'Appliances'],

  // 食品/消费品 - 跨链
  'PEP': ['Beverages', 'Snacks', 'Mass Retail', 'QSR'],
  'MDLZ': ['Snacks', 'Confectionery', 'Mass Retail', 'International'],
  'CL': ['Consumer Staples', 'Oral Care', 'Pet Nutrition', 'Mass Retail'],
  'KMB': ['Consumer Staples', 'Healthcare', 'Professional', 'Mass Retail'],

  // 科技平台 - 补充
  'NFLX': ['Streaming', 'Content', 'Consumer Tech', 'Advertising'],
  'DIS': ['Entertainment', 'Streaming', 'Theme Parks', 'Consumer Products'],
  'UBER': ['Ride-hailing', 'Food Delivery', 'Freight', 'Advertising'],

  // 工业自动化 - 跨链
  'ROK': ['Industrial Automation', 'Auto Chain', 'Oil & Gas Chain', 'Mining'],
  'EMR': ['Industrial Automation', 'Energy', 'HVAC', 'Software'],
  'ETN': ['Electrical Equipment', 'Data Centers', 'Auto Chain', 'Aviation Chain'],

  // REITs - 跨链
  'PLD': ['Industrial REIT', 'E-commerce', 'Logistics', 'Data Centers'],
  'DLR': ['Data Center REIT', 'Tech/Cloud Chain', 'Telecom', 'Enterprise'],
  'SPG': ['Retail REIT', 'Apparel', 'Restaurants', 'Entertainment'],

  // 材料 - 跨链
  'FCX': ['Copper Mining', 'EV Chain', 'Construction Chain', 'Electronics'],
  'NEM': ['Gold Mining', 'Precious Metals', 'Inflation Hedge'],

  // 公用事业/可再生 - 跨链
  'NEE': ['Utilities', 'Solar', 'Wind', 'Energy Storage'],
  'ENPH': ['Solar', 'Energy Storage', 'EV Charging', 'Smart Home'],

  // 新增S&P 500 - 跨链
  'SAP': ['Enterprise Software', 'Cloud', 'AI', 'Supply Chain'],
  'INTU': ['SMB Software', 'Tax/Accounting', 'Financial Services', 'AI'],
  'ADP': ['HCM/Payroll', 'Insurance', 'Financial Services', 'Data'],
  'ADSK': ['Design Software', 'Construction Chain', 'Manufacturing', 'Media'],
  'GEHC': ['Healthcare', 'Medical Imaging', 'AI', 'Pharma Diagnostics'],
  'URI': ['Equipment Rental', 'Construction Chain', 'Industrial Chain', 'Energy'],
  'IR': ['Industrial Chain', 'Oil & Gas Chain', 'HVAC', 'Food & Beverage'],
  'CARR': ['HVAC', 'Fire Safety', 'Construction Chain', 'Cold Chain'],
  'OTIS': ['Building Systems', 'Construction Chain', 'IoT', 'Smart Building'],
  'XYL': ['Water Infrastructure', 'Utilities', 'Industrial Chain', 'Smart Meters'],

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
