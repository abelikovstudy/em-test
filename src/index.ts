import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routers/appealsRouter"
import db from "./config/db";
import  {swaggerOptions} from "./openapi";
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config();
const server: Express = express();
const port = process.env.PORT;
const swaggerDocs = swaggerJsDoc(swaggerOptions);

server.use(express.json());
server.use(router);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const start = async (): Promise<void> => {
  try {
    await db.sync();
    server.listen(port, () => { 
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error); 
    process.exit(1); 
  }
};

void start();