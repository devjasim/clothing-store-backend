import express from "express";
import { getProducts, getProductById } from "../controllers/product.controller.js";
import userAuth from "../middleware/user.auth.js";
const router = express.Router();

router.post('/get-products', userAuth, getProducts);
router.post('/get-product', userAuth, getProductById);

export default router;