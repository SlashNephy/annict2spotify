import React from 'react'

import { Badge, List, ListItem } from '@mantine/core'
import { useQuery } from 'react-query'

import { getSyobocalPage } from '../../../../lib/api'
import { parsePage } from '../../../../lib/syobocal/song'
import { songKind2Color, songKind2Label } from '../ui'

import type { Song } from '../../../../lib/syobocal/song'

export const AnnictWorkSongs: React.FC<{ tid: number }> = ({ tid }) => {
  const { data, isLoading, error } = useQuery([`songs-${tid}`], () => getSyobocalPage(tid))
  const [songs, setSongs] = React.useState<Song[]>([])

  React.useEffect(() => {
    if (data) {
      const songs = parsePage(data)
      setSongs(songs)
    }

    return () => setSongs([])
  }, [data])

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!data || isLoading) {
    return <span>Loading...</span>
  }

  return (
    <List>
      {songs.map((song) => (
        <ListItem key={`${song.kind}_${song.number}_${song.title}`}>
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
