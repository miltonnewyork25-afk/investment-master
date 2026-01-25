# Tesla Intelligence Engine - Docker 配置
# 用于容器化部署

FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY *.py .
COPY *.json* ./

# 创建数据目录
RUN mkdir -p /app/data /app/reports /app/reports/charts /app/logs

# 设置环境变量
ENV PYTHONUNBUFFERED=1
ENV TZ=America/New_York

# 设置用户（安全）
RUN useradd -m -u 1000 intelligence && \
    chown -R intelligence:intelligence /app
USER intelligence

# 健康检查
HEALTHCHECK --interval=5m --timeout=10s --start-period=30s --retries=3 \
    CMD python -c "import sqlite3; conn = sqlite3.connect('tesla_intelligence.db'); conn.close()" || exit 1

# 挂载点
VOLUME ["/app/data", "/app/reports", "/app/logs"]

# 默认命令
CMD ["python", "scheduler.py"]
