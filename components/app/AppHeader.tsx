import React from 'react'

import { Burger, Group, Header, Title } from '@mantine/core'

import packageJson from '../../package.json'
import { UserInfo } from '../user/UserInfo'

import type { Setter } from '../type'
import type { Session } from 'next-auth'
import type { SessionContextValue } from 'next-auth/react'

export const AppHeader: React.FC<{
  isNavbarOpen: boolean
  setIsNavbarOpen: Setter<boolean>
  session: Session | null
  status: SessionContextValue['status']
}> = ({ isNavbarOpen, setIsNavbarOpen, session, status }) => {
  return (
    <Header height={80} p="md">
      <Group>
        <Burger opened={isNavbarOpen} onClick={() => setIsNavbarOpen((value) => !value)} style={{ maxWidth: '10%' }} />

        <Group style={{ justifyContent: 'center', width: '90%' }}>
          <Title>{packageJson.name}</Title>
          <UserInfo session={session} status={status} />
        </Group>
      </Group>
    </Header>
  )
}
