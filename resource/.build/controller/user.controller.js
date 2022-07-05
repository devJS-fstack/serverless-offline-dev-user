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
        const { firstName, lastName, phoneNumber } = body;
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
                errors: err.message
            });
            callback(null, response);
        }
        const userImpl = new userImp_1.UserImpl();
        try {
            const data = await userImpl.updateProfile(email, firstName, lastName, phoneNumber);
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
            callback(null, response);
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
                    await new userImp_1.UserImpl().update({ email: user.email }, { profilePicture: imageFromS3.path });
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