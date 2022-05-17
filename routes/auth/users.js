import express from "express";
import { signin, signup } from "../../controllers/auth/user.js";

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
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     firstName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     lastName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     email:
 *                   
*/

router.post("/signin", signin);

/**
 * @openapi
 * /user/signup:
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
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     firstName:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 *                     lastName:
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
 *                     confirmPassword:
 *                       type: string
 *                       description: The user's name.
 *                       example: asdfaq2414324
 *                   
*/

router.post("/signup", signup);

export default router;