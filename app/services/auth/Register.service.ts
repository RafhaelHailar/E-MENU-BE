import { Request, Response } from "express";
import prisma from "@/../prisma";

async function RegisterService(req: Request, res: Response) {
  const tableId = Number(req.params.tableId);

  const table = await prisma.table.findUnique({
    where: {
      id: tableId,
    },
    include: {
      customers: true,
    },
  });

  if (!table)
    return res.status(404).json({ message: "no table with that id found!" });

  if (req.tableSession && !req.tableSession.error) {
    const tableSession = req.tableSession as Request["tableSession"];

    const customer = await prisma.customer.findUnique({
      where: {
        id: tableSession.customerId,
      },
    });

    if (customer) {
      if (customer.tableId !== tableId)
        return res
          .status(409)
          .json({ message: "you are in session in other table" });
      return res.redirect("http://localhost:3000");
    }
  }

  if (table.customers.length !== 0)
    return res.status(403).json({ message: "there is another session open" });

  const customer = await prisma.customer.create({
    data: {
      name: `T${tableId} Leader`,
      role: "LEADER",
      cart: { create: {} },
      tableId,
    },
  });

  res.cookie("_table_session", customer.id + "." + tableId);

  // res.status(200).json({ table_session: customer.id + "." + tableId });
  return res.redirect("http://localhost:3000");
}

export default RegisterService;
