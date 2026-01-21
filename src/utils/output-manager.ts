/**
 * 输出管理器
 * 管理产物目录和文件输出
 *
 * 产物路径结构:
 * data/semicap_mvp/
 *   └── YYYY-MM-DD/           # 按周归档
 *       ├── weekly-report.json
 *       ├── weekly-report.md
 *       ├── scores.json
 *       ├── new-evidence.json
 *       └── audit-log-*.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config/index.js';

class OutputManager {
  private basePath: string;

  constructor() {
    this.basePath = config.paths.output;
  }

  /**
   * 获取周度输出路径
   */
  getWeeklyPath(weekStart: string): string {
    return path.join(this.basePath, 'semicap_mvp', weekStart);
  }

  /**
   * 确保目录存在
   */
  private ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * 写入 JSON 文件
   */
  async writeJSON(dir: string, filename: string, data: unknown): Promise<string> {
    this.ensureDir(dir);
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return filePath;
  }

  /**
   * 写入文本文件
   */
  async writeFile(dir: string, filename: string, content: string): Promise<string> {
    this.ensureDir(dir);
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  /**
   * 读取 JSON 文件
   */
  readJSON<T>(dir: string, filename: string): T | null {
    const filePath = path.join(dir, filename);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  /**
   * 列出所有周度目录
   */
  listWeeks(): string[] {
    const mvpPath = path.join(this.basePath, 'semicap_mvp');
    if (!fs.existsSync(mvpPath)) {
      return [];
    }

    return fs.readdirSync(mvpPath)
      .filter(name => /^\d{4}-\d{2}-\d{2}$/.test(name))
      .sort()
      .reverse(); // 最新的在前
  }

  /**
   * 获取最新周报路径
   */
  getLatestWeekPath(): string | null {
    const weeks = this.listWeeks();
    if (weeks.length === 0) {
      return null;
    }
    return this.getWeeklyPath(weeks[0]);
  }

  /**
   * 获取目录大小
   */
  getDirectorySize(dir: string): number {
    if (!fs.existsSync(dir)) {
      return 0;
    }

    let size = 0;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        size += stat.size;
      } else if (stat.isDirectory()) {
        size += this.getDirectorySize(filePath);
      }
    }
    return size;
  }

  /**
   * 清理旧数据（保留最近 N 周）
   */
  cleanup(keepWeeks: number = 12): { deleted: string[]; freed: number } {
    const weeks = this.listWeeks();
    const deleted: string[] = [];
    let freed = 0;

    if (weeks.length <= keepWeeks) {
      return { deleted, freed };
    }

    const toDelete = weeks.slice(keepWeeks);
    for (const week of toDelete) {
      const weekPath = this.getWeeklyPath(week);
      freed += this.getDirectorySize(weekPath);
      fs.rmSync(weekPath, { recursive: true });
      deleted.push(week);
    }

    return { deleted, freed };
  }

  /**
   * 获取存储统计
   */
  getStats(): {
    totalWeeks: number;
    totalSize: number;
    latestWeek: string | null;
  } {
    const weeks = this.listWeeks();
    const mvpPath = path.join(this.basePath, 'semicap_mvp');

    return {
      totalWeeks: weeks.length,
      totalSize: this.getDirectorySize(mvpPath),
      latestWeek: weeks.length > 0 ? weeks[0] : null
    };
  }

  /**
   * 归档到指定目录（用于备份）
   */
  async archive(targetDir: string): Promise<string> {
    const mvpPath = path.join(this.basePath, 'semicap_mvp');
    if (!fs.existsSync(mvpPath)) {
      throw new Error('没有可归档的数据');
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const archiveName = `semicap_mvp_backup_${timestamp}`;
    const archivePath = path.join(targetDir, archiveName);

    this.ensureDir(targetDir);
    fs.cpSync(mvpPath, archivePath, { recursive: true });

    return archivePath;
  }
}

export const outputManager = new OutputManager();
export { OutputManager };
