import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller.js";
import adminAuth from "../middleware/admin.auth.js";
const router = express.Router();

router.post('/create-product', adminAuth, createProduct);
router.get('/get-products', adminAuth, getProducts);
router.get('/get-product', adminAuth, getProductById);
router.patch('/update-product', adminAuth, updateProduct);
router.delete('/delete-product', adminAuth, deleteProduct);

export default router;