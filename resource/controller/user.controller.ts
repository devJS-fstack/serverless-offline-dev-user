import prepareData from '../core/prepareData'
import { UserImpl } from '../implement/userImp'
import User_Utils from '../utils/users.until'
import { RoleImpl } from '../implement/roleImp'
import { Response } from '../objects/response'
import { User } from '../objects/user'
import { schemaCreateUser } from '../validate/user.validate'
import { MongoDB } from '../database/connect'
import ResponseModel from '../models/response.model'

const mongoDB = new MongoDB

export default {
    createUser: async (event: any, context: any, callback: any) => {
        await mongoDB.connect()
        let response: Response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: {}
        };
        const body = JSON.parse(event.body)
        const { email, password, firstName, lastName, organization } = body
        const { error, value } = schemaCreateUser.validate({ firstName, lastName, email, password, organization })
        if (error) {
            response = {
                ...response,
                statusCode: 401,
                body: JSON.stringify({
                    message: 'Bad request',
                    code: 401,
                    errors: error.details[0].message
                }),
            }
            return callback(null, response)
        }
        const username = email
        const userRole = body.userRole || 'ORG_ADMIN'
        const role = await new RoleImpl().find({ 'role': userRole })
        if (!role) {
            response = {
                ...response,
                statusCode: 401,
                body: JSON.stringify({
                    message: 'Bad request',
                    code: 401,
                    errors: 'Role is not correct'
                }),
            }
            return callback(null, response)
        }
        const exist = await new UserImpl().findOne({ 'email': email })
        if (exist) {
            response = {
                ...response,
                statusCode: 401,
                body: JSON.stringify({
                    message: 'Bad request',
                    code: 401,
                    errors: 'User already exist'
                }),
            }
            return callback(null, response)
        }

        const newUser = new User_Utils({
            email,
            username,
            password,
            firstName,
            lastName,
            organization
        })

        const newUserDB: User = {
            email,
            username,
            firstName,
            lastName,
            organization,
            userRole: {
                roleName: role.roleName,
                role: role.role
            }
        }

        try {
            await newUser.create()
            await new UserImpl().save(newUserDB)
        } catch (err) {
            response = {
                ...response,
                statusCode: 401,
                body: JSON.stringify({
                    message: 'Bad response',
                    code: 401,
                    errors: err
                }),
            }
            return callback(null, response)
        }

        response = {
            ...response,
            statusCode: 200,
            body: JSON.stringify({
                message: "Success",
                code: 200,
            }),
        };
        callback(null, response)
    },

    refreshToken: async (event: any, context: any, callback: any) => {
        const body = JSON.parse(event.body)
        const { refreshToken } = body;
        const response = new ResponseModel(200, null)
        const userUntil = new User_Utils({ refreshToken })
        try {
            await userUntil.refreshTheToken()
        } catch (err: any) {
            response.statusCode = err.statusCode
            response.body = JSON.stringify({
                code: err.statusCode,
                message: err.code
            })
            return callback(null, response)
        }
        response.body = JSON.stringify({
            code: 200,
            message: 'success',
            info: {
                idToken: userUntil.idToken,
                accessToken: userUntil.accessToken
            }
        })
        callback(null, response)
    }

}