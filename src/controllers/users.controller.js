import { getConnection, sql } from "../database/connection.js";
import { userQueries } from "../database/querys.js";
import fs from "fs";
import csv from "csv-parser";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username == null || email == null || password == null) {
      return res
        .status(400)
        .json({ msg: "Bad Request: Por favor complete los datos" });
    }

    const pool = await getConnection();
    await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .query(userQueries.createNewUser);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      username,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const uploadUsers = async (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        // Obtener el pool de conexiones
        const pool = await getConnection();

        // Crear una transacción
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Insertar los datos en la base de datos
        for (const row of results) {
          const { username, email, password } = row;

          // Crear un nuevo objeto Request para cada iteración
          const request = new sql.Request(transaction);

          await request
            .input('Username', sql.NVarChar, username)
            .input('Email', sql.NVarChar, email)
            .input('Password', sql.NVarChar, password)
            .query(userQueries.createNewUser);
        }

        // Confirmar la transacción
        await transaction.commit();
        res.send('Datos insertados correctamente');
      } catch (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).send('Error al insertar datos');
      }
    });
};
