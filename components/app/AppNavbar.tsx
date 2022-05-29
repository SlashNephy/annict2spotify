import Link from 'next/link'
import React from 'react'

import { Anchor, Collapse, Navbar, Text } from '@mantine/core'

export const AppNavbar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Collapse in={isOpen} transitionDuration={500} transitionTimingFunction="linear">
      <Navbar height={600} p="xs" width={{ base: 300 }}>
        <Navbar.Section>
          <Anchor component={Link} href="/">
            <Text>My Annict</Text>
          </Anchor>
        </Navbar.Section>
      </Navbar>
    </Collapse>
  )
}
