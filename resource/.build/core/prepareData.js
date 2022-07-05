"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (event, context) => {
    const claims = event.requestContext.authorizer.claims ? event.requestContext.authorizer.claims : undefined;
    if (claims) {
        event.currentUser = {
            username: claims['cognito:username'],
            firstName: claims['custom:firstName'],
            lastName: claims['custom:lastName'],
            organization: claims['custom:organizationId'],
            email: claims.username ? claims.username : claims['cognito:username'],
        };
        console.log('Prepare success...');
        return true;
    }
    console.log('Prepare failed...');
    return false;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb3JlL3ByZXBhcmVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxLQUFVLEVBQUUsT0FBWSxFQUFFLEVBQUU7SUFDeEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMzRyxJQUFJLE1BQU0sRUFBRTtRQUNSLEtBQUssQ0FBQyxXQUFXLEdBQUc7WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQyxTQUFTLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1lBQ3JDLFFBQVEsRUFBRSxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDbkMsWUFBWSxFQUFFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztZQUM3QyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1NBQ3hFLENBQUE7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDakMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUNoQyxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUEifQ==