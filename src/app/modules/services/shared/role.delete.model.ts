import {Deserializable} from '../../../shared/interfaces/deserializable.interface';
import { Role } from "./role.model";
import { User } from "./user.model";

export class RoleDelete implements Deserializable {
  RoleId: number;
  UserId: number;

  constructor(role: Role, user: User) {
    this.RoleId = role.id;
    this.UserId = user.id;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
