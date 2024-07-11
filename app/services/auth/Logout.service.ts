import { Request, Response } from "express";

async function LogoutService(req: Request, res: Response) {
  res.clearCookie("_user_session");

  return res.status(200).json({ message: "user logged out" });
}

export default LogoutService;
