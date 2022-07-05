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
const user_service_1 = require("../services/user.service");
const constants_1 = __importDefault(require("../utils/constants"));
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
            const path = `${user.organization}/profile`;
            try {
                const imageFromS3 = await (0, user_service_1.uploadImage)(constants_1.default.bucketImageProfile, path, photo, _id);
                console.log('Image from S3', imageFromS3);
                if (imageFromS3) {
                    response.body = JSON.stringify({
                        code: 200,
                        messgae: 'success',
                        link: imageFromS3.path
                    });
                    callback(null, response);
                }
            }
            catch (err) {
                response.statusCode = 400;
                response.body = JSON.stringify({
                    code: 400,
                    messgae: 'success',
                    errors: err
                });
                callback(null, response);
            }
        }
        callback(null, response);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlci91c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBK0M7QUFDL0MsdUVBQTZDO0FBQzdDLGtEQUErQztBQUcvQyw2REFBNEQ7QUFDNUQsaURBQTZDO0FBQzdDLDhFQUFvRDtBQUNwRCxzRUFBNkM7QUFDN0MsMkRBQXNEO0FBQ3RELG1FQUEwQztBQUUxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUE7QUFFM0Isa0JBQWU7SUFDWCxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQVUsRUFBRSxPQUFZLEVBQUUsUUFBYSxFQUFFLEVBQUU7UUFDMUQsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkIsSUFBSSxRQUFRLEdBQWE7WUFDckIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ0wsNkJBQTZCLEVBQUUsR0FBRzthQUNyQztZQUNELElBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25DLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ25FLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsZ0NBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7UUFDMUcsSUFBSSxLQUFLLEVBQUU7WUFDUCxRQUFRLG1DQUNELFFBQVEsS0FDWCxVQUFVLEVBQUUsR0FBRyxFQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNqQixPQUFPLEVBQUUs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