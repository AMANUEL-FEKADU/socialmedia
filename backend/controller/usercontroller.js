const Httperror=require('../model/errmodel')
const UserModel=require('../model/usermodel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registeruser=async(req,res,next)=>{
    try {
        const {fullName,email,password,confirmPassword}=req.body;

        if(!fullName||!email||!password||!confirmPassword){
            return next(new Httperror("Fill all fields correctly",422))
        }

        const lowcase=email.toLowerCase();

        const emailexist=await UserModel.findOne({email: lowcase})

        if(emailexist){
            return next(new Httperror("Email already exists",422))
        }

        if(password!=confirmPassword){
            return next(new Httperror("password must match confirm password",422))
        }
        if(password.length<6){
            return next(new Httperror("password must be atleast 6 characters",422))
        }

        const salt=await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt);

        const newuser=await UserModel.create({fullName,email:lowcase,password: hashed})

        res.json(newuser).status(201);

    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const loginuser=async(req,res,next)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return next(new Httperror("fill all fields",422))
        }
       const lowc=email.toLowerCase()
        const user=await UserModel.findOne({email: lowc})
        
        if (!user) {
             return next(new Httperror("incorrect credentials", 422))
        }
        const comp=await bcrypt.compare(password,user.password)
        if(!comp){
            return next(new Httperror("incorrect credentials",422))
        }

        const token= await jwt.sign({id: user?._id},process.env.JWT_SECRET,{
            expiresIn:"30d"
        })

        res.json({token,id: user?._id,user}).status(200)
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const gettuser=async(req,res,next)=>{
    try {
        res.json('gotten')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}
const gettusers=async(req,res,next)=>{
    try {
        res.json('gottensers')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const edituser=async(req,res,next)=>{
    try {
        res.json('edited')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const followuser=async(req,res,next)=>{
    try {
        res.json('foolow/nfollow')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const changeppuser=async(req,res,next)=>{
    try {
        res.json('ppchanged')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

module.exports={changeppuser,edituser,loginuser,registeruser,followuser,gettuser,gettusers}