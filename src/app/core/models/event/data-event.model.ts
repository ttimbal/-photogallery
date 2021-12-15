import {DataImageModel} from "../images/data-image.model";
import {DataUserModel} from "../user/data-user.model";
import {DataStatusModel} from "../status/data-status.model";

export interface DataEventModel {
  id: 2,
  attributes: {
    uuid: string
    name: string
    description: string
    date: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    cover: {
      data:DataImageModel[]
    },
    user: {
      data:DataUserModel
    },
    status:{
      data:DataStatusModel
    },
    members: {
      data:DataUserModel[]
    }
  }

}
