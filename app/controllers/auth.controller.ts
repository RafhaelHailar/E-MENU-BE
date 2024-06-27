import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import RegisterService from "@services/auth/Register.service";

const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),
};

export default AuthController;
