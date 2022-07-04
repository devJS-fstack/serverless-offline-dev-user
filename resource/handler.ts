import awsServerlessExpress from 'aws-serverless-express';
import app from './app'
import UserController from './controller/user.controller'
const server = awsServerlessExpress.createServer(app)
const excelToJson = require('convert-excel-to-json');
const fs = require('fs')
const path = require('path')
import { MongoDB } from './database/connect'
const mongoDB = new MongoDB
import CountryCodeModel from './models/countryCode.model'
exports.handler = (event: any, context: any) => awsServerlessExpress.proxy(server, event, context)

export const function_test = async (event: any, context: any, callback: any) => {
    console.log('Testing function...')
    const result = excelToJson({
        source: fs.readFileSync(path.join(__dirname, `../public/CountryCode.xlsx`))
    })
    console.log(result)
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

export const updateRegion = async (event: any, context: any, callback: any) => {
    await mongoDB.connect()
    const api_moke: any = excelToJson({
        source: fs.readFileSync(path.join(__dirname, `../public/CountryCode.xlsx`))
    })
    const data: any[] = await CountryCodeModel.find({})
    data.map(item => {
        for (let i = 0; i < api_moke.Sheet1.length; i++) {
            if (item.code === api_moke.Sheet1[i].A.toUpperCase()) {
                return item.region = api_moke.Sheet1[i].C
            }
        }
    })
    try {
        data.forEach(async (item) => {
            await CountryCodeModel.updateOne({ code: item.code }, item)
        })
    } catch (err: any) {
        throw new Error(err)
    }
    // const data = await CountryCodeModel.find({ region: 'NA' })
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
            message: "Success",
            code: 200,
            data
        }),
    };
    callback(null, response)

}

export const createUser = UserController.createUser
export const refreshToken = UserController.refreshToken

