"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppealStatus = exports.Appeal = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
var AppealStatus;
(function (AppealStatus) {
    AppealStatus["NEW"] = "New";
    AppealStatus["PROCESSING"] = "Processing";
    AppealStatus["CLOSED"] = "Closed";
    AppealStatus["CANCELLED"] = "Cancelled";
})(AppealStatus || (exports.AppealStatus = AppealStatus = {}));
let Appeal = class Appeal extends sequelize_typescript_1.Model {
};
exports.Appeal = Appeal;
__decorate([
    (0, sequelize_typescript_1.Column)({
        defaultValue: AppealStatus.NEW,
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(AppealStatus)),
    }),
    __metadata("design:type", String)
], Appeal.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appeal.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appeal.prototype, "details", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appeal.prototype, "cancelDetails", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appeal.prototype, "solutionDetails", void 0);
exports.Appeal = Appeal = __decorate([
    sequelize_typescript_1.Table
], Appeal);
