import AWS from "aws-sdk";
import { SignUpRequest } from "aws-sdk/clients/cognitoidentityserviceprovider";
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ region: `${process.env.REGION}` });
const AuthClient = { ClientId: process.env.COGNITO_CLIENT_ID! };
const userPoolId = process.env.USER_POOL_ID!;

interface User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    userId?: string;
    organization?: string;
    organizationName?: string;
    phoneNumber?: string;
    userRole?: {
        roleName?: string;
        role?: string;
    };
}

class User_Utils implements User {
    id?: string;
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    organization?: string;
    phoneNumber?: string;
    userRole?: {
        roleName?: string;
        role?: string;
    };
    cdt?: number;
    mdt?: number;
    ddt?: number;
    organizationName?: string;

    constructor(data: User) {
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
        const params = {
            ...AuthClient,
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
                PASSWORD: this.password,
                USERNAME: this.username
            }
        };
        return await new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.initiateAuth(params as any, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('Is Logging....')
                    const result = data.AuthenticationResult;
                    this.idToken = result?.IdToken;
                    this.accessToken = result?.AccessToken;
                    this.refreshToken = result?.RefreshToken;
                    delete this.password
                    resolve(this);
                }
            })
        })
    }

    async create() {
        const UserAttributes = [
            {
                Name: 'email',
                Value: this.email
            },
            {
                Name: 'custom:firstName',
                Value: this.firstName ?? ''
            },
            {
                Name: 'custom:lastName',
                Value: this.lastName ?? ''
            },
            {
                Name: 'custom:organizationId',
                Value: this.organization
            }
        ]

        const params = {
            ...AuthClient,
            Password: this.password,
            Username: this.username,
            UserAttributes
        }


        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.signUp(params as SignUpRequest, (err, data) => {
                if (err) reject(`Sign Up Failed! ${err}`)
                else {
                    console.log(`SIGN UP SUCCESS: ${data.UserSub}`)
                    resolve(data.UserSub)
                }
            })
        })
    }

    async getAttributesUser() {
        console.log('Get Attributes...')
        const params = {
            AccessToken: this.accessToken!
        };

        return await new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.getUser(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
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
                    })
                    resolve(this);
                }
            });
        });
    }

    async refreshTheToken() {
        const params = {
            ...AuthClient,
            AuthFlow: 'REFRESH_TOKEN',
            AuthParameters: {
                REFRESH_TOKEN: this.refreshToken!
            }
        }
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.initiateAuth(params, (err, data) => {
                if (err) reject(err)
                else {
                    // console.log('THIS IS DATA: ', data.AuthenticationResult)
                    this.idToken = data.AuthenticationResult?.IdToken;
                    this.accessToken = data.AuthenticationResult?.AccessToken
                    resolve(data)
                }
            })
        })
    }

    async forgotPassword() {
        const params = {
            ...AuthClient,
            Username: this.username!.toLowerCase(),
        }

        cognitoidentityserviceprovider.updateUserAttributes
        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.forgotPassword(params, (err, data) => {
                if (err) reject(err)
                else {
                    console.log('Initial forgot password flow...')
                    resolve(data)
                }
            })
        })
    }

    async resetPassword(code: string, passwordNew: string) {
        const params = {
            ...AuthClient,
            ConfirmationCode: code,
            Password: passwordNew,
            Username: this.username!.toLowerCase()
        }

        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.confirmForgotPassword(params, (err, data) => {
                if (err) reject(err)
                else {
                    console.log('Initial confirm reset password flow...')
                    resolve(data)
                }
            })
        })
    }

    async changePassword(passwordOld: string, passwordNew: string, accessToken: string) {
        const params = {
            AccessToken: accessToken,
            PreviousPassword: passwordOld,
            ProposedPassword: passwordNew
        }

        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.changePassword(params, (err, data) => {
                if (err) reject(err)
                else {
                    resolve(data)
                }
            })
        })
    }

    async updateProfile(accessToken: string) {
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
        }

        return new Promise((resolve, reject) => {
            cognitoidentityserviceprovider.updateUserAttributes(params, (err, data) => {
                if (err) reject(err)
                else {
                    console.log('Initial update profile flow...')
                    resolve(data)
                }
            })
        })
    }
}

export default User_Utils