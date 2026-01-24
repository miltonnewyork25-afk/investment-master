/**
 * 配置管理
 * 支持 YAML 配置文件和版本化
 */

import * as fs from 'fs';
import * as path from 'path';
import { defaultScoringConfig } from '../data/mock-data.js';
import type { ScoringConfig } from '../types/index.js';

// 简单的 YAML 解析器（支持基础格式）
function parseSimpleYAML(content: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = content.split('\n');
  const stack: { obj: Record<string, unknown>; indent: number }[] = [{ obj: result, indent: -2 }];

  for (const line of lines) {
    // 跳过空行和注释
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
    if (!match) continue;

    const indent = match[1].length;
    const key = match[2].trim();
    let value: unknown = match[3].trim();

    // 移除行内注释
    if (typeof value === 'string') {
      const commentIndex = value.indexOf('#');
      if (commentIndex > 0) {
        value = value.substring(0, commentIndex).trim();
      }
    }

    // 弹出缩进级别
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (value === '' || value === undefined) {
      // 嵌套对象
      const newObj: Record<string, unknown> = {};
      parent[key] = newObj;
      stack.push({ obj: newObj, indent });
    } else {
      // 解析值类型
      if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (/^-?\d+$/.test(value as string)) value = parseInt(value as string, 10);
      else if (/^-?\d+\.\d+$/.test(value as string)) value = parseFloat(value as string);
      else if ((value as string).startsWith('"') && (value as string).endsWith('"')) {
        value = (value as string).slice(1, -1);
      }
      parent[key] = value;
    }
  }

  return result;
}

// 加载 YAML 配置文件
function loadYAMLConfig<T>(filename: string): T | null {
  const configPath = path.join(process.cwd(), 'config', filename);
  if (!fs.existsSync(configPath)) {
    return null;
  }
  const content = fs.readFileSync(configPath, 'utf-8');
  return parseSimpleYAML(content) as T;
}

// 应用配置类型
interface AppConfig {
  sec: {
    base_url: string;
    user_agent: string;
    rate_limit: number;
    cache_ttl: number;
  };
  paths: {
    cache: string;
    output: string;
    mock: string;
  };
  mode: 'mock' | 'live';
  ir?: {
    allowed_domains: string[];
    fetch_pdf: boolean;
  };
}

// 应用配置结果类型
interface LoadedAppConfig {
  sec: {
    baseUrl: string;
    userAgent: string;
    rateLimit: number;
    cacheTTL: number;
  };
  paths: {
    cache: string;
    output: string;
    mock: string;
  };
  mode: 'mock' | 'live';
  ir?: {
    allowedDomains: string[];
    fetchPdf: boolean;
  };
}

// 加载应用配置
function loadAppConfig(): LoadedAppConfig {
  const yamlConfig = loadYAMLConfig<AppConfig>('app.yaml');

  if (yamlConfig) {
    return {
      sec: {
        baseUrl: yamlConfig.sec?.base_url || 'https://data.sec.gov',
        userAgent: yamlConfig.sec?.user_agent || 'InvestmentMaster/1.0 (contact@example.com)',
        rateLimit: yamlConfig.sec?.rate_limit || 10,
        cacheTTL: yamlConfig.sec?.cache_ttl || 24 * 60 * 60 * 1000,
      },
      paths: {
        cache: yamlConfig.paths?.cache || './data/cache',
        output: yamlConfig.paths?.output || './data/output',
        mock: yamlConfig.paths?.mock || './data/mock',
      },
      mode: (process.env.MODE as 'mock' | 'live') || yamlConfig.mode || 'mock',
      ir: yamlConfig.ir ? {
        allowedDomains: yamlConfig.ir.allowed_domains || [],
        fetchPdf: yamlConfig.ir.fetch_pdf || false,
      } : undefined,
    };
  }

  // 回退到默认配置
  return {
    sec: {
      baseUrl: 'https://data.sec.gov',
      userAgent: 'InvestmentMaster/1.0 (contact@example.com)',
      rateLimit: 10,
      cacheTTL: 24 * 60 * 60 * 1000,
    },
    paths: {
      cache: './data/cache',
      output: './data/output',
      mock: './data/mock',
    },
    mode: (process.env.MODE as 'mock' | 'live') || 'mock',
  };
}

export const config = loadAppConfig();

// 评分配置 YAML 类型
interface ScoringYAMLConfig {
  version: string;
  effective_date: string;
  thresholds: {
    pe_overvalued: number;
    pe_undervalued: number;
    ev_ebit_overvalued: number;
    gm_healthy: number;
    roic_good: number;
  };
  weights: {
    valuation: number;
    evidence: number;
    momentum: number;
  };
  evidence_weights: {
    A: number;
    B: number;
    C: number;
  };
}

