"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const imageinfo = require('imageinfo');
const upload_util_1 = __importDefault(require("../utils/upload.util"));
const MAXIMUM_IMAGE = 2 * 1024 * 1024;
const uploadImage = async (bucket, path, image, idImg) => {
    const photoBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const timestamp = new Date().getTime();
    const infoImg = imageinfo(photoBuffer);
    const photoSize = Buffer.byteLength(photoBuffer);
    return new Promise((resolve, reject) => {
        if (!infoImg || infoImg.type !== 'image' || infoImg.mimeType !== 'image/jpeg' || photoSize > MAXIMUM_IMAGE) {
            reject('Invalid image. Please try again!');
        }
        else {
            const imageName = `${idImg}_${timestamp}`;
            const imagePath = `${path}/${imageName}`;
            const imageKey = `${imagePath}.${infoImg.format.toLowerCase()}`;
            try {
                const data = new upload_util_1.default(bucket).upload(photoBuffer, imageKey);
                if (data)
                    resolve(data);
            }
            catch (err) {
                reject(err);
            }
        }
    });
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2Qyx1RUFBOEM7QUFFOUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFFL0IsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQ3pGLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4RixNQUFNLFNBQVMsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFlBQVksSUFBSSxTQUFTLEdBQUcsYUFBYSxFQUFFO1lBQ3hHLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO1NBQzdDO2FBQU07WUFDSCxNQUFNLFNBQVMsR0FBRyxHQUFHLEtBQUssSUFBSSxTQUFTLEVBQUUsQ0FBQTtZQUN6QyxNQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQTtZQUN4QyxNQUFNLFFBQVEsR0FBRyxHQUFHLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUE7WUFDL0QsSUFBSTtnQkFDQSxNQUFNLElBQUksR0FBRyxJQUFJLHFCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDbEUsSUFBSSxJQUFJO29CQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUMxQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNkO1NBRUo7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQXJCWSxRQUFBLFdBQVcsZUFxQnZCIn0=