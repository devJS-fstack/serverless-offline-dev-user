"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const UserSchema = new mongoose_1.default.Schema({
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
    profilePicture: String,
    ctd: { type: Date, default: (0, moment_1.default)().utc().toDate() },
    mtd: Date,
    ddt: Date,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    userRole: {
        roleName: String,
        role: String
    }
});
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy91c2VyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQStCO0FBQy9CLG9EQUEyQjtBQUUzQixNQUFNLFVBQVUsR0FBRyxJQUFJLGtCQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25DLEtBQUssRUFBRSxNQUFNO0lBQ2IsUUFBUSxFQUFFLE1BQU07SUFDaEIsUUFBUSxFQUFFLE1BQU07SUFDaEIsU0FBUyxFQUFFLE1BQU07SUFDakIsUUFBUSxFQUFFLE1BQU07SUFDaEIsT0FBTyxFQUFFLE1BQU07SUFDZixXQUFXLEVBQUUsTUFBTTtJQUNuQixZQUFZLEVBQUUsTUFBTTtJQUNwQixZQUFZLEVBQUUsTUFBTTtJQUNwQixXQUFXLEVBQUUsTUFBTTtJQUNuQixjQUFjLEVBQUUsTUFBTTtJQUN0QixHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUNyRCxHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUM1QyxRQUFRLEVBQUU7UUFDTixRQUFRLEVBQUUsTUFBTTtRQUNoQixJQUFJLEVBQUUsTUFBTTtLQUNmO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxTQUFTLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRXJELGtCQUFlLFNBQVMsQ0FBQyJ9