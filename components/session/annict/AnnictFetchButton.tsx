import React from 'react'

import { Button } from '@mantine/core'
import { cancelable } from 'cancelable-promise'

import { fetchAllWorks } from '../../../lib/annict'
import { statusState2Label } from './ui'

import type { StatusState, Work } from '../../../graphql/types'
import type CancelablePromise from 'cancelable-promise'

export const AnnictFetchButton: React.FC<{
  state: StatusState
  token: string
  isFetching: boolean
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
  setWorks: React.Dispatch<React.SetStateAction<Map<number, Work>>>
}> = ({ state, token, isFetching, setIsFetching, setWorks }) => {
  const [promise, setPromise] = React.useState<CancelablePromise<Work[]>>()
  const isCancelable = !!promise && isFetching

  const handleFetchClick = async () => {
    if (isCancelable) {
      promise?.cancel()
      setIsFetching(false)
      setPromise(undefined)
      return
    }

    if (isFetching) {
      return
    }

    const task = cancelable(fetchAllWorks(token, state))
    setIsFetching(true)
    setPromise(task)

    const newWorks = await task
    setWorks((current) => {
      const copiedWorks = new Map<number, Work>(current)
      for (const work of newWorks) {
        copiedWorks.set(work.annictId, work)
      }
      return copiedWorks
    })

    setIsFetching(false)
    setPromise(undefined)
  }

  const color = isCancelable ? 'red' : isFetching ? 'gray' : 'primary'
  const label = isCancelable ? 'Cancel' : isFetching ? 'Fetching' : 'Fetch'

  return (
    <>
      <Button color={color} disabled={!isCancelable && isFetching} onClick={() => handleFetchClick()}>
        {label} {statusState2Label(state)}
      </Button>

      {/*<Notification icon={<Check size={18} />} color="teal" title="Canceled successfully">*/}
      {/*  Fetching {statusState2Label(state)} task was cancelled successfully.*/}
      {/*</Notification>*/}
    </>
  )
}
