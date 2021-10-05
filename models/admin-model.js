require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new  Schema(
    {
        name:{type:String,required:false},
        email:{type:String,required:false},
        img:{type:String,required:false},
        tokens: { type: Array, required: true  },
        events:{  "type": ["Mixed"],required:false},
        management:{  "type": ["Mixed"],required:false},
        complaines:{  "type": ["Mixed"],required:false},
        contacts:{  "type": ["Mixed"],required:false},
        password:{type:String,required:false},
        societyCode:{type:String,required:false},
        adminCode:{type:String,required:false}
    },
    {
        timestamps:true,
    }
);
module.exports =  mongoose.model('Admin',adminSchema,'admin');
