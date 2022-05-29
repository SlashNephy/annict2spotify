import React from 'react'

import { showNotification } from '@mantine/notifications'
import { cancelable } from 'cancelable-promise'

import { addTracksToPlaylist } from '../../../lib/client/spotify'
import { SpotifySyncButton } from './SpotifySyncButton'
import { SpotifySyncModal } from './SpotifySyncModal'

import type CancelablePromise from 'cancelable-promise'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySyncWrapper: React.FC<{
  token: ServiceJwt
  selectedPlaylist?: SpotifyApi.PlaylistObjectSimplified
  selectedTracks: Map<string, SpotifyApi.TrackObjectFull>
}> = ({ token, selectedPlaylist, selectedTracks }) => {
  const [job, setJob] = React.useState<CancelablePromise<void>>()
  const isJobRunning = job !== undefined && !job.isCanceled()
  const [progress, setProgress] = React.useState(0)

  const cancelJob = () => {
    job?.cancel()
    setJob(undefined)
  }

  const handleClick = async () => {
    if (!selectedPlaylist) {
      return
    }

    cancelJob()

    const selectedTrackUris = Array.from(selectedTracks.values()).map((track) => track.uri)
    const newJob = cancelable(addTracksToPlaylist(token, selectedPlaylist.id, selectedTrackUris, setProgress))
    setJob(newJob)

    await newJob
    setJob(undefined)
    setProgress(100)

    showNotification({
      color: 'green',
      title: 'Added to playlist',
      message: `Successfully added ${selectedTracks.size} tracks to ${selectedPlaylist.name}.`,
      autoClose: 10000,
    })
  }

  return (
    <>
      <SpotifySyncButton
        disabled={!selectedPlaylist || selectedTracks.size === 0 || isJobRunning}
        onClick={handleClick}
      />

      <SpotifySyncModal isJobRunning={isJobRunning} cancelJob={cancelJob} progress={progress} />
    </>
  )
}
