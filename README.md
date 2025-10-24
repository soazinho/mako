# Mako

A modern, production-ready full-stack application using React Router.

## Features

- ⛓️ Server-side Rendering (SSR)
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset Bundling and Optimization
- 🔄 Data Loading and Mutations
- 🔒 TypeScript by default
- 💅 TailwindCSS + shadcn/ui for styling
- 👮 Lint + Formatting with Biome
- 🗣️ Internationalization with i18n
- 🚀 Continous Integration + Continous Delivery (CI/CD)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Database

## Local

Create Postgres databse:

```bash
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=coucou007 -d -p 5432:5432 postgres
```

Generate a migration:

```bash
npx drizzle-kit generate --name <MIGRATION_NAME>
```

Apply migrations:

```bash
npx drizzle-kit migrate
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

### DIY Deployment

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
