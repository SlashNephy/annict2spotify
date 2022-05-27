FROM --platform=$BUILDPLATFORM node:18.2.0-bullseye-slim AS cache
WORKDIR /app

COPY ./.yarn/ /app/.yarn/
COPY ./package.json ./.yarnrc.yml ./yarn.lock /app/
RUN yarn --frozen-lockfile

FROM --platform=$BUILDPLATFORM node:18.2.0-bullseye-slim AS build
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN apt update \
    && apt full-upgrade -y \
    && apt install -y --no-install-recommends \
      curl \
      ca-certificates

COPY --from=cache /app/node_modules/ /app/node_modules/
COPY ./ /app/
RUN yarn generate && yarn build

FROM --platform=$TARGETPLATFORM node:18.2.0-bullseye-slim as runtime
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

RUN npm install -g next

COPY --from=build /app/package.json /app/next.config.js /app/
COPY --from=build /app/.next/ /app/.next/

LABEL org.opencontainers.image.source="https://github.com/SlashNephy/annict2spotify"
ENTRYPOINT ["next", "start"]
