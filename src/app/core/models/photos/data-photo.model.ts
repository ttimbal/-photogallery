import { EventModel } from "../event/event.model";
import {DataEventModel} from "../event/data-event.model";
import {DataImageModel} from "../images/data-image.model";
import {DataUserModel} from "../user/data-user.model";

export interface DataPhotoModel {
  id: number
  attributes: {
    cost: number
    photographer: {
      data:DataUserModel
    },
    createdAt: string
    updatedAt: string
    publishedAt: string
    image: {
      data:DataImageModel
    },
    event: {
      data:DataEventModel
    }
  },
}
