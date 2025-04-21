import mongoose from "mongoose" 
const userSchema = new mongoose.Schema({ 
        name:{type:String,required:true},  
        email: { type: String, required: true, unique: true },  
        password: { type: String,required:true}, 
        phoneNum: {type:String} 
    });  
const userModel =mongoose.models.user|| new mongoose.model('User', userSchema);  
export default userModel;