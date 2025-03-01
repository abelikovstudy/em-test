import { Routes } from "./routers/appealsRouter.schema";
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Тестовое задание -- Effective Mobile',
        version: '1.0.0',
        description: 'API документации',
      },
      servers: [
        {
          url: `http://localhost:3000`,
        },
      ],
      paths: {
        ...Routes
      },
    },
    apis: ['./routers/*.ts'], 
  };
  
export { swaggerOptions }