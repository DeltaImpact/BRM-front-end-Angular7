import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { UserService } from "../../../modules/services/shared/user.service";
import { RoleService } from "../../../modules/services/shared/role.service";
import { PermissionService } from "../../../modules/services/shared/permission.service";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";
import { User } from "src/app/modules/services/shared/user.model";
import { Role } from "src/app/modules/services/shared/role.model";
import { Permission } from "src/app/modules/services/shared/permission.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag
} from "@angular/cdk/drag-drop";
import { jsonpCallbackContext } from "@angular/common/http/src/module";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  animations: [UtilsHelperService.fadeInOut()]
})
export class HomePageComponent implements OnInit {
  users: User[] = null;
  chosenUserId: number = null;
  roles: Role[] = null;
  permissions: Permission[] = null;
  usersLoading: boolean = false;
  rolesLoading: boolean = false;
  permissionsLoading: boolean = false;

  newRoleForm: FormGroup;
  newPermissionForm: FormGroup;
  error: string;
  @ViewChild("roleForm") roleForm;
  @ViewChild("permissionForm") permissionForm;

  @Output() addItemToCreateNewUserForm = new EventEmitter<any>();

  constructor(
    private UserService: UserService,
    private RoleService: RoleService,
    private PermissionService: PermissionService,
    private formBuilder: FormBuilder
  ) {
    this.newRoleForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
    this.newPermissionForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.usersLoading = true;
    this.rolesLoading = true;
    this.permissionsLoading = true;

    this.loadUsers();
    this.loadRoles();
    this.loadPermissions();
  }

  loadUsers() {
    this.UserService.getUsers().subscribe(
      (users: Array<User>) => {
        this.users = users.map(e => User.fromJS(e));
      },
      err => {},
      () => {
        this.usersLoading = false;
      }
    );
  }

  loadRoles() {
    this.RoleService.getRoles().subscribe(
      (roles: Array<Role>) => {
        this.roles = roles;
      },
      err => {},
      () => {
        this.rolesLoading = false;
      }
    );
  }

  loadPermissions() {
    this.PermissionService.getPermissions().subscribe(
      (permissions: Array<Permission>) => {
        this.permissions = permissions;
      },
      err => {},
      () => {
        this.permissionsLoading = false;
      }
    );
  }

  AddToUser(obj: { item: Role; typeOfItem: string }) {
    if (this.chosenUserId) {
      if (obj.typeOfItem == "role") {
        this.addRoleToUser(this.chosenUserId, obj.item.id);
      }
      if (obj.typeOfItem == "permission") {
        this.addPermissionToUser(this.chosenUserId, obj.item.id);
      }
    } else {
      this.RoleService.showSnackBar("chooseUserError");
    }
  }

  deleteItem({ item, typeOfItem }: { item: Role; typeOfItem: string }) {
    if (typeOfItem == "role") {
      this.DeleteRole(item.id);
    }
    if (typeOfItem == "permission") {
      this.DeletePermission(item.id);
    }
  }

  RemoveUser(user: User) {
    this.UserService.DeleteUser(user).then(
      r => {
        this.DeleteUserOnView(user);
      },
      e => {
        // this.RoleService.showSnackBar("userAlreadyHavePermission");
        this.error = "errorHasOcurred";
      }
    );
  }

  changeItem({ item, typeOfItem }: { item: Role; typeOfItem: string }) {
    debugger;
    if (typeOfItem == "role") {
      this.UpdateRole(item);
    }
    if (typeOfItem == "permission") {
      this.UpdatePermission(item);
    }
  }

  UpdateRole(item: Role) {
    this.RoleService.UpdateRole(item).then(
      r => {
        let responseObject = r as Role;
        this.UpdateRoleOnView(responseObject);
      },
      e => {
        // this.error = "errorHasOcurred";
      }
    );
  }

  UpdateRoleOnView(role: Role) {
    this.roles = this.roles.map(function(item) {
      if (item.id == role.id) item.name = role.name;
      return item;
    });
    this.UpdateRoleInUsersOnView(role);
  }

  UpdateRoleInUsersOnView(role: Role) {
    this.users = this.users.map(function(user) {
      user.roles = user.roles.map(function(item) {
        if (item.id == role.id) item.name = role.name;
        return item;
      });
      return user;
    });
  }

  UpdatePermission(item: Permission) {
    this.PermissionService.UpdatePermission(item).then(
      r => {
        let responseObject = r as Permission;
        this.UpdatePermissionOnView(responseObject);
      },
      e => {
        // this.error = "errorHasOcurred";
      }
    );
  }

  UpdatePermissionOnView(item: Permission) {
    this.roles = this.roles.map(function(item) {
      if (item.id == item.id) item.name = item.name;
      return item;
    });
    this.UpdatePermissionInUsersOnView(item);
  }

  UpdatePermissionInUsersOnView(item: Permission) {
    this.users = this.users.map(function(user) {
      user.roles = user.roles.map(function(item) {
        if (item.id == item.id) item.name = item.name;
        return item;
      });
      return user;
    });
  }

  UpdateUser(item: User) {
    this.UserService.UpdateUser(item).then(
      r => {
        let responseObject = r as any;
        this.users = this.users.map(function(user) {
          if (user.id == responseObject.id) user.name = responseObject.Username;
          return user;
        });
      },
      e => {
        if (e.error.message == "User with same nickname already exist.") {
          this.RoleService.showSnackBar("UserAlreadyExist");
        }

        // this.error = "errorHasOcurred";
      }
    );
  }

