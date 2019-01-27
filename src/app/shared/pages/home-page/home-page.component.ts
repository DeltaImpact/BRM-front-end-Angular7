import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../../modules/services/shared/user.service";
import { RoleService } from "../../../modules/services/shared/role.service";
import { PermissionService } from "../../../modules/services/shared/permission.service";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";
import { User } from "src/app/modules/services/shared/user.model";
import { Role } from "src/app/modules/services/shared/role.model";
import { RoleDelete } from "src/app/modules/services/shared/role.delete.model";
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
  newUserForm: FormGroup;
  newRoleForm: FormGroup;
  newPermissionForm: FormGroup;
  error: string;
  @ViewChild("userForm") userForm;
  @ViewChild("roleForm") roleForm;
  @ViewChild("permissionForm") permissionForm;

  constructor(
    private UserService: UserService,
    private RoleService: RoleService,
    private PermissionService: PermissionService,
    private formBuilder: FormBuilder
  ) {
    this.newUserForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });
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
      (user: Array<User>) => {
        this.users = user;
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
      // console.log("Choose user.");
    }
  }

  deleteItem({ item, typeOfItem }: { item: Role; typeOfItem: string }) {
    if (typeOfItem == "role") {
      debugger

    }
    if (typeOfItem == "permission") {
      debugger

    }
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
        this.UpdateChangedUser(r as User);
      },
      e => {
        // debugger;
        this.RoleService.showSnackBar("userAlreadyHaveRole");
        // this.error = "errorHasOcurred";
      }
    );
  }

  addPermissionToUser(userId: number, roleId: number) {
    this.PermissionService.addPermissionToUser(userId, roleId).then(
      r => {
        this.UpdateChangedUser(r as User);
      },
      e => {
        // debugger;
        this.RoleService.showSnackBar("userAlreadyHaveRole");
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeleteRoleFromUser(userId: number, roleId: number) {
    this.RoleService.DeleteRoleFromUser(userId, roleId).then(
      r => {
        this.UpdateChangedUser(r as User);
      },
      e => {
        this.RoleService.showSnackBar("userAlreadyHaveRole");
        // this.error = "errorHasOcurred";
      }
    );
  }

  DeletePermissionFromUser(userId: number, permissionId: number) {
    this.PermissionService.DeletePermissionFromUser(userId, permissionId).then(
      r => {
        this.UpdateChangedUser(r as User);
      },
      e => {
        // this.RoleService.showSnackBar("userAlreadyHavePermission");
        this.error = "errorHasOcurred";
      }
    );
  }

  UpdateChangedUser(user: User) {
    let updatedUser = user as User;
    this.users = this.users.map(function(item) {
      return item.id == updatedUser.id ? updatedUser : item;
    });
  }

  ChooseUser(User: User) {
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
          let newUser = r as User;
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
    // debugger

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
    // debugger

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
