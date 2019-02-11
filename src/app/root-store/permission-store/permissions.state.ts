import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Role } from "../../models";

export const featureAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: model => model.id,
  sortComparer: (a: Role, b: Role): number => b.id - a.id
});

export interface PermissionsState {
  permissions?: Role[];
  isLoadingPermissions: boolean;
  selected?: number;
  errorLoadPermissions?: any;
  errorAddPermission?: any;
  errorRemovePermission?: any;
  errorUpdatePermission?: any;
}

export const initialState: PermissionsState = {
  permissions: [],
  isLoadingPermissions: false,
  selected: null,
  errorLoadPermissions: null,
  errorAddPermission: null,
  errorRemovePermission: null,
  errorUpdatePermission: null
};