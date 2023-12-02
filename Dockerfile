FROM --platform=$BUILDPLATFORM node:21.3.0-bullseye-slim@sha256:10235f11a217783f6a796724a3a0be525db0feee8a3e46f197e0c3a11702bbc3 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:21.3.0-bullseye-slim@sha256:10235f11a217783f6a796724a3a0be525db0feee8a3e46f197e0c3a11702bbc3 AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:21.3.0-bullseye-slim@sha256:10235f11a217783f6a796724a3a0be525db0feee8a3e46f197e0c3a11702bbc3 AS runtime
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
