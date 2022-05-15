import React from 'react'

import { Checkbox } from '@mantine/core'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkCheckbox: React.FC<{
  work: Work
  selectedWorks: Set<number>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Set<number>>>
}> = ({ work, selectedWorks, setSelectedWorks }) => {
  const handleCheck = (workId: number) => {
    const isChecked = selectedWorks.has(workId)

    setSelectedWorks((current) => {
      const copiedIds = new Set(current)
      if (isChecked) {
        copiedIds.delete(workId)
      } else {
        copiedIds.add(workId)
      }

      return copiedIds
    })
  }

  return (
    <Checkbox
      checked={selectedWorks.has(work.annictId)}
      onChange={() => handleCheck(work.annictId)}
      readOnly={true}
    ></Checkbox>
  )
}
