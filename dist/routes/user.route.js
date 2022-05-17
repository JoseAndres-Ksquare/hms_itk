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
exports.UserRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreation = yield (0, user_service_1.createUser)(req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.phone_number, req.body.address, "Patient");
    res.statusCode = 200;
    res.send(userCreation);
}));
exports.UserRouter.put("/softDelete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userStatus = yield (0, user_service_1.userChangeState)(req.body.id, req.body.is_deleted);
    res.statusCode = 200;
    res.send("userStatus changed for the user with id: " + req.body.id);
}));
