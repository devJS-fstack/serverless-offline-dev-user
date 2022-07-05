import constants from "./constants";
import AWS from 'aws-sdk'

export default class {
    private s3Bucket: AWS.S3;

    constructor(bucket: string) {
        this.s3Bucket = new AWS.S3({
            params: {
                Bucket: bucket
            }
        })
    }

    upload(buf: any, key: any) {
        const params: any = {
            Key: key,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpg',
            ACL: 'public-read'
        }
        return new Promise((resolve, reject) => {
            this.s3Bucket.putObject(params, (err, data) => {
                if (err) reject(err)
                else {
                    console.log('UPLOAD IMAGE SUCCESS...')
                    const path = `${constants.imageURL}/${key}`
                    resolve({ path, key })
                }
            })
        })
    }
}