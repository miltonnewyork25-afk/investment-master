/**
 * Fill Macro Sensitivity gaps - 143 missing entries
 * Format: { interestRate, inflation, gdpGrowth, unemployment, consumerConfidence, housingMarket, dollarIndex, oilPrice }
 */
import * as fs from 'fs';
import * as path from 'path';

type MacroVector = {
  interestRate: number;
  inflation: number;
  gdpGrowth: number;
  unemployment: number;
  consumerConfidence: number;
  housingMarket: number;
  dollarIndex: number;
  oilPrice: number;
};

const NEW_ENTRIES: Record<string, MacroVector> = {
  // === mREITs (very interest rate sensitive, benefit from stable/lower rates) ===
  'ABR': { interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'ACRE': { interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: -0.1 },
  'AGNC': { interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },
  'ARI': { interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: -0.1 },
  'EFC': { interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'IVR': { interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },
  'LADR': { interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: -0.1 },
  'MFA': { interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'MITT': { interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'NLY': { interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },
  'NYMT': { interestRate: -0.7, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'PMT': { interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },
  'RWT': { interestRate: -0.7, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.6, dollarIndex: 0.0, oilPrice: -0.1 },
  'STWD': { interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: -0.1 },
  'TWO': { interestRate: -0.8, inflation: -0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },
  'PFSI': { interestRate: -0.6, inflation: -0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: -0.1 },

  // === Regional Banks ===
  'AUB': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'BANF': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.1 },
  'BPOP': { interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0 },
  'CATY': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: -0.1, oilPrice: 0.0 },
  'CPF': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'CVBF': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'HMST': { interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0 },
  'ISBC': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'KRNY': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0 },
  'QCRH': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'RNST': { interestRate: 0.4, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },

  // === Insurance/Asset Management/BDC ===
  'AEL': { interestRate: 0.5, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'AGM': { interestRate: 0.2, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0 },
  'AIZ': { interestRate: 0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'AMG': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0 },
  'AMP': { interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.5, housingMarket: 0.2, dollarIndex: -0.1, oilPrice: 0.0 },
  'BN': { interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: -0.2, oilPrice: 0.1 },
  'CNA': { interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'FHI': { interestRate: -0.1, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.4, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'HMN': { interestRate: 0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'MCY': { interestRate: 0.2, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: -0.1 },
  'RGA': { interestRate: 0.3, inflation: -0.1, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'SPNT': { interestRate: 0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'MAIN': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'PSEC': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },
  'SLRC': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.1, dollarIndex: 0.0, oilPrice: 0.0 },

  // === REITs ===
  'ESRT': { interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.4, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.1 },
  'GOOD': { interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0 },
  'HPP': { interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: -0.1 },
  'INN': { interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: -0.2 },
  'SAFE': { interestRate: -0.5, inflation: 0.4, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'XHR': { interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2 },

  // === Technology/Software (growth, rate-sensitive negatively) ===
  'ADTN': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'AVPT': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'BCOV': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'BLKB': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'CCCS': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'CGNT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'CLPS': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'CXM': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'DUOT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'EBIX': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'EGHT': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'EIGI': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'ENFN': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'EPIQ': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'ESMT': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'EXLS': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'FARO': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0 },
  'FORR': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'IRNT': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'LVOX': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'MCHX': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'MIND': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'MODN': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'MSTR': { interestRate: -0.4, inflation: 0.3, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
  'OPRX': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'OSPN': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'PLTK': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'QADA': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'SABR': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.5, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: -0.2 },
  'SSTI': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1, consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'TTGT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'UPLD': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'GSKY': { interestRate: -0.5, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.4, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: 0.0 },
  'SEAT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.6, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1 },
  'MICT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },

  // === Industrial/Aerospace/Defense ===
  'ATEN': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'CMTL': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'DRS': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'HEICO': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1 },
  'MOG-A': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'LLAP': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'B': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'ATRO': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'RAVN': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'GNSS': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: 0.1, consumerConfidence: 0.0, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },

  // === Industrial: Manufacturing/Materials ===
  'AMKR': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
  'AMSC': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1 },
  'CIR': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.1 },
  'GTLS': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.3 },
  'LPX': { interestRate: -0.4, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.7, dollarIndex: 0.0, oilPrice: 0.0 },
  'MLI': { interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0 },
  'MTRN': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'LEDS': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.3, oilPrice: 0.0 },
  'PLPC': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0 },
  'PNR': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: -0.2, oilPrice: 0.0 },
  'OFLX': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: -0.1, oilPrice: 0.0 },
  'KRNT': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },

  // === Transport/Logistics ===
  'ATSG': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.3 },
  'HOG': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.6, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.2 },
  'RUSHA': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1 },
  'UHAL': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.5, dollarIndex: 0.0, oilPrice: -0.1 },
  'VRRM': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'WNC': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1 },
  'ALSN': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1 },

  // === Energy ===
  'BTBT': { interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
  'CORZ': { interestRate: -0.3, inflation: 0.3, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
  'BLDP': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.2 },
  'BWEN': { interestRate: -0.3, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.2 },
  'AGR': { interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.1 },
  'NKLA': { interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.2 },
  'TMC': { interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },

  // === Biotech/Pharma (low macro sensitivity, R&D driven) ===
  'CYRX': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: -0.1 },
  'SGHT': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'CDMO': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },

  // === Consumer/Retail ===
  'HRB': { interestRate: 0.0, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'OXM': { interestRate: -0.2, inflation: -0.2, gdpGrowth: 0.4, unemployment: -0.3, consumerConfidence: 0.5, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: -0.1 },
  'VVV': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: -0.1 },

  // === Oil & Gas Services ===
  'TTI': { interestRate: -0.1, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.6 },

  // === Misc Industrial ===
  'HDS': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.1, oilPrice: 0.0 },
  'AIN': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'AHH': { interestRate: -0.5, inflation: 0.2, gdpGrowth: 0.3, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'AJRD': { interestRate: -0.1, inflation: 0.1, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'ACTG': { interestRate: -0.1, inflation: 0.0, gdpGrowth: 0.2, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.0, oilPrice: 0.0 },
  'ADS': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.4, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'AEYE': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'APTI': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'BKSY': { interestRate: -0.2, inflation: 0.0, gdpGrowth: 0.3, unemployment: -0.1, consumerConfidence: 0.1, housingMarket: 0.0, dollarIndex: 0.1, oilPrice: 0.0 },
  'BLX': { interestRate: 0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
  'BBU': { interestRate: -0.2, inflation: 0.2, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.1, dollarIndex: -0.2, oilPrice: 0.0 },
  'BOTZ': { interestRate: -0.3, inflation: -0.1, gdpGrowth: 0.5, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.2, oilPrice: 0.0 },
  'MFGP': { interestRate: -0.2, inflation: -0.1, gdpGrowth: 0.4, unemployment: -0.1, consumerConfidence: 0.2, housingMarket: 0.0, dollarIndex: -0.1, oilPrice: 0.0 },
  'MGRC': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.2, housingMarket: 0.2, dollarIndex: 0.0, oilPrice: 0.0 },
  'MMI': { interestRate: -0.4, inflation: 0.1, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.3, housingMarket: 0.4, dollarIndex: 0.0, oilPrice: 0.0 },
  'WSC': { interestRate: -0.3, inflation: 0.2, gdpGrowth: 0.5, unemployment: -0.3, consumerConfidence: 0.2, housingMarket: 0.3, dollarIndex: 0.0, oilPrice: 0.0 },
  'TIGO': { interestRate: -0.2, inflation: 0.1, gdpGrowth: 0.4, unemployment: -0.2, consumerConfidence: 0.3, housingMarket: 0.0, dollarIndex: -0.3, oilPrice: 0.0 },
};

// Read the file
const filePath = path.resolve(process.cwd(), 'src/relation-graph/config/company-profiles.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find MACRO_SENSITIVITY object closing
// Look for the pattern: end of MACRO_SENSITIVITY before the next export
const macroStart = content.indexOf('export const MACRO_SENSITIVITY');
if (macroStart === -1) {
  console.error('Could not find MACRO_SENSITIVITY');
  process.exit(1);
}

// Find the closing }; after MACRO_SENSITIVITY start
// We need to find the right closing brace - it's the one that matches the opening
const afterMacro = content.slice(macroStart);
let braceCount = 0;
let closingPos = -1;
for (let i = 0; i < afterMacro.length; i++) {
  if (afterMacro[i] === '{') braceCount++;
  if (afterMacro[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      closingPos = macroStart + i;
      break;
    }
  }
}

if (closingPos === -1) {
  console.error('Could not find closing of MACRO_SENSITIVITY');
  process.exit(1);
}

// Generate entries
const lines: string[] = ['\n  // === GAP FILL: 143 Missing Macro Entries ==='];
for (const [symbol, vec] of Object.entries(NEW_ENTRIES)) {
  lines.push(`  '${symbol}': { interestRate: ${vec.interestRate}, inflation: ${vec.inflation}, gdpGrowth: ${vec.gdpGrowth}, unemployment: ${vec.unemployment}, consumerConfidence: ${vec.consumerConfidence}, housingMarket: ${vec.housingMarket}, dollarIndex: ${vec.dollarIndex}, oilPrice: ${vec.oilPrice} },`);
}

const insertion = lines.join('\n');

// Insert before the closing }
const newContent = content.slice(0, closingPos) + insertion + '\n' + content.slice(closingPos);
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log(`Added ${Object.keys(NEW_ENTRIES).length} macro sensitivity entries`);
console.log('File updated successfully.');
