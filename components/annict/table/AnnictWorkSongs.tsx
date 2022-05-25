import React from 'react'

import { Badge, List, ListItem } from '@mantine/core'
import { useQuery } from 'react-query'

import { getSyobocalPage } from '../../../lib/api'
import { parsePage } from '../../../lib/syobocal/song'
import { songKind2Color, songKind2Label } from '../ui'

import type { Song } from '../../../lib/syobocal/song'
import type { Setter } from '../../type'

export const AnnictWorkSongs: React.FC<{
  workId: number
  tid: number
  setSongs: Setter<Map<number, Song[]>>
}> = ({ workId, tid, setSongs }) => {
  const { data, isLoading, error } = useQuery(['syobocal', tid], () => getSyobocalPage(tid))
  const [workSongs, setWorkSongs] = React.useState<Song[]>([])

  React.useEffect(() => {
    if (data) {
      const songs = parsePage(data)

      setWorkSongs(songs)
      setSongs((previous) => {
        const copied = new Map(previous.entries())
        copied.set(workId, songs)

        return copied
      })
    }
  }, [data, setSongs, workId])

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!data || isLoading) {
    return <span>Loading...</span>
  }

  return (
    <List>
      {workSongs.map((song) => (
        <ListItem key={song.id}>
          <Badge color={songKind2Color(song.kind)}>{songKind2Label(song.kind, song)}</Badge>
          <span>
            {song.title}
            {song.creators.artist ? ` (${song.creators.artist})` : ''}
          </span>
        </ListItem>
      ))}
    </List>
  )
}
