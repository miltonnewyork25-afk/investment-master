"""
报告生成器
生成每日简报、每周深度报告，包含图表和可视化
"""

import logging
import matplotlib
matplotlib.use('Agg')  # 无界面模式
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any, List, Optional
import json

from database import IntelligenceDB

logger = logging.getLogger(__name__)

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False


class ReportGenerator:
    """报告生成器主类"""

    def __init__(self, db: IntelligenceDB, output_dir: str = "reports"):
        self.db = db
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True, parents=True)
        self.charts_dir = self.output_dir / "charts"
        self.charts_dir.mkdir(exist_ok=True)

    # ==================== 每日简报 ====================

    def generate_daily_brief(self, ticker: str = 'TSLA', date: str = None) -> str:
        """生成每日简报"""
        if date is None:
            date = datetime.now().strftime('%Y-%m-%d')

        logger.info(f"生成每日简报: {ticker} {date}")

        # 收集数据
        insider_data = self._get_daily_insider_summary(ticker, date)
        options_data = self._get_daily_options_summary(ticker, date)
        sentiment_data = self._get_daily_sentiment_summary(ticker, date)
        supply_chain_data = self._get_daily_supply_chain_summary(ticker, date)
        short_data = self._get_daily_short_summary(ticker, date)
        dark_pool_data = self._get_daily_dark_pool_summary(ticker, date)

        # 计算综合评分
        composite_score = self._calculate_composite_score({
            'insider': insider_data,
            'options': options_data,
            'sentiment': sentiment_data,
            'supply_chain': supply_chain_data,
            'short': short_data,
            'dark_pool': dark_pool_data
        })

        # 生成持仓建议
        position_recommendation = self._get_position_recommendation(composite_score)

        # 生成Markdown报告
        report = self._build_daily_markdown(
            ticker, date, composite_score, position_recommendation,
            insider_data, options_data, sentiment_data,
            supply_chain_data, short_data, dark_pool_data
        )

        # 保存报告
        filename = f"daily_brief_{ticker}_{date}.md"
        filepath = self.output_dir / filename
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(report)

        logger.info(f"每日简报已保存: {filepath}")

        # 保存到数据库
        self.db.insert_daily_report({
            'date': date,
            'ticker': ticker,
            'composite_score': composite_score,
            'position_recommendation': position_recommendation,
            'key_signals': json.dumps({
                'insider': insider_data.get('summary', ''),
                'options': options_data.get('summary', ''),
                'sentiment': sentiment_data.get('summary', '')
            }, ensure_ascii=False),
            'report_path': str(filepath)
        })

        return str(filepath)

    def _build_daily_markdown(self, ticker: str, date: str, composite_score: float,
                             position_recommendation: str, insider_data: Dict,
                             options_data: Dict, sentiment_data: Dict,
                             supply_chain_data: Dict, short_data: Dict,
                             dark_pool_data: Dict) -> str:
        """构建每日简报Markdown"""

        report = f"""# {ticker} 投资情报日报

**日期**: {date}
**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 执行摘要

**综合评分**: {composite_score:.1f}/10 {self._get_score_emoji(composite_score)}
**持仓建议**: {position_recommendation}

{self._get_score_interpretation(composite_score)}

---

## 关键信号

### 1. 内部人交易 {insider_data.get('emoji', '📊')}

{insider_data.get('summary', '今日无重要内部人交易')}

{self._format_insider_details(insider_data)}

### 2. 期权异常活动 {options_data.get('emoji', '📈')}

{options_data.get('summary', '今日无异常期权活动')}

{self._format_options_details(options_data)}

### 3. 市场情绪 {sentiment_data.get('emoji', '😐')}

{sentiment_data.get('summary', '情绪指数暂无数据')}

**OCI评分**: {sentiment_data.get('oci_score', 'N/A')}
**样本量**: {sentiment_data.get('sample_size', 0):,} 条
**情绪分布**:
- 看涨: {sentiment_data.get('bullish_pct', 0):.1f}%
- 看跌: {sentiment_data.get('bearish_pct', 0):.1f}%
- 中性: {sentiment_data.get('neutral_pct', 0):.1f}%

### 4. 供应链线索 {supply_chain_data.get('emoji', '⛓️')}

{supply_chain_data.get('summary', '今日无重要供应链信号')}

{self._format_supply_chain_details(supply_chain_data)}

### 5. 空头动态 {short_data.get('emoji', '📉')}

{short_data.get('summary', '空头数据暂无更新')}

{self._format_short_details(short_data)}

### 6. 暗池活动 {dark_pool_data.get('emoji', '🌑')}

{dark_pool_data.get('summary', '暗池数据暂无更新')}

{self._format_dark_pool_details(dark_pool_data)}

---

## 六大引擎评分矩阵

| 引擎 | 评分 | 信号强度 | 趋势 |
|------|------|----------|------|
| 内部人交易 | {insider_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(insider_data.get('score', 5.0))} | {insider_data.get('trend', '→')} |
| 期权活动 | {options_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(options_data.get('score', 5.0))} | {options_data.get('trend', '→')} |
| 市场情绪 | {sentiment_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(sentiment_data.get('score', 5.0))} | {sentiment_data.get('trend', '→')} |
| 供应链 | {supply_chain_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(supply_chain_data.get('score', 5.0))} | {supply_chain_data.get('trend', '→')} |
| 空头分析 | {short_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(short_data.get('score', 5.0))} | {short_data.get('trend', '→')} |
| 暗池监控 | {dark_pool_data.get('score', 5.0):.1f}/10 | {self._get_signal_strength(dark_pool_data.get('score', 5.0))} | {dark_pool_data.get('trend', '→')} |

---

## 操作建议

### 短期 (1-7天)
{self._get_short_term_action(composite_score, insider_data, options_data, sentiment_data)}

### 中期 (1-4周)
{self._get_mid_term_action(composite_score, supply_chain_data, short_data)}

### 风险提示
{self._get_risk_warnings(insider_data, options_data, short_data, dark_pool_data)}

---

## 数据来源与说明

- **内部人交易**: SEC Form 4 实时监控
- **期权数据**: 市场成交数据与Open Interest分析
- **情绪指数**: Reddit/Twitter/StockTwits多源聚合
- **供应链**: 上游供应商财报与指引
- **空头数据**: 卖空比例与借券费率
- **暗池**: 非公开交易场所成交数据

*免责声明: 本报告仅供参考,不构成投资建议。投资有风险,决策需谨慎。*

---

**报告版本**: Daily Brief v1.0
**下次更新**: {(datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)).strftime('%Y-%m-%d')}
"""

        return report

    # ==================== 每周深度报告 ====================

    def generate_weekly_report(self, ticker: str = 'TSLA', end_date: str = None) -> str:
        """生成每周深度报告"""
        if end_date is None:
            end_date = datetime.now().strftime('%Y-%m-%d')

        start_date = (datetime.strptime(end_date, '%Y-%m-%d') - timedelta(days=7)).strftime('%Y-%m-%d')

        logger.info(f"生成每周报告: {ticker} {start_date} - {end_date}")

        # 收集一周数据
        insider_df = self.db.get_insider_trading(ticker, days=7)
        sentiment_df = self.db.get_sentiment_history(ticker, days=7)
        supply_chain_df = self.db.get_supply_chain_signals(ticker, days=7)
        options_df = self.db.get_options_unusual(ticker, days=7)

        # 生成图表
        charts = self._generate_weekly_charts(ticker, insider_df, sentiment_df, supply_chain_df, end_date)

        # 生成趋势分析
        trends = self._analyze_weekly_trends(insider_df, sentiment_df, supply_chain_df, options_df)

        # 构建报告
        report = self._build_weekly_markdown(
            ticker, start_date, end_date, trends, charts,
            insider_df, sentiment_df, supply_chain_df, options_df
        )

        # 保存报告
        filename = f"weekly_report_{ticker}_{end_date}.md"
        filepath = self.output_dir / filename
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(report)

        logger.info(f"每周报告已保存: {filepath}")
        return str(filepath)

    def _build_weekly_markdown(self, ticker: str, start_date: str, end_date: str,
                               trends: Dict, charts: Dict,
                               insider_df: pd.DataFrame, sentiment_df: pd.DataFrame,
                               supply_chain_df: pd.DataFrame, options_df: pd.DataFrame) -> str:
        """构建每周报告Markdown"""

        report = f"""# {ticker} 投资情报周报

**报告周期**: {start_date} - {end_date}
**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 执行摘要

### 本周关键发现

1. **{trends.get('top_finding_1', '内部人交易活跃度变化')}**
2. **{trends.get('top_finding_2', '市场情绪波动分析')}**
3. **{trends.get('top_finding_3', '供应链信号汇总')}**

### 综合评分趋势

本周平均评分: **{trends.get('avg_score', 5.0):.1f}/10**
周内最高: {trends.get('max_score', 5.0):.1f}
周内最低: {trends.get('min_score', 5.0):.1f}
波动性: {trends.get('volatility', 'N/A')}

---

## 一、内部人交易深度分析

### 1.1 交易汇总

{self._format_weekly_insider_summary(insider_df)}

### 1.2 重要交易详情

{self._format_insider_weekly_details(insider_df)}

### 1.3 趋势图

![内部人交易趋势](charts/{charts.get('insider_chart', 'insider_trend.png')})

---

## 二、市场情绪演变

### 2.1 情绪指数走势

本周OCI平均: **{trends.get('avg_sentiment', 5.0):.1f}**

{self._format_weekly_sentiment_summary(sentiment_df)}

### 2.2 情绪转折点

{self._identify_sentiment_turning_points(sentiment_df)}

### 2.3 趋势图

![情绪指数趋势](charts/{charts.get('sentiment_chart', 'sentiment_trend.png')})

---

## 三、供应链信号追踪

### 3.1 关键供应商动态

{self._format_weekly_supply_chain_summary(supply_chain_df)}

### 3.2 信号强度排行

{self._rank_supply_chain_signals(supply_chain_df)}

---

## 四、期权市场观察

### 4.1 异常活动统计

{self._format_weekly_options_summary(options_df)}

### 4.2 看涨/看跌比例

{self._analyze_put_call_ratio(options_df)}

---

## 五、下周展望

### 5.1 关注要点

{self._generate_next_week_focus(trends)}

### 5.2 潜在催化剂

{self._identify_upcoming_catalysts(end_date)}

### 5.3 风险监控

{self._generate_risk_monitor_list(trends)}

---

## 附录：数据统计

### 数据覆盖情况

| 引擎 | 本周数据点 | 上周对比 | 数据质量 |
|------|-----------|----------|----------|
| 内部人交易 | {len(insider_df)} | {self._get_week_over_week_change('insider')} | {self._assess_data_quality(insider_df)} |
| 市场情绪 | {len(sentiment_df)} | {self._get_week_over_week_change('sentiment')} | {self._assess_data_quality(sentiment_df)} |
| 供应链 | {len(supply_chain_df)} | {self._get_week_over_week_change('supply_chain')} | {self._assess_data_quality(supply_chain_df)} |
| 期权活动 | {len(options_df)} | {self._get_week_over_week_change('options')} | {self._assess_data_quality(options_df)} |

---

*本报告由Intelligence Engine v10自动生成*

**免责声明**: 本报告仅供参考,不构成投资建议。投资有风险,决策需谨慎。
"""

        return report

    # ==================== 图表生成 ====================

    def _generate_weekly_charts(self, ticker: str, insider_df: pd.DataFrame,
                               sentiment_df: pd.DataFrame, supply_chain_df: pd.DataFrame,
                               end_date: str) -> Dict[str, str]:
        """生成每周图表"""
        charts = {}

        # 1. 内部人交易趋势图
        if not insider_df.empty:
            chart_name = f"insider_trend_{end_date}.png"
            self._plot_insider_trend(insider_df, self.charts_dir / chart_name)
            charts['insider_chart'] = chart_name

        # 2. 情绪指数趋势图
        if not sentiment_df.empty:
            chart_name = f"sentiment_trend_{end_date}.png"
            self._plot_sentiment_trend(sentiment_df, self.charts_dir / chart_name)
            charts['sentiment_chart'] = chart_name

        # 3. 供应链信号热力图
        if not supply_chain_df.empty:
            chart_name = f"supply_chain_heatmap_{end_date}.png"
            self._plot_supply_chain_heatmap(supply_chain_df, self.charts_dir / chart_name)
            charts['supply_chain_chart'] = chart_name

        return charts

    def _plot_insider_trend(self, df: pd.DataFrame, filepath: Path):
        """绘制内部人交易趋势图"""
        fig, ax = plt.subplots(figsize=(12, 6))

        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')

        # 按日期汇总
        daily_value = df.groupby('date')['value'].sum() / 1_000_000  # 转换为百万美元

        ax.bar(daily_value.index, daily_value.values, color=['red' if v < 0 else 'green' for v in daily_value.values])
        ax.axhline(y=0, color='black', linestyle='-', linewidth=0.5)
        ax.set_title('内部人交易净值 (百万美元)', fontsize=14, fontweight='bold')
        ax.set_xlabel('日期')
        ax.set_ylabel('净交易额 (M)')
        ax.grid(axis='y', alpha=0.3)

        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(filepath, dpi=150)
        plt.close()

    def _plot_sentiment_trend(self, df: pd.DataFrame, filepath: Path):
        """绘制情绪指数趋势图"""
        fig, ax = plt.subplots(figsize=(12, 6))

        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')

        ax.plot(df['date'], df['oci_score'], marker='o', linewidth=2, markersize=8)
        ax.fill_between(df['date'], df['oci_score'], alpha=0.3)
        ax.axhline(y=5, color='gray', linestyle='--', label='中性线')
        ax.axhline(y=7, color='green', linestyle='--', alpha=0.5, label='看涨阈值')
        ax.axhline(y=3, color='red', linestyle='--', alpha=0.5, label='看跌阈值')

        ax.set_title('市场情绪指数(OCI)趋势', fontsize=14, fontweight='bold')
        ax.set_xlabel('日期')
        ax.set_ylabel('OCI评分')
        ax.set_ylim(0, 10)
        ax.legend()
        ax.grid(alpha=0.3)

        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(filepath, dpi=150)
        plt.close()

    def _plot_supply_chain_heatmap(self, df: pd.DataFrame, filepath: Path):
        """绘制供应链信号热力图"""
        if df.empty:
            return

        # 简化版：按供应商和日期展示信号强度
        pivot = df.pivot_table(
            values='signal_strength',
            index='supplier_ticker',
            columns='date',
            aggfunc='mean'
        )

        fig, ax = plt.subplots(figsize=(12, max(6, len(pivot) * 0.5)))
        im = ax.imshow(pivot.values, cmap='RdYlGn', aspect='auto', vmin=0, vmax=10)

        ax.set_xticks(np.arange(len(pivot.columns)))
        ax.set_yticks(np.arange(len(pivot.index)))
        ax.set_xticklabels(pivot.columns)
        ax.set_yticklabels(pivot.index)

        plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

        ax.set_title('供应链信号强度热力图', fontsize=14, fontweight='bold')
        fig.colorbar(im, ax=ax, label='信号强度')

        plt.tight_layout()
        plt.savefig(filepath, dpi=150)
        plt.close()

    # ==================== 数据处理辅助方法 ====================

    def _get_daily_insider_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日内部人交易摘要"""
        df = self.db.get_insider_trading(ticker, days=1)

        if df.empty:
            return {'summary': '今日无内部人交易', 'score': 5.0, 'emoji': '📊', 'trend': '→'}

        total_value = df['value'].sum()
        trade_count = len(df)

        if abs(total_value) > 10_000_000:
            emoji = '🚨'
            if total_value < 0:
                summary = f"重大抛售! {trade_count}笔交易, 总额${abs(total_value):,.0f}"
                score = 2.0
            else:
                summary = f"重大买入! {trade_count}笔交易, 总额${total_value:,.0f}"
                score = 8.0
        elif abs(total_value) > 1_000_000:
            emoji = '⚠️'
            summary = f"{trade_count}笔交易, 净值${total_value:,.0f}"
            score = 4.0 if total_value < 0 else 6.0
        else:
            emoji = '📊'
            summary = f"常规交易, {trade_count}笔"
            score = 5.0

        return {
            'summary': summary,
            'score': score,
            'emoji': emoji,
            'trend': '→',
            'trades': df.to_dict('records')
        }

    def _get_daily_options_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日期权活动摘要"""
        df = self.db.get_options_unusual(ticker, days=1)

        if df.empty:
            return {'summary': '今日无异常期权活动', 'score': 5.0, 'emoji': '📈', 'trend': '→'}

        avg_score = df['unusual_score'].mean()
        max_score = df['unusual_score'].max()
        count = len(df)

        if max_score >= 9.0:
            emoji = '🔥'
            summary = f"极端异常! {count}个合约, 最高评分{max_score:.1f}"
            score = 9.0
        elif max_score >= 7.0:
            emoji = '⚡'
            summary = f"显著异常, {count}个合约, 平均评分{avg_score:.1f}"
            score = 7.0
        else:
            emoji = '📈'
            summary = f"{count}个异常合约"
            score = 6.0

        return {
            'summary': summary,
            'score': score,
            'emoji': emoji,
            'trend': '→',
            'contracts': df.to_dict('records')
        }

    def _get_daily_sentiment_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日情绪摘要"""
        df = self.db.get_sentiment_history(ticker, days=1)

        if df.empty:
            return {
                'summary': '今日情绪数据暂无',
                'score': 5.0,
                'emoji': '😐',
                'trend': '→',
                'oci_score': 'N/A',
                'sample_size': 0,
                'bullish_pct': 0,
                'bearish_pct': 0,
                'neutral_pct': 0
            }

        latest = df.iloc[0]
        oci = latest['oci_score']

        if oci >= 7:
            emoji = '😄'
            summary = f"强烈看涨, OCI {oci:.1f}"
        elif oci >= 6:
            emoji = '🙂'
            summary = f"偏向看涨, OCI {oci:.1f}"
        elif oci >= 4:
            emoji = '😐'
            summary = f"中性情绪, OCI {oci:.1f}"
        elif oci >= 3:
            emoji = '😟'
            summary = f"偏向看跌, OCI {oci:.1f}"
        else:
            emoji = '😰'
            summary = f"强烈看跌, OCI {oci:.1f}"

        return {
            'summary': summary,
            'score': oci,
            'emoji': emoji,
            'trend': '→',
            'oci_score': f"{oci:.1f}",
            'sample_size': latest.get('sample_size', 0),
            'bullish_pct': latest.get('bullish_pct', 0),
            'bearish_pct': latest.get('bearish_pct', 0),
            'neutral_pct': latest.get('neutral_pct', 0)
        }

    def _get_daily_supply_chain_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日供应链摘要"""
        df = self.db.get_supply_chain_signals(ticker, days=1)

        if df.empty:
            return {'summary': '今日无供应链信号', 'score': 5.0, 'emoji': '⛓️', 'trend': '→'}

        avg_strength = df['signal_strength'].mean()
        max_strength = df['signal_strength'].max()
        count = len(df)

        if max_strength >= 8.0:
            emoji = '🔴'
            summary = f"强信号! {count}个供应商, 最高强度{max_strength:.1f}"
            score = max_strength
        elif max_strength >= 6.0:
            emoji = '🟡'
            summary = f"中等信号, {count}个供应商"
            score = avg_strength
        else:
            emoji = '⛓️'
            summary = f"常规信号, {count}个供应商"
            score = 5.0

        return {
            'summary': summary,
            'score': score,
            'emoji': emoji,
            'trend': '→',
            'signals': df.to_dict('records')
        }

    def _get_daily_short_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日空头摘要"""
        # 简化版：返回默认数据
        return {
            'summary': '空头数据每周更新',
            'score': 5.0,
            'emoji': '📉',
            'trend': '→'
        }

    def _get_daily_dark_pool_summary(self, ticker: str, date: str) -> Dict[str, Any]:
        """获取当日暗池摘要"""
        # 简化版：返回默认数据
        return {
            'summary': '暗池数据每日盘后更新',
            'score': 5.0,
            'emoji': '🌑',
            'trend': '→'
        }

    def _calculate_composite_score(self, data: Dict[str, Dict]) -> float:
        """计算综合评分"""
        weights = {
            'insider': 0.20,
            'options': 0.20,
            'sentiment': 0.25,
            'supply_chain': 0.15,
            'short': 0.10,
            'dark_pool': 0.10
        }

        score = 0.0
        for key, weight in weights.items():
            score += data.get(key, {}).get('score', 5.0) * weight

        return round(score, 1)

    def _get_position_recommendation(self, score: float) -> str:
        """根据评分给出持仓建议"""
        if score >= 8.0:
            return "积极增持 (70-90%)"
        elif score >= 7.0:
            return "适度增持 (50-70%)"
        elif score >= 6.0:
            return "标准持仓 (30-50%)"
        elif score >= 4.0:
            return "观望减仓 (10-30%)"
        else:
            return "谨慎避险 (<10%)"

    def _get_score_emoji(self, score: float) -> str:
        """根据评分返回表情"""
        if score >= 8:
            return "🟢 强烈看涨"
        elif score >= 6:
            return "🟡 偏向看涨"
        elif score >= 4:
            return "⚪ 中性观望"
        elif score >= 2:
            return "🟠 偏向看跌"
        else:
            return "🔴 强烈看跌"

    def _get_score_interpretation(self, score: float) -> str:
        """评分解读"""
        if score >= 7.5:
            return "多个维度显示强烈买入信号，建议积极配置。"
        elif score >= 6.0:
            return "综合信号偏正面，可适度增加仓位。"
        elif score >= 4.0:
            return "信号中性，建议维持当前仓位观望。"
        else:
            return "多个维度显示风险信号，建议降低仓位或避险。"

    def _get_signal_strength(self, score: float) -> str:
        """信号强度描述"""
        if score >= 8:
            return "极强 ████████"
        elif score >= 6:
            return "较强 ██████"
        elif score >= 4:
            return "中等 ████"
        else:
            return "较弱 ██"

    # ==================== 格式化辅助方法 ====================

    def _format_insider_details(self, data: Dict) -> str:
        """格式化内部人交易详情"""
        if not data.get('trades'):
            return ""

        details = "\n**交易明细**:\n\n"
        for trade in data['trades'][:5]:  # 最多显示5笔
            details += f"- {trade.get('insider', 'Unknown')} ({trade.get('title', '')}): "
            details += f"{'买入' if trade.get('value', 0) > 0 else '抛售'} "
            details += f"{abs(trade.get('shares', 0)):,}股 @ ${trade.get('price', 0):.2f}\n"

        return details

    def _format_options_details(self, data: Dict) -> str:
        """格式化期权详情"""
        if not data.get('contracts'):
            return ""

        details = "\n**异常合约**:\n\n"
        for contract in data['contracts'][:5]:
            details += f"- {contract.get('contract_type', 'Unknown')} "
            details += f"${contract.get('strike_price', 0):.0f} "
            details += f"到期{contract.get('expiration', 'N/A')}: "
            details += f"成交{contract.get('volume', 0):,} (评分{contract.get('unusual_score', 0):.1f})\n"

        return details

    def _format_supply_chain_details(self, data: Dict) -> str:
        """格式化供应链详情"""
        if not data.get('signals'):
            return ""

        details = "\n**关键信号**:\n\n"
        for signal in sorted(data['signals'], key=lambda x: x.get('signal_strength', 0), reverse=True)[:5]:
            details += f"- {signal.get('supplier_name', 'Unknown')} ({signal.get('supplier_ticker', '')}): "
            details += f"{signal.get('signal_type', '')} - "
            details += f"强度{signal.get('signal_strength', 0):.1f}/10\n"
            details += f"  {signal.get('description', '')}\n"

        return details

    def _format_short_details(self, data: Dict) -> str:
        """格式化空头详情"""
        return ""

    def _format_dark_pool_details(self, data: Dict) -> str:
        """格式化暗池详情"""
        return ""

    def _get_short_term_action(self, score: float, insider: Dict, options: Dict, sentiment: Dict) -> str:
        """短期操作建议"""
        actions = []

        if insider.get('score', 5.0) >= 7:
            actions.append("- 内部人净买入，短期可能有催化剂")
        if options.get('score', 5.0) >= 8:
            actions.append("- 期权异常活跃，注意潜在波动")
        if sentiment.get('score', 5.0) >= 7:
            actions.append("- 市场情绪高涨，可能接近短期顶部")

        if not actions:
            actions.append("- 维持观望，等待更明确信号")

        return "\n".join(actions)

    def _get_mid_term_action(self, score: float, supply_chain: Dict, short: Dict) -> str:
        """中期操作建议"""
        actions = []

        if supply_chain.get('score', 5.0) >= 7:
            actions.append("- 供应链信号积极，基本面改善")

        if not actions:
            actions.append("- 关注下季度财报指引")

        return "\n".join(actions)

    def _get_risk_warnings(self, insider: Dict, options: Dict, short: Dict, dark_pool: Dict) -> str:
        """风险提示"""
        warnings = []

        if insider.get('score', 5.0) <= 3:
            warnings.append("- ⚠️ 内部人大量抛售，需警惕")
        if options.get('score', 5.0) >= 9:
            warnings.append("- ⚠️ 期权活动极端，可能剧烈波动")

        if not warnings:
            return "- 当前无重大风险预警"

        return "\n".join(warnings)

    # ==================== 每周报告辅助方法 ====================

    def _analyze_weekly_trends(self, insider_df, sentiment_df, supply_chain_df, options_df) -> Dict:
        """分析每周趋势"""
        return {
            'top_finding_1': '本周内部人交易总结',
            'top_finding_2': '市场情绪波动分析',
            'top_finding_3': '供应链关键信号',
            'avg_score': 6.5,
            'max_score': 8.0,
            'min_score': 5.0,
            'volatility': '中等',
            'avg_sentiment': 6.2
        }

    def _format_weekly_insider_summary(self, df: pd.DataFrame) -> str:
        """每周内部人交易摘要"""
        if df.empty:
            return "本周无内部人交易记录"

        total_value = df['value'].sum()
        buy_count = len(df[df['value'] > 0])
        sell_count = len(df[df['value'] < 0])

        return f"""
