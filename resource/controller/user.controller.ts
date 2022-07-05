import prepareData from '../core/prepareData'
import { UserImpl } from '../implement/userImp'
import User_Utils from '../utils/users.until'
import { RoleImpl } from '../implement/roleImp'
import { Response } from '../objects/response'
import { User } from '../objects/user'
import { schemaCreateUser } from '../validate/user.validate'
import { MongoDB } from '../database/connect'
import ResponseModel from '../models/response.model'
import prepareDate from '../core/prepareData'
import { uploadImage } from '../services/user.service'
import constants from '../utils/constants'

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
    },

    forgotPassword: async (event: any, context: any, callback: any) => {
        const body = JSON.parse(event.body)
        const { email } = body
        const response = new ResponseModel(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }))
        const user = new User_Utils({ username: email, email })
        try {
            const result = await user.forgotPassword()
        } catch (err) {
            response.statusCode = 401
            response.body = JSON.stringify({
                code: 401,
                errors: err
            })
            return callback(null, response)
        }
        callback(null, response)
    },

    resetPassword: async (event: any, context: any, callback: any) => {
        const body = JSON.parse(event.body)
        const response = new ResponseModel(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }))
        const { code, username, password, confirmPassword } = body
        if (password !== confirmPassword) {
            response.statusCode = 400
            response.body = JSON.stringify({
                code: 400,
                message: 'Not incorrect two password'
            })
            callback(null, response)
        }
        const user = new User_Utils({ username })
        try {
            const result = await user.resetPassword(code, password)

        } catch (err) {
            response.statusCode = 400
            response.body = JSON.stringify({
                code: 400,
                errors: err
            })
            callback(null, response)
        }


        callback(null, response)
    },

    changePassword: async (event: any, context: any, callback: any) => {
        const body = JSON.parse(event.body)
        const { oldPassword, newPassword, accessToken } = body;
        const response = new ResponseModel(200, null)
        const user = new User_Utils({})
        try {
            const result = await user.changePassword(oldPassword, newPassword, accessToken)
            if (result) {
                response.body = JSON.stringify({
                    code: 200,
                    message: 'success',
                    data: result
                })
            }
        } catch (err: any) {
            response.statusCode = 400,
                response.body = JSON.stringify({
                    code: 400,
                    errors: err.message
                })
        }

        callback(null, response)
    },

    updateProfile: async (event: any, context: any, callback: any) => {
        await mongoDB.connect()
        prepareDate(event, context)
        const { Authorization } = event.headers
        const { email } = event.currentUser
        const body = JSON.parse(event.body);
        const { firstName, lastName, phoneNumber } = body
        const response = new ResponseModel(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }))
        const user = new User_Utils({ firstName, lastName })
        try {
            const resolve = await user.updateProfile(Authorization);
        } catch (err: any) {
            response.statusCode = 400
            response.body = JSON.stringify({
                code: 400,
                errors: err.message
            })
            callback(null, response)
        }

        const userImpl = new UserImpl();

        try {
            const data = await userImpl.updateProfile(email, firstName, lastName, phoneNumber);
            const newUser = await userImpl.findByEmail(email)
            response.body = JSON.stringify({
                code: 200,
                message: 'success',
                user: newUser
            })
        } catch (err) {
            response.statusCode = 400
            response.body = JSON.stringify({
                code: 400,
                errors: err
            })
            callback(null, response)
        }

        callback(null, response)
    },

    getListUser: async (event: any, context: any, callback: any) => {
        await mongoDB.connect()
        const body = JSON.parse(event.body);
        prepareDate(event, context)
        // console.log('Event: ', event)
        // console.log('Claims: ', event.requestContext.authorizer.claims)
        const response = new ResponseModel(200, null, JSON.stringify({
            code: 200,
            message: 'success',
        }))
        if (!event.currentUser) {
            response.statusCode = 401;
            response.body = JSON.stringify({
                code: 401,
                message: 'Authorization incorrect'
            })
            callback(null, response);
        }
        const user: any = await new UserImpl().findOne({ 'email': event.currentUser.email })
        const { role, name } = user.userRole
        let flag = {}
        if (role !== 'SUPER_ADMIN') {
            flag = { organization: event.currentUser.orga }
        }

        const listUsers = await new UserImpl().findAll({ organization: event.currentUser.organization })

        response.body = JSON.stringify({
            code: 200,
            message: 'success',
            data: listUsers.map((user: any) => {
                return {
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    organization: user.organization
                }
            }).sort((a: any, b: any) => a?.email?.localeCompare(b?.email))
        })

        callback(null, response);
    },

    updateProfilePicture: async (event: any, context: any, callback: any) => {
        await mongoDB.connect()
        const body = JSON.parse(event.body)
        const { data } = body
        const response = new ResponseModel(200, null, JSON.stringify({
            code: 200,
            message: 'success',
        }))
        if (prepareDate(event, context)) {
            const user = event.currentUser
            if (user.organization) {
                const photo = data ? data.toString('base64') : ''
                const { _id } = await new UserImpl().findOne({ 'username': user.username })
                const path = `${user.organization}/profile`
                try {
                    const imageFromS3: any = await uploadImage(constants.bucketImageProfile, path, photo, _id)
                    console.log('Image from S3', imageFromS3)
                    if (imageFromS3) {
                        response.body = JSON.stringify({
                            code: 200,
                            messgae: 'success',
                            link: imageFromS3.path
                        })
                        await new UserImpl().update({ email: user.email }, { profilePicture: imageFromS3.path })
                        callback(null, response)
                    }
                } catch (err) {
                    response.statusCode = 400;
                    response.body = JSON.stringify({
                        code: 400,
                        messgae: 'success',
                        errors: err
                    })
                    callback(null, response)
                }
            } else {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    code: 400,
                    messgae: 'Token is incorrect. Please try again',
                })
                callback(null, response)
            }
        }
        callback(null, response)
    }
}