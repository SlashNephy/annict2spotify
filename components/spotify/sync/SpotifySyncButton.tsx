import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { Button, Grid } from '@mantine/core'
import { DatabaseImport } from 'tabler-icons-react'

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
