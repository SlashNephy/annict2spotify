import { Badge, List, ListItem } from '@mantine/core'
import React from 'react'
import { useQuery } from 'react-query'

import { getSyobocalSongs } from '../../../lib/client/api'
import { songKind2Color, songKind2Label } from '../ui'

import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkSongs: React.FC<{
  workId: number
  tid: number
  setSongs: Setter<Map<number, SyobocalSong[]>>
}> = ({ workId, tid, setSongs }) => {
  const { data: workSongs, isLoading, error } = useQuery(['syobocal', tid], async () => getSyobocalSongs(tid))

  React.useEffect(() => {
    if (workSongs) {
      setSongs((previous) => {
        const copied = new Map(previous.entries())
        copied.set(workId, workSongs)

        return copied
      })
    }
  }, [workSongs, setSongs, workId])

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!workSongs || isLoading) {
    return <span>Loading...</span>
  }

  return (
    <List>
      {workSongs.map((song) => (
        <ListItem key={song.id}>
          <Badge color={songKind2Color(song.kind)}>{songKind2Label(song.kind, song)}</Badge>
          <span>
            {song.name}
            {song.artist ? ` (${song.artist})` : ''}
          </span>
        </ListItem>
      ))}
    </List>
  )
}
