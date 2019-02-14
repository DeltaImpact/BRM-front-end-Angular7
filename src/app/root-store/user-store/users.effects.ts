import { Injectable } from "@angular/core";
import { Observable, of, throwError, empty } from "rxjs";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { map, switchMap, catchError, tap, exhaustMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import * as UserActions from "./users.actions";
import { ActionTypes } from "./users.actions";
import { UserService, PermissionService, RoleService } from "../../services";
import { User, Role, Permission } from "../../models";
import { SnackBarService } from "../../services/snackBar.service";
import { duration } from "moment";

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private UserService: UserService,
    private PermissionService: PermissionService,
    private RoleService: RoleService,
    private snackBarService: SnackBarService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LOAD_USERS_REQUEST),
    switchMap(() => {
      return this.UserService.getUsers().pipe(
        map(item => new UserActions.LoadUsersSuccess(item)),
        catchError(error => {
          return of(new UserActions.LoadUsersFailure(error));
        })
      );
    })
  );

  @Effect()
  addUser$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_USER_REQUEST),
    map((action: UserActions.AddUserRequest) => action.payload),
    exhaustMap((user: User) =>
      this.UserService.addUser(user).pipe(
        map(item => {
          return new UserActions.AddUserSuccess(item);
        }),
        catchError(error => of(new UserActions.AddUserFailure(error)))
      )
    )
  );

  @Effect()
  addUserFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_USER_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "User with such name already added.") {
        this.snackBarService.showUserSnackBar("UserAlreadyExist");
      } else if (error.payload != "Network Error") console.error(error.payload);
      return of({ type: "noop" });
    })
  );

  @Effect()
  deleteUser$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_USER_REQUEST),
    map((action: UserActions.RemoveUserRequest) => action.payload),
    exhaustMap((toDeleteId: number) =>
      this.UserService.deleteUser(toDeleteId).pipe(
        map(() => new UserActions.RemoveUserSuccess(toDeleteId)),
        catchError(error => of(new UserActions.RemoveUserFailure(error)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_USER_REQUEST),
    map((action: UserActions.UpdateUserRequest) => action.payload),
    exhaustMap((item: User) =>
      this.UserService.updateUser(item).pipe(
        map(item => {
          return new UserActions.UpdateUserSuccess(item);
        }),
        catchError(error => of(new UserActions.UpdateUserFailure(error)))
      )
    )
  );

  @Effect()
  updateUserFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_USER_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "User with such name already added.") {
        this.snackBarService.showUserSnackBar("UserAlreadyExist");
      } else if (error.payload != "Network Error") console.error(error.payload);
      return of({ type: "noop" });
    })
  );
}
