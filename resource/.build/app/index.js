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
const users_until_1 = __importDefault(require("../utils/users.until"));
const routes = express.Router({
    mergeParams: true
});
const mongoDB = new connect_1.MongoDB;
const constants_1 = __importDefault(require("../utils/constants"));
const callservice_1 = __importDefault(require("../utils/callservice"));
// app.use(cors())
// app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
routes.get('/info-actor', async (req, res) => {
    await mongoDB.connect();
    const result = await new userImp_1.UserImpl().findByEmail('tinh.nguyen@pascal.studio');
    console.log(result);
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
        const orgDetail = await (0, callservice_1.default)({}, constants_1.default.organizationService.GET_ORG_BYNAME, "RequestResponse", { orgName: user.organization });
        user.organizationName = orgDetail.name || user.organization;
        // console.log(orgDetail)
        // console.log(user);
        return res.status(200).json({
            code: 200,
            message: 'success',
            user
        });
    }
});
app.use('/', routes);
exports.default = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixpREFBNkM7QUFDN0Msa0RBQStDO0FBQy9DLHVFQUE2QztBQUc3QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzFCLFdBQVcsRUFBRSxJQUFJO0NBQ3BCLENBQUMsQ0FBQTtBQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQTtBQUUzQixtRUFBMEM7QUFDMUMsdUVBQStDO0FBRS9DLGtCQUFrQjtBQUNsQiw4QkFBOEI7QUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ3ZCLFFBQVEsRUFBRSxJQUFJO0NBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQ25ELE1BQU0sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxrQkFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUE7SUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNuQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqQixPQUFPLEVBQUUsU0FBUztRQUNsQixJQUFJLEVBQUUsbUJBQVMsQ0FBQyxJQUFJO0tBQ3ZCLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUNyRCxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtJQUMxQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksa0JBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqQixPQUFPLEVBQUUsU0FBUztRQUNsQixJQUFJLEVBQUUsTUFBTTtLQUNmLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQVEsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUMvQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLHFCQUFVLG1CQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUcsQ0FBQTtJQUM1QyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQzFCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ2QsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUM5QixNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sSUFBSSxrQkFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFNLENBQUMsQ0FBQTtRQUMvRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtRQUN4QixNQUFNLFNBQVMsR0FBUSxNQUFNLElBQUEscUJBQVcsRUFDcEMsRUFBRSxFQUNGLG1CQUFTLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUM1QyxpQkFBaUIsRUFDakIsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUNqQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQTtRQUMzRCx5QkFBeUI7UUFDekIscUJBQXFCO1FBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsU0FBUztZQUNsQixJQUFJO1NBQ1AsQ0FBQyxDQUFBO0tBQ0w7QUFDTCxDQUFDLENBQUMsQ0FBQTtBQUlGLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBR3BCLGtCQUFlLEdBQUcsQ0FBQyJ9