import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Observable, of, empty } from "rxjs";
import { take, finalize, catchError, map, tap } from "rxjs/operators";

import { jsonpCallbackContext } from "@angular/common/http/src/module";

import { Role, Permission, User } from "../../../models";
import { SnackBarService } from "../../../services";
import { Store } from "@ngrx/store";

import {
  RootStoreState,
  RootStoreSelectors,
  RootStoreModule,
  RolesActions,
  RolesSelectors,
  PermissionsActions,
  PermissionsSelectors,
  UsersActions,
  UsersSelectors
} from "../../../root-store";

// import { Role } from "src/app/modules/services/shared/role.model";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  animations: [UtilsHelperService.fadeInOut()]
})
export class HomePageComponent implements OnInit {
  users$: Observable<User[]> = null;
  roles$: Observable<Role[]> = null;
  permissions$: Observable<Permission[]> = null;

  chosenUserId: number = null;
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
    private store$: Store<RootStoreState.State>,
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
    this.store$.dispatch(new RolesActions.LoadRolesRequest());
    this.store$.dispatch(new PermissionsActions.LoadPermissionsRequest());
    this.store$.dispatch(new UsersActions.LoadUsersRequest());
    this.roles$ = this.store$.select<Role[]>(RolesSelectors.getAllRoles);
    this.permissions$ = this.store$.select<Permission[]>(
      PermissionsSelectors.getAllPermissions
    );
    this.users$ = this.store$.select<User[]>(UsersSelectors.getAllUsers);
    // let asd = this.store$
    //   .select<Role[]>(RolesSelectors.getAllRoles)
    //   .subscribe(state => {
    //     console.log(state);
    //     debugger;
    //   });
    // this.permissionForm.resetForm();
  }

  AddToUser(obj: { item: Role; typeOfItem: string }) {
    // if (this.chosenUserId) {
    //   if (this.chosenUserId == -1) {
    //     // this.addItemToCreateNewUserForm.emit(obj);
    //     this.UserService.addItemToNewUser(obj);
    //     // debugger;
    //   } else {
    //     if (obj.typeOfItem == "role") {
    //       this.addRoleToUser(this.chosenUserId, obj.item.id);
    //     }
    //     if (obj.typeOfItem == "permission") {
    //       this.addPermissionToUser(this.chosenUserId, obj.item.id);
    //     }
    //   }
    // } else {
    //   this.SnackBarService.showRoleSnackBar("chooseUserError");
    // }
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
    debugger;
    // this.RoleService.addRoleToUser(userId, roleId).then(
    //   r => {
    //     let responseObject = r as { role: Role; user: User };
    //     this.addRoleToUserOnView(userId, responseObject.role);
    //   },
    //   e => {
    //     if (e.error) {
    //       if (e.error.message == "User already have role.") {
    //         this.RoleService.showSnackBar("userAlreadyHaveRole");
    //       }
    //     }
    //     // this.error = "errorHasOcurred";
    //   }
    // );
  }

  addPermissionToUser(userId: number, roleId: number) {
    debugger;
    // this.PermissionService.addPermissionToUser(userId, roleId).then(
    //   r => {
    //     let responseObject = r as { role: Role; permission: Permission };
    //     this.AddUserPermissionOnView(userId, responseObject.permission);
    //   },
    //   e => {
    //     if (e.error) {
    //       if (e.error.message == "User already have permission.") {
    //         this.SnackBarService.showRoleSnackBar("userAlreadyHavePermission");
    //       }
    //     }
    //     // this.error = "errorHasOcurred";
    //   }
    // );
  }

  DeleteRoleFromUser(userId: number, roleId: number) {
    debugger;
    // this.RoleService.DeleteRoleFromUser(userId, roleId).then(
    //   r => {
    //     this.DeleteUserRoleOnView(userId, roleId);
    //   },
    //   e => {
    //     // this.error = "errorHasOcurred";
    //   }
    // );
  }

  DeletePermissionFromUser(userId: number, permissionId: number) {
    debugger;
    // this.PermissionService.DeletePermissionFromUser(userId, permissionId).then(
    //   r => {
    //     this.DeleteUserPermissionOnView(userId, permissionId);
    //   },
    //   e => {
    //     // this.RoleService.showSnackBar("userAlreadyHavePermission");
    //     this.error = "errorHasOcurred";
    //   }
    // );
  }

  ChooseUserOnViewById(UserId: number) {
    if (UserId != this.chosenUserId) {
      this.chosenUserId = UserId;
    } else {
      this.chosenUserId = null;
    }
  }

  createNewUser(user: User) {
    debugger;
    // this.store$.dispatch(new UsersActions.AddUserRequest(user));
  }

  createNewRole(newRoleForm: any) {
    if (this.newRoleForm.valid) {
      this.store$.dispatch(new RolesActions.AddRoleRequest(newRoleForm.name));
    }
  }

  createNewPermission(newPermission: any) {
    if (this.newPermissionForm.valid) {
      this.store$.dispatch(
        new PermissionsActions.AddPermissionRequest(newPermission.name)
      );
    }
  }

  RemoveUser(user: User) {
    this.store$.dispatch(new UsersActions.RemoveUserRequest(user.id));
  }

  deleteItem({ item, typeOfItem }: { item: Role; typeOfItem: string }) {
    if (typeOfItem == "role") {
      this.store$.dispatch(new RolesActions.RemoveRoleRequest(item.id));
    }
    if (typeOfItem == "permission") {
      this.store$.dispatch(
        new PermissionsActions.RemovePermissionRequest(item.id)
      );
    }
  }

  UpdateUser(item: User) {
    this.store$.dispatch(new UsersActions.UpdateUserRequest(item));
  }

  changeItem({ item, typeOfItem }: { item: Role; typeOfItem: string }) {
    if (typeOfItem == "role") {
      this.store$.dispatch(new RolesActions.UpdateRoleRequest(item));
    }
    if (typeOfItem == "permission") {
      this.store$.dispatch(
        new PermissionsActions.UpdatePermissionRequest(item)
      );
    }
  }
}
