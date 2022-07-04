"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const cognitoidentityserviceprovider = new aws_sdk_1.default.CognitoIdentityServiceProvider({ region: `${process.env.REGION}` });
const AuthClient = { ClientId: process.env.COGNITO_CLIENT_ID };
const userPoolId = process.env.USER_POOL_ID;
class User_Utils {
    constructor(data) {
        this.id = data.id ? data.id : '';
        this.email = data.email ? data.email : '';
        this.username = data.username ? data.username.toLowerCase() : data.email;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.organization = data.organization;
        this.idToken = data.idToken;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.organizationName = data.organizationName;
    }
    async login() {
        const params = Object.assign(Object.assign({}, AuthClient), { AuthFlow: 'USER_PASSWORD_AUTH', AuthParameters: {
                PASSWORD: this.password,
                USERNAME: this.username
            } });
        return await new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.initiateAuth(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('Is Logging....');
                    const result = data.AuthenticationResult;
                    this.idToken = result === null || result === void 0 ? void 0 : result.IdToken;
                    this.accessToken = result === null || result === void 0 ? void 0 : result.AccessToken;
                    this.refreshToken = result === null || result === void 0 ? void 0 : result.RefreshToken;
                    delete this.password;
                    resolve(this);
                }
            });
        });
    }
    async create() {
        var _a, _b;
        const UserAttributes = [
            {
                Name: 'email',
                Value: this.email
            },
            {
                Name: 'custom:firstName',
                Value: (_a = this.firstName) !== null && _a !== void 0 ? _a : ''
            },
            {
                Name: 'custom:lastName',
                Value: (_b = this.lastName) !== null && _b !== void 0 ? _b : ''
            },
            {
                Name: 'custom:organizationId',
                Value: this.organization
            }
        ];
        const params = Object.assign(Object.assign({}, AuthClient), { Password: this.password, Username: this.username, UserAttributes });
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.signUp(params, (err, data) => {
                if (err)
                    reject(`Sign Up Failed! ${err}`);
                else {
                    console.log(`SIGN UP SUCCESS: ${data.UserSub}`);
                    resolve(data.UserSub);
                }
            });
        });
    }
    async getAttributesUser() {
        console.log('Get Attributes...');
        const params = {
            AccessToken: this.accessToken
        };
        return await new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.getUser(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    data.UserAttributes.forEach(a => {
                        switch (a.Name) {
                            case 'custom:organizationId':
                                this.organization = a.Value;
                                break;
                            case 'custom:firstName':
                                this.firstName = a.Value;
                                break;
                            case 'custom:lastName':
                                this.lastName = a.Value;
                                break;
                        }
                    });
                    resolve(this);
                }
            });
        });
    }
    async refreshTheToken() {
        const params = Object.assign(Object.assign({}, AuthClient), { AuthFlow: 'REFRESH_TOKEN', AuthParameters: {
                REFRESH_TOKEN: this.refreshToken
            } });
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.initiateAuth(params, (err, data) => {
                var _a, _b;
                if (err)
                    reject(err);
                else {
                    // console.log('THIS IS DATA: ', data.AuthenticationResult)
                    this.idToken = (_a = data.AuthenticationResult) === null || _a === void 0 ? void 0 : _a.IdToken;
                    this.accessToken = (_b = data.AuthenticationResult) === null || _b === void 0 ? void 0 : _b.AccessToken;
                    resolve(data);
                }
            });
        });
    }
    async forgotPassword() {
        const params = Object.assign(Object.assign({}, AuthClient), { Username: this.username.toLowerCase() });
        cognitoidentityserviceprovider.updateUserAttributes;
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.forgotPassword(params, (err, data) => {
                if (err)
                    reject(err);
                else {
                    console.log('Initial forgot password flow...');
                    resolve(data);
                }
            });
        });
    }
    async resetPassword(code, passwordNew) {
        const params = Object.assign(Object.assign({}, AuthClient), { ConfirmationCode: code, Password: passwordNew, Username: this.username.toLowerCase() });
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.confirmForgotPassword(params, (err, data) => {
                if (err)
                    reject(err);
                else {
                    console.log('Initial confirm reset password flow...');
                    resolve(data);
                }
            });
        });
    }
    async changePassword(passwordOld, passwordNew, accessToken) {
        const params = {
            AccessToken: accessToken,
            PreviousPassword: passwordOld,
            ProposedPassword: passwordNew
        };
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.changePassword(params, (err, data) => {
                if (err)
                    reject(err);
                else {
                    resolve(data);
                }
            });
        });
    }
    async updateProfile(accessToken) {
        const params = {
            AccessToken: accessToken,
            UserAttributes: [
                {
                    Name: 'custom:firstName',
                    Value: this.firstName
                },
                {
                    Name: 'custom:lastName',
                    Value: this.lastName
                }
            ]
        };
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.updateUserAttributes(params, (err, data) => {
                if (err)
                    reject(err);
                else {
                    console.log('Initial update profile flow...');
                    resolve(data);
                }
            });
        });
    }
}
exports.default = User_Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudW50aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91c2Vycy51bnRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQjtBQUUxQixNQUFNLDhCQUE4QixHQUFHLElBQUksaUJBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ILE1BQU0sVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWtCLEVBQUUsQ0FBQztBQUNoRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FBQztBQXFCN0MsTUFBTSxVQUFVO0lBb0JaLFlBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxD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