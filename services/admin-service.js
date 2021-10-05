const adminModel = require('../models/admin-model');

class AdminService{
   async arrayOperation(filter,operation){
       return await adminModel.findOneAndUpdate(
             filter,operation
        );
    }
}
module.exports = new AdminService();