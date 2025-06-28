import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minLength:6},
    profilePic:{type:String,default:''},
    bio:{type:String,maxLength:200,default:''},
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  friendRequest:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
  }
},{
    timestamps:true
})

const User = mongoose.model('User',UserSchema);

export default User;