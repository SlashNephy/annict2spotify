import React from 'react'

import { Avatar, Divider, Indicator, Menu, Text } from '@mantine/core'
import { Logout } from 'tabler-icons-react'

import { signOutCustom } from '../../lib/session'

import type { Session } from 'next-auth'
import type { SessionContextValue } from 'next-auth/react'

export const UserInfo: React.FC<{ session: Session | null; status: SessionContextValue['status'] }> = ({
  session,
  status,
}) => {
  if (!session?.user || status === 'loading') {
    return <></>
  }

  return (
    <Menu
      placement="end"
      control={
        <Indicator withBorder size={16}>
          <Avatar src={session.user?.image} size="md" />
        </Indicator>
      }
    >
      <Menu.Item disabled>
        <div>
          <Text size="sm" weight={500} color="gray">
            {session.user?.name}
          </Text>

          <Text color="dimmed" size="xs">
            {session.user?.email}
          </Text>
        </div>
      </Menu.Item>

      <Divider />

      <Menu.Item color="red" icon={<Logout />} onClick={() => signOutCustom()}>
        Sign out
      </Menu.Item>
    </Menu>
  )
}
