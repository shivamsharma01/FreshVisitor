import { ROLE } from "../auth/roles";

export class User {
  isAuthenticated: boolean;
  constructor(public empNumber: number,public empName: string,public email: string) {
      this.isAuthenticated = false;
  }
}
