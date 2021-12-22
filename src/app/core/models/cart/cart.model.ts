import {DataPhotoModel} from "../photos/data-photo.model";

export interface CartModel {
  data: {
    id:number
    attributes: {
      photo:{
        data:DataPhotoModel
      }
    }
  }[]
}
