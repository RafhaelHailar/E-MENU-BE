import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";

import {
  ListQueuesService,
  RegisterService,
  GroupRegisterService,
  ApproveRequestService,
  DeclineRequestService,
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

  approveRequest: asyncHandler(async (req: Request, res: Response) => {
    await ApproveRequestService(req, res);
  }),

  declineRequest: asyncHandler(async (req: Request, res: Response) => {
    await DeclineRequestService(req, res);
  }),
};

export default TableController;
