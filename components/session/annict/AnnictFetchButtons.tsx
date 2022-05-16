import React from 'react'

import { Grid } from '@mantine/core'

import { StatusState } from '../../../graphql/types'
import { AnnictClearButton } from './AnnictClearButton'
import { AnnictFetchButton } from './AnnictFetchButton'

import type { Work } from '../../../graphql/types'

export const AnnictFetchButtons: React.FC<{
  token: string
  isFetching: boolean
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
  setWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ token, isFetching, setIsFetching, setWorks }) => {
  return (
    <Grid justify="center" align="center" columns={10}>
      {[StatusState.Watching, StatusState.Watched, StatusState.WannaWatch].map((state) => (
        <Grid.Col span={3} key={state}>
          <AnnictFetchButton
            key={state}
            state={state}
            token={token}
            isFetching={isFetching}
            setIsFetching={setIsFetching}
            setWorks={setWorks}
          />
        </Grid.Col>
      ))}

      <Grid.Col span={1}>
        <AnnictClearButton isFetching={isFetching} setWorks={setWorks} />
      </Grid.Col>
    </Grid>
  )
}
