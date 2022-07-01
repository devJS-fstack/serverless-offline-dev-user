const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
import { MongoDB } from '../database/connect'
import { UserImpl } from '../implement/userImp'
import User_Utils from '../utils/users.until'


const routes = express.Router({
    mergeParams: true
})

const mongoDB = new MongoDB

import constants from '../utils/constants'
import callService from '../utils/callservice';

// app.use(cors())
// app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

routes.get('/info-actor', async (req: any, res: any) => {
    await mongoDB.connect();
    const result = await new UserImpl().findByEmail('tinh.nguyen@pascal.studio')
    console.log(result)
    res.status(200).json({
        message: 'success',
        info: constants.info
    })
})

routes.post('/findByEmail', async (req: any, res: any) => {
    await mongoDB.connect();
    const { email } = req.body
    const result = await new UserImpl().findByEmail(email)
    res.status(200).json({
        message: 'success',
        info: result
    })
})

routes.post('/login', async (req: any, res: any) => {
    await mongoDB.connect();
    const user = new User_Utils({ ...req.body })
    await user.login().catch(() => {
        return res.status(404).json({
            code: 501,
            message: 'user not found'
        })
    })
    if (user.idToken) {
        await user.getAttributesUser()
        const { userRole, phoneNumber } = await new UserImpl().findByEmail(user.email!)
        user.userRole = userRole
        const orgDetail: any = await callService(
            {},
            constants.organizationService.GET_ORG_BYNAME,
            "RequestResponse",
            { orgName: user.organization }
        )
        user.organizationName = orgDetail.name || user.organization
        // console.log(orgDetail)
        // console.log(user);
        return res.status(200).json({
            code: 200,
            message: 'success',
            user
        })
    }
})



app.use('/', routes)


export default app;