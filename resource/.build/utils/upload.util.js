"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./constants"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class default_1 {
    constructor(bucket) {
        this.s3Bucket = new aws_sdk_1.default.S3({
            params: {
                Bucket: bucket
            }
        });
    }
    upload(buf, key, type) {
        const params = {
            Key: key,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: type,
            ACL: 'public-read'
        };
        return new Promise((resolve, reject) => {
            this.s3Bucket.putObject(params, (err, data) => {
                if (err)
                    reject(err);
                else {
                    console.log('UPLOAD IMAGE SUCCESS...');
                    const path = `${constants_1.default.imageURL}/${key}`;
                    resolve({ path, key });
                }
            });
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91cGxvYWQudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUFvQztBQUNwQyxzREFBeUI7QUFFekI7SUFHSSxZQUFZLE1BQWM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsTUFBTTthQUNqQjtTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFZO1FBQ25DLE1BQU0sTUFBTSxHQUFRO1lBQ2hCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLEdBQUc7WUFDVCxlQUFlLEVBQUUsUUFBUTtZQUN6QixXQUFXLEVBQUUsSUFBSTtZQUNqQixHQUFHLEVBQUUsYUFBYTtTQUNyQixDQUFBO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQzFDLElBQUksR0FBRztvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBQ2Y7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO29CQUN0QyxNQUFNLElBQUksR0FBRyxHQUFHLG1CQUFTLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFBO29CQUMzQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtpQkFDekI7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBOUJELDRCQThCQyJ9