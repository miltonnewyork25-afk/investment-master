# 投资大师 Worktree 管理 Makefile

.PHONY: help commit status clean switch create-worktree health-check

# 默认目标
help:
	@echo "🤖 投资大师 Worktree 管理命令"
	@echo "================================"
	@echo "基础操作:"
	@echo "  make commit MSG='提交信息'    - 智能提交(默认不同步main)"
	@echo "  make status                  - 查看所有worktree状态"
	@echo "  make clean                   - 清理备份文件和临时文件"
	@echo ""
	@echo "Worktree操作:"
	@echo "  make switch NAME=半导体       - 切换到指定worktree"
	@echo "  make list                    - 列出所有worktree"
	@echo "  make health                  - 健康检查所有worktree"
	@echo ""
	@echo "示例:"
	@echo "  make commit MSG='feat: 新增投资温度计功能'"
	@echo "  make switch NAME=消费品"

# 智能提交
commit:
	@if [ -z "$(MSG)" ]; then \
		echo "❌ 错误: 请提供提交信息"; \
		echo "使用方法: make commit MSG='提交信息'"; \
		exit 1; \
	fi
	@chmod +x scripts/smart_commit.sh
	@./scripts/smart_commit.sh "$(MSG)"

# 查看所有worktree状态
status:
	@echo "📊 Worktree状态总览"
	@echo "==================="
	@git worktree list
	@echo ""
	@current_branch=$$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown"); \
	echo "🎯 当前分支: $$current_branch"; \
	if [ "$$current_branch" != "main" ]; then \
		echo "📋 当前worktree状态:"; \
		git status --porcelain | wc -l | xargs -I {} echo "  - 待提交文件: {} 个"; \
		git log --oneline -5 | head -1 | xargs -I {} echo "  - 最新提交: {}"; \
	fi

# 列出所有worktree
list:
	@echo "📁 所有Worktree列表"
	@echo "=================="
	@git worktree list --porcelain | grep -E '^worktree|^branch' | \
		awk '/^worktree/ {w=$$2} /^branch/ {print w " -> " $$2}' | \
		sed 's/refs\/heads\///'

# 切换worktree
switch:
	@if [ -z "$(NAME)" ]; then \
		echo "❌ 错误: 请指定worktree名称"; \
		echo "使用方法: make switch NAME=worktree名称"; \
		echo "可用的worktree:"; \
		make list; \
		exit 1; \
	fi
	@worktree_path=".worktrees/$(NAME)"; \
	if [ -d "$$worktree_path" ]; then \
		echo "🔄 切换到worktree: $(NAME)"; \
		cd "$$worktree_path"; \
		exec bash; \
	else \
		echo "❌ 错误: Worktree '$(NAME)' 不存在"; \
		echo "可用的worktree:"; \
		make list; \
	fi

# 健康检查
health:
	@echo "🏥 Worktree健康检查"
	@echo "==================="
	@if [ -f "tests/framework_health_check.sh" ]; then \
		chmod +x tests/framework_health_check.sh; \
		./tests/framework_health_check.sh; \
	else \
		echo "❌ 健康检查脚本不存在: tests/framework_health_check.sh"; \
	fi

# 清理临时文件
clean:
	@echo "🧹 清理临时文件..."
	@find . -name "*_backup.md" -type f -delete 2>/dev/null || true
	@find . -name ".lock.json" -type f -delete 2>/dev/null || true
	@find . -name "task_plan_old.md" -type f -delete 2>/dev/null || true
	@find logs/ -name "*.log" -mtime +30 -delete 2>/dev/null || true
	@echo "✅ 清理完成"

# 创建新的worktree (高级功能)
create-worktree:
	@if [ -z "$(NAME)" ]; then \
		echo "❌ 错误: 请指定新worktree名称"; \
		echo "使用方法: make create-worktree NAME=新行业名称"; \
		exit 1; \
	fi
	@echo "🆕 创建新worktree: $(NAME)"; \
	git worktree add ".worktrees/$(NAME)" -b "$(NAME)"; \
	echo "✅ Worktree创建完成: .worktrees/$(NAME)"

# 开发者工具
dev-setup:
	@echo "🔧 设置开发环境..."
	@chmod +x scripts/*.sh
	@mkdir -p logs config
	@echo "✅ 开发环境设置完成"

# 备份当前状态
backup:
	@timestamp=$$(date '+%Y%m%d_%H%M%S'); \
	backup_dir="backups/$$timestamp"; \
	mkdir -p "$$backup_dir"; \
	git worktree list --porcelain > "$$backup_dir/worktree_list.txt"; \
	echo "📦 创建备份: $$backup_dir"; \
	echo "✅ 备份完成"