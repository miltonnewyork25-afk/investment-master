# IntelligenceEngine v10 - Docker容器化
# 用于一键部署到云端或本地服务器

FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目文件
COPY . .

# 创建必要的目录
RUN mkdir -p data/reports logs

# 设置环境变量
ENV PYTHONUNBUFFERED=1
ENV TZ=UTC

# 创建非root用户
RUN useradd -m -u 1000 intelligence && \
    chown -R intelligence:intelligence /app

USER intelligence

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import sys; sys.exit(0)"

# 默认命令：启动守护进程
CMD ["python", "main.py", "--daemon"]

# 使用示例:
#
# 构建镜像:
#   docker build -t intelligence-engine:v10 .
#
# 运行容器:
#   docker run -d \
#     --name intelligence-engine \
#     -v $(pwd)/data:/app/data \
#     -v $(pwd)/logs:/app/logs \
#     -v $(pwd)/.env:/app/.env \
#     --restart unless-stopped \
#     intelligence-engine:v10
#
# 查看日志:
#   docker logs -f intelligence-engine
#
# 运行单个引擎:
#   docker run --rm \
#     -v $(pwd)/.env:/app/.env \
#     intelligence-engine:v10 \
#     python main.py --engine sec
#
# 生成报告:
#   docker run --rm \
#     -v $(pwd)/data:/app/data \
#     -v $(pwd)/.env:/app/.env \
#     intelligence-engine:v10 \
#     python main.py --report daily
