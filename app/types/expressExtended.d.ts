declare global {
  namespace Express {
    interface Request {
      tableSession: {
        id: number;
      };
    }
  }
}
