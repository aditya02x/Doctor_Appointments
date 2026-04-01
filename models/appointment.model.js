import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    slotId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Slot',
        required:true
    },
    status:{
        type:String,
        enum:['pendind','completed','cancelled'],
        required:true
    },
   paymentStatus:   {
     type: String,
     enum: ['unpaid', 'paid'],
      default: 'unpaid'
     },
     paymentId:
      {
         type: String,
          default: ''
         },
          amount:
          { type: Number,
             required: true
             },
             appointmentDate:
             { type: Date, 
                required: true 
            },

})

export default mongoose.model("Appointment",appointmentSchema)