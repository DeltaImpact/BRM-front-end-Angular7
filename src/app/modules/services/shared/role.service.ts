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

@Injectable({
  providedIn: "root"
})
export class RoleService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

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

  AddRole(role: Role) {
    console.log(role);
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/role/AddRole`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        // .post(
        //   "http://httpbin.org/post",
        //   {
        //     roleName: role.name
        //   },
        //   headers
        // )
        .post(
          Url,
          // role.name,
          {
            roleName: role.name
          },
          headers
        )
        .toPromise()
        .then(
          res => {
            debugger
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
    return promise;
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
        // .post("http://httpbin.org/post", username, headers)
        .post(
          Url,
          {
            UserId: userId,
            RoleId: roleId
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
        // .post("http://httpbin.org/post", username, headers)
        .post(
          Url,
          {
            UserId: userId,
            RoleId: roleId
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

  showSnackBar(name): void {
    this.translateService
      .get(
        [
          String(_("chooseUser")),
          String(_("chooseUserError")),
          String(_("userAlreadyHaveRole")),
          String(_("UserAlreadyExist")),
          String(_("RoleAlreadyExist")),
          String(_("PermissionAlreadyExist")),
          String(_("saved"))
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
