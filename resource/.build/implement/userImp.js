"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImpl = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class UserImpl {
    async findByEmail(data) {
        const result = await user_model_1.default.findOne({ email: data });
        if (result)
            return new Promise(resolve => resolve(result));
        console.error(`No record found  ${result}`);
        return new Promise((reject) => reject(result));
    }
    async findOne(data) {
        return await user_model_1.default.findOne(data);
    }
    async findAll(data) {
        return await user_model_1.default.find(data);
    }
    async save(data) {
        const result = await new user_model_1.default(data).save();
        return new Promise((resolve, reject) => {
            if (result)
                resolve(result);
            else
                reject('INSERT TO DATABASE FAILED');
        });
    }
    async updateProfile(email, firstName, lastName) {
        const result = await user_model_1.default.updateOne({ email }, { firstName, lastName });
        return new Promise((resolve, reject) => {
            if (result)
                resolve(result);
            else
                reject('UPDATE PROFILE ERROR. PLEASE TRY AGAIN!');
        });
    }
    async update(condition, data) {
        console.log(condition);
        console.log(data);
        const result = await user_model_1.default.updateOne(condition, data);
        return new Promise((resolve, reject) => {
            if (result) {
                console.log(result);
                resolve(result);
            }
            else
                reject('UPDATE ERROR. PLEASE TRY AGAIN!');
        });
    }
}
exports.UserImpl = UserImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckltcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2ltcGxlbWVudC91c2VySW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHNFQUE0QztBQUc1QyxNQUFhLFFBQVE7SUFFakIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQzFCLE1BQU0sTUFBTSxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN2RCxJQUFJLE1BQU07WUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFTO1FBQ25CLE9BQU8sTUFBTSxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFTO1FBQ25CLE9BQU8sTUFBTSxvQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFVO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxvQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxNQUFNO2dCQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTs7Z0JBQ3RCLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1FBQzVDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7UUFDbEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDNUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE1BQU07Z0JBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBOztnQkFDdEIsTUFBTSxDQUFDLHlDQUF5QyxDQUFDLENBQUE7UUFDMUQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFjLEVBQUUsSUFBUztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxvQkFBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDekQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDbEI7O2dCQUNJLE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBQ2xELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBN0NELDRCQTZDQyJ9