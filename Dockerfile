FROM --platform=$BUILDPLATFORM node:20.18.3-bullseye-slim@sha256:ca6ffc5171f8d18ed5d14aff639082e834b7f1c40266080501c8b8ce78919119 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.18.3-bullseye-slim@sha256:ca6ffc5171f8d18ed5d14aff639082e834b7f1c40266080501c8b8ce78919119 AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:20.18.3-bullseye-slim@sha256:ca6ffc5171f8d18ed5d14aff639082e834b7f1c40266080501c8b8ce78919119 AS runtime
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
