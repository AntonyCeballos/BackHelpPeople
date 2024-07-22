import { config } from 'dotenv';

// Cargar variables de entorno desde el archivo .env
config();

console.log('PORT:', process.env.PORT); // Debería imprimir el valor de PORT desde el archivo .env

const settings = {
  port: process.env.PORT || 4000,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || 'webstore',
  dbServer: process.env.DB_SERVER || 'localhost',
  dbDatabase: process.env.DB_DATABASE || ''
};

console.log(settings); // Imprime los valores para verificar

export default settings;
