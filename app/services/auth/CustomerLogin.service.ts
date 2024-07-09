import { Request, Response } from "express";
import prisma from "@/../prisma";
import transporter from "@lib/nodemailer";

async function CustomerLoginService(req: Request, res: Response) {
  const email = req.body.email;

  const code = 1000 + Math.floor(Math.random() * 9000);

  await prisma.oTP.upsert({
    where: {
      email,
    },
    update: {
      code,
    },
    create: {
      email,
      code,
    },
  });

  const mailOptions = {
    from: `"E MENU" <${process.env.NODEMAILER_EMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "E MENU Email Verification", // Subject line
    text: ``, // plain text body
    html: `Your Verification Code: <b>${code}</b>`, // html body
  };

  await transporter.sendMail(mailOptions);
  res.cookie("_customer_email", email);

  return res.status(200).json({ message: "verification email sent!" });
}

export default CustomerLoginService;
