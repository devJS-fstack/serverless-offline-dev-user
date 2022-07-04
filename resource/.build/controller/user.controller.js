"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userImp_1 = require("../implement/userImp");
const users_until_1 = __importDefault(require("../utils/users.until"));
const roleImp_1 = require("../implement/roleImp");
const user_validate_1 = require("../validate/user.validate");
const connect_1 = require("../database/connect");
const response_model_1 = __importDefault(require("../models/response.model"));
const mongoDB = new connect_1.MongoDB;
exports.default = {
    createUser: async (event, context, callback) => {
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
        const { error, value } = user_validate_1.schemaCreateUser.validate({ firstName, lastName, email, password, organization });
        if (error) {
            response = Object.assign(Object.assign({}, response), { statusCode: 401, body: JSON.stringify({
                    message: 'Bad request',
                    code: 401,
                    errors: error.details[0].message
                }) });
            return callback(null, response);
        }
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
    },
    refreshToken: async (event, context, callback) => {
        const body = JSON.parse(event.body);
        const { refreshToken } = body;
        const response = new response_model_1.default(200, null);
        const userUntil = new users_until_1.default({ refreshToken });
        try {
            await userUntil.refreshTheToken();
        }
        catch (err) {
            response.statusCode = err.statusCode;
            response.body = JSON.stringify({
                code: err.statusCode,
                message: err.code
            });
            return callback(null, response);
        }
        response.body = JSON.stringify({
            code: 200,
            message: 'success',
            info: {
                idToken: userUntil.idToken,
                accessToken: userUntil.accessToken
            }
        });
        callback(null, response);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBK0M7QUFDL0MsdUVBQTZDO0FBQzdDLGtEQUErQztBQUcvQyw2REFBNEQ7QUFDNUQsaURBQTZDO0FBQzdDLDhFQUFvRDtBQUVwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUE7QUFFM0Isa0JBQWU7SUFDWCxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQVUsRUFBRSxPQUFZLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDMUQsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsSUFBSSxRQUFRLEdBQWE7WUFDckIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ0wsNkJBQTZCLEVBQUUsR0FBRzthQUNyQztZQUNELElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25DLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ25FLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsZ0NBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7UUFDMUcsSUFBSSxLQUFLLEVBQUU7WUFDUCxRQUFRLG1DQUNELFFBQVEsS0FDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNqQixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsTUFBTSxF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