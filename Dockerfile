FROM --platform=$BUILDPLATFORM node:22.14.0-bullseye-slim@sha256:c47d5e7a994ede82082b5775b8ac2df649ce8295b992f1d91d71c532b3404b12 AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:22.14.0-bullseye-slim@sha256:c47d5e7a994ede82082b5775b8ac2df649ce8295b992f1d91d71c532b3404b12 AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:22.14.0-bullseye-slim@sha256:c47d5e7a994ede82082b5775b8ac2df649ce8295b992f1d91d71c532b3404b12 AS runtime
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
