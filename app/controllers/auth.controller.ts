import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  RegisterTableService,
  GroupRegisterService,
  ListQueuesService,
  RegisterService,
} from "@services/auth";

const AuthController = {
  listQueues: asyncHandler(async (req: Request, res: Response) => {
    await ListQueuesService(req, res);
  }),

  tableRegister: asyncHandler(async (req: Request, res: Response) => {
    await RegisterTableService(req, res);
  }),

  groupRegister: asyncHandler(async (req: Request, res: Response) => {
    await GroupRegisterService(req, res);
  }),

  register: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),
};

export default AuthController;
