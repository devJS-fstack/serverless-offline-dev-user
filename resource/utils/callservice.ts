const AWS = require("aws-sdk");
import { getData } from "./getData";

const lambda = new AWS.Lambda();

export default (body: any, funcName: any, invocationType = "Event", queryStringParameters = {}) =>
    new Promise((resolve, reject) => {
        const params = {
            FunctionName: funcName,
            InvocationType: invocationType,
            LogType: "Tail",
            Payload: JSON.stringify({ body, queryStringParameters }),
        };
        lambda.invoke(params, function (err: any, data: any) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(getData(data));
            }
        });
    });
