import { Permission } from "../models";
import { Adapter } from "./adapter";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PermissionAdapter implements Adapter<Permission> {
  adapt(item: any): Permission {
    return item as Permission;
  }

  toPermissionAddDto(input: string): any {
    return { PermissionName: input };
  }
}
