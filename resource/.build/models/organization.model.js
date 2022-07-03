"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const OrganizationSchema = new mongoose.Schema({
    organization: String,
    name: String,
    isActive: Boolean,
    createdBy: String,
    enterprise: String,
    aswBucketFolder: String
}, {
    timestamp: true
});
const OrganizationModel = mongoose.model('organizations', OrganizationSchema);
exports.default = OrganizationModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbW9kZWxzL29yZ2FuaXphdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUdwQyxNQUFNLGtCQUFrQixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxZQUFZLEVBQUUsTUFBTTtJQUNwQixJQUFJLEVBQUUsTUFBTTtJQUNaLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGVBQWUsRUFBRSxNQUFNO0NBQzFCLEVBQUU7SUFDQyxTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDLENBQUE7QUFFRixNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFFOUUsa0JBQWUsaUJBQWlCLENBQUMifQ==