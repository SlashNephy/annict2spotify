import React from 'react'

import { Avatar, Group, Text } from '@mantine/core'
import { Music } from 'tabler-icons-react'

import type { SelectItem } from '@mantine/core'

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
