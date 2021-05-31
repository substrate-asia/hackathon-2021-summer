# substrate
Dispatch-stake: 调度节点的代币质押、候选人\
Analysis-stake:分析节点的质押、候选人\
Verification-stake:验证节点质押、候选人\
Verification-sig:验证节点上链\
Dispatch-sig:调度节点的结果上链\
Analysis-sig:分析节点的结果上链\
Quan-stake:量化节状态质押,候选人\
Quan-sig量化节点质押上链\
Model: 模型pallet\
Token-supply:根据市场行情供应代币

# 调度节点
python同substrate完成链上网络访问\
调度节点网络能够轮询向substrate链上发送交易\
调度结果下发指令给分析节点分析

# 分析节点
爬取erc20代币的基本信息\
爬取heco代币的基本信息\
爬取bsc代币的基本信息\
爬取polkadot代币的质押、大额转账、交易量等信息\
对代币数额分布地址进行聚类分析

# 量化节点
完成10个量化指标\
完成网格交易策略模型\
完成火币、okex、binance三家交易所的策略套利模型

# web官网
完成着陆页布局、UI、交互\
完成行情数据dashboard显示\
完成3个及以上的模型可视化

# IPFS存储
完成调度节点、分析节点相关的指令结果数据上传ipfs网络

# 验证节点
根据ipfs的hash值和链上数据,分析节点是否作恶