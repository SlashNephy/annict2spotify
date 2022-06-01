import { Text } from '@mantine/core'
import React from 'react'

import type { SyobocalSong } from '@prisma/client'

export const SpotifyTrackName: React.FC<{ song: SyobocalSong }> = ({ song }) => {
  return <Text>{song.name}</Text>
}
