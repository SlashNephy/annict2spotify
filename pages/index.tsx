import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

import { Container } from '@mantine/core'

import { UserSession } from '../components/session/UserSession'
import packageJson from '../package.json'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{packageJson.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <UserSession />
      </Container>
    </>
  )
}

export default Home
