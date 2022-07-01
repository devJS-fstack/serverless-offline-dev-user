import mongoose from 'mongoose'
import moment from 'moment'

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    idToken: String,
    accessToken: String,
    refreshToken: String,
    organization: String,
    phoneNumber: String,
    ctd: { type: Date, default: moment().utc().toDate() },
    mtd: Date,
    ddt: Date,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    userRole: {
        roleName: String,
        role: String
    }
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
