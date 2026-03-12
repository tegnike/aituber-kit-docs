# 部署

除了在本地运行外，AITuberKit还支持部署到各种云平台。

## Vercel

作为Next.js应用程序，部署到Vercel是最简单的选择。

### 步骤

1. 在[Vercel](https://vercel.com/)上创建账户并关联GitHub仓库
2. 从"New Project"导入AITuberKit仓库
3. 配置环境变量（参考`.env.example`设置所需的API密钥）
4. 点击"Deploy"开始部署

### 配置要点

- **Framework Preset**: `Next.js`会被自动检测
- **Node.js Version**: 请指定`24.x`
- **环境变量**: 通过Vercel的环境变量设置管理服务器端API密钥（如`OPENAI_API_KEY`等）

::: warning 安全注意事项
部署到Vercel时，请将API密钥设置为Vercel环境变量，防止客户端暴露。带有`NEXT_PUBLIC_`前缀的环境变量会暴露给客户端，因此不要用于API密钥。
:::

## Cloudflare

也支持部署到Cloudflare Workers/Pages。使用[OpenNext for Cloudflare](https://opennext.js.org/cloudflare)在Cloudflare上运行Next.js应用程序。

### 前提条件

- [Cloudflare](https://www.cloudflare.com/)账户
- 安装Wrangler CLI（`npm install -g wrangler`）并登录（`wrangler login`）

### 构建和部署

```bash
# 仅构建Cloudflare版本
npm run build:cloudflare

# 本地预览（构建 + wrangler dev）
npm run preview:cloudflare

# 部署（构建 + wrangler deploy）
npm run deploy:cloudflare
```

### 工作原理

- `scripts/build-cloudflare.js`管理构建过程
- 构建时自动设置`NEXT_PUBLIC_RESTRICTED_MODE=true`，启用限制模式
- `public/`下的不必要文件（gitignored、超过25MB、非ASCII文件名）会自动暂存和恢复
- 配置通过`wrangler.jsonc`和`open-next.config.ts`管理

### 限制事项

- 在限制模式（Restricted Mode）下运行，部分功能可能受限
- 请注意Cloudflare Workers的运行时限制（内存、执行时间等）

## Docker

也可以使用Docker进行部署。

### Docker Compose

```bash
# 准备环境变量文件
cp .env.example .env

# 使用Docker Compose启动
docker compose up
```

### 生产环境Docker部署

Dockerfile配置为以开发模式（`npm run dev`）启动。用于生产环境时，请按如下方式修改Dockerfile：

```dockerfile
# 将CMD改为生产用
RUN npm run build
CMD ["npx", "next", "start"]
```

## 安全注意事项

无论部署到哪个平台，请注意以下几点：

- **API密钥管理**: 通过环境变量管理API密钥，防止客户端暴露
- **访问控制**: 根据需要实施认证和授权机制
- **用户说明**: 如果用户使用自己的API密钥，请告知安全注意事项

详细信息请参阅[介绍](/zh/guide/introduction#安全注意事项)中的安全部分。
