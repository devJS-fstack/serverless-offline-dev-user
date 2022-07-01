"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const getData = (data) => {
    const payload = JSON.parse(data.Payload);
    const body = JSON.parse(payload.body);
    if (payload.statusCode === 200 && body) {
        return body.data;
    }
    else {
        if (payload === null || payload === void 0 ? void 0 : payload.body) {
            throw typeof (payload === null || payload === void 0 ? void 0 : payload.body) === 'string' ? JSON.parse(payload === null || payload === void 0 ? void 0 : payload.body) : payload === null || payload === void 0 ? void 0 : payload.body;
        }
        throw { error: body === null || body === void 0 ? void 0 : body.error };
    }
};
exports.getData = getData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3V0aWxzL2dldERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUMxQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTtRQUNwQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDcEI7U0FBTTtRQUNILElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLElBQUksRUFBRTtZQUNmLE1BQU0sT0FBTyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLENBQUEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDO1NBQ3ZGO1FBQ0QsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxFQUFFLENBQUM7S0FDaEM7QUFDTCxDQUFDLENBQUM7QUFHRSwwQkFBTyJ9