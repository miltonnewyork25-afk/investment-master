/**
 * 查询FMP行业分类
 */
import 'dotenv/config';
import { FMPClient } from '../clients/fmp-client.js';

async function main() {
  const client = new FMPClient();

  // 查询各产业链代表性公司的行业分类
  const symbols = [
    // 半导体
    'LRCX', 'AMAT', 'ASML', 'KLAC', 'MU', 'NVDA', 'AMD', 'INTC', 'TSM', 'AVGO',
    // 航空
    'BA', 'GE', 'RTX', 'DAL', 'UAL', 'LMT',
    // 油气
    'XOM', 'CVX', 'SLB', 'HAL', 'VLO',
    // 医疗
    'UNH', 'LLY', 'JNJ', 'PFE', 'MCK', 'CVS', 'HCA',
    // EV/汽车
    'TSLA', 'F', 'GM', 'ALB',
    // 云/软件
    'AMZN', 'MSFT', 'GOOGL', 'CRM', 'NOW',
    // 支付
    'V', 'MA', 'SQ', 'PYPL',
    // 建筑/工业
    'CAT', 'DE', 'VMC', 'NUE', 'LEN',
    // 零售
    'WMT', 'COST', 'HD', 'TGT',
    // 餐饮
    'MCD', 'SBUX', 'CMG',
  ];

  console.log('Fetching profiles...');
  const profiles = await client.getProfiles(symbols);

  const industries = new Map<string, string[]>();

  for (const p of profiles) {
    const key = `${p.sector} | ${p.industry}`;
    const existing = industries.get(key) || [];
    existing.push(p.symbol);
    industries.set(key, existing);
  }

  console.log('\n=== FMP 行业分类 ===\n');
  const sortedKeys = [...industries.keys()].sort();
  for (const key of sortedKeys) {
    const syms = industries.get(key);
    console.log(key);
    console.log(`  ${syms?.join(', ')}`);
  }
}

main().catch(console.error);
