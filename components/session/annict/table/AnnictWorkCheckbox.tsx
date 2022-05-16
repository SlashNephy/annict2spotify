import React from 'react'

import { Checkbox } from '@mantine/core'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkCheckbox: React.FC<{
  work: Work
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ work, selectedWorks, setSelectedWorks }) => {
  const handleCheck = (work: Work) => {
    const workId = work.annictId
    const isChecked = selectedWorks.has(workId)

    setSelectedWorks((current) => {
      const copiedIds = new Map(current.entries())
      if (isChecked) {
        copiedIds.delete(workId)
      } else {
        copiedIds.set(workId, work)
      }

      return copiedIds
    })
  }

  return <Checkbox checked={selectedWorks.has(work.annictId)} onChange={() => handleCheck(work)} readOnly />
}
