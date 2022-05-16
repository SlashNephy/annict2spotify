import React from 'react'

import { Checkbox } from '@mantine/core'

import type { Work } from '../../../../graphql/types'

export const AnnictWorkSelectAllCheckbox: React.FC<{
  works: Map<number, Work>
  selectedWorks: Map<number, Work>
  setSelectedWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ works, selectedWorks, setSelectedWorks }) => {
  const handleCheck = () => {
    const workSize = works.size

    setSelectedWorks((current) => {
      if (current.size === workSize) {
        return new Map()
      }

      return new Map(works.entries())
    })
  }

  return (
    <Checkbox
      checked={selectedWorks.size === works.size}
      indeterminate={selectedWorks.size > 0 && selectedWorks.size < works.size}
      onChange={() => handleCheck()}
      readOnly
    />
  )
}
