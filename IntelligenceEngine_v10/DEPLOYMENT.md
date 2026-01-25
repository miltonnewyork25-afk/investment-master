# 部署指南

## 目录
1. [本地部署](#本地部署)
2. [Docker部署](#docker部署)
3. [云端部署](#云端部署)
4. [生产环境配置](#生产环境配置)

---

## 本地部署

### 开发模式

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 添加API密钥

# 3. 测试运行
python main.py --status

# 4. 前台运行
python main.py --daemon
```

### 生产模式 (systemd)

创建 `/etc/systemd/system/intelligence-engine.service`:

```ini
[Unit]
Description=IntelligenceEngine v10
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/IntelligenceEngine_v10
Environment="PATH=/path/to/venv/bin"
ExecStart=/path/to/venv/bin/python main.py --daemon
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl enable intelligence-engine
sudo systemctl start intelligence-engine
sudo systemctl status intelligence-engine
```

---

## Docker部署

### 单容器部署

```bash
# 1. 构建镜像
docker build -t intelligence-engine:v10 .

# 2. 运行容器
docker run -d \
  --name intelligence-engine \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/.env:/app/.env \
  --restart unless-stopped \
  intelligence-engine:v10

# 3. 查看日志
docker logs -f intelligence-engine

# 4. 进入容器
docker exec -it intelligence-engine bash
```

### Docker Compose部署

```bash
# 1. 启动
docker-compose up -d

# 2. 查看状态
docker-compose ps

# 3. 查看日志
docker-compose logs -f

# 4. 停止
docker-compose down
```

### Docker Swarm部署 (多节点)

```bash
# 1. 初始化Swarm
docker swarm init

# 2. 创建配置
docker config create intelligence-config config.yaml

# 3. 创建密钥
docker secret create sec-api-key .env

# 4. 部署stack
docker stack deploy -c docker-compose.yml intelligence

# 5. 查看服务
docker service ls
docker service logs intelligence_intelligence-engine
```

---

## 云端部署

### AWS部署

#### ECS (Elastic Container Service)

1. **推送镜像到ECR**:
```bash
# 登录ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# 构建并推送
docker build -t intelligence-engine .
docker tag intelligence-engine:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/intelligence-engine:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/intelligence-engine:latest
```

2. **创建ECS任务定义**:
```json
{
  "family": "intelligence-engine",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [{
    "name": "intelligence-engine",
    "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/intelligence-engine:latest",
    "environment": [
      {"name": "SEC_API_KEY", "value": "..."}
    ],
    "mountPoints": [{
      "sourceVolume": "data",
      "containerPath": "/app/data"
    }],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/intelligence-engine",
        "awslogs-region": "us-east-1",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }],
  "volumes": [{
    "name": "data",
    "efsVolumeConfiguration": {
      "fileSystemId": "fs-xxx",
      "rootDirectory": "/data"
    }
  }]
}
```

3. **创建ECS服务**:
```bash
aws ecs create-service \
  --cluster intelligence-cluster \
  --service-name intelligence-engine \
  --task-definition intelligence-engine:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

#### EC2 (传统虚拟机)

```bash
# 1. 启动EC2实例 (Ubuntu 22.04)
# 2. SSH连接
ssh -i key.pem ubuntu@ec2-xxx.compute.amazonaws.com

# 3. 安装Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker

# 4. 克隆项目
git clone https://github.com/yourusername/intelligence-engine.git
cd intelligence-engine

# 5. 配置环境变量
cp .env.example .env
nano .env

# 6. 启动
docker-compose up -d
```

### GCP部署

#### Cloud Run

```bash
# 1. 构建并推送到GCR
gcloud builds submit --tag gcr.io/<project-id>/intelligence-engine

# 2. 部署到Cloud Run
gcloud run deploy intelligence-engine \
  --image gcr.io/<project-id>/intelligence-engine \
  --platform managed \
  --region us-central1 \
  --memory 2Gi \
  --cpu 2 \
  --set-env-vars SEC_API_KEY=xxx \
  --allow-unauthenticated
```

#### GKE (Kubernetes)

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: intelligence-engine
spec:
  replicas: 1
  selector:
    matchLabels:
      app: intelligence-engine
  template:
    metadata:
      labels:
        app: intelligence-engine
    spec:
      containers:
      - name: intelligence-engine
        image: gcr.io/<project-id>/intelligence-engine:latest
        env:
        - name: SEC_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: sec-api-key
        volumeMounts:
        - name: data
          mountPath: /app/data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: intelligence-data
```

```bash
kubectl apply -f deployment.yaml
```

### Azure部署

#### Container Instances

```bash
az container create \
  --resource-group intelligence-rg \
  --name intelligence-engine \
  --image <registry>.azurecr.io/intelligence-engine:latest \
  --cpu 2 \
  --memory 4 \
  --environment-variables SEC_API_KEY=xxx \
  --azure-file-volume-account-name <storage-account> \
  --azure-file-volume-account-key <key> \
  --azure-file-volume-share-name intelligence-data \
  --azure-file-volume-mount-path /app/data
```

---

## 生产环境配置

### 高可用性

#### 负载均衡

```yaml
# docker-compose.yml (多副本)
version: '3.8'
services:
  intelligence-engine:
    image: intelligence-engine:v10
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
```

#### 健康检查

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"
```

### 监控

#### Prometheus + Grafana

```yaml
# 添加到docker-compose.yml
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

#### CloudWatch (AWS)

```python
# 添加到main.py
import boto3

cloudwatch = boto3.client('cloudwatch')

def send_metric(metric_name, value):
    cloudwatch.put_metric_data(
        Namespace='IntelligenceEngine',
        MetricData=[{
            'MetricName': metric_name,
            'Value': value,
            'Unit': 'Count'
        }]
    )
```

### 备份策略

#### 自动备份脚本

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/intelligence-engine"
DATE=$(date +%Y%m%d_%H%M%S)

# 备份数据库
cp data/database.db "$BACKUP_DIR/db_$DATE.db"

# 备份报告
tar -czf "$BACKUP_DIR/reports_$DATE.tar.gz" data/reports/

# 清理30天前的备份
find $BACKUP_DIR -type f -mtime +30 -delete

echo "备份完成: $DATE"
```

添加到crontab:
```bash
# 每天凌晨2点备份
0 2 * * * /path/to/backup.sh
```

#### S3备份 (AWS)

```bash
# 每天同步到S3
aws s3 sync data/database.db s3://intelligence-backups/$(date +%Y%m%d)/
```

### 安全加固

#### 网络隔离

```yaml
# docker-compose.yml
networks:
  frontend:
  backend:
    internal: true

services:
  intelligence-engine:
    networks:
      - backend
```

#### 密钥管理

使用AWS Secrets Manager:
```python
import boto3

def get_secret(secret_name):
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId=secret_name)
    return response['SecretString']

SEC_API_KEY = get_secret('prod/intelligence/sec-api-key')
```

#### 日志脱敏

```python
import re

def sanitize_log(message):
    # 隐藏API Key
    return re.sub(r'api_key=[\w-]+', 'api_key=***', message)
```

### 性能优化

#### 缓存层 (Redis)

```yaml
# docker-compose.yml
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

```python
# 在引擎中使用缓存
import redis

cache = redis.Redis(host='redis', port=6379)

def get_cached_data(key):
    data = cache.get(key)
    if data:
        return json.loads(data)
    return None
```

#### 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_timestamp ON sec_filings(timestamp);
CREATE INDEX idx_ticker ON sentiment_data(ticker);

-- 定期清理
DELETE FROM sec_filings WHERE timestamp < datetime('now', '-365 days');
VACUUM;
```

### 成本优化

#### Spot Instances (AWS)

```bash
aws ec2 run-instances \
  --instance-market-options MarketType=spot \
  --image-id ami-xxx \
  --instance-type t3.medium \
  --key-name mykey
```

#### Cloud Scheduler (GCP)

```bash
# 只在交易时间运行
gcloud scheduler jobs create http daily-run \
  --schedule "0 9-16 * * 1-5" \
  --uri "https://intelligence-engine-xxx.run.app/run" \
  --http-method POST
```

---

## 故障排查

### 日志分析

```bash
# 查看错误日志
grep ERROR logs/intelligence_engine.log

# 查看最近100行
tail -100 logs/intelligence_engine.log

# 实时监控
tail -f logs/intelligence_engine.log | grep -E "ERROR|WARNING"
```

### 性能分析

```bash
# 查看资源使用
docker stats intelligence-engine

# 内存分析
python -m memory_profiler main.py

# CPU profiling
python -m cProfile -o output.prof main.py
```

---

**下一步**: 根据你的需求选择部署方式，建议从Docker Compose开始
