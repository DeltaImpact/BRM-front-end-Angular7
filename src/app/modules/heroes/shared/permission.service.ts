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

@Injectable({
  providedIn: "root"
})
export class PermissionService {
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

  getPermissions(): Observable<Permission[]> {
    return <Observable<Permission[]>>(
      this.http.get(`${AppConfig.apiUrl}/permission/permissions`).pipe(
        tap(() => LoggerService.log(`fetched permissions`)),
        catchError(PermissionService.handleError("getPermissions", []))
      )
    );
  }

  AddPermission(role: Permission) {
    console.log(role);
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/permission/addPermission`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        // .post("http://httpbin.org/post", username, headers)
        .post(
          Url,
          role.name,
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
