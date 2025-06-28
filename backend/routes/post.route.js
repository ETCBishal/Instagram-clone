import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import {createPost, fetchPost} from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create-post',protectRoute,createPost)
router.get('/fetch-post',protectRoute,fetchPost)

export default router

