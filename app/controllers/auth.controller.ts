import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { RegisterService, GroupRegisterService } from "@services/auth";

const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  groupRegister: asyncHandler(async (req: Request, res: Response) => {
    await GroupRegisterService(req, res);
  }),
};

export default AuthController;
