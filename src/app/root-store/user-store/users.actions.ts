import { Action } from "@ngrx/store";
import { User, Role, Permission } from "../../models";

export enum ActionTypes {
  SELECT_USER = "[Users] Select user",
  LOAD_USERS_REQUEST = "[Users] Load users request",
  LOAD_USERS_SUCCESS = "[Users] Load users success",
  LOAD_USERS_FAILURE = "[Users] Load users failure",
  ADD_USER_REQUEST = "[Users] Add user request",
  ADD_USER_SUCCESS = "[Users] Add user success",
  ADD_USER_FAILURE = "[Users] Add user failure",
  REMOVE_USER_REQUEST = "[Users] Delete user request",
  REMOVE_USER_SUCCESS = "[Users] Delete user success",
  REMOVE_USER_FAILURE = "[Users] Delete user failure",
  UPDATE_USER_REQUEST = "[Users] Update user request",
  UPDATE_USER_SUCCESS = "[Users] Update user success",
  UPDATE_USER_FAILURE = "[Users] Update user failure"
}

export class SelectUser implements Action {
  readonly type = ActionTypes.SELECT_USER;

  constructor(public payload: number) {}
}

export class LoadUsersRequest implements Action {
  readonly type = ActionTypes.LOAD_USERS_REQUEST;

  constructor() {}
}

export class LoadUsersSuccess implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class LoadUsersFailure implements Action {
  readonly type = ActionTypes.LOAD_USERS_FAILURE;

  constructor(public payload: any) {}
}

export class AddUserRequest implements Action {
  readonly type = ActionTypes.ADD_USER_REQUEST;

  constructor(public payload: User) {}
}

export class AddUserSuccess implements Action {
  readonly type = ActionTypes.ADD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class AddUserFailure implements Action {
  readonly type = ActionTypes.ADD_USER_FAILURE;

  constructor(public payload: any) {}
}

export class RemoveUserRequest implements Action {
  readonly type = ActionTypes.REMOVE_USER_REQUEST;

  constructor(public payload: number) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = ActionTypes.REMOVE_USER_SUCCESS;

  constructor(public payload: number) {}
}

export class RemoveUserFailure implements Action {
  readonly type = ActionTypes.REMOVE_USER_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateUserRequest implements Action {
  readonly type = ActionTypes.UPDATE_USER_REQUEST;

  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = ActionTypes.UPDATE_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class UpdateUserFailure implements Action {
  readonly type = ActionTypes.UPDATE_USER_FAILURE;

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
