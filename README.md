# annict2spotify

🎧 Annict で視聴記録したアニメの主題歌などの Spotify のプレイリストを作成するくん

## Get Started

### 開発環境

- node (v18.2.0 で動作確認)
- yarn / npm
- Docker

### 各種環境変数の準備

Annict および Spotify の OAuth アプリケーションの作成が必要です。

- https://annict.com/oauth/applications
- https://developer.spotify.com/dashboard/

リダイレクト URI は `${NEXTAUTH_URL}/auth/{annict,spotify}` に設定します。

各種環境変数を `.env` に記述します。`ANNICT_ACCESS_TOKEN` は JetBrains IDEs の [GraphQL](https://plugins.jetbrains.com/plugin/8097-graphql) プラグインで使用します。使用しない場合は未設定で構いません。

```console
$ cp .env.production .env
$ code .env
```

`NEXTAUTH_SECRET` は次のようなコマンドで生成できます。

```console
$ openssl rand -base64 32
```

### 起動

起動に成功すると `http://localhost:3000` で待ち受けます。

```console
$ yarn
$ yarn dev
```

## 技術スタック

- TypeScript
- Next.js 12
- React 18
- Mantine
- GraphQL
- Docker
- Prisma
- Tailwind CSS
