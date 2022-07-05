export default (event: any, context: any) => {
    const claims = event.requestContext.authorizer.claims ? event.requestContext.authorizer.claims : undefined;
    if (claims) {
        event.currentUser = {
            username: claims['cognito:username'] ? claims['cognito:username'] : claims.username,
            firstName: claims['custom:firstName'],
            lastName: claims['custom:lastName'],
            organization: claims['custom:organizationId'],
            email: claims.username ? claims.username : claims['cognito:username'],
        }
        console.log("Current User: ", event.currentUser)
        console.log('Prepare success...')
        return true;
    }
    console.log('Prepare failed...')
    return false;
}