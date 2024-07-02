import { Request, Response } from "express";
import prisma from "@/../prisma";
import bcrypt from "bcrypt";

async function RegisterService(req: Request, res: Response) {
  const { name, email, contact, password, role } = req.body;

  const similarEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (similarEmail)
    return res.status(409).json({ message: "email is already taken" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      name,
      email,
      contact,
      password: hashedPassword,
      role,
    },
  });

  return res.status(200).json({ message: "user created" });
}

export default RegisterService;
