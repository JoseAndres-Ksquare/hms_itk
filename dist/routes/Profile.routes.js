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
exports.ProfileRouter = void 0;
const express_1 = require("express");
const profile_service_1 = require("../services/profile.service");
exports.ProfileRouter = (0, express_1.Router)();
exports.ProfileRouter.post("/createProfile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreation = yield (0, profile_service_1.createProfile)(req.body.first_name, req.body.last_name, req.body.phone_number, req.body.address, req.body.user_id);
    res.statusCode = 200;
    res.send(userCreation);
}));
/* ProfileRouter.put("/softDelete", async (req: Request, res: Response) => {
  const userStatus = await ProfileChangeState(req.body.id, req.body.is_deleted);
  res.statusCode = 200;
  res.send("userStatus changed for the user with id: " + req.body.id);
});
 */
