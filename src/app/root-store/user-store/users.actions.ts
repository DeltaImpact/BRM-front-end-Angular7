import { Action } from "@ngrx/store";
import { User } from "../../models";

export enum ActionTypes {
  SELECT_PERMISSION = "[Users] Select user",
  LOAD_PERMISSIONS_REQUEST = "[Users] Load users request",
  LOAD_PERMISSIONS_SUCCESS = "[Users] Load users success",
  LOAD_PERMISSIONS_FAILURE = "[Users] Load users failure",
  ADD_PERMISSION_REQUEST = "[Users] Add user request",
  ADD_PERMISSION_SUCCESS = "[Users] Add user success",
  ADD_PERMISSION_FAILURE = "[Users] Add user failure",
  REMOVE_PERMISSION_REQUEST = "[Users] Delete user request",
  REMOVE_PERMISSION_SUCCESS = "[Users] Delete user success",
  REMOVE_PERMISSION_FAILURE = "[Users] Delete user failure",
  UPDATE_PERMISSION_REQUEST = "[Users] Update user request",
  UPDATE_PERMISSION_SUCCESS = "[Users] Update user success",
  UPDATE_PERMISSION_FAILURE = "[Users] Update user failure"
}

export class SelectUser implements Action {
  readonly type = ActionTypes.SELECT_PERMISSION;

  constructor(public payload: number) {}
}

export class LoadUsersRequest implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_REQUEST;

  constructor() {}
}

export class LoadUsersSuccess implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class LoadUsersFailure implements Action {
  readonly type = ActionTypes.LOAD_PERMISSIONS_FAILURE;

  constructor(public payload: any) {}
}

export class AddUserRequest implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_REQUEST;

  // constructor(public payload: User) {}
  constructor(public payload: User) {}
}

export class AddUserSuccess implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_SUCCESS;

  constructor(public payload: User) {}
}

export class AddUserFailure implements Action {
  readonly type = ActionTypes.ADD_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export class RemoveUserRequest implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_REQUEST;

  constructor(public payload: number) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_SUCCESS;

  constructor(public payload: User) {}
}

export class RemoveUserFailure implements Action {
  readonly type = ActionTypes.REMOVE_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateUserRequest implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_REQUEST;

  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_SUCCESS;

  constructor(public payload: User) {}
}

export class UpdateUserFailure implements Action {
  readonly type = ActionTypes.UPDATE_PERMISSION_FAILURE;

  constructor(public payload: any) {}
}

export type Action =
  | SelectUser
  | LoadUsersRequest
  | LoadUsersSuccess
  | LoadUsersFailure
  | AddUserRequest
  | AddUserSuccess
  | AddUserFailure
  | RemoveUserRequest
  | RemoveUserSuccess
  | RemoveUserFailure
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure;
