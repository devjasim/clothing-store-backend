import express from "express";
import { signin, signup, getUsers, deleteUser, updateUser, getUserById, dashboard, createUser } from "../controllers/admin.controllers.js";
import adminAuth from "../middleware/admin.auth.js";
const router = express.Router();

/**
 * @openapi
 * /admin/signin:
 *   post:
 *     tags:
 *        - Admin APIs
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
 *       200:
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
 *     tags:
 *       - Admin APIs
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

/**
 * @openapi
 * /admin/delete-user/{id}:
 *   delete:
 *     tags:
 *       - Admin APIs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delete user by ID
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

// Delete POST
router.delete('/delete-user/:id', adminAuth, deleteUser);

/**
 * @openapi
 * /admin/update-user/{id}:
 *   patch:
 *     tags:
 *       - Admin APIs
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     userName:
 *                       type: string
 *                       description: userName
 *                       example: "John Doe"
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     userName:
 *                       type: string
 *                       description: The user's name.
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       description: The user's name.
 *                       example: waht@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's name.
 *                       example: asdfaq2414324
 *                     _id:
 *                       type: string
 *                       description: uesr id.
 *                       example: asdfaq2414324
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
*/
// Update user
router.patch('/update-user/:id', adminAuth, updateUser);

/**
 * @openapi
 * /admin/get-user/{id}:
 *   get:
 *     tags:
 *       - Admin APIs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get single user
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

// Get USER BY ID
router.get('/get-user/:id', adminAuth, getUserById);

/**
 * @openapi
 * /admin/dashboard:
 *   get:
 *     tags:
 *       - Admin APIs
 *     responses:
 *       200:
 *         description: Get dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     lastMonth:
 *                        type: integer,
 *                        description: last month user,
 *                        example: 0,
 *                     lastWeek:
 *                        type: integer,
 *                        description: last week user,
 *                        example: 0,
 *                     lastThirtee:
 *                        type: integer,
 *                        description: last 30 days user,
 *                        example: 0,
 *                     total:
 *                        type: integer,
 *                        description: total user,
 *                        example: 0,
 *                   
*/

// DASHBOARD
router.get('/dashboard', adminAuth, dashboard);

/**
 * @openapi
 * /admin/create-user:
 *   post:
 *     tags:
 *       - Admin APIs
 *     summary: Creat new user
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
 *       200:
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
 *                     confirmPassword:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                     avatar:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                   
*/
// Create User
router.post('/create-user', adminAuth, createUser);

export default router;