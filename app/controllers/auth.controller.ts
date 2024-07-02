import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  RegisterTableService,
  GroupRegisterService,
  LoginService,
  RegisterService,
} from "@services/auth";

const AuthController = {
  tableRegister: asyncHandler(async (req: Request, res: Response) => {
    await RegisterTableService(req, res);
  }),

  groupRegister: asyncHandler(async (req: Request, res: Response) => {
    await GroupRegisterService(req, res);
  }),

  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    await LoginService(req, res);
  }),
};

export default AuthController;
