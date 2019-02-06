import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../../../core/services/logger.service";
import { AppConfig } from "../../../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Role } from "./role.model";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  static roleToRoleAddDto(input: Role): any {
    return {RoleName: input.name};
  }

  static roleToRoleOrPermissionUpdateDto(input: Role): any {
    return {RoleName: input.name};
  }

  private static handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
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
        tap(() => LoggerService.log(`fetched roles`)),
        catchError(RoleService.handleError("getRoles", []))
      )
    );
  }

  AddRole(item: Role) {
    const headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/AddRole`;
      this.http
        .post(
          Url,
          RoleService.roleToRoleAddDto(item),
          // {
          //   roleName: role.name
          // },
          headers
        )
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return promise;
  }

  DeleteRole(roleId: number) {
    return new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/deleteRole?Id=${roleId}`;
      this.http
        .delete(Url, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  UpdateRole(role: Role) {
    return new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/updateRole`;
      this.http
        .put(Url, role, httpOptions)
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  addRoleToUser(userId: number, roleId: number) {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/addRoleToUser`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        .post(
          Url,
          {
            UserId: userId,
            RoleOrPermissionId: roleId
          },
          headers
        )
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return promise;
  }

  DeleteRoleFromUser(userId: number, roleId: number) {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/deleteRoleFromUser`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        .post(
          Url,
          {
            UserId: userId,
            RoleOrPermissionId: roleId
          },
          headers
        )
        .toPromise()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return promise;
  }

  deleteRoleFromArrayOfRoles(roles: Role[], role: Role): Role[] {
    return roles.filter(curRole => {
      return curRole.id !== role.id;
    });
  }
}
