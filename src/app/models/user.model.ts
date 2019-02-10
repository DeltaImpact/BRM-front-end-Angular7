import { Role, Permission } from "./";

export interface User {
  id: number;
  name: string;
  permissions: Permission[];
  roles: Role[];
}
