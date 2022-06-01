import { Button, Grid } from '@mantine/core'
import React from 'react'
import { DatabaseImport } from 'tabler-icons-react'

import type { ComponentPropsWithoutRef } from 'react'

export const SpotifySyncButton: React.FC<
  ComponentPropsWithoutRef<'button'> & {
    disabled: boolean
    onClick: () => void
  }
> = ({ disabled, onClick, ...props }) => {
  return (
    <Grid justify="center" align="center" columns={10}>
      <Button leftIcon={<DatabaseImport />} disabled={disabled} color="blue" onClick={onClick} {...props}>
        Add Tracks to Playlist
      </Button>
    </Grid>
  )
}
