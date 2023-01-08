export type User = {
  id: string
  displayName: string
  userName: string
  email: string
  password: string
  code: string
  isActive: boolean
  refreshToken: string | null
}
