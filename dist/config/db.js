"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const appeal_1 = require("../model/appeal");
const db = new sequelize_typescript_1.Sequelize({
    host: "localhost",
    username: "postgres",
    password: "password",
    database: "postgres",
    dialect: "postgres",
    models: [appeal_1.Appeal],
    repositoryMode: true
});
exports.default = db;
