import { Action } from "@ngrx/store";
import { Role } from "../../models";

export enum ActionTypes {
  SELECT_ROLE = "[Roles] Select role",
  LOAD_ROLES_REQUEST = "[Roles] Load roles request",
  LOAD_ROLES_SUCCESS = "[Roles] Load roles success",
  LOAD_ROLES_FAILURE = "[Roles] Load roles failure",
  ADD_ROLE_REQUEST = "[Roles] Add role request",
  ADD_ROLE_SUCCESS = "[Roles] Add role success",
  ADD_ROLE_FAILURE = "[Roles] Add role failure",
  REMOVE_ROLE_REQUEST = "[Roles] Delete role request",
  REMOVE_ROLE_SUCCESS = "[Roles] Delete role success",
  REMOVE_ROLE_FAILURE = "[Roles] Delete role failure",
  UPDATE_ROLE_REQUEST = "[Roles] Update role request",
  UPDATE_ROLE_SUCCESS = "[Roles] Update role success",
  UPDATE_ROLE_FAILURE = "[Roles] Update role failure"
}

export class SelectRole implements Action {
  readonly type = ActionTypes.SELECT_ROLE;

  constructor(public payload: number) {}
}

export class LoadRolesRequest implements Action {
  readonly type = ActionTypes.LOAD_ROLES_REQUEST;

  constructor() {}
}

export class LoadRolesSuccess implements Action {
  readonly type = ActionTypes.LOAD_ROLES_SUCCESS;
  constructor(public payload: Role[]) {}
}

export class LoadRolesFailure implements Action {
  readonly type = ActionTypes.LOAD_ROLES_FAILURE;

  constructor(public payload: any) {}
}

export class AddRoleRequest implements Action {
  readonly type = ActionTypes.ADD_ROLE_REQUEST;

  // constructor(public payload: Role) {}
  constructor(public payload: string) {}
}

export class AddRoleSuccess implements Action {
  readonly type = ActionTypes.ADD_ROLE_SUCCESS;

  constructor(public payload: Role) {}
}

export class AddRoleFailure implements Action {
  readonly type = ActionTypes.ADD_ROLE_FAILURE;

  constructor(public payload: any) {}
}

export class RemoveRoleRequest implements Action {
  readonly type = ActionTypes.REMOVE_ROLE_REQUEST;

  constructor(public payload: number) {}
}

export class RemoveRoleSuccess implements Action {
  readonly type = ActionTypes.REMOVE_ROLE_SUCCESS;

  constructor(public payload: Role) {}
}

export class RemoveRoleFailure implements Action {
  readonly type = ActionTypes.REMOVE_ROLE_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateRoleRequest implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_REQUEST;

  constructor(public payload: Role) {}
}

export class UpdateRoleSuccess implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_SUCCESS;

  constructor(public payload: Role) {}
}

export class UpdateRoleFailure implements Action {
  readonly type = ActionTypes.UPDATE_ROLE_FAILURE;

  constructor(public payload: any) {}
}

export type Action =
  | SelectRole
  | LoadRolesRequest
  | LoadRolesSuccess
  | LoadRolesFailure
  | AddRoleRequest
  | AddRoleSuccess
  | AddRoleFailure
  | RemoveRoleRequest
  | RemoveRoleSuccess
  | RemoveRoleFailure
  | UpdateRoleRequest
  | UpdateRoleSuccess
  | UpdateRoleFailure;
