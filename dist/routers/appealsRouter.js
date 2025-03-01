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
const AppealRepo_1 = require("../repos/AppealRepo");
const db_1 = __importDefault(require("./../config/db"));
const appeal_1 = require("../model/appeal");
const router = express_1.default.Router();
const appealReposiroty = new AppealRepo_1.AppealRepo(db_1.default);
router.post("/appeal/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Request body was empty."
        });
    }
    if (!req.body.title || !req.body.details) {
        return res.status(422).json({
            error: "Request body incomplete."
        });
    }
    const isAppealExists = yield appealReposiroty.isAppealExists(req.body.title);
    if (isAppealExists) {
        return res.status(409).json({
            error: "Given appeal already exists."
        });
    }
    yield appealReposiroty.create({
        title: req.body.title,
        details: req.body.details,
        status: appeal_1.AppealStatus.NEW
    });
    return res.status(200).json({
        message: `Your appeal: ${req.body.title} was created at ${new Date()}.`
    });
}));
router.put("/appeal/process", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Request body was empty."
        });
    }
    if (!req.body.title) {
        return res.status(422).json({
            error: "Request body incomplete."
        });
    }
    const isAppealExists = yield appealReposiroty.isAppealExists(req.body.title);
    if (!isAppealExists) {
        return res.status(404).json({
            error: "Given appeal does not exists."
        });
    }
    yield appealReposiroty.updateStatus(req.body.title, appeal_1.AppealStatus.PROCESSING);
    return res.status(200).json({
        message: `Your appeal: ${req.body.title} status was updated at ${new Date()} to PROCESSING.`
    });
}));
router.put("/appeal/close", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Request body was empty."
        });
    }
    if (!req.body.title || !req.body.solution) {
        return res.status(422).json({
            error: "Request body incomplete."
        });
    }
    const isAppealExists = yield appealReposiroty.isAppealExists(req.body.title);
    if (!isAppealExists) {
        return res.status(404).json({
            error: "Given appeal does not exists."
        });
    }
    yield appealReposiroty.updateStatus(req.body.title, appeal_1.AppealStatus.CLOSED);
    yield appealReposiroty.updateSolution(req.body.title, req.body.solution);
    return res.status(200).json({
        message: `Appeal: ${req.body.title} was closed on ${new Date()}.`
    });
}));
router.put("/appeal/cancel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "Request body was empty."
        });
    }
    if (!req.body.title || !req.body.cancel) {
        return res.status(422).json({
            error: "Request body incomplete."
        });
    }
    const isAppealExists = yield appealReposiroty.isAppealExists(req.body.title);
    if (!isAppealExists) {
        return res.status(404).json({
            error: "Given appeal does not exists."
        });
    }
    yield appealReposiroty.updateStatus(req.body.title, appeal_1.AppealStatus.CANCELLED);
    yield appealReposiroty.updateCancel(req.body.title, req.body.cancel);
    return res.status(200).json({
        message: `Appeal: ${req.body.title} was cancelled on ${new Date()}.`
    });
}));
router.get("/appeal/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query);
    if (Object.keys(req.query).length === 0) {
        return res.status(400).json({
            error: "Request query was empty."
        });
    }
    if (!req.query.date || !req.query.dateRangeStart || !req.query.dateRangeEnd) {
        return res.status(422).json({
            error: "Request query incomplete."
        });
    }
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g;
    if (req.query.range === "true") {
        console.log(req.query.dateRangeStart.match(regex));
        if (!req.query.dateRangeStart.match(regex) || !req.query.dateRangeEnd.match(regex)) {
            return res.status(422).json({
                error: "Invalid date format. Should be YYYY-MM-DD"
            });
        }
        let appeals = yield appealReposiroty.getAppealsByDateRange(req.query.dateRangeStart, req.query.dateRangeEnd);
        return res.status(200).json({
            message: `There are ${appeals.length} appeals on range from ${req.query.dateRangeStart} to ${req.query.dateRangeEnd}.`,
            appeals: appeals
        });
    }
    else {
        if (!req.query.date.match(regex)) {
            return res.status(422).json({
                error: "Invalid date format. Should be YYYY-MM-DD"
            });
        }
        let appeals = yield appealReposiroty.getAppealsByDate(req.query.date);
        return res.status(200).json({
            message: `There are ${appeals.length} appeals on ${req.query.date}.`,
            appeals: appeals
        });
    }
}));
router.post("/appeal/stop", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appealsArray = yield appealReposiroty.getAllAppeals();
    for (const appeal of appealsArray) {
        let status = yield appealReposiroty.getAppealStatus(appeal.title);
        if (status === appeal_1.AppealStatus.PROCESSING) {
            yield appealReposiroty.updateStatus(appeal.title, appeal_1.AppealStatus.CANCELLED);
        }
    }
    return res.status(200).json({
        message: `All appeals statuses changed.`
    });
}));
exports.default = router;
