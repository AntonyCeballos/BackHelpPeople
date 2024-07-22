import express from 'express'
import config from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import userRoutes from "./routes/users.routes.js";
import cors from "cors"

const app = express()

//setings
app.set('port', config.port)
//Usamos Cors para permitir las peticiones
app.use(cors());
//Módulos Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))



//Routes de los productos
app.use(productsRoutes)
//Routes de las categorias
app.use(categoriesRoutes)
//Routes de los usuarios
app.use(userRoutes)

export default app