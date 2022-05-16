import React from 'react'

import { Avatar, Box, Center, Grid, Text } from '@mantine/core'

import type { Session } from 'next-auth'
import type { SessionContextValue } from 'next-auth/react'

export const UserInfo: React.FC<{ session: Session | null; status: SessionContextValue['status'] }> = ({
  session,
  status,
}) => {
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  if (!session?.user) {
    return <></>
  }

  return (
    <Box>
      <Center>
        <Grid justify="right" align="center" grow>
          <Avatar src={session.user.image} />

          <Grid.Col span={2}>
            <Text>
              {session.user.name} ({session.user.email})
            </Text>
          </Grid.Col>
        </Grid>
      </Center>
    </Box>
  )
}
