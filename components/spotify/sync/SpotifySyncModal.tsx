import React from 'react'

import { Button, Divider, Grid, Modal, Progress, useMantineTheme } from '@mantine/core'
import { HandStop } from 'tabler-icons-react'

export const SpotifySyncModal: React.FC<{
  isJobRunning: boolean
  cancelJob: () => void
  progress: number
}> = ({ isJobRunning, cancelJob, progress }) => {
  const theme = useMantineTheme()

  return (
    <>
      <Modal
        opened={isJobRunning}
        onClose={cancelJob}
        title="Syncronizing Tracks..."
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <Progress value={progress} label={`${progress} %`} />

        <Divider />

        <Grid justify="center" align="center" columns={10}>
          <Button color="red" leftIcon={<HandStop />} onClick={cancelJob}>
            Cancel
          </Button>
        </Grid>
      </Modal>
    </>
  )
}
