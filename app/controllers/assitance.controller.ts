import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { ApproveRequestService, RequestService } from "@services/assistance";

const AssistanceController = {
  request: asyncHandler(async (req: Request, res: Response) => {
    await RequestService(req, res);
  }),

  approveRequest: asyncHandler(async (req: Request, res: Response) => {
    await ApproveRequestService(req, res);
  }),
};

export default AssistanceController;
