import React from 'react'

import { Button } from '@mantine/core'
import { Trash } from 'tabler-icons-react'

import type { Work } from '../../../graphql/types'

export const AnnictClearButton: React.FC<{
  isFetching: boolean
  setWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ isFetching, setWorks }) => {
  const handleClearClick = () => {
    setWorks(new Map())
  }

  return (
    <Button
      leftIcon={<Trash />}
      color={isFetching ? 'gray' : 'red'}
      disabled={isFetching}
      onClick={() => handleClearClick()}
    >
      Clear
    </Button>
  )
}
