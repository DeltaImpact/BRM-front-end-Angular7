import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Observable } from "rxjs";
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
// import { Subject } from "rxjs/Rx";

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
  // changedUserChange: Subject<User> = new Subject<User>();
  @Input() isChosen: Boolean;
  @Output() chooseFunction = new EventEmitter();
  @Output() removeFunction = new EventEmitter();
  @Output() deleteFunction = new EventEmitter();
  @Output() updateFunction = new EventEmitter();
  isEditMode: boolean = false;
  isNeedSave: boolean = false;

  editItemForm: FormGroup;

  rolesControl = new FormControl();
  permissionsControl = new FormControl();

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
    // this.changedUserChange.subscribe(value => {
    //   this.changedUser = value;
    // });

    this.editItemForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required])
    });

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
              let userRolesIds = this.user.roles.map(item => item.id);
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
              let userPermissionsIds = this.user.permissions.map(
                item => item.id
              );
              return item.filter(
                item => -1 === userPermissionsIds.indexOf(item.id)
              );
            })
          );
      });

    // this.changedUser
  }

  ngOnInit() {
    this.changedUser = {
      id: this.user.id,
      name: this.user.name,
      roles: this.user.roles,
      permissions: this.user.permissions
    };
    // this.changedUser.name = this.user.name;
    // this.changedUser.roles = this.user.roles;
    // this.changedUser.permissions = this.user.permissions;
  }

  addRole() {
    this.filteredRoles.subscribe(r => {
      if (r.length === 1) {
        let roleToAdd = r[0] as Role;
        if (this.changedUser.roles.find(x => x.id == roleToAdd.id)) {
          this.addRoleError = "roleAlreadyAdded";
        } else this.changedUser.roles = [...this.changedUser.roles, roleToAdd];

        // debugger;
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
          this.addRoleError = "permissionAlreadyAdded";
        } else
          this.changedUser.permissions = [
            ...this.changedUser.permissions,
            permToAdd
          ];

        // debugger;
      } else {
        this.addRoleError = "choosePermission";
      }
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   debugger
  //   // changes.prop contains the old and the new value...
  // }

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
  }

  isDeletedInChangedUser(item: Role, typeOfItem: string) {
    // [ngClass]="{
    //   isAddedInChangedUser(item, 'permission'),
    //   isDeletedInChangedUser(item, 'permission'),
    // }"
    // 'roles__box--removed'
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
    // 'roles__box--added'
    if (typeOfItem == "role") {
    }
    if (typeOfItem == "permission") {
    }
    return "";
  }

  chooseUser() {
    this.chooseFunction.emit(this.user);
  }

  deleteItem() {
    this.deleteFunction.emit(this.user);
  }

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.editItemForm.setValue({
        name: this.changedUser.name
      });
    }
  }

  checkIsSafeNeeded() {
    let isNamesDiffer = this.user.name != this.changedUser.name;
    let isRolesDiffer = this.user.roles != this.changedUser.roles;
    let isPermissionsDiffer =
      this.user.permissions != this.changedUser.permissions;
    // debugger;

    if (isNamesDiffer || isRolesDiffer || isPermissionsDiffer) {
      debugger;
      this.isNeedSave = true;
    } else {
      debugger;

      this.isNeedSave = false;
    }
  }

  changeItemName(name: User) {
    // let asd = name.name;
    this.changedUser.name = name.name;

    // debugger;
    // this.user.userName = name.name;
    // this.user.name = name.name;
    // this.updateFunction.emit(this.user);
    this.checkIsSafeNeeded();
  }
}
