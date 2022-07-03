import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    roleName: String,
    role: String
});

const RoleModel = mongoose.model('role', RoleSchema);

export default RoleModel;
