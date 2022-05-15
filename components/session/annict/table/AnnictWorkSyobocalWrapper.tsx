import React from 'react'

import { SimpleGrid } from '@mantine/core'

import { annict2syobocal } from '../../../../lib/arm'
import { AnnictWorkSongs } from './AnnictWorkSongs'
import { AnnictWorkSyobocalLink } from './AnnictWorkSyobocalLink'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkSyobocalWrapper: React.FC<{ work: Work }> = ({ work }) => {
  const tid = annict2syobocal(work.annictId) ?? work.syobocalTid
  if (!tid) {
    return <span>-</span>
  }

  return (
    <SimpleGrid>
      <AnnictWorkSyobocalLink tid={tid} />
      <AnnictWorkSongs tid={tid} />
    </SimpleGrid>
  )
}
