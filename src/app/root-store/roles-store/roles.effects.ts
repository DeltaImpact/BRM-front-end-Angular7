import { Injectable } from "@angular/core";
import { Observable, of, throwError, empty } from "rxjs";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { map, switchMap, catchError, tap, exhaustMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import * as RoleActions from "./roles.actions";
import { ActionTypes } from "./roles.actions";
import { RoleService } from "../../services";
import { Role } from "../../models";
import { SnackBarService } from "../../services/snackBar.service";
import { duration } from "moment";

@Injectable()
export class RolesEffects {
  constructor(
    private actions$: Actions,
    private RoleService: RoleService,
    private snackBarService: SnackBarService
  ) {}

  @Effect()
  loadRoles$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LOAD_ROLES_REQUEST),
    switchMap(() => {
      return this.RoleService.getRoles().pipe(
        map(roles => new RoleActions.LoadRolesSuccess(roles)),
        catchError(error => {
          return of(new RoleActions.LoadRolesFailure(error));
        })
      );
    })
  );

  @Effect()
  addRole$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_ROLE_REQUEST),
    map((action: RoleActions.AddRoleRequest) => action.payload),
    exhaustMap((nickname: string) =>
      this.RoleService.addRole(nickname).pipe(
        map(role => {
          return new RoleActions.AddRoleSuccess(role);
        }),
        catchError(error => of(new RoleActions.AddRoleFailure(error)))
      )
    )
  );

  @Effect()
  addRoleFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_ROLE_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "Role with such name already added.") {
        this.snackBarService.showRoleSnackBar("RoleAlreadyExist");
      } else if (error.payload != "Network Error")
        console.error(error.payload);
      return of({ type: "noop" });
    })
  );

  @Effect()
  deleteRole$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_ROLE_REQUEST),
    map((action: RoleActions.RemoveRoleRequest) => action.payload),
    exhaustMap((obj: number) =>
      this.RoleService.deleteRole(obj).pipe(
        map(id => new RoleActions.RemoveRoleSuccess(id)),
        catchError(error => of(new RoleActions.RemoveRoleFailure(error)))
      )
    )
  );

  @Effect()
  updateRole$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_ROLE_REQUEST),
    map((action: RoleActions.UpdateRoleRequest) => action.payload),
    exhaustMap((role: Role) =>
      this.RoleService.updateRole(role).pipe(
        map(role => {
          return new RoleActions.UpdateRoleSuccess(role);
        }),
        catchError(error => of(new RoleActions.UpdateRoleFailure(error)))
      )
    )
  );

  @Effect()
  updateRoleFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_ROLE_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "Role with such name already added.") {
        this.snackBarService.showRoleSnackBar("RoleAlreadyExist");
      } else if (error.payload != "Network Error")
        console.error(error.payload);
      return of({ type: "noop" });
    })
  );
}
