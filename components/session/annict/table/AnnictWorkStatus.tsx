import React from 'react'

import { Badge } from '@mantine/core'

import { statusState2Label } from '../ui'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkStatus: React.FC<{ work: Work }> = ({ work }) => {
  return <Badge>{statusState2Label(work.viewerStatusState)}</Badge>
}
