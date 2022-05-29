import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { AppShell, Container } from '@mantine/core'

import { AppFooter } from '../components/app/AppFooter'
import { AppHeader } from '../components/app/AppHeader'
import { AppNavbar } from '../components/app/AppNavbar'
import { UserSession } from '../components/user/UserSession'
import packageJson from '../package.json'

const Home: NextPage = () => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)

  return (
    <>
      <Head>
        <title>{packageJson.name}</title>
      </Head>

      <AppShell
        header={<AppHeader isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />}
        navbar={<AppNavbar isOpen={isNavbarOpen} />}
        footer={<AppFooter />}
      >
        <Container>
          <UserSession />
        </Container>
      </AppShell>
    </>
  )
}

export default Home
