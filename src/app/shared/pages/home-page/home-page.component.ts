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

import { Role, Permission, User } from "../../../models";
import { SnackBarService } from "../../../services";
import { Store } from "@ngrx/store";

import {
  RootStoreState,
  RolesActions,
  RolesSelectors,
  PermissionsActions,
  PermissionsSelectors,
  UsersActions,
  UsersSelectors
} from "../../../root-store";

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
    private formBuilder: FormBuilder,
    private SnackBarService: SnackBarService
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
