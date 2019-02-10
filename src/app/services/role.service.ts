import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../core/services/logger.service";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
// import { Role } from "./role.model";
import { Role } from "../models";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

import { processErrorResponse } from "./utils.service";

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  static stringToRoleAddDto(input: string): any {
    return { RoleName: input };
  }

  static roleToRoleOrPermissionUpdateDto(input: Role): any {
    return { RoleName: input.name };
  }

  private static logError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error);
      LoggerService.log(`${operation} failed: ${error.message}`);

      if (error.status >= 500) {
        throw error;
      }

      return of(result as T);
    };
  }

  getRoles(): Observable<Role[]> {
    return <Observable<Role[]>>(
      this.http.get(`${AppConfig.apiUrl}/role/roles`).pipe(
        tap(e => {
          LoggerService.log(`fetched roles`);
        })
        // catchError(err => {
        //   RoleService.logError("getRoles", []);
        //   return throwError(processErrorResponse(err));
        // })
      )
    );
  }

  addRole(item: string): Observable<Role> {
    let Url = `${AppConfig.apiUrl}/role/AddRole`;
    return <Observable<Role>>(
      this.http
        .post(Url, RoleService.stringToRoleAddDto(item), httpOptions)
        .pipe(
          tap(e => {
            LoggerService.log(`added role`);
          })
          // catchError(err => {
          //   RoleService.logError("addRole", []);
          //   return throwError(processErrorResponse(err));
          // })
        )
    );
  }

  deleteRole(roleId: number) {
    let Url = `${AppConfig.apiUrl}/role/deleteRole?Id=${roleId}`;
    return <Observable<Role>>this.http.delete(Url, httpOptions).pipe(
      tap(e => {
        LoggerService.log(`deleted role`);
      })
      // catchError(err => {
      //   RoleService.logError("deleteRole", []);
      //   return throwError(processErrorResponse(err));
      // })
    );
  }

  updateRole(role: Role) {
    let Url = `${AppConfig.apiUrl}/role/updateRole`;
    return <Observable<Role>>this.http.put(Url, role, httpOptions).pipe(
      tap(e => {
        LoggerService.log(`updated role`);
      })
      // catchError(err => {
      //   RoleService.logError("updateRole", []);
      //   return throwError(processErrorResponse(err));
      // })
    );
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
      .pipe(
        tap(e => {
          LoggerService.log(`added role to user`);
        })
        // catchError(err => {
        //   RoleService.logError("addRoleToUser", []);
        //   return throwError(processErrorResponse(err));
        // })
      );
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
      .pipe(
        tap(e => {
          LoggerService.log(`deleted role from user`);
        })
        // catchError(err => {
        //   RoleService.logError("deleteRoleFromUser", []);
        //   return throwError(processErrorResponse(err));
        // })
      );
  }

  deleteRoleFromArrayOfRoles(roles: Role[], role: Role): Role[] {
    return roles.filter(curRole => {
      return curRole.id !== role.id;
    });
  }
}
