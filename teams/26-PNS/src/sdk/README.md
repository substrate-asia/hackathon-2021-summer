## PNS SDK

### Usage

基于 Vite 运行:

```hash
npm
npm run serve
```

打包:

```bash
npm run build
```

代码格式化:

```bash
npm run fmt
```

### 业务功能

用户注册流程:

使用 signLoginMessage 让用户进行签名

使用 getLoginToken 以及刚才获得的签名换取 jwt token

在之后的 API 访问 listFav，createFav，deleteFav，listSubdomain，createSubdomain，deleteSubdomain 时需要附带 jwt token 进行鉴权

域名注册流程:

查询域名注册的价格 getRentPrice，duration 参数是秒为单位的注册时间

提交域名注册 commit

完成域名注册 register

### TypeScript API

#### 登录

```ts
let token = await tryLogin();
```

或得 token 用于后续的 API.

#### 获取账户信息

先登录, 然后调用

```ts
let account = await getAccount();
// -> HexAddress
```

#### 查询域名是否已经注册

```ts
await getOwner("dot"))
```

- 可用, 返回 `0x00000`
- 已经被占用, 返回 ??

#### 注册域名前查询加个

```ts
await getRentPrice("jiang", 86400); // 换算成"天"
// -> number
```

#### 管理 favorites

```ts
await listFav(jwt, account);
await createFav(jwt, account, "polkadot.dot");
await deleteFav(jwt, domainId);
```

#### 查询域名对应的地址

```ts
await getAddr("polkadot.dot", "ETH"); // ??
```

#### 提交域名注册请求

???

#### TODO
