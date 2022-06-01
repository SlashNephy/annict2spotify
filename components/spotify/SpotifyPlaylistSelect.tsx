import { Select } from '@mantine/core'
import React from 'react'

import { createPrivatePlaylist } from '../../lib/client/spotify'
import { useSpotifyAvailablePlaylists } from '../../lib/hooks/useSpotifyAvailablePlaylists'
import { CustomSelectItem } from '../CustomSelectItem'

import type { SetterU } from '../type'
import type { SelectItem } from '@mantine/core'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifyPlaylistSelect: React.FC<{
  token: ServiceJwt
  setSelectedPlaylist: SetterU<SpotifyApi.PlaylistObjectSimplified>
}> = ({ token, setSelectedPlaylist }) => {
  const [playlists, invalidatePlaylists, wasError] = useSpotifyAvailablePlaylists(token)
  const [selections, setSelections] = React.useState<SelectItem[]>(() => [])

  React.useEffect(() => {
    if (playlists) {
      setSelections(playlists.map(intoSelectItem))
    }
  }, [playlists])

  if (wasError) {
    return <span>Failed to fetch</span>
  }
  if (!playlists) {
    return <span>Loading...</span>
  }

  const handleCreate = async (query: string) => {
    const response = await createPrivatePlaylist(token, query)

    setSelections((previous) => [...previous, intoSelectItem(response)])
    await invalidatePlaylists()
  }

  const handleChange = (value: string | null) => {
    const playlist = playlists?.find((playlist) => playlist.id === value)
    setSelectedPlaylist(playlist)
  }

  return (
    <Select
      label="Spotify Playlist"
      itemComponent={CustomSelectItem}
      data={selections}
      required
      placeholder="Choose or create playlist"
      searchable
      clearable
      creatable
      getCreateLabel={(query) => `+ Create new playlist named "${query}"`}
      onCreate={handleCreate}
      onChange={handleChange}
    />
  )
}

const intoSelectItem = (playlist: SpotifyApi.PlaylistObjectSimplified): SelectItem => ({
  label: playlist.name,
  image: playlist.images[0]?.url,
  value: playlist.id,
  group: playlist.collaborative ? 'コラボプレイリスト' : 'マイプレイリスト',
})
