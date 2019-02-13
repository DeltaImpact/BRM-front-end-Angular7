import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { map, startWith } from "rxjs/operators";
import { AppConfig } from "../../../configs/app.config";
import { Role, User, Permission } from "../../../models";
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
import * as Rx from "rxjs";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  roles$: Observable<Role[]> = null;
  permissions$: Observable<Permission[]> = null;
  @Input() user: User;
  changedUser: User;
  changedUserObservable = new Rx.Subject();
  @Input() isChosen: Boolean;
  @Output() chooseFunction = new EventEmitter();
  @Output() removeFunction = new EventEmitter();
  @Output() deleteFunction = new EventEmitter();
  @Output() updateFunction = new EventEmitter();
  isEditMode: boolean = false;
  isNeedSave: boolean = true;
  isNamesDiffer: boolean = false;

  editItemForm: FormGroup;

  nameControl = new FormControl(Validators.minLength(1));
  rolesControl = new FormControl();
  permissionsControl = new FormControl();

  changeNameError: string = null;
  addRoleError: string = null;
  addPermissionsError: string = null;

  filteredRoles: Observable<Role[]>;
  filteredPermissions: Observable<Permission[]>;

  roleNameForFilter: string = "";
  permissionNameForFilter: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<RootStoreState.State>
  ) {
    this.changedUserObservable.subscribe(() => this.checkIsSafeNeeded());

    // this.changedUserChange.subscribe(value => {
    //   this.changedUser = value;
    // });

    // this.editItemForm = this.formBuilder.group({
    //   name: new FormControl("", [Validators.required])
    // });

    this.rolesControl.valueChanges
      .pipe(startWith(""))
      .subscribe((state: string) => {
        this.roleNameForFilter = state;

        this.filteredRoles = this.store$
          .select<Role[]>(
            RolesSelectors.selectSearchRoleByName(this.roleNameForFilter)
          )
          .pipe(
            map(item => {
              let userRolesIds = this.changedUser.roles.map(item => item.id);
              return item.filter(item => -1 === userRolesIds.indexOf(item.id));
            })
          );
      });

    this.permissionsControl.valueChanges
      .pipe(startWith(""))
      .subscribe((state: string) => {
        this.roleNameForFilter = state;

        this.filteredPermissions = this.store$
          .select<Permission[]>(
            PermissionsSelectors.selectSearchPermissionByName(
              this.permissionNameForFilter
            )
          )
          .pipe(
            map(item => {
              let userPermissionsIds = this.changedUser.permissions.map(
                item => item.id
              );
              return item.filter(
                item => -1 === userPermissionsIds.indexOf(item.id)
              );
            })
          );
      });

    this.nameControl.valueChanges
      .pipe(startWith(""))
      .subscribe((newName: string) => {
        if (newName != "") {
          this.isNamesDiffer = this.user.name != newName;
          this.changedUserObservable.next();
        } else {
          this.isNamesDiffer = false;
        }
      });
  }

  ngOnInit() {
    this.changedUser = Object.assign({}, this.user);
  }

  addRole() {
    this.filteredRoles.subscribe(r => {
      if (r.length === 1) {
        let roleToAdd = r[0] as Role;
        if (this.changedUser.roles.find(x => x.id == roleToAdd.id)) {
          this.addRoleError = "roleAlreadyAdded";
        } else {
          this.addRoleError = null;
          this.rolesControl.reset();
          this.changedUser.roles = [...this.changedUser.roles, roleToAdd];
          this.changedUserObservable.next();
        }
      } else {
        this.addRoleError = "chooseRole";
      }
    });
  }

  addPermission() {
    this.filteredPermissions.subscribe(r => {
      if (r.length === 1) {
        let permToAdd = r[0] as Permission;
        if (this.changedUser.permissions.find(x => x.id == permToAdd.id)) {
          this.addPermissionsError = "permissionAlreadyAdded";
        } else {
          this.addPermissionsError = null;
          this.permissionsControl.reset();
          this.changedUser.permissions = [
            ...this.changedUser.permissions,
            permToAdd
          ];
          this.changedUserObservable.next();
        }
      } else {
        this.addPermissionsError = "choosePermission";
      }
    });
  }

  RemoveFromUser(item: Role, user: User, typeOfItem: string) {
    if (typeOfItem == "role") {
      let roleInNewUser = this.changedUser.roles.find(x => x.id == item.id);
      if (roleInNewUser) {
        this.changedUser.roles = this.changedUser.roles.filter(roleInRoles => {
          return roleInRoles.id != item.id;
        });
      } else {
        this.changedUser.roles = [...this.changedUser.roles, item];
      }
    }
    if (typeOfItem == "permission") {
      let permissionInNewUser = this.changedUser.permissions.find(
        x => x.id == item.id
      );
      if (permissionInNewUser) {
        this.changedUser.permissions = this.changedUser.permissions.filter(
          permissionInPermissions => {
            return permissionInPermissions.id != item.id;
          }
        );
      } else {
        this.changedUser.permissions = [...this.changedUser.permissions, item];
      }
    }
    this.changedUserObservable.next();
  }

  isDeletedInChangedUser(item: Role, typeOfItem: string) {
    if (typeOfItem == "role") {
      let itemInChangedUser = this.changedUser.roles.find(x => x.id == item.id);
      let itemInUser = this.user.roles.find(x => x.id == item.id);
      if (!itemInChangedUser && itemInUser) return "roles__box--removed";
      if (itemInChangedUser && !itemInUser) return "roles__box--added";
    }
    if (typeOfItem == "permission") {
      let itemInChangedUser = this.changedUser.permissions.find(
        x => x.id == item.id
      );
      let itemInUser = this.user.permissions.find(x => x.id == item.id);
      if (!itemInChangedUser && itemInUser) return "roles__box--removed";
      if (itemInChangedUser && !itemInUser) return "roles__box--added";
    }
  }

  isAddedInChangedUser(item: Role, typeOfItem: string) {
    if (typeOfItem == "role") {
    }
    if (typeOfItem == "permission") {
    }
    return "";
  }

  deleteItem() {
    this.deleteFunction.emit(this.user);
  }

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
    this.changedUser = Object.assign({}, this.user);
  }

  checkIsSafeNeeded() {
    let isRolesDiffer =
      this.user.roles.sort(e => e.id) != this.changedUser.roles.sort(e => e.id);
    let isPermissionsDiffer =
      this.user.permissions.sort(e => e.id) !=
      this.changedUser.permissions.sort(e => e.id);

    // console.log(
    //   "name: ",
    //   this.isNamesDiffer,
    //   "role: ",
    //   isRolesDiffer,
    //   "perm: ",
    //   isPermissionsDiffer
    // );
    // debugger;

    if (this.isNamesDiffer || isRolesDiffer || isPermissionsDiffer) {
      // debugger;
      this.isNeedSave = true;
    } else {
      // debugger;

      this.isNeedSave = false;
    }
  }

  // changeItemName(name: User) {
  //   this.changedUser.name = name.name;
  //   this.changedUserObservable.next();
  // }
}
