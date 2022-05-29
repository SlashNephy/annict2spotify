import React from 'react'

import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { signIn } from 'next-auth/react'
import { Check } from 'tabler-icons-react'

import { ANNICT_TOKEN_KEY } from '../client/session'
import { useCheckSession } from './useCheckSession'

import type { ServiceJwt } from 'next-auth/jwt'

export const useAnnictToken = (): ServiceJwt | null => {
  const session = useCheckSession()
  const [annictToken, setAnnictToken] = useLocalStorage<ServiceJwt | null>({ key: ANNICT_TOKEN_KEY })

  React.useEffect(() => {
    if (session?.annict?.expiresAt && session.annict.expiresAt < Date.now() / 1000) {
      signIn('annict').catch(console.error)
    } else if (session?.annict) {
      setAnnictToken(session.annict)
      showNotification({
        id: 'annict-login',
        title: 'OAuth Login',
        message: 'Connected to Annict!',
        icon: <Check />,
        color: 'green',
      })
    }
  }, [session, annictToken, setAnnictToken])

  return annictToken
}
