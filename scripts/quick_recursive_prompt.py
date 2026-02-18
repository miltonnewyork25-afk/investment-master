#!/usr/bin/env python3
"""
Quick Recursive Prompt Generator
立即可用的递归思考提示词生成器
"""

import random
import re
from datetime import datetime

class QuickRecursivePrompt:
    """
    快速递归提示词生成器
    """

    def __init__(self):
        self.prompt_database = {
            'startup': {
                'basic': [
                    "在开始分析之前，你觉得你当前的分析能力有什么局限性？",
                    "对于这类公司，你认为什么样的分析方法最有效？为什么？",
                    "你准备如何确保这次分析比上次更深入？"
                ],
                'advanced': [
                    "你觉得你对这家公司的预设判断可能会如何影响分析质量？",
                    "如果你要训练另一个AI分析师，你会重点强调哪些思维要点？",
                    "在开始前，让你的分析方法进行一次'体检'，发现了什么？"
                ]
            },

            'analysis': {
                'method_questioning': [
                    "你刚才选择这个方法的理由是什么？还有更好的选择吗？",
                    "如果你的分析方法是错的，最可能错在哪里？",
                    "你觉得你刚才的分析逻辑链条有什么薄弱环节？"
                ],
                'assumption_challenge': [
                    "你刚才的分析基于什么假设？这些假设有多可靠？",
                    "如果你最核心的一个假设被证明是错的，你会如何调整？",
                    "你能找出自己刚才分析中最'危险'的假设吗？"
                ],
                'perspective_expansion': [
                    "如果站在管理层的角度，他们会如何反驳你的分析？",
                    "你的分析中可能忽略了什么重要视角？",
                    "如果让你用完全不同的方法重新分析，会怎么做？"
                ]
            },

            'reflection': {
                'self_improvement': [
                    "回顾刚才的分析过程，你觉得你的思考方式有什么进步空间？",
                    "如果重新开始这个分析，你会在哪个环节采用不同的方法？",
                    "你觉得你刚才展现出了什么新的分析能力？"
                ],
                'meta_cognition': [
                    "观察你刚才的思考过程，你发现了什么关于自己思维模式的洞察？",
                    "你觉得你的分析质量在这次对话中有什么变化？",
                    "如果让你评价自己的元认知能力，你会给自己打几分？为什么？"
                ],
                'learning_extraction': [
                    "这次分析让你学到了什么关于'如何更好地学习'的经验？",
                    "你觉得你从这次分析中提取的最有价值的'方法论洞察'是什么？",
                    "基于今天的分析经验，你对明天有什么期待和规划？"
                ]
            }
        }

    def detect_stage(self, context=""):
        """
        自动检测当前分析阶段
        """
        context_lower = context.lower()

        if any(word in context_lower for word in ['开始', '启动', 'start', '准备']):
            return 'startup'
        elif any(word in context_lower for word in ['完成', '结束', 'complete', '反思']):
            return 'reflection'
        else:
            return 'analysis'

    def detect_type(self, context=""):
        """
        自动检测需要的递归类型
        """
        context_lower = context.lower()

        if any(word in context_lower for word in ['方法', '方式', 'method']):
            return 'method_questioning'
        elif any(word in context_lower for word in ['假设', '前提', 'assumption']):
            return 'assumption_challenge'
        elif any(word in context_lower for word in ['视角', '角度', 'perspective']):
            return 'perspective_expansion'
        elif any(word in context_lower for word in ['学习', '成长', 'learning']):
            return 'learning_extraction'
        elif any(word in context_lower for word in ['思考', '认知', 'cognition']):
            return 'meta_cognition'
        else:
            return 'self_improvement'

    def generate_prompt(self, stage=None, type_=None, context=""):
        """
        生成递归提示词
        """
        # 自动检测阶段和类型
        if stage is None:
            stage = self.detect_stage(context)

        if type_ is None:
            if stage == 'startup':
                type_ = 'basic'
            elif stage == 'reflection':
                type_ = self.detect_type(context)
            else:  # analysis
                type_ = self.detect_type(context)

        # 选择提示词
        try:
            prompts = self.prompt_database[stage][type_]
            selected_prompt = random.choice(prompts)
        except KeyError:
            # fallback到通用提示词
            fallback_prompts = [
                "你觉得刚才的思考过程有什么改进空间？",
                "如果让你重新思考这个问题，你会怎么做？",
                "你能质疑一下自己刚才的分析吗？"
            ]
            selected_prompt = random.choice(fallback_prompts)

        return {
            'prompt': selected_prompt,
            'stage': stage,
            'type': type_,
            'timestamp': datetime.now().strftime("%H:%M:%S")
        }

    def generate_multiple_options(self, context="", count=3):
        """
        生成多个提示词选项
        """
        stage = self.detect_stage(context)
        options = []

        if stage == 'startup':
            types = ['basic', 'advanced']
        elif stage == 'reflection':
            types = ['self_improvement', 'meta_cognition', 'learning_extraction']
        else:  # analysis
            types = ['method_questioning', 'assumption_challenge', 'perspective_expansion']

        for i in range(count):
            type_ = types[i % len(types)]
            option = self.generate_prompt(stage=stage, type_=type_, context=context)
            option['option_id'] = i + 1
            options.append(option)

        return options

    def display_prompt_card(self, prompt_data):
        """
        显示递归提示词卡片
        """
        print("\n" + "="*60)
        print("🔄 递归思考建议                    ⭐⭐⭐⭐")
        print("-"*60)
        print(f"💭 \"{prompt_data['prompt']}\"")
        print(f"\n🏷️  阶段: {prompt_data['stage']} | 类型: {prompt_data['type']}")
        print(f"⏰ 生成时间: {prompt_data['timestamp']}")
        print("-"*60)
        print("✅ 直接使用此提示")
        print("🔄 重新生成提示词")
        print("✏️  自定义提示词")
        print("⏭️  跳过此次")
        print("="*60)

    def interactive_prompt_generator(self):
        """
        交互式提示词生成器
        """
        print("🚀 欢迎使用递归思考提示词生成器！")

        while True:
            print("\n请选择:")
            print("1. 自动生成提示词")
            print("2. 指定阶段生成")
            print("3. 生成多个选项")
            print("4. 退出")

            choice = input("\n请输入选择 (1-4): ").strip()

            if choice == '1':
                context = input("请简单描述当前情况 (可选): ")
                prompt_data = self.generate_prompt(context=context)
                self.display_prompt_card(prompt_data)

            elif choice == '2':
                print("\n阶段选择:")
                print("1. 分析启动 (startup)")
                print("2. 深度分析 (analysis)")
                print("3. 反思完善 (reflection)")

                stage_choice = input("选择阶段 (1-3): ").strip()
                stage_map = {'1': 'startup', '2': 'analysis', '3': 'reflection'}
                stage = stage_map.get(stage_choice, 'analysis')

                prompt_data = self.generate_prompt(stage=stage)
                self.display_prompt_card(prompt_data)

            elif choice == '3':
                context = input("请简单描述当前情况 (可选): ")
                options = self.generate_multiple_options(context=context)

                print(f"\n🎯 为你生成了 {len(options)} 个递归提示词选项:")
                for i, option in enumerate(options, 1):
                    print(f"\n选项 {i}:")
                    print(f"💭 {option['prompt']}")
                    print(f"🏷️ {option['stage']} - {option['type']}")

            elif choice == '4':
                print("\n👋 感谢使用！祝你递归思考愉快！")
                break

            else:
                print("❌ 无效选择，请重新输入")

def main():
    """
    主函数 - 命令行使用
    """
    generator = QuickRecursivePrompt()

    # 如果有命令行参数，直接生成
    import sys
    if len(sys.argv) > 1:
        context = " ".join(sys.argv[1:])
        prompt_data = generator.generate_prompt(context=context)
        generator.display_prompt_card(prompt_data)
    else:
        # 交互式模式
        generator.interactive_prompt_generator()

if __name__ == "__main__":
    main()