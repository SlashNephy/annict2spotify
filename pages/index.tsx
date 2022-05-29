import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { AppShell, Container } from '@mantine/core'
import { useSession } from 'next-auth/react'

import { AppFooter } from '../components/app/AppFooter'
import { AppHeader } from '../components/app/AppHeader'
import { AppNavbar } from '../components/app/AppNavbar'
import { UserSession } from '../components/user/UserSession'
import packageJson from '../package.json'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)

  return (
    <>
      <Head>
        <title>{packageJson.name}</title>
      </Head>

      <AppShell
        header={
          <AppHeader isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} session={session} status={status} />
        }
        navbar={<AppNavbar isOpen={isNavbarOpen} />}
        footer={<AppFooter />}
      >
        <Container>
          <UserSession session={session} />
        </Container>
      </AppShell>
    </>
  )
}

export default Home