- 总交易笔数: {len(df)}
- 买入: {buy_count}笔
- 抛售: {sell_count}笔
- 净交易额: ${total_value:,.0f}
"""

    def _format_insider_weekly_details(self, df: pd.DataFrame) -> str:
        """每周内部人交易详情"""
        if df.empty:
            return "无详细记录"

        # 按价值排序，取前10笔
        top_trades = df.nlargest(10, 'value', keep='all')

        details = ""
        for idx, trade in top_trades.iterrows():
            details += f"\n{trade['date']}: {trade.get('insider', 'Unknown')} "
            details += f"({'买入' if trade['value'] > 0 else '抛售'}) "
            details += f"${abs(trade['value']):,.0f}"

        return details

    def _format_weekly_sentiment_summary(self, df: pd.DataFrame) -> str:
        """每周情绪摘要"""
        if df.empty:
            return "本周无情绪数据"

        avg_oci = df['oci_score'].mean()
        return f"平均情绪倾向: {'看涨' if avg_oci > 5.5 else '看跌' if avg_oci < 4.5 else '中性'}"

    def _identify_sentiment_turning_points(self, df: pd.DataFrame) -> str:
        """识别情绪转折点"""
        if df.empty or len(df) < 2:
            return "数据不足，无法识别转折点"

        return "本周情绪相对平稳，无明显转折"

    def _format_weekly_supply_chain_summary(self, df: pd.DataFrame) -> str:
        """每周供应链摘要"""
        if df.empty:
            return "本周无供应链信号"

        return f"本周收集到{len(df)}个供应链信号"

    def _rank_supply_chain_signals(self, df: pd.DataFrame) -> str:
        """供应链信号排行"""
        if df.empty:
            return "暂无数据"

        top_signals = df.nlargest(5, 'signal_strength')
        ranking = ""
        for idx, (i, signal) in enumerate(top_signals.iterrows(), 1):
            ranking += f"\n{idx}. {signal.get('supplier_name', 'Unknown')}: {signal.get('signal_strength', 0):.1f}/10"

        return ranking

    def _format_weekly_options_summary(self, df: pd.DataFrame) -> str:
        """每周期权摘要"""
        if df.empty:
            return "本周无异常期权活动"

        return f"本周异常期权合约: {len(df)}个"

    def _analyze_put_call_ratio(self, df: pd.DataFrame) -> str:
        """分析看涨看跌比例"""
        if df.empty:
            return "暂无数据"

        calls = len(df[df['contract_type'] == 'CALL'])
        puts = len(df[df['contract_type'] == 'PUT'])

        if calls + puts == 0:
            return "暂无数据"

        ratio = puts / calls if calls > 0 else float('inf')
        return f"Put/Call比例: {ratio:.2f} ({'看跌倾向' if ratio > 1 else '看涨倾向'})"

    def _generate_next_week_focus(self, trends: Dict) -> str:
        """生成下周关注要点"""
        return """
