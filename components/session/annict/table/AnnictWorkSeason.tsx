import React from 'react'

import { seasonName2Label } from '../ui'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkSeason: React.FC<{ work: Work }> = ({ work }) => {
  if (!work.seasonYear || !work.seasonName) {
    return <span>-</span>
  }

  return (
    <span>
      {seasonName2Label(work.seasonName)} {work.seasonYear}
    </span>
  )
}
