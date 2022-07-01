import { User } from '../objects/user'
import UserModel from '../models/user.model'


export class UserImpl {

    async findByEmail(data: string): Promise<any> {
        var result = await UserModel.findOne({ email: data })
        if (result) return new Promise(resolve => resolve(result))
        console.error(`No record found  ${result}`)
        return new Promise((reject) => reject(result));
    }

    async login(): Promise<any> {
    }
}