import React from 'react'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkRating: React.FC<{ work: Work }> = ({ work }) => {
  if (!work.satisfactionRate) {
    return <span>-</span>
  }

  return <span>{(work.satisfactionRate / 10).toFixed(2)} / 10</span>
}
