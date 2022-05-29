import { arm } from '@kawaiioverflow/arm'

export const syobocal2annict = (syobocalId: number): number | undefined => {
  return arm.find((arm) => arm.syobocal_tid === syobocalId)?.annict_id
}

export const annict2syobocal = (annictId: number): number | undefined => {
  return arm.find((arm) => arm.annict_id === annictId)?.syobocal_tid
}
