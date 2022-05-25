import type React from 'react'

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>
export type SetterU<T> = Setter<T | undefined>
