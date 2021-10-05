const adminModel = require('../models/admin-model');
const hashService = require('../services/hash-service');

module.exports = async function (req,res,next){
    try{
        const {email,password}=req.body.data;
        const adminData = await adminModel.findOne({email});
        if(adminData){
            const hashPassword = hashService.hashData(password);
            if(adminData.password === hashPassword){
                req.isAdmin=true;
                next();
            }else{
                req.isAdmin=false;
                next();
           }
        }else{
            req.isAdmin = false;
            next();
        }
    }catch(err){
        console.log(err)
    }
}