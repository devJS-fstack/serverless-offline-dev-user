"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const getData_1 = require("./getData");
const lambda = new AWS.Lambda();
exports.default = (body, funcName, invocationType = "Event", queryStringParameters = {}) => new Promise((resolve, reject) => {
    const params = {
        FunctionName: funcName,
        InvocationType: invocationType,
        LogType: "Tail",
        Payload: JSON.stringify({ body, queryStringParameters }),
    };
    lambda.invoke(params, function (err, data) {
        if (err) {
            console.log(err);
            reject(err);
        }
        else {
            resolve((0, getData_1.getData)(data));
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbHNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9jYWxsc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQix1Q0FBb0M7QUFFcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsa0JBQWUsQ0FBQyxJQUFTLEVBQUUsUUFBYSxFQUFFLGNBQWMsR0FBRyxPQUFPLEVBQUUscUJBQXFCLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FDOUYsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDNUIsTUFBTSxNQUFNLEdBQUc7UUFDWCxZQUFZLEVBQUUsUUFBUTtRQUN0QixjQUFjLEVBQUUsY0FBYztRQUM5QixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLENBQUM7S0FDM0QsQ0FBQztJQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsR0FBUSxFQUFFLElBQVM7UUFDL0MsSUFBSSxHQUFHLEVBQUU7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLENBQUMsSUFBQSxpQkFBTyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=