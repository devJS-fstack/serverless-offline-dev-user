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
const prepareData_1 = __importDefault(require("../core/prepareData"));
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
    },
    forgotPassword: async (event, context, callback) => {
        const body = JSON.parse(event.body);
        const { email } = body;
        const response = new response_model_1.default(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }));
        const user = new users_until_1.default({ username: email, email });
        try {
            const result = await user.forgotPassword();
        }
        catch (err) {
            response.statusCode = 401;
            response.body = JSON.stringify({
                code: 401,
                errors: err
            });
            return callback(null, response);
        }
        callback(null, response);
    },
    resetPassword: async (event, context, callback) => {
        const body = JSON.parse(event.body);
        const response = new response_model_1.default(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }));
        const { code, username, password, confirmPassword } = body;
        if (password !== confirmPassword) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                code: 400,
                message: 'Not incorrect two password'
            });
            callback(null, response);
        }
        const user = new users_until_1.default({ username });
        try {
            const result = await user.resetPassword(code, password);
        }
        catch (err) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                code: 400,
                errors: err
            });
            callback(null, response);
        }
        callback(null, response);
    },
    changePassword: async (event, context, callback) => {
        const body = JSON.parse(event.body);
        const { oldPassword, newPassword, accessToken } = body;
        const response = new response_model_1.default(200, null);
        const user = new users_until_1.default({});
        try {
            const result = await user.changePassword(oldPassword, newPassword, accessToken);
            if (result) {
                response.body = JSON.stringify({
                    code: 200,
                    message: 'success',
                    data: result
                });
            }
        }
        catch (err) {
            response.statusCode = 400,
                response.body = JSON.stringify({
                    code: 400,
                    errors: err.message
                });
        }
        callback(null, response);
    },
    updateProfile: async (event, context, callback) => {
        await mongoDB.connect();
        (0, prepareData_1.default)(event, context);
        const { Authorization } = event.headers;
        const { email } = event.currentUser;
        const body = JSON.parse(event.body);
        const { firstName, lastName } = body;
        const response = new response_model_1.default(200, null, JSON.stringify({
            code: 200,
            message: 'success'
        }));
        const user = new users_until_1.default({ firstName, lastName });
        try {
            const resolve = await user.updateProfile(Authorization);
        }
        catch (err) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                code: 400,
                errors: err
            });
        }
        const userImpl = new userImp_1.UserImpl();
        try {
            const data = await userImpl.updateProfile(email, firstName, lastName);
            const newUser = await userImpl.findByEmail(email);
            response.body = JSON.stringify({
                code: 200,
                message: 'success',
                user: newUser
            });
        }
        catch (err) {
            response.statusCode = 400;
            response.body = JSON.stringify({
                code: 400,
                errors: err
            });
        }
        callback(null, response);
    },
    getListUser: async (event, context, callback) => {
        await mongoDB.connect();
        const body = JSON.parse(event.body);
        (0, prepareData_1.default)(event, context);
        // console.log('Event: ', event)
        // console.log('Claims: ', event.requestContext.authorizer.claims)
        const response = new response_model_1.default(200, null, JSON.stringify({
            code: 200,
            message: 'success',
        }));
        if (!event.currentUser) {
            response.statusCode = 401;
            response.body = JSON.stringify({
                code: 401,
                message: 'Authorization incorrect'
            });
            callback(null, response);
        }
        const user = await new userImp_1.UserImpl().findOne({ 'email': event.currentUser.email });
        const { role, name } = user.userRole;
        let flag = {};
        if (role !== 'SUPER_ADMIN') {
            flag = { organization: event.currentUser.orga };
        }
        const listUsers = await new userImp_1.UserImpl().findAll({ organization: event.currentUser.organization });
        response.body = JSON.stringify({
            code: 200,
            message: 'success',
            data: listUsers.map((user) => {
                return {
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    organization: user.organization
                };
            }).sort((a, b) => { var _a; return (_a = a === null || a === void 0 ? void 0 : a.email) === null || _a === void 0 ? void 0 : _a.localeCompare(b === null || b === void 0 ? void 0 : b.email); })
        });
        callback(null, response);
    },
    updateProfilePicture: async (event, context, callback) => {
        await mongoDB.connect();
        const body = JSON.parse(event.body);
        const { data } = body;
        const response = new response_model_1.default(200, null, JSON.stringify({
            code: 200,
            message: 'success',
        }));
        if ((0, prepareData_1.default)(event, context)) {
            const user = event.currentUser;
            const photo = data ? data.toString('base64') : '';
            const { _id } = await new userImp_1.UserImpl().findOne({ 'username': user.username });
        }
        callback(null, response);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBK0M7QUFDL0MsdUVBQTZDO0FBQzdDLGtEQUErQztBQUcvQyw2REFBNEQ7QUFDNUQsaURBQTZDO0FBQzdDLDhFQUFvRDtBQUNwRCxzRUFBNkM7QUFFN0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFBO0FBRTNCLGtCQUFlO0lBQ1gsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFVLEVBQUUsT0FBWSxFQUFFLFFBQWEsRUFBRSxFQUFFO1FBQzFELE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3ZCLElBQUksUUFBUSxHQUFhO1lBQ3JCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QixFQUFFLEdBQUc7YUFDckM7WUFDRCxJQUFJLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNuRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLGdDQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO1FBQzFHLElBQUksS0FBSyxFQUFFO1lBQ1AsUUFBUSxtQ0FDRCxRQUFRLEtBQ1gsVUFBVSxFQUFFLEdBQUcsRUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDakIsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLElBQUksRUFBRSxHQUFH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