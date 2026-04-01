import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    day:{
        type:String,
        required:true
    },
    date:{
        type:String,
        requires:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    isBooked:
    {type:Boolean,
        default:false
    }
},{timestamps:true})

export default mongoose.model("Slot",slotSchema)