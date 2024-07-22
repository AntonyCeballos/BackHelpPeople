import { Router } from "express";
import { getCategories, createNewCategory, getCategoryById, deleteCategoryById, updateCategoryById } from "../controllers/categories.controller.js";

const router = Router()

router.get('/api/categories', getCategories)
router.post('/api/categories', createNewCategory)
router.get('/api/categories/:id', getCategoryById)
router.delete('/api/categories/:id', deleteCategoryById)
router.put('/api/categories/:id', updateCategoryById)

export default router