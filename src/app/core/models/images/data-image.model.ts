import {ImageFormatModel} from "./image-format.model";

export interface DataImageModel {
  id:number
  attributes:{
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      large: ImageFormatModel
      small: ImageFormatModel
      medium: ImageFormatModel
      thumbnail: ImageFormatModel
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl:string
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
}
