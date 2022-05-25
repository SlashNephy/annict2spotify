import React from 'react'

import { Button, Divider, Modal, useMantineTheme } from '@mantine/core'
import { HandStop } from 'tabler-icons-react'

export const SpotifySyncModal: React.FC<{
  isJobRunning: boolean
  cancelJob: () => void
}> = ({ isJobRunning, cancelJob }) => {
  const theme = useMantineTheme()

  return (
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
      <Divider />
      <Button color="red" leftIcon={<HandStop />} onClick={cancelJob}>
        Cancel
      </Button>
    </Modal>
  )
}
