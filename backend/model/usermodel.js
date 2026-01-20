const mongoose=require('mongoose')

const userSchema= new Schema({
    fullName:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true,
       
    },
     password:{
         type:String,
        required:true,

     },
     profilePic:{
         type:String,
         default:"https://res.cloudinary.com/dd8oqaw8u/image/upload/v1768859069/icons8-user_snaga6.gif"

     },
     bio:{
         type:String,
         default:"no bio yet"
     },
     followers:[ 
        {
            type:Schema.Types.ObjectId,ref:"User"
        }
    ],
    following:[ 
        {
            type:Schema.Types.ObjectId,ref:"User"
        }
    ],
    bookmark:[ 
        {
            type:Schema.Types.ObjectId,ref:"Post"
        }
    ],
    post:[ 
        {
            type:Schema.Types.ObjectId,ref:"Post"
        }
    ]

    

},{
    timestamp:true
})

module.exports=model("user",userSchema)