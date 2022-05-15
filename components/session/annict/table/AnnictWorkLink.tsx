import React from 'react'

import { Anchor } from '@mantine/core'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkLink: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <Anchor href={`https://annict.com/works/${work.annictId}`} target="_blank">
      {work.title}
    </Anchor>
  )
}
