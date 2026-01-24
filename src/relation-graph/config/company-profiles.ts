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
    demographics: { ageGroup: 'gen_x', incomeLevel: 'middle', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'west-coast'],
    valueProps: ['reliability', 'loyalty', 'value', 'premium_economy'],
    channels: ['online', 'direct'],
  },
  'SAVE': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'value', gender: 'all' },
    occasions: ['travel', 'vacation', 'budget-travel', 'leisure'],
    valueProps: ['low_price', 'point-to-point', 'no-frills'],
    channels: ['online', 'direct'],
  },
  'ULCC': {
    demographics: { ageGroup: 'millennial', incomeLevel: 'value', gender: 'all' },
    occasions: ['travel', 'vacation', 'budget-travel', 'leisure'],
    valueProps: ['low_price', 'frequency', 'no-frills'],
    channels: ['online', 'direct'],
  },

  // ========== 汽车OEM/经销商 - 补充 ==========
  'STLA': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'middle', gender: 'all' },
    occasions: ['commute', 'family', 'outdoor', 'work'],
    valueProps: ['brand_variety', 'SUV', 'truck', 'value'],
    channels: ['retail', 'direct'],
  },
  'TM': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
    occasions: ['commute', 'family', 'reliability', 'daily-use'],
    valueProps: ['reliability', 'resale_value', 'hybrid', 'efficiency'],
    channels: ['retail'],
  },
  'HMC': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
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
    demographics: { ageGroup: 'millennial', incomeLevel: 'middle', gender: 'all' },
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
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
    occasions: ['vehicle-purchase', 'service', 'trade-in', 'financing'],
    valueProps: ['selection', 'value', 'service', 'one-stop'],
    channels: ['retail', 'online'],
  },
  'CAR': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'temporary-transport'],
    valueProps: ['convenience', 'selection', 'price', 'flexibility'],
    channels: ['online', 'retail'],
  },
  'HTZ': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
    occasions: ['travel', 'vacation', 'business-travel', 'temporary-transport'],
    valueProps: ['convenience', 'brand', 'selection', 'loyalty'],
    channels: ['online', 'retail'],
  },

  // ========== 旅游/电商/零售 - 补充 ==========
  'TRIP': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
    occasions: ['travel', 'vacation', 'restaurants', 'research'],
    valueProps: ['reviews', 'price_comparison', 'user_content', 'planning'],
    channels: ['online'],
  },
  'MTH': {
    demographics: { ageGroup: 'gen_x', incomeLevel: 'middle', gender: 'all' },
    occasions: ['home-purchase', 'family', 'relocation', 'first-home'],
    valueProps: ['value', 'design', 'energy_efficiency', 'community'],
    channels: ['direct', 'online'],
  },
  'IHG': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'all' },
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
    demographics: { ageGroup: 'millennial', incomeLevel: 'middle', gender: 'female' },
    occasions: ['gifts', 'home-decor', 'handmade', 'personalized'],
    valueProps: ['unique', 'handmade', 'personalized', 'artisan'],
    channels: ['online'],
  },
  'TJX': {
    demographics: { ageGroup: 'all', incomeLevel: 'middle', gender: 'female' },
    occasions: ['shopping', 'bargain', 'fashion', 'home-decor'],
    valueProps: ['value', 'brands', 'treasure_hunt', 'savings'],
    channels: ['retail'],
  },
  'ROST': {
    demographics: { ageGroup: 'all', incomeLevel: 'value', gender: 'female' },
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
    demographics: { ageGroup: 'millennial', incomeLevel: 'middle', gender: 'all' },
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
  'U': 'early',        // Unity - 游戏引擎
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
  // 游戏/元宇宙
  'U': {
    interestRate: -0.4, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1,
    consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0,
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
