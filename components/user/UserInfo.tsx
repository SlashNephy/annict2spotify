import React from 'react'

import { Avatar, Divider, Indicator, Menu, Text, useMantineColorScheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { Logout, MoonStars, Sun } from 'tabler-icons-react'

import { signOutCustom } from '../../lib/client/session'

export const UserInfo: React.FC = () => {
  const { data: session } = useSession()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  if (!session?.user) {
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
