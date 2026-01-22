# 投资数据自动化管道

> Investment Agent 的数据层实现

## 架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Data Pipeline                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   数据源                  采集器                  存储            │
│   ┌─────────┐           ┌─────────┐           ┌─────────┐       │
│   │ FMP API │──────────▶│collectors│──────────▶│  data/  │       │
│   │ SCFI    │           │         │           │  raw/   │       │
│   │ BDI     │           │         │           │processed│       │
│   │ TrendF  │           └─────────┘           └─────────┘       │
│   └─────────┘                │                     │            │
│                              │                     │            │
│                              ▼                     ▼            │
│                        ┌─────────┐           ┌─────────┐       │
│                        │processor│──────────▶│ scores/ │       │
│                        │ 评分计算 │           │ alerts/ │       │
│                        └─────────┘           └─────────┘       │
│                              │                                  │
│                              ▼                                  │
│                        ┌─────────┐                              │
│                        │ alerts  │──────────▶ 通知/日志更新     │
│                        │ 信号检测 │                              │
│                        └─────────┘                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 目录结构

```
src/data-pipeline/
├── README.md                 # 本文件
├── config.py                 # 配置文件（API keys等）
├── main.py                   # 主入口
├── collectors/               # 数据采集器
│   ├── __init__.py
│   ├── fmp_collector.py      # FMP API（股价、财报）
│   ├── scfi_collector.py     # SCFI运价指数
│   └── dram_collector.py     # DRAM价格（TrendForce）
├── storage/                  # 数据存储
│   ├── __init__.py
│   └── db.py                 # SQLite操作
├── processors/               # 数据处理
│   ├── __init__.py
│   └── scorer.py             # 自动评分计算
└── alerts/                   # 预警系统
    ├── __init__.py
    └── detector.py           # 信号检测

data/
├── raw/                      # 原始数据
│   ├── prices/               # 股价数据
│   ├── financials/           # 财报数据
│   └── indicators/           # 行业指标
├── processed/                # 处理后数据
│   └── timeseries/           # 时间序列
├── scores/                   # 评分记录
│   └── history/              # 历史评分
└── investment.db             # SQLite数据库
```

## 数据源清单

### 已实现

| 数据源 | 类型 | 频率 | 采集器 |
|--------|------|------|--------|
| FMP API | 股价、财报 | 日/季 | `fmp_collector.py` |

### 待实现

| 数据源 | 类型 | 频率 | 采集器 |
|--------|------|------|--------|
| SCFI | 运价指数 | 周 | `scfi_collector.py` |
| TrendForce | DRAM价格 | 周 | `dram_collector.py` |
| BDI | 干散货指数 | 日 | `bdi_collector.py` |

## 快速开始

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置 API Key
cp config.example.py config.py
# 编辑 config.py 填入你的 FMP API Key

# 3. 初始化数据库
python main.py --init

# 4. 运行数据采集
python main.py --collect all

# 5. 计算评分
python main.py --score

# 6. 检测信号
python main.py --detect
```

## 定时任务设置

```bash
# 编辑 crontab
crontab -e

# 添加以下任务：

# 每日 9:00 更新股价
0 9 * * * cd ~/投资大师 && python src/data-pipeline/main.py --collect prices

# 每周一 9:00 更新行业指标
0 9 * * 1 cd ~/投资大师 && python src/data-pipeline/main.py --collect indicators

# 每月1日 9:00 更新财报数据
0 9 1 * * cd ~/投资大师 && python src/data-pipeline/main.py --collect financials

# 每日 10:00 计算评分并检测信号
0 10 * * * cd ~/投资大师 && python src/data-pipeline/main.py --score --detect
```

## 配置说明

见 `config.py`
