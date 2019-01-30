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
import { Permission } from "./permission.model";
import { Role } from "./role.model";
import { RoleService } from "./role.service";
import { EventEmitter } from "@angular/core";
import { PermissionService } from "./permission.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private RoleService: RoleService
  ) {}

  private _newUser: User = new User({
    id: -1,
    name: "",
    roles: [],
    permissions: []
  });
  newUserChanged: EventEmitter<User> = new EventEmitter();

  set newUser(val: User) {
    this.newUser = val;
    this.newUserChanged.emit(this._newUser);
  }

  changeNicknameOfNewUser(name: string) {
    this._newUser.name = name;
    this.newUserChanged.emit(this._newUser);
  }

  addItemToNewUser(obj: { item: Role; typeOfItem: string }) {
    if (obj.typeOfItem == "role") {
      this._newUser.roles = [...this._newUser.roles, obj.item];
      this.newUserChanged.emit(this._newUser);
    }
    if (obj.typeOfItem == "permission") {
      this._newUser.permissions = [...this._newUser.permissions, obj.item];
      this.newUserChanged.emit(this._newUser);
    }
  }

  get newUser(): User {
    return this._newUser;
  }

  // newUserChangedEmitter() {
  //   return this.newUserChanged;
  // }

  static userToUserAddDto(input: User): any {
    return {
      Username: input.name,
      RolesId: input.roles.map(item => item.id) || [],
      PermissionsId: input.permissions.map(item => item.id) || []
    };
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
  //   let params = new HttpParams().set("username", nickname);
  //   return <Observable<User[]>>(
  //     this.http
  //       .post(`${AppConfig.apiUrl}/user/register`, { params: params })
  //       .pipe(
  //         tap(() => LoggerService.log(`registered user ${nickname}`)),
  //         catchError(UserService.handleError("AddUser", []))
  //       )
  //   );
  // }

  AddUser() {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/user/register`;
      this.http
        .post(
          Url,
          UserService.userToUserAddDto(this._newUser),
          // {
          //   Username: this._newUser.name,
          //   Roles: this._newUser.roles,
          //   Permissions: this._newUser.permissions
          // },
          httpOptions
        )
        .toPromise()
        .then(
          res => {
            resolve(User.fromJS(res));
          },
          err => {
            reject(err);
          }
        );
    });
    return promise;
  }

  DeleteUser(user: User) {
    let promise = new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/user/deleteUser?Id=${user.id}`;
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
    return promise;
  }

  UpdateUser(user: User) {
    return new Promise((resolve, reject) => {
      let Url = `${AppConfig.apiUrl}/user/update`;
      this.http
        .put(Url, user, httpOptions)
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

  deletePermissionFromArray(users: User[], permission: Permission): User[] {
    users = users.map(user => {
      user = this.deletePermissionFromUserObject(user, permission);
      return user;
    });
    return users;
  }

  deletePermissionFromUserObject(user: User, permission: Permission): User {
    user.permissions = user.permissions.filter(curPermission => {
      return curPermission.id !== permission.id;
    });
    return user;
  }

  deleteRoleFromArrayOfUsers(users: User[], role: Role): User[] {
    users = users.map(user => {
      user.roles = this.RoleService.deleteRoleFromArrayOfRoles(
        user.roles,
        role
      );
      // user = this.deleteRole(user, role);
      return user;
    });
    return users;
  }

  deleteRoleFromUserObject(user: User, role: Role): User {
    if (user.roles) {
      user.roles = user.roles.filter(curRole => {
        return curRole.id !== role.id;
      });
      return user;
    }
  }

  deleteRoleFromUserObjectById(user: User, roleId: number): User {
    if (user.roles) {
      user.roles = user.roles.filter(role => {
        return role.id !== roleId;
      });
      return user;
    }
  }

  addRoleToUser(user: User, role: Role): User {
    user.roles = [...user.roles, role];
    return user;
  }

  addPermissionToUser(user: User, permission: Permission): User {
    user.permissions = [...user.permissions, permission];
    return user;
  }
}
