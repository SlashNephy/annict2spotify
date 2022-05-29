import React from 'react'

import { useSession } from 'next-auth/react'

import { signOutCustom } from '../client/session'

import type { Session } from 'next-auth'

export const useCheckSession = (): Session | null => {
  const { data: session } = useSession()

  React.useEffect(() => {
    if (session?.expires && Date.parse(session.expires) < Date.now()) {
      signOutCustom().catch(console.error)
    }
  }, [session])

  return session
}
