import express from "express";
import { signin, signup, getUsers, deleteUser, updateUser, getUserById, dashboard } from "../controllers/admin.controllers.js";
import adminAuth from "../middleware/admin.auth.js";
const router = express.Router();

/**
 * @openapi
 * /admin/signin:
 *   post:
 *     summary: Sing in as admin
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     email:
 *                       type: string
 *                       description: email
 *                       example: c@gmail.com
 *                     password:
 *                       type: string
 *                       description: password
 *                       example: password
 *     responses:
 *       201:
 *         description: Pass requried information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     userName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: c@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                     _id:
 *                       type: string
 *                       description: uesr id.
 *                       example: asdfaq2414324
 *                     avatar:
 *                       type: string
 *                       description: User profile pictures
 *                       example: ""
 *                     isVerified:
 *                       type: boolean
 *                       description: user email verification.
 *                       example: true
 *                     createdAt:
 *                       type: date time
 *                       description: created date
 *                       example: 2022-05-17T22:00:24.332+00:00
 *                     updatedAt:
 *                       type: date time
 *                       description: updated date
 *                       example: 2022-05-17T22:00:24.332+00:00
 *                   
*/

router.post("/signin", signin);

router.post("/signup", signup);

/**
 * @openapi
 * /admin/get-users:
 *   get:
 *     responses:
 *       201:
 *         description: Get register users data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                     userName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: The user's email.
 *                       example: c@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                     _id:
 *                       type: string
 *                       description: uesr id.
 *                       example: asdfaq2414324
 *                     avatar:
 *                       type: string
 *                       description: User profile pictures
 *                       example: ""
 *                     isVerified:
 *                       type: boolean
 *                       description: user email verification.
 *                       example: true
 *                     createdAt:
 *                       type: date time
 *                       description: created date
 *                       example: 2022-05-17T22:00:24.332+00:00
 *                     updatedAt:
 *                       type: date time
 *                       description: updated date
 *                       example: 2022-05-17T22:00:24.332+00:00
 *                   
*/

// GET ALL REGISTER USER LISTS
router.get('/get-users', adminAuth, getUsers);

// Delete POST
router.delete('/delete-user/:id', adminAuth, deleteUser);

// Update user
router.patch('/update-user/:id', adminAuth, updateUser);

// Get USER BY ID
router.get('/get-user/:id', adminAuth, getUserById);

// DASHBOARD
router.get('/dashboard', adminAuth, dashboard);

export default router;