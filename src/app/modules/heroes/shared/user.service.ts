import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../../../core/services/logger.service";
import { AppConfig } from "../../../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
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

  getUsers(): Observable<User[]> {
    return <Observable<User[]>>(
      this.http.get(`${AppConfig.apiUrl}/user/users`).pipe(
        tap(() => LoggerService.log(`fetched users`)),
        catchError(UserService.handleError("getUsers", []))
      )
    );
  }

  getUser(nickname: string): Observable<User[]> {
    let params = new HttpParams().set("userNickname", nickname);
    return <Observable<User[]>>(
      this.http.get(`${AppConfig.apiUrl}/user/user`, { params: params }).pipe(
        tap(() => LoggerService.log(`fetched user ${nickname}`)),
        catchError(UserService.handleError("getUser", []))
      )
    );
  }

  // AddUser(nickname: string): Observable<User[]> {
  //   let params = new HttpParams().set("userNickname", nickname);
  //   return <Observable<User[]>>(
  //     this.http
  //       .post(`${AppConfig.apiUrl}/user/register`, { params: params })
  //       .pipe(
  //         tap(() => LoggerService.log(`registered user ${nickname}`)),
  //         catchError(UserService.handleError("AddUser", []))
  //       )
  //   );
  // }

  AddUser(user: User) {
    console.log(user);

    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/user/register`;
      const headers = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      };
      this.http
        // .post("http://httpbin.org/post", username, headers)
        .post(Url, user.name, headers)
        .toPromise()
        .then(
          res => {
            // console.log(res);
            // debugger;
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
