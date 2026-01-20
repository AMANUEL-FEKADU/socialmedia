const { model } = require("mongoose");

class HttpError extends Error{
    constructor(message,errorCode){
        superZZ(message);
        this.code=errorCode;
    }
}

model.exports=HttpError;