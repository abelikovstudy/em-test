import { Sequelize } from "sequelize-typescript";
import {Appeal} from "../model/appeal";
const db = new Sequelize({
  host : "localhost",
  username : "postgres",
  password : "password",
  database : "postgres",
  dialect : "postgres",
  models : [Appeal],
  repositoryMode : true
})
export default db