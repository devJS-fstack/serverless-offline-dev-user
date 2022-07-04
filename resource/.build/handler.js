"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.createUser = exports.updateRegion = exports.function_test = void 0;
const aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const server = aws_serverless_express_1.default.createServer(app_1.default);
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');
const connect_1 = require("./database/connect");
const mongoDB = new connect_1.MongoDB;
const countryCode_model_1 = __importDefault(require("./models/countryCode.model"));
exports.handler = (event, context) => aws_serverless_express_1.default.proxy(server, event, context);
const function_test = async (event, context, callback) => {
    console.log('Testing function...');
    const result = excelToJson({
        source: fs.readFileSync(path.join(__dirname, `../public/CountryCode.xlsx`))
    });
    console.log(result);
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
    callback(null, response);
};
exports.function_test = function_test;
const updateRegion = async (event, context, callback) => {
    await mongoDB.connect();
    const api_moke = excelToJson({
        source: fs.readFileSync(path.join(__dirname, `../public/CountryCode.xlsx`))
    });
    const data = await countryCode_model_1.default.find({});
    data.map(item => {
        for (let i = 0; i < api_moke.Sheet1.length; i++) {
            if (item.code === api_moke.Sheet1[i].A.toUpperCase()) {
                return item.region = api_moke.Sheet1[i].C;
            }
        }
    });
    try {
        data.forEach(async (item) => {
            await countryCode_model_1.default.updateOne({ code: item.code }, item);
        });
    }
    catch (err) {
        throw new Error(err);
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
    callback(null, response);
};
exports.updateRegion = updateRegion;
exports.createUser = user_controller_1.default.createUser;
exports.refreshToken = user_controller_1.default.refreshToken;
exports.forgotPassword = user_controller_1.default.forgotPassword;
exports.resetPassword = user_controller_1.default.resetPassword;
exports.updateProfile = user_controller_1.default.updateProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTBEO0FBQzFELGdEQUF1QjtBQUN2QixtRkFBeUQ7QUFDekQsTUFBTSxNQUFNLEdBQUcsZ0NBQW9CLENBQUMsWUFBWSxDQUFDLGFBQUcsQ0FBQyxDQUFBO0FBQ3JELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUN4QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDNUIsZ0RBQTRDO0FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQTtBQUMzQixtRkFBeUQ7QUFDekQsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQVUsRUFBRSxPQUFZLEVBQUUsRUFBRSxDQUFDLGdDQUFvQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBRTNGLE1BQU0sYUFBYSxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDdkIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztLQUM5RSxDQUFDLENBQUE7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25CLE1BQU0sUUFBUSxHQUFHO1FBQ2IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDTCw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsb0NBQW9DO1NBQzNFO1FB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