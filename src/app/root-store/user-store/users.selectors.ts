import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { User } from "../../models";
import { featureAdapter, UsersState } from "./users.state";

export const getIsLoadingUsers = (state: UsersState) => state.isLoadingUsers;
export const getSelected = (state: UsersState) => state.selected;
export const getUsers = (state: UsersState) => state.users;
export const getError = (UsersState: UsersState): any =>
  UsersState.errorLoadUsers;

export const selectUsersState = createFeatureSelector<UsersState>("users");
export const getAllUsers = createSelector(
  selectUsersState,
  getUsers
);

export const selectUserById = (id: number) =>
  createSelector(
    getAllUsers,
    (users: User[]) => {
      if (users) {
        return users.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectUsersError: MemoizedSelector<object, any> = createSelector(
  selectUsersState,
  getError
);

export const selectUsersIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectUsersState,
  getIsLoadingUsers
);
