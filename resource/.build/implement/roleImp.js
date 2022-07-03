"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleImpl = void 0;
const role_model_1 = __importDefault(require("../models/role.model"));
class RoleImpl {
    async find(data) {
        return await role_model_1.default.findOne(data);
    }
}
exports.RoleImpl = RoleImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZUltcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2ltcGxlbWVudC9yb2xlSW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNFQUE0QztBQUc1QyxNQUFhLFFBQVE7SUFFakIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFTO1FBQ2hCLE9BQU8sTUFBTSxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBQ0o7QUFMRCw0QkFLQyJ9