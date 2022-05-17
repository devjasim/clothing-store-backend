import express from 'express'
const router = express.Router()
import userRouter from './auth/users.js';

router.use(userRouter)

export default router