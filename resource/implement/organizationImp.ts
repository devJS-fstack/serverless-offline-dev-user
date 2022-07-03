import { Organization } from '../objects/organize'
import OrganizationModel from '../models/organization.model'

export class OrganizationImp {
    async find(data: any) {
        const result = await OrganizationModel.findOne(data)
        if (result) return new Promise(resolve => resolve(result))
        return new Promise(reject => reject('No Organization can incorrect'))
    }
}