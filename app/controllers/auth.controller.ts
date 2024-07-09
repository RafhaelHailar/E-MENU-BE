import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  CustomerLoginService,
  LoginService,
  RegisterService,
  VerifyCodeService,
} from "@services/auth";

const AuthController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    await LoginService(req, res);
  }),

  customerLogin: asyncHandler(async (req: Request, res: Response) => {
    await CustomerLoginService(req, res);
  }),

  verifyCode: asyncHandler(async (req: Request, res: Response) => {
    await VerifyCodeService(req, res);
  }),
};

export default AuthController;
