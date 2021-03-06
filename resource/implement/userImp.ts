import { User } from '../objects/user'
import UserModel from '../models/user.model'


export class UserImpl {

    async findByEmail(data: string): Promise<any> {
        const result = await UserModel.findOne({ email: data })
        if (result) return new Promise(resolve => resolve(result))
        console.error(`No record found  ${result}`)
        return new Promise((reject) => reject(result));
    }

    async findOne(data: any): Promise<any> {
        return await UserModel.findOne(data)
    }

    async findAll(data: any): Promise<any> {
        return await UserModel.find(data)
    }

    async save(data: User): Promise<any> {
        const result = await new UserModel(data).save()
        return new Promise((resolve, reject) => {
            if (result) resolve(result)
            else reject('INSERT TO DATABASE FAILED')
        })
    }

    async updateProfile(email: string, firstName: string, lastName: string, phoneNumber: string) {
        const result = await UserModel.updateOne({ email }, { firstName, lastName, phoneNumber })
        return new Promise((resolve, reject) => {
            if (result) resolve(result)
            else reject('UPDATE PROFILE ERROR. PLEASE TRY AGAIN!')
        })
    }

    async update(condition: any, data: any) {
        console.log(condition)
        console.log(data)
        const result = await UserModel.updateOne(condition, data)
        return new Promise((resolve, reject) => {
            if (result) {
                console.log(result)
                resolve(result)
            }
            else reject('UPDATE ERROR. PLEASE TRY AGAIN!')
        })
    }
}