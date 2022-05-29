import React from 'react'

import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Trash } from 'tabler-icons-react'

import type { Work } from '../../graphql/types'
import type { Setter } from '../type'

export const AnnictClearButton: React.FC<{
  isFetching: boolean
  setWorks: Setter<Map<number, Work>>
}> = ({ isFetching, setWorks }) => {
  const handleClearClick = () => {
    setWorks(new Map())

    showNotification({
      id: 'annict-works-clear',
      title: 'Table cleared',
      icon: <Trash />,
      message: 'All works are cleared.',
      color: 'green',
    })
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
