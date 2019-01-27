import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UserService } from "../../../modules/services/shared/user.service";
import { User } from "../../../modules/services/shared/user.model";
import { Role } from "../../../modules/services/shared/role.model";
import { RoleDelete } from "../../../modules/services/shared/role.delete.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"]
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() isChosen: Boolean;
  @Output() chooseFunction = new EventEmitter();
  @Output() removeFunction = new EventEmitter();

  constructor() {
  }

  ngOnInit() {}

  RemoveFromUser(role: Role, user: User, typeOfItem: string) {
    this.removeFunction.emit({
      role: role,
      user: user,
      typeOfItem: typeOfItem
    });
  }

  chooseUser() {
    this.chooseFunction.emit(this.user);
  }

  deleteUser() {
    debugger;
  }

  ngOnChanges(changes: SimpleChanges) {
    // debugger
  }
}
