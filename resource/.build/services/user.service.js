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
        console.log(infoImg);
        if (!infoImg || infoImg.type !== 'image' || infoImg.mimeType !== 'image/jpeg' || photoSize > MAXIMUM_IMAGE) {
            reject('Invalid image. Please try again!');
        }
        else {
            const imageName = `${idImg}_${timestamp}`;
            const imagePath = `${path}/${imageName}`;
            const imageKey = `${imagePath}.${infoImg.format.toLowerCase()}`;
            try {
                const data = new upload_util_1.default(bucket).upload(photoBuffer, imageKey, infoImg.mimeType);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN2Qyx1RUFBOEM7QUFFOUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7QUFFL0IsTUFBTSxXQUFXLEdBQUcsS0FBSyxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLEtBQWEsRUFBRSxFQUFFO0lBQ3pGLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4RixNQUFNLFNBQVMsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9DLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN0QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLFNBQVMsR0FBRyxhQUFhLEVBQUU7WUFDeEcsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7U0FDN0M7YUFBTTtZQUNILE1BQU0sU0FBUyxHQUFHLEdBQUcsS0FBSyxJQUFJLFNBQVMsRUFBRSxDQUFBO1lBQ3pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFBO1lBQ3hDLE1BQU0sUUFBUSxHQUFHLEdBQUcsU0FBUyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQTtZQUMvRCxJQUFJO2dCQUNBLE1BQU0sSUFBSSxHQUFHLElBQUkscUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3BGLElBQUksSUFBSTtvQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDMUI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDZDtTQUVKO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUF0QlksUUFBQSxXQUFXLGVBc0J2QiJ9