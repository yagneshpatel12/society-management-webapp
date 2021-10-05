const adminModel = require('../models/admin-model');
const tokenService = require('../services/token-service')
module.exports = async function (req,res,next){
    
    try{
        const { accessToken }= req.cookies;
        if(!accessToken){
         return  next();
        }
        const data = await tokenService.verifyAccessToken(accessToken);
        if(!data){
         return  next();
        }
        //checking is admin or user
        const id = data._id;
        const adminData = await adminModel.findById(id);
        if(adminData){
            const tokenValid = adminData.tokens.find((token)=>token===accessToken);
            if(tokenValid) req.admin = true;
        }else{
            req.user=data;
        }
        next();
    }catch(err){
        console.log(err)
res.status(401).json({ message: 'Invalid token' });
    }
}