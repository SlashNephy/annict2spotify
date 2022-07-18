import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../../../graphql/sdk'

import type { ViewerWorksQuery } from '../../../graphql/operations'
import type { StatusState, Work } from '../../../graphql/types'

export const fetchAllWorks = async (token: string, state: StatusState): Promise<Work[]> => {
  const client = new GraphQLClient('https://api.annict.com/graphql', {
    headers: {
      Authorization: `Bearer ${token}`,
      // ブラウザからのリクエストになるので不要
      // 'User-Agent': USER_AGENT,
    },
  })
  const sdk = getSdk(client)

  const works: Work[] = []
  let after: string | null = null

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response: ViewerWorksQuery = await sdk.ViewerWorks({ state, after })
      const items = response.viewer?.works?.nodes?.filter((item) => item)
      if (!items || items.length === 0) {
        break
      }

      works.push(...(items as Work[]))
      after = response.viewer?.works?.pageInfo.endCursor ?? null
    } catch (e) {
      console.error(e)
      break
    }
  }

  return works
}
