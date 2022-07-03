"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const connect_1 = require("../database/connect");
const userImp_1 = require("../implement/userImp");
const organizationImp_1 = require("../implement/organizationImp");
const users_until_1 = __importDefault(require("../utils/users.until"));
const routes = express.Router({
    mergeParams: true
});
const mongoDB = new connect_1.MongoDB;
const constants_1 = __importDefault(require("../utils/constants"));
// app.use(cors())
// app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
routes.get('/info-actor', async (req, res) => {
    // const result = await new UserImpl().findByEmail('tinh.nguyen@pascal.studio')
    console.log('CONNECTING....');
    await mongoDB.connect();
    res.status(200).json({
        message: 'success',
        info: constants_1.default.info
    });
});
routes.post('/findByEmail', async (req, res) => {
    await mongoDB.connect();
    const { email } = req.body;
    const result = await new userImp_1.UserImpl().findByEmail(email);
    res.status(200).json({
        message: 'success',
        info: result
    });
});
async function login(event) {
    await mongoDB.connect();
    const user = new users_until_1.default(Object.assign({}, event.body));
    await user.login();
}
routes.post('/login', async (req, res) => {
    await mongoDB.connect();
    const user = new users_until_1.default(Object.assign({}, req.body));
    await user.login().catch(() => {
        return res.status(404).json({
            code: 501,
            message: 'user not found'
        });
    });
    if (user.idToken) {
        await user.getAttributesUser();
        const { userRole, phoneNumber } = await new userImp_1.UserImpl().findByEmail(user.email);
        user.userRole = userRole;
        //  ==> v1: invoke lambda
        // const orgDetail: any = await callService(
        //     {},
        //     constants.organizationService.GET_ORG_BYNAME,
        //     "RequestResponse",
        //     { orgName: user.organization }
        // )
        // user.organizationName = orgDetail.name || user.organization
        // ==> v2: invoke mongoose
        const result = await new organizationImp_1.OrganizationImp().find({ 'organization': user.organization ? user.organization : '' }).catch(err => console.error(err));
        user.organizationName = result ? result === null || result === void 0 ? void 0 : result.name : user.organization;
        // console.log(orgDetail)
        // console.log(user);
        return res.status(200).json({
            code: 200,
            message: 'success',
            user
        });
    }
});
routes.post('/signup', async (req, res) => {
    await mongoDB.connect();
});
app.use('/', routes);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixpREFBNkM7QUFDN0Msa0RBQStDO0FBQy9DLGtFQUErRDtBQUMvRCx1RUFBNkM7QUFHN0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMxQixXQUFXLEVBQUUsSUFBSTtDQUNwQixDQUFDLENBQUE7QUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUE7QUFFM0IsbUVBQTBDO0FBRzFDLGtCQUFrQjtBQUNsQiw4QkFBOEI7QUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFFBQVEsRUFBRSxJQUFJO0NBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUl4QixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ25ELCtFQUErRTtJQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDN0IsTUFBTSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsSUFBSSxFQUFFLG1CQUFTLENBQUMsSUFBSTtLQUN2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