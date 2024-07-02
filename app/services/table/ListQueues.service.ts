import { Request, Response } from "express";
import prisma from "@/../prisma";

async function ListQueuesService(req: Request, res: Response) {
  const tableNo = req.query.table_no;

  const whereOptions: { tableNo?: number } = {};
  if (tableNo) whereOptions.tableNo = Number(tableNo);

  const sessionRequests = await prisma.table.findMany({
    where: whereOptions,
  });

  return res.status(200).json(sessionRequests);
}

export default ListQueuesService;
