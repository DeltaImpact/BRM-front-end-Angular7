import { Component, Input, OnInit } from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UserService } from "../../../modules/heroes/shared/user.service";
import { User } from "../../../modules/heroes/shared/user.model";
import { Role } from "../../../modules/heroes/shared/role.model";
import { Permission } from "../../../modules/heroes/shared/permission.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-role-permission-card",
  templateUrl: "./role-permission-card.component.html",
  styleUrls: ["./role-permission-card.component.scss"]
})
export class RoleAndPermissionCardComponent implements OnInit {
  @Input() item: Role;


  constructor(private userService: UserService, private router: Router) {

    // debugger
  }

  ngOnInit() {}
}
