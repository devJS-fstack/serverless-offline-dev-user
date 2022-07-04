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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBK0M7QUFDL0MsdUVBQTZDO0FBQzdDLGtEQUErQztBQUcvQyw2REFBNEQ7QUFDNUQsaURBQTZDO0FBRTdDLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQTtBQUUzQixrQkFBZTtJQUNYLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxRQUFhLEVBQUUsRUFBRTtRQUMxRCxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2QixJQUFJLFFBQVEsR0FBYTtZQUNyQixVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDTCw2QkFBNkIsRUFBRSxHQUFHO2FBQ3JDO1lBQ0QsSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDbkUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxnQ0FBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQTtRQUMxRyxJQUFJLEtBQUssRUFBRTtZQUNQLFFBQVEsbUNBQ0QsUUFBUSxLQUNYLFVBQVUsRUFBRSxHQUFHLEVBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ2pCLE9BQU8sRUFBRSxhQUFhO29CQUN0QixJQUFJLEVBQUUsR0FBRztvQkFDVCxNQUFNLEVBQUUsS0FBSyxDQUFD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