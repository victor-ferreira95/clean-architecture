export interface InputCreateCustomerDto {
  name: string
  // o dto não tem que conhecer o object-value do ddd
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface OutputCreateCustomerDto {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}
