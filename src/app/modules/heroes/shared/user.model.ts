import { Deserializable } from "../../../shared/interfaces/deserializable.interface";
import { Role } from "./role.model";
import { Permission } from "./permission.model";

export class User implements Deserializable {
  id: string;
  name: string;
  permissions: Permission[] = [];
  roles: Role[] = [];

  constructor(user: any = {}) {
    this.id = user.id;
    this.name = user.name || "";
    this.permissions = user.permissions || "";
    this.roles = user.roles || "";
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
