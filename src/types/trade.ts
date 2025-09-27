export interface ServiceType {
  label: string
  buttonPos: string
  size?: string
}

export interface Meal {
  id: number
  name: string
  description: string
  price: number
  features: string[]
}

export interface Address {
  location: string
  details: string
}

export interface TradeData {
  serviceType: ServiceType | null
  meal: Meal | null
  address: Address | null
}
