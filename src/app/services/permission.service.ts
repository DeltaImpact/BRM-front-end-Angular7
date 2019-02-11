import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../core/services/logger.service";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Permission } from "../models";
import { PermissionAdapter } from "../adapters/permisson.adapter";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

import { processErrorResponse } from "./utils.service";

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  constructor(private http: HttpClient,  private permissionAdapter: PermissionAdapter) {}

  getPermissions(): Observable<Permission[]> {
    return <Observable<Permission[]>>(
      this.http.get(`${AppConfig.apiUrl}/permission/permissions`)
    );
  }

  addPermission(item: string): Observable<Permission> {
    let Url = `${AppConfig.apiUrl}/permission/AddPermission`;
    return <Observable<Permission>>(
      this.http
        .post(
          Url,
          this.permissionAdapter.toPermissionAddDto(item),
          httpOptions
        )
    );
  }

  deletePermission(permissionId: number) {
    let Url = `${
      AppConfig.apiUrl
    }/permission/deletePermission?Id=${permissionId}`;
    return <Observable<Permission>>this.http.delete(Url, httpOptions)
  }

  updatePermission(permission: Permission) {
    let Url = `${AppConfig.apiUrl}/permission/updatePermission`;
    return <Observable<Permission>>(
      this.http.put(Url, permission, httpOptions)
    );
  }

  addPermissionToUser(userId: number, permissionId: number) {
    let Url = `${AppConfig.apiUrl}/permission/addPermissionToUser`;
    return <Observable<Permission>>this.http
      .post(
        Url,
        {
          UserId: userId,
          PermissionOrPermissionId: permissionId
        },
        httpOptions
      )
  }

  deletePermissionFromUser(userId: number, permissionId: number) {
    let Url = `${AppConfig.apiUrl}/permission/deletePermissionFromUser`;
    return <Observable<Permission>>this.http
      .post(
        Url,
        {
          UserId: userId,
          PermissionOrPermissionId: permissionId
        },
        httpOptions
      )
  }
}
