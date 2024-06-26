import { Request, Response } from "express";

const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  };
};

export default asyncHandler;
