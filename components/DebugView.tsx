import React from 'react'

import { IS_DEBUG } from '../lib/constants'

const DebugView: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  if (!IS_DEBUG) {
    return <></>
  }

  return <>{children}</>
}

export default DebugView
