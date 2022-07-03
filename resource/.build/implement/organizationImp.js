"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationImp = void 0;
const organization_model_1 = __importDefault(require("../models/organization.model"));
class OrganizationImp {
    async find(data) {
        const result = await organization_model_1.default.findOne(data);
        if (result)
            return new Promise(resolve => resolve(result));
        return new Promise(reject => reject('No Organization can incorrect'));
    }
}
exports.OrganizationImp = OrganizationImp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uSW1wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vaW1wbGVtZW50L29yZ2FuaXphdGlvbkltcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxzRkFBNEQ7QUFFNUQsTUFBYSxlQUFlO0lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBUztRQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLDRCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNwRCxJQUFJLE1BQU07WUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUE7SUFDekUsQ0FBQztDQUNKO0FBTkQsMENBTUMifQ==