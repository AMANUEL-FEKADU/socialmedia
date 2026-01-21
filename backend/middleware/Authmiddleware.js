const jwt=require('jsonwebtoken')
const Httperror=require("../model/errmodel")

const authmiddleware = async(req,res,next)=>{
        const authorization= req.headers.authorization

        if(authorization && authorization.startsWith("Bearer ")){
            const token=authorization.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET,(err,info)=>{
                if(err){
                    return next(new Httperror("unauthorized. Invalid token",401))
                }
                req.user=info
                next()
            })
        } else{
            return next(new Httperror("unauthorized. No token"),401)
        }
}

module.exports=authmiddleware