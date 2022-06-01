import { Anchor } from '@mantine/core'
import React from 'react'

import type { Work } from '../../../graphql/types'

export const AnnictWorkTitle: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Anchor href={`https://annict.com/works/${work.annictId}`} target="_blank">
      {work.title}
    </Anchor>
  )
}
