"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (event, context) => {
    const claims = event.requestContext.authorizer.claims ? event.requestContext.authorizer.claims : undefined;
    if (claims) {
        event.currentUser = {
            username: claims['cognito:username'] ? claims['cognito:username'] : claims.username,
            firstName: claims['custom:firstName'],
            lastName: claims['custom:lastName'],
            organization: claims['custom:organizationId'],
            email: claims.username ? claims.username : claims['cognito:username'],
        };
        console.log("Current User: ", event.currentUser);
        console.log('Prepare success...');
        return true;
    }
    console.log('Prepare failed...');
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb3JlL3ByZXBhcmVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxLQUFVLEVBQUUsT0FBWSxFQUFFLEVBQUU7SUFDeEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMzRyxJQUFJLE1BQU0sRUFBRTtRQUNSLEtBQUssQ0FBQyxXQUFXLEdBQUc7WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDbkYsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ25DLFlBQVksRUFBRSxNQUFNLENBQUMsdUJBQXVCLENBQUM7WUFDN0MsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztTQUN4RSxDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDaEMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFBIn0=