import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, map, tap, finalize } from "rxjs/operators";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { LoggerService } from "../core/services/logger.service";
import { AppConfig } from "../configs/app.config";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { User } from "../models";
import { UserAdapter } from "../adapters/user.adapter";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

import { processErrorResponse } from "./utils.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private userAdapter: UserAdapter) {}

  getUsers(): Observable<User[]> {
    return <Observable<User[]>>(
      this.http
        .get(`${AppConfig.apiUrl}/users`)
        .pipe(
          map((data: any[]) => data.map(item => this.userAdapter.adapt(item)))
        )
    );
  }

  addUser(item: User): Observable<User> {
    let Url = `${AppConfig.apiUrl}/users/user`;
    return <Observable<User>>(
      this.http
        .post(Url, this.userAdapter.toUserAddDto(item), httpOptions)
        .pipe(map((data: User) => this.userAdapter.adapt(data)))
    );
  }

  deleteUser(userId: number) {
    let Url = `${AppConfig.apiUrl}/users/user?Id=${userId}`;
    return <Observable<User>>this.http.delete(Url, httpOptions);
  }

  updateUser(item: User) {
    let Url = `${AppConfig.apiUrl}/users/user`;
    return <Observable<User>>(
      this.http
        .put(Url, this.userAdapter.toUserUpdateDto(item), httpOptions)
        .pipe(map((data: User) => this.userAdapter.adapt(data)))
    );
  }
}
