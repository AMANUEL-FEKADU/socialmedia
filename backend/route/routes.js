const{changeppuser,edituser,loginuser,registeruser,followuser,gettuser,gettusers}=require('../controller/usercontroller')
const router=require('express').Router()
const protect=require("../middleware/Authmiddleware")

router.post('/users/register',registeruser)
router.post('/users/login',loginuser)
router.get('/users/getuser/:id',gettuser)
router.get('/users',gettusers)
router.patch('/users/:id',protect,edituser)
router.get('/users/:id/follow-unfollow',protect,followuser)
router.post('/users/changepp',changeppuser)

module.exports=router