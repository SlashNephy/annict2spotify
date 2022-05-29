import { createHash } from 'crypto'

export const makeSha1HexHash = (text: string): string => {
  const instance = createHash('sha1')
  instance.update(text)

  return instance.digest('hex')
}
