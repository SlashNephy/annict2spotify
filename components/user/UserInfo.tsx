import React from 'react'

import { Avatar, Divider, Indicator, Menu, Text, useMantineColorScheme } from '@mantine/core'
import { Logout, MoonStars, Sun } from 'tabler-icons-react'

import { signOutCustom } from '../../lib/session'

import type { Session } from 'next-auth'
import type { SessionContextValue } from 'next-auth/react'

export const UserInfo: React.FC<{ session: Session | null; status: SessionContextValue['status'] }> = ({
  session,
  status,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

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

      <Menu.Item
        icon={colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
        onClick={() => toggleColorScheme()}
      >
        Toggle theme
      </Menu.Item>

      <Menu.Item color="red" icon={<Logout />} onClick={() => signOutCustom()}>
        Sign out
      </Menu.Item>
    </Menu>
  )
}
