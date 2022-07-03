import awsServerlessExpress from 'aws-serverless-express';

import app from './app'
import prepareData from './core/prepareData'
import { UserImpl } from './implement/userImp'
import User_Utils from './utils/users.until'
import { RoleImpl } from './implement/roleImp'
import { Response } from './objects/response'
import { User } from './objects/user'
const server = awsServerlessExpress.createServer(app)
import { MongoDB } from './database/connect'

const mongoDB = new MongoDB




exports.handler = (event: any, context: any) => awsServerlessExpress.proxy(server, event, context)

export const function_test = async (event: any, context: any, callback: any) => {
    console.log('Testing function...')
    // prepareData(event, context)
    console.log('Event:', event)
    console.log('Context:', context)
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
            message: "Success",
            code: 200,
            info: {
                name: 'Tinh Nguyen',
                age: 20
            },
            role: 'SuperAdmin'
        }),
    };
    callback(null, response)
}

export const createUser = async (event: any, context: any, callback: any) => {
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
}

