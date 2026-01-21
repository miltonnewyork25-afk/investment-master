/**
 * 审计日志器
 * 记录所有抓取和处理操作的详细日志
 *
 * 日志内容：
 * - URL、耗时、状态
 * - 失败原因、限流次数
 * - Agent 操作记录
 */

import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type AgentType = 'orchestrator' | 'sec-fetcher' | 'evidence-extractor' | 'scorer' | 'data-auditor';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  agent: AgentType;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface FetchLogEntry extends LogEntry {
  url: string;
  duration_ms: number;
  status: 'success' | 'failed' | 'rate_limited' | 'cached';
  http_status?: number;
  error?: string;
}

class AuditLogger {
  private logs: LogEntry[] = [];
  private fetchLogs: FetchLogEntry[] = [];
  private rateLimitCount: number = 0;

  /**
   * 记录通用日志
   */
  log(agent: AgentType, level: LogLevel, message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      agent,
      message,
      metadata
    };

    this.logs.push(entry);

    // 同时输出到控制台（开发时）
    if (process.env.DEBUG) {
      const prefix = `[${entry.timestamp}] [${level.toUpperCase()}] [${agent}]`;
      console.log(`${prefix} ${message}`);
    }
  }

  /**
   * 记录抓取日志
   */
  logFetch(
    agent: AgentType,
    url: string,
    duration_ms: number,
    status: FetchLogEntry['status'],
    options?: {
      http_status?: number;
      error?: string;
      metadata?: Record<string, unknown>;
    }
  ): void {
    const entry: FetchLogEntry = {
      timestamp: new Date().toISOString(),
      level: status === 'success' || status === 'cached' ? 'info' : 'warn',
      agent,
      message: `Fetch ${status}: ${url}`,
      url,
      duration_ms,
      status,
      ...options
    };

    this.fetchLogs.push(entry);
    this.logs.push(entry);

    if (status === 'rate_limited') {
      this.rateLimitCount++;
    }
  }

  /**
   * 记录错误
   */
  error(agent: AgentType, message: string, error?: Error): void {
    this.log(agent, 'error', message, {
      error: error?.message,
      stack: error?.stack
    });
  }

  /**
   * 获取限流统计
   */
  getRateLimitStats(): { count: number; lastHour: number } {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const lastHour = this.fetchLogs.filter(
      l => l.status === 'rate_limited' && l.timestamp > oneHourAgo
    ).length;

    return {
      count: this.rateLimitCount,
      lastHour
    };
  }

  /**
   * 获取抓取统计
   */
  getFetchStats(): {
    total: number;
    success: number;
    failed: number;
    cached: number;
    avgDuration: number;
  } {
    const total = this.fetchLogs.length;
    const success = this.fetchLogs.filter(l => l.status === 'success').length;
    const failed = this.fetchLogs.filter(l => l.status === 'failed').length;
    const cached = this.fetchLogs.filter(l => l.status === 'cached').length;

    const durations = this.fetchLogs
      .filter(l => l.status === 'success')
      .map(l => l.duration_ms);

    const avgDuration = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

    return { total, success, failed, cached, avgDuration };
  }

  /**
   * 获取所有日志
   */
  getLogs(filter?: { agent?: AgentType; level?: LogLevel; since?: Date }): LogEntry[] {
    let result = [...this.logs];

    if (filter?.agent) {
      result = result.filter(l => l.agent === filter.agent);
    }

    if (filter?.level) {
      result = result.filter(l => l.level === filter.level);
    }

    if (filter?.since) {
      const sinceStr = filter.since.toISOString();
      result = result.filter(l => l.timestamp >= sinceStr);
    }

    return result;
  }

  /**
   * 导出日志到文件
   */
  async flush(outputDir: string): Promise<string> {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `audit-log-${timestamp}.json`;
    const filePath = path.join(outputDir, filename);

    const exportData = {
      exported_at: new Date().toISOString(),
      stats: {
        fetch: this.getFetchStats(),
        rateLimit: this.getRateLimitStats()
      },
      logs: this.logs,
      fetchLogs: this.fetchLogs
    };

    fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2));

    return filePath;
  }

  /**
   * 生成摘要报告
   */
  generateSummary(): string {
    const fetchStats = this.getFetchStats();
    const rateLimitStats = this.getRateLimitStats();
    const errorLogs = this.logs.filter(l => l.level === 'error');

    const lines = [
      '=== 审计日志摘要 ===',
      '',
      '抓取统计:',
      `  总请求: ${fetchStats.total}`,
      `  成功: ${fetchStats.success}`,
      `  失败: ${fetchStats.failed}`,
      `  缓存命中: ${fetchStats.cached}`,
      `  平均耗时: ${fetchStats.avgDuration}ms`,
      '',
      '限流统计:',
      `  总限流次数: ${rateLimitStats.count}`,
      `  最近一小时: ${rateLimitStats.lastHour}`,
      ''
    ];

    if (errorLogs.length > 0) {
      lines.push('错误记录:');
      for (const log of errorLogs.slice(-10)) {
        lines.push(`  [${log.agent}] ${log.message}`);
      }
    } else {
      lines.push('无错误记录');
    }

    return lines.join('\n');
  }

  /**
   * 清空日志
   */
  clear(): void {
    this.logs = [];
    this.fetchLogs = [];
    this.rateLimitCount = 0;
  }
}

export const auditLogger = new AuditLogger();
export { AuditLogger };
