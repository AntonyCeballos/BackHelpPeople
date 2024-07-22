//importamos la conexión
import { getConnection, sql } from "../database/connection.js";
import { queries } from "../database/querys.js";

export const getProducts = async (req, res) => {
  try {
    //Se llama la conexion que retorna un objeto pool
    const pool = await getConnection();
    //Una vez traído el pool le hacemos una petiión consulta que me trae los productos de la bd
    const result = await pool.request().query(queries.getAllProducts);
    console.log(result);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createNewPorduct = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;

    if (
      name == null ||
      description == null ||
      price == null ||
      category_id == null
    ) {
      return res
        .status(400)
        .json({ msg: "Bad Request: Por favor llena todos los campos" });
    }

    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description)
      .input("price", sql.Decimal(10, 2), price)
      .input("category_id", sql.Int, category_id)
      .query(queries.createNewProduct);

    res
      .status(201)
      .json({
        message: "Producto creado exitosamente",
        name,
        price,
        category_id,
      });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProductsById = async (req, res) => {
  const {id} = req.params;

  const pool = await getConnection()
  const result = await pool.request().input('id', id).query(queries.getProductId)

  console.log(result.recordset[0])
  res.send(id)
};

export const deleteProductsById = async (req, res) => {
  try {
    const {id} = req.params;

  const pool = await getConnection()
  const result = await pool.request().input('id', id).query(queries.deleteProduct)

  res.status(204).json({message: "El producto ha sido eliminado satisfactoriamente"})
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }  
};

export const updateProductById = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const {id} = req.params

    if (
      name == null ||
      description == null ||
      price == null ||
      category_id == null
    ) {
      return res
        .status(400)
        .json({ msg: "Bad Request: Por favor llena todos los campos" });
    }

    const pool = await getConnection();
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("description", sql.NVarChar, description)
      .input("price", sql.Decimal(10, 2), price)
      .input("category_id", sql.Int, category_id)
      .input("id", sql.Int, id)
      .query(queries.updateProduct);

    res
      .status(201)
      .json({
        message: "Producto modificado exitosamente",
        name,
        price,
        category_id,
      });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
