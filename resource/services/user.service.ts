const imageinfo = require('imageinfo');
import UploadUtils from '../utils/upload.util'

const MAXIMUM_IMAGE = 2 * 1024 * 1024;

export const uploadImage = async (bucket: string, path: string, image: any, idImg: string) => {
    const photoBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const timestamp: number = new Date().getTime();
    const infoImg = imageinfo(photoBuffer)
    const photoSize = Buffer.byteLength(photoBuffer)
    return new Promise((resolve, reject) => {
        if (!infoImg || infoImg.type !== 'image' || infoImg.mimeType !== 'image/png' || photoSize > MAXIMUM_IMAGE) {
            reject('Invalid image. Please try again!')
        } else {
            const imageName = `${idImg}_${timestamp}`
            const imagePath = `${path}/${imageName}`
            const imageKey = `${imagePath}.${infoImg.format.toLowerCase()}`
            return new UploadUtils(bucket).upload(photoBuffer, imageKey)
        }
    })
}