FROM --platform=$BUILDPLATFORM node:24.11.1-bullseye-slim@sha256:19db2806db9239702b0b1d8da1a84ac3b25a8e13f89b3ca61756faf7dd6b93f4 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:24.11.1-bullseye-slim@sha256:19db2806db9239702b0b1d8da1a84ac3b25a8e13f89b3ca61756faf7dd6b93f4 AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:24.11.1-bullseye-slim@sha256:19db2806db9239702b0b1d8da1a84ac3b25a8e13f89b3ca61756faf7dd6b93f4 AS runtime
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
