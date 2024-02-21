import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
export type UserT={
    _id:string,
    email:string,
    password:string,
    fName:string,
    lName:string
};

const userSchema= new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    fName: { type: String, required: true},
    lName: { type: String, required: true}
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password'))
        this.password= await bcrypt.hash(this.password,8)
    next()
})
const User=mongoose.model<UserT>('user',userSchema)

export default User