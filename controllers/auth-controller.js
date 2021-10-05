const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const otpService = require('../services/otp-service');
const imgService = require('../services/img-service');
const UserDto = require('../dtos/user-dto');
const adminModel = require('../models/admin-model');
class AuthController{
    //login
    async login(req,res){
      try{
         const isAdmin = req.isAdmin;
        //  for admin
         if(isAdmin){
         const adminData = await  adminModel.findOne({});
         const {accessToken } = await tokenService.generateTokens({ _id: adminData._id});
                res.cookie('accessToken', accessToken, {
                   maxAge: 1000 * 60 * 60 * 24 * 30,
                   httpOnly: true,
                });
                adminData.tokens.push(accessToken);
               await adminData.save();
        return res.json({isAdmin:true,path:'/'});
        }else{
         //for user
          const {email,password}=req.body.data;
          const user = await userService.findUser({email});
          const hashPassword = await hashService.hashData(password);
          if(user && user.password === hashPassword){
            const { refreshToken, accessToken } = await tokenService.generateTokens({_id: user._id});
            await tokenService.updateRefreshToken(user._id, refreshToken);
            res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            });
            res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            });
           return res.json({auth:true,activate:user.activated,path:'/profile'});
          }
           return res.json({message:'email or password are wrong !',next:false})
        }
        }catch(err){
            console.log(err);
            return res.json({message:'email or password are wrong !',next:false})
        }
     }
     //logout
      async logout(req,res){
       try{
        const { refreshToken}=req.cookies;
        const user= await tokenService.verifyRefreshToken(refreshToken);
        await tokenService.removeToken(user._id,refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.json({user:null,auth:false,activate:false})
       }catch(err){
          console.log('logout err',err);
          return res.json({message:'something went wrong can not logout!'})
       }
     
   }
   //forgot password
    async verifyUser(req,res){
        const {email}=req.body;
        const user = await userService.findUser({email});
        if(!user){
           return res.json({message:'Your are not Registerd !',next:false});
        }
        else{
        const otp = await otpService.sendOtpByGmail(email);
        const ttl = 1000 * 60 * 5; // 2 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = hashService.hashData(data);
        return  res.json({
              hash:`${hash}.${expires}`,
                email,
                next:true,
         })
        }
    }
    async changePassword(req,res){
       const {email,otp,hash,newPassword}=req.body.data;
        const [hashedOtp, expires] = hash.split('.');
         if (Date.now() > +expires) {
          return  res.json({ message: 'OTP expired!' ,next:false});
        }
        else{
          
        const data = `${email}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
           return res.json({ message: 'Invalid OTP',next:false });
        }
        else{
          const user = await userService.findUser({email});
          const hashNewPassword = await hashService.hashData(newPassword);
          user.password=hashNewPassword;
          user.save();
          return res.json({message:'updated',next:true})
        }
    }
    }
    //on refesh send data
    async refresh(req,res){
      try{
        const {refreshToken : refreshTokenFromCookie} = req.cookies;
        const {accessToken}=req.cookies;

        //for guest user
        if(!accessToken)  return res.json({user:null,auth:false,activate:false,isAdmin:false});
          
        //verifying Token
        const accessData = await tokenService.verifyAccessToken(accessToken);
        
        //for user
        if(refreshTokenFromCookie){
        const refreshData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        const token = await tokenService.findRefreshToken(refreshTokenFromCookie);
        const user = await userService.findUser({_id:refreshData._id});
        if(token && user){
          const userDto = new UserDto(user);
          return res.json({user:userDto,auth:true,activate:user.activated,isAdmin:false});
        }
      }
        //for admin
        const adminData = await adminModel.findById(accessData._id);
        if(adminData){
          const tokenValid = adminData.tokens.find((token)=>token === accessToken);
          if(tokenValid){
            return res.json({isAdmin:true,adminData:{name:adminData.name,img:adminData.img}})
          }
        }
         res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
         return res.json({user:null,auth:false,activate:false,isAdmin:false})
      }catch(err){
          console.log(err);
          return res.json({user:null,auth:false,activate:false,isAdmin:false})
        }
    }
    //update user
    async updateUser(req,res){
        const newData = req.body.data;
        const userId = req.user._id;
        if(newData.profileImg){
          const {oldImgPath,imgFolder} = await userService.getUserImg({_id:userId});
          const newImgPath = await imgService.storeImg(newData.profileImg,imgFolder);
          if(newImgPath.next === false){
              return res.json({newImgPath});
          } 
          //deleting current img
          await imgService.deleteImg(oldImgPath);
          //store new image to database
          newData.profileImg=newImgPath;
        } 
        try{
          const user = await userService.findByIdAndUpdate(userId,newData);
          if(user){
            return res.json({next:true});
          }
          return res.json({message:'something went wrong !',next:false})
        }catch(err){
            return res.json({message:'something went wrong !',next:false})
        }
    }
    //userOperations
    async userOperations(req,res){
      try{
        if(!req.user && !req.admin) return res.status(401).json({message:'not authenticate'});
        const userId = req.user ? req.user._id : null;
        const admin = req.admin;
        const {operationName,fieldName,dbData,email}=req.body.data;
        const filter = admin ? {email} : {_id:userId};
        const message = operationName === 'add' ? 'added' : 'deleted';
        let dbOperationName;
        if(!dbData) return res.json({message:'empty details'});
        if(operationName === 'add'){
          const {imgFolder} = await userService.getUserImg(filter);
          const imgPath = await imgService.storeImg(dbData.img,imgFolder);
          if(imgPath.next === false)  return res.json({imgPath});
          dbData.img=imgPath;
          if(fieldName === 'advertises') dbData.realDate = Date.now();
          dbOperationName="$push";
        }
        if(operationName === 'delete'){
          await imgService.deleteImg(dbData.img);
          dbOperationName="$pull";
        }
        const dbOperation = {[dbOperationName]:{[fieldName]:dbData}}
        const ress = await userService.userOperationService(filter,dbOperation);
        if(ress) return res.json({message,next:true});
        return res.json({message:'something went wrong !',next:false});
      }catch(err){
        console.log(err)
           return res.json({message:'something went wrong !',next:false});
      }
    }
    
}
module.exports = new AuthController();