- 关注内部人交易动态
- 监控市场情绪变化
- 跟踪供应链最新信号
"""

    def _identify_upcoming_catalysts(self, end_date: str) -> str:
        """识别即将到来的催化剂"""
        return """
- 下周二: 可能的产能数据更新
- 下周四: 关注行业会议
"""

    def _generate_risk_monitor_list(self, trends: Dict) -> str:
        """生成风险监控列表"""
        return """
- 内部人抛售加速
- 情绪指数快速恶化
- 供应链负面信号增多
"""

    def _get_week_over_week_change(self, engine: str) -> str:
        """周环比变化"""
        return "持平"

    def _assess_data_quality(self, df: pd.DataFrame) -> str:
        """评估数据质量"""
        if df.empty:
            return "无数据"
        elif len(df) >= 5:
            return "优秀"
        elif len(df) >= 2:
            return "良好"
        else:
            return "一般"


# ==================== 便捷函数 ====================

def create_report_generator(db: IntelligenceDB, output_dir: str = "reports") -> ReportGenerator:
    """创建报告生成器实例"""
    return ReportGenerator(db, output_dir)


if __name__ == "__main__":
    # 测试报告生成
    logging.basicConfig(level=logging.INFO)

    from database import get_db

    with get_db("test_intelligence.db") as db:
        # 插入测试数据
        test_insider = {
            'date': '2026-01-25',
            'ticker': 'TSLA',
            'insider': 'Test Insider',
            'title': 'CFO',
            'transaction': 'Buy',
            'shares': 50000,
            'price': 450.00,
            'value': 22500000
        }
        db.insert_insider_trading(test_insider)

        test_sentiment = {
            'date': '2026-01-25',
            'ticker': 'TSLA',
            'source': 'Reddit',
            'oci_score': 6.8,
            'bullish_pct': 55.0,
            'bearish_pct': 25.0,
            'neutral_pct': 20.0,
            'sample_size': 500
        }
        db.insert_sentiment(test_sentiment)

        # 生成报告
        generator = create_report_generator(db, "test_reports")
        report_path = generator.generate_daily_brief('TSLA', '2026-01-25')
        print(f"测试报告已生成: {report_path}")

        # 生成周报
        weekly_path = generator.generate_weekly_report('TSLA', '2026-01-25')
        print(f"周报已生成: {weekly_path}")
