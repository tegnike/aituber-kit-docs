# Deployment

In addition to running locally, AITuberKit supports deployment to various cloud platforms.

## Vercel

As a Next.js application, deploying to Vercel is the easiest option.

### Steps

1. Create an account on [Vercel](https://vercel.com/) and connect your GitHub repository
2. Import the AITuberKit repository from "New Project"
3. Configure environment variables (refer to `.env.example` for required API keys)
4. Click "Deploy" to start the deployment

### Configuration Tips

- **Framework Preset**: `Next.js` is automatically detected
- **Node.js Version**: Specify `24.x`
- **Environment Variables**: Manage server-side API keys (e.g., `OPENAI_API_KEY`) through Vercel's environment variable settings

::: warning Security Notice
When deploying to Vercel, set API keys as Vercel environment variables to prevent client-side exposure. Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the client, so never use them for API keys.
:::

## Cloudflare

Deployment to Cloudflare Workers/Pages is also supported. [OpenNext for Cloudflare](https://opennext.js.org/cloudflare) is used to run the Next.js application on Cloudflare.

### Prerequisites

- A [Cloudflare](https://www.cloudflare.com/) account
- Wrangler CLI installed (`npm install -g wrangler`) and logged in (`wrangler login`)

### Build and Deploy

```bash
# Build for Cloudflare only
npm run build:cloudflare

# Local preview (build + wrangler dev)
npm run preview:cloudflare

# Deploy (build + wrangler deploy)
npm run deploy:cloudflare
```

### How It Works

- `scripts/build-cloudflare.js` manages the build process
- `NEXT_PUBLIC_RESTRICTED_MODE=true` is automatically set during build, enabling restricted mode
- Unnecessary files under `public/` (gitignored, over 25MB, non-ASCII filenames) are automatically stashed and restored
- Configuration is managed through `wrangler.jsonc` and `open-next.config.ts`

### Limitations

- Runs in Restricted Mode, which may limit some features
- Be aware of Cloudflare Workers runtime constraints (memory, execution time, etc.)

## Docker

Deployment using Docker is also available.

### Docker Compose

```bash
# Prepare the environment variables file
cp .env.example .env

# Start with Docker Compose
docker compose up
```

### Docker Deployment for Production

The Dockerfile is configured to start in development mode (`npm run dev`). For production use, modify the Dockerfile as follows:

```dockerfile
# Change CMD for production
RUN npm run build
CMD ["npx", "next", "start"]
```

## Security Considerations

Regardless of the deployment platform, keep the following in mind:

- **API Key Management**: Manage API keys through environment variables and prevent client-side exposure
- **Access Control**: Implement authentication and authorization mechanisms as needed
- **User Guidance**: If users provide their own API keys, inform them about security best practices

For more details, see the security section in [Introduction](/en/guide/introduction#security-considerations).
