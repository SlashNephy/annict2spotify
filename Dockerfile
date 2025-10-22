FROM --platform=$BUILDPLATFORM node:22.21.0-bullseye-slim@sha256:3fb611e6440f371bfc7f7c78846661c54d5da98808d41c14a21a52ab7c3db9cd AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:22.21.0-bullseye-slim@sha256:3fb611e6440f371bfc7f7c78846661c54d5da98808d41c14a21a52ab7c3db9cd AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:22.21.0-bullseye-slim@sha256:3fb611e6440f371bfc7f7c78846661c54d5da98808d41c14a21a52ab7c3db9cd AS runtime
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
