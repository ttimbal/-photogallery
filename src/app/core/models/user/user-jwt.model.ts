import {UserModel} from "./user.model";

export interface UserJwtModel {
  jwt:string
  user:UserModel
}
