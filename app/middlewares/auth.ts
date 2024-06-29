import { Request, Response, NextFunction } from "express";
import prisma from "@/../prisma";

const auth = ({ isResponding = true } = {}) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const tableSession = req.cookies._table_session;

    if (!tableSession) {
      const error = { status: 401, message: "please authenticate" };
      if (isResponding)
        return res.status(error.status).json({ message: error.message });
      else {
        req.tableSession = {
          error: {
            status: error.status,
            message: error.message,
          },
        };
        return next();
      }
    }

    const [customerId, tableId] = tableSession.split(".");

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      const error = {
        status: 401,
        message: "table with that session is not found!",
      };
      if (isResponding)
        return res.status(error.status).json({ message: error.message });
      else {
        req.tableSession = {
          error: {
            status: error.status,
            message: error.message,
          },
        };
        return next();
      }
    }

    const sessionData = { customerId, tableId: Number(tableId) };
    req.tableSession = sessionData;
    next();
  };
};

export default auth;
