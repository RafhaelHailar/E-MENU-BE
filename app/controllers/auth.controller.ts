import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  RegisterService,
  GroupRegisterService,
  ListQueuesService,
} from "@services/auth";

const AuthController = {
  listQueues: asyncHandler(async (req: Request, res: Response) => {
    await ListQueuesService(req, res);
  }),

  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  groupRegister: asyncHandler(async (req: Request, res: Response) => {
    await GroupRegisterService(req, res);
  }),
};

export default AuthController;
