import React from 'react'

import { Text } from '@mantine/core'

import type { Song } from '../../../lib/syobocal/song'

export const SpotifyTrackName: React.FC<{ song: Song }> = ({ song }) => {
  return <Text>{song.title}</Text>
}
