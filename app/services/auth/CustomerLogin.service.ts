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
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">

      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your login</title>
        <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
      </head>

      <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="text-align: left;">
                          <div style="padding-bottom: 20px;"><img
                              src="https://digibite.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDigiBiteLogo.af768920.png&amp;w=384&amp;q=75"
                              alt="Company" style="width: 155px;"></div>
                        </div>
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Verification code</h1>
                            <p style="padding-bottom: 16px">Please use the verification code below to sign in.</p>
                            <p style="padding-bottom: 16px"><strong style="font-size: 130%">${code}</strong></p>
                            <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>The Digibite team</p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>

      </html>
    `, // html body
  };

  await transporter.sendMail(mailOptions);
  res.cookie("_customer_email", email);

  return res.status(200).json({ message: "verification email sent!" });
}

export default CustomerLoginService;
