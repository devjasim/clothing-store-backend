import express from "express";
import { getProducts, getProductById } from "../controllers/product.controller.js";
import userAuth from "../middleware/user.auth.js";
const router = express.Router();

router.get('/get-products', getProducts);
router.get('/get-product/:id', getProductById);

export default router;