import React from 'react'

import { Grid, Loader, Space } from '@mantine/core'

import { AnnictFetchButtons } from './AnnictFetchButtons'
import { AnnictWorkTable } from './AnnictWorkTable'

import type { Work } from '../../graphql/types'
import type { Song } from '../../lib/syobocal/song'
import type { Setter } from '../type'

export const AnnictSession: React.FC<{
  token: string
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  setSelectedSongs: Setter<Map<string, Song>>
}> = ({ token, selectedWorks, setSelectedWorks, setSelectedSongs }) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [works, setWorks] = React.useState(() => new Map<number, Work>())
  const [songs, setSongs] = React.useState(() => new Map<number, Song[]>())

  return (
    <>
      <AnnictFetchButtons token={token} isFetching={isFetching} setIsFetching={setIsFetching} setWorks={setWorks} />

      <Space h="xl" />
      <Grid justify="center" align="center" columns={10}>
        {isFetching && <Loader />}
      </Grid>

      {works.size > 0 && (
        <AnnictWorkTable
          works={works}
          selectedWorks={selectedWorks}
          setSelectedWorks={setSelectedWorks}
          songs={songs}
          setSongs={setSongs}
          setSelectedSongs={setSelectedSongs}
        />
      )}
    </>
  )
}
