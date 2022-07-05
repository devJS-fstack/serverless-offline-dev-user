export default {
    info: {
        name: 'Tinh Nguyen',
        age: 18,
        address: 'HCM'
    },
    organizationService: {
        GET_ORG_BYNAME: `console-onboarding-${process.env.STAGE}-organizationDetailsByName`,
    },
    bucketImageProfile: process.env.BUCKET ?? 'console-skyview-dev',
    imageURL: `https://${process.env.BUCKET}.s3.amazonaws.com`
}