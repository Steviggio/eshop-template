FROM node:20-slim as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

COPY apps/api-gateway ./apps/api-gateway

RUN pnpm install --frozen-lockfile

WORKDIR /app/apps/api-gateway

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]