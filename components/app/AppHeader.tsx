import React from 'react'

import { Burger, Group, Header, Title } from '@mantine/core'

import packageJson from '../../package.json'
import { UserInfo } from '../user/UserInfo'

import type { Setter } from '../type'

export const AppHeader: React.FC<{
  isNavbarOpen: boolean
  setIsNavbarOpen: Setter<boolean>
}> = ({ isNavbarOpen, setIsNavbarOpen }) => {
  return (
    <Header height={80} p="md">
      <Group>
        <Burger opened={isNavbarOpen} onClick={() => setIsNavbarOpen((value) => !value)} style={{ maxWidth: '10%' }} />

        <Group style={{ justifyContent: 'center', width: '90%' }}>
          <Title>{packageJson.name}</Title>
          <UserInfo />
        </Group>
      </Group>
    </Header>
  )
}
