const userModel = require('../models/user-model');

class PublicSevice{
   async getAllUserAdvertise(){
       return await userModel.find({},{advertises : 1,publicUrl : 1,email : 1,phoneNo : 1 ,familyName : 1 ,profileImg : 1});
   }
   async sortAdvertise(mainData){
        let sortTemp=[];
        mainData.forEach((data)=>{
        data.advertises.forEach((advertise)=>{
            sortTemp.push({realDate:advertise.realDate,email:data.email});
              })
        })
        sortTemp.sort((a, b) => {
            return a.realDate - b.realDate;
        });
        sortTemp=sortTemp.reverse();
        let sortedData=[];
        sortTemp.forEach((element)=>{
            mainData.forEach((data)=>{
                if(data.email === element.email){
                    data.advertises.forEach((advertise)=>{
                        if(advertise.realDate === element.realDate){                       
                           sortedData.push(
                                {
                                    email:data.email,
                                    familyName:data.familyName,
                                    profileImg:data.profileImg,
                                    phoneNo:data.phoneNo,
                                    publicUrl:data.publicUrl,
                                    advertiseImg:advertise.img,
                                    discription:advertise.discription,
                                    date:advertise.date
                                }
                            );
                        }
                    })
                }
            })
        })
        return sortedData;
    }
   async getAllMembers(){
       const allMembers = await userModel.find({},{ proffession : 1, houseNo : 1 , familyName : 1 , publicUrl : 1 ,profileImg : 1,_id : 0})
       const sortMember = allMembers.sort((a,b)=> a.houseNo - b.houseNo);
       return sortMember;
   }
   //for member profile visit public
   async getProfile(publicUrl){
        return await userModel.findOne({publicUrl},
        {_id : 0 ,
         activated : 0 ,
         createdAt :0 , 
         updatedAt : 0 , 
         publicUrl :0 ,
         password:0,
         imgFolder:0,
         __v:0
        });
   }
}
module.exports = new PublicSevice();