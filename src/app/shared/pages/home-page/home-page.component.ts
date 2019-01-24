import { Component, OnInit, ViewChild } from "@angular/core";
import { Hero } from "../../../modules/heroes/shared/hero.model";
import { HeroService } from "../../../modules/heroes/shared/hero.service";
import { RoleService } from "../../../modules/heroes/shared/role.service";
import { UserService } from "../../../modules/heroes/shared/user.service";
import { AppConfig } from "../../../configs/app.config";
import { UtilsHelperService } from "../../../core/services/utils-helper.service";
import { User } from "src/app/modules/heroes/shared/user.model";
import { Role } from "src/app/modules/heroes/shared/role.model";
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
  usersLoading: boolean = false;
  rolesLoading: boolean = false;
  permissionsLoading: boolean = false;
  newHeroForm: FormGroup;
  error: string;
  @ViewChild("form") myNgForm;

  constructor(
    private heroService: HeroService,
    private UserService: UserService,
    private RoleService: RoleService,
    private formBuilder: FormBuilder
  ) {
    this.newHeroForm = this.formBuilder.group({
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
  }

  createNewUser(newUser: string) {
    if (this.newHeroForm.valid) {
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

  
  createNewRole(newUser: string) {
    if (this.newHeroForm.valid) {
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
}
