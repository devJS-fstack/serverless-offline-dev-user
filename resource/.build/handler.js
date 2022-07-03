"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.function_test = void 0;
const aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
const app_1 = __importDefault(require("./app"));
const userImp_1 = require("./implement/userImp");
const users_until_1 = __importDefault(require("./utils/users.until"));
const roleImp_1 = require("./implement/roleImp");
const server = aws_serverless_express_1.default.createServer(app_1.default);
const connect_1 = require("./database/connect");
const mongoDB = new connect_1.MongoDB;
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
const createUser = async (event, context, callback) => {
    await mongoDB.connect();
    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: {}
    };
    const body = JSON.parse(event.body);
    const { email, password, firstName, lastName, organization } = body;
    const username = email;
    const userRole = body.userRole || 'ORG_ADMIN';
    const role = await new roleImp_1.RoleImpl().find({ 'role': userRole });
    if (!role) {
        response = Object.assign(Object.assign({}, response), { statusCode: 401, body: JSON.stringify({
                message: 'Bad request',
                code: 401,
                errors: 'Role is not correct'
            }) });
        return callback(null, response);
    }
    const exist = await new userImp_1.UserImpl().findOne({ 'email': email });
    if (exist) {
        response = Object.assign(Object.assign({}, response), { statusCode: 401, body: JSON.stringify({
                message: 'Bad request',
                code: 401,
                errors: 'User already exist'
            }) });
        return callback(null, response);
    }
    const newUser = new users_until_1.default({
        email,
        username,
        password,
        firstName,
        lastName,
        organization
    });
    const newUserDB = {
        email,
        username,
        firstName,
        lastName,
        organization,
        userRole: {
            roleName: role.roleName,
            role: role.role
        }
    };
    try {
        await newUser.create();
        await new userImp_1.UserImpl().save(newUserDB);
    }
    catch (err) {
        response = Object.assign(Object.assign({}, response), { statusCode: 401, body: JSON.stringify({
                message: 'Bad response',
                code: 401,
                errors: err
            }) });
        return callback(null, response);
    }
    response = Object.assign(Object.assign({}, response), { statusCode: 200, body: JSON.stringify({
            message: "Success",
            code: 200,
        }) });
    callback(null, response);
};
exports.createUser = createUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0ZBQTBEO0FBRTFELGdEQUF1QjtBQUV2QixpREFBOEM7QUFDOUMsc0VBQTRDO0FBQzVDLGlEQUE4QztBQUc5QyxNQUFNLE1BQU0sR0FBRyxnQ0FBb0IsQ0FBQyxZQUFZLENBQUMsYUFBRyxDQUFDLENBQUE7QUFDckQsZ0RBQTRDO0FBRTVDLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQTtBQUszQixPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFLENBQUMsZ0NBQW9CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFFM0YsTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxPQUFZLEVBQUUsUUFBYSxFQUFFLEVBQUU7SUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ2xDLDhCQUE4QjtJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNoQyxNQUFNLFFBQVEsR0FBRztRQUNiLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ0wsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLG9DQUFvQztTQUMzRTtRQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLElBQUksRUFBRSxHQUFHO1lBQ1QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxhQUFhO2dCQUNuQixHQUFHLEVBQUUsRUFBRTthQUNWO1lBQ0QsSUFBSSxFQUFFLFlBQVk7U0FDckIsQ0FBQztLQUNMLENBQUM7SUFDRixRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQXJCWSxRQUFBLGFBQWEsaUJBcUJ6QjtBQUVNLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLFFBQWEsRUFBRSxFQUFFO0lBQ3hFLE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3ZCLElBQUksUUFBUSxHQUFhO1FBQ3JCLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ0wsNkJBQTZCLEVBQUUsR0FBRztTQUNyQztRQUNELElBQUksRUFBRSxFQUFFO0tBQ1gsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ25DLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBQ25FLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQTtJQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQTtJQUM3QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksa0JBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQzVELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDUCxRQUFRLG1DQUNELFFBQVEsS0FDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsTUFBTSxFQUFFLHFCQUFxQjthQUNoQyxDQUFDLEdBQ0wsQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUNsQztJQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxrQkFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDOUQsSUFBSSxLQUFLLEVBQUU7UUFDUCxRQUFRLG1DQUNELFFBQVEsS0FDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsTUFBTSxFQUFFLG9CQUFvQjthQUMvQixDQUFDLEdBQ0wsQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUNsQztJQUVELE1BQU0sT0FBTyxHQUFHLElBQUkscUJBQVUsQ0FBQztRQUMzQixLQUFLO1FBQ0wsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsUUFBUTtRQUNSLFlBQVk7S0FDZixDQUFDLENBQUE7SUFFRixNQUFNLFNBQVMsR0FBUztRQUNwQixLQUFLO1FBQ0wsUUFBUTtRQUNSLFNBQVM7UUFDVCxRQUFRO1FBQ1IsWUFBWTtRQUNaLFFBQVEsRUFBRTtZQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEI7S0FDSixDQUFBO0lBRUQsSUFBSTtRQUNBLE1BQU0sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ3RCLE1BQU0sSUFBSSxrQkFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQ3ZDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixRQUFRLG1DQUNELFFBQVEsS0FDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsY0FBYztnQkFDdkIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsTUFBTSxFQUFFLEdBQUc7YUFDZCxDQUFDLEdBQ0wsQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtLQUNsQztJQUVELFFBQVEsbUNBQ0QsUUFBUSxLQUNYLFVBQVUsRUFBRSxHQUFHLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDakIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsSUFBSSxFQUFFLEdBQUc7U0FDWixDQUFDLEdBQ0wsQ0FBQztJQUNGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBdEZZLFFBQUEsVUFBVSxjQXNGdEIifQ==