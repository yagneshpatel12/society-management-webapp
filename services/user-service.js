const userModel = require('../models/user-model');

class UserService{
    async createUser(data) {
        const user = await userModel.create(data);
        return user;
    }
     async findUser(filter) {
        const user = await userModel.findOne(filter);
        return user;
    }
    async findByIdAndUpdate(filter,data){
        const user = await userModel.updateOne({_id:filter},{ $set : data });
        return user;
    }
    async getUserImg(filter){
        const user = await userModel.findOne(filter)
        return {oldImgPath:user.profileImg,imgFolder:user.imgFolder};
    }
   async userOperationService(filter,operation){
       return await userModel.findOneAndUpdate(
             filter,operation
        );
    }
}

module.exports = new UserService();