  DeleteRole(id: number) {
    this.RoleService.DeleteRole(id).then(
      r => {
        let responseObject = r as Role;
        this.DeleteRoleOnView(responseObject);
      },
      e => {
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeleteRoleOnView(role: Role) {
    this.roles = this.RoleService.deleteRoleFromArrayOfRoles(this.roles, role);
    this.users = this.UserService.deleteRoleFromArrayOfUsers(this.users, role);
  }

  DeletePermission(id: number) {
    this.PermissionService.DeletePermission(id).then(
      r => {
        let responseObject = r as Permission;
        this.DeletePermissionOnView(responseObject);
      },
      e => {
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeletePermissionOnView(permission: Permission) {
    this.permissions = this.PermissionService.deletePermissionFromArray(
      this.permissions,
      permission
    );
    this.users = this.UserService.deletePermissionFromArray(
      this.users,
      permission
    );
  }

  RemoveRoleFrom({
    role,
    user,
    typeOfItem
  }: {
    role: Role;
    user: User;
    typeOfItem: string;
  }) {
    if (typeOfItem == "role") {
      this.DeleteRoleFromUser(user.id, role.id);
    }
    if (typeOfItem == "permission") {
      this.DeletePermissionFromUser(user.id, role.id);
    }
  }

  addRoleToUser(userId: number, roleId: number) {
    this.RoleService.addRoleToUser(userId, roleId).then(
      r => {
        let responseObject = r as { role: Role; user: User };
        this.addRoleToUserOnView(userId, responseObject.role);
      },
      e => {
        if (e.error) {
          if (e.error.message == "User already have role.") {
            this.RoleService.showSnackBar("userAlreadyHaveRole");
          }
        }
        // this.error = "errorHasOcurred";
      }
    );
  }

  addPermissionToUser(userId: number, roleId: number) {
    this.PermissionService.addPermissionToUser(userId, roleId).then(
      r => {
        let responseObject = r as { role: Role; permission: Permission };
        this.AddUserPermissionOnView(userId, responseObject.permission);
      },
      e => {
        if (e.error) {
          if (e.error.message == "User already have permission.") {
            this.RoleService.showSnackBar("userAlreadyHavePermission");
          }
        }
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeleteRoleFromUser(userId: number, roleId: number) {
    this.RoleService.DeleteRoleFromUser(userId, roleId).then(
      r => {
        this.DeleteUserRoleOnView(userId, roleId);
      },
      e => {
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeletePermissionFromUser(userId: number, permissionId: number) {
    this.PermissionService.DeletePermissionFromUser(userId, permissionId).then(
      r => {
        this.DeleteUserPermissionOnView(userId, permissionId);
      },
      e => {
        // this.RoleService.showSnackBar("userAlreadyHavePermission");
        this.error = "errorHasOcurred";
      }
    );
  }

  DeleteUserOnView(user: User) {
    this.users = this.users.filter(curUser => {
      return curUser.id !== user.id;
    });
  }

  addRoleToUserOnView(userId: number, role: Role) {
    this.users = this.users.map(function(user) {
      if (user.id == userId) {
        this.UserService.addRoleFromUserObject(user, role);
      } else return user;
    });
  }

  AddUserPermissionOnView(userId: number, permission: Permission) {
    this.users = this.users.map(function(user) {
      if (user.id == userId) {
        this.UserService.addPermissionToUser(user, permission);
      } else return user;
    });
  }

  DeleteUserRoleOnView(userId: number, roleId: number) {
    this.users = this.users.map(function(user) {
      if (user.id == userId) {
        user = this.UserService.deleteRoleFromUserObjectById(user, roleId);
        return user;
      } else return user;
    });
  }

  DeleteUserPermissionOnView(userId: number, permissionId: number) {
    this.users = this.users.map(function(user) {
      if (user.id == userId) {
        user.permissions = user.permissions.filter(permission => {
          return permission.id !== permissionId;
        });
        return user;
      } else return user;
    });
  }

  UpdateChangedUserOnView(user: User) {
    let updatedUser = user as User;
    this.users = this.users.map(function(item) {
      return item.id == updatedUser.id ? updatedUser : item;
    });
  }

  ChooseUserOnView(User: User) {
    if (User.id != this.chosenUserId) {
      this.chosenUserId = User.id;
    } else {
      this.chosenUserId = null;
    }
  }

  createNewUser(newUser: string) {
    if (this.newUserForm.valid) {
      this.UserService.AddUser(new User(newUser)).then(
        r => {
          // let newUser = r;
          let responseObject = r as any;
          let  newUser = responseObject as User;
          newUser.id = responseObject.id;
          newUser.name = responseObject.userName;
          newUser.roles = [];
          newUser.permissions = [];
          this.users = [...this.users, newUser];
          this.userForm.resetForm();
        },
        e => {
          this.RoleService.showSnackBar("UserAlreadyExist");
          // this.error = "errorHasOcurred";
        }
      );
    }
  }

  createNewRole(newRole: string) {
    if (this.newRoleForm.valid) {
      this.RoleService.AddRole(new Role(newRole)).then(
        r => {
          let newRole = r as Role;
          this.roles = [...this.roles, newRole];
          this.roleForm.resetForm();
        },
        e => {
          this.RoleService.showSnackBar("RoleAlreadyExist");
          // this.error = "errorHasOcurred";
        }
      );
    }
  }

  createNewPermission(newPermission: string) {
    if (this.newPermissionForm.valid) {
      this.PermissionService.AddPermission(new Permission(newPermission)).then(
        r => {
          let newPermission = r as Permission;
          this.permissions = [...this.permissions, newPermission];
          this.permissionForm.resetForm();
        },
        e => {
          // debugger;
          this.RoleService.showSnackBar("PermissionAlreadyExist");
          // this.error = "errorHasOcurred";
        }
      );
    }
  }
}
