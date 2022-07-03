const mongoose = require('mongoose')


const OrganizationSchema = new mongoose.Schema({
    organization: String,
    name: String,
    isActive: Boolean,
    createdBy: String,
    enterprise: String,
    aswBucketFolder: String
}, {
    timestamp: true
})

const OrganizationModel = mongoose.model('organizations', OrganizationSchema);

export default OrganizationModel;