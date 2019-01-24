import { Component, OnInit, ViewChild } from "@angular/core";
import { Hero } from "../../../modules/heroes/shared/hero.model";
import { HeroService } from "../../../modules/heroes/shared/hero.service";
import { UserService } from "../../../modules/heroes/shared/user.service";
import { RoleService } from "../../../modules/heroes/shared/role.service";
import { PermissionService } from "../../../modules/heroes/shared/permission.service";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";
import { User } from "src/app/modules/heroes/shared/user.model";
import { Role } from "src/app/modules/heroes/shared/role.model";
import { Permission } from "src/app/modules/heroes/shared/permission.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
  animations: [UtilsHelperService.fadeInOut()]
})
export class HomePageComponent implements OnInit {
  heroes: Hero[] = null;
  users: User[] = null;
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

  createNewUser(newUser: string) {
    debugger
    if (this.newUserForm.valid) {
      this.UserService.AddUser(new User(newUser)).then(
        r => {
          debugger;

          this.myNgForm.resetForm();
        },
        e => {
          debugger;

          this.error = "errorHasOcurred";
        }
      );
    }
  }

  
  createNewRole(newRole: string) {
    // debugger

    if (this.newRoleForm.valid) {
      this.RoleService.AddRole(new Role(newRole)).then(
        r => {
          debugger;

          this.myNgForm.resetForm();
        },
        e => {
          debugger;

          this.error = "errorHasOcurred";
        }
      );
    }
  }

  createNewPermission(newPermission: string) {
    // debugger

    if (this.newPermissionForm.valid) {
      this.PermissionService.AddPermission(new Permission(newPermission)).then(
        r => {
          debugger;

          this.myNgForm.resetForm();
        },
        e => {
          debugger;

          this.error = "errorHasOcurred";
        }
      );
    }
  }
}
