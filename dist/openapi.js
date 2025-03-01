"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const appealsRouter_schema_1 = require("./routers/appealsRouter.schema");
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
        paths: Object.assign({}, appealsRouter_schema_1.swLoginRoute),
    },
    apis: ['./routers/*.ts'],
};
exports.swaggerOptions = swaggerOptions;
