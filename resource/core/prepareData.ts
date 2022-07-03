export default (event: any, context: any) => {
    const claims = event.requestContext.authorizer.claims ? event.requestContext.authorizer.claims : undefined;
    if (claims) {
        event.currentUser = {
            username: claims['cognito:username'],
            firstName: claims['custom:firstName'],
            lastName: claims['custom:lastName'],
            email: claims.email ? claims.email : claims['cognito:username'],
        }
        console.log('Prepare success...')
    } else {
        console.log('Prepare failed...')
    }
}