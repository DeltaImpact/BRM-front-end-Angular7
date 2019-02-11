import { Injectable } from "@angular/core";
import { Observable, of, throwError, empty } from "rxjs";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { map, switchMap, catchError, tap, exhaustMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import * as PermissionActions from "./permissions.actions";
import { ActionTypes } from "./permissions.actions";
import { PermissionService } from "../../services";
import { Permission } from "../../models";
import { SnackBarService } from "../../services/snackBar.service";
import { duration } from "moment";

@Injectable()
export class PermissionsEffects {
  constructor(
    private actions$: Actions,
    private PermissionService: PermissionService,
    private snackBarService: SnackBarService
  ) {}

  @Effect()
  loadPermissions$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LOAD_PERMISSIONS_REQUEST),
    switchMap(() => {
      return this.PermissionService.getPermissions().pipe(
        map(item => new PermissionActions.LoadPermissionsSuccess(item)),
        catchError(error => {
          return of(new PermissionActions.LoadPermissionsFailure(error));
        })
      );
    })
  );

  @Effect()
  addPermission$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_PERMISSION_REQUEST),
    map((action: PermissionActions.AddPermissionRequest) => action.payload),
    exhaustMap((nickname: string) =>
      this.PermissionService.addPermission(nickname).pipe(
        map(item => {
          return new PermissionActions.AddPermissionSuccess(item);
        }),
        catchError(error => of(new PermissionActions.AddPermissionFailure(error)))
      )
    )
  );

  @Effect()
  addPermissionFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.ADD_PERMISSION_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "Permission with such name already added.") {
        this.snackBarService.showPermissionSnackBar("PermissionAlreadyExist");
      } else if (error.payload != "Network Error")
        console.error(error.payload);
      return of({ type: "noop" });
    })
  );

  @Effect()
  deletePermission$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_PERMISSION_REQUEST),
    map((action: PermissionActions.RemovePermissionRequest) => action.payload),
    exhaustMap((toDeleteId: number) =>
      this.PermissionService.deletePermission(toDeleteId).pipe(
        map(DeletedId => new PermissionActions.RemovePermissionSuccess(DeletedId)),
        catchError(error => of(new PermissionActions.RemovePermissionFailure(error)))
      )
    )
  );

  @Effect()
  updatePermission$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_PERMISSION_REQUEST),
    map((action: PermissionActions.UpdatePermissionRequest) => action.payload),
    exhaustMap((item: Permission) =>
      this.PermissionService.updatePermission(item).pipe(
        map(item => {
          return new PermissionActions.UpdatePermissionSuccess(item);
        }),
        catchError(error => of(new PermissionActions.UpdatePermissionFailure(error)))
      )
    )
  );

  @Effect()
  updatePermissionFailure$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.UPDATE_PERMISSION_FAILURE),
    switchMap((error: any) => {
      if (error.payload.message == "Permission with such name already added.") {
        this.snackBarService.showPermissionSnackBar("PermissionAlreadyExist");
      } else if (error.payload != "Network Error")
        console.error(error.payload);
      return of({ type: "noop" });
    })
  );
}
