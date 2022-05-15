import React from 'react'

import { Badge, List, ListItem } from '@mantine/core'
import useSWR from 'swr'

import { songKind2Color, songKind2Label } from '../ui'

import type { Song } from '../../../../lib/syobocal/song'

export const AnnictWorkSongs: React.FC<{ tid: number }> = ({ tid }) => {
  const { data, error } = useSWR<Song[]>(`/api/syobocal/songs/${tid}`)

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!data) {
    return <span>Loading...</span>
  }

  return (
    <List>
      {data.map((song) => (
        <ListItem key={`${song.kind}_${song.number}_${song.name}`}>
          <Badge color={songKind2Color(song.kind)}>{songKind2Label(song.kind, song.number)}</Badge>
          <span>
            {song.name}
            {song.attributes.artist ? ` (${song.attributes.artist})` : ''}
          </span>
        </ListItem>
      ))}
    </List>
  )
}
