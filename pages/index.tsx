import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Anchor, AppShell, Container, Footer, Header, Space, Text, Title } from '@mantine/core'
import { bottom } from '@popperjs/core'
import { Heart } from 'tabler-icons-react'

import { UserSession } from '../components/session/UserSession'
import packageJson from '../package.json'

const Home: NextPage = () => {
  return (
    <AppShell
      header={
        <Header height={80} p="md">
          <Container>
            <Title>{packageJson.name}</Title>
          </Container>
        </Header>
      }
      footer={
        <Footer height={60} p="md" fixed position={{ bottom: 0 }}>
          <Container>
            <Text size="sm">
              <Anchor size="sm" href={packageJson.repository} target="_blank">
                {packageJson.name}
              </Anchor>
              &nbsp;made with <Heart size={16} strokeWidth={2} color="#d27979" />.
            </Text>
          </Container>
        </Footer>
      }
    >
      <Head>
        <title>{packageJson.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <UserSession />
      </Container>
    </AppShell>
  )
}

export default Home
