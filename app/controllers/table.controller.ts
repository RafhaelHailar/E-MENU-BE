import { Request, Response } from "express";
import asyncHandler from "@utils/asyncHandler";

import { ListQueuesService } from "@services/table";

const TableController = {
  listQueues: asyncHandler(async (req: Request, res: Response) => {
    await ListQueuesService(req, res);
  }),
};

export default TableController;
