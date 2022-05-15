import 'next-auth'

declare module 'next-auth/jwt' {
  type ServiceJwt = {
    accessToken: string
    expiresAt: number
    refreshToken: string
  }

  interface JWT {
    annict?: ServiceJwt
    spotify?: ServiceJwt
  }
}

declare module 'next-auth' {
  import type { JWT } from 'next-auth/jwt'

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Session extends JWT {}
}
