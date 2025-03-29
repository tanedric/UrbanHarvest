export interface Product {
  id: string
  name: string
  description: string
  price: number
  unit: string
  image: string
  // category: string
  // farmId: string
  farm: string//farmName: string
  // distance: number
  // rating: number
  // harvestDate: string
  // availableQuantity: number
  // growingMethod: string
}

export interface Farm {
  id: string
  name: string
  description: string
  longDescription: string
  location: string
  address: string
  coverImage: string
  distance: number
  rating: number
  reviewCount: number
  established: string
  hours: string
  growingMethods: string
  sustainabilityPractices: string
  image:string
  reviews: {
    name: string
    avatar: string
    date: string
    rating: number
    comment: string
  }[]
}

