import React from 'react'

import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { signIn } from 'next-auth/react'
import { Check } from 'tabler-icons-react'

import { SPOTIFY_TOKEN_KEY } from '../client/session'
import { useCheckSession } from './useCheckSession'

import type { ServiceJwt } from 'next-auth/jwt'

export const useSpotifyToken = (): ServiceJwt | null => {
  const session = useCheckSession()
  const [spotifyToken, setSpotifyToken] = useLocalStorage<ServiceJwt | null>({ key: SPOTIFY_TOKEN_KEY })

  React.useEffect(() => {
    if (session?.spotify?.expiresAt && session.spotify.expiresAt < Date.now() / 1000) {
      signIn('spotify').catch(console.error)
    } else if (session?.spotify) {
      setSpotifyToken(session.spotify)
      showNotification({
        id: 'spotify-login',
        title: 'OAuth Login',
        message: 'Connected to Spotify!',
        icon: <Check />,
        color: 'green',
      })
    }
  }, [session, spotifyToken, setSpotifyToken])

  return spotifyToken
}
