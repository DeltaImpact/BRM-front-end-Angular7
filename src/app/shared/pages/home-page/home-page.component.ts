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
  chosenUser: User = null;
  roles: Role[] = null;
  permissions: Permission[] = null;
  usersLoading: boolean = false;
  rolesLoading: boolean = false;
  permissionsLoading: boolean = false;
  newUserForm: FormGroup;
  newRoleForm: FormGroup;
  newPermissionForm: FormGroup;
  error: string;
  @ViewChild("form") myNgForm;

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

    this.UserService.getUsers().subscribe(
      (user: Array<User>) => {
        this.users = user;
      },
      err => {},
      () => {
        this.usersLoading = false;
      }
    );

    this.RoleService.getRoles().subscribe(
      (roles: Array<Role>) => {
        this.roles = roles;
      },
      err => {},
      () => {
        this.rolesLoading = false;
      }
    );

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

  AddToUser(Role: Role) {
    if (this.chosenUser) {
      let userId = this.chosenUser.id;
      let roleId = Role.id;
      this.RoleService.addRoleToUser(userId, roleId).then(
        r => {
          let updatedUser = r as User;
          this.users = this.users.map(function(item) {
            return item.id == updatedUser.id ? updatedUser : item;
          });
          this.myNgForm.resetForm();
        },
        e => {
          // debugger;
          this.RoleService.showSnackBar("userAlreadyHaveRole");
          // this.error = "errorHasOcurred";
        }
      );
      // debugger;
    } else {
      this.RoleService.showSnackBar("chooseUser");
      // console.log("Choose user.");
    }
  }

  RemoveRoleFromUser(RoleDelete: RoleDelete) {
    let userId = RoleDelete.UserId;
    let roleId = RoleDelete.RoleId;

    this.RoleService.DeleteRoleFromUser(userId, roleId).then(
      r => {
        let updatedUser = r as User;
        this.users = this.users.map(function(item) {
          return item.id == updatedUser.id ? updatedUser : item;
        });
        this.myNgForm.resetForm();
      },
      e => {
        // debugger;
        this.RoleService.showSnackBar("userAlreadyHaveRole");
        // this.error = "errorHasOcurred";
      }
    );
  }

  ChooseUser(User: User) {
    this.chosenUser = User;
    console.log("Chosen user: ");
    console.log(this.chosenUser);
    // debugger;
  }

  createNewUser(newUser: string) {
    if (this.newUserForm.valid) {
      this.UserService.AddUser(new User(newUser))
        .then(
          r => {
            let newUser = r as User;
            this.users = [...this.users, newUser];
            this.myNgForm.resetForm();
          },
          e => {
            this.RoleService.showSnackBar("UserAlreadyExist");
            // this.error = "errorHasOcurred";
          }
        )
        .catch(e => {
          this.RoleService.showSnackBar("UserAlreadyExist");
          // this.error = "errorHasOcurred";
        });
    }
  }

  createNewRole(newRole: string) {
    // debugger

    if (this.newRoleForm.valid) {
      this.RoleService.AddRole(new Role(newRole)).then(
        r => {
          let newRole = r as Role;
          this.roles = [...this.roles, newRole];
          this.myNgForm.resetForm();
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
          this.myNgForm.resetForm();
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
