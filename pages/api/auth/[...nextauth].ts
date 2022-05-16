import NextAuth from 'next-auth'
import Spotify from 'next-auth/providers/spotify'

import { IS_DEBUG } from '../../../lib/constants'

import type { AnnictProfile } from '../../../lib/annict'
import type { Session, User } from 'next-auth'
import type { JWT, ServiceJwt } from 'next-auth/jwt'

const ANNICT_CLIENT_ID = process.env.ANNICT_CLIENT_ID
const ANNICT_CLIENT_SECRET = process.env.ANNICT_CLIENT_SECRET

if (!ANNICT_CLIENT_ID || !ANNICT_CLIENT_SECRET) {
  throw new Error('ANNICT_CLIENT_ID or ANNICT_CLIENT_SECRET is not set')
}

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is not set')
}

export default NextAuth({
  providers: [
    {
      id: 'annict',
      name: 'Annict',
      type: 'oauth',
      clientId: ANNICT_CLIENT_ID,
      clientSecret: ANNICT_CLIENT_SECRET,
      authorization: {
        url: 'https://api.annict.com/oauth/authorize',
        params: {
          response_type: 'code',
          scope: 'read',
        },
      },
      token: 'https://api.annict.com/oauth/token',
      userinfo: 'https://api.annict.com/v1/me',
      profile(profile): User {
        const me = profile as AnnictProfile
        return {
          id: me.id.toString(),
          name: me.name,
          email: me.email,
          image: me.avatar_url,
        }
      },
    },
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-public,playlist-modify-private,playlist-read-collaborative,playlist-read-private',
    }),
  ],
  callbacks: {
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        const session: ServiceJwt = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          accessToken: account.access_token!,
          expiresAt: account.expires_at,
          refreshToken: account.refresh_token,
        }

        switch (account.provider) {
          case 'annict':
            token.annict = session
            break
          case 'spotify':
            token.spotify = session
            break
        }
      }

      return token
    },
    async session({ session, token }): Promise<Session> {
      if (token.annict) {
        session.annict = token.annict
      }
      if (token.spotify) {
        session.spotify = token.spotify
      }

      return session
    },
  },
  debug: IS_DEBUG,
})
