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
  
  toUserAddDto(input: User): any {
    return {
      Username: input.name,
      RolesId: input.roles.map(item => item.id) || [],
      PermissionsId: input.permissions.map(item => item.id) || []
    };
  }

  toUserOrUserUpdateDto(input: User): any {
    return { UserName: input.name };
  }
}
