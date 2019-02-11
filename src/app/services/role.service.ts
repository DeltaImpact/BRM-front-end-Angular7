import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../core/services/logger.service";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
// import { Role } from "./role.model";
import { Role } from "../models";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(private http: HttpClient) {}

  static stringToRoleAddDto(input: string): any {
    return { RoleName: input };
  }

  static roleToRoleOrPermissionUpdateDto(input: Role): any {
    return { RoleName: input.name };
  }

  getRoles(): Observable<Role[]> {
    return <Observable<Role[]>>(
      this.http.get(`${AppConfig.apiUrl}/role/roles`)
    );
  }

  addRole(item: string): Observable<Role> {
    let Url = `${AppConfig.apiUrl}/role/AddRole`;
    return <Observable<Role>>(
      this.http
        .post(Url, RoleService.stringToRoleAddDto(item), httpOptions)
    );
  }

  deleteRole(roleId: number) {
    let Url = `${AppConfig.apiUrl}/role/deleteRole?Id=${roleId}`;
    return <Observable<Role>>this.http.delete(Url, httpOptions)
  }

  updateRole(role: Role) {
    let Url = `${AppConfig.apiUrl}/role/updateRole`;
    return <Observable<Role>>this.http.put(Url, role, httpOptions)
  }

  addRoleToUser(userId: number, roleId: number) {
    let Url = `${AppConfig.apiUrl}/role/addRoleToUser`;
    return <Observable<Role>>this.http
      .post(
        Url,
        {
          UserId: userId,
          RoleOrPermissionId: roleId
        },
        httpOptions
      )
  }

  deleteRoleFromUser(userId: number, roleId: number) {
    let Url = `${AppConfig.apiUrl}/role/deleteRoleFromUser`;
    return <Observable<Role>>this.http
      .post(
        Url,
        {
          UserId: userId,
          RoleOrPermissionId: roleId
        },
        httpOptions
      )
  }
}
