"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImpl = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class UserImpl {
    async findByEmail(data) {
        var result = await user_model_1.default.findOne({ email: data });
        if (result)
            return new Promise(resolve => resolve(result));
        console.error(`No record found  ${result}`);
        return new Promise((reject) => reject(result));
    }
    async login() {
    }
}
exports.UserImpl = UserImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckltcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2ltcGxlbWVudC91c2VySW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNFQUE0QztBQUc1QyxNQUFhLFFBQVE7SUFFakIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQzFCLElBQUksTUFBTSxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNyRCxJQUFJLE1BQU07WUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7SUFDWCxDQUFDO0NBQ0o7QUFYRCw0QkFXQyJ9