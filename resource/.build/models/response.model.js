"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseModel {
    constructor(statusCode, header = { "Access-Control-Allow-Origin": "*" }, body = '') {
        this.statusCode = statusCode;
        this.headers = header || { "Access-Control-Allow-Origin": "*" };
        this.body = body;
    }
}
exports.default = ResponseModel;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9tb2RlbHMvcmVzcG9uc2UubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxNQUFxQixhQUFhO0lBSTlCLFlBQVksVUFBa0IsRUFBRSxTQUFjLEVBQUUsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBWSxFQUFFO1FBQ2hHLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLEVBQUUsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztDQUNKO0FBVEQsZ0NBU0M7QUFBQSxDQUFDIn0=