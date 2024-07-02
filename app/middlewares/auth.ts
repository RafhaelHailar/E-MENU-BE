import { Request, Response, NextFunction } from "express";
import prisma from "@/../prisma";
import { User_Role } from "@prisma/client";
import { roleRights } from "@config/roles";
import ApiErrorHandler from "@utils/ApiErrorHandler";
import httpStatus from "http-status";

async function checkRights(
  req: Request,
  resolve: (value?: unknown) => void,
  reject: (reason?: unknown) => void,
  requiredRights: string[],
) {
  const userSession = req.cookies._user_session;

  let role: User_Role = User_Role.CUSTOMER;

  if (userSession) {
    const user = await prisma.user.findUnique({
      where: {
        sessionId: userSession,
      },
    });
    if (user) role = user.role;
  }

  const userRights = roleRights.get(role) ?? [];
  const hasRequiredRights = requiredRights.every((requiredRight) =>
    userRights.includes(requiredRight),
  );

  if (!hasRequiredRights)
    return reject(new ApiErrorHandler(httpStatus.FORBIDDEN, "Forbidden"));

  return resolve(role);
}

const auth = (...requiredRights: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      checkRights(req, resolve, reject, requiredRights);
    })
      .then(async (role) => {
        if (role !== User_Role.CUSTOMER) return next();

        const tableSession = req.cookies._table_session;

        if (!tableSession)
          return res.status(401).json({ message: "please authenticate" });

        const session = await prisma.table.findUnique({
          where: {
            session: tableSession,
          },
        });

        if (!session)
          return res.status(404).json({ message: "session not found" });

        if (!session.status)
          return res.status(401).json({ message: "session not approved" });

        req.tableSession = session;
        next();
      })
      .catch((e) => {
        return res.status(e.statusCode).json({ message: e.message });
      });
  };
};

export default auth;
