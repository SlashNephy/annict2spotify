import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../graphql/operations'

import type { ViewerWorksQuery } from '../graphql/operations'
import type { StatusState, Work } from '../graphql/types'

const ExampleAnnictProfile = {
  id: 2,
  username: 'shimbaco',
  name: 'Koji Shimba',
  description: 'アニメ好きが高じてこのサービスを作りました。聖地巡礼を年に数回しています。',
  url: 'http://shimba.co',
  avatar_url:
    'https://api-assets.annict.com/paperclip/profiles/1/tombo_avatars/master/d8af7adc8122c96ba7639218fd8b5ede332d42f2.jpg?1431357292',
  background_image_url:
    'https://api-assets.annict.com/paperclip/profiles/1/tombo_background_images/master/ee15d577fb2f2d61bdaf700cfab894b286a5762d.jpg?1486753229',
  records_count: 2369,
  followings_count: 258,
  followers_count: 205,
  wanna_watch_count: 237,
  watching_count: 103,
  watched_count: 335,
  on_hold_count: 45,
  stop_watching_count: 244,
  created_at: '2014-03-02T15:38:40.000Z',
  email: 'me@shimba.co',
  notifications_count: 0,
}

export type AnnictProfile = typeof ExampleAnnictProfile

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
