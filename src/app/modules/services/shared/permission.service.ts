import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../../../core/services/logger.service";
import { AppConfig } from "../../../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Permission } from "./permission.model";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  static permissionToPermissionAddDto(input: Permission): any {
    return { PermissionName: input.name };
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

  getPermissions(): Observable<Permission[]> {
    return <Observable<Permission[]>>(
      this.http.get(`${AppConfig.apiUrl}/permission/permissions`).pipe(
        tap(() => LoggerService.log(`fetched permissions`)),
        catchError(PermissionService.handleError("getPermissions", []))
      )
    );
  }

  AddPermission(item: Permission) {
    console.log(item);
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/permission/addPermission`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        .post(
          Url,
          PermissionService.permissionToPermissionAddDto(item),
          // {
          //   PermissionName: role.name
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

  DeletePermission(permissionId: number) {
    return new Promise((resolve, reject) => {
      let Url = `${
        AppConfig.apiUrl
      }/permission/deletePermission?Id=${permissionId}`;
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

  UpdatePermission(permission: Permission) {
    return new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/permission/updatePermission`;
      this.http
        .put(Url, permission, httpOptions)
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

  addPermissionToUser(userId: number, permissionId: number) {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/permission/addPermissionToUser`;
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
            RoleOrPermissionId: permissionId
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

  DeletePermissionFromUser(userId: number, permissionId: number) {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/permission/deletePermissionFromUser`;
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
            RoleOrPermissionId: permissionId
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

  deletePermissionFromArray(
    permissions: Permission[],
    permission: Permission
  ): Permission[] {
    return permissions.filter(curPermission => {
      return curPermission.id !== permission.id;
    });
  }

  showSnackBar(name): void {
    this.translateService
      .get(
        [
          String(_("heroCreated")),
          String(_("saved")),
          String(_("heroLikeMaximum")),
          String(_("heroRemoved"))
        ],
        { value: AppConfig.votesLimit }
      )
      .subscribe(texts => {
        const config: any = new MatSnackBarConfig();
        config.duration = AppConfig.snackBarDuration;
        this.snackBar.open(texts[name], "OK", config);
      });
  }
}