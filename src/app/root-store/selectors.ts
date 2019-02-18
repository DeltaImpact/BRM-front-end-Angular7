import { createSelector, MemoizedSelector } from "@ngrx/store";
import { RolesSelectors } from "./roles-store";
import { PermissionsSelectors } from "./permission-store";
import { UsersSelectors } from "./user-store";

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  RolesSelectors.selectRolesIsLoading,
  PermissionsSelectors.selectPermissionsIsLoading,
  UsersSelectors.selectUsersIsLoading,
  (
    rolesLoading: boolean,
    permissionsLoading: boolean,
    usersLoading: boolean
  ) => {
    return rolesLoading || permissionsLoading || usersLoading;
  }
);
