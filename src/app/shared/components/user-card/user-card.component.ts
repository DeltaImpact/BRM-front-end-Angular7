import { Component, Input, OnInit } from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UserService } from "../../../modules/heroes/shared/user.service";
import { User } from "../../../modules/heroes/shared/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  @Input() user: User;


  constructor(private userService: UserService, private router: Router) {

    // debugger
  }

  ngOnInit() {}
}
