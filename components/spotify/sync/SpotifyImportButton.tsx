import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { Button, Grid } from '@mantine/core'
import { DatabaseImport } from 'tabler-icons-react'

import type { Song } from '../../../lib/syobocal/song'
import type { Setter } from '../../type'

export const SpotifyImportButton: React.FC<
  ComponentPropsWithoutRef<'button'> & {
    selectedSongs: Map<string, Song>
    setIsClicked: Setter<boolean>
  }
> = ({ selectedSongs, setIsClicked, ...props }) => {
  return (
    <>
      <Grid justify="center" align="center" columns={10}>
        <Button
          leftIcon={<DatabaseImport />}
          disabled={selectedSongs.size === 0}
          color="blue"
          onClick={() => setIsClicked(true)}
          {...props}
        >
          Import to Spotify
        </Button>
      </Grid>
    </>
  )
}
