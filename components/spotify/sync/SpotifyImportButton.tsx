import { Button, Grid } from '@mantine/core'
import React from 'react'
import { DatabaseImport } from 'tabler-icons-react'

import type { Setter } from '../../type'
import type { SyobocalSong } from '@prisma/client'
import type { ComponentPropsWithoutRef } from 'react'

export const SpotifyImportButton: React.FC<
  ComponentPropsWithoutRef<'button'> & {
    selectedSongs: Map<string, SyobocalSong>
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
