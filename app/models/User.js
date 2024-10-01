import {model, models, Schema} from 'mongoose'

const userSchema = new Schema({
    email:{type: String, required:true, unique:true},
    password: String,
    image: String,
    name: String,
    googleId: String , 
    isAdmin: {type: Boolean, default: false}
}, {timeStamp: true})

const User = models.User || model('User', userSchema );

export default User;

