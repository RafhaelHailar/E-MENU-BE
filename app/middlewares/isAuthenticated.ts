import { Request, Response, NextFunction } from "express";
import prisma from "prisma";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const loyaltySession = req.cookies._loyalty_session;
  const email = req.cookies._customer_email;

  if (!loyaltySession || !email)
    return res.status(401).json({ message: "please authenticate" });

  const otp = await prisma.oTP.findUnique({
    where: {
      email,
      sessionId: loyaltySession,
    },
  });

  if (!otp) return res.status(404).json({ message: "session expired" });

  req.customerEmail = email;
  return next();
};

export default isAuthenticated;
