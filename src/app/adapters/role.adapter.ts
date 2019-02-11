import { Role } from "../models";
import { Adapter } from "./adapter";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RoleAdapter implements Adapter<Role> {
  adapt(item: any): Role {
    return item as Role;
  }

  toRoleAddDto(input: string): any {
    return { RoleName: input };
  }
}
