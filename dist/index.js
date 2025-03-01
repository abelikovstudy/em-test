"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const appealsRouter_1 = __importDefault(require("./routers/appealsRouter"));
const db_1 = __importDefault(require("./config/db"));
const openapi_1 = require("./openapi");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
dotenv_1.default.config();
const server = (0, express_1.default)();
const port = process.env.PORT;
const swaggerDocs = swaggerJsDoc(openapi_1.swaggerOptions);
server.use(express_1.default.json());
server.use(appealsRouter_1.default);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.sync();
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
void start();
