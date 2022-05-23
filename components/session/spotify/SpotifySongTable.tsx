import React from 'react'

import { Table } from '@mantine/core'

import { SpotifySongRow } from './table/SpotifySongRow'

import type { Song } from '../../../lib/syobocal/song'

export const SpotifySongTable: React.FC<{
  selectedSongs: Map<string, Song>
  tracks: Map<string, SpotifyApi.TrackObjectFull[]>
  selectedTracks: Map<string, number>
  setSelectedTracks: React.Dispatch<React.SetStateAction<Map<string, number>>>
}> = ({ selectedSongs, tracks, selectedTracks, setSelectedTracks }) => {
  return (
    <>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Spotify</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(selectedSongs.values()).map((song) => (
            <SpotifySongRow key={song.id} song={song} tracks={tracks} setSelectedTracks={setSelectedTracks} />
          ))}
        </tbody>
      </Table>
    </>
  )
}
