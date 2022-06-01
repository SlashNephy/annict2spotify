import { Grid, Loader, Space } from '@mantine/core'
import React from 'react'

import { AnnictFetchButtons } from './AnnictFetchButtons'
import { AnnictWorkTable } from './AnnictWorkTable'

import type { Work } from '../../graphql/types'
import type { Setter } from '../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictSession: React.FC<{
  token: string
  selectedWorks: Map<number, Work>
  setSelectedWorks: Setter<Map<number, Work>>
  setSelectedSongs: Setter<Map<string, SyobocalSong>>
}> = ({ token, selectedWorks, setSelectedWorks, setSelectedSongs }) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [works, setWorks] = React.useState(() => new Map<number, Work>())
  const [songs, setSongs] = React.useState(() => new Map<number, SyobocalSong[]>())

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
