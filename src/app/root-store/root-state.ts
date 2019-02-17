import { RolesState } from "./roles-store/roles.state";
import { PermissionsState } from "./permission-store/permissions.state";
import { UsersState } from "./user-store/users.state";

export interface State {
  roles: RolesState;
  permissions: PermissionsState;
  users: UsersState;
}
