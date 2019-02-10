import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { Role } from "src/app/modules/services/shared/role.model";

import { featureAdapter, RolesState } from "./role.state";

export const getIsLoadingRoles = (state: RolesState) => state.isLoadingRoles;
export const getSelected = (state: RolesState) => state.selected;
export const getRoles = (state: RolesState) => state.roles;
export const getError = (RolesState: RolesState): any => RolesState.errorLoadRoles;

// export const selectRolesState: MemoizedSelector<
//   object,
//   RolesState
// > = createFeatureSelector<RolesState>("roles");

// export const selectAllRoleItems: (
//   object: object,
//   RolesState: object
// ) => Role[] = featureAdapter.getSelectors(selectRolesState).selectAll;

export const selectRolesState = createFeatureSelector<RolesState>("roles");
export const getAllRoles = createSelector(
  selectRolesState,
  getRoles
);

export const selectRoleById = (id: number) =>
  createSelector(
    this.selectAllRoleItems,
    (roles: Role[]) => {
      if (roles) {
        return roles.find(p => p.id === id);
      } else {
        return null;
      }
    }
  );

export const selectRolesError: MemoizedSelector<object, any> = createSelector(
  selectRolesState,
  getError
);

export const selectRolesIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectRolesState,
  getIsLoadingRoles
);
