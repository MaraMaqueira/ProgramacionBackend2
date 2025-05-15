import UserModel from '../models/user.model.js';

export default class UserRepository {
    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }
    async findById(id) {
        return await UserModel.findById(id);
    }
    async create(data) {
        return await UserModel.create(data);
    }
    async updatePassword(id, newPassword) {
        return await UserModel.findByIdAndUpdate(id, { password: newPassword });
    }
}