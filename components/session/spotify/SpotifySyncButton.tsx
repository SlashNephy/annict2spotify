import React from 'react'

import { Button, Grid } from '@mantine/core'
import { DatabaseImport } from 'tabler-icons-react'

import type { Song } from '../../../lib/syobocal/song'

export const SpotifySyncButton: React.FC<{
  selectedSongs: Map<string, Song>
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ selectedSongs, setIsClicked }) => {
  return (
    <>
      <Grid justify="center" align="center" columns={10}>
        <Button
          leftIcon={<DatabaseImport />}
          disabled={selectedSongs.size === 0}
          color="blue"
          onClick={() => setIsClicked(true)}
        >
          Import to Spotify
        </Button>
      </Grid>
    </>
  )
}
