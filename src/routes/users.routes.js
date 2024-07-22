import { Router } from "express";
import { createUser, uploadUsers } from "../controllers/users.controller.js";
import multer from "multer";

// Configuración de multer para almacenar archivos cargados en la carpeta "uploads"
const upload = multer({ dest: 'uploads/' });

const router = Router()

router.post('/api/users', createUser)
router.post('/api/users/upload', upload.single('file'),  uploadUsers)

export default router