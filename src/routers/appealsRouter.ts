import express, { Request, Response, Router } from "express";
import { AppealRepo } from "../repos/AppealRepo";
import db from "./../config/db";
import { Appeal, AppealStatus } from "../model/appeal";
const router : Router = express.Router();
const appealReposiroty = new AppealRepo(db)
interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface AppealListRequestQuery {
    date: string;
    dateRangeStart: string;
    dateRangeEnd: string;
    range: string
}
router.post("/appeal/create", async (req : Request, res : Response) : Promise<Response> => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json(
            {
                error : "Request body was empty."
            });
    }
    if(!req.body.title || !req.body.details){
        return res.status(422).json(
            {
                error : "Request body incomplete."
            });
    }
    const isAppealExists = await appealReposiroty.isAppealExists(req.body.title);

    if(isAppealExists){
        return res.status(409).json(
            {
                error : "Given appeal already exists."
            });
    }
    await appealReposiroty.create(
        {
            title : req.body.title,
            details: req.body.details,
            status: AppealStatus.NEW
        })
    return res.status(200).json(
        {
            message : `Your appeal: ${req.body.title} was created at ${new Date()}.`
        }
    );
})

router.put("/appeal/process", async (req: Request, res: Response) : Promise<Response> => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json(
            {
                error : "Request body was empty."
            });
    }
    if(!req.body.title){
        return res.status(422).json(
            {
                error : "Request body incomplete."
            });
    }
    const isAppealExists = await appealReposiroty.isAppealExists(req.body.title);

    if(!isAppealExists){
        return res.status(404).json(
            {
                error : "Given appeal does not exists."
            });
    }

    await appealReposiroty.updateStatus(req.body.title, AppealStatus.PROCESSING)

    return res.status(200).json(
        {
            message : `Your appeal: ${req.body.title} status was updated at ${new Date()} to PROCESSING.`
        }
    );
})

router.put("/appeal/close", async (req: Request, res: Response) : Promise<Response> => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json(
            {
                error : "Request body was empty."
            });
    }
    if(!req.body.title || !req.body.solution){
        return res.status(422).json(
            {
                error : "Request body incomplete."
            });
    }
    const isAppealExists = await appealReposiroty.isAppealExists(req.body.title);

    if(!isAppealExists){
        return res.status(404).json(
            {
                error : "Given appeal does not exists."
            });
    }
    await appealReposiroty.updateStatus(req.body.title, AppealStatus.CLOSED)
    await appealReposiroty.updateSolution(req.body.title, req.body.solution)


    return res.status(200).json(
        {
            message : `Appeal: ${req.body.title} was closed on ${new Date()}.`
        }
    );
})

router.put("/appeal/cancel", async (req: Request, res: Response) : Promise<Response> => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json(
            {
                error : "Request body was empty."
            });
    }
    if(!req.body.title || !req.body.cancel){
        return res.status(422).json(
            {
                error : "Request body incomplete."
            });
    }
    const isAppealExists = await appealReposiroty.isAppealExists(req.body.title);

    if(!isAppealExists){
        return res.status(404).json(
            {
                error : "Given appeal does not exists."
            });
    }
    await appealReposiroty.updateStatus(req.body.title, AppealStatus.CANCELLED)
    await appealReposiroty.updateCancel(req.body.title, req.body.cancel)
    return res.status(200).json(
        {
            message : `Appeal: ${req.body.title} was cancelled on ${new Date()}.`
        }
    );
})

router.get("/appeal/list", async (req: Request<RequestParams, ResponseBody, RequestBody, AppealListRequestQuery>, res: Response) : Promise<Response> =>{
    console.log(req.query)
    if(Object.keys(req.query).length === 0){
        return res.status(400).json(
            {
                error : "Request query was empty."
            });
    }
    if(!req.query.date || !req.query.dateRangeStart || !req.query.dateRangeEnd ){
        return res.status(422).json(
            {
                error : "Request query incomplete."
            });
    }
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g
    if(req.query.range === "true"){
        console.log(req.query.dateRangeStart.match(regex))
        if (!req.query.dateRangeStart.match(regex) || !req.query.dateRangeEnd.match(regex)) {
            return res.status(422).json(
                {
                    error : "Invalid date format. Should be YYYY-MM-DD"
                });
        }
        let appeals = await appealReposiroty.getAppealsByDateRange(req.query.dateRangeStart, req.query.dateRangeEnd)
        return res.status(200).json(
            {
                message : `There are ${appeals.length} appeals on range from ${req.query.dateRangeStart} to ${req.query.dateRangeEnd}.`,
                appeals : appeals
            }
        );
    }
    else{
        if (!req.query.date.match(regex)) {
            return res.status(422).json(
                {
                    error : "Invalid date format. Should be YYYY-MM-DD"
                });
        }
        let appeals = await appealReposiroty.getAppealsByDate(req.query.date)
        return res.status(200).json(
            {
                message : `There are ${appeals.length} appeals on ${req.query.date}.`,
                appeals : appeals
            }
        );
    }

})

router.post("/appeal/stop", async (req : Request, res : Response) : Promise<Response> => {
    const appealsArray : Appeal[] = await appealReposiroty.getAllAppeals();
    for(const appeal of appealsArray){
        let status : AppealStatus = await appealReposiroty.getAppealStatus(appeal.title);
        if(status === AppealStatus.PROCESSING){
            await appealReposiroty.updateStatus(appeal.title, AppealStatus.CANCELLED)
        }
    }
    return res.status(200).json(
        {
            message : `All appeals statuses changed.`
        }
    );
});
export default router;