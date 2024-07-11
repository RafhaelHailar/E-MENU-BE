import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";
import {
  ApproveRequestService,
  DeclineRequestService,
  ListRequestsService,
  RequestService,
} from "@services/assistance";

const AssistanceController = {
  listRequests: asyncHandler(async (req: Request, res: Response) => {
    await ListRequestsService(req, res);
  }),

  request: asyncHandler(async (req: Request, res: Response) => {
    await RequestService(req, res);
  }),

  approveRequest: asyncHandler(async (req: Request, res: Response) => {
    await ApproveRequestService(req, res);
  }),

  declineRequest: asyncHandler(async (req: Request, res: Response) => {
    await DeclineRequestService(req, res);
  }),
};

export default AssistanceController;
