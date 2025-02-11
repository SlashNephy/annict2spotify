FROM --platform=$BUILDPLATFORM node:20.18.3-bullseye-slim@sha256:ff1af7dba3f74e9589f18f147d4cd144856621c75f12aaa3fc464a7084dd847a AS cache
WORKDIR /app

COPY ./.yarn/ ./.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock ./
RUN yarn --immutable

FROM --platform=$BUILDPLATFORM node:20.18.3-bullseye-slim@sha256:ff1af7dba3f74e9589f18f147d4cd144856621c75f12aaa3fc464a7084dd847a AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY --from=cache /app/node_modules/ ./node_modules/
COPY ./ ./
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:20.18.3-bullseye-slim@sha256:ff1af7dba3f74e9589f18f147d4cd144856621c75f12aaa3fc464a7084dd847a AS runtime
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
