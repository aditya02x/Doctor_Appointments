import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    fees:{
        type:Number,
        require:true
    },
    profilePic:{
        type:String,
        default:''
    },
    isApproved:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('Doctor',doctorSchema)