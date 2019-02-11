import { User } from "../models";
import { Adapter } from "./adapter";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return {
      name: item.userName,
      id: item.id,
      permissions: item.permissions,
      roles: item.roles
    } as User;
  }
}
