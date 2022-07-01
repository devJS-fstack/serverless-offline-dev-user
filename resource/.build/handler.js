"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
const app_1 = __importDefault(require("./app"));
const server = aws_serverless_express_1.default.createServer(app_1.default);
exports.handler = (event, context) => aws_serverless_express_1.default.proxy(server, event, context);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRkFBMEQ7QUFFMUQsZ0RBQXVCO0FBRXZCLE1BQU0sTUFBTSxHQUFHLGdDQUFvQixDQUFDLFlBQVksQ0FBQyxhQUFHLENBQUMsQ0FBQTtBQUVyRCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFLENBQUMsZ0NBQW9CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUEifQ==