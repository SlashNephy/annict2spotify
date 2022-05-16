import React from 'react'

import { Grid } from '@mantine/core'

import { StatusState } from '../../../graphql/types'
import { AnnictClearButton } from './AnnictClearButton'
import { AnnictFetchButton } from './AnnictFetchButton'

import type { Work } from '../../../graphql/types'

export const AnnictFetchButtons: React.FC<{
  token: string
  setWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ token, setWorks }) => {
  const [isFetching, setIsFetching] = React.useState(false)

  return (
    <Grid justify="center" align="center">
      {[StatusState.Watching, StatusState.Watched, StatusState.WannaWatch].map((state) => (
        <Grid.Col span={3} key={state}>
          <AnnictFetchButton
            state={state}
            token={token}
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            setWorks={setWorks}
          />
        </Grid.Col>
      ))}

      <Grid.Col span={3}>
        <AnnictClearButton isFetching={isFetching} setWorks={setWorks} />
      </Grid.Col>
    </Grid>
  )
}
