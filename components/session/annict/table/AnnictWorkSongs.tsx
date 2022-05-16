import React from 'react'
import { useQuery } from 'react-query'

import { Badge, List, ListItem } from '@mantine/core'

import { getSyobocalSongs } from '../../../../lib/api'
import { songKind2Color, songKind2Label } from '../ui'

export const AnnictWorkSongs: React.FC<{ tid: number }> = ({ tid }) => {
  const { data, isLoading, error } = useQuery([`songs-${tid}`], () => getSyobocalSongs(tid))

  if (error) {
    return <span>Failed to fetch</span>
  }
  if (!data || isLoading) {
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
