import React from 'react'

import { cancelable } from 'cancelable-promise'

import { addTracksToPlaylist } from '../../../lib/spotify'
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
    const newJob = cancelable(addTracksToPlaylist(token, selectedPlaylist.id, selectedTrackUris))
    setJob(newJob)

    await newJob
  }

  return (
    <>
      <SpotifySyncButton
        disabled={!selectedPlaylist || selectedTracks.size === 0 || isJobRunning}
        onClick={handleClick}
      />

      <SpotifySyncModal isJobRunning={isJobRunning} cancelJob={cancelJob} />
    </>
  )
}
