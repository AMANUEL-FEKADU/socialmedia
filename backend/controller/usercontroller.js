const Httperror=require('../model/errmodel')
const registeruser=async(req,res,json)=>{
    try {
        res.json('redistered')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const loginuser=async(req,res,json)=>{
    try {
        res.json('logged in')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const gettuser=async(req,res,json)=>{
    try {
        res.json('gotten')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}
const gettusers=async(req,res,json)=>{
    try {
        res.json('gottensers')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const edituser=async(req,res,json)=>{
    try {
        res.json('edited')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const followuser=async(req,res,json)=>{
    try {
        res.json('foolow/nfollow')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

const changeppuser=async(req,res,json)=>{
    try {
        res.json('ppchanged')
    } catch (error) {
        return next(new Httperror(error))
        
    }
}

module.exports={changeppuser,edituser,loginuser,registeruser,followuser,gettuser,gettusers}