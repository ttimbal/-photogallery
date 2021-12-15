import {ImageFormatModel} from "./image-format.model";
export interface ImageModel {

  id:number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    small: ImageFormatModel
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
