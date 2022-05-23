import React from 'react'

import { Avatar, Group, Select, Text } from '@mantine/core'
import { useQuery, useQueryClient } from 'react-query'
import { Music } from 'tabler-icons-react'

import { Job } from '../../../lib/Job'
import { createSpotifyClient, getPlaylists, getProfile, searchTracks } from '../../../lib/spotify'
import { SpotifyAddToPlaylistButton } from './SpotifyAddToPlaylistButton'
import { SpotifySongTable } from './SpotifySongTable'

import type { Song } from '../../../lib/syobocal/song'
import type { SelectItem } from '@mantine/core'
import type { ServiceJwt } from 'next-auth/jwt'

export const SpotifySession: React.FC<{ token: ServiceJwt; selectedSongs: Map<string, Song> }> = ({
  token,
  selectedSongs,
}) => {
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery([token.accessToken, 'spotify', 'profile'], () => getProfile(token))
  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    error: playlistsError,
  } = useQuery([token.accessToken, 'spotify', 'playlists'], () => getPlaylists(token))
  const [data, setData] = React.useState<SelectItem[]>(() => [])
  const queryClient = useQueryClient()
  const [tracks, setTracks] = React.useState<Map<string, SpotifyApi.TrackObjectFull[]>>(() => new Map())
  const [selectedTracks, setSelectedTracks] = React.useState<Map<string, number>>(() => new Map())
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>()

  const intoSelectItem = (playlist: SpotifyApi.PlaylistObjectSimplified) => ({
    label: playlist.name,
    image: playlist.images[0]?.url,
    value: playlist.id,
    group: playlist.collaborative ? 'コラボプレイリスト' : 'マイプレイリスト',
  })

  React.useEffect(() => {
    if (profile && playlists) {
      setData(
        playlists.filter((playlist) => playlist.owner.id === profile.id || playlist.collaborative).map(intoSelectItem)
      )
    }
  }, [playlists, profile])

  React.useEffect(() => {
    const jobs = Array.from(selectedSongs.values()).map((song) => {
      return Job.from(song, searchTracks(token, song.title))
    })

    Promise.allSettled(jobs).then((results) => {
      for (const job of results) {
        if (job.status === 'fulfilled') {
          const { result, context } = job.value

          setTracks((tracks) => tracks.set(context.id, result.tracks.items))
          setSelectedTracks((selectedTracks) => {
            selectedTracks.delete(context.id)
            return selectedTracks
          })
        }
      }
    })
  }, [selectedSongs, token])

  const handleCreate = async (query: string) => {
    const client = createSpotifyClient(token)

    const response = await client.createPlaylist(query, {
      public: false,
      collaborative: false,
    })

    setData((previousData) => [...previousData, intoSelectItem(response.body)])
    await queryClient.invalidateQueries([token.accessToken, 'spotify', 'playlists'])
  }

  if (profileError || playlistsError) {
    return <span>Failed to fetch</span>
  }
  if (!playlists || isProfileLoading || isPlaylistsLoading) {
    return <span>Loading...</span>
  }

  return (
    <>
      <SpotifyAddToPlaylistButton
        token={token}
        selectedPlaylist={selectedPlaylist}
        tracks={tracks}
        selectedTracks={selectedTracks}
      />

      <Select
        label="Spotify Playlist"
        itemComponent={CustomSelectItem}
        data={data}
        required
        placeholder="Choose or create playlist"
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ Create new playlist named "${query}"`}
        onCreate={handleCreate}
        onChange={(selected) => setSelectedPlaylist(selected ?? undefined)}
      />

      <SpotifySongTable
        selectedSongs={selectedSongs}
        tracks={tracks}
        selectedTracks={selectedTracks}
        setSelectedTracks={setSelectedTracks}
      />
    </>
  )
}

// eslint-disable-next-line react/display-name
export const CustomSelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & SelectItem>(
  ({ value, label, image, description, ...others }: React.ComponentPropsWithoutRef<'div'> & SelectItem, ref) => (
    <div key={value} ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image}>
          <Music />
        </Avatar>

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
)
