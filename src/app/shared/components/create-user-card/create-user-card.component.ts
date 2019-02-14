import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { AppConfig } from "../../../configs/app.config";
import { Role, User, Permission } from "../../../models";
import { UserService } from "../../../services";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {
  RootStoreState,
  RolesActions,
  RolesSelectors,
  PermissionsActions,
  PermissionsSelectors,
  UsersActions,
  UsersSelectors
} from "../../../root-store";
import { Store } from "@ngrx/store";
import { Observable, of, throwError, empty } from "rxjs";

@Component({
  selector: "app-create-user-card",
  templateUrl: "./create-user-card.component.html",
  styleUrls: ["./create-user-card.component.scss"]
})
export class CreateUserCardComponent implements OnInit {
  user: User = { id: 0, name: "", roles: [], permissions: [] };
  newUserForm: FormGroup;

  rolesControl = new FormControl();
  permissionsControl = new FormControl();

  changeNameError: string = null;
  addRoleError: string = null;
  addPermissionsError: string = null;

  filteredRoles: Observable<Role[]>;
  filteredPermissions: Observable<Permission[]>;

  roleNameForFilter: string = "";
  permissionNameForFilter: string = "";
  @ViewChild("userForm") userForm;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>
  ) {
    this.user = { id: 0, name: "", roles: [], permissions: [] };

    this.newUserForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });

    this.rolesControl.valueChanges
      .pipe(startWith(""))
      .subscribe((state: string) => {
        this.roleNameForFilter = state;
        if (state == null) this.roleNameForFilter = "";
        this.filteredRoles = this.store$
          .select<Role[]>(
            RolesSelectors.selectSearchRoleByName(this.roleNameForFilter)
          )
          .pipe(
            map(allItems => {
              let userRolesIds = this.user.roles.map(item => item.id);
              return allItems.filter(
                item => -1 === userRolesIds.indexOf(item.id)
              );
            })
          );
      });

    this.permissionsControl.valueChanges
      .pipe(startWith(""))
      .subscribe((state: string) => {
        this.permissionNameForFilter = state;
        if (state == null) this.permissionNameForFilter = "";
        this.filteredPermissions = this.store$
          .select<Permission[]>(
            PermissionsSelectors.selectSearchPermissionByName(
              this.permissionNameForFilter
            )
          )
          .pipe(
            map(item => {
              let userPermissionsIds = this.user.permissions.map(
                item => item.id
              );
              return item.filter(
                item => -1 === userPermissionsIds.indexOf(item.id)
              );
            })
          );
      });
  }

  ngOnInit() {
    this.newUserForm.valueChanges.subscribe(changes => {
      if (changes.name) {
        this.user.name = changes.name;
      }
    });
  }

  createNewUser(newUser: any) {
    if (this.newUserForm.valid) {
      let obj = newUser as User;
      this.user.name = obj.name;
      this.store$.dispatch(new UsersActions.AddUserRequest(this.user));
      this.user.name = "";
      this.user.roles = [];
      this.user.permissions = [];
      // debugger;
      // new UsersActions.AddUserRequest(this.user);
      // this.userForm.resetForm();
    }
  }

  addRole() {
    this.filteredRoles.subscribe(r => {
      let roleToAdd = r.find(x => x.name == this.roleNameForFilter);
      // debugger
      if (roleToAdd) {
        if (this.user.roles.find(x => x.id == roleToAdd.id)) {
          this.addRoleError = "roleAlreadyAdded";
        } else {
          this.addRoleError = null;
          this.rolesControl.reset();
          this.user.roles = [...this.user.roles, roleToAdd];
        }
      } else {
        this.addRoleError = "chooseRole";
      }
    });
  }

  addPermission() {
    this.filteredPermissions.subscribe(r => {
      let permToAdd = r.find(x => x.name == this.permissionNameForFilter);
      if (permToAdd) {
        if (this.user.permissions.find(x => x.id == permToAdd.id)) {
          this.addPermissionsError = "permissionAlreadyAdded";
        } else {
          this.addPermissionsError = null;
          this.permissionsControl.reset();
          this.user.permissions = [...this.user.permissions, permToAdd];
        }
      } else {
        this.addPermissionsError = "choosePermission";
      }
    });
  }
}
