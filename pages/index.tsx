import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Anchor, AppShell, Container, Footer, Grid, Header, Text, Title } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { Heart } from 'tabler-icons-react'

import { UserInfo } from '../components/session/UserInfo'
import { UserSession } from '../components/session/UserSession'
import packageJson from '../package.json'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <AppShell
      header={
        <Header height={80} p="md">
          <Container>
            <Grid>
              <Grid.Col span={8}>
                <Title>{packageJson.name}</Title>
              </Grid.Col>
              <Grid.Col>
                <UserInfo session={session} status={status} />
              </Grid.Col>
            </Grid>
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
        <UserSession session={session} />
      </Container>
    </AppShell>
  )
}

export default Home
