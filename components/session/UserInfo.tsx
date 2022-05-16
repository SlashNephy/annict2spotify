import type { Session } from 'next-auth'
import React from 'react'

import { Avatar } from '@mantine/core'

import type { SessionContextValue } from 'next-auth/react'

export const UserInfo: React.FC<{ session: Session | null; status: SessionContextValue['status'] }> = ({
  session,
  status,
}) => {
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  if (!session?.user) {
    return <></>
  }

  return (
    <div>
      <Avatar src={session.user.image} />

      <span>
        Signed in as {session.user.name} ({session.user.email})
      </span>
    </div>
  )
}
