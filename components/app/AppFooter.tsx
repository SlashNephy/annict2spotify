import { Anchor, Container, Footer, Text } from '@mantine/core'
import React from 'react'
import { Heart } from 'tabler-icons-react'

import packageJson from '../../package.json'

export const AppFooter: React.FC = () => {
  return (
    <Footer height={60} p="md" fixed position={{ bottom: 0 }}>
      <Container>
        <Text size="sm">
          <Anchor size="sm" href={packageJson.repository} target="_blank">
            {packageJson.name}
          </Anchor>
          &nbsp;made with <Heart size={16} strokeWidth={2} color="#d27979" />.
        </Text>
      </Container>
    </Footer>
  )
}
