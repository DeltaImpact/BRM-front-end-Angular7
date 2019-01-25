import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { AppConfig } from "../../../configs/app.config";
import { UserService } from "../../../modules/heroes/shared/user.service";
import { User } from "../../../modules/heroes/shared/user.model";
import { Role } from "../../../modules/heroes/shared/role.model";
import { RoleDelete } from "../../../modules/heroes/shared/role.delete.model";
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

  constructor(private userService: UserService, private router: Router) {
    // debugger
  }

  // @Output() addFunction: EventEmitter<Role> = new EventEmitter();

  ngOnInit() {}

  RemoveRoleFromUser(role: Role, user: User) {
    let obj = new RoleDelete(role, user);
    this.removeFunction.emit(obj);
    // this.removeFunction.emit([role, user]);
  }
  chooseUser() {
    this.chooseFunction.emit(this.user);
  }

  ngOnChanges(changes: SimpleChanges) {
    // debugger
  }
}
