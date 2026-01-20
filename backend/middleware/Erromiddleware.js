// unsupported endpoints

const notFound=(req,res,next)=>{
    const error = new Error("not found "+req.originalUrl)
    res.status(404)
    next(error)
}

//errormiddleware

const errorHandle=(error,req,res,next)=>{
    if(res.headersSent){
        return next(error)
    }
    res.status(error.code ||500).json({message:error.message||"nknown error"})
}

module.exports={notFound,errorHandle}