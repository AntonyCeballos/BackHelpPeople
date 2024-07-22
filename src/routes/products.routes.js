import { Router } from "express";
import { createNewPorduct, deleteProductsById, getProducts, getProductsById, updateProductById } from "../controllers/products.controllers.js";

const router = Router()

router.get('/api/products', getProducts)
router.post('/api/products', createNewPorduct)
router.get('/api/products/:id', getProductsById)
router.delete('/api/products/:id', deleteProductsById)
router.put('/api/products/:id', updateProductById)

export default router