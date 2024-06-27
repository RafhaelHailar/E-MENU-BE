declare global {
  namespace Express {
    interface Request {
      tableSession: {
        tableId: number;
        customerId: string;
      };
    }
  }
}

export {};
