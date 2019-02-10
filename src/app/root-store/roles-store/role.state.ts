import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Role } from "../../models";

export const featureAdapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: model => model.id,
  sortComparer: (a: Role, b: Role): number => b.id - a.id
});

export interface RolesState {
  roles?: Role[];
  isLoadingRoles: boolean;
  selected?: number;
  errorLoadRoles?: any;
  errorAddRole?: any;
  errorRemoveRole?: any;
  errorUpdateRole?: any;
}

export const initialState: RolesState = {
  roles: [],
  isLoadingRoles: false,
  selected: null,
  errorLoadRoles: null,
  errorAddRole: null,
  errorRemoveRole: null,
  errorUpdateRole: null
};

// export interface State extends EntityState<Role> {
//   roles: Role[];
//   isLoadingRoles: boolean;
//   selected: number;
// }

// export const initialState: State = featureAdapter.getInitialState({
//   roles: [],
//   isLoadingRoles: false,
//   selected: null
// });
