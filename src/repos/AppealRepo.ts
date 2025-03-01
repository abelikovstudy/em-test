import { Repository, Sequelize } from "sequelize-typescript";
import { Op } from '@sequelize/core';
import { Appeal, AppealStatus, IAppeal } from "../model/appeal";

export class AppealRepo{
    db : Sequelize;
    repo : Repository<Appeal>;
    constructor(_db : Sequelize){
        this.db = _db;
        this.repo = this.db.getRepository(Appeal);
    }
    async create(appeal : IAppeal) : Promise<void> {
        await this.repo.create({...appeal});  
    }

    async updateStatus(title : String, status : AppealStatus) : Promise<void>{
        let appeal : Appeal | null = await this.repo.findOne({
            where : {
                title : title
            }
        })
        await appeal?.update({
            status : status,
        })
    }

    async updateSolution(title: String, solution: String) : Promise<void>{
        let appeal : Appeal | null = await this.repo.findOne({
            where : {
                title : title
            }
        })
        await appeal?.update({
            solutionDetails : solution,
        })
    }

    async updateCancel(title: String, cancel: String) : Promise<void>{
        let appeal : Appeal | null = await this.repo.findOne({
            where : {
                title : title
            }
        })
        await appeal?.update({
            cancelDetails : cancel,
        })
    }
    async getAppealStatus(title : String) : Promise<AppealStatus>{
        let appeal = await this.repo.findOne({
            where: {
                title : title
            },
            raw: true
        })
        return appeal!.status;
    }

    async getAllAppeals() : Promise<Appeal[]>{
        return await this.repo.findAll({raw: true});
    }
    async getAppealsByDate(date : String): Promise<Appeal[]>{
        let appeals = await this.repo.findAll({
            where: {
                createdAt : {
                    [Op.and]: {
                        [Op.gte]: date + ' 00:00:00',
                        [Op.lte]: date + ' 23:59:59.999999',
                      }
                }
            },
            raw: true
        })
        return appeals
    }
    async getAppealsByDateRange(dateStart : String, dateEnd : String): Promise<Appeal[]>{
        let appeals = await this.repo.findAll({
            where: {
                createdAt : {
                    [Op.and]: {
                        [Op.gte]: dateStart + ' 00:00:00',
                        [Op.lte]: dateEnd + ' 23:59:59.999999',
                      }
                }
            },
            raw: true
        })
        return appeals
    }
    async isAppealExists(title : String) : Promise<Boolean>{
        let target =  await this.repo.findOne({
            where: {
                title : title
            }
        })
        return target !== null;
    }
}