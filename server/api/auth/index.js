import express from "express";
import {UserModel} from "../../database/user";
import { TokenModel } from "../../database/token";
import sendEmail from '../../mail/index'
const Router = express.Router();

Router.post('/signup', async (req,res) => {
    try{
        await UserModel.findByEmailAndPhone(req.body.credentials)
        const user = await UserModel.create(req.body.credentials)
        const token = user.generateJwtToken()
        return res.status(200).json({ token, status: "success"})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
})

Router.post("/signin", async (req,res) => {
    try{
        
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken()

        return res.status(200).json({token, status:"success"});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
});

Router.post("/forgetpassword", async (req,res) => {
    try{
        
        const {email} = req.body.credentials
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(404).json({error :"user with this email not found"})
        }

        // const token = user.generateJwtToken()
        let token = await TokenModel.findOne({ userId: user._id });
        if (!token) {
            token = await TokenModel.create({
                
                userId: user._id,
                token: user.generateJwtToken(),
            })
            // token = await new TokenModel({
            //     userId: user._id,
            //     token: crypto.randomBytes(32).toString("hex"),
            // }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        return res.status(200).json({token, status:"success"});
    } catch(error) {
        return res.status(500).json({error: error.message})
    }
});

Router.post("/:userId/:token", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired..");
        const {password} = req.body.credentials;

        user.password = password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

export default Router;