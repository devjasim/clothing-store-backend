import express from "express";
import { getUser, googleLogin, resendOtp, signin, signup, updateUser, verifyEmail } from "../controllers/user.controller.js";
import userAuth from "../middleware/user.auth.js";
const router = express.Router();

/**
 * @openapi
 * /user/signin:
 *   post:
 *     tags:
 *        - User APIs
 *     summary: Sing in user
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
 *                       example: jasimfbd@gmail.com
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
 *                       example: waht@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
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
 *                   
*/

router.post("/signin", signin);

/**
 * @openapi
 * /user/signup:
 *   post:
 *     tags:
 *        - User APIs
 *     summary: Register and create user account
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
 *                       example: Leanne Graham
 *                     email:
 *                       type: string
 *                       description: email
 *                       example: example@gmail.com
 *                     password:
 *                       type: string
 *                       description: password
 *                       example: asdfaq2414324
 *                     confirmPassword:
 *                       type: string
 *                       description: confirm password
 *                       example: asdfaq2414324
 *     responses:
 *       200:
 *         description: User information
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
 *                       example: waht@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                     _id:
 *                       type: string
 *                       description: uesr id.
 *                       example: asdfaq2414324
 *                     isVerified:
 *                       type: boolean
 *                       description: user email verification.
 *                       example: false
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
router.post("/signup", signup);

/**
 * @openapi
 * /user/google-login:
 *   post:
 *     tags:
 *        - User APIs
 *     summary: Login with google account
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     tokenId:
 *                       type: string
 *                       description: pass gogole token ID
 *                       example: "qrqwtqwtqwrwqrqwrqwtqwrqrqwrqeqwe"
 *     responses:
 *       200:
 *         description: User information
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
 *                       example: waht@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
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
 *                   
*/
router.post("/google-login", googleLogin);

/**
 * @openapi
 * /user/get-user:
 *   get:
 *     tags:
 *        - User APIs
 *     summary: Get user data
 *     responses:
 *       200:
 *         description: User information
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
 *                       example: waht@gmail.com
 *                     password:
 *                       type: string
 *                       description: The user's password.
 *                       example: asdfaq2414324
 *                     _id:
 *                       type: string
 *                       description: uesr id.
 *                       example: asdfaq2414324
 *                     isVerified:
 *                       type: boolean
 *                       description: user email verification.
 *                       example: false
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
router.get("/get-user", userAuth, getUser);

/**
 * @openapi
 * /user/update:
 *   patch:
 *     tags:
 *        - User APIs
 *     summary: Update user
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
router.patch("/update", userAuth, updateUser);

/**
 * @openapi
 * /user/verify-user:
 *   post:
 *     tags:
 *        - User APIs
 *     summary: Verfify user email
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     email:
 *                       type: string
 *                       description: pass user email
 *                       example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: User information
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
 *                       example: false
 *                     otp:
 *                       type: string
 *                       description: user hashed otp
 *                       example: 234234243524wf
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
router.post("/verify-user", verifyEmail)

/**
 * @openapi
 * /user/resend-otp:
 *   post:
 *     tags:
 *        - User APIs
 *     summary: Resend OTP to user email
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     email:
 *                       type: string
 *                       description: pass user email
 *                       example: "example@gmail.com"
 *     responses:
 *       200:
 *         description: User information
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
 *                       example: false
 *                     otp:
 *                       type: string
 *                       description: user hashed otp
 *                       example: false
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
router.post("/resend-otp", resendOtp);

export default router;