/**
 * 缓存管理器
 * 管理 SEC 抓取等数据的本地缓存
 *
 * 缓存结构：
 * - cache/sec_submissions/<cik>.json
 * - cache/filings/<accession_number>.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config/index.js';

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  ttl: number;
}

type CacheType = 'sec' | 'filings' | 'evidence';

class CacheManager {
  private basePath: string;
  private memoryCache: Map<string, CacheEntry<unknown>> = new Map();

  constructor() {
    this.basePath = config.paths.cache;
  }

  /**
   * 获取缓存键的文件路径
   */
  private getFilePath(type: CacheType, key: string): string {
    const subDir = {
      sec: 'sec_submissions',
      filings: 'filings',
      evidence: 'evidence'
    }[type];

    return path.join(this.basePath, subDir, `${key}.json`);
  }

  /**
   * 获取缓存
   */
  get<T>(type: CacheType, key: string): T | null {
    const cacheKey = `${type}:${key}`;

    // 先检查内存缓存
    const memEntry = this.memoryCache.get(cacheKey) as CacheEntry<T> | undefined;
    if (memEntry && !this.isExpired(memEntry)) {
      return memEntry.data;
    }

    // 再检查文件缓存
    const filePath = this.getFilePath(type, key);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const entry: CacheEntry<T> = JSON.parse(content);

        if (!this.isExpired(entry)) {
          // 加载到内存缓存
          this.memoryCache.set(cacheKey, entry);
          return entry.data;
        } else {
          // 过期则删除
          this.delete(type, key);
        }
      } catch {
        // 解析失败则忽略
      }
    }

    return null;
  }

  /**
   * 设置缓存
   */
  set<T>(type: CacheType, key: string, data: T, ttl?: number): void {
    const cacheKey = `${type}:${key}`;
    const entry: CacheEntry<T> = {
      data,
      cachedAt: Date.now(),
      ttl: ttl ?? config.sec.cacheTTL
    };

    // 写入内存缓存
    this.memoryCache.set(cacheKey, entry);

    // 写入文件缓存
    const filePath = this.getFilePath(type, key);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(entry, null, 2));
  }

  /**
   * 删除缓存
   */
  delete(type: CacheType, key: string): void {
    const cacheKey = `${type}:${key}`;
    this.memoryCache.delete(cacheKey);

    const filePath = this.getFilePath(type, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * 检查是否过期
   */
  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.cachedAt > entry.ttl;
  }

  /**
   * 清空所有缓存
   */
  clear(type?: CacheType): void {
    if (type) {
      // 清空指定类型
      const prefix = `${type}:`;
      for (const key of this.memoryCache.keys()) {
        if (key.startsWith(prefix)) {
          this.memoryCache.delete(key);
        }
      }

      const subDir = {
        sec: 'sec_submissions',
        filings: 'filings',
        evidence: 'evidence'
      }[type];

      const dirPath = path.join(this.basePath, subDir);
      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true });
      }
    } else {
      // 清空所有
      this.memoryCache.clear();
      if (fs.existsSync(this.basePath)) {
        fs.rmSync(this.basePath, { recursive: true });
      }
    }
  }

  /**
   * 获取缓存统计
   */
  getStats(): { memoryEntries: number; diskEntries: number } {
    let diskEntries = 0;

    const countFiles = (dir: string): number => {
      if (!fs.existsSync(dir)) return 0;
      return fs.readdirSync(dir).filter(f => f.endsWith('.json')).length;
    };

    diskEntries += countFiles(path.join(this.basePath, 'sec_submissions'));
    diskEntries += countFiles(path.join(this.basePath, 'filings'));
    diskEntries += countFiles(path.join(this.basePath, 'evidence'));

    return {
      memoryEntries: this.memoryCache.size,
      diskEntries
    };
  }
}

export const cacheManager = new CacheManager();
export { CacheManager };
