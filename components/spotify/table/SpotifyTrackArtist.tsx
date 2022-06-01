import { Group, Text } from '@mantine/core'
import React from 'react'
import { Microphone2 } from 'tabler-icons-react'

import type { SyobocalSong } from '@prisma/client'

export const SpotifyTrackArtist: React.FC<{ song: SyobocalSong }> = ({ song }) => {
  return (
    <>
      <Group>
        <Microphone2 size={16} />
        <Text size="sm">{song.artist}</Text>
      </Group>
    </>
  )
}
