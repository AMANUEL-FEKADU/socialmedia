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

        res.json({token,id: user?._id}).status(200)
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const gettuser=async(req,res,next)=>{
    try {
        const {id}=req.params
        const user=await UserModel.findById(id)

        if(!user){
            return next(new Httperror("user not found"),404)
        }
        res.json(user).status(200)
    } catch (error) {
        return next(new Httperror(error))
        
    }
}
const gettusers=async(req,res,next)=>{
    try {
        const users=await UserModel.find().limit(5).sort({createdAt:-1})
        if(!users){
            return next(new Httperror("no users found"),422)
        }
        res.send(users).status(200)
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const edituser=async(req,res,next)=>{
    try {
        const{fullName,bio}=req.body
        const edituser=await UserModel.findByIdAndUpdate(req.user.id,{fullName,bio},{new: true})
        res.status(200).json(edituser)
        

    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const followuser=async(req,res,next)=>{
    try {
       const usertofollow=req.params.id
       if(req.user.id==usertofollow){
            return next(new Httperror("you cant follow/unfollow your self",422))
       }
       const currentuser=await UserModel.findById(req.user.id)
       const isFollowing=currentuser?.following?.includes(usertofollow)
       
       if(!isFollowing){
        const updated=await UserModel.findByIdAndUpdate(usertofollow,{$push:{followers:req.user.id} }, {new: true})
        await UserModel.findByIdAndUpdate(req.user.id,{$push:{following: usertofollow} },{new: true})
        res.status(200).json({message:"you are following \n" +updated})
       } else{
         const updated=await UserModel.findByIdAndUpdate(usertofollow,{$pull:{followers:req.user.id} }, {new: true})
        await UserModel.findByIdAndUpdate(req.user.id,{$pull:{following: usertofollow} },{new: true})
        res.status(200).json({message:"you are unfollowing \n" +updated})

       }
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const changeppuser=async(req,res,next)=>{
    try {
        
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

module.exports={changeppuser,edituser,loginuser,registeruser,followuser,gettuser,gettusers}