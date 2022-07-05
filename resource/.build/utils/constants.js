"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    info: {
        name: 'Tinh Nguyen',
        age: 18,
        address: 'HCM'
    },
    organizationService: {
        GET_ORG_BYNAME: `console-onboarding-${process.env.STAGE}-organizationDetailsByName`,
    },
    bucketImageProfile: (_a = process.env.BUCKET) !== null && _a !== void 0 ? _a : 'console-skyview-dev',
    imageURL: `https://${process.env.BUCKET}.s3.amazonaws.com`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtCQUFlO0lBQ1gsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLGFBQWE7UUFDbkIsR0FBRyxFQUFFLEVBQUU7UUFDUCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELG1CQUFtQixFQUFFO1FBQ2pCLGNBQWMsRUFBRSxzQkFBc0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLDRCQUE0QjtLQUN0RjtJQUNELGtCQUFrQixFQUFFLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLG1DQUFJLHFCQUFxQjtJQUMvRCxRQUFRLEVBQUUsV0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sbUJBQW1CO0NBQzdELENBQUEifQ==