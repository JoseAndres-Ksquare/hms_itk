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
const methods_1 = require("../firebase/methods");
const hasRole_1 = require("../middlewares/hasRole");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const methods_2 = require("../firebase/methods");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role, isDisabled } = req.body;
    if (!email || !password || !role || isDisabled === undefined) {
        res.status(400);
        return res.send({ error: "All fields are required" });
    }
    if (role === "admin" || role === "doctor") {
        res.status(400);
        return res.send({ error: "Invalid role" });
    }
    try {
        const userId = yield (0, methods_1.createUser)(email, password, role, isDisabled);
        res.status(201).send({
            userId,
        });
    }
    catch (error) {
        res.status(500).send({ error: "something went wrong" });
    }
}));
exports.UserRouter.delete("/:userId", isAuthenticated_1.isAuth, (0, hasRole_1.hasRole)({
    roles: ["Admin"],
    allowSameUser: true,
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { isDisabled } = req.body;
    if (isDisabled === undefined || isDisabled === null) {
        return res.status(400).send({
            error: "no fields to update",
        });
    }
    try {
        const user = yield (0, methods_2.disableUser)(userId, isDisabled);
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: "something went wrong" });
    }
}));
