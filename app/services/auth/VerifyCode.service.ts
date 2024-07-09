import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function VerifyCodeService(req: Request, res: Response) {
  const email = req.cookies._customer_email;
  const code = req.body.code;

  if (!email)
    return res
      .status(400)
      .json({ message: "please request for email verification" });

  const otp = await prisma.oTP.findUnique({
    where: {
      email,
    },
  });

  if (!otp)
    return res
      .status(404)
      .json({ message: "given email does not request for verification" });

  const isMatch = otp.code === code;

  console.log(otp.code, code);

  if (!isMatch)
    return res.status(401).json({ message: "given code is not valid" });

  const salt = await bcrypt.genSalt();
  const sessionId = await bcrypt.hash(
    crypto.randomBytes(32).toString("hex"),
    salt,
  );

  await prisma.oTP.update({
    where: {
      email,
      code,
    },
    data: {
      sessionId,
    },
  });

  res.cookie("_loyalty_session", sessionId);
  return res.status(200).json({ message: "email is verified" });
}

export default VerifyCodeService;
