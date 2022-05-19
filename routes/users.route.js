import express from "express";
import { googleLogin, signin, signup, updateUser } from "../controllers/user.controller.js";
import userAuth from "../middleware/auth.middleware.js";
const router = express.Router();

/**
 * @openapi
 * /user/signin:
 *   post:
 *     summary: Create a JSONPlaceholder user.
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
 *       201:
 *         description: Pass requried information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     fuserName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
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
 *                       type: string
 *                       description: user email verification.
 *                       example: asdfaq2414324
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
 *     summary: Pass user information
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
 *       201:
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
 *                       type: string
 *                       description: user email verification.
 *                       example: asdfaq2414324
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
 *     summary: Pass google tokenId
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *               type: object
 *               properties:
 *                     tokenId:
 *                       type: string
 *                       description: userName
 *                       example: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxYTgyNTllYjA3NjYwZWYyMzc4MWM4NWI3ODQ5YmZhMGExYzgwNmMiLCJ0eXAiOiJKV1QifQ"
 *     responses:
 *       201:
 *         description: Created
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
 *                       type: string
 *                       description: user email verification.
 *                       example: asdfaq2414324
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
 * /user/update/:id:
 *   post:
 *     summary: Create a JSONPlaceholder user.
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
 *                       example: "Jasim Uddin"
 *     responses:
 *       201:
 *         description: Created
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
 *                       type: string
 *                       description: user email verification.
 *                       example: asdfaq2414324
 *                     createdAt:
 *                       type: date time
 *                       description: created date
 *                       example: 2022-05-17T22:00:24.332+00:00
 *                     updatedAt:
 *                       type: date time
 *                       description: updated date
 *                       example: 2022-05-17T22:00:24.332+00:00
*/

router.patch("/update/:id", userAuth, updateUser);

export default router;