import React from 'react'

import { Grid, Loader, Space } from '@mantine/core'

import { AnnictFetchButtons } from './AnnictFetchButtons'
import { AnnictWorkTable } from './AnnictWorkTable'

import type { Work } from '../../../graphql/types'

export const AnnictSession: React.FC<{
  token: string
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ token, selectedWorks, setSelectedWorks }) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [works, setWorks] = React.useState(() => new Map<number, Work>())

  return (
    <>
      <AnnictFetchButtons token={token} isFetching={isFetching} setIsFetching={setIsFetching} setWorks={setWorks} />

      <Space h="xl" />
      <Grid justify="center" align="center" columns={10}>
        {isFetching && <Loader />}
      </Grid>

      {works.size > 0 && (
        <AnnictWorkTable works={works} selectedWorks={selectedWorks} setSelectedWorks={setSelectedWorks} />
      )}
    </>
  )
}
