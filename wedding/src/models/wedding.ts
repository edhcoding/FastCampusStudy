export interface Wedding {
  id: number
  date: string
  location: Location
  groom: Person & { parents: Person[] } // 기본적으로 Person 타입을 가지는데 추가적으로 parents를 가짐 parents는 Person의 배열 형태로 가지고 있음
  bride: Person & { parents: Person[] }
  message: {
    intro: string
    invitation: string
  }
  galleryImages: string[]
  attendCount: number
}

export interface Location {
  lat: number
  lng: number
  name: string
  address: string
  link: string
  waytocome: {
    metro: string[]
    bus: string[]
  }
}

export interface Person {
  name: string
  account: Account
  phoneNumber: string
}

export interface Account {
  bankName: string
  accountNumber: string
}
