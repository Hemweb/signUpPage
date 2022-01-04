import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: Number,
    password: String
})

userSchema.methods.generateJwtToken = function() {
    return jwt.sign({ user: this._id.toString()}, "Sample");
};
userSchema.statics.findByEmailAndPhone = async ({email, phone}) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phone });
    
    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exists!");
    }
    return false;
};
userSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    // check email*/
    const user = await UserModel.findOne({email});
    if(!user) throw new Error("User does not exist!!!");

    // compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if(!doesPasswordMatch) throw new Error("invalid password");

    return user;

};
userSchema.pre("save", function (next){
    const user = this;

    //pass is modified
    if(!user.isModified("password")) return next();

    //generate bcrpt salt
    bcrypt.genSalt(8,(error, salt) => {
        if(error) return next(error);

        //hash the pass
        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);

            //assign hashed pass
            user.password = hash;
            return next();
        })
    })
})

export const UserModel = mongoose.model("users", userSchema);