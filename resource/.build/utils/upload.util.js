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
    upload(buf, key) {
        const params = {
            Key: key,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpg',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLnV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91cGxvYWQudXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDREQUFvQztBQUNwQyxzREFBeUI7QUFFekI7SUFHSSxZQUFZLE1BQWM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDSixNQUFNLEVBQUUsTUFBTTthQUNqQjtTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBUSxFQUFFLEdBQVE7UUFDckIsTUFBTSxNQUFNLEdBQVE7WUFDaEIsR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsR0FBRztZQUNULGVBQWUsRUFBRSxRQUFRO1lBQ3pCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCLENBQUE7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxHQUFHO29CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDZjtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7b0JBQ3RDLE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFLENBQUE7b0JBQzNDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO2lCQUN6QjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUE5QkQsNEJBOEJDIn0=