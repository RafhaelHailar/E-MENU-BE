import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";

import {
  ListQueuesService,
  RegisterService,
  GroupRegisterService,
} from "@services/table";

const TableController = {
  tableRegister: asyncHandler(async (req: Request, res: Response) => {
    await RegisterService(req, res);
  }),

  groupRegister: asyncHandler(async (req: Request, res: Response) => {
    await GroupRegisterService(req, res);
  }),

  listQueues: asyncHandler(async (req: Request, res: Response) => {
    await ListQueuesService(req, res);
  }),
};

export default TableController;
