declare namespace Express {
  export interface Request {
    authUser: {
      id: number;
      name: string;
      email: string;
    };
  }
}
