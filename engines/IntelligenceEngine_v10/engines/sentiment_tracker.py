#!/usr/bin/env python3
"""
Social Sentiment Real-Time Tracker - Engine 2
实时社交媒体情绪追踪引擎

功能：
1. Reddit API集成（多子版块）
2. NLP情感分析（VADER）
3. OCI指数计算（Owner Confidence Index）
4. 历史数据存储与分析
5. 股价相关性回测框架

版本：v1.0
更新日期：2026-01-25
"""

try:
    import praw
    from prawcore.exceptions import ResponseException, RequestException
    PRAW_AVAILABLE = True
except ImportError:
    PRAW_AVAILABLE = False
    print("⚠ PRAW未安装，Reddit API功能不可用。运行: pip install praw")

try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    VADER_AVAILABLE = True
except ImportError:
    VADER_AVAILABLE = False
    print("⚠ vaderSentiment未安装，使用简化情感分析。运行: pip install vaderSentiment")
import json
import csv
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional
import os
import time
from collections import defaultdict
import re


class SentimentTracker:
    """社交媒体情绪追踪核心引擎"""

    # 硬编码配置
    SUBREDDITS = ['teslamotors', 'TeslaFSD', 'RealTesla']
    KEYWORDS = ['FSD', 'autopilot', 'service', 'delivery', 'quality',
                'reliability', 'customer service', 'build quality', 'recall',
                'battery', 'range', 'charging', 'supercharger']

    # 情感极性阈值
    POSITIVE_THRESHOLD = 0.05
    NEGATIVE_THRESHOLD = -0.05

    def __init__(self, config_path: str = None):
        """
        初始化情绪追踪器

        Args:
            config_path: 配置文件路径（包含Reddit API密钥）
        """
        self.config = self._load_config(config_path)
        self.reddit = self._init_reddit() if PRAW_AVAILABLE else None
        self.analyzer = SentimentIntensityAnalyzer() if VADER_AVAILABLE else None
        self.data_dir = self.config.get('data_dir', '../data/sentiment')
        self._ensure_data_dir()

    def _load_config(self, config_path: Optional[str]) -> Dict:
        """加载配置文件"""
        if config_path and os.path.exists(config_path):
            with open(config_path, 'r') as f:
                return json.load(f)

        # 默认配置（需要用户填入API密钥）
        return {
            'reddit': {
                'client_id': 'YOUR_CLIENT_ID',
                'client_secret': 'YOUR_CLIENT_SECRET',
                'user_agent': 'TeslaSentimentTracker/1.0'
            },
            'data_dir': '../data/sentiment',
            'lookback_days': 7,
            'posts_per_subreddit': 100,
            'comments_per_post': 50
        }

    def _init_reddit(self) -> praw.Reddit:
        """初始化Reddit API客户端"""
        try:
            reddit = praw.Reddit(
                client_id=self.config['reddit']['client_id'],
                client_secret=self.config['reddit']['client_secret'],
                user_agent=self.config['reddit']['user_agent']
            )
            # 测试连接
            reddit.user.me()
            print("✓ Reddit API连接成功")
            return reddit
        except Exception as e:
            print(f"⚠ Reddit API未配置或连接失败: {e}")
            print("提示：请在sentiment_config.py中配置API密钥")
            return None

    def _ensure_data_dir(self):
        """确保数据目录存在"""
        os.makedirs(self.data_dir, exist_ok=True)

    def scrape_reddit(self, subreddit_name: str,
                     limit: int = 100,
                     time_filter: str = 'week') -> List[Dict]:
        """
        抓取指定子版块的帖子和评论

        Args:
            subreddit_name: 子版块名称
            limit: 抓取帖子数量
            time_filter: 时间过滤（day/week/month/year）

        Returns:
            包含帖子和评论数据的列表
        """
        if not self.reddit:
            return []

        posts_data = []

        try:
            subreddit = self.reddit.subreddit(subreddit_name)

            # 抓取热门帖子
            for submission in subreddit.top(time_filter=time_filter, limit=limit):
                post_data = {
                    'id': submission.id,
                    'subreddit': subreddit_name,
                    'title': submission.title,
                    'selftext': submission.selftext,
                    'score': submission.score,
                    'upvote_ratio': submission.upvote_ratio,
                    'num_comments': submission.num_comments,
                    'created_utc': datetime.fromtimestamp(submission.created_utc),
                    'url': submission.url,
                    'author': str(submission.author) if submission.author else '[deleted]',
                    'comments': []
                }

                # 抓取评论（限制数量）
                try:
                    submission.comments.replace_more(limit=0)  # 不展开"更多评论"
                    for comment in submission.comments.list()[:self.config.get('comments_per_post', 50)]:
                        if hasattr(comment, 'body'):
                            post_data['comments'].append({
                                'id': comment.id,
                                'body': comment.body,
                                'score': comment.score,
                                'created_utc': datetime.fromtimestamp(comment.created_utc),
                                'author': str(comment.author) if comment.author else '[deleted]'
                            })
                except Exception as e:
                    print(f"  ⚠ 评论抓取失败: {e}")

                posts_data.append(post_data)

            print(f"✓ {subreddit_name}: 抓取 {len(posts_data)} 篇帖子")

        except Exception as e:
            print(f"✗ {subreddit_name}: 抓取失败 - {e}")

        return posts_data

    def analyze_sentiment(self, text: str) -> Dict[str, float]:
        """
        使用VADER分析文本情感

        Args:
            text: 待分析文本

        Returns:
            情感分数字典 {neg, neu, pos, compound}
        """
        if not text or not isinstance(text, str):
            return {'neg': 0, 'neu': 1, 'pos': 0, 'compound': 0}

        if VADER_AVAILABLE and self.analyzer:
            return self.analyzer.polarity_scores(text)
        else:
            # 简化版情感分析（基于关键词）
            return self._simple_sentiment_analysis(text)

    def _simple_sentiment_analysis(self, text: str) -> Dict[str, float]:
        """简化版情感分析（当VADER不可用时）"""
        text_lower = text.lower()

        # 正面词
        positive_words = ['amazing', 'great', 'best', 'love', 'excellent', 'perfect',
                         'incredible', 'awesome', 'fantastic', 'outstanding', 'wonderful',
                         'impressed', 'exceeded', 'flawless', 'game changer']

        # 负面词
        negative_words = ['terrible', 'worst', 'hate', 'awful', 'horrible', 'disappointed',
                         'useless', 'nightmare', 'issues', 'problems', 'failed', 'broken',
                         'dangerous', 'joke', 'unacceptable', 'frustrating']

        pos_count = sum(1 for word in positive_words if word in text_lower)
        neg_count = sum(1 for word in negative_words if word in text_lower)

        total = pos_count + neg_count
        if total == 0:
            return {'neg': 0, 'neu': 1, 'pos': 0, 'compound': 0}

        pos_ratio = pos_count / total
        neg_ratio = neg_count / total

        compound = (pos_count - neg_count) / max(1, total) * 0.5  # 归一化到[-0.5, 0.5]

        return {
            'neg': neg_ratio,
            'neu': max(0, 1 - pos_ratio - neg_ratio),
            'pos': pos_ratio,
            'compound': compound
        }

    def contains_keywords(self, text: str, keywords: List[str]) -> bool:
        """检查文本是否包含关键词"""
        if not text:
            return False
        text_lower = text.lower()
        return any(keyword.lower() in text_lower for keyword in keywords)

    def process_posts(self, posts_data: List[Dict]) -> pd.DataFrame:
        """
        处理帖子数据，计算情感分数

        Args:
            posts_data: 抓取的帖子数据

        Returns:
            包含情感分析结果的DataFrame
        """
        processed_data = []

        for post in posts_data:
            # 分析标题情感
            title_sentiment = self.analyze_sentiment(post['title'])

            # 分析正文情感
            text_sentiment = self.analyze_sentiment(post['selftext'])

            # 检查是否包含关键词
            full_text = f"{post['title']} {post['selftext']}"
            has_keywords = self.contains_keywords(full_text, self.KEYWORDS)
            matched_keywords = [kw for kw in self.KEYWORDS if kw.lower() in full_text.lower()]

            # 综合情感（加权：标题40%，正文60%）
            compound_score = title_sentiment['compound'] * 0.4 + text_sentiment['compound'] * 0.6

            processed_data.append({
                'post_id': post['id'],
                'subreddit': post['subreddit'],
                'created_utc': post['created_utc'],
                'title': post['title'][:100],  # 截断以便存储
                'score': post['score'],
                'upvote_ratio': post['upvote_ratio'],
                'num_comments': post['num_comments'],
                'title_sentiment': title_sentiment['compound'],
                'text_sentiment': text_sentiment['compound'],
                'compound_sentiment': compound_score,
                'has_keywords': has_keywords,
                'matched_keywords': ','.join(matched_keywords) if matched_keywords else '',
                'sentiment_label': self._label_sentiment(compound_score),
                'comments_count': len(post.get('comments', [])),
                'author': post['author']
            })

            # 处理评论
            for comment in post.get('comments', []):
                comment_sentiment = self.analyze_sentiment(comment['body'])
                comment_has_keywords = self.contains_keywords(comment['body'], self.KEYWORDS)

                processed_data.append({
                    'post_id': post['id'],
                    'subreddit': post['subreddit'],
                    'created_utc': comment['created_utc'],
                    'title': f"[Comment] {comment['body'][:100]}",
                    'score': comment['score'],
                    'upvote_ratio': None,  # 评论无upvote_ratio
                    'num_comments': 0,
                    'title_sentiment': comment_sentiment['compound'],
                    'text_sentiment': 0,
                    'compound_sentiment': comment_sentiment['compound'],
                    'has_keywords': comment_has_keywords,
                    'matched_keywords': '',
                    'sentiment_label': self._label_sentiment(comment_sentiment['compound']),
                    'comments_count': 0,
                    'author': comment['author']
                })

        df = pd.DataFrame(processed_data)
        return df

    def _label_sentiment(self, compound_score: float) -> str:
        """给情感分数打标签"""
        if compound_score >= self.POSITIVE_THRESHOLD:
            return 'positive'
        elif compound_score <= self.NEGATIVE_THRESHOLD:
            return 'negative'
        else:
            return 'neutral'

    def calculate_oci(self, df: pd.DataFrame, window_days: int = 7) -> Dict:
        """
        计算OCI指数（Owner Confidence Index）

        OCI = (正面提及数 - 负面提及数) / 总提及数 * 100
        考虑因素：
        - 情感极性
        - 帖子热度（score）
        - 关键词匹配

        Args:
            df: 处理后的数据DataFrame
            window_days: 计算窗口（天数）

        Returns:
            OCI指数和相关统计数据
        """
        if df.empty:
            return {
                'oci_score': 0,
                'oci_7d': 0,
                'oci_30d': 0,
                'positive_ratio': 0,
                'negative_ratio': 0,
                'neutral_ratio': 0,
                'total_mentions': 0,
                'keyword_mentions': 0
            }

        # 只考虑包含关键词的帖子/评论
        keyword_df = df[df['has_keywords'] == True].copy()

        # 计算情感分布
        total = len(keyword_df)
        if total == 0:
            return {
                'oci_score': 0,
                'oci_7d': 0,
                'oci_30d': 0,
                'positive_ratio': 0,
                'negative_ratio': 0,
                'neutral_ratio': 0,
                'total_mentions': 0,
                'keyword_mentions': 0
            }

        positive_count = len(keyword_df[keyword_df['sentiment_label'] == 'positive'])
        negative_count = len(keyword_df[keyword_df['sentiment_label'] == 'negative'])
        neutral_count = len(keyword_df[keyword_df['sentiment_label'] == 'neutral'])

        # OCI基础分数
        oci_score = ((positive_count - negative_count) / total) * 100

        # 加权OCI（考虑帖子热度）
        keyword_df['weighted_sentiment'] = keyword_df['compound_sentiment'] * np.log1p(keyword_df['score'])
        weighted_oci = keyword_df['weighted_sentiment'].sum() / keyword_df['score'].sum() * 100 if keyword_df['score'].sum() > 0 else 0

        # 计算7天和30天移动平均
        now = datetime.now()
        df_7d = keyword_df[keyword_df['created_utc'] >= now - timedelta(days=7)]
        df_30d = keyword_df[keyword_df['created_utc'] >= now - timedelta(days=30)]

        oci_7d = self._calculate_raw_oci(df_7d)
        oci_30d = self._calculate_raw_oci(df_30d)

        return {
            'oci_score': round(oci_score, 2),
            'weighted_oci': round(weighted_oci, 2),
            'oci_7d': round(oci_7d, 2),
            'oci_30d': round(oci_30d, 2),
            'positive_ratio': round(positive_count / total * 100, 2),
            'negative_ratio': round(negative_count / total * 100, 2),
            'neutral_ratio': round(neutral_count / total * 100, 2),
            'total_mentions': len(df),
            'keyword_mentions': total,
            'avg_compound_score': round(keyword_df['compound_sentiment'].mean(), 3),
            'avg_post_score': round(keyword_df['score'].mean(), 1)
        }

    def _calculate_raw_oci(self, df: pd.DataFrame) -> float:
        """计算原始OCI分数"""
        if len(df) == 0:
            return 0
        positive = len(df[df['sentiment_label'] == 'positive'])
        negative = len(df[df['sentiment_label'] == 'negative'])
        return ((positive - negative) / len(df)) * 100

    def analyze_by_subreddit(self, df: pd.DataFrame) -> pd.DataFrame:
        """按子版块分组分析"""
        if df.empty:
            return pd.DataFrame()

        grouped = df.groupby('subreddit').agg({
            'compound_sentiment': ['mean', 'std', 'count'],
            'score': 'sum',
            'has_keywords': 'sum'
        }).round(3)

        grouped.columns = ['_'.join(col) for col in grouped.columns]
        grouped = grouped.reset_index()

        # 计算每个子版块的OCI
        oci_by_sub = {}
        for subreddit in df['subreddit'].unique():
            sub_df = df[df['subreddit'] == subreddit]
            oci_by_sub[subreddit] = self._calculate_raw_oci(sub_df[sub_df['has_keywords'] == True])

        grouped['oci_score'] = grouped['subreddit'].map(oci_by_sub).round(2)

        return grouped

    def analyze_keyword_trends(self, df: pd.DataFrame) -> pd.DataFrame:
        """分析关键词趋势"""
        if df.empty:
            return pd.DataFrame()

        keyword_df = df[df['has_keywords'] == True].copy()
        if keyword_df.empty:
            return pd.DataFrame()

        # 统计每个关键词的提及次数和情感
        keyword_stats = []
        for keyword in self.KEYWORDS:
            mask = keyword_df['matched_keywords'].str.contains(keyword, case=False, na=False)
            kw_data = keyword_df[mask]

            if len(kw_data) > 0:
                keyword_stats.append({
                    'keyword': keyword,
                    'mentions': len(kw_data),
                    'avg_sentiment': round(kw_data['compound_sentiment'].mean(), 3),
                    'positive_ratio': round(len(kw_data[kw_data['sentiment_label'] == 'positive']) / len(kw_data) * 100, 1),
                    'negative_ratio': round(len(kw_data[kw_data['sentiment_label'] == 'negative']) / len(kw_data) * 100, 1),
                    'avg_score': round(kw_data['score'].mean(), 1)
                })

        return pd.DataFrame(keyword_stats).sort_values('mentions', ascending=False)

    def save_data(self, df: pd.DataFrame, oci_metrics: Dict, filename_prefix: str = 'sentiment'):
        """保存数据到JSON和CSV"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

        # 保存CSV
        csv_path = os.path.join(self.data_dir, f'{filename_prefix}_{timestamp}.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8-sig')
        print(f"✓ CSV已保存: {csv_path}")

        # 保存JSON（包含OCI指标）
        json_path = os.path.join(self.data_dir, f'{filename_prefix}_{timestamp}.json')
        output_data = {
            'timestamp': timestamp,
            'oci_metrics': oci_metrics,
            'data_summary': {
                'total_records': len(df),
                'subreddits': df['subreddit'].unique().tolist(),
                'date_range': {
                    'start': df['created_utc'].min().isoformat() if not df.empty else None,
                    'end': df['created_utc'].max().isoformat() if not df.empty else None
                }
            },
            'records': df.to_dict(orient='records')
        }

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False, default=str)
        print(f"✓ JSON已保存: {json_path}")

        return csv_path, json_path

    def generate_report(self, df: pd.DataFrame, oci_metrics: Dict,
                       subreddit_analysis: pd.DataFrame,
                       keyword_analysis: pd.DataFrame) -> str:
        """生成分析报告"""
        report = []
        report.append("=" * 80)
        report.append("Tesla社交媒体情绪分析报告".center(80))
        report.append("=" * 80)
        report.append(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

        # OCI指标
        report.append("【OCI指数 - Owner Confidence Index】")
        report.append(f"  当前OCI分数: {oci_metrics['oci_score']:.2f}")
        report.append(f"  加权OCI分数: {oci_metrics['weighted_oci']:.2f}")
        report.append(f"  7天移动平均: {oci_metrics['oci_7d']:.2f}")
        report.append(f"  30天移动平均: {oci_metrics['oci_30d']:.2f}")
        report.append(f"  OCI解读: {self._interpret_oci(oci_metrics['oci_score'])}\n")

        # 情感分布
        report.append("【情感分布】")
        report.append(f"  正面: {oci_metrics['positive_ratio']:.1f}%")
        report.append(f"  中性: {oci_metrics['neutral_ratio']:.1f}%")
        report.append(f"  负面: {oci_metrics['negative_ratio']:.1f}%")
        report.append(f"  总提及数: {oci_metrics['total_mentions']}")
        report.append(f"  关键词提及数: {oci_metrics['keyword_mentions']}\n")

        # 按子版块分析
        if not subreddit_analysis.empty:
            report.append("【子版块分析】")
            for _, row in subreddit_analysis.iterrows():
                report.append(f"  {row['subreddit']}:")
                report.append(f"    OCI分数: {row['oci_score']:.2f}")
                report.append(f"    平均情感: {row['compound_sentiment_mean']:.3f}")
                report.append(f"    帖子数: {int(row['compound_sentiment_count'])}")
                report.append(f"    总热度: {int(row['score_sum'])}")
            report.append("")

        # 关键词趋势
        if not keyword_analysis.empty:
            report.append("【关键词热度Top 10】")
            for idx, row in keyword_analysis.head(10).iterrows():
                report.append(f"  {row['keyword']}:")
                report.append(f"    提及数: {row['mentions']} | 情感: {row['avg_sentiment']:.3f} | "
                            f"正面率: {row['positive_ratio']:.1f}%")
            report.append("")

        # 数据质量
        report.append("【数据质量】")
        report.append(f"  数据条目数: {len(df)}")
        report.append(f"  时间跨度: {df['created_utc'].min().strftime('%Y-%m-%d')} 至 "
                     f"{df['created_utc'].max().strftime('%Y-%m-%d')}")
        report.append(f"  平均复合情感分数: {oci_metrics['avg_compound_score']:.3f}")
        report.append(f"  平均帖子热度: {oci_metrics['avg_post_score']:.1f}")

        report.append("=" * 80)

        return '\n'.join(report)

    def _interpret_oci(self, oci_score: float) -> str:
        """解读OCI分数"""
        if oci_score >= 40:
            return "极度乐观（Strong Bullish）"
        elif oci_score >= 20:
            return "乐观（Bullish）"
        elif oci_score >= 0:
            return "轻微乐观（Slightly Bullish）"
        elif oci_score >= -20:
            return "轻微悲观（Slightly Bearish）"
        elif oci_score >= -40:
            return "悲观（Bearish）"
        else:
            return "极度悲观（Strong Bearish）"

    def run_full_analysis(self, subreddits: List[str] = None,
                         time_filter: str = 'week',
                         limit_per_sub: int = 100) -> Tuple[pd.DataFrame, Dict]:
        """
        运行完整分析流程

        Args:
            subreddits: 子版块列表（默认使用SUBREDDITS）
            time_filter: 时间过滤
            limit_per_sub: 每个子版块抓取帖子数

        Returns:
            (数据DataFrame, OCI指标字典)
        """
        if subreddits is None:
            subreddits = self.SUBREDDITS

        print(f"\n{'='*60}")
        print(f"开始社交媒体情绪分析".center(60))
        print(f"{'='*60}\n")

        # 1. 抓取数据
        all_posts = []
        for subreddit in subreddits:
            print(f"正在抓取 r/{subreddit}...")
            posts = self.scrape_reddit(subreddit, limit=limit_per_sub, time_filter=time_filter)
            all_posts.extend(posts)
            time.sleep(1)  # 避免API限流

        if not all_posts:
            print("⚠ 未抓取到数据，请检查Reddit API配置")
            return pd.DataFrame(), {}

        print(f"\n✓ 总计抓取 {len(all_posts)} 篇帖子\n")

        # 2. 处理数据
        print("正在分析情感...")
        df = self.process_posts(all_posts)
        print(f"✓ 处理完成：{len(df)} 条记录\n")

        # 3. 计算OCI
        print("正在计算OCI指数...")
        oci_metrics = self.calculate_oci(df)
        print("✓ OCI计算完成\n")

        # 4. 按子版块分析
        print("正在分析子版块...")
        subreddit_analysis = self.analyze_by_subreddit(df)
        print("✓ 子版块分析完成\n")

        # 5. 关键词分析
        print("正在分析关键词趋势...")
        keyword_analysis = self.analyze_keyword_trends(df)
        print("✓ 关键词分析完成\n")

        # 6. 生成报告
        report = self.generate_report(df, oci_metrics, subreddit_analysis, keyword_analysis)
        print(report)

        # 7. 保存数据
        print("\n正在保存数据...")
        self.save_data(df, oci_metrics)

        # 8. 保存分析结果
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report_path = os.path.join(self.data_dir, f'report_{timestamp}.txt')
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)
        print(f"✓ 报告已保存: {report_path}")

        # 保存子版块分析
        if not subreddit_analysis.empty:
            sub_path = os.path.join(self.data_dir, f'subreddit_analysis_{timestamp}.csv')
            subreddit_analysis.to_csv(sub_path, index=False)
            print(f"✓ 子版块分析已保存: {sub_path}")

        # 保存关键词分析
        if not keyword_analysis.empty:
            kw_path = os.path.join(self.data_dir, f'keyword_analysis_{timestamp}.csv')
            keyword_analysis.to_csv(kw_path, index=False)
            print(f"✓ 关键词分析已保存: {kw_path}")

        print(f"\n{'='*60}")
        print(f"分析完成！".center(60))
        print(f"{'='*60}\n")

        return df, oci_metrics


def main():
    """主函数 - 演示用法"""
    # 初始化追踪器
    config_path = '../config/sentiment_config.json'
    tracker = SentimentTracker(config_path)

    # 运行完整分析
    df, oci_metrics = tracker.run_full_analysis(
        time_filter='week',
        limit_per_sub=100
    )

    print(f"\n分析完成！OCI分数: {oci_metrics.get('oci_score', 0):.2f}")


if __name__ == '__main__':
    main()
