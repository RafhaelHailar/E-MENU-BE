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

    if (!user)
      return reject(
        new ApiErrorHandler(httpStatus.UNAUTHORIZED, "session expired"),
      );
    role = user.role;
  }

  const userRights = roleRights.get(role) ?? [];
  const hasRequiredRights = requiredRights.every((requiredRight) =>
    userRights.includes(requiredRight),
  );

  if (!hasRequiredRights)
    return reject(new ApiErrorHandler(httpStatus.FORBIDDEN, "forbidden"));

  return resolve(role);
}

const auth = (...requiredRights: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      checkRights(req, resolve, reject, requiredRights);
    })
      .then(async () => {
        next();
      })
      .catch((e) => {
        return res.status(e.statusCode).json({ message: e.message });
      });
  };
};

export default auth;
