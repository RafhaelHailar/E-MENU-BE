import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import { RequestService } from "@services/assistance";

const AssistanceController = {
  request: asyncHandler(async (req: Request, res: Response) => {
    await RequestService(req, res);
  }),
};

export default AssistanceController;
