"use strict";
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
    bucketImageProfile: process.env.BUCKET || 'console-skyview-dev',
    imageURL: `https://${process.env.BUCKET}.s3.amazonaws.com`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXRpbHMvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDWCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsYUFBYTtRQUNuQixHQUFHLEVBQUUsRUFBRTtRQUNQLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakIsY0FBYyxFQUFFLHNCQUFzQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssNEJBQTRCO0tBQ3RGO0lBQ0Qsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUkscUJBQXFCO0lBQy9ELFFBQVEsRUFBRSxXQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxtQkFBbUI7Q0FDN0QsQ0FBQSJ9