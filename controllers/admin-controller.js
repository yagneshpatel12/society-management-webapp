const adminService = require('../services/admin-service');
const adminModel = require('../models/admin-model');
const otpService = require ('../services/otp-service');
const hashService = require('../services/hash-service');
const imgService = require('../services/img-service');
const userModel = require('../models/user-model');
const tokenService = require('../services/token-service');
const refreshModel = require('../models/refresh-model');

class AdminController{

    async verifyAdmin(req,res){
    try{
        const {name,email,adminCode} = req.body.data;
        
        // cheking admin already register or not
        const valid = await adminModel.find({});
        if(valid.length >= 1) return res.json({next:false,message:'Already have  admin !'});
        const emailAvailable = await userModel.findOne({email});
        if(emailAvailable) return res.json({next:false,message:'please use another email'});
        
        //genatin otp and sending
        const otp = await otpService.sendOtpByGmail(email);
        const ttl = 1000 * 60 * 2; // 2 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = await hashService.hashData(data);

        res.json({name,email,adminCode,hash:`${hash}.${expires}`});
     }catch(err){
         console.log(err)
        res.json({next:false,message:'something went wrong !'})
        }
    }

    async registerAdmin(req,res){
        try{
        const {name,email,otp,img,hash,password,adminCode}=req.body.data;
        // otp valid checking
        const [hashedOtp, expires] = hash.split('.');
        const data = `${email}.${otp}.${expires}`;
        const isValid = await otpService.verifyOtp(hashedOtp, data);
        if (!isValid) return  res.json({ message: 'Invalid OTP',next:false });
        
        //create admin
        const hashPassword = await hashService.hashData(password);
        const imgPath = await imgService.storeImg(img,'admin');
        const admin = await adminModel.create({
            name,
            email,
            adminCode,
            img:imgPath,
            password:hashPassword,
        })
        const {accessToken} = tokenService.generateTokens({
            _id:admin._id,
        });
        admin.tokens=[accessToken];
        admin.save();
        res.cookie('accessToken',accessToken,{
             maxAge:1000*60*60*24*30,
             httpOnly:true,
        })
        return res.json({isAdmin:true});
        }catch(err){
            console.log(err);
            return res.json({next:false,message:'something went wrong !'})
        }
  
    }
    async logoutAdmin(req,res){
        try{
            const { accessToken }=req.cookies;
            const acessData= await tokenService.verifyAccessToken(accessToken);
            const adminData = await adminModel.findByIdAndUpdate(acessData._id, { "$pull": { "tokens": accessToken } })
            res.clearCookie('accessToken');
            res.json({message:'succefully logout'})
        }catch(err){
              console.log(err);
              res.json({message:'can not logout something went wrong !'})
        }
    }
    async deleteUser(req,res){
        if(req.admin){
          const user = await userModel.findOneAndDelete({houseNo:req.body.houseNo});
          await imgService.removeFolder(user.imgFolder);
        //   user.pro
          await refreshModel.findOneAndDelete({userId:user._id});
          if(!user) return res.json({next:false,message:'something went wrong !'});
          return res.json({message:'deleted ...',next:true});
        }else{
            return res.json({next:false,message:'something went wrong !'})
        }
    }
    async adminDataOperation(req,res){
        try{
            const {operationName,fieldName} = req.body.data;
            let dbOperationName;
            let dbData;
            let filter;
            let dbOperation;
            const created="your message submitted ...";
            const deleted ="deleted..."; 
            const err = "please try again !";
             //create and deleting
            if(operationName === "create" || operationName === "delete"){
            //validation
                if(fieldName === "events" && fieldName==='management' && !req.admin) return res.json({message:err,next:false});
                if(operationName === "delete" && !req.admin) return res.json({message:err,next:false});
                if(fieldName === "complaines" && operationName==="create" && !req.user) return res.json({message:err,next:false})
                //databse querys
                dbOperationName= operationName === "create" ? "$push" : "$pull";
                const img = req.body.data.dbData.img;
                if(img && operationName==='create'){
                    const imgPath = await imgService.storeImg(img,'admin');
                   req.body.data.dbData.img=imgPath;
                }if(img && operationName === 'delete'){
                    await imgService.deleteImg(img,-2);
                }
                dbData=req.body.data.dbData;
                filter={};
                dbOperation={[dbOperationName]:{[fieldName]:dbData}};
                const dbRes = await adminService.arrayOperation(filter,dbOperation);
                if(dbRes){
                   return res.json({message: dbOperationName="$pull" ? deleted :created,next:true});
                }
                return res.json({message:err,next:false});
            }
            if(operationName === "get"){
                if(!req.admin) return res.json({message:err,next:false});
                const admin = await adminModel.findOne({}).select(fieldName);
                if(admin) return res.json(admin[fieldName]);
                return res.json({message:err,next:false})
            }
            return res.json({message:err,next:false})
        }catch(err){
            return res.json({message:err,next:false})
        }
        
    }
    async adminSetting(req,res){
        if(!req.admin) return res.status(401).json({message:'not authenticate'});
        if(req.body.edit){
            let newAdminData = req.body.data;
            newAdminData.img = await imgService.storeImg(newAdminData.img,'admin');
            const oldAdminData = await adminModel.findOne({});
            await imgService.deleteImg(oldAdminData.img,-2);
          const ress =  await adminModel.findOneAndUpdate({},newAdminData)
          if(ress) return res.json({message:'updated'});
          else res.json({message:'something went wrong !',next:false})
        }else{
            const Securitycodes = await adminModel.findOne({},{societyCode : 1 ,adminCode :1 ,img:1,name:1,_id:0});
            if(Securitycodes) return res.json(Securitycodes);
            return res.json({message:'something went wrong !',next:false})
        }
        return res.json({message:'something went wrong !',next:false})
    }
}
module.exports = new AdminController();