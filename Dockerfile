FROM --platform=$BUILDPLATFORM node:20.1.0-bullseye-slim@sha256:0efc3ef3fea2822c9d16da084c40181ed7f74b6f45141100580f9887ccc8e9a1 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.1.0-bullseye-slim@sha256:0efc3ef3fea2822c9d16da084c40181ed7f74b6f45141100580f9887ccc8e9a1 AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:20.1.0-bullseye-slim@sha256:0efc3ef3fea2822c9d16da084c40181ed7f74b6f45141100580f9887ccc8e9a1 AS runtime
ENV NODE_ENV="production"
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
USER node

COPY --from=build /app/package.json /app/next.config.js ./
COPY --from=build /app/public/ ./public/
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["node", "server.js"]
