import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "../../models";

export const featureAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: model => model.id,
  sortComparer: (a: User, b: User): number => b.id - a.id
});

export interface UsersState {
  users?: User[];
  isLoadingUsers: boolean;
  selected?: number;
  errorLoadUsers?: any;
  errorAddUser?: any;
  errorRemoveUser?: any;
  errorUpdateUser?: any;
}

export const initialState: UsersState = {
  users: [],
  isLoadingUsers: false,
  selected: null,
  errorLoadUsers: null,
  errorAddUser: null,
  errorRemoveUser: null,
  errorUpdateUser: null
};