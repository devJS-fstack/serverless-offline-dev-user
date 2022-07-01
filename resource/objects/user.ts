
import { Base } from './base'

export interface User extends Base {
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    isActive?: boolean;
    isDeleted?: boolean;
    userRole?: {
        roleName?: string;
        role?: string;
    };
}