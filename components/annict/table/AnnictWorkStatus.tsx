import React from 'react'

import { Badge } from '@mantine/core'

import { statusState2Color, statusState2Label } from '../ui'

import type { Work } from '../../../graphql/types'

export const AnnictWorkStatus: React.FC<{ work: Work }> = ({ work }) => {
  return <Badge color={statusState2Color(work.viewerStatusState)}>{statusState2Label(work.viewerStatusState)}</Badge>
}
