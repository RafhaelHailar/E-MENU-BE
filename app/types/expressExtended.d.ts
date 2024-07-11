declare global {
  namespace Express {
    interface Request {
      customerEmail: string;
      tableSession: {
        id: number;
        session: string | null;
        tableNo: number;
        status: boolean;
        approvedDate: Date | null;
        approvedBy: string | null;
        createdAt: Date;
      };
    }
  }
}

export {};
