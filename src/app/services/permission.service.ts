import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../core/services/logger.service";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Permission } from "../models";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

import { processErrorResponse } from "./utils.service";

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  constructor(private http: HttpClient) {}

  static stringToPermissionAddDto(input: string): any {
    return { PermissionName: input };
  }

  static permissionToPermissionOrPermissionUpdateDto(input: Permission): any {
    return { PermissionName: input.name };
  }

  private static logError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

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
          PermissionService.stringToPermissionAddDto(item),
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
