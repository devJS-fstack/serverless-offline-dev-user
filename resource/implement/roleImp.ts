import RoleModel from '../models/role.model'


export class RoleImpl {

    async find(data: any): Promise<any> {
        return await RoleModel.findOne(data)
    }
}