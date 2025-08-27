export type PlansRoot = PlasItem[]

export interface PlasItem {
  idPlan: number
  idGarage: number
  description: string
  startValidity: string
  endValidity: string
  priceInCents: number
  active: boolean
  descriptionAvailable: string
  amountDailyCancellationInCents: number
  VeichleType?: number
  totalVacancies: number
  veichleType?: number
}
