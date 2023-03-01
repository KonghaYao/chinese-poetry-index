# chinese-poetry-index

这个是构建 chinese-poetry 仓库索引的一个库，目的是抽离出规范的文本特征对象，以便我们能够统一调用

蒙学未完成

## 从原始仓库构建数据

```sh
pnpm install
pnpm build # 规范化 原始数据文件，将会存储在 dist 目录
pnpm build:index # 建立索引 json 文件，将会建立在 json 目录
```

## 创建 .env 文件

```txt
MEILI_MASTER_KEY=PASSWORD
MEILI_SERVER=http://meilisearch:7700
```

## 启动 docker 自动部署

```
docker-compose up -d
```
