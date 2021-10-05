const adminModel = require('../models/admin-model');
const { sortAdvertise } = require('../services/public-service');
const publicSevice = require('../services/public-service');

class PublicController{
  async getAdvertise(req,res){
      const data = await publicSevice.getAllUserAdvertise({advertises : 1,publicUrl : 1,email : 1,phoneNo : 1 ,familyName : 1 ,profileImg : 1});
      const advertises = await publicSevice.sortAdvertise(data);
      return res.send(advertises);
  }
  async getMembers(req,res){
    const data = await publicSevice.getAllMembers();
    try{
      return res.json(data)
    }catch(err){
      console.log(err);
      return res.json({next:false})
  }
  }
  async getMemberProfile(req,res){
   const {publicUrl}=req.body;
   const memberProfile = await publicSevice.getProfile(publicUrl);
   if(!memberProfile) return res.json({next:false});
   return res.json(memberProfile)
  }
    async getHomePageData(req,res){
      try{
        let data = await adminModel.findOne({},{events:1,management:1,_id:0});
        const advertiseData = await publicSevice.getAllUserAdvertise();
        const sortAdvertise = await publicSevice.sortAdvertise(advertiseData);
        const homePageData = {events:data.events.reverse(),management:data.management,advertise:sortAdvertise}
        return res.json(homePageData);
      }catch(err){
        return res.status(500).json({message:'something went wrong !'})
      }
   }
}
module.exports = new PublicController();