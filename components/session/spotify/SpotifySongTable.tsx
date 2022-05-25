import React from 'react'

import { Table } from '@mantine/core'
import RenderIfVisible from 'react-render-if-visible'

import { SpotifySongRow } from './table/SpotifySongRow'

import type { Song } from '../../../lib/syobocal/song'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySongTable: React.FC<{
  token: ServiceJwt
  selectedSongs: Map<string, Song>
  setSelectedTracks: React.Dispatch<React.SetStateAction<Map<string, SpotifyApi.TrackObjectFull>>>
}> = ({ token, selectedSongs, setSelectedTracks }) => {
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
            <RenderIfVisible key={song.id} stayRendered defaultHeight={200} rootElement="tr" placeholderElement="td">
              <SpotifySongRow token={token} song={song} setSelectedTracks={setSelectedTracks} />
            </RenderIfVisible>
          ))}
        </tbody>
      </Table>
    </>
  )
}
