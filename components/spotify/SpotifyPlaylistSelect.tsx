import React from 'react'

import { Select } from '@mantine/core'
import { useQuery, useQueryClient } from 'react-query'

import { createSpotifyClient, getPlaylists, getProfile } from '../../lib/spotify'
import { CustomSelectItem } from '../CustomSelectItem'

import type { SetterU } from '../type'
import type { SelectItem } from '@mantine/core'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifyPlaylistSelect: React.FC<{
  token: ServiceJwt
  setSelectedPlaylist: SetterU<SpotifyApi.PlaylistObjectSimplified>
}> = ({ token, setSelectedPlaylist }) => {
  const queryClient = useQueryClient()
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery(['spotify', token.accessToken, 'profile'], () => getProfile(token))
  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    error: playlistsError,
  } = useQuery(['spotify', token.accessToken, 'playlists'], () => getPlaylists(token))
  const [selections, setSelections] = React.useState<SelectItem[]>(() => [])

  React.useEffect(() => {
    if (profile && playlists) {
      setSelections(
        playlists.filter((playlist) => playlist.owner.id === profile.id || playlist.collaborative).map(intoSelectItem)
      )
    }
  }, [playlists, profile])

  if (profileError || playlistsError) {
    return <span>Failed to fetch</span>
  }
  if (!playlists || isProfileLoading || isPlaylistsLoading) {
    return <span>Loading...</span>
  }

  const handleCreate = async (query: string) => {
    const client = createSpotifyClient(token)

    const response = await client.createPlaylist(query, {
      public: false,
      collaborative: false,
    })

    setSelections((previous) => [...previous, intoSelectItem(response.body)])
    await queryClient.invalidateQueries([token.accessToken, 'spotify', 'playlists'])
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
