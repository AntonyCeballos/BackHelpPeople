import { getConnection, sql } from "../database/connection.js";
import { categoryqueries } from "../database/querys.js";

export const getCategories = async (req, res) => {
    try {
      //Se llama la conexion que retorna un objeto pool
      const pool = await getConnection();
      //Una vez traído el pool le hacemos una petiión consulta que me trae los productos de la bd
      const result = await pool.request().query(categoryqueries.getAllCategories);
      console.log(result);
  
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createNewCategory = async (req, res) => {
    try {
      const { name} = req.body;
  
      if (
        name == null 
      ) {
        return res
          .status(400)
          .json({ msg: "Bad Request: Por favor escribe el nombre de la categoría" });
      }
  
      const pool = await getConnection();
      await pool
        .request()
        .input("name", sql.NVarChar, name)
        .query(categoryqueries.createNewCategory);
  
      res
        .status(201)
        .json({
          message: "Categoría creada exitosamente",
          name
        });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getCategoryById = async (req, res) => {
    const {id} = req.params;
  
    const pool = await getConnection()
    const result = await pool.request().input('id', id).query(categoryqueries.getOneCategory)
  
    console.log(result.recordset[0])
    res.send(id)
  };

  export const deleteCategoryById = async (req, res) => {
    try {
      const {id} = req.params;
  
    const pool = await getConnection()
    const result = await pool.request().input('id', id).query(categoryqueries.deleteCategory)
  
    res.status(204).json({message: "La categoría ha sido eliminada satisfactoriamente"})
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }  
  };

  export const updateCategoryById = async (req, res) => {
    try {
      const { name} = req.body;
      const {id} = req.params
  
      if (
        name == null
      ) {
        return res
          .status(400)
          .json({ msg: "Bad Request: Por favor llena el campo nombre" });
      }
  
      const pool = await getConnection();
      await pool
        .request()
        .input("name", sql.NVarChar, name)
        .input("id", sql.Int, id)
        .query(categoryqueries.updateCategory);
  
      res
        .status(201)
        .json({
          message: "Categoría modificada exitosamente",
          name
        });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }