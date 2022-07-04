"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.function_test = void 0;
const aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./controller/user.controller"));
const server = aws_serverless_express_1.default.createServer(app_1.default);
exports.handler = (event, context) => aws_serverless_express_1.default.proxy(server, event, context);
const function_test = async (event, context, callback) => {
    console.log('Testing function...');
    // prepareData(event, context)
    console.log('Event:', event);
    console.log('Context:', context);
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
exports.createUser = user_controller_1.default.createUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTBEO0FBQzFELGdEQUF1QjtBQUN2QixtRkFBeUQ7QUFDekQsTUFBTSxNQUFNLEdBQUcsZ0NBQW9CLENBQUMsWUFBWSxDQUFDLGFBQUcsQ0FBQyxDQUFBO0FBTXJELE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFVLEVBQUUsT0FBWSxFQUFFLEVBQUUsQ0FBQyxnQ0FBb0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUUzRixNQUFNLGFBQWEsR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxRQUFhLEVBQUUsRUFBRTtJQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDbEMsOEJBQThCO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQ2hDLE1BQU0sUUFBUSxHQUFHO1FBQ2IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDTCw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsb0NBQW9DO1NBQzNFO1FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsSUFBSSxFQUFFLEdBQUc7WUFDVCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLEdBQUcsRUFBRSxFQUFFO2FBQ1Y7WUFDRCxJQUFJLEVBQUUsWUFBWTtTQUNyQixDQUFDO0tBQ0wsQ0FBQztJQUNGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBckJZLFFBQUEsYUFBYSxpQkFxQnpCO0FBRVksUUFBQSxVQUFVLEdBQUcseUJBQWMsQ0FBQyxVQUFVLENBQUEifQ==