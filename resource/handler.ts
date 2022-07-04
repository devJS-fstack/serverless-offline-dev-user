import awsServerlessExpress from 'aws-serverless-express';
import app from './app'
import UserController from './controller/user.controller'
const server = awsServerlessExpress.createServer(app)





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

export const createUser = UserController.createUser
export const refreshToken = UserController.refreshToken

