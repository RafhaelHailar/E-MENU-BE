declare global {
  namespace Express {
    interface Request {
      tableSession: {
        tableId?: number;
        customerId?: string;
        error?: {
          status: number;
          message: string;
        };
      };
    }
  }
}

export {};
