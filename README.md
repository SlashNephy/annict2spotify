# annict2spotify

🎧 Annict で視聴記録したアニメの主題歌などの Spotify のプレイリストを作成するくん

## Get Started

### 開発環境

- node (v18.1.0 で動作確認)
- yarn or npm

### 各種環境変数の準備

Annict および Spotify の OAuth アプリケーション登録が必要です。

- https://annict.com/oauth/applications
- https://developer.spotify.com/dashboard/

リダイレクト URI は `${NEXTAUTH_URL}/auth/{annict,spotify}` に設定します。

```console
$ cp .env.production .env.local
$ nano .env.local
```

`$NEXTAUTH_SECRET` は次のようなコマンドで生成できます。

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
