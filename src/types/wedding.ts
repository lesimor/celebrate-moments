export interface WeddingData {
  couple: {
    groom: {
      name: string
      fullName: string
      father: string
      mother: string
      order: string // "장남", "차남" 등
    }
    bride: {
      name: string
      fullName: string
      father: string
      mother: string
      order: string // "장녀", "차녀" 등
    }
  }
  wedding: {
    date: string // YYYY-MM-DD
    time: string // HH:mm
    venue: {
      name: string
      hall: string
      address: string
      phone: string
      mapUrl?: string
      coordinates?: {
        lat: number
        lng: number
      }
    }
  }
  message: {
    title: string
    content: string
  }
  gallery: {
    mainImage: string
    images: string[]
  }
  rsvp?: {
    enabled: boolean
    deadline?: string
    formUrl?: string
  }
  bank?: {
    groom: Array<{
      bank: string
      account: string
      holder: string
    }>
    bride: Array<{
      bank: string
      account: string
      holder: string
    }>
  }
  contact: {
    groom: Array<{
      name: string
      relation: string
      phone: string
    }>
    bride: Array<{
      name: string
      relation: string
      phone: string
    }>
  }
}