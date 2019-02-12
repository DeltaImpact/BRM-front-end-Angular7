import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { Permission } from "../../models";

import { featureAdapter, PermissionsState } from "./permissions.state";

export const getIsLoadingPermissions = (state: PermissionsState) =>
  state.isLoadingPermissions;
export const getSelected = (state: PermissionsState) => state.selected;
export const getPermissions = (state: PermissionsState) => state.permissions;
export const getError = (PermissionsState: PermissionsState): any =>
  PermissionsState.errorLoadPermissions;

export const selectPermissionsState = createFeatureSelector<PermissionsState>(
  "permissions"
);
export const getAllPermissions = createSelector(
  selectPermissionsState,
  getPermissions
);

export const selectPermissionById = (id: number) =>
  createSelector(
    getAllPermissions,
    (permissions: Permission[]) => {
      if (permissions) {
        return permissions.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

  export const selectSearchPermissionByName = (name: string) =>
  createSelector(
    getAllPermissions,
    (permission: Permission[]) => {
      if (permission) {
        if (name == "") {
          return permission;
        } else
          return permission.filter(
            perm => perm.name.toLowerCase().indexOf(name) === 0
          );
      } else {
        return null;
      }
    }
  );

export const selectPermissionsError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectPermissionsState,
  getError
);

export const selectPermissionsIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectPermissionsState,
  getIsLoadingPermissions
);
