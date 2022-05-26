import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { Table } from '@mantine/core'
import RenderIfVisible from 'react-render-if-visible'

import { SpotifyTrackRow } from './table/SpotifyTrackRow'

import type { Song } from '../../lib/syobocal/song'
import type { Setter } from '../type'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySongTable: React.FC<
  ComponentPropsWithoutRef<'table'> & {
    token: ServiceJwt
    selectedSongs: Map<string, Song>
    setSelectedTracks: Setter<Map<string, SpotifyApi.TrackObjectFull>>
    isStrictMode: boolean
  }
> = ({ token, selectedSongs, setSelectedTracks, isStrictMode, ...props }) => {
  return (
    <>
      <Table striped highlightOnHover {...props}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Spotify</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(selectedSongs.values()).map((song) => (
            <RenderIfVisible key={song.id} stayRendered defaultHeight={200} rootElement="tr" placeholderElement="td">
              <SpotifyTrackRow
                token={token}
                song={song}
                setSelectedTracks={setSelectedTracks}
                isStrictMode={isStrictMode}
              />
            </RenderIfVisible>
          ))}
        </tbody>
      </Table>
    </>
  )
}
