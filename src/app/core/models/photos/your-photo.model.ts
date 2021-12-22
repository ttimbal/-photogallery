import {DataUserModel} from "../user/data-user.model";
import {DataPhotoModel} from "./data-photo.model";

export interface YourPhotoModel {
  data:{
    id:number
    attributes:{
      user:{
        data:DataUserModel
      }
      photo:{
        data:DataPhotoModel
      }
    }
  }[]
}