// 加载评分配置
export function getScoringConfig(): ScoringConfig {
  const yamlConfig = loadYAMLConfig<ScoringYAMLConfig>('scoring.yaml');

  if (yamlConfig) {
    return {
      version: yamlConfig.version || '1.0.0',
      effective_date: yamlConfig.effective_date || new Date().toISOString().split('T')[0],
      thresholds: {
        pe_overvalued: yamlConfig.thresholds?.pe_overvalued ?? 40,
        pe_undervalued: yamlConfig.thresholds?.pe_undervalued ?? 15,
        ev_ebit_overvalued: yamlConfig.thresholds?.ev_ebit_overvalued ?? 35,
        gm_healthy: yamlConfig.thresholds?.gm_healthy ?? 0.40,
        roic_good: yamlConfig.thresholds?.roic_good ?? 0.15,
      },
      weights: {
        valuation: yamlConfig.weights?.valuation ?? 0.35,
        evidence: yamlConfig.weights?.evidence ?? 0.40,
        momentum: yamlConfig.weights?.momentum ?? 0.25,
      },
      evidence_weights: {
        A: yamlConfig.evidence_weights?.A ?? 1.0,
        B: yamlConfig.evidence_weights?.B ?? 0.7,
        C: yamlConfig.evidence_weights?.C ?? 0.4,
      },
    };
  }

  // 回退到默认配置
  return defaultScoringConfig;
}

// 心理学评分配置类型
export interface PsychologyConfig {
  cycle_adjustments: {
    trough: number;         // 底部额外加分
    early_recovery: number; // 早期恢复加分
    mid_cycle: number;      // 中周期无调整
    peak: number;           // 顶部额外减分
  };
  contrarian: {
    bonus: number;          // 群体极端恐惧时加分
    penalty: number;        // 群体极端贪婪时减分
  };
  loss_aversion: {
    lambda: number;         // 损失厌恶系数
    sell_threshold: number; // 强制卖出信号的评分阈值
    hold_threshold: number; // 强制持有信号的评分阈值
  };
  marginal_signal: {
    first_confirming: number;    // 第1个确认信号价值
    second_confirming: number;   // 第2个确认信号价值
    third_confirming: number;    // 第3个确认信号价值
    first_contrary: number;      // 第1个反向信号价值(溢价)
  };
}

// 加载心理学配置
export function getPsychologyConfig(): PsychologyConfig {
  // 从psychology-scoring.yaml加载，回退到默认值
  const yamlConfig = loadYAMLConfig<Record<string, unknown>>('psychology-scoring.yaml');

  if (yamlConfig) {
    const cycleMap = yamlConfig.cycle_psychology_map as Record<string, unknown> | undefined;
    const biasCorrections = yamlConfig.bias_corrections as Record<string, unknown> | undefined;
    const marginal = yamlConfig.marginal_analysis as Record<string, unknown> | undefined;

    return {
      cycle_adjustments: {
        trough: (cycleMap?.trough as Record<string, unknown>)?.score_adjustment as number ?? 10,
        early_recovery: (cycleMap?.early_recovery as Record<string, unknown>)?.score_adjustment as number ?? 5,
        mid_cycle: (cycleMap?.mid_cycle as Record<string, unknown>)?.score_adjustment as number ?? 0,
        peak: (cycleMap?.peak as Record<string, unknown>)?.score_adjustment as number ?? -10,
      },
      contrarian: {
        bonus: (biasCorrections?.herding as Record<string, unknown>)?.contrarian_bonus as number ?? 15,
        penalty: (biasCorrections?.herding as Record<string, unknown>)?.contrarian_penalty as number ?? -15,
      },
      loss_aversion: {
        lambda: 2.25,
        sell_threshold: 30,
        hold_threshold: 70,
      },
      marginal_signal: {
        first_confirming: 1.0,
        second_confirming: 0.7,
        third_confirming: 0.4,
        first_contrary: 1.5,
      },
    };
  }

  // 默认心理学配置
  return {
    cycle_adjustments: { trough: 10, early_recovery: 5, mid_cycle: 0, peak: -10 },
    contrarian: { bonus: 15, penalty: -15 },
    loss_aversion: { lambda: 2.25, sell_threshold: 30, hold_threshold: 70 },
    marginal_signal: { first_confirming: 1.0, second_confirming: 0.7, third_confirming: 0.4, first_contrary: 1.5 },
  };
}

// 获取配置版本信息
export function getConfigInfo(): { version: string; effectiveDate: string; mode: string } {
  const scoringConfig = getScoringConfig();
  return {
    version: scoringConfig.version,
    effectiveDate: scoringConfig.effective_date,
    mode: config.mode,
  };
}
