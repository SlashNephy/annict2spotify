import React from 'react'

import { Group, Text } from '@mantine/core'
import { Microphone2 } from 'tabler-icons-react'

import type { Song } from '../../../lib/syobocal/song'

export const SpotifyTrackArtist: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <>
      <Group>
        <Microphone2 size={16} />
        <Text size="sm">{song.creators.artist}</Text>
      </Group>
    </>
  )
}
