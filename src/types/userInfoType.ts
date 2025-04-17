export type UserInfoType = {
  id: number
  email: string
  name: string | null
  googleId: string | null
  isAdmin: boolean
  phone: string | null
  facebookId: string | null
  confirmedEmail: string | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  twoFactorEnabled: boolean
  twoFactorCode: string | null
  receiveOffers: boolean
}
