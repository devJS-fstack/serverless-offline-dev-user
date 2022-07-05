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
        this.phoneNumber = data.phoneNumber;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudW50aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy91c2Vycy51bnRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQjtBQUUxQixNQUFNLDhCQUE4QixHQUFHLElBQUksaUJBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ILE1BQU0sVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWtCLEVBQUUsQ0FBQztBQUNoRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FBQztBQXNCN0MsTUFBTSxVQUFVO0lBcUJaLFlBQVksSUFBVTtRQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxD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