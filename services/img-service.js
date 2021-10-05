const {cloudinary}=require('../utils/cloudinary');
require('dotenv').config();

class ImgService {
    async storeImg(imgStr,folderPath) {
       try{
          const uploadedResponse = await cloudinary.uploader.upload(imgStr,{folder:folderPath,quality:30});
         return uploadedResponse.secure_url;
       }catch(err){
         console.log(err)
         return {next:false,message:'image not uploaded !'}
       }
    }
    async removeFolder(imgFolder){
      try{
        await cloudinary.api.delete_resources_by_prefix(imgFolder);
        await cloudinary.api.delete_folder(imgFolder);

      }catch(err){
        console.log(err);
      }
     
    }
    async deleteImg(imgPath,number=-3){
      const imgPublicId = imgPath.split('/').slice(number).join('/').split('.')[0]
      const res = await cloudinary.uploader.destroy(imgPublicId);
    }
}

module.exports = new ImgService();
