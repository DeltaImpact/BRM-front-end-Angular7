import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { Permission } from "src/app/modules/services/shared/permission.model";

import { featureAdapter, PermissionsState } from "./permissions.state";

export const getIsLoadingPermissions = (state: PermissionsState) => state.isLoadingPermissions;
export const getSelected = (state: PermissionsState) => state.selected;
export const getPermissions = (state: PermissionsState) => state.permissions;
export const getError = (PermissionsState: PermissionsState): any => PermissionsState.errorLoadPermissions;

export const selectPermissionsState = createFeatureSelector<PermissionsState>("permissions");
export const getAllPermissions = createSelector(
  selectPermissionsState,
  getPermissions
);

export const selectPermissionById = (id: number) =>
  createSelector(
    this.selectAllPermissionItems,
    (permissions: Permission[]) => {
      if (permissions) {
        return permissions.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectPermissionsError: MemoizedSelector<object, any> = createSelector(
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
