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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealRepo = void 0;
const core_1 = require("@sequelize/core");
const appeal_1 = require("../model/appeal");
class AppealRepo {
    constructor(_db) {
        this.db = _db;
        this.repo = this.db.getRepository(appeal_1.Appeal);
    }
    create(appeal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repo.create(Object.assign({}, appeal));
        });
    }
    updateStatus(title, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeal = yield this.repo.findOne({
                where: {
                    title: title
                }
            });
            yield (appeal === null || appeal === void 0 ? void 0 : appeal.update({
                status: status,
            }));
        });
    }
    updateSolution(title, solution) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeal = yield this.repo.findOne({
                where: {
                    title: title
                }
            });
            yield (appeal === null || appeal === void 0 ? void 0 : appeal.update({
                solutionDetails: solution,
            }));
        });
    }
    updateCancel(title, cancel) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeal = yield this.repo.findOne({
                where: {
                    title: title
                }
            });
            yield (appeal === null || appeal === void 0 ? void 0 : appeal.update({
                cancelDetails: cancel,
            }));
        });
    }
    getAppealStatus(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeal = yield this.repo.findOne({
                where: {
                    title: title
                },
                raw: true
            });
            return appeal.status;
        });
    }
    getAllAppeals() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findAll({ raw: true });
        });
    }
    getAppealsByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeals = yield this.repo.findAll({
                where: {
                    createdAt: {
                        [core_1.Op.and]: {
                            [core_1.Op.gte]: date + ' 00:00:00',
                            [core_1.Op.lte]: date + ' 23:59:59.999999',
                        }
                    }
                },
                raw: true
            });
            return appeals;
        });
    }
    getAppealsByDateRange(dateStart, dateEnd) {
        return __awaiter(this, void 0, void 0, function* () {
            let appeals = yield this.repo.findAll({
                where: {
                    createdAt: {
                        [core_1.Op.and]: {
                            [core_1.Op.gte]: dateStart + ' 00:00:00',
                            [core_1.Op.lte]: dateEnd + ' 23:59:59.999999',
                        }
                    }
                },
                raw: true
            });
            return appeals;
        });
    }
    isAppealExists(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let target = yield this.repo.findOne({
                where: {
                    title: title
                }
            });
            return target !== null;
        });
    }
}
exports.AppealRepo = AppealRepo;
