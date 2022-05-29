import React from 'react'

import { SimpleGrid } from '@mantine/core'

import { annict2syobocal } from '../../../lib/client/arm'
import { AnnictWorkSongs } from './AnnictWorkSongs'
import { AnnictWorkSyobocalLink } from './AnnictWorkSyobocalLink'

import type { Work } from '../../../graphql/types'
import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'

export const AnnictWorkSyobocalWrapper: React.FC<{
  work: Work
  setSongs: Setter<Map<number, SyobocalSong[]>>
}> = ({ work, setSongs }) => {
  const tid = annict2syobocal(work.annictId) ?? work.syobocalTid
  if (!tid) {
    return <span>-</span>
  }

  return (
    <SimpleGrid>
      <AnnictWorkSyobocalLink tid={tid} />
      <AnnictWorkSongs workId={work.annictId} tid={tid} setSongs={setSongs} />
    </SimpleGrid>
  )
}
