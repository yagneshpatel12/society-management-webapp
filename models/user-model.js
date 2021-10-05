const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new  Schema(
    {
        profileImg:{type:String,required: false},
        familyName : {type:String,required: false},
        email:{type:String,required: false},
        phoneNo : {type:String,required: false},
        houseNo:{type:String,required: false},
        totalMembers: {type:String,required: false},
        proffession : {type:String,required: false},
        proffessionDiscription : {type:String,required: false},
        password:{type:String,required: false},
        members:{  "type": ["Mixed"],required:false},
        advertises:{  "type": ["Mixed"],required:false},
        imgFolder:{type:String,required:false},
        activated: { type: Boolean, required: false, default: false },
        publicUrl:{type:String,required:false}
    },
    {
        timestamps:true,
    }
);
module.exports =  mongoose.model('User',userSchema,'users');
