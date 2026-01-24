/**
 * Fill Business Model gaps - adds 156 missing entries
 */
import * as fs from 'fs';
import * as path from 'path';

const NEW_ENTRIES: Record<string, {
  assetModel: string;
  revenueModels: string[];
  deliveryModel: string;
  customerModel: string;
  industrySegment: string;
  tags: string[];
}> = {
  // === FINANCIAL: mREITs ===
  'ABR': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'multifamily', 'bridge_loans', 'agency'] },
  'ACRE': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Mortgage REIT', tags: ['mREIT', 'commercial', 'senior_loans', 'transitional'] },
  'AGNC': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Agency Mortgage REIT', tags: ['mREIT', 'agency_MBS', 'leveraged', 'interest_rate_sensitive'] },
  'ARI': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Mortgage REIT', tags: ['mREIT', 'commercial', 'first_mortgage', 'transitional'] },
  'EFC': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'trading'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'non_agency', 'CLO', 'reverse_mortgage'] },
  'IVR': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Agency Mortgage REIT', tags: ['mREIT', 'agency_MBS', 'RMBS', 'CMBS'] },
  'LADR': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Mortgage REIT', tags: ['mREIT', 'commercial', 'balance_sheet', 'conduit'] },
  'MFA': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'residential', 'non_agency', 'credit_sensitive'] },
  'MITT': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'residential', 'non_agency', 'securitization'] },
  'NLY': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Agency Mortgage REIT', tags: ['mREIT', 'agency_MBS', 'largest_mREIT', 'leveraged'] },
  'NYMT': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'credit_sensitive', 'multi_strategy', 'residential'] },
  'PMT': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'correspondent', 'MSR', 'credit_risk_transfer'] },
  'RWT': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mortgage REIT', tags: ['mREIT', 'jumbo', 'residential', 'securitization'] },
  'STWD': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Mortgage REIT', tags: ['mREIT', 'commercial', 'infrastructure', 'diversified'] },
  'TWO': { assetModel: 'asset_heavy', revenueModels: ['interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Agency Mortgage REIT', tags: ['mREIT', 'agency_MBS', 'MSR', 'interest_rate'] },

  // === FINANCIAL: Regional Banks ===
  'AUB': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['community_bank', 'Virginia', 'commercial_lending'] },
  'BANF': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['community_bank', 'Oklahoma', 'commercial_lending'] },
  'BPOP': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Puerto_Rico', 'Caribbean', 'commercial_lending'] },
  'CATY': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Asian_American', 'California', 'CRE_lending'] },
  'CFR': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'wealth_management'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Texas', 'wealth_management', 'commercial_lending'] },
  'CPF': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Hawaii', 'community_bank', 'island_economy'] },
  'CVBF': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Regional Banking', tags: ['California', 'business_banking', 'SBA_lending'] },
  'FIBK': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'wealth_management'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Pacific_Northwest', 'Montana', 'commercial_lending'] },
  'HMST': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Pacific_Northwest', 'multifamily', 'commercial_lending'] },
  'ISBC': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['New_Jersey', 'community_bank', 'commercial_lending'] },
  'KRNY': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['New_Jersey', 'thrift', 'multifamily'] },
  'PPBI': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Regional Banking', tags: ['California', 'business_banking', 'SBA'] },
  'QCRH': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'wealth_management'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Midwest', 'Iowa', 'trust_services'] },
  'RNST': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Southeast', 'Mississippi', 'community_bank'] },
  'TCBI': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'treasury_management'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Regional Banking', tags: ['Texas', 'commercial', 'treasury_solutions'] },
  'UBSI': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['West_Virginia', 'community_bank', 'multi_state'] },
  'WSFS': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'wealth_management'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Delaware', 'wealth_management', 'commercial'] },
  'WTFC': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income', 'wealth_management'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Regional Banking', tags: ['Chicago', 'commercial', 'wealth_management'] },

  // === FINANCIAL: Insurance/Asset Management/BDC ===
  'AEL': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'investment_income'], deliveryModel: 'partner_network', customerModel: 'B2C', industrySegment: 'Life Insurance & Annuities', tags: ['fixed_annuities', 'indexed', 'retirement'] },
  'AGM': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'guarantee_fees'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Agricultural Finance', tags: ['Farmer_Mac', 'agricultural', 'rural_lending', 'GSE'] },
  'AIZ': { assetModel: 'asset_light', revenueModels: ['premium_income', 'fee_income'], deliveryModel: 'partner_network', customerModel: 'B2B2C', industrySegment: 'Specialty Insurance', tags: ['renters', 'mobile', 'specialty', 'connected_living'] },
  'AMG': { assetModel: 'asset_light', revenueModels: ['management_fees', 'performance_fees'], deliveryModel: 'partner_network', customerModel: 'B2B', industrySegment: 'Asset Management', tags: ['multi_affiliate', 'alternatives', 'institutional'] },
  'AMP': { assetModel: 'asset_light', revenueModels: ['advisory_fees', 'management_fees', 'premium_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Wealth Management', tags: ['financial_planning', 'asset_management', 'insurance'] },
  'BN': { assetModel: 'asset_heavy', revenueModels: ['management_fees', 'performance_fees', 'investment_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Alternative Asset Management', tags: ['infrastructure', 'real_estate', 'renewable', 'private_equity'] },
  'CNA': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'investment_income'], deliveryModel: 'partner_network', customerModel: 'B2B', industrySegment: 'Commercial Insurance', tags: ['P&C', 'specialty', 'commercial_lines', 'surety'] },
  'FHI': { assetModel: 'asset_light', revenueModels: ['management_fees', 'advisory_fees'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Asset Management', tags: ['ESG', 'stewardship', 'fixed_income', 'equity'] },
  'HMN': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'investment_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Specialty Insurance', tags: ['educators', 'niche', 'retirement', 'auto'] },
  'MCY': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'investment_income'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Auto Insurance', tags: ['personal_auto', 'homeowners', 'California'] },
  'RGA': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Reinsurance', tags: ['life_reinsurance', 'mortality', 'longevity', 'global'] },
  'SPNT': { assetModel: 'asset_heavy', revenueModels: ['premium_income', 'investment_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Reinsurance', tags: ['insurtech', 'specialty', 'reinsurance', 'MGA'] },
  'MAIN': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'equity_gains'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'lower_middle_market', 'internal_management'] },
  'PSEC': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'middle_market', 'diversified_lending'] },
  'SLRC': { assetModel: 'asset_heavy', revenueModels: ['interest_income', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Business Development Company', tags: ['BDC', 'specialty_lending', 'cash_flow', 'asset_based'] },

  // === FINANCIAL: Mortgage/Fintech ===
  'PFSI': { assetModel: 'asset_light', revenueModels: ['fee_income', 'interest_income'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Mortgage Origination', tags: ['correspondent', 'servicing', 'technology', 'production'] },
  'UWMC': { assetModel: 'asset_light', revenueModels: ['fee_income', 'interest_income'], deliveryModel: 'partner_network', customerModel: 'B2B2C', industrySegment: 'Mortgage Origination', tags: ['wholesale', 'broker_channel', 'largest_wholesale'] },
  'LC': { assetModel: 'platform', revenueModels: ['fee_income', 'interest_income'], deliveryModel: 'digital', customerModel: 'B2C', industrySegment: 'Digital Banking', tags: ['marketplace_lending', 'personal_loans', 'fintech', 'digital_bank'] },
  'BLND': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Mortgage Technology', tags: ['digital_lending', 'mortgage_automation', 'cloud'] },

  // === REITs ===
  'CTO': { assetModel: 'asset_heavy', revenueModels: ['rental_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Diversified REIT', tags: ['retail', 'mixed_use', 'net_lease'] },
  'DEA': { assetModel: 'asset_heavy', revenueModels: ['rental_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Government REIT', tags: ['federal_government', 'GSA', 'mission_critical'] },
  'ESRT': { assetModel: 'asset_heavy', revenueModels: ['rental_income', 'observatory_revenue'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Office REIT', tags: ['NYC', 'Empire_State_Building', 'office', 'retail'] },
  'GMRE': { assetModel: 'asset_heavy', revenueModels: ['rental_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Healthcare REIT', tags: ['medical_office', 'net_lease', 'outpatient'] },
  'GOOD': { assetModel: 'asset_heavy', revenueModels: ['rental_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Net Lease REIT', tags: ['industrial', 'office', 'net_lease', 'diversified'] },
  'HPP': { assetModel: 'asset_heavy', revenueModels: ['rental_income', 'studio_revenue'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Office & Studio REIT', tags: ['West_Coast', 'tech_tenants', 'studio', 'office'] },
  'INN': { assetModel: 'asset_heavy', revenueModels: ['room_revenue', 'F&B'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Hotel REIT', tags: ['premium_branded', 'select_service', 'upscale'] },
  'JBGS': { assetModel: 'asset_heavy', revenueModels: ['rental_income', 'development'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Mixed-Use REIT', tags: ['DC_metro', 'mixed_use', 'placemaking', 'development'] },
  'PDM': { assetModel: 'asset_heavy', revenueModels: ['rental_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Office REIT', tags: ['Sunbelt', 'Class_A', 'office'] },
  'SAFE': { assetModel: 'asset_heavy', revenueModels: ['ground_lease_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Ground Lease REIT', tags: ['ground_lease', 'long_duration', 'inflation_linked'] },
  'XHR': { assetModel: 'asset_heavy', revenueModels: ['room_revenue', 'F&B'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Hotel REIT', tags: ['luxury', 'upper_upscale', 'group', 'urban'] },

  // === TECHNOLOGY: SaaS/Software ===
  'ACCD': { assetModel: 'asset_light', revenueModels: ['subscription', 'fee_income'], deliveryModel: 'digital', customerModel: 'B2B2C', industrySegment: 'Healthcare Navigation', tags: ['health_navigation', 'benefits', 'advocacy', 'virtual_care'] },
  'AVPT': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Cloud Management Software', tags: ['Microsoft_365', 'data_management', 'governance', 'SaaS'] },
  'BCOV': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Video Platform', tags: ['OTT', 'video_hosting', 'streaming', 'enterprise'] },
  'BIGC': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'E-commerce Platform', tags: ['headless', 'open_SaaS', 'B2B_commerce', 'enterprise'] },
  'BLKB': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Nonprofit Technology', tags: ['fundraising', 'nonprofit', 'education', 'CRM'] },
  'CCCS': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Insurance Technology', tags: ['claims', 'AI', 'auto_insurance', 'network'] },
  'CGNT': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Security Analytics', tags: ['SIGINT', 'analytics', 'intelligence', 'government'] },
  'CXM': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Customer Experience Management', tags: ['social', 'CX', 'unified', 'AI', 'enterprise'] },
  'EBIX': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Insurance Technology', tags: ['insurance_exchange', 'SaaS', 'fintech', 'India'] },
  'ENFN': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Investment Management Software', tags: ['portfolio_management', 'OEMS', 'cloud_native', 'hedge_fund'] },
  'EXLS': { assetModel: 'asset_light', revenueModels: ['premium_service', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Analytics & BPO', tags: ['data_analytics', 'AI', 'operations', 'insurance'] },
  'INOD': { assetModel: 'asset_light', revenueModels: ['premium_service', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'AI Data Services', tags: ['data_annotation', 'AI_training', 'NLP', 'digital'] },
  'LPSN': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Conversational AI', tags: ['chatbot', 'messaging', 'AI', 'customer_engagement'] },
  'LVOX': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Contact Center Software', tags: ['CCaaS', 'cloud', 'AI', 'workforce_optimization'] },
  'MCHX': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Digital Analytics', tags: ['call_analytics', 'conversational', 'attribution', 'AI'] },
  'MIND': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Telecom BSS', tags: ['billing', 'telecom', 'VoIP', 'mediation'] },
  'MODN': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Revenue Management Software', tags: ['pharma', 'medtech', 'pricing', 'compliance'] },
  'MSTR': { assetModel: 'asset_light', revenueModels: ['subscription', 'product_sales'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Business Intelligence & Bitcoin', tags: ['BI', 'analytics', 'bitcoin_treasury', 'cloud'] },
  'NEWR': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Observability Platform', tags: ['APM', 'monitoring', 'cloud', 'full_stack'] },
  'NICE': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'CX & Compliance Software', tags: ['CCaaS', 'workforce', 'compliance', 'AI', 'cloud'] },
  'OLO': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Restaurant Technology', tags: ['digital_ordering', 'delivery', 'payments', 'restaurants'] },
  'OSPN': { assetModel: 'asset_light', revenueModels: ['subscription', 'product_sales'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Digital Identity Security', tags: ['e_signature', 'identity', 'authentication', 'banking'] },
  'QADA': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Manufacturing ERP', tags: ['ERP', 'supply_chain', 'manufacturing', 'cloud'] },
  'RNG': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Unified Communications', tags: ['UCaaS', 'CCaaS', 'video', 'cloud', 'messaging'] },
  'SUMO': { assetModel: 'asset_light', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Cloud SIEM', tags: ['log_analytics', 'security', 'observability', 'cloud_native'] },
  'TTGT': { assetModel: 'asset_light', revenueModels: ['subscription', 'advertising'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'B2B Intent Data', tags: ['purchase_intent', 'content_marketing', 'demand_gen', 'tech_media'] },
  'UPLD': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Work Management Software', tags: ['cloud', 'digital_media', 'knowledge_management', 'roll_up'] },
  'VTEX': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'E-commerce Platform', tags: ['marketplace', 'composable', 'Latin_America', 'enterprise'] },
  'WK': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Regulatory Reporting Software', tags: ['SEC_filing', 'ESG', 'compliance', 'XBRL', 'cloud'] },
  'EGHT': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Unified Communications', tags: ['UCaaS', 'CPaaS', 'contact_center', 'cloud'] },
  'PLTK': { assetModel: 'asset_light', revenueModels: ['in_app_purchases', 'advertising'], deliveryModel: 'digital', customerModel: 'B2C', industrySegment: 'Mobile Gaming', tags: ['casual', 'social_casino', 'mobile', 'live_ops'] },
  'SABR': { assetModel: 'platform', revenueModels: ['transaction_fees', 'subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Travel Technology', tags: ['GDS', 'airline', 'hotel', 'booking'] },

  // === TECHNOLOGY: Hardware/Measurement ===
  'ADTN': { assetModel: 'asset_light', revenueModels: ['product_sales', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Networking Equipment', tags: ['fiber', 'broadband', 'access', 'telecom'] },
  'AEIS': { assetModel: 'asset_light', revenueModels: ['product_sales', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Power Electronics', tags: ['power_supply', 'semiconductor_process', 'industrial', 'precision'] },
  'ATEN': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Network Security Appliances', tags: ['cybersecurity', 'DDoS', 'load_balancer', 'ADC'] },
  'CMTL': { assetModel: 'asset_light', revenueModels: ['product_sales', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Defense Communications', tags: ['satellite', 'tactical', 'next_gen_911', 'troposcatter'] },
  'DUOT': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'AI Vision Technology', tags: ['rail_inspection', 'AI', 'machine_vision', 'security'] },
  'FARO': { assetModel: 'asset_light', revenueModels: ['product_sales', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: '3D Measurement', tags: ['metrology', 'laser_scanning', 'quality', 'digital_twin'] },
  'LEDS': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'LED Manufacturing', tags: ['LED_chips', 'epitaxial', 'lighting', 'UV'] },
  'ESMT': { assetModel: 'asset_light', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Payments & Engagement Software', tags: ['billing', 'payments', 'government', 'healthcare'] },

  // === TECHNOLOGY: Crypto/Digital Assets ===
  'BTBT': { assetModel: 'asset_heavy', revenueModels: ['mining_revenue'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Bitcoin Mining', tags: ['bitcoin', 'mining', 'HPC', 'staking'] },
  'CORZ': { assetModel: 'asset_heavy', revenueModels: ['mining_revenue', 'hosting'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Bitcoin Mining & HPC', tags: ['bitcoin', 'mining', 'data_center', 'HPC', 'AI'] },

  // === BIOTECH/PHARMA ===
  'ACLX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cell Therapy Biotech', tags: ['CAR-T', 'oncology', 'next_gen', 'clinical_stage'] },
  'AVXL': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Neuroscience Biotech', tags: ['sigma_receptor', 'Alzheimers', 'Parkinsons', 'clinical_stage'] },
  'BCYC': { assetModel: 'asset_light', revenueModels: ['licensing', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Peptide Therapeutics Biotech', tags: ['bicycle_peptides', 'immuno_oncology', 'targeted', 'platform'] },
  'BTAI': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Neuroscience Biotech', tags: ['AI_drug_discovery', 'agitation', 'sedation', 'sublingual'] },
  'CLDX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Antibody Biotech', tags: ['monoclonal_antibodies', 'oncology', 'autoimmune', 'clinical'] },
  'CMPS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Psychedelic Medicine', tags: ['psilocybin', 'mental_health', 'depression', 'novel_mechanism'] },
  'CPRX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Pharma', tags: ['rare_disease', 'neuromuscular', 'LEMS', 'orphan_drug'] },
  'CRNX': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Endocrine Biotech', tags: ['somatostatin', 'acromegaly', 'neuroendocrine', 'oral'] },
  'CRVS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Immuno-Oncology Biotech', tags: ['checkpoint', 'adenosine', 'oncology', 'clinical_stage'] },
  'CYRX': { assetModel: 'asset_light', revenueModels: ['premium_service', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Cold Chain Logistics', tags: ['cryogenic', 'cell_therapy', 'biopharma', 'temperature'] },
  'ELAN': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Animal Health', tags: ['pet', 'livestock', 'parasiticides', 'vaccines'] },
  'ERAS': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Oncology Biotech', tags: ['RAS', 'MAPK', 'precision_oncology', 'clinical_stage'] },
  'ETNB': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Metabolic Disease Biotech', tags: ['NASH', 'liver', 'FGF21', 'clinical_stage'] },
  'FUSN': { assetModel: 'asset_light', revenueModels: ['product_sales', 'licensing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Radiopharmaceutical Biotech', tags: ['targeted_alpha', 'oncology', 'radiotherapy', 'clinical'] },
  'GPCR': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'GPCR-Targeted Biotech', tags: ['GPCR', 'small_molecule', 'obesity', 'metabolic', 'structure_based'] },
  'KVUE': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Consumer Health', tags: ['OTC', 'skincare', 'self_care', 'Tylenol', 'Neutrogena'] },
  'OPRX': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Pharma Marketing Technology', tags: ['HCP_engagement', 'pharma', 'digital_health', 'messaging'] },
  'SGHT': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Ophthalmic Devices', tags: ['glaucoma', 'MIGS', 'dry_eye', 'minimally_invasive'] },
  'SDGR': { assetModel: 'asset_light', revenueModels: ['subscription', 'licensing', 'collaboration'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Computational Drug Discovery', tags: ['physics_based', 'molecular_simulation', 'AI', 'platform'] },
  'NABL': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'IT Management Software', tags: ['MSP', 'RMM', 'backup', 'security', 'SMB'] },

  // === INDUSTRIAL/TRANSPORT ===
  'FTAI': { assetModel: 'asset_heavy', revenueModels: ['leasing', 'maintenance_revenue'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Aviation Leasing & MRO', tags: ['jet_engines', 'CFM56', 'leasing', 'aftermarket'] },
  'GFF': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Building & Home Products', tags: ['doors', 'defense', 'home_improvement', 'diversified'] },
  'HCC': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Metallurgical Coal Mining', tags: ['met_coal', 'steelmaking', 'mining', 'premium'] },
  'TRN': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'leasing'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Railcar Manufacturing', tags: ['railcar', 'leasing', 'infrastructure', 'maintenance'] },
  'MMI': { assetModel: 'asset_light', revenueModels: ['commission', 'fee_income'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Commercial Real Estate Brokerage', tags: ['investment_sales', 'CRE', 'brokerage', 'capital_markets'] },
  'NKLA': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Electric & Hydrogen Trucks', tags: ['BEV', 'FCEV', 'hydrogen', 'Class_8', 'truck'] },
  'ASH': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Specialty Chemicals', tags: ['additives', 'pharma_excipients', 'coatings', 'personal_care'] },
  'MOG-A': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Precision Motion Control', tags: ['aerospace', 'defense', 'actuators', 'flight_controls'] },
  'LLAP': { assetModel: 'asset_heavy', revenueModels: ['product_sales', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Small Satellite Manufacturing', tags: ['smallsat', 'LEO', 'earth_observation', 'defense'] },
  'NVEE': { assetModel: 'asset_light', revenueModels: ['premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Infrastructure Consulting', tags: ['engineering', 'environmental', 'geotechnical', 'technology'] },

  // === MEDIA/CONSUMER ===
  'FOXA': { assetModel: 'asset_heavy', revenueModels: ['advertising', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B2C', industrySegment: 'Media & Broadcasting', tags: ['news', 'sports', 'cable', 'broadcast', 'Fox'] },
  'VZIO': { assetModel: 'asset_light', revenueModels: ['product_sales', 'advertising'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Consumer Electronics & AdTech', tags: ['smart_TV', 'advertising', 'platform', 'SmartCast'] },
  'CATO': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Value Apparel Retail', tags: ['value', 'women', 'plus_size', 'rural'] },
  'PRPL': { assetModel: 'asset_heavy', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Sleep Products', tags: ['mattress', 'DTC', 'hyper_elastic', 'comfort_tech'] },
  'SEAT': { assetModel: 'platform', revenueModels: ['transaction_fees', 'subscription'], deliveryModel: 'digital', customerModel: 'B2C', industrySegment: 'Event Ticketing', tags: ['secondary_tickets', 'live_events', 'marketplace', 'loyalty'] },
  'HRB': { assetModel: 'asset_light', revenueModels: ['premium_service', 'product_sales'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Tax Preparation Services', tags: ['tax', 'DIY', 'assisted', 'financial_products'] },

  // === TELECOM ===
  'TIGO': { assetModel: 'asset_heavy', revenueModels: ['subscription', 'usage_fees'], deliveryModel: 'self_operated', customerModel: 'B2C', industrySegment: 'Emerging Market Telecom', tags: ['Latin_America', 'Africa', 'mobile', 'cable', 'fintech'] },

  // === MISC: ETF/Other ===
  'BOTZ': { assetModel: 'asset_light', revenueModels: ['management_fees'], deliveryModel: 'digital', customerModel: 'B2C', industrySegment: 'Thematic ETF', tags: ['robotics', 'AI', 'automation', 'ETF'] },
  'MICT': { assetModel: 'platform', revenueModels: ['transaction_fees', 'advertising'], deliveryModel: 'digital', customerModel: 'B2C', industrySegment: 'Fintech Platform', tags: ['insurance', 'trading', 'emerging_markets'] },

  // === RESEARCH/CONSULTING ===
  'FORR': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Technology Research', tags: ['research', 'advisory', 'consulting', 'tech_strategy'] },

  // === MISC TECH/SERVICES ===
  'CLPS': { assetModel: 'asset_light', revenueModels: ['premium_service'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'IT Services', tags: ['fintech_services', 'banking_IT', 'China', 'outsourcing'] },
  'APTI': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Digital Advertising', tags: ['programmatic', 'DSP', 'data_management', 'identity'] },
  'EPIQ': { assetModel: 'asset_light', revenueModels: ['premium_service', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Legal Services Technology', tags: ['legal', 'e_discovery', 'bankruptcy', 'restructuring'] },
  'EVTC': { assetModel: 'asset_light', revenueModels: ['transaction_fees', 'subscription'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Payment Processing', tags: ['Latin_America', 'merchant_acquiring', 'ATM', 'processing'] },
  'PRCH': { assetModel: 'platform', revenueModels: ['subscription', 'transaction_fees', 'advertising'], deliveryModel: 'digital', customerModel: 'B2B2C', industrySegment: 'Home Services Platform', tags: ['insurance', 'moving', 'home_warranty', 'marketplace'] },
  'GSKY': { assetModel: 'platform', revenueModels: ['transaction_fees', 'interest_income'], deliveryModel: 'digital', customerModel: 'B2B2C', industrySegment: 'Home Improvement Fintech', tags: ['POS_lending', 'home_improvement', 'BNPL'] },
  'IRNT': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Cybersecurity', tags: ['network_detection', 'behavioral_analytics', 'government'] },
  'EIGI': { assetModel: 'asset_light', revenueModels: ['subscription', 'premium_service'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Endpoint Management', tags: ['web_hosting', 'email', 'SMB', 'cloud'] },
  'ALEC': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Neuroscience Biotech', tags: ['neurodegeneration', 'immuno_neurology', 'progranulin', 'clinical'] },
  'SSTI': { assetModel: 'asset_light', revenueModels: ['subscription'], deliveryModel: 'digital', customerModel: 'B2B', industrySegment: 'Public Safety Technology', tags: ['gunshot_detection', 'acoustic', 'law_enforcement', 'smart_city'] },
  'DICE': { assetModel: 'asset_light', revenueModels: ['product_sales'], deliveryModel: 'self_operated', customerModel: 'B2B', industrySegment: 'Oral Immunology Biotech', tags: ['oral_biologics', 'immunology', 'inflammation', 'clinical'] },
};

// Read the file
const filePath = path.resolve(process.cwd(), 'src/relation-graph/config/business-models.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Find the closing }; of BUSINESS_MODEL_PROFILES (first occurrence)
const closingIndex = content.indexOf('\n};');
if (closingIndex === -1) {
  console.error('Could not find closing };');
  process.exit(1);
}

// Generate the new entries
const lines: string[] = [];
let currentCategory = '';
for (const [symbol, profile] of Object.entries(NEW_ENTRIES)) {
  const entry = `  '${symbol}': {
    assetModel: '${profile.assetModel}',
    revenueModels: [${profile.revenueModels.map(r => `'${r}'`).join(', ')}],
    deliveryModel: '${profile.deliveryModel}',
    customerModel: '${profile.customerModel}',
    industrySegment: '${profile.industrySegment}',
    tags: [${profile.tags.map(t => `'${t}'`).join(', ')}],
  },`;
  lines.push(entry);
}

const insertion = '\n  // === GAP FILL: 156 Missing Entries ===\n' + lines.join('\n');

// Insert before the closing };
const newContent = content.slice(0, closingIndex) + insertion + content.slice(closingIndex);
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log(`Added ${Object.keys(NEW_ENTRIES).length} entries to business-models.ts`);
console.log('File updated successfully.');
