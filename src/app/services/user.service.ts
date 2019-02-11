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

  static userToUserAddDto(input: User): any {
    return {
      Username: input.name,
      RolesId: input.roles.map(item => item.id) || [],
      PermissionsId: input.permissions.map(item => item.id) || []
    };
  }

  static userToUserOrUserUpdateDto(input: User): any {
    return { UserName: input.name };
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

  getUsers(): Observable<User[]> {
    return <Observable<User[]>>(
      this.http.get(`${AppConfig.apiUrl}/user/users`).pipe(
        map((data: any[]) => data.map(item => this.userAdapter.adapt(item)))
      )
    );
  }

  addUser(item: User): Observable<User> {
    let Url = `${AppConfig.apiUrl}/user/register`;
    return <Observable<User>>(
      this.http.post(Url, UserService.userToUserAddDto(item), httpOptions)
    );
  }

  deleteUser(userId: number) {
    let Url = `${AppConfig.apiUrl}/user/deleteUser?Id=${userId}`;
    return <Observable<User>>this.http.delete(Url, httpOptions);
  }

  updateUser(user: User) {
    let Url = `${AppConfig.apiUrl}/user/updateUser`;
    return <Observable<User>>this.http.put(Url, user, httpOptions);
  }
}
