export interface DataUserModel {
  id:number
  attributes:{
    blocked: boolean
    confirmed: boolean
    createdAt: string
    email: string
    id: number
    provider: string
    rol: any
    updatedAt: string
    username: string
    fullName:string
  }
}
