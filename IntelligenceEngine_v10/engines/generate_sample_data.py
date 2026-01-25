#!/usr/bin/env python3
"""
示例数据生成器 - 用于在没有Reddit API密钥时测试sentiment_tracker

功能：
1. 生成模拟Reddit帖子和评论数据
2. 包含真实的情感分布
3. 涵盖所有关键词
4. 可配置数据量和情感倾向
"""

from datetime import datetime, timedelta
import random
import json


class SampleDataGenerator:
    """示例数据生成器"""

    # 模拟帖子标题模板（正面）
    POSITIVE_TITLES = [
        "FSD v12 is incredible! {miles} miles with zero interventions",
        "Just got my delivery - build quality is amazing!",
        "Supercharger network saved my road trip",
        "Customer service resolved my issue in 24 hours",
        "Battery range exceeded expectations - got {range} miles",
        "Autopilot is getting better with every update",
        "Best car I've ever owned - reliability has been perfect",
        "Charging at home is so convenient",
        "The service center team was outstanding",
        "FSD Beta blew my mind today 🚀"
    ]

    # 模拟帖子标题模板（负面）
    NEGATIVE_TITLES = [
        "Another recall - quality control is a joke",
        "FSD tried to kill me today, disengaging immediately",
        "Delivery nightmare - {weeks} weeks of delays",
        "Service appointment canceled AGAIN",
        "Build quality issues: panel gaps everywhere",
        "Battery degradation is worse than expected",
        "Supercharger was down, stranded for hours",
        "Customer service is completely useless",
        "Autopilot phantom braking is dangerous",
        "Range anxiety is real - {range} miles less than advertised"
    ]

    # 模拟帖子标题模板（中性）
    NEUTRAL_TITLES = [
        "Question about FSD subscription",
        "How long does delivery usually take?",
        "Comparing Supercharger vs home charging costs",
        "Service appointment scheduled for next week",
        "Battery warranty terms clarification needed",
        "Autopilot vs FSD - what's the difference?",
        "Anyone know the current wait time for Model 3?",
        "Quality inspection checklist before delivery?",
        "Charging etiquette at Superchargers",
        "Reliability data for high mileage Teslas?"
    ]

    # 评论模板（正面）
    POSITIVE_COMMENTS = [
        "Totally agree! Best decision ever.",
        "Same experience here - flawless!",
        "This is why I love Tesla 💙",
        "Game changer for sure",
        "My experience was similar - exceeded expectations",
        "Tesla continues to impress",
        "Worth every penny",
        "Can confirm - amazing technology"
    ]

    # 评论模板（负面）
    NEGATIVE_COMMENTS = [
        "Same problem here, very frustrating",
        "This is unacceptable for a $50k car",
        "Quality has gone downhill",
        "I'm seriously considering selling mine",
        "Terrible experience, would not recommend",
        "This company doesn't care about customers",
        "Overpromised and underdelivered",
        "Safety concern - needs immediate fix"
    ]

    # 评论模板（中性）
    NEUTRAL_COMMENTS = [
        "Thanks for sharing your experience",
        "Good to know, appreciate the info",
        "Has anyone else experienced this?",
        "What was your specific configuration?",
        "Can you provide more details?",
        "Interesting data point",
        "I'd like to hear from others too",
        "When did you place your order?"
    ]

    def __init__(self, sentiment_bias: float = 0.0):
        """
        初始化生成器

        Args:
            sentiment_bias: 情感倾向（-1.0到1.0）
                           -1.0 = 全部负面
                            0.0 = 平衡
                           +1.0 = 全部正面
        """
        self.sentiment_bias = max(-1.0, min(1.0, sentiment_bias))

    def _get_sentiment_distribution(self):
        """根据bias计算情感分布概率"""
        # 基础分布：40% positive, 40% negative, 20% neutral
        base_pos = 0.40
        base_neg = 0.40
        base_neu = 0.20

        # 调整分布
        if self.sentiment_bias > 0:
            # 偏向正面
            pos = base_pos + (0.5 - base_pos) * self.sentiment_bias
            neg = base_neg * (1 - self.sentiment_bias)
            neu = 1 - pos - neg
        elif self.sentiment_bias < 0:
            # 偏向负面
            neg = base_neg + (0.5 - base_neg) * abs(self.sentiment_bias)
            pos = base_pos * (1 - abs(self.sentiment_bias))
            neu = 1 - pos - neg
        else:
            pos, neg, neu = base_pos, base_neg, base_neu

        return {'positive': pos, 'negative': neg, 'neutral': neu}

    def _choose_sentiment(self):
        """随机选择情感类型（基于分布）"""
        dist = self._get_sentiment_distribution()
        rand = random.random()

        if rand < dist['positive']:
            return 'positive'
        elif rand < dist['positive'] + dist['negative']:
            return 'negative'
        else:
            return 'neutral'

    def _generate_post(self, post_id: int, subreddit: str,
                      created_time: datetime, sentiment: str = None):
        """生成单个帖子"""
        if sentiment is None:
            sentiment = self._choose_sentiment()

        # 选择标题模板
        if sentiment == 'positive':
            title = random.choice(self.POSITIVE_TITLES)
            score = random.randint(50, 800)
            upvote_ratio = random.uniform(0.85, 0.98)
        elif sentiment == 'negative':
            title = random.choice(self.NEGATIVE_TITLES)
            score = random.randint(20, 400)
            upvote_ratio = random.uniform(0.60, 0.85)
        else:
            title = random.choice(self.NEUTRAL_TITLES)
            score = random.randint(5, 150)
            upvote_ratio = random.uniform(0.70, 0.90)

        # 填充动态值
        title = title.format(
            miles=random.randint(100, 500),
            range=random.randint(250, 350),
            weeks=random.randint(2, 8)
        )

        # 生成简短正文（30%的帖子有正文）
        selftext = ""
        if random.random() < 0.3:
            if sentiment == 'positive':
                selftext = "Everything exceeded my expectations. Highly recommend!"
            elif sentiment == 'negative':
                selftext = "Very disappointed with the overall experience."
            else:
                selftext = "Looking for advice from the community."

        return {
            'id': f'post_{post_id}',
            'subreddit': subreddit,
            'title': title,
            'selftext': selftext,
            'score': score,
            'upvote_ratio': upvote_ratio,
            'num_comments': random.randint(5, 100),
            'created_utc': created_time,
            'url': f'https://reddit.com/r/{subreddit}/post_{post_id}',
            'author': f'user_{random.randint(1, 1000)}',
            'comments': []
        }

    def _generate_comment(self, comment_id: int,
                         created_time: datetime, sentiment: str = None):
        """生成单个评论"""
        if sentiment is None:
            sentiment = self._choose_sentiment()

        # 选择评论模板
        if sentiment == 'positive':
            body = random.choice(self.POSITIVE_COMMENTS)
            score = random.randint(5, 80)
        elif sentiment == 'negative':
            body = random.choice(self.NEGATIVE_COMMENTS)
            score = random.randint(3, 50)
        else:
            body = random.choice(self.NEUTRAL_COMMENTS)
            score = random.randint(1, 30)

        return {
            'id': f'comment_{comment_id}',
            'body': body,
            'score': score,
            'created_utc': created_time,
            'author': f'user_{random.randint(1, 1000)}'
        }

    def generate_dataset(self, num_posts: int = 100,
                        comments_per_post: int = 10,
                        subreddits: list = None,
                        days_back: int = 7):
        """
        生成完整数据集

        Args:
            num_posts: 总帖子数
            comments_per_post: 每个帖子的平均评论数
            subreddits: 子版块列表
            days_back: 数据时间跨度（天）

        Returns:
            帖子列表
        """
        if subreddits is None:
            subreddits = ['teslamotors', 'TeslaFSD', 'RealTesla']

        posts = []
        post_id = 0
        comment_id = 0

        # 为每个子版块生成帖子
        posts_per_sub = num_posts // len(subreddits)

        for subreddit in subreddits:
            # RealTesla倾向更负面
            if subreddit == 'RealTesla':
                sub_bias = -0.5
            else:
                sub_bias = self.sentiment_bias

            for i in range(posts_per_sub):
                # 生成时间戳（过去days_back天内随机）
                random_hours = random.randint(0, days_back * 24)
                created_time = datetime.now() - timedelta(hours=random_hours)

                # 重新设置临时bias
                original_bias = self.sentiment_bias
                self.sentiment_bias = sub_bias

                post = self._generate_post(post_id, subreddit, created_time)

                # 生成评论（随机数量）
                num_comments = random.randint(
                    max(1, comments_per_post - 5),
                    comments_per_post + 5
                )

                for j in range(num_comments):
                    # 评论时间稍晚于帖子
                    max_minutes = max(60, random_hours * 60)  # 至少1小时后
                    comment_time = created_time + timedelta(
                        minutes=random.randint(10, max_minutes)
                    )
                    comment = self._generate_comment(comment_id, comment_time)
                    post['comments'].append(comment)
                    comment_id += 1

                posts.append(post)
                post_id += 1

                # 恢复原始bias
                self.sentiment_bias = original_bias

        # 随机打乱顺序
        random.shuffle(posts)

        print(f"✓ 生成 {len(posts)} 篇帖子，{comment_id} 条评论")
        print(f"  子版块: {', '.join(subreddits)}")
        print(f"  时间跨度: {days_back} 天")
        print(f"  情感倾向: {self.sentiment_bias:.2f} "
              f"({self._interpret_bias(self.sentiment_bias)})")

        return posts

    def _interpret_bias(self, bias):
        """解读情感倾向"""
        if bias > 0.5:
            return "强烈正面"
        elif bias > 0.2:
            return "偏正面"
        elif bias > -0.2:
            return "平衡"
        elif bias > -0.5:
            return "偏负面"
        else:
            return "强烈负面"

    def save_to_json(self, posts, filename='sample_reddit_data.json'):
        """保存到JSON文件"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump({
                'generated_at': datetime.now().isoformat(),
                'sentiment_bias': self.sentiment_bias,
                'total_posts': len(posts),
                'posts': posts
            }, f, indent=2, ensure_ascii=False, default=str)

        print(f"✓ 数据已保存: {filename}")
        return filename


def main():
    """主函数 - 生成示例数据"""
    print("\n" + "="*60)
    print("示例Reddit数据生成器".center(60))
    print("="*60 + "\n")

    # 生成三个场景的数据

    # 场景1：乐观情绪（OCI应为正）
    print("[场景1] 生成乐观情绪数据...")
    gen_positive = SampleDataGenerator(sentiment_bias=0.3)
    posts_positive = gen_positive.generate_dataset(
        num_posts=100,
        comments_per_post=10,
        days_back=7
    )
    gen_positive.save_to_json(posts_positive,
                             '../data/sentiment/sample_positive.json')
    print()

    # 场景2：悲观情绪（OCI应为负）
    print("[场景2] 生成悲观情绪数据...")
    gen_negative = SampleDataGenerator(sentiment_bias=-0.3)
    posts_negative = gen_negative.generate_dataset(
        num_posts=100,
        comments_per_post=10,
        days_back=7
    )
    gen_negative.save_to_json(posts_negative,
                             '../data/sentiment/sample_negative.json')
    print()

    # 场景3：中性情绪（OCI应接近0）
    print("[场景3] 生成中性情绪数据...")
    gen_neutral = SampleDataGenerator(sentiment_bias=0.0)
    posts_neutral = gen_neutral.generate_dataset(
        num_posts=100,
        comments_per_post=10,
        days_back=7
    )
    gen_neutral.save_to_json(posts_neutral,
                            '../data/sentiment/sample_neutral.json')
    print()

    print("="*60)
    print("示例数据生成完成！".center(60))
    print("="*60)
    print("\n提示：可以用这些数据测试sentiment_tracker.py")
    print("示例：python test_with_sample_data.py\n")


if __name__ == '__main__':
    main()
