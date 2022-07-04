import { Response } from '../objects/response'
export default class ResponseModel {
    statusCode?: number
    headers?: any
    body?: any
    constructor(statusCode: number, header: any = { "Access-Control-Allow-Origin": "*" }, body: any = '') {
        this.statusCode = statusCode;
        this.headers = header || { "Access-Control-Allow-Origin": "*" }
        this.body = body
    }
};