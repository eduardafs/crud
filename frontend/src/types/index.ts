export interface User {
  id: string
  name: string
  avatar?: string
  email: string
  phone: string
}

export interface UserInput {
  name: string
  avatar?: string
  email: string
  phone: string
}

export interface UserUpdate {
  name?: string
  avatar?: string
  email?: string
  phone?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: string
}
