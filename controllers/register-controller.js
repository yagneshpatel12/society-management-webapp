const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require("../services/token-service");
const imageService = require('../services/img-service');
const crypto = require('crypto');
const adminModel = require('../models/admin-model');

class RegisterController{
     async sendOtp(req,res){
        const { email , societyCode , houseNo } = req.body.data;
        const codes = await adminModel.findOne({},{societyCode:1,_id:0});
        if(societyCode === codes.societyCode){
            if(houseNo > 250) return res.json({message:'enter valid houseno',next:false})
            const euser = await userService.findUser({email});
            const huser = await userService.findUser({houseNo});
            if(euser || huser){
                return res.json({message:'Already register',next:false});
            }
            else{
            const otp = await otpService.sendOtpByGmail(email);
        const ttl = 1000 * 60 * 1; // 3 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${houseNo}.${expires}`;
        const hash = await hashService.hashData(data);
        
        try{
          return  res.status(200).json({
                hash:`${hash}.${expires}`,
                email,
                houseNo,
                societyCode,
                next:true,
            });
        }catch(err){
            console.log(err);
         return   res.status(500).json({message:'Otp sending failed',next:false});
        }
    }
     }
        else{
           return res.json({message:'Invalid society Code',next:false});
        }
    } 

    async verifyOtp(req,res){
        const {otp,email,houseNo,hash}=req.body;

        const [hashedOtp, expires] = hash.split('.');
         if (Date.now() > +expires) {
          return  res.json({ message: 'OTP expired!' ,next:false});
        }
        else{
        const data = `${email}.${otp}.${houseNo}.${expires}`;
        const isValid = await otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
          return  res.json({ message: 'Invalid OTP',next:false });
        }
        else{
        let user;
        try{
            user = await userService.createUser({email,houseNo});
        }catch(err){
             console.log(err);
          return  res.json({ message: 'something went wrong!',next:false });
        }
        const {accessToken,refreshToken} = tokenService.generateTokens({
            _id:user._id,
            activated:false
        });

        await tokenService.storeRefershToken(refreshToken,user._id);
         res.cookie('refreshToken',refreshToken,{
             maxAge:1000*60*60*24*30,
             httpOnly:true,
         })
         res.cookie('accessToken',accessToken,{
             maxAge:1000*60*60*24*30,
             httpOnly:true,
         })
        return res.json({auth:true});
    }
}}
    async activate(req,res){
        const {userData,profileImg}=req.body;
        const folderPath = `users/${crypto.randomBytes(5).toString('hex')}`;
        const imgPath = await imageService.storeImg(profileImg,folderPath);
        if(imgPath.next === false){
             return res.json({imgPath});
        }
        else{
        const userId = req.user._id;
        userData.password = await hashService.hashData(userData.password);
        userData.profileImg=imgPath;
        userData.activated=true;
        userData.imgFolder=folderPath;
        userData.publicUrl=crypto.randomBytes(5).toString('hex');
        
       try{
        const user = await userService.findByIdAndUpdate(userId,userData);
          return res.json({auth:true,activate:true });
       }catch(err){
         console.log(err)
          return res.json({message:'something went wrong!',next:false})
       }
    }
}
}
module.exports = new RegisterController();