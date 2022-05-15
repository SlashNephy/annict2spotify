import React from 'react'

import { Button } from '@mantine/core'

import type { Work } from '../../../graphql/types'

const AnnictClearButton: React.FC<{
  isFetching: boolean
  setWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ isFetching, setWorks }) => {
  const handleClearClick = () => {
    setWorks(new Map())
  }

  return (
    <Button color={isFetching ? 'gray' : 'primary'} disabled={isFetching} onClick={() => handleClearClick()}>
      Clear
    </Button>
  )
}

export default AnnictClearButton
