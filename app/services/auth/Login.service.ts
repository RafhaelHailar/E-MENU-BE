import { Request, Response } from "express";
import prisma from "@/../prisma";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function LoginService(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return res
      .status(404)
      .json({ message: "user with that email is not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "email or password is incorrect" });

  const salt = await bcrypt.genSalt();
  const sessionId = await bcrypt.hash(
    crypto.randomBytes(32).toString("hex"),
    salt,
  );

  res.cookie("_user_session", sessionId);

  return res.status(200).json({ sessionId });
}

export default LoginService;
