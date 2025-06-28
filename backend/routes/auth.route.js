import express from 'express'
import {signup,login,logout,checkAuth, updateProfilePic, updateProfileInfo} from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',protectRoute,logout)
router.get('/check',protectRoute,checkAuth)
router.put('/change-profile-pic',protectRoute,updateProfilePic)
router.put('/update-profile-info',protectRoute,updateProfileInfo)

export default router