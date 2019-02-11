import { Action } from "@ngrx/store";
import { Permission } from "../../models";

export enum ActionTypes {
  SELECT_PERMISSION = "[Permissions] Select role",
  LOAD_PERMISSIONS_REQUEST = "[Permissions] Load roles request",
  LOAD_PERMISSIONS_SUCCESS = "[Permissions] Load roles success",
  LOAD_PERMISSIONS_FAILURE = "[Permissions] Load roles failure",
  ADD_PERMISSION_REQUEST = "[Permissions] Add role request",
  ADD_PERMISSION_SUCCESS = "[Permissions] Add role success",
  ADD_PERMISSION_FAILURE = "[Permissions] Add role failure",
  REMOVE_PERMISSION_REQUEST = "[Permissions] Delete role request",
  REMOVE_PERMISSION_SUCCESS = "[Permissions] Delete role success",
  REMOVE_PERMISSION_FAILURE = "[Permissions] Delete role failure",
  UPDATE_PERMISSION_REQUEST = "[Permissions] Update role request",
  UPDATE_PERMISSION_SUCCESS = "[Permissions] Update role success",
  UPDATE_PERMISSION_FAILURE = "[Permissions] Update role failure"
}

export class SelectPermission implements Action {
  readonly type = ActionTypes.SELECT_PERMISSION;

  constructor(public payload: number) {}
}

export class LoadPermissionsRequest implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_REQUEST;

  constructor() {}
}

export class LoadPermissionsSuccess implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_SUCCESS;
  constructor(public payload: Permission[]) {}
}

export class LoadPermissionsFailure implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_FAILURE;

  constructor(public payload: any) {}
}

export class AddPermissionRequest implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_REQUEST;

  // constructor(public payload: Permission) {}
  constructor(public payload: string) {}
}

export class AddPermissionSuccess implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_SUCCESS;

  constructor(public payload: Permission) {}
}

export class AddPermissionFailure implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export class RemovePermissionRequest implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_REQUEST;

  constructor(public payload: number) {}
}

export class RemovePermissionSuccess implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_SUCCESS;

  constructor(public payload: Permission) {}
}

export class RemovePermissionFailure implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export class UpdatePermissionRequest implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_REQUEST;

  constructor(public payload: Permission) {}
}

export class UpdatePermissionSuccess implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_SUCCESS;

  constructor(public payload: Permission) {}
}

export class UpdatePermissionFailure implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export type Action =
  | SelectPermission
  | LoadPermissionsRequest
  | LoadPermissionsSuccess
  | LoadPermissionsFailure
  | AddPermissionRequest
  | AddPermissionSuccess
  | AddPermissionFailure
  | RemovePermissionRequest
  | RemovePermissionSuccess
  | RemovePermissionFailure
  | UpdatePermissionRequest
  | UpdatePermissionSuccess
  | UpdatePermissionFailure